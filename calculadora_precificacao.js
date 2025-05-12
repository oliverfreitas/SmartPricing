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
const THEME_KEY = "smartPricingTheme"; // Chave para o tema selecionado

// --- Gerenciamento de Tema ---
function applyTheme(theme) {
    if (theme === "auto") {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.classList.toggle("theme-dark", prefersDark);
    } else {
        document.body.classList.toggle("theme-dark", theme === "dark");
    }
}

function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.getElementById("themeSelector").value = theme;
    applyTheme(theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "auto"; // Default to auto
    setTheme(savedTheme);
}

// Listener para mudanças no tema do sistema (para modo automático)
if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        const currentTheme = localStorage.getItem(THEME_KEY);
        if (currentTheme === "auto") {
            applyTheme("auto");
        }
    });
}

// --- Fim do Gerenciamento de Tema ---

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
        precoPorHoraAdicional: (tempoTotalMaoObraHoras > 0 ? precoPix / tempoTotalMaoObraHoras : 0) * 1.2,
        // Informações do projeto para o resumo
        nomeContratante: getElementValue("nomeContratante"),
        dataProjeto: getElementValue("dataProjeto"),
        descricaoProjeto: getElementValue("descricaoProjeto"),
        tempoTrabalhoProjetoHoras,
        numeroEntregaveis,
        tempoEdicaoEntregavelMinutos,
        custosAdicionaisProjetoList: getDynamicListValues("custosAdicionaisProjetoList").items,
        percentualLucro: getElementValue("percentualLucro", true),
        percentualImpostos: getElementValue("percentualImpostos", true),
        taxaCartao: getElementValue("taxaCartao", true)
    };

    document.getElementById("resCustoTotalAlocadoProjeto").textContent = formatCurrency(custoTotalAlocadoAoProjeto);
    document.getElementById("resLucroProjeto").textContent = formatCurrency(valorLucro);
    document.getElementById("resImpostosProjeto").textContent = formatCurrency(valorImpostos);
    document.getElementById("resPrecoPix").textContent = formatCurrency(precoPix);
    document.getElementById("resPrecoCartao").textContent = formatCurrency(precoCartao);
    document.getElementById("resResumoCustoPessoal").textContent = formatCurrency(parcelaCustoPessoal);
    document.getElementById("resResumoCustoEmpresa").textContent = formatCurrency(parcelaCustoEmpresaBase);
    document.getElementById("resResumoSalario").textContent = formatCurrency(parcelaSalario);
    document.getElementById("resResumo13").textContent = formatCurrency(parcela13);
    document.getElementById("resResumoFerias").textContent = formatCurrency(parcelaFerias);
    document.getElementById("resResumoDepreciacao").textContent = formatCurrency(parcelaDepreciacao);
    document.getElementById("resResumoGastosOcasionais").textContent = formatCurrency(parcelaGastosOcasionais);
    document.getElementById("resResumoCustosAdicionais").textContent = formatCurrency(somaCustosAdicionaisProjeto);
    document.getElementById("resResumoLucro").textContent = formatCurrency(valorLucro);
    document.getElementById("resResumoImpostos").textContent = formatCurrency(valorImpostos);
    document.getElementById("resProjetosNecessariosMes").textContent = isFinite(currentProjectResults.projetosNecessariosMes) ? currentProjectResults.projetosNecessariosMes : "N/A";
    document.getElementById("resPrecoEntregavelAdicional").textContent = formatCurrency(currentProjectResults.precoPorEntregavelAdicional);
    document.getElementById("resPrecoHoraAdicional").textContent = formatCurrency(currentProjectResults.precoPorHoraAdicional);
    document.getElementById("resultadosProjeto").style.display = "block";
    saveAppDataToLocalStorage();
    if (showAlert) alert("Preço do projeto calculado e salvo no seu navegador!");
    return currentProjectResults;
}

// --- Histórico de Projetos ---
function salvarProjetoNoHistorico() {
    const nomeProjetoSalvo = prompt("Digite um nome para este projeto (ex: Casamento Ana e João):");
    if (!nomeProjetoSalvo) {
        alert("Salvamento cancelado. É necessário fornecer um nome para o projeto.");
        return;
    }

    const resultadosDoCalculo = calcularPrecoProjeto(false); // Calcula sem alerta e pega os resultados
    if (!resultadosDoCalculo) {
        alert("Não foi possível calcular o projeto. Verifique os dados e tente novamente.");
        return;
    }

    const historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    const novoProjetoSalvo = {
        id: "proj_" + Date.now(),
        nomeProjetoSalvo: nomeProjetoSalvo,
        dataSalvamento: new Date().toISOString(),
        // Dados do formulário do projeto
        nomeContratante: resultadosDoCalculo.nomeContratante,
        dataProjeto: resultadosDoCalculo.dataProjeto,
        descricaoProjeto: resultadosDoCalculo.descricaoProjeto,
        tempoTrabalhoProjeto: resultadosDoCalculo.tempoTrabalhoProjetoHoras,
        numeroEntregaveis: resultadosDoCalculo.numeroEntregaveis,
        tempoEdicaoEntregavel: resultadosDoCalculo.tempoEdicaoEntregavelMinutos,
        custosAdicionaisProjetoList: resultadosDoCalculo.custosAdicionaisProjetoList,
        percentualLucro: resultadosDoCalculo.percentualLucro,
        percentualImpostos: resultadosDoCalculo.percentualImpostos,
        taxaCartao: resultadosDoCalculo.taxaCartao,
        // Resultados do cálculo
        resultados: resultadosDoCalculo
    };

    historico.unshift(novoProjetoSalvo); // Adiciona no início para mais recentes primeiro
    localStorage.setItem(HISTORICO_PROJETOS_KEY, JSON.stringify(historico));
    alert(`Projeto "${nomeProjetoSalvo}" salvo com sucesso no histórico!`);
    carregarHistoricoProjetos(); // Atualiza a exibição na aba de histórico
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
            <p><strong>Contratante:</strong> ${projeto.nomeContratante || "Não informado"}</p>
            <p><strong>Data do Projeto:</strong> ${formatDate(projeto.dataProjeto)}</p>
            <p><strong>Descrição:</strong> ${projeto.descricaoProjeto ? (projeto.descricaoProjeto.substring(0, 100) + (projeto.descricaoProjeto.length > 100 ? "..." : "")) : "Não informada"}</p>
            <p><strong>Preço PIX/À Vista:</strong> ${formatCurrency(projeto.resultados.precoPix)}</p>
            <p><strong>Preço Cartão:</strong> ${formatCurrency(projeto.resultados.precoCartao)}</p>
            <p><em>Salvo em: ${new Date(projeto.dataSalvamento).toLocaleString("pt-BR")}</em></p>
            <div class="historico-item-actions">
                <button onclick="verDetalhesProjeto(\'${projeto.id}\')">Ver Detalhes</button>
                <button class="remove-btn" onclick="excluirProjetoDoHistorico(\'${projeto.id}\')">Excluir</button>
            </div>
        `;
        listaHistoricoDiv.appendChild(itemDiv);
    });
}

function excluirProjetoDoHistorico(idProjeto) {
    if (!confirm("Tem certeza que deseja excluir este projeto do histórico? Esta ação não pode ser desfeita.")) {
        return;
    }
    let historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    historico = historico.filter(p => p.id !== idProjeto);
    localStorage.setItem(HISTORICO_PROJETOS_KEY, JSON.stringify(historico));
    carregarHistoricoProjetos(); // Recarrega a lista
    alert("Projeto excluído do histórico.");
}

function verDetalhesProjeto(idProjeto) {
    const historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    const projeto = historico.find(p => p.id === idProjeto);
    if (!projeto) {
        alert("Projeto não encontrado!");
        return;
    }

    const modalBody = document.getElementById("modalBodyDetalhesProjeto");
    document.getElementById("modalNomeProjetoSalvo").textContent = projeto.nomeProjetoSalvo;
    
    let detalhesHtml = `
        <p><strong>Nome do Contratante:</strong> ${projeto.nomeContratante || "Não informado"}</p>
        <p><strong>Data do Projeto:</strong> ${formatDate(projeto.dataProjeto)}</p>
        <p><strong>Descrição Detalhada:</strong></p>
        <p style="white-space: pre-wrap;">${projeto.descricaoProjeto || "Não informada"}</p>
        <hr>
        <h4>Informações do Cálculo:</h4>
        <p>Tempo de Trabalho Estimado: ${projeto.tempoTrabalhoProjeto} horas</p>
        <p>Número de Entregáveis: ${projeto.numeroEntregaveis}</p>
        <p>Tempo Médio por Entregável: ${projeto.tempoEdicaoEntregavel} minutos</p>
        <p>Percentual de Lucro: ${projeto.percentualLucro}%</p>
        <p>Percentual de Impostos: ${projeto.percentualImpostos}%</p>
        <p>Taxa do Cartão: ${projeto.taxaCartao || 0}%</p>
    `;

    if (projeto.custosAdicionaisProjetoList && projeto.custosAdicionaisProjetoList.length > 0) {
        detalhesHtml += "<h5>Custos Adicionais do Projeto:</h5><ul>";
        projeto.custosAdicionaisProjetoList.forEach(custo => {
            detalhesHtml += `<li>${custo.desc}: ${formatCurrency(custo.val)}</li>`;
        });
        detalhesHtml += "</ul>";
    }

    detalhesHtml += `<hr><h4>Resultados Financeiros:</h4>
        <p>Custo Total Alocado ao Projeto: <strong>${formatCurrency(projeto.resultados.custoTotalAlocadoAoProjeto)}</strong></p>
        <p>Valor do Lucro Calculado: <strong>${formatCurrency(projeto.resultados.valorLucro)}</strong></p>
        <p>Valor dos Impostos Estimados: <strong>${formatCurrency(projeto.resultados.valorImpostos)}</strong></p>
        <p><strong>Preço Sugerido (PIX/À Vista): ${formatCurrency(projeto.resultados.precoPix)}</strong></p>
        <p><strong>Preço Sugerido (Cartão): ${formatCurrency(projeto.resultados.precoCartao)}</strong></p>
        <hr>
        <h4>Resumo Financeiro Detalhado:</h4>
        <p>Parcela do Custo Pessoal: ${formatCurrency(projeto.resultados.parcelaCustoPessoal)}</p>
        <p>Parcela do Custo da Empresa: ${formatCurrency(projeto.resultados.parcelaCustoEmpresaBase)}</p>
        <p>Parcela do Salário (Pró-labore): ${formatCurrency(projeto.resultados.parcelaSalario)}</p>
        <p>Parcela do 13º: ${formatCurrency(projeto.resultados.parcela13)}</p>
        <p>Parcela das Férias: ${formatCurrency(projeto.resultados.parcelaFerias)}</p>
        <p>Parcela da Depreciação: ${formatCurrency(projeto.resultados.parcelaDepreciacao)}</p>
        <p>Parcela dos Gastos Ocasionais: ${formatCurrency(projeto.resultados.parcelaGastosOcasionais)}</p>
        <p>Soma dos Custos Adicionais do Projeto: ${formatCurrency(projeto.resultados.somaCustosAdicionaisProjeto)}</p>
        <p>Lucro do Projeto: ${formatCurrency(projeto.resultados.valorLucro)}</p>
        <p>Impostos do Projeto: ${formatCurrency(projeto.resultados.valorImpostos)}</p>
        <p>Projetos como este necessários no mês: ${isFinite(projeto.resultados.projetosNecessariosMes) ? projeto.resultados.projetosNecessariosMes : "N/A"}</p>
        <hr>
        <h4>Opcionais:</h4>
        <p>Preço Sugerido por Entregável Adicional: ${formatCurrency(projeto.resultados.precoPorEntregavelAdicional)}</p>
        <p>Preço Sugerido por Hora Adicional de Trabalho: ${formatCurrency(projeto.resultados.precoPorHoraAdicional)}</p>
    `;

    modalBody.innerHTML = detalhesHtml;
    document.getElementById("modalDetalhesProjeto").style.display = "block";
}

function fecharModalDetalhes() {
    document.getElementById("modalDetalhesProjeto").style.display = "none";
}

function imprimirDetalhesProjeto() {
    window.print();
}

// --- Inicialização ---
document.addEventListener("DOMContentLoaded", () => {
    loadTheme(); // Carrega o tema salvo ou padrão
    loadAppDataFromLocalStorage(); // Carrega os dados da aplicação
    carregarHistoricoProjetos(); // Carrega o histórico de projetos

    // Adiciona listeners para salvar dados ao alterar campos
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("change", saveAppDataToLocalStorage);
        input.addEventListener("keyup", saveAppDataToLocalStorage); // Para salvar enquanto digita
    });

    // Listener para o seletor de tema
    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
        themeSelector.addEventListener("change", (event) => {
            setTheme(event.target.value);
        });
    }

    // Adicionar itens iniciais para teste rápido se não houver dados salvos
    const savedAppData = localStorage.getItem(APP_DATA_KEY);
    if (!savedAppData) {
        addCustoPessoalItem("Aluguel", 1200);
        addCustoEmpresaItem("Software Adobe", 150);
        addEquipamentoItem("Câmera Sony A7III", 10000);
        addCustoAdicionalProjetoItem("Transporte", 50);
    }
    
    // Ativar a primeira aba por padrão ou a salva
    const appData = JSON.parse(localStorage.getItem(APP_DATA_KEY)) || {};
    const activeTab = appData.activeTab || "tabCustos";
    const tabButtonToActivate = document.querySelector(`.tab-button[onclick*="${activeTab}"]`);
    if (tabButtonToActivate) {
        openTab({ currentTarget: tabButtonToActivate }, activeTab);
    } else {
        // Fallback se a aba salva não for encontrada (ex: após uma mudança de ID de aba)
        document.querySelector('.tab-button').click(); 
    }
});
