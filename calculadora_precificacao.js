// Variáveis globais para armazenar os resultados dos custos fixos
let GLOBAIS_CUSTOS_FIXOS = {
    totalCustosPessoais: 0,
    salarioProLabore: 0,
    totalCustosEmpresaBase: 0, // Sem pró-labore, 13º, férias
    totalCustosEmpresaCompleto: 0, // Com pró-labore, 13º, férias
    totalValorEquipamentos: 0,
    depreciacaoMensal: 0,
    gastoMensalTotal: 0,
    valorDiaria: 0,
    custoHoraBase: 0,
    percentualGastosOcasionais: 0.10, // Default 10%
    diasTrabalhadosMes: 0,
    horasTrabalhoDia: 0
};

// Função para abrir abas
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Funções para adicionar itens dinâmicos
function addDynamicItem(listId, placeholderDesc, placeholderVal) {
    const list = document.getElementById(listId);
    const itemId = listId + "_" + list.children.length;
    const listItem = document.createElement("div");
    listItem.className = "dynamic-list-item";
    listItem.id = itemId;
    listItem.innerHTML = `
        <input type="text" placeholder="${placeholderDesc}" class="item-desc">
        <input type="number" placeholder="${placeholderVal}" class="item-val" value="0">
        <button type="button" class="remove-btn" onclick="removeItem('${itemId}')">Remover</button>
    `;
    list.appendChild(listItem);
}

function addCustoPessoalItem() {
    addDynamicItem("custosPessoaisList", "Descrição do Custo Pessoal", "Valor (R$)");
}

function addCustoEmpresaItem() {
    addDynamicItem("custosEmpresaList", "Descrição do Custo da Empresa", "Valor (R$)");
}

function addEquipamentoItem() {
    addDynamicItem("equipamentosList", "Descrição do Equipamento", "Valor de Aquisição (R$)");
}

function addCustoAdicionalProjetoItem() {
    addDynamicItem("custosAdicionaisProjetoList", "Descrição do Custo Adicional", "Valor (R$)");
}

function removeItem(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
    }
}

// Função para ler valores de uma lista dinâmica
function getDynamicListValues(listId) {
    const list = document.getElementById(listId);
    let total = 0;
    const items = [];
    if (list) {
        for (let i = 0; i < list.children.length; i++) {
            const item = list.children[i];
            const desc = item.querySelector(".item-desc").value;
            const val = parseFloat(item.querySelector(".item-val").value) || 0;
            items.push({ desc, val });
            total += val;
        }
    }
    return { items, total };
}

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função principal para calcular custos fixos
function calcularCustosFixos() {
    const { total: totalCustosPessoais } = getDynamicListValues("custosPessoaisList");
    GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais = totalCustosPessoais;

    const salarioProLabore = parseFloat(document.getElementById("salarioProLabore").value) || 0;
    GLOBAIS_CUSTOS_FIXOS.salarioProLabore = salarioProLabore;

    const { total: custosEmpresaBase } = getDynamicListValues("custosEmpresaList");
    GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaBase = custosEmpresaBase;

    const decimoTerceiroMensal = salarioProLabore / 12;
    const feriasMensal = (salarioProLabore * (1/3)) / 12; // Férias é 1/3 do salário
    const totalCustosEmpresaCompleto = custosEmpresaBase + salarioProLabore + decimoTerceiroMensal + feriasMensal;
    GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaCompleto = totalCustosEmpresaCompleto;

    const { total: totalValorEquipamentos } = getDynamicListValues("equipamentosList");
    GLOBAIS_CUSTOS_FIXOS.totalValorEquipamentos = totalValorEquipamentos;
    const depreciacaoMensal = (totalValorEquipamentos * 0.15) / 12; // 15% ao ano
    GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal = depreciacaoMensal;

    const percentualGastosOcasionaisInput = parseFloat(document.getElementById("percentualGastosOcasionais").value) || 0;
    GLOBAIS_CUSTOS_FIXOS.percentualGastosOcasionais = percentualGastosOcasionaisInput / 100;
    
    const somaCustosBase = totalCustosPessoais + totalCustosEmpresaCompleto + depreciacaoMensal;
    const gastoMensalTotal = somaCustosBase * (1 + GLOBAIS_CUSTOS_FIXOS.percentualGastosOcasionais);
    GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal = gastoMensalTotal;

    const diasTrabalhadosMes = parseInt(document.getElementById("diasTrabalhadosMes").value) || 0;
    GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes = diasTrabalhadosMes;
    const horasTrabalhoDia = parseInt(document.getElementById("horasTrabalhoDia").value) || 0;
    GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia = horasTrabalhoDia;

    const valorDiaria = diasTrabalhadosMes > 0 ? gastoMensalTotal / diasTrabalhadosMes : 0;
    GLOBAIS_CUSTOS_FIXOS.valorDiaria = valorDiaria;
    const custoHoraBase = (diasTrabalhadosMes > 0 && horasTrabalhoDia > 0) ? valorDiaria / horasTrabalhoDia : 0;
    GLOBAIS_CUSTOS_FIXOS.custoHoraBase = custoHoraBase;

    // Exibir resultados
    document.getElementById("resTotalCustosPessoais").textContent = formatCurrency(totalCustosPessoais);
    document.getElementById("resTotalCustosEmpresa").textContent = formatCurrency(totalCustosEmpresaCompleto);
    document.getElementById("resTotalValorEquipamentos").textContent = formatCurrency(totalValorEquipamentos);
    document.getElementById("resDepreciacaoMensal").textContent = formatCurrency(depreciacaoMensal);
    document.getElementById("resGastoMensalTotal").textContent = formatCurrency(gastoMensalTotal);
    document.getElementById("resValorDiaria").textContent = formatCurrency(valorDiaria);
    document.getElementById("resCustoHoraBase").textContent = formatCurrency(custoHoraBase);
    document.getElementById("resultadosCustosFixos").style.display = "block";

    alert("Custos fixos calculados e atualizados! Você já pode ir para a aba 'Calcular Projeto'.");
}

// Função principal para calcular preço do projeto
function calcularPrecoProjeto() {
    if (GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal === 0 || GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes === 0 || GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia === 0) {
        alert("Por favor, calcule e atualize os Custos Fixos na aba 'Configurar Custos Fixos' primeiro.");
        openTab({currentTarget: document.querySelector('.tab-button')}, 'tabCustos'); // Simula clique na aba
        return;
    }

    const tempoTrabalhoProjetoHoras = parseFloat(document.getElementById("tempoTrabalhoProjeto").value) || 0;
    const numeroEntregaveis = parseInt(document.getElementById("numeroEntregaveis").value) || 0;
    const tempoEdicaoEntregavelMinutos = parseFloat(document.getElementById("tempoEdicaoEntregavel").value) || 0;

    const tempoTotalEdicaoHoras = (numeroEntregaveis * tempoEdicaoEntregavelMinutos) / 60;
    const tempoTotalMaoObraHoras = tempoTrabalhoProjetoHoras + tempoTotalEdicaoHoras;

    const { total: somaCustosAdicionaisProjeto } = getDynamicListValues("custosAdicionaisProjetoList");

    // Alocação dos custos fixos ao projeto
    // (Custo Fixo Mensal / Dias Trabalhados no Mês / Horas por Dia) * Horas do Projeto
    // Ou (Custo Fixo Mensal / (Dias Trabalhados * Horas por Dia)) * Horas do Projeto
    // Ou CustoHoraBase * Horas do Projeto
    const totalHorasTrabalhaveisMes = GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes * GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia;
    if (totalHorasTrabalhaveisMes === 0) {
        alert("Dias trabalhados ou horas por dia não podem ser zero. Verifique a configuração de custos.");
        return;
    }

    const parcelaCustoPessoal = (GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaSalario = (GLOBAIS_CUSTOS_FIXOS.salarioProLabore / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcela13 = ((GLOBAIS_CUSTOS_FIXOS.salarioProLabore / 12) / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaFerias = (((GLOBAIS_CUSTOS_FIXOS.salarioProLabore * (1/3)) / 12) / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaCustoEmpresaBase = (GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaBase / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaDepreciacao = (GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaGastosOcasionais = ((GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais + GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaCompleto + GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal) * GLOBAIS_CUSTOS_FIXOS.percentualGastosOcasionais / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;

    const custoTotalAlocadoAoProjeto = parcelaCustoPessoal + parcelaSalario + parcela13 + parcelaFerias + parcelaCustoEmpresaBase + parcelaDepreciacao + parcelaGastosOcasionais + somaCustosAdicionaisProjeto;

    const percentualLucro = (parseFloat(document.getElementById("percentualLucro").value) || 0) / 100;
    const valorLucro = custoTotalAlocadoAoProjeto * percentualLucro;

    const subtotalAntesImpostos = custoTotalAlocadoAoProjeto + valorLucro;
    const percentualImpostos = (parseFloat(document.getElementById("percentualImpostos").value) || 0) / 100;
    const valorImpostos = subtotalAntesImpostos * percentualImpostos; // Imposto sobre o faturamento (subtotal)
    
    const precoPix = subtotalAntesImpostos + valorImpostos;

    const taxaCartao = (parseFloat(document.getElementById("taxaCartao").value) || 0) / 100;
    const precoCartao = taxaCartao > 0 ? precoPix / (1 - taxaCartao) : precoPix;

    // Resultados
    document.getElementById("resCustoTotalAlocadoProjeto").textContent = formatCurrency(custoTotalAlocadoAoProjeto);
    document.getElementById("resLucroProjeto").textContent = formatCurrency(valorLucro);
    document.getElementById("resImpostosProjeto").textContent = formatCurrency(valorImpostos);
    document.getElementById("resPrecoPix").textContent = formatCurrency(precoPix);
    document.getElementById("resPrecoCartao").textContent = formatCurrency(precoCartao);

    // Resumo Financeiro
    document.getElementById("resResumoCustoPessoal").textContent = formatCurrency(parcelaCustoPessoal);
    document.getElementById("resResumoCustoEmpresa").textContent = formatCurrency(parcelaCustoEmpresaBase); // Base, sem pro-labore etc, pois já estão separados
    document.getElementById("resResumoSalario").textContent = formatCurrency(parcelaSalario);
    document.getElementById("resResumo13").textContent = formatCurrency(parcela13);
    document.getElementById("resResumoFerias").textContent = formatCurrency(parcelaFerias);
    document.getElementById("resResumoDepreciacao").textContent = formatCurrency(parcelaDepreciacao);
    document.getElementById("resResumoGastosOcasionais").textContent = formatCurrency(parcelaGastosOcasionais);
    document.getElementById("resResumoCustosAdicionais").textContent = formatCurrency(somaCustosAdicionaisProjeto);
    document.getElementById("resResumoLucro").textContent = formatCurrency(valorLucro);
    document.getElementById("resResumoImpostos").textContent = formatCurrency(valorImpostos);

    const contribuicaoMarginalProjeto = precoPix - valorImpostos - somaCustosAdicionaisProjeto - valorLucro; // O que sobra para cobrir custos fixos e gerar lucro
    // Ou, de forma mais simples, o custo alocado SEM os custos adicionais e SEM o lucro e SEM impostos.
    // CustoTotalAlocado - CustosAdicionais - Lucro - Impostos
    // A planilha usa: GastoMensal / (PrecoPix - Impostos - Lucro - CustosAdicionaisDoProjeto)
    // GastoMensal / (G13 - CustoAdicionais) -> G13 é o CustoTotalAlocadoAoProjeto
    // GastoMensal / (CustoTotalAlocadoAoProjeto - somaCustosAdicionaisProjeto)
    const baseParaCobrirCustosFixos = custoTotalAlocadoAoProjeto - somaCustosAdicionaisProjeto;
    const projetosNecessariosMes = baseParaCobrirCustosFixos > 0 ? Math.ceil(GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal / baseParaCobrirCustosFixos) : Infinity;
    document.getElementById("resProjetosNecessariosMes").textContent = isFinite(projetosNecessariosMes) ? projetosNecessariosMes : "N/A (custo do projeto não cobre custos fixos alocados)";

    // Opcionais (simplificado)
    const precoPorEntregavelBase = numeroEntregaveis > 0 ? precoPix / numeroEntregaveis : 0;
    document.getElementById("resPrecoEntregavelAdicional").textContent = formatCurrency(precoPorEntregavelBase * 1.5); // Ex: 50% a mais
    
    const precoPorHoraBase = tempoTotalMaoObraHoras > 0 ? precoPix / tempoTotalMaoObraHoras : 0;
    document.getElementById("resPrecoHoraAdicional").textContent = formatCurrency(precoPorHoraBase * 1.2); // Ex: 20% a mais

    document.getElementById("resultadosProjeto").style.display = "block";
}

// Inicializar com alguns campos dinâmicos para facilitar o teste
window.onload = () => {
    // Adicionar itens iniciais para teste rápido
    addCustoPessoalItem();
    addCustoEmpresaItem();
    addEquipamentoItem();
    addCustoAdicionalProjetoItem();
    // Ativar a primeira aba
    document.querySelector('.tab-button.active').click(); 
};

