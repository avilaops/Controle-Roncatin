# 💳 Sistema de Gestão Financeira

Interface moderna para gerenciamento de contas bancárias e cartões de crédito.

## 🎨 Tecnologias

- **Backend**: Rust + Axum + MongoDB Atlas
- **Frontend**: TypeScript + CSS moderno
- **Design**: Interface clean e responsiva

## 🚀 Como Usar

### 1. Backend (API)

```powershell
cd backend
cargo run
```

O servidor rodará em `http://localhost:3000`

### 2. Frontend

**Opção 1: Compilar TypeScript e servir**
```powershell
cd frontend-wasm

# Compilar TypeScript
.\compile-ts.ps1

# Servir arquivos (Python)
python -m http.server 8000

# Ou usar serve.ps1 se existir
.\serve.ps1
```

**Opção 2: Usar servidor Node (mais rápido)**
```powershell
npx http-server . -p 8000 --cors
```

Acesse: `http://localhost:8000`

## 📋 Funcionalidades

### 🏦 Contas Bancárias
- ✅ Listar todas as contas
- ✅ Ver saldo atual
- ✅ Editar informações
- ✅ Excluir contas
- 🔄 Adicionar novas contas (em desenvolvimento)

### 💳 Cartões de Crédito
- ✅ Listar todos os cartões
- ✅ Ver limite disponível e utilizado
- ✅ Dias de fechamento e vencimento
- ✅ Editar informações
- ✅ Excluir cartões
- 🔄 Adicionar novos cartões (em desenvolvimento)

### 📊 Resumo Financeiro
- Saldo total em contas bancárias
- Limite total disponível nos cartões
- Total de limites utilizados

## 🎯 Endpoints da API

### Contas Bancárias
- `GET /api/v1/financeiro/contas` - Listar contas
- `POST /api/v1/financeiro/contas` - Criar conta
- `GET /api/v1/financeiro/contas/:id` - Buscar conta
- `PUT /api/v1/financeiro/contas/:id` - Atualizar conta
- `DELETE /api/v1/financeiro/contas/:id` - Deletar conta

### Cartões
- `GET /api/v1/financeiro/cartoes` - Listar cartões
- `POST /api/v1/financeiro/cartoes` - Criar cartão
- `GET /api/v1/financeiro/cartoes/:id` - Buscar cartão
- `PUT /api/v1/financeiro/cartoes/:id` - Atualizar cartão
- `DELETE /api/v1/financeiro/cartoes/:id` - Deletar cartão

## 🔧 Estrutura de Dados

### Conta Bancária
```typescript
{
  nome: string;
  banco: string;
  agencia: string;
  numero_conta: string;
  tipo_conta: "corrente" | "poupanca" | "investimento";
  saldo_inicial: number;
  saldo_atual: number;
  ativo: boolean;
}
```

### Cartão
```typescript
{
  nome: string;
  bandeira: "visa" | "mastercard" | "elo" | "americanexpress" | "hipercard" | "outra";
  ultimos_digitos: string;
  limite_total: number;
  limite_disponivel: number;
  dia_vencimento: number;
  dia_fechamento: number;
  ativo: boolean;
}
```

## 🎨 Design System

### Cores
- **Primary**: `#667eea` → `#764ba2` (Gradiente)
- **Success**: `#10b981` → `#059669`
- **Danger**: `#ef4444` → `#dc2626`
- **Warning**: `#f59e0b` → `#d97706`

### Tipografia
- **Font**: Inter (Google Fonts)
- **Tamanhos**: 12px - 36px
- **Pesos**: 300, 400, 500, 600, 700

## 📝 TODO

- [ ] Modais para adicionar/editar contas e cartões
- [ ] Validação de formulários
- [ ] Gráficos de evolução de saldos
- [ ] Histórico de transações
- [ ] Exportar relatórios
- [ ] Dark mode

## 🐛 Debug

Se a API não conectar, verifique:
1. Backend está rodando na porta 3000
2. MongoDB Atlas está configurado (variável `MONGO_ATLAS_URI`)
3. CORS está habilitado no backend

---

**Desenvolvido com 🦀 Rust e ❤️**
