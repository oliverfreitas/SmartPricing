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

const APP_DATA_KEY = "smartPricingAppData_v2"; // Chave para dados gerais da app e projeto atual
const HISTORICO_PROJETOS_KEY = "smartPricingHistoricoProjetos_v2"; // Chave para o array de projetos salvos

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
    if (evt && evt.currentTarget) {
        evt.currentTarget.className += " active";
    }
    
    // Salvar aba ativa e carregar histórico se for a aba de histórico
    const appData = JSON.parse(localStorage.getItem(APP_DATA_KEY)) || {};
    appData.activeTab = tabName;
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(appData));

    if (tabName === "tabHistorico") {
        carregarHistoricoProjetos();
    }
}

// Funções para adicionar itens dinâmicos
function addDynamicItem(listId, placeholderDesc, placeholderVal, itemDesc = "", itemVal = 0) {
    const list = document.getElementById(listId);
    const itemId = listId + "_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    const listItem = document.createElement("div");
    listItem.className = "dynamic-list-item";
    listItem.id = itemId;
    listItem.innerHTML = `
        <input type="text" placeholder="${placeholderDesc}" class="item-desc" value="${itemDesc}">
        <input type="number" placeholder="${placeholderVal}" class="item-val" value="${itemVal}">
        <button type="button" class="remove-btn" onclick="removeItem(\'${itemId}\')">Remover</button>
    `;
    list.appendChild(listItem);
}

function addCustoPessoalItem(desc = "", val = 0) { addDynamicItem("custosPessoaisList", "Descrição do Custo Pessoal", "Valor (R$)", desc, val); }
function addCustoEmpresaItem(desc = "", val = 0) { addDynamicItem("custosEmpresaList", "Descrição do Custo da Empresa", "Valor (R$)", desc, val); }
function addEquipamentoItem(desc = "", val = 0) { addDynamicItem("equipamentosList", "Descrição do Equipamento", "Valor de Aquisição (R$)", desc, val); }
function addCustoAdicionalProjetoItem(desc = "", val = 0) { addDynamicItem("custosAdicionaisProjetoList", "Descrição do Custo Adicional", "Valor (R$)", desc, val); }

function removeItem(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
        saveAppDataToLocalStorage();
    }
}

function getElementValue(id, isNumeric = false, isInt = false) {
    const element = document.getElementById(id);
    if (!element) return isNumeric ? 0 : "";
    let value = element.value;
    if (isNumeric) {
        return isInt ? (parseInt(value) || 0) : (parseFloat(value) || 0);
    }
    return value;
}

function getElementText(id) {
    const element = document.getElementById(id);
    return element ? element.textContent : "";
}

function getDynamicListValues(listId) {
    const list = document.getElementById(listId);
    let total = 0;
    const items = [];
    if (list) {
        for (let i = 0; i < list.children.length; i++) {
            const itemNode = list.children[i];
            const desc = itemNode.querySelector(".item-desc").value;
            const val = parseFloat(itemNode.querySelector(".item-val").value) || 0;
            items.push({ desc, val });
            total += val;
        }
    }
    return { items, total };
}

function formatCurrency(value) {
    if (isNaN(value) || value === null) return "R$ 0,00";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" }); // Adicionado UTC para consistência
}

// --- Persistência de Dados da Aplicação (Custos Fixos e Projeto Atual) ---
function saveAppDataToLocalStorage() {
    const appData = JSON.parse(localStorage.getItem(APP_DATA_KEY)) || {};
    appData.activeTab = document.querySelector(".tab-button.active")?.getAttribute("onclick")?.split("'")[1] || "tabCustos";
    appData.custosFixos = {
        salarioProLabore: getElementValue("salarioProLabore", true),
        diasTrabalhadosMes: getElementValue("diasTrabalhadosMes", true, true),
        horasTrabalhoDia: getElementValue("horasTrabalhoDia", true, true),
        percentualGastosOcasionais: getElementValue("percentualGastosOcasionais", true),
        custosPessoaisList: getDynamicListValues("custosPessoaisList").items,
        custosEmpresaList: getDynamicListValues("custosEmpresaList").items,
        equipamentosList: getDynamicListValues("equipamentosList").items
    };
    appData.projetoAtual = {
        nomeContratante: getElementValue("nomeContratante"),
        dataProjeto: getElementValue("dataProjeto"),
        descricaoProjeto: getElementValue("descricaoProjeto"),
        tempoTrabalhoProjeto: getElementValue("tempoTrabalhoProjeto", true),
        numeroEntregaveis: getElementValue("numeroEntregaveis", true, true),
        tempoEdicaoEntregavel: getElementValue("tempoEdicaoEntregavel", true),
        custosAdicionaisProjetoList: getDynamicListValues("custosAdicionaisProjetoList").items,
        percentualLucro: getElementValue("percentualLucro", true),
        percentualImpostos: getElementValue("percentualImpostos", true),
        taxaCartao: getElementValue("taxaCartao", true)
    };
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(appData));
}

function loadAppDataFromLocalStorage() {
    const savedAppData = localStorage.getItem(APP_DATA_KEY);
    if (savedAppData) {
        const data = JSON.parse(savedAppData);
        if (data.custosFixos) {
            document.getElementById("salarioProLabore").value = data.custosFixos.salarioProLabore || "";
            document.getElementById("diasTrabalhadosMes").value = data.custosFixos.diasTrabalhadosMes || "";
            document.getElementById("horasTrabalhoDia").value = data.custosFixos.horasTrabalhoDia || "";
            document.getElementById("percentualGastosOcasionais").value = data.custosFixos.percentualGastosOcasionais || 10;
            document.getElementById("custosPessoaisList").innerHTML = ""; 
            if (data.custosFixos.custosPessoaisList) data.custosFixos.custosPessoaisList.forEach(item => addCustoPessoalItem(item.desc, item.val));
            document.getElementById("custosEmpresaList").innerHTML = "";
            if (data.custosFixos.custosEmpresaList) data.custosFixos.custosEmpresaList.forEach(item => addCustoEmpresaItem(item.desc, item.val));
            document.getElementById("equipamentosList").innerHTML = "";
            if (data.custosFixos.equipamentosList) data.custosFixos.equipamentosList.forEach(item => addEquipamentoItem(item.desc, item.val));
        }
        if (data.projetoAtual) {
            document.getElementById("nomeContratante").value = data.projetoAtual.nomeContratante || "";
            document.getElementById("dataProjeto").value = data.projetoAtual.dataProjeto || "";
            document.getElementById("descricaoProjeto").value = data.projetoAtual.descricaoProjeto || "";
            document.getElementById("tempoTrabalhoProjeto").value = data.projetoAtual.tempoTrabalhoProjeto || "";
            document.getElementById("numeroEntregaveis").value = data.projetoAtual.numeroEntregaveis || "";
            document.getElementById("tempoEdicaoEntregavel").value = data.projetoAtual.tempoEdicaoEntregavel || "";
            document.getElementById("percentualLucro").value = data.projetoAtual.percentualLucro || 30;
            document.getElementById("percentualImpostos").value = data.projetoAtual.percentualImpostos || 6;
            document.getElementById("taxaCartao").value = data.projetoAtual.taxaCartao || "";
            document.getElementById("custosAdicionaisProjetoList").innerHTML = "";
            if (data.projetoAtual.custosAdicionaisProjetoList) data.projetoAtual.custosAdicionaisProjetoList.forEach(item => addCustoAdicionalProjetoItem(item.desc, item.val));
        }
        if (data.custosFixos && (data.custosFixos.diasTrabalhadosMes || data.custosFixos.salarioProLabore)) {
            calcularCustosFixos(false); 
        }
        const activeTab = data.activeTab || "tabCustos";
        const tabButton = document.querySelector(`button[onclick*="${activeTab}"]`);
        if (tabButton) tabButton.click();
    }
}

// --- Cálculos ---
function calcularCustosFixos(showAlert = true) {
    GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais = getDynamicListValues("custosPessoaisList").total;
    GLOBAIS_CUSTOS_FIXOS.salarioProLabore = getElementValue("salarioProLabore", true);
    GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaBase = getDynamicListValues("custosEmpresaList").total;
    const decimoTerceiroMensal = GLOBAIS_CUSTOS_FIXOS.salarioProLabore / 12;
    const feriasMensal = (GLOBAIS_CUSTOS_FIXOS.salarioProLabore * (1/3)) / 12; 
    GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaCompleto = GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaBase + GLOBAIS_CUSTOS_FIXOS.salarioProLabore + decimoTerceiroMensal + feriasMensal;
    GLOBAIS_CUSTOS_FIXOS.totalValorEquipamentos = getDynamicListValues("equipamentosList").total;
    GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal = (GLOBAIS_CUSTOS_FIXOS.totalValorEquipamentos * 0.15) / 12; 
    GLOBAIS_CUSTOS_FIXOS.percentualGastosOcasionais = getElementValue("percentualGastosOcasionais", true) / 100;
    const somaCustosBase = GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais + GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaCompleto + GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal;
    GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal = somaCustosBase * (1 + GLOBAIS_CUSTOS_FIXOS.percentualGastosOcasionais);
    GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes = getElementValue("diasTrabalhadosMes", true, true);
    GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia = getElementValue("horasTrabalhoDia", true, true);
    GLOBAIS_CUSTOS_FIXOS.valorDiaria = GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes > 0 ? GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal / GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes : 0;
    GLOBAIS_CUSTOS_FIXOS.custoHoraBase = (GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes > 0 && GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia > 0) ? GLOBAIS_CUSTOS_FIXOS.valorDiaria / GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia : 0;

    document.getElementById("resTotalCustosPessoais").textContent = formatCurrency(GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais);
    document.getElementById("resTotalCustosEmpresa").textContent = formatCurrency(GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaCompleto);
    document.getElementById("resTotalValorEquipamentos").textContent = formatCurrency(GLOBAIS_CUSTOS_FIXOS.totalValorEquipamentos);
    document.getElementById("resDepreciacaoMensal").textContent = formatCurrency(GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal);
    document.getElementById("resGastoMensalTotal").textContent = formatCurrency(GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal);
    document.getElementById("resValorDiaria").textContent = formatCurrency(GLOBAIS_CUSTOS_FIXOS.valorDiaria);
    document.getElementById("resCustoHoraBase").textContent = formatCurrency(GLOBAIS_CUSTOS_FIXOS.custoHoraBase);
    document.getElementById("resultadosCustosFixos").style.display = "block";
    saveAppDataToLocalStorage();
    if (showAlert) alert("Custos fixos calculados, atualizados e salvos no seu navegador!");
}

let currentProjectResults = {};

function calcularPrecoProjeto(showAlert = true) {
    if (GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal === 0 || GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes === 0 || GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia === 0) {
        if (showAlert) alert("Por favor, calcule e atualize os Custos Fixos na aba Configurar Custos Fixos primeiro.");
        const tabButton = document.querySelector("button[onclick*=\"tabCustos\"]");
        if (tabButton) tabButton.click();
        return null;
    }
    const tempoTrabalhoProjetoHoras = getElementValue("tempoTrabalhoProjeto", true);
    const numeroEntregaveis = getElementValue("numeroEntregaveis", true, true);
    const tempoEdicaoEntregavelMinutos = getElementValue("tempoEdicaoEntregavel", true);
    const tempoTotalEdicaoHoras = (numeroEntregaveis * tempoEdicaoEntregavelMinutos) / 60;
    const tempoTotalMaoObraHoras = tempoTrabalhoProjetoHoras + tempoTotalEdicaoHoras;
    const { total: somaCustosAdicionaisProjeto } = getDynamicListValues("custosAdicionaisProjetoList");
    const totalHorasTrabalhaveisMes = GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes * GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia;
    if (totalHorasTrabalhaveisMes === 0) {
        if (showAlert) alert("Dias trabalhados ou horas por dia não podem ser zero. Verifique a configuração de custos.");
        return null;
    }
    const parcelaCustoPessoal = (GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaSalario = (GLOBAIS_CUSTOS_FIXOS.salarioProLabore / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcela13 = ((GLOBAIS_CUSTOS_FIXOS.salarioProLabore / 12) / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaFerias = (((GLOBAIS_CUSTOS_FIXOS.salarioProLabore * (1/3)) / 12) / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaCustoEmpresaBase = (GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaBase / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaDepreciacao = (GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const parcelaGastosOcasionais = ((GLOBAIS_CUSTOS_FIXOS.totalCustosPessoais + GLOBAIS_CUSTOS_FIXOS.totalCustosEmpresaCompleto + GLOBAIS_CUSTOS_FIXOS.depreciacaoMensal) * GLOBAIS_CUSTOS_FIXOS.percentualGastosOcasionais / totalHorasTrabalhaveisMes) * tempoTotalMaoObraHoras;
    const custoTotalAlocadoAoProjeto = parcelaCustoPessoal + parcelaSalario + parcela13 + parcelaFerias + parcelaCustoEmpresaBase + parcelaDepreciacao + parcelaGastosOcasionais + somaCustosAdicionaisProjeto;
    const percentualLucro = getElementValue("percentualLucro", true) / 100;
    const valorLucro = custoTotalAlocadoAoProjeto * percentualLucro;
    const subtotalAntesImpostos = custoTotalAlocadoAoProjeto + valorLucro;
    const percentualImpostos = getElementValue("percentualImpostos", true) / 100;
    const valorImpostos = subtotalAntesImpostos * percentualImpostos; 
    const precoPix = subtotalAntesImpostos + valorImpostos;
    const taxaCartao = getElementValue("taxaCartao", true) / 100;
    const precoCartao = taxaCartao > 0 && taxaCartao < 1 ? precoPix / (1 - taxaCartao) : precoPix;

    currentProjectResults = {
        custoTotalAlocadoAoProjeto, valorLucro, valorImpostos, precoPix, precoCartao,
        parcelaCustoPessoal, parcelaCustoEmpresaBase, parcelaSalario, parcela13, parcelaFerias,
        parcelaDepreciacao, parcelaGastosOcasionais, somaCustosAdicionaisProjeto,
        projetosNecessariosMes: (custoTotalAlocadoAoProjeto - somaCustosAdicionaisProjeto > 0) ? Math.ceil(GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal / (custoTotalAlocadoAoProjeto - somaCustosAdicionaisProjeto)) : Infinity,
        precoPorEntregavelAdicional: (numeroEntregaveis > 0 ? precoPix / numeroEntregaveis : 0) * 1.5,
        precoPorHoraAdicional: (tempoTotalMaoObraHoras > 0 ? precoPix / tempoTotalMaoObraHoras : 0) * 1.2
    };

    document.getElementById("resCustoTotalAlocadoProjeto").textContent = formatCurrency(currentProjectResults.custoTotalAlocadoAoProjeto);
    document.getElementById("resLucroProjeto").textContent = formatCurrency(currentProjectResults.valorLucro);
    document.getElementById("resImpostosProjeto").textContent = formatCurrency(currentProjectResults.valorImpostos);
    document.getElementById("resPrecoPix").textContent = formatCurrency(currentProjectResults.precoPix);
    document.getElementById("resPrecoCartao").textContent = formatCurrency(currentProjectResults.precoCartao);
    document.getElementById("resResumoCustoPessoal").textContent = formatCurrency(currentProjectResults.parcelaCustoPessoal);
    document.getElementById("resResumoCustoEmpresa").textContent = formatCurrency(currentProjectResults.parcelaCustoEmpresaBase); 
    document.getElementById("resResumoSalario").textContent = formatCurrency(currentProjectResults.parcelaSalario);
    document.getElementById("resResumo13").textContent = formatCurrency(currentProjectResults.parcela13);
    document.getElementById("resResumoFerias").textContent = formatCurrency(currentProjectResults.parcelaFerias);
    document.getElementById("resResumoDepreciacao").textContent = formatCurrency(currentProjectResults.parcelaDepreciacao);
    document.getElementById("resResumoGastosOcasionais").textContent = formatCurrency(currentProjectResults.parcelaGastosOcasionais);
    document.getElementById("resResumoCustosAdicionais").textContent = formatCurrency(currentProjectResults.somaCustosAdicionaisProjeto);
    document.getElementById("resResumoLucro").textContent = formatCurrency(currentProjectResults.valorLucro);
    document.getElementById("resResumoImpostos").textContent = formatCurrency(currentProjectResults.valorImpostos);
    document.getElementById("resProjetosNecessariosMes").textContent = isFinite(currentProjectResults.projetosNecessariosMes) ? currentProjectResults.projetosNecessariosMes : "N/A";
    document.getElementById("resPrecoEntregavelAdicional").textContent = formatCurrency(currentProjectResults.precoPorEntregavelAdicional);
    document.getElementById("resPrecoHoraAdicional").textContent = formatCurrency(currentProjectResults.precoPorHoraAdicional);
    document.getElementById("resultadosProjeto").style.display = "block";
    saveAppDataToLocalStorage();
    if (showAlert) alert("Preço do projeto calculado e dados atuais salvos no seu navegador!");
    return currentProjectResults;
}

// --- Funções do Histórico de Projetos ---
function salvarProjetoNoHistorico() {
    const resultadosCalculados = currentProjectResults;
    if (!resultadosCalculados || Object.keys(resultadosCalculados).length === 0 || !document.getElementById("resultadosProjeto").style.display || document.getElementById("resultadosProjeto").style.display === "none") {
        alert("Calcule um projeto primeiro e verifique se os resultados estão visíveis antes de tentar salvar!");
        return;
    }
    const nomeProjetoSalvo = prompt("Digite um nome para este projeto (ex: Casamento Maria e João):");
    if (!nomeProjetoSalvo || nomeProjetoSalvo.trim() === "") {
        alert("Nome do projeto não fornecido. O projeto não foi salvo.");
        return;
    }
    const projetoParaSalvar = {
        id: "proj_" + Date.now(),
        nomeProjetoSalvo: nomeProjetoSalvo.trim(),
        dataSalvamento: new Date().toISOString(),
        inputsProjeto: {
            nomeContratante: getElementValue("nomeContratante"),
            dataProjeto: getElementValue("dataProjeto"),
            descricaoProjeto: getElementValue("descricaoProjeto"),
            tempoTrabalhoProjeto: getElementValue("tempoTrabalhoProjeto", true),
            numeroEntregaveis: getElementValue("numeroEntregaveis", true, true),
            tempoEdicaoEntregavel: getElementValue("tempoEdicaoEntregavel", true),
            custosAdicionaisProjetoList: getDynamicListValues("custosAdicionaisProjetoList").items,
            percentualLucro: getElementValue("percentualLucro", true),
            percentualImpostos: getElementValue("percentualImpostos", true),
            taxaCartao: getElementValue("taxaCartao", true)
        },
        resultadosNumericos: resultadosCalculados,
        resumoParaLista: {
            nomeContratante: getElementValue("nomeContratante"),
            dataProjeto: getElementValue("dataProjeto"),
            precoPixFormatado: getElementText("resPrecoPix"),
            precoCartaoFormatado: getElementText("resPrecoCartao")
        },
        detalhesFormatados: {
            resCustoTotalAlocadoProjeto: getElementText("resCustoTotalAlocadoProjeto"), resLucroProjeto: getElementText("resLucroProjeto"),
            resImpostosProjeto: getElementText("resImpostosProjeto"), resPrecoPix: getElementText("resPrecoPix"),
            resPrecoCartao: getElementText("resPrecoCartao"), resResumoCustoPessoal: getElementText("resResumoCustoPessoal"),
            resResumoCustoEmpresa: getElementText("resResumoCustoEmpresa"), resResumoSalario: getElementText("resResumoSalario"),
            resResumo13: getElementText("resResumo13"), resResumoFerias: getElementText("resResumoFerias"),
            resResumoDepreciacao: getElementText("resResumoDepreciacao"), resResumoGastosOcasionais: getElementText("resResumoGastosOcasionais"),
            resResumoCustosAdicionais: getElementText("resResumoCustosAdicionais"), resResumoLucro: getElementText("resResumoLucro"),
            resResumoImpostos: getElementText("resResumoImpostos"), resProjetosNecessariosMes: getElementText("resProjetosNecessariosMes"),
            resPrecoEntregavelAdicional: getElementText("resPrecoEntregavelAdicional"), resPrecoHoraAdicional: getElementText("resPrecoHoraAdicional")
        },
        configCustosFixosUsada: JSON.parse(JSON.stringify(GLOBAIS_CUSTOS_FIXOS))
    };
    let historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    historico.unshift(projetoParaSalvar);
    localStorage.setItem(HISTORICO_PROJETOS_KEY, JSON.stringify(historico));
    alert(`Projeto "${nomeProjetoSalvo}" salvo com sucesso no histórico!`);
    currentProjectResults = {}; 
    if (document.getElementById("tabHistorico").style.display === "block") {
        carregarHistoricoProjetos();
    }
}

function carregarHistoricoProjetos() {
    const listaHistoricoDiv = document.getElementById("listaHistoricoProjetos");
    const historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    listaHistoricoDiv.innerHTML = ""; // Limpa a lista atual

    if (historico.length === 0) {
        listaHistoricoDiv.innerHTML = "<p>Nenhum projeto salvo ainda.</p>";
        return;
    }

    historico.forEach(projeto => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "historico-item";
        itemDiv.innerHTML = `
            <h4>${projeto.nomeProjetoSalvo}</h4>
            <p><strong>Contratante:</strong> ${projeto.resumoParaLista.nomeContratante || "N/A"}</p>
            <p><strong>Data do Projeto:</strong> ${formatDate(projeto.resumoParaLista.dataProjeto)}</p>
            <p><strong>Descrição:</strong> ${projeto.inputsProjeto.descricaoProjeto ? (projeto.inputsProjeto.descricaoProjeto.substring(0, 100) + (projeto.inputsProjeto.descricaoProjeto.length > 100 ? "..." : "")) : "N/A"}</p>
            <p><strong>Preço PIX:</strong> ${projeto.resumoParaLista.precoPixFormatado}</p>
            <p><strong>Preço Cartão:</strong> ${projeto.resumoParaLista.precoCartaoFormatado}</p>
            <div class="historico-item-actions">
                <button type="button" onclick="exibirDetalhesProjeto(\'${projeto.id}\')">Ver Detalhes</button>
                <button type="button" class="remove-btn" onclick="excluirProjetoDoHistorico(\'${projeto.id}\')">Excluir</button>
            </div>
        `;
        listaHistoricoDiv.appendChild(itemDiv);
    });
}

function exibirDetalhesProjeto(projetoId) {
    const historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    const projeto = historico.find(p => p.id === projetoId);
    if (!projeto) {
        alert("Projeto não encontrado no histórico.");
        return;
    }

    document.getElementById("modalNomeProjetoSalvo").textContent = projeto.nomeProjetoSalvo;
    const modalBody = document.getElementById("modalBodyDetalhesProjeto");
    modalBody.innerHTML = `
        <h3>Informações do Projeto</h3>
        <p><strong>Nome do Contratante:</strong> ${projeto.inputsProjeto.nomeContratante || "N/A"}</p>
        <p><strong>Data do Projeto:</strong> ${formatDate(projeto.inputsProjeto.dataProjeto)}</p>
        <p><strong>Descrição Detalhada:</strong></p>
        <p style="white-space: pre-wrap; word-break: break-word;">${projeto.inputsProjeto.descricaoProjeto || "N/A"}</p>
        <hr>
        <h3>Resultados do Projeto</h3>
        <p>Custo Total Alocado ao Projeto: <strong>${projeto.detalhesFormatados.resCustoTotalAlocadoProjeto}</strong></p>
        <p>Valor do Lucro Calculado: <strong>${projeto.detalhesFormatados.resLucroProjeto}</strong></p>
        <p>Valor dos Impostos Estimados: <strong>${projeto.detalhesFormatados.resImpostosProjeto}</strong></p>
        <p><strong>Preço Sugerido (PIX/À Vista): <strong>${projeto.detalhesFormatados.resPrecoPix}</strong></strong></p>
        <p><strong>Preço Sugerido (Cartão): <strong>${projeto.detalhesFormatados.resPrecoCartao}</strong></strong></p>
        
        <h4>Resumo Financeiro Detalhado:</h4>
        <p>Parcela do Custo Pessoal: <strong>${projeto.detalhesFormatados.resResumoCustoPessoal}</strong></p>
        <p>Parcela do Custo da Empresa: <strong>${projeto.detalhesFormatados.resResumoCustoEmpresa}</strong></p>
        <p>Parcela do Salário (Pró-labore): <strong>${projeto.detalhesFormatados.resResumoSalario}</strong></p>
        <p>Parcela do 13º: <strong>${projeto.detalhesFormatados.resResumo13}</strong></p>
        <p>Parcela das Férias: <strong>${projeto.detalhesFormatados.resResumoFerias}</strong></p>
        <p>Parcela da Depreciação: <strong>${projeto.detalhesFormatados.resResumoDepreciacao}</strong></p>
        <p>Parcela dos Gastos Ocasionais: <strong>${projeto.detalhesFormatados.resResumoGastosOcasionais}</strong></p>
        <p>Soma dos Custos Adicionais do Projeto: <strong>${projeto.detalhesFormatados.resResumoCustosAdicionais}</strong></p>
        <p>Lucro do Projeto: <strong>${projeto.detalhesFormatados.resResumoLucro}</strong></p>
        <p>Impostos do Projeto: <strong>${projeto.detalhesFormatados.resResumoImpostos}</strong></p>
        
        <p>Para cobrir seus custos mensais, você precisaria de aproximadamente <strong>${projeto.detalhesFormatados.resProjetosNecessariosMes}</strong> projetos como este no mês.</p>
        
        <h4>Opcionais:</h4>
        <p>Preço Sugerido por Entregável Adicional: <strong>${projeto.detalhesFormatados.resPrecoEntregavelAdicional}</strong></p>
        <p>Preço Sugerido por Hora Adicional de Trabalho: <strong>${projeto.detalhesFormatados.resPrecoHoraAdicional}</strong></p>
        
        <hr>
        <h4>Configuração de Custos Fixos Usada Neste Cálculo:</h4>
        <p>Salário Pró-labore: ${formatCurrency(projeto.configCustosFixosUsada.salarioProLabore)}</p>
        <p>Dias Trabalhados/Mês: ${projeto.configCustosFixosUsada.diasTrabalhadosMes}</p>
        <p>Horas/Dia: ${projeto.configCustosFixosUsada.horasTrabalhoDia}</p>
        <p>Gasto Mensal Total (na época): ${formatCurrency(projeto.configCustosFixosUsada.gastoMensalTotal)}</p>
        <p>Custo/Hora Base (na época): ${formatCurrency(projeto.configCustosFixosUsada.custoHoraBase)}</p>
    `;
    document.getElementById("modalDetalhesProjeto").style.display = "block";
}

function fecharModalDetalhes() {
    document.getElementById("modalDetalhesProjeto").style.display = "none";
}

function excluirProjetoDoHistorico(projetoId) {
    if (!confirm("Tem certeza que deseja excluir este projeto do histórico? Esta ação não pode ser desfeita.")) {
        return;
    }
    let historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    historico = historico.filter(p => p.id !== projetoId);
    localStorage.setItem(HISTORICO_PROJETOS_KEY, JSON.stringify(historico));
    carregarHistoricoProjetos(); // Atualiza a lista na tela
    alert("Projeto excluído do histórico.");
}

// --- Inicialização e Event Listeners ---
function addInputListeners() {
    const inputs = document.querySelectorAll("input[type=\"text\"], input[type=\"number\"], input[type=\"date\"], textarea");
    inputs.forEach(input => {
        input.addEventListener("change", saveAppDataToLocalStorage);
        input.addEventListener("keyup", saveAppDataToLocalStorage);
    });
}

window.onload = () => {
    loadAppDataFromLocalStorage(); // Carrega dados da app e projeto atual, e define aba ativa
    addInputListeners();
    
    if (document.getElementById("custosPessoaisList").children.length === 0) addCustoPessoalItem();
    if (document.getElementById("custosEmpresaList").children.length === 0) addCustoEmpresaItem();
    if (document.getElementById("equipamentosList").children.length === 0) addEquipamentoItem();
    if (document.getElementById("custosAdicionaisProjetoList").children.length === 0) addCustoAdicionalProjetoItem();

    // Se a aba de histórico for a ativa ao carregar, popula a lista
    if (document.getElementById("tabHistorico").style.display === "block") {
        carregarHistoricoProjetos();
    }
    // Fechar modal se clicar fora dele
    window.onclick = function(event) {
        const modal = document.getElementById("modalDetalhesProjeto");
        if (event.target == modal) {
            fecharModalDetalhes();
        }
    }
};

