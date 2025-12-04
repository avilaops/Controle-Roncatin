// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api/v1';
// Classe para gerenciar a aplicação
class FinanceiroApp {
    constructor() {
        this.contas = [];
        this.cartoes = [];
    }
    async init() {
        console.log('🚀 Inicializando aplicação...');
        await this.carregarDados();
        this.setupEventListeners();
    }
    async carregarDados() {
        try {
            this.showLoading(true);
            // Carregar contas e cartões
            const [contas, cartoes] = await Promise.all([
                this.fetchContas(),
                this.fetchCartoes()
            ]);
            this.contas = contas;
            this.cartoes = cartoes;
            this.renderContas();
            this.renderCartoes();
            this.renderResumo();
        }
        catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.showAlert('Erro ao carregar dados. Verifique se o servidor está rodando.', 'danger');
        }
        finally {
            this.showLoading(false);
        }
    }
    async fetchContas() {
        const response = await fetch(`${API_BASE_URL}/financeiro/contas`);
        if (!response.ok)
            throw new Error('Erro ao buscar contas');
        return response.json();
    }
    async fetchCartoes() {
        const response = await fetch(`${API_BASE_URL}/financeiro/cartoes`);
        if (!response.ok)
            throw new Error('Erro ao buscar cartões');
        return response.json();
    }
    renderContas() {
        const tbody = document.getElementById('contasTable');
        if (!tbody)
            return;
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
            return `
                <tr>
                    <td><strong>${conta.nome}</strong></td>
                    <td>${conta.banco}</td>
                    <td><span class="badge badge-success">${tipo}</span></td>
                    <td>${conta.agencia}</td>
                    <td>${conta.numero_conta}</td>
                    <td><strong style="color: ${conta.saldo_atual >= 0 ? '#10b981' : '#ef4444'}">
                        R$ ${conta.saldo_atual.toFixed(2)}
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
    renderCartoes() {
        const tbody = document.getElementById('cartoesTable');
        if (!tbody)
            return;
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
            const percentualUsado = ((cartao.limite_total - cartao.limite_disponivel) / cartao.limite_total) * 100;
            return `
                <tr>
                    <td><strong>${cartao.nome}</strong></td>
                    <td>${bandeira}</td>
                    <td><span class="badge badge-warning">**** ${cartao.ultimos_digitos}</span></td>
                    <td>
                        <strong style="color: ${percentualUsado > 80 ? '#ef4444' : '#10b981'}">
                            R$ ${cartao.limite_disponivel.toFixed(2)}
                        </strong>
                        <div style="font-size: 11px; color: #718096;">
                            de R$ ${cartao.limite_total.toFixed(2)} (${percentualUsado.toFixed(0)}% usado)
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
    renderResumo() {
        const totalContas = this.contas.reduce((sum, conta) => sum + conta.saldo_atual, 0);
        const totalLimiteDisponivel = this.cartoes.reduce((sum, cartao) => sum + cartao.limite_disponivel, 0);
        const totalLimiteUsado = this.cartoes.reduce((sum, cartao) => sum + (cartao.limite_total - cartao.limite_disponivel), 0);
        const resumoDiv = document.getElementById('resumoFinanceiro');
        if (!resumoDiv)
            return;
        resumoDiv.innerHTML = `
            <div class="card-grid">
                <div class="info-card">
                    <div class="info-card-label">💰 Saldo Total em Contas</div>
                    <div class="info-card-value">R$ ${totalContas.toFixed(2)}</div>
                    <div class="info-card-subtitle">${this.contas.length} conta(s) ativa(s)</div>
                </div>
                <div class="info-card">
                    <div class="info-card-label">💳 Limite Disponível</div>
                    <div class="info-card-value">R$ ${totalLimiteDisponivel.toFixed(2)}</div>
                    <div class="info-card-subtitle">${this.cartoes.length} cartão(ões)</div>
                </div>
                <div class="info-card">
                    <div class="info-card-label">📊 Limite Utilizado</div>
                    <div class="info-card-value">R$ ${totalLimiteUsado.toFixed(2)}</div>
                    <div class="info-card-subtitle">Total de faturas</div>
                </div>
            </div>
        `;
    }
    formatarTipoConta(tipo) {
        const tipos = {
            'corrente': 'Conta Corrente',
            'poupanca': 'Poupança',
            'investimento': 'Investimento'
        };
        return tipos[tipo] || tipo;
    }
    formatarBandeira(bandeira) {
        const bandeiras = {
            'visa': '💳 Visa',
            'mastercard': '💳 Mastercard',
            'elo': '💳 Elo',
            'americanexpress': '💳 Amex',
            'hipercard': '💳 Hipercard',
            'outra': '💳 Outro'
        };
        return bandeiras[bandeira] || bandeira;
    }
    setupEventListeners() {
        // Botões de nova conta/cartão
        const btnNovaConta = document.getElementById('btnNovaConta');
        const btnNovoCartao = document.getElementById('btnNovoCartao');
        if (btnNovaConta) {
            btnNovaConta.addEventListener('click', () => this.abrirModalConta());
        }
        if (btnNovoCartao) {
            btnNovoCartao.addEventListener('click', () => this.abrirModalCartao());
        }
        // Tecla F1 para ajuda
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1') {
                e.preventDefault();
                this.mostrarAjuda();
            }
        });
    }
    mostrarAjuda() {
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
    // Métodos públicos (chamados pelos botões inline)
    async deletarConta(id) {
        if (!confirm('Tem certeza que deseja excluir esta conta?'))
            return;
        try {
            const response = await fetch(`${API_BASE_URL}/financeiro/contas/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok)
                throw new Error('Erro ao deletar conta');
            this.showAlert('Conta excluída com sucesso!', 'success');
            await this.carregarDados();
        }
        catch (error) {
            console.error('Erro ao deletar conta:', error);
            this.showAlert('Erro ao excluir conta', 'danger');
        }
    }
    async deletarCartao(id) {
        if (!confirm('Tem certeza que deseja excluir este cartão?'))
            return;
        try {
            const response = await fetch(`${API_BASE_URL}/financeiro/cartoes/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok)
                throw new Error('Erro ao deletar cartão');
            this.showAlert('Cartão excluído com sucesso!', 'success');
            await this.carregarDados();
        }
        catch (error) {
            console.error('Erro ao deletar cartão:', error);
            this.showAlert('Erro ao excluir cartão', 'danger');
        }
    }
    editarConta(id) {
        console.log('Editar conta:', id);
        // TODO: Implementar modal de edição
    }
    editarCartao(id) {
        console.log('Editar cartão:', id);
        // TODO: Implementar modal de edição
    }
    abrirModalConta() {
        console.log('Abrir modal de nova conta');
        // TODO: Implementar modal
    }
    abrirModalCartao() {
        console.log('Abrir modal de novo cartão');
        // TODO: Implementar modal
    }
    showLoading(show) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = show ? 'block' : 'none';
        }
    }
    showAlert(message, type = 'success') {
        const container = document.getElementById('alert-container');
        if (!container)
            return;
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        container.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}
// Instância global
const app = new FinanceiroApp();
// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
}
else {
    app.init();
}
// Exportar para uso global
window.app = app;
export {};
