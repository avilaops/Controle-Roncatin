use crate::{
    api, components,
    models::{Cartao, ContaBancaria},
};
use wasm_bindgen::prelude::*;

pub struct Contas;

impl Contas {
    pub async fn load() -> Result<(), JsValue> {
        components::show_loading(true);

        // Carregar contas e cartões em paralelo
        let contas: Vec<ContaBancaria> = api::fetch_json("/financeiro/contas").await?;
        let cartoes: Vec<Cartao> = api::fetch_json("/financeiro/cartoes").await?;

        Self::render_contas(&contas)?;
        Self::render_cartoes(&cartoes)?;

        components::show_loading(false);
        Ok(())
    }

    fn render_contas(contas: &[ContaBancaria]) -> Result<(), JsValue> {
        let mut html = String::new();

        if contas.is_empty() {
            html.push_str(r#"<tr><td colspan="7" style="text-align: center;">Nenhuma conta cadastrada</td></tr>"#);
        } else {
            for conta in contas {
                let tipo_display = match conta.tipo_conta.as_str() {
                    "corrente" => "Conta Corrente",
                    "poupanca" => "Poupança",
                    "investimento" => "Investimento",
                    _ => "Outro",
                };

                html.push_str(&format!(
                    r#"<tr>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>R$ {:.2}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editarConta('{}')">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deletarConta('{}')">🗑️</button>
                        </td>
                    </tr>"#,
                    conta.nome,
                    conta.banco,
                    tipo_display,
                    conta.agencia,
                    conta.numero_conta,
                    conta.saldo_atual,
                    conta.id.as_deref().unwrap_or(""),
                    conta.id.as_deref().unwrap_or(""),
                ));
            }
        }

        components::set_inner_html("contasTable", &html);
        Ok(())
    }

    fn render_cartoes(cartoes: &[Cartao]) -> Result<(), JsValue> {
        let mut html = String::new();

        if cartoes.is_empty() {
            html.push_str(r#"<tr><td colspan="6" style="text-align: center;">Nenhum cartão cadastrado</td></tr>"#);
        } else {
            for cartao in cartoes {
                let bandeira_emoji = match cartao.bandeira.as_str() {
                    "visa" => "💳 Visa",
                    "mastercard" => "💳 Mastercard",
                    "elo" => "💳 Elo",
                    "americanexpress" => "💳 Amex",
                    "hipercard" => "💳 Hipercard",
                    _ => "💳 Outro",
                };

                html.push_str(&format!(
                    r#"<tr>
                        <td>{}</td>
                        <td>{}</td>
                        <td>**** {}</td>
                        <td>R$ {:.2}</td>
                        <td>{}/{}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editarCartao('{}')">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deletarCartao('{}')">🗑️</button>
                        </td>
                    </tr>"#,
                    cartao.nome,
                    bandeira_emoji,
                    cartao.ultimos_digitos,
                    cartao.limite_disponivel,
                    cartao.dia_fechamento,
                    cartao.dia_vencimento,
                    cartao.id.as_deref().unwrap_or(""),
                    cartao.id.as_deref().unwrap_or(""),
                ));
            }
        }

        components::set_inner_html("cartoesTable", &html);
        Ok(())
    }
}
