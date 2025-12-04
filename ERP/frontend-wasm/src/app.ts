// Tipos
interface ContaBancaria {
    _id?: string;
    nome: string;
    banco: string;
    agencia: string;
    numero_conta: string;
    tipo_conta: string;
    saldo_inicial: number;
    saldo_atual: number;
    ativo: boolean;
}

interface Cartao {
    _id?: string;
    nome: string;
    bandeira: string;
    ultimos_digitos: string;
    limite_total: number;
    limite_disponivel: number;
    dia_vencimento: number;
    dia_fechamento: number;
    ativo: boolean;
}

interface BancoInfo {
    codigo: string;
    nome: string;
    pais: string;
}

// Importar lista de bancos
import { todosBancos, buscarBanco } from './bancos.js';

// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api/v1';

declare global {
    interface Window {
        app: FinanceiroApp;
    }
}

// Classe para gerenciar a aplicação
class FinanceiroApp {
    private contas: ContaBancaria[] = [];
    private cartoes: Cartao[] = [];

    async init() {
        console.log('🚀 Inicializando aplicação...');
        await this.carregarDados();
        this.setupEventListeners();
    }

    private async carregarDados() {
        try {
            this.showLoading(true);

            const [contas, cartoes] = await Promise.all([
                this.fetchContas(),
                this.fetchCartoes()
            ]);

            this.contas = contas;
            this.cartoes = cartoes;

            this.renderContas();
            this.renderCartoes();
            this.renderResumo();
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.showAlert('Erro ao carregar dados. Verifique se o servidor está rodando.', 'danger');
        } finally {
            this.showLoading(false);
        }
    }

    private async fetchContas(): Promise<ContaBancaria[]> {
        const response = await fetch(`${API_BASE_URL}/financeiro/contas`);
        if (!response.ok) throw new Error('Erro ao buscar contas');
        return await response.json() as ContaBancaria[];
    }

    private async fetchCartoes(): Promise<Cartao[]> {
        const response = await fetch(`${API_BASE_URL}/financeiro/cartoes`);
        if (!response.ok) throw new Error('Erro ao buscar cartões');
        return await response.json() as Cartao[];
    }

    private renderContas() {
        const tbody = document.getElementById('contasTable');
        if (!tbody) return;

        if (this.contas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <div class="empty-state-icon">🏦</div>
                        <div class="empty-state-text">Nenhuma conta bancária cadastrada</div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.contas.map(conta => {
            const tipo = this.formatarTipoConta(conta.tipo_conta);
            const bancoDescricao = this.getBancoDescricao(conta.banco);
            return `
                <tr>
                    <td><strong>${conta.nome}</strong></td>
                    <td>${bancoDescricao}</td>
                    <td><span class="badge badge-success">${tipo}</span></td>
                    <td>${conta.agencia}</td>
                    <td>${conta.numero_conta}</td>
                    <td><strong style="color: ${conta.saldo_atual >= 0 ? '#10b981' : '#ef4444'}">
                        ${this.formatCurrency(conta.saldo_atual)}
                    </strong></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="app.editarConta('${conta._id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="app.deletarConta('${conta._id}')">
                            🗑️
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    private renderCartoes() {
        const tbody = document.getElementById('cartoesTable');
        if (!tbody) return;

        if (this.cartoes.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        <div class="empty-state-icon">💳</div>
                        <div class="empty-state-text">Nenhum cartão de crédito cadastrado</div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.cartoes.map(cartao => {
            const bandeira = this.formatarBandeira(cartao.bandeira);
            const percentualUsado = cartao.limite_total > 0
                ? ((cartao.limite_total - cartao.limite_disponivel) / cartao.limite_total) * 100
                : 0;

            return `
                <tr>
                    <td><strong>${cartao.nome}</strong></td>
                    <td>${bandeira}</td>
                    <td><span class="badge badge-warning">**** ${cartao.ultimos_digitos}</span></td>
                    <td>
                        <strong style="color: ${percentualUsado > 80 ? '#ef4444' : '#10b981'}">
                            ${this.formatCurrency(cartao.limite_disponivel)}
                        </strong>
                        <div style="font-size: 11px; color: #718096;">
                            de ${this.formatCurrency(cartao.limite_total)} (${percentualUsado.toFixed(0)}% usado)
                        </div>
                    </td>
                    <td>
                        <span style="font-size: 13px; color: #4a5568;">
                            Fecha: <strong>${cartao.dia_fechamento}</strong> |
                            Vence: <strong>${cartao.dia_vencimento}</strong>
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="app.editarCartao('${cartao._id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="app.deletarCartao('${cartao._id}')">
                            🗑️
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    private renderResumo() {
        const totalContas = this.contas.reduce((sum, conta) => sum + conta.saldo_atual, 0);
        const totalLimiteDisponivel = this.cartoes.reduce((sum, cartao) => sum + cartao.limite_disponivel, 0);
        const totalLimiteUsado = this.cartoes.reduce((sum, cartao) =>
            sum + (cartao.limite_total - cartao.limite_disponivel), 0
        );

        const resumoDiv = document.getElementById('resumoFinanceiro');
        if (!resumoDiv) return;

        resumoDiv.innerHTML = `
            <div class="card-grid">
                <div class="info-card">
                    <div class="info-card-label">💰 Saldo Total em Contas</div>
                    <div class="info-card-value">${this.formatCurrency(totalContas)}</div>
                    <div class="info-card-subtitle">${this.contas.length} conta(s) ativa(s)</div>
                </div>
                <div class="info-card">
                    <div class="info-card-label">💳 Limite Disponível</div>
                    <div class="info-card-value">${this.formatCurrency(totalLimiteDisponivel)}</div>
                    <div class="info-card-subtitle">${this.cartoes.length} cartão(ões)</div>
                </div>
                <div class="info-card">
                    <div class="info-card-label">📊 Limite Utilizado</div>
                    <div class="info-card-value">${this.formatCurrency(totalLimiteUsado)}</div>
                    <div class="info-card-subtitle">Total de faturas</div>
                </div>
            </div>
        `;
    }

    private formatarTipoConta(tipo: string): string {
        const tipos: Record<string, string> = {
            'corrente': 'Conta Corrente',
    private formatarBandeira(bandeira: string): string {
        const bandeiras: Record<string, string> = {
            'visa': '💳 Visa',
            'mastercard': '💳 Mastercard',
            'elo': '💳 Elo',
            'americanexpress': '💳 Amex',
            'hipercard': '💳 Hipercard',
            'outra': '💳 Outro'
        };
        return bandeiras[bandeira] ?? bandeira;
    }

    private getBancoDescricao(codigo: string): string {
        const resultado = buscarBanco(codigo) as BancoInfo | BancoInfo[] | undefined;
        const banco = Array.isArray(resultado)
            ? resultado.find(item => item.codigo === codigo)
            : resultado;

        return banco ? `${banco.codigo} - ${banco.nome}` : codigo;
    }

    private formatCurrency(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
        return banco ? `${banco.codigo} - ${banco.nome}` : codigo;
    }

    private formatCurrency(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    private setupEventListeners() {
        const btnNovaConta = document.getElementById('btnNovaConta');
        const btnNovoCartao = document.getElementById('btnNovoCartao');

        if (btnNovaConta) {
            btnNovaConta.addEventListener('click', () => this.abrirModalConta());
        }

        if (btnNovoCartao) {
            btnNovoCartao.addEventListener('click', () => this.abrirModalCartao());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1') {
                e.preventDefault();
                this.mostrarAjuda();
            }
        });
    }

    private mostrarAjuda() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeHelp() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    async deletarConta(id: string) {
        if (!confirm('Tem certeza que deseja excluir esta conta?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/financeiro/contas/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erro ao deletar conta');

            this.showAlert('Conta excluída com sucesso!', 'success');
            await this.carregarDados();
        } catch (error) {
            console.error('Erro ao deletar conta:', error);
            this.showAlert('Erro ao excluir conta', 'danger');
        }
    }

    async deletarCartao(id: string) {
        if (!confirm('Tem certeza que deseja excluir este cartão?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/financeiro/cartoes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erro ao deletar cartão');

            this.showAlert('Cartão excluído com sucesso!', 'success');
            await this.carregarDados();
        } catch (error) {
            console.error('Erro ao deletar cartão:', error);
            this.showAlert('Erro ao excluir cartão', 'danger');
        }
    }

    editarConta(id: string) {
        console.log('Editar conta:', id);
        // TODO: Implementar modal de edição
    }

    editarCartao(id: string) {
        console.log('Editar cartão:', id);
        // TODO: Implementar modal de edição
    }

    private abrirModalConta() {
        console.log('Abrir modal de nova conta');
        // TODO: Implementar modal
    }

    private abrirModalCartao() {
        console.log('Abrir modal de novo cartão');
        // TODO: Implementar modal
    }

    private showLoading(show: boolean) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = show ? 'block' : 'none';
        }
    }

    private showAlert(message: string, type: 'success' | 'danger' = 'success') {
        const container = document.getElementById('alert-container');
        if (!container) return;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        container.append(alert);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

const app = new FinanceiroApp();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

window.app = app;
