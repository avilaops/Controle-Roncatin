# Compilar TypeScript para JavaScript
Write-Host "🔨 Compilando TypeScript..." -ForegroundColor Cyan

# Verificar se TypeScript está instalado
if (-not (Get-Command tsc -ErrorAction SilentlyContinue)) {
    Write-Host "📦 TypeScript não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g typescript
}

# Compilar
tsc

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript compilado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao compilar TypeScript" -ForegroundColor Red
    exit 1
}
