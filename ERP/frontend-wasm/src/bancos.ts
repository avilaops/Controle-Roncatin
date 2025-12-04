// Lista completa de bancos - Brasil, Portugal e Internacional
// Atualizado em dezembro de 2025

export const bancosBrasil = [
    // Principais bancos comerciais
    { codigo: "001", nome: "Banco do Brasil S.A.", pais: "BR" },
    { codigo: "033", nome: "Banco Santander Brasil S.A.", pais: "BR" },
    { codigo: "104", nome: "Caixa Econômica Federal", pais: "BR" },
    { codigo: "237", nome: "Banco Bradesco S.A.", pais: "BR" },
    { codigo: "341", nome: "Itaú Unibanco S.A.", pais: "BR" },
    { codigo: "356", nome: "Banco Real S.A. (Santander)", pais: "BR" },
    { codigo: "745", nome: "Banco Citibank S.A.", pais: "BR" },
    { codigo: "399", nome: "HSBC Bank Brasil S.A.", pais: "BR" },

    // Bancos digitais
    { codigo: "260", nome: "Nu Pagamentos S.A. (Nubank)", pais: "BR" },
    { codigo: "290", nome: "Pagseguro Internet S.A.", pais: "BR" },
    { codigo: "323", nome: "Mercado Pago", pais: "BR" },
    { codigo: "380", nome: "PicPay Serviços S.A.", pais: "BR" },
    { codigo: "403", nome: "Cora SCD S.A.", pais: "BR" },
    { codigo: "336", nome: "Banco C6 S.A.", pais: "BR" },
    { codigo: "077", nome: "Banco Inter S.A.", pais: "BR" },
    { codigo: "653", nome: "Banco Indusval S.A.", pais: "BR" },
    { codigo: "655", nome: "Banco Votorantim S.A.", pais: "BR" },
    { codigo: "422", nome: "Banco Safra S.A.", pais: "BR" },
    { codigo: "389", nome: "Banco Mercantil do Brasil S.A.", pais: "BR" },

    // Bancos de investimento
    { codigo: "208", nome: "Banco BTG Pactual S.A.", pais: "BR" },
    { codigo: "623", nome: "Banco Pan S.A.", pais: "BR" },
    { codigo: "212", nome: "Banco Original S.A.", pais: "BR" },
    { codigo: "218", nome: "Banco BS2 S.A.", pais: "BR" },
    { codigo: "746", nome: "Banco Modal S.A.", pais: "BR" },

    // Cooperativas de crédito
    { codigo: "756", nome: "Banco Cooperativo do Brasil (BANCOOB)", pais: "BR" },
    { codigo: "748", nome: "Banco Cooperativo Sicredi S.A.", pais: "BR" },
    { codigo: "085", nome: "Cooperativa Central de Crédito - Ailos", pais: "BR" },

    // Outros bancos
    { codigo: "041", nome: "Banco do Estado do Rio Grande do Sul S.A.", pais: "BR" },
    { codigo: "047", nome: "Banco do Estado de Sergipe S.A.", pais: "BR" },
    { codigo: "070", nome: "Banco de Brasília S.A. (BRB)", pais: "BR" },
    { codigo: "021", nome: "Banco do Estado do Espírito Santo S.A.", pais: "BR" },
    { codigo: "004", nome: "Banco do Nordeste do Brasil S.A.", pais: "BR" },
    { codigo: "003", nome: "Banco da Amazônia S.A.", pais: "BR" },
    { codigo: "097", nome: "Cooperativa Central de Crédito Noroeste Brasileiro", pais: "BR" },
    { codigo: "136", nome: "Unicred Cooperativa", pais: "BR" },
    { codigo: "741", nome: "Banco Ribeirão Preto S.A.", pais: "BR" },
    { codigo: "739", nome: "Banco Cetelem S.A.", pais: "BR" },
    { codigo: "743", nome: "Banco Semear S.A.", pais: "BR" },
    { codigo: "100", nome: "Planner Corretora de Valores S.A.", pais: "BR" },
    { codigo: "096", nome: "Banco B3 S.A.", pais: "BR" },
];

export const bancosPortugal = [
    // Principais bancos portugueses
    { codigo: "0007", nome: "Banco Comercial Português (Millennium BCP)", pais: "PT" },
    { codigo: "0033", nome: "Banco Santander Totta S.A.", pais: "PT" },
    { codigo: "0035", nome: "Caixa Geral de Depósitos", pais: "PT" },
    { codigo: "0010", nome: "Banco BPI S.A.", pais: "PT" },
    { codigo: "0036", nome: "Montepio Geral", pais: "PT" },
    { codigo: "0079", nome: "Banco CTT S.A.", pais: "PT" },
    { codigo: "0269", nome: "Banco Invest S.A.", pais: "PT" },
    { codigo: "0018", nome: "Banco BiG S.A.", pais: "PT" },
    { codigo: "0065", nome: "Banco Economico", pais: "PT" },

    // Bancos digitais
    { codigo: "0099", nome: "ActivoBank", pais: "PT" },
    { codigo: "0278", nome: "Moey! (Crédito Agrícola)", pais: "PT" },

    // Cooperativas
    { codigo: "0050", nome: "Crédito Agrícola", pais: "PT" },

    // Bancos internacionais em Portugal
    { codigo: "0023", nome: "Deutsche Bank (Portugal)", pais: "PT" },
    { codigo: "0032", nome: "Barclays Bank PLC", pais: "PT" },
];

export const bancosInternacionais = [
    // Estados Unidos
    { codigo: "BOFA", nome: "Bank of America", pais: "US" },
    { codigo: "CITI", nome: "Citibank", pais: "US" },
    { codigo: "JPMC", nome: "JPMorgan Chase", pais: "US" },
    { codigo: "WELL", nome: "Wells Fargo", pais: "US" },
    { codigo: "GOLD", nome: "Goldman Sachs", pais: "US" },
    { codigo: "MORG", nome: "Morgan Stanley", pais: "US" },

    // Reino Unido
    { codigo: "HSBC", nome: "HSBC Holdings", pais: "GB" },
    { codigo: "BARC", nome: "Barclays", pais: "GB" },
    { codigo: "LLOY", nome: "Lloyds Banking Group", pais: "GB" },
    { codigo: "RBSG", nome: "NatWest Group (Royal Bank of Scotland)", pais: "GB" },
    { codigo: "STAN", nome: "Standard Chartered", pais: "GB" },

    // França
    { codigo: "BNPP", nome: "BNP Paribas", pais: "FR" },
    { codigo: "CRDA", nome: "Crédit Agricole", pais: "FR" },
    { codigo: "SOCG", nome: "Société Générale", pais: "FR" },

    // Alemanha
    { codigo: "DEUT", nome: "Deutsche Bank", pais: "DE" },
    { codigo: "COMZ", nome: "Commerzbank", pais: "DE" },

    // Espanha
    { codigo: "SANT", nome: "Banco Santander", pais: "ES" },
    { codigo: "BBVA", nome: "BBVA", pais: "ES" },
    { codigo: "CAIX", nome: "CaixaBank", pais: "ES" },

    // Suíça
    { codigo: "UBSW", nome: "UBS", pais: "CH" },
    { codigo: "CSGN", nome: "Credit Suisse", pais: "CH" },

    // Itália
    { codigo: "UCGM", nome: "UniCredit", pais: "IT" },
    { codigo: "ISPB", nome: "Intesa Sanpaolo", pais: "IT" },

    // China
    { codigo: "ICBC", nome: "Industrial and Commercial Bank of China", pais: "CN" },
    { codigo: "CCBC", nome: "China Construction Bank", pais: "CN" },
    { codigo: "ABOC", nome: "Agricultural Bank of China", pais: "CN" },
    { codigo: "BKCH", nome: "Bank of China", pais: "CN" },

    // Japão
    { codigo: "MUFG", nome: "Mitsubishi UFJ Financial Group", pais: "JP" },
    { codigo: "SMFG", nome: "Sumitomo Mitsui Financial Group", pais: "JP" },
    { codigo: "MIZH", nome: "Mizuho Financial Group", pais: "JP" },

    // Canadá
    { codigo: "RYAX", nome: "Royal Bank of Canada", pais: "CA" },
    { codigo: "TORC", nome: "Toronto-Dominion Bank", pais: "CA" },
    { codigo: "BKNS", nome: "Bank of Nova Scotia", pais: "CA" },

    // Austrália
    { codigo: "CBAAU", nome: "Commonwealth Bank of Australia", pais: "AU" },
    { codigo: "WBCAU", nome: "Westpac Banking Corporation", pais: "AU" },
    { codigo: "ANZAU", nome: "Australia and New Zealand Banking Group", pais: "AU" },

    // Outros
    { codigo: "INGB", nome: "ING Group", pais: "NL" },
    { codigo: "NWBK", nome: "Nordea Bank", pais: "SE" },
];

// Função auxiliar para buscar banco
export function buscarBanco(query: string): Array<{codigo: string, nome: string, pais: string}> {
    const todos = [...bancosBrasil, ...bancosPortugal, ...bancosInternacionais];
    const queryLower = query.toLowerCase();

    return todos.filter(banco =>
        banco.codigo.toLowerCase().includes(queryLower) ||
        banco.nome.toLowerCase().includes(queryLower)
    );
}

// Função para obter todos os bancos de um país
export function bancosPorPais(codigoPais: string): Array<{codigo: string, nome: string, pais: string}> {
    const todos = [...bancosBrasil, ...bancosPortugal, ...bancosInternacionais];
    return todos.filter(banco => banco.pais === codigoPais);
}

// Exportar lista completa
export const todosBancos = [...bancosBrasil, ...bancosPortugal, ...bancosInternacionais];
