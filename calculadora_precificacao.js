// Variáveis globais para armazenar os resultados dos custos fixos
let GLOBAIS_CUSTOS_FIXOS = {
    totalCustosPessoais: 0,
    salarioProLabore: 0,
    totalCustosEmpresaBase: 0,
    totalCustosEmpresaCompleto: 0,
    totalValorEquipamentos: 0,
    depreciacaoMensal: 0,
    gastoMensalTotal: 0,
    valorDiaria: 0,
    custoHoraBase: 0,
    percentualGastosOcasionais: 0.10,
    diasTrabalhadosMes: 0,
    horasTrabalhoDia: 0
};

const APP_DATA_KEY = "smartPricingAppData_v2";
const HISTORICO_PROJETOS_KEY = "smartPricingHistoricoProjetos_v2";
const THEME_KEY = "smartPricingTheme";
const I18N_LANG_KEY = "i18nextLng"; 

// --- i18next Resources (Embedded Translations) ---
const i18nextResources = {
    "pt-BR": {
        translation: {
            "pageTitle": "Smart Pricing - Ferramenta para Precificação",
            "mainTitle": "Smart Pricing - Ferramenta para Precificação",
            "labels": {
                "theme": "Tema:",
                "language": "Idioma:",
                "desiredSalary": "Salário (Pró-labore) Desejado:",
                "workDaysPerMonth": "Dias Trabalhados no Mês:",
                "workHoursPerDay": "Horas de Trabalho por Dia:",
                "occasionalExpensesPercentage": "Percentual para Gastos Ocasionais (%):",
                "clientName": "Nome do Contratante:",
                "projectDate": "Data do Projeto:",
                "projectDescription": "Descrição Detalhada do Projeto:",
                "estimatedProjectWorkTime": "Tempo de Trabalho Total Estimado para o Projeto (horas):",
                "numberOfDeliverables": "Número de Entregáveis:",
                "avgTimePerDeliverable": "Tempo Médio Gasto por Entregável (minutos):",
                "desiredProfitPercentage": "Percentual de Lucro Desejado sobre o Custo (%):",
                "taxPercentage": "Percentual de Impostos sobre o Faturamento (%):",
                "cardFeePercentage": "Taxa da Operadora de Cartão (%):"
            },
            "themeOptions": {
                "light": "Claro",
                "dark": "Escuro",
                "auto": "Automático"
            },
            "tabs": {
                "configCustos": "1. Configurar Custos Fixos",
                "calculateProject": "2. Calcular Projeto",
                "projectHistory": "3. Histórico de Projetos"
            },
            "tabCustos": {
                "title": "Configuração de Custos Fixos e Parâmetros Gerais",
                "personalCostsTitle": "Custos Pessoais Mensais",
                "companyCostsTitle": "Custos da Empresa Mensais",
                "equipmentTitle": "Equipamentos",
                "workFinancialParamsTitle": "Parâmetros de Trabalho e Financeiros"
            },
            "tabProject": {
                "title": "Calculadora de Projeto Específico",
                "projectInfoTitle": "Informações do Projeto",
                "timeDeliverablesTitle": "Tempo e Entregáveis",
                "additionalCostsTitle": "Custos Adicionais Específicos do Projeto",
                "financialParamsTitle": "Parâmetros Financeiros do Projeto"
            },
            "tabHistory": {
                "title": "Histórico de Projetos Salvos",
                "noProjectsSaved": "Nenhum projeto salvo ainda.",
                "client": "Contratante:",
                "projectDateLabel": "Data do Projeto:",
                "description": "Descrição:",
                "pricePix": "Preço PIX/À Vista:",
                "priceCard": "Preço Cartão:",
                "savedAt": "Salvo em:"
            },
            "buttons": {
                "addPersonalCost": "Adicionar Custo Pessoal",
                "addCompanyCost": "Adicionar Custo da Empresa",
                "addEquipment": "Adicionar Equipamento",
                "calculateUpdateFixedCosts": "Calcular/Atualizar Custos Fixos",
                "addAdditionalCost": "Adicionar Custo Adicional",
                "calculateProjectPrice": "Calcular Preço do Projeto",
                "saveCurrentProject": "Salvar Projeto Atual",
                "print": "Imprimir",
                "close": "Fechar",
                "remove": "Remover",
                "viewDetails": "Ver Detalhes",
                "delete": "Excluir"
            },
            "placeholders": {
                "exampleSalary": "Ex: 3000",
                "exampleWorkDays": "Ex: 22",
                "exampleWorkHours": "Ex: 8",
                "examplePercentage": "Ex: 10",
                "clientName": "Nome do cliente",
                "projectDetails": "Detalhes do job",
                "exampleHours": "Ex: 8",
                "exampleQuantity": "Ex: 40",
                "exampleMinutes": "Ex: 5",
                "exampleCardFee": "Ex: 4.5",
                "personalCostDescription": "Descrição do Custo Pessoal",
                "companyCostDescription": "Descrição do Custo da Empresa",
                "equipmentDescription": "Descrição do Equipamento",
                "valueRS": "Valor (R$)",
                "acquisitionValueRS": "Valor de Aquisição (R$)",
                "additionalCostDescription": "Descrição do Custo Adicional"
            },
            "results": {
                "fixedCostsTitle": "Resultados dos Custos Fixos (Mensal)",
                "totalPersonalCosts": "Total de Custos Pessoais:",
                "totalCompanyCosts": "Total de Custos da Empresa (c/ Pró-labore, 13º, Férias):",
                "totalEquipmentValue": "Valor Total dos Equipamentos:",
                "monthlyDepreciation": "Depreciação dos Equipamentos:",
                "estimatedDailyRate": "Valor da Diária Estimado:",
                "estimatedBaseHourCost": "Custo/Hora Base Estimado:",
                "totalEstimatedMonthlyCost": "Gasto Total Estimado (c/ Gastos Ocasionais):",
                "projectResultsTitle": "Resultados do Projeto",
                "totalAllocatedCost": "Custo Total Alocado ao Projeto:",
                "calculatedProfit": "Valor do Lucro Calculado:",
                "estimatedTaxes": "Valor dos Impostos Estimados:",
                "suggestedPricePix": "Preço Sugerido (PIX/À Vista):",
                "suggestedPriceCard": "Preço Sugerido (Cartão):",
                "detailedFinancialSummary": "Resumo Financeiro Detalhado:",
                "summaryPersonalCost": "Parcela do Custo Pessoal:",
                "summaryCompanyCost": "Parcela do Custo da Empresa:",
                "summarySalary": "Parcela do Salário (Pró-labore):",
                "summary13th": "Parcela do 13º:",
                "summaryVacation": "Parcela das Férias:",
                "summaryDepreciation": "Parcela da Depreciação:",
                "summaryOccasionalExpenses": "Parcela dos Gastos Ocasionais:",
                "summaryAdditionalProjectCosts": "Soma dos Custos Adicionais do Projeto:",
                "summaryProjectProfit": "Lucro do Projeto:",
                "summaryProjectTaxes": "Impostos do Projeto:",
                "projectsNeededMonthly": "Para cobrir seus custos mensais, você precisaria de aproximadamente",
                "projectsLikeThisInMonth": "projetos como este no mês.",
                "optionalsTitle": "Opcionais:",
                "pricePerAdditionalDeliverable": "Preço Sugerido por Entregável Adicional:",
                "pricePerAdditionalHour": "Preço Sugerido por Hora Adicional de Trabalho:"
            },
            "tooltips": {
                "personalCosts": "São os gastos que você tem para manter o seu estilo de vida e o bem-estar da sua família. São despesas que você precisa cobrir independentemente de estar trabalhando ou não. Exemplos: Aluguel ou prestação da casa, condomínio, IPTU, luz, água, gás, internet, telefone, Alimentação, etc.",
                "companyCosts": "São os gastos que você tem diretamente relacionados ao funcionamento do seu negócio. Exemplos: Programas de edição de vídeo e foto, ferramentas de design, armazenamento em nuvem, domínio, hospedagem, anúncios pagos, impulsionamento de posts, plano de celular, internet, MEI, contador, taxas administrativas, papel, caneta, equipamentos de escritório.",
                "desiredSalary": "Valor que você deseja retirar da sua empresa pelo seu trabalho.",
                "equipment": "São todos os itens que você usa diretamente na execução do seu ofício. Exemplos: Câmera, Lentes, Iluminação, Laptop, Computadores, Monitores, Tablets, Impressora.",
                "workDaysPerMonth": "Quantidade de dias que você pretende se dedicar ao trabalho a cada mês.",
                "workHoursPerDay": "Quantidade de horas que você pretende se dedicar ao trabalho a cada dia.",
                "occasionalExpensesPercentage": "Reserva de emergencia para gastos não previstos. Exemplos: Pendrive não funciona e precisa ser trocado. Pneu furou no caminho para o trabalho. Falta de material em um fornecedor barato sendo necessário contatar um fornecedor mais caro.",
                "estimatedProjectWorkTime": "Tempo necessário para executar o trabalho. Não esquecer de adicionar o tempo de deslocamento",
                "numberOfDeliverables": "Número de fotos, vídeos, aulas que serão entregues ao cliente",
                "avgTimePerDeliverable": "Tempo gasto em cada entregável. Seja ele foto, video, aula, etc.",
                "additionalCosts": "Custos que se aplicam exclusivamente a esse projeto. Exemplo: deslocamento, alimentação, aluguel de lente, ajudante, impressão de álbum, etc."
            },
            "projectDetailsModal": {
                "title": "Detalhes do Projeto",
                "clientNameLabel": "Nome do Contratante:",
                "projectDateLabel": "Data do Projeto:",
                "detailedDescriptionLabel": "Descrição Detalhada:",
                "calculationInfoTitle": "Informações do Cálculo:",
                "estimatedWorkTimeLabel": "Tempo de Trabalho Estimado:",
                "hours": "horas",
                "deliverablesLabel": "Número de Entregáveis:",
                "avgTimePerDeliverableLabel": "Tempo Médio por Entregável:",
                "minutes": "minutos",
                "profitPercentageLabel": "Percentual de Lucro:",
                "taxPercentageLabel": "Percentual de Impostos:",
                "cardFeeLabel": "Taxa do Cartão:",
                "additionalProjectCostsTitle": "Custos Adicionais do Projeto:",
                "financialResultsTitle": "Resultados Financeiros:",
                "totalAllocatedCostLabel": "Custo Total Alocado ao Projeto:",
                "calculatedProfitLabel": "Valor do Lucro Calculado:",
                "estimatedTaxesLabel": "Valor dos Impostos Estimados:",
                "suggestedPricePixLabel": "Preço Sugerido (PIX/À Vista):",
                "suggestedPriceCardLabel": "Preço Sugerido (Cartão):",
                "detailedFinancialSummaryTitle": "Resumo Financeiro Detalhado:",
                "personalCostShareLabel": "Parcela do Custo Pessoal:",
                "companyCostShareLabel": "Parcela do Custo da Empresa:",
                "salaryShareLabel": "Parcela do Salário (Pró-labore):",
                "_13thShareLabel": "Parcela do 13º:",
                "vacationShareLabel": "Parcela das Férias:",
                "depreciationShareLabel": "Parcela da Depreciação:",
                "occasionalExpensesShareLabel": "Parcela dos Gastos Ocasionais:",
                "sumAdditionalCostsLabel": "Soma dos Custos Adicionais do Projeto:",
                "projectProfitLabel": "Lucro do Projeto:",
                "projectTaxesLabel": "Impostos do Projeto:",
                "projectsNeededMonthlyLabel": "Projetos como este necessários no mês:",
                "optionalsTitle": "Opcionais:",
                "pricePerAdditionalDeliverableLabel": "Preço Sugerido por Entregável Adicional:",
                "pricePerAdditionalHourLabel": "Preço Sugerido por Hora Adicional de Trabalho:",
                "notInformed": "Não informado"
            },
            "alerts": {
                "fixedCostsCalculated": "Custos fixos calculados, atualizados e salvos no seu navegador!",
                "calculateFixedCostsFirst": "Por favor, calcule e atualize os Custos Fixos na aba Configurar Custos Fixos primeiro.",
                "workDaysOrHoursCannotBeZero": "Dias trabalhados ou horas por dia não podem ser zero. Verifique a configuração de custos.",
                "projectPriceCalculated": "Preço do projeto calculado e salvo no seu navegador!",
                "saveProjectNamePrompt": "Digite um nome para este projeto (ex: Casamento Ana e João):",
                "saveCancelledNoName": "Salvamento cancelado. É necessário fornecer um nome para o projeto.",
                "projectNotCalculated": "Não foi possível calcular o projeto. Verifique os dados e tente novamente.",
                "projectSavedSuccess": "Projeto \"{{projectName}}\" salvo com sucesso no histórico!",
                "confirmDeleteProject": "Tem certeza que deseja excluir este projeto do histórico? Esta ação não pode ser desfeita.",
                "projectDeleted": "Projeto excluído do histórico.",
                "projectNotFound": "Projeto não encontrado!"
            },
            "initialData": {
                "rent": "Aluguel",
                "adobeSoftware": "Software Adobe",
                "sonyCamera": "Câmera Sony A7III",
                "transport": "Transporte"
            }
        }
    },
    "en": {
        translation: {
            "pageTitle": "Smart Pricing - Pricing Tool",
            "mainTitle": "Smart Pricing - Pricing Tool",
            "labels": {
                "theme": "Theme:",
                "language": "Language:",
                "desiredSalary": "Desired Salary (Pro-labore):",
                "workDaysPerMonth": "Work Days per Month:",
                "workHoursPerDay": "Work Hours per Day:",
                "occasionalExpensesPercentage": "Percentage for Occasional Expenses (%):",
                "clientName": "Client's Name:",
                "projectDate": "Project Date:",
                "projectDescription": "Detailed Project Description:",
                "estimatedProjectWorkTime": "Total Estimated Work Time for the Project (hours):",
                "numberOfDeliverables": "Number of Deliverables:",
                "avgTimePerDeliverable": "Average Time Spent per Deliverable (minutes):",
                "desiredProfitPercentage": "Desired Profit Percentage over Cost (%):",
                "taxPercentage": "Tax Percentage on Revenue (%):",
                "cardFeePercentage": "Card Operator Fee (%):"
            },
            "themeOptions": {
                "light": "Light",
                "dark": "Dark",
                "auto": "Automatic"
            },
            "tabs": {
                "configCustos": "1. Configure Fixed Costs",
                "calculateProject": "2. Calculate Project",
                "projectHistory": "3. Project History"
            },
            "tabCustos": {
                "title": "Fixed Costs Configuration and General Parameters",
                "personalCostsTitle": "Monthly Personal Costs",
                "companyCostsTitle": "Monthly Company Costs",
                "equipmentTitle": "Equipment",
                "workFinancialParamsTitle": "Work and Financial Parameters"
            },
            "tabProject": {
                "title": "Specific Project Calculator",
                "projectInfoTitle": "Project Information",
                "timeDeliverablesTitle": "Time and Deliverables",
                "additionalCostsTitle": "Specific Additional Costs for the Project",
                "financialParamsTitle": "Project Financial Parameters"
            },
            "tabHistory": {
                "title": "Saved Projects History",
                "noProjectsSaved": "No projects saved yet.",
                "client": "Client:",
                "projectDateLabel": "Project Date:",
                "description": "Description:",
                "pricePix": "Price (PIX/Cash):",
                "priceCard": "Price (Card):",
                "savedAt": "Saved at:"
            },
            "buttons": {
                "addPersonalCost": "Add Personal Cost",
                "addCompanyCost": "Add Company Cost",
                "addEquipment": "Add Equipment",
                "calculateUpdateFixedCosts": "Calculate/Update Fixed Costs",
                "addAdditionalCost": "Add Additional Cost",
                "calculateProjectPrice": "Calculate Project Price",
                "saveCurrentProject": "Save Current Project",
                "print": "Print",
                "close": "Close",
                "remove": "Remove",
                "viewDetails": "View Details",
                "delete": "Delete"
            },
            "placeholders": {
                "exampleSalary": "Ex: 3000",
                "exampleWorkDays": "Ex: 22",
                "exampleWorkHours": "Ex: 8",
                "examplePercentage": "Ex: 10",
                "clientName": "Client's name",
                "projectDetails": "Job details",
                "exampleHours": "Ex: 8",
                "exampleQuantity": "Ex: 40",
                "exampleMinutes": "Ex: 5",
                "exampleCardFee": "Ex: 4.5",
                "personalCostDescription": "Personal Cost Description",
                "companyCostDescription": "Company Cost Description",
                "equipmentDescription": "Equipment Description",
                "valueRS": "Value ($)",
                "acquisitionValueRS": "Acquisition Value ($)",
                "additionalCostDescription": "Additional Cost Description"
            },
            "results": {
                "fixedCostsTitle": "Fixed Costs Results (Monthly)",
                "totalPersonalCosts": "Total Personal Costs:",
                "totalCompanyCosts": "Total Company Costs (w/ Pro-labore, 13th, Vacation):",
                "totalEquipmentValue": "Total Equipment Value:",
                "monthlyDepreciation": "Equipment Depreciation:",
                "estimatedDailyRate": "Estimated Daily Rate:",
                "estimatedBaseHourCost": "Estimated Base Hour Cost:",
                "totalEstimatedMonthlyCost": "Total Estimated Monthly Cost (w/ Occasional Expenses):",
                "projectResultsTitle": "Project Results",
                "totalAllocatedCost": "Total Cost Allocated to Project:",
                "calculatedProfit": "Calculated Profit Value:",
                "estimatedTaxes": "Estimated Tax Value:",
                "suggestedPricePix": "Suggested Price (PIX/Cash):",
                "suggestedPriceCard": "Suggested Price (Card):",
                "detailedFinancialSummary": "Detailed Financial Summary:",
                "summaryPersonalCost": "Personal Cost Share:",
                "summaryCompanyCost": "Company Cost Share:",
                "summarySalary": "Salary Share (Pro-labore):",
                "summary13th": "13th Salary Share:",
                "summaryVacation": "Vacation Share:",
                "summaryDepreciation": "Depreciation Share:",
                "summaryOccasionalExpenses": "Occasional Expenses Share:",
                "summaryAdditionalProjectCosts": "Sum of Additional Project Costs:",
                "summaryProjectProfit": "Project Profit:",
                "summaryProjectTaxes": "Project Taxes:",
                "projectsNeededMonthly": "To cover your monthly costs, you would need approximately",
                "projectsLikeThisInMonth": "projects like this per month.",
                "optionalsTitle": "Optionals:",
                "pricePerAdditionalDeliverable": "Suggested Price per Additional Deliverable:",
                "pricePerAdditionalHour": "Suggested Price per Additional Work Hour:"
            },
            "tooltips": {
                "personalCosts": "These are the expenses you have to maintain your lifestyle and your family's well-being. These are expenses you need to cover whether you are working or not. Examples: Rent or mortgage, condo fees, property tax, electricity, water, gas, internet, phone, food, etc.",
                "companyCosts": "These are the expenses directly related to running your business. Examples: Video and photo editing software, design tools, cloud storage, domain, hosting, paid ads, post boosting, cell phone plan, internet, MEI, accountant, administrative fees, paper, pen, office equipment.",
                "desiredSalary": "Amount you wish to withdraw from your company for your work.",
                "equipment": "These are all the items you use directly in the execution of your craft. Examples: Camera, Lenses, Lighting, Laptop, Computers, Monitors, Tablets, Printer.",
                "workDaysPerMonth": "Number of days you plan to dedicate to work each month.",
                "workHoursPerDay": "Number of hours you plan to dedicate to work each day.",
                "occasionalExpensesPercentage": "Emergency reserve for unforeseen expenses. Examples: USB drive fails and needs replacement. Flat tire on the way to work. Lack of material from a cheap supplier nécessitating a more expensive one.",
                "estimatedProjectWorkTime": "Time needed to perform the work. Don't forget to add travel time.",
                "numberOfDeliverables": "Number of photos, videos, lessons to be delivered to the client.",
                "avgTimePerDeliverable": "Time spent on each deliverable, be it photo, video, lesson, etc.",
                "additionalCosts": "Costs that apply exclusively to this project. Example: travel, food, lens rental, assistant, album printing, etc."
            },
            "projectDetailsModal": {
                "title": "Project Details",
                "clientNameLabel": "Client's Name:",
                "projectDateLabel": "Project Date:",
                "detailedDescriptionLabel": "Detailed Description:",
                "calculationInfoTitle": "Calculation Information:",
                "estimatedWorkTimeLabel": "Estimated Work Time:",
                "hours": "hours",
                "deliverablesLabel": "Number of Deliverables:",
                "avgTimePerDeliverableLabel": "Average Time per Deliverable:",
                "minutes": "minutes",
                "profitPercentageLabel": "Profit Percentage:",
                "taxPercentageLabel": "Tax Percentage:",
                "cardFeeLabel": "Card Fee:",
                "additionalProjectCostsTitle": "Additional Project Costs:",
                "financialResultsTitle": "Financial Results:",
                "totalAllocatedCostLabel": "Total Cost Allocated to Project:",
                "calculatedProfitLabel": "Calculated Profit Value:",
                "estimatedTaxesLabel": "Estimated Tax Value:",
                "suggestedPricePixLabel": "Suggested Price (PIX/Cash):",
                "suggestedPriceCardLabel": "Suggested Price (Card):",
                "detailedFinancialSummaryTitle": "Detailed Financial Summary:",
                "personalCostShareLabel": "Personal Cost Share:",
                "companyCostShareLabel": "Company Cost Share:",
                "salaryShareLabel": "Salary Share (Pro-labore):",
                "_13thShareLabel": "13th Salary Share:",
                "vacationShareLabel": "Vacation Share:",
                "depreciationShareLabel": "Depreciation Share:",
                "occasionalExpensesShareLabel": "Occasional Expenses Share:",
                "sumAdditionalCostsLabel": "Sum of Additional Project Costs:",
                "projectProfitLabel": "Project Profit:",
                "projectTaxesLabel": "Project Taxes:",
                "projectsNeededMonthlyLabel": "Projects like this needed per month:",
                "optionalsTitle": "Optionals:",
                "pricePerAdditionalDeliverableLabel": "Suggested Price per Additional Deliverable:",
                "pricePerAdditionalHourLabel": "Suggested Price per Additional Work Hour:",
                "notInformed": "Not informed"
            },
            "alerts": {
                "fixedCostsCalculated": "Fixed costs calculated, updated, and saved in your browser!",
                "calculateFixedCostsFirst": "Please calculate and update Fixed Costs in the Configure Fixed Costs tab first.",
                "workDaysOrHoursCannotBeZero": "Work days or hours per day cannot be zero. Check the cost configuration.",
                "projectPriceCalculated": "Project price calculated and saved in your browser!",
                "saveProjectNamePrompt": "Enter a name for this project (e.g., Wedding Ana and John):",
                "saveCancelledNoName": "Save cancelled. A name is required for the project.",
                "projectNotCalculated": "Could not calculate project. Check the data and try again.",
                "projectSavedSuccess": "Project \"{{projectName}}\" saved successfully to history!",
                "confirmDeleteProject": "Are you sure you want to delete this project from history? This action cannot be undone.",
                "projectDeleted": "Project deleted from history.",
                "projectNotFound": "Project not found!"
            },
            "initialData": {
                "rent": "Rent",
                "adobeSoftware": "Adobe Software",
                "sonyCamera": "Sony A7III Camera",
                "transport": "Transportation"
            }
        }
    },
    "es": {
        translation: {
            "pageTitle": "Smart Pricing - Herramienta de Precios",
            "mainTitle": "Smart Pricing - Herramienta de Precios",
            "labels": {
                "theme": "Tema:",
                "language": "Idioma:",
                "desiredSalary": "Salario Deseado (Pro-labore):",
                "workDaysPerMonth": "Días de Trabajo por Mes:",
                "workHoursPerDay": "Horas de Trabajo por Día:",
                "occasionalExpensesPercentage": "Porcentaje para Gastos Ocasionales (%):",
                "clientName": "Nombre del Cliente:",
                "projectDate": "Fecha del Proyecto:",
                "projectDescription": "Descripción Detallada del Proyecto:",
                "estimatedProjectWorkTime": "Tiempo Total Estimado de Trabajo para el Proyecto (horas):",
                "numberOfDeliverables": "Número de Entregables:",
                "avgTimePerDeliverable": "Tiempo Promedio por Entregable (minutos):",
                "desiredProfitPercentage": "Porcentaje de Ganancia Deseado sobre el Costo (%):",
                "taxPercentage": "Porcentaje de Impuestos sobre la Facturación (%):",
                "cardFeePercentage": "Tasa del Operador de Tarjeta (%):"
            },
            "themeOptions": {
                "light": "Claro",
                "dark": "Oscuro",
                "auto": "Automático"
            },
            "tabs": {
                "configCustos": "1. Configurar Costos Fijos",
                "calculateProject": "2. Calcular Proyecto",
                "projectHistory": "3. Historial de Proyectos"
            },
            "tabCustos": {
                "title": "Configuración de Costos Fijos y Parámetros Generales",
                "personalCostsTitle": "Costos Personales Mensuales",
                "companyCostsTitle": "Costos de la Empresa Mensuales",
                "equipmentTitle": "Equipos",
                "workFinancialParamsTitle": "Parámetros Laborales y Financieros"
            },
            "tabProject": {
                "title": "Calculadora de Proyecto Específico",
                "projectInfoTitle": "Información del Proyecto",
                "timeDeliverablesTitle": "Tiempo y Entregables",
                "additionalCostsTitle": "Costos Adicionales Específicos del Proyecto",
                "financialParamsTitle": "Parámetros Financieros del Proyecto"
            },
            "tabHistory": {
                "title": "Historial de Proyectos Guardados",
                "noProjectsSaved": "Aún no hay proyectos guardados.",
                "client": "Cliente:",
                "projectDateLabel": "Fecha del Proyecto:",
                "description": "Descripción:",
                "pricePix": "Precio (PIX/Efectivo):",
                "priceCard": "Precio (Tarjeta):",
                "savedAt": "Guardado el:"
            },
            "buttons": {
                "addPersonalCost": "Añadir Costo Personal",
                "addCompanyCost": "Añadir Costo de Empresa",
                "addEquipment": "Añadir Equipo",
                "calculateUpdateFixedCosts": "Calcular/Actualizar Costos Fijos",
                "addAdditionalCost": "Añadir Costo Adicional",
                "calculateProjectPrice": "Calcular Precio del Proyecto",
                "saveCurrentProject": "Guardar Proyecto Actual",
                "print": "Imprimir",
                "close": "Cerrar",
                "remove": "Eliminar",
                "viewDetails": "Ver Detalles",
                "delete": "Borrar"
            },
            "placeholders": {
                "exampleSalary": "Ej: 3000",
                "exampleWorkDays": "Ej: 22",
                "exampleWorkHours": "Ej: 8",
                "examplePercentage": "Ej: 10",
                "clientName": "Nombre del cliente",
                "projectDetails": "Detalles del trabajo",
                "exampleHours": "Ej: 8",
                "exampleQuantity": "Ej: 40",
                "exampleMinutes": "Ej: 5",
                "exampleCardFee": "Ej: 4.5",
                "personalCostDescription": "Descripción del Costo Personal",
                "companyCostDescription": "Descripción del Costo de Empresa",
                "equipmentDescription": "Descripción del Equipo",
                "valueRS": "Valor (€)",
                "acquisitionValueRS": "Valor de Adquisición (€)",
                "additionalCostDescription": "Descripción del Costo Adicional"
            },
            "results": {
                "fixedCostsTitle": "Resultados de Costos Fijos (Mensual)",
                "totalPersonalCosts": "Total de Costos Personales:",
                "totalCompanyCosts": "Total de Costos de Empresa (c/ Pro-labore, Paga Extra, Vacaciones):",
                "totalEquipmentValue": "Valor Total de Equipos:",
                "monthlyDepreciation": "Depreciación de Equipos:",
                "estimatedDailyRate": "Tarifa Diaria Estimada:",
                "estimatedBaseHourCost": "Costo/Hora Base Estimado:",
                "totalEstimatedMonthlyCost": "Costo Mensual Total Estimado (c/ Gastos Ocasionales):",
                "projectResultsTitle": "Resultados del Proyecto",
                "totalAllocatedCost": "Costo Total Asignado al Proyecto:",
                "calculatedProfit": "Valor de la Ganancia Calculada:",
                "estimatedTaxes": "Valor de Impuestos Estimados:",
                "suggestedPricePix": "Precio Sugerido (PIX/Efectivo):",
                "suggestedPriceCard": "Precio Sugerido (Tarjeta):",
                "detailedFinancialSummary": "Resumen Financiero Detallado:",
                "summaryPersonalCost": "Parte del Costo Personal:",
                "summaryCompanyCost": "Parte del Costo de Empresa:",
                "summarySalary": "Parte del Salario (Pro-labore):",
                "summary13th": "Parte de la Paga Extra:",
                "summaryVacation": "Parte de las Vacaciones:",
                "summaryDepreciation": "Parte de la Depreciación:",
                "summaryOccasionalExpenses": "Parte de Gastos Ocasionales:",
                "summaryAdditionalProjectCosts": "Suma de Costos Adicionales del Proyecto:",
                "summaryProjectProfit": "Ganancia del Proyecto:",
                "summaryProjectTaxes": "Impuestos del Proyecto:",
                "projectsNeededMonthly": "Para cubrir sus costos mensuales, necesitaría aproximadamente",
                "projectsLikeThisInMonth": "proyectos como este al mes.",
                "optionalsTitle": "Opcionales:",
                "pricePerAdditionalDeliverable": "Precio Sugerido por Entregable Adicional:",
                "pricePerAdditionalHour": "Precio Sugerido por Hora Adicional de Trabajo:"
            },
            "tooltips": {
                "personalCosts": "Son los gastos que tienes para mantener tu estilo de vida y el bienestar de tu familia. Son gastos que necesitas cubrir independientemente de si estás trabajando o no. Ejemplos: Alquiler o hipoteca, gastos de comunidad, IBI, luz, agua, gas, internet, teléfono, alimentación, etc.",
                "companyCosts": "Son los gastos directamente relacionados con el funcionamiento de tu negocio. Ejemplos: Software de edición de vídeo y foto, herramientas de diseño, almacenamiento en la nube, dominio, hosting, anuncios pagados, promoción de publicaciones, plan de telefonía móvil, internet, autónomo, gestor, tasas administrativas, papel, bolígrafo, material de oficina.",
                "desiredSalary": "Cantidad que deseas retirar de tu empresa por tu trabajo.",
                "equipment": "Son todos los elementos que utilizas directamente en la ejecución de tu oficio. Ejemplos: Cámara, Lentes, Iluminación, Portátil, Ordenadores, Monitores, Tablets, Impresora.",
                "workDaysPerMonth": "Número de días que planeas dedicar al trabajo cada mes.",
                "workHoursPerDay": "Número de horas que planeas dedicar al trabalho cada día.",
                "occasionalExpensesPercentage": "Reserva de emergencia para gastos imprevistos. Ejemplos: Un pendrive falla y necesita ser reemplazado. Pinchazo de rueda camino al trabajo. Falta de material en un proveedor económico que obliga a contactar con uno más caro.",
                "estimatedProjectWorkTime": "Tiempo necesario para realizar el trabajo. No olvides añadir el tiempo de desplazamiento.",
                "numberOfDeliverables": "Número de fotos, vídeos, clases que se entregarán al cliente.",
                "avgTimePerDeliverable": "Tiempo dedicado a cada entregable, ya sea foto, vídeo, clase, etc.",
                "additionalCosts": "Costos que se aplican exclusivamente a este proyecto. Ejemplo: desplazamiento, dietas, alquiler de lentes, ayudante, impresión de álbum, etc."
            },
            "projectDetailsModal": {
                "title": "Detalles del Proyecto",
                "clientNameLabel": "Nombre del Cliente:",
                "projectDateLabel": "Fecha del Proyecto:",
                "detailedDescriptionLabel": "Descripción Detallada:",
                "calculationInfoTitle": "Información del Cálculo:",
                "estimatedWorkTimeLabel": "Tiempo de Trabajo Estimado:",
                "hours": "horas",
                "deliverablesLabel": "Número de Entregables:",
                "avgTimePerDeliverableLabel": "Tiempo Promedio por Entregable:",
                "minutes": "minutos",
                "profitPercentageLabel": "Porcentaje de Ganancia:",
                "taxPercentageLabel": "Porcentaje de Impuestos:",
                "cardFeeLabel": "Tasa de Tarjeta:",
                "additionalProjectCostsTitle": "Costos Adicionales del Proyecto:",
                "financialResultsTitle": "Resultados Financieros:",
                "totalAllocatedCostLabel": "Costo Total Asignado al Proyecto:",
                "calculatedProfitLabel": "Valor de la Ganancia Calculada:",
                "estimatedTaxesLabel": "Valor de Impuestos Estimados:",
                "suggestedPricePixLabel": "Precio Sugerido (PIX/Efectivo):",
                "suggestedPriceCardLabel": "Precio Sugerido (Tarjeta):",
                "detailedFinancialSummaryTitle": "Resumen Financiero Detallado:",
                "personalCostShareLabel": "Parte del Costo Personal:",
                "companyCostShareLabel": "Parte del Costo de Empresa:",
                "salaryShareLabel": "Parte del Salario (Pro-labore):",
                "_13thShareLabel": "Parte de la Paga Extra:",
                "vacationShareLabel": "Parte de las Vacaciones:",
                "depreciationShareLabel": "Parte de la Depreciación:",
                "occasionalExpensesShareLabel": "Parte de Gastos Ocasionales:",
                "sumAdditionalCostsLabel": "Suma de Costos Adicionales del Proyecto:",
                "projectProfitLabel": "Ganancia del Proyecto:",
                "projectTaxesLabel": "Impuestos del Proyecto:",
                "projectsNeededMonthlyLabel": "Proyectos como este necesarios al mes:",
                "optionalsTitle": "Opcionales:",
                "pricePerAdditionalDeliverableLabel": "Precio Sugerido por Entregable Adicional:",
                "pricePerAdditionalHourLabel": "Precio Sugerido por Hora Adicional de Trabajo:",
                "notInformed": "No informado"
            },
            "alerts": {
                "fixedCostsCalculated": "¡Costos fijos calculados, actualizados y guardados en tu navegador!",
                "calculateFixedCostsFirst": "Por favor, calcula y actualiza los Costos Fijos en la pestaña Configurar Costos Fijos primero.",
                "workDaysOrHoursCannotBeZero": "Los días trabajados o las horas por día no pueden ser cero. Verifica la configuración de costos.",
                "projectPriceCalculated": "¡Precio del proyecto calculado y guardado en tu navegador!",
                "saveProjectNamePrompt": "Introduce un nombre para este proyecto (ej: Boda Ana y Juan):",
                "saveCancelledNoName": "Guardado cancelado. Se requiere un nombre para el proyecto.",
                "projectNotCalculated": "No se pudo calcular el proyecto. Verifica los datos e inténtalo de nuevo.",
                "projectSavedSuccess": "¡Proyecto \"{{projectName}}\" guardado con éxito en el historial!",
                "confirmDeleteProject": "¿Estás seguro de que quieres eliminar este proyecto del historial? Esta acción no se puede deshacer.",
                "projectDeleted": "Proyecto eliminado del historial.",
                "projectNotFound": "¡Proyecto no encontrado!"
            },
            "initialData": {
                "rent": "Alquiler",
                "adobeSoftware": "Software Adobe",
                "sonyCamera": "Cámara Sony A7III",
                "transport": "Transporte"
            }
        }
    }
};

// --- i18next Initialization and Functions ---
async function initI18next() {
    await i18next
        // .use(i18nextHttpBackend) // No longer needed as resources are embedded
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: "pt-BR",
            debug: false, // Set to true for development, false for production
            resources: i18nextResources, // Use embedded resources
            detection: {
                order: ["localStorage", "navigator"],
                caches: ["localStorage"],
                lookupLocalStorage: I18N_LANG_KEY,
            },
            // backend: { // No longer needed
            //     loadPath: "./locales/{{lng}}/translation.json",
            // }
        });
    updateContent();
    document.getElementById("languageSelector").value = i18next.language.startsWith("pt") ? "pt-BR" : i18next.language.split("-")[0];
    document.getElementById("languageSelector").addEventListener("change", (event) => {
        i18next.changeLanguage(event.target.value).then(updateContent);
    });
}

function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.innerHTML = i18next.t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.getAttribute("data-i18n-placeholder");
        element.placeholder = i18next.t(key);
    });

    document.querySelectorAll("[data-i18n-tooltip]").forEach(element => {
        const key = element.getAttribute("data-i18n-tooltip");
        element.textContent = i18next.t(key);
    });

    document.title = i18next.t("pageTitle");
    // Update dynamic button texts if any are not covered by data-i18n (e.g. inside dynamic lists)
    // This will be handled when items are added/re-rendered
    // For example, the "Remove" button in dynamic lists needs to be updated if it's re-added
    // Also, update texts for initially added items if they exist
    const savedAppData = localStorage.getItem(APP_DATA_KEY);
    if (!savedAppData) {
        // If it's the first load and no data is saved, the initial items might need their placeholders translated
        // This is now handled by calling addCusto... with translated placeholders during initializeApp if no data
    }
    // Re-render dynamic lists if they exist to update button texts and placeholders
    const custosPessoaisList = document.getElementById("custosPessoaisList");
    if (custosPessoaisList) {
        Array.from(custosPessoaisList.children).forEach(child => {
            const descInput = child.querySelector(".item-desc");
            const valInput = child.querySelector(".item-val");
            const removeBtn = child.querySelector(".remove-btn");
            if (descInput) descInput.placeholder = i18next.t("placeholders.personalCostDescription");
            if (valInput) valInput.placeholder = i18next.t("placeholders.valueRS");
            if (removeBtn) removeBtn.textContent = i18next.t("buttons.remove");
        });
    }
    const custosEmpresaList = document.getElementById("custosEmpresaList");
    if (custosEmpresaList) {
        Array.from(custosEmpresaList.children).forEach(child => {
            const descInput = child.querySelector(".item-desc");
            const valInput = child.querySelector(".item-val");
            const removeBtn = child.querySelector(".remove-btn");
            if (descInput) descInput.placeholder = i18next.t("placeholders.companyCostDescription");
            if (valInput) valInput.placeholder = i18next.t("placeholders.valueRS");
            if (removeBtn) removeBtn.textContent = i18next.t("buttons.remove");
        });
    }
    const equipamentosList = document.getElementById("equipamentosList");
    if (equipamentosList) {
        Array.from(equipamentosList.children).forEach(child => {
            const descInput = child.querySelector(".item-desc");
            const valInput = child.querySelector(".item-val");
            const removeBtn = child.querySelector(".remove-btn");
            if (descInput) descInput.placeholder = i18next.t("placeholders.equipmentDescription");
            if (valInput) valInput.placeholder = i18next.t("placeholders.acquisitionValueRS");
            if (removeBtn) removeBtn.textContent = i18next.t("buttons.remove");
        });
    }
    const custosAdicionaisProjetoList = document.getElementById("custosAdicionaisProjetoList");
    if (custosAdicionaisProjetoList) {
        Array.from(custosAdicionaisProjetoList.children).forEach(child => {
            const descInput = child.querySelector(".item-desc");
            const valInput = child.querySelector(".item-val");
            const removeBtn = child.querySelector(".remove-btn");
            if (descInput) descInput.placeholder = i18next.t("placeholders.additionalCostDescription");
            if (valInput) valInput.placeholder = i18next.t("placeholders.valueRS");
            if (removeBtn) removeBtn.textContent = i18next.t("buttons.remove");
        });
    }
    // Refresh history list if visible
    const activeTab = document.querySelector(".tab-button.active")?.getAttribute("onclick")?.split("'")[1];
    if (activeTab === "tabHistorico") {
        carregarHistoricoProjetos();
    }
}

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
    const savedTheme = localStorage.getItem(THEME_KEY) || "auto";
    setTheme(savedTheme);
}

if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        const currentTheme = localStorage.getItem(THEME_KEY);
        if (currentTheme === "auto") {
            applyTheme("auto");
        }
    });
}

// --- Fim do Gerenciamento de Tema ---

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

function addDynamicItem(listId, placeholderDescKey, placeholderValKey, itemDesc = "", itemVal = 0) {
    const list = document.getElementById(listId);
    const itemId = listId + "_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    const listItem = document.createElement("div");
    listItem.className = "dynamic-list-item";
    listItem.id = itemId;
    listItem.innerHTML = `
        <input type="text" placeholder="${i18next.t(placeholderDescKey)}" class="item-desc" value="${itemDesc}">
        <input type="number" placeholder="${i18next.t(placeholderValKey)}" class="item-val" value="${itemVal}">
        <button type="button" class="remove-btn" onclick="removeItem(\'${itemId}\')">${i18next.t("buttons.remove")}</button>
    `;
    list.appendChild(listItem);
}

function addCustoPessoalItem(desc = "", val = 0) { addDynamicItem("custosPessoaisList", "placeholders.personalCostDescription", "placeholders.valueRS", desc, val); }
function addCustoEmpresaItem(desc = "", val = 0) { addDynamicItem("custosEmpresaList", "placeholders.companyCostDescription", "placeholders.valueRS", desc, val); }
function addEquipamentoItem(desc = "", val = 0) { addDynamicItem("equipamentosList", "placeholders.equipmentDescription", "placeholders.acquisitionValueRS", desc, val); }
function addCustoAdicionalProjetoItem(desc = "", val = 0) { addDynamicItem("custosAdicionaisProjetoList", "placeholders.additionalCostDescription", "placeholders.valueRS", desc, val); }

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
    if (isNaN(value) || value === null) {
        const lang = i18next.language.startsWith("pt") ? "pt-BR" : i18next.language.split("-")[0];
        return (0).toLocaleString(lang, { style: "currency", currency: lang === "pt-BR" ? "BRL" : (lang === "es" ? "EUR" : "USD") });
    }
    const lang = i18next.language.startsWith("pt") ? "pt-BR" : i18next.language.split("-")[0];
    return value.toLocaleString(lang, { style: "currency", currency: lang === "pt-BR" ? "BRL" : (lang === "es" ? "EUR" : "USD") });
}

function formatDate(dateString) {
    if (!dateString) return i18next.t("projectDetailsModal.notInformed");
    const date = new Date(dateString);
    return date.toLocaleDateString(i18next.language.startsWith("pt") ? "pt-BR" : i18next.language.split("-")[0], { timeZone: "UTC" });
}

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
        if (tabButton) openTab({ currentTarget: tabButton }, activeTab); // Pass event-like object
    }
}

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
    if (showAlert) alert(i18next.t("alerts.fixedCostsCalculated"));
}

let currentProjectResults = {};

function calcularPrecoProjeto(showAlert = true) {
    if (GLOBAIS_CUSTOS_FIXOS.gastoMensalTotal === 0 || GLOBAIS_CUSTOS_FIXOS.diasTrabalhadosMes === 0 || GLOBAIS_CUSTOS_FIXOS.horasTrabalhoDia === 0) {
        if (showAlert) alert(i18next.t("alerts.calculateFixedCostsFirst"));
        const tabButton = document.querySelector("button[onclick*=\"tabCustos\"]");
        if (tabButton) openTab({ currentTarget: tabButton }, "tabCustos");
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
        if (showAlert) alert(i18next.t("alerts.workDaysOrHoursCannotBeZero"));
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
    document.getElementById("resProjetosNecessariosMes").textContent = isFinite(currentProjectResults.projetosNecessariosMes) ? currentProjectResults.projetosNecessariosMes : i18next.t("projectDetailsModal.notInformed");
    document.getElementById("resPrecoEntregavelAdicional").textContent = formatCurrency(currentProjectResults.precoPorEntregavelAdicional);
    document.getElementById("resPrecoHoraAdicional").textContent = formatCurrency(currentProjectResults.precoPorHoraAdicional);
    document.getElementById("resultadosProjeto").style.display = "block";
    saveAppDataToLocalStorage();
    if (showAlert) alert(i18next.t("alerts.projectPriceCalculated"));
    return currentProjectResults;
}

function salvarProjetoNoHistorico() {
    const nomeProjetoSalvo = prompt(i18next.t("alerts.saveProjectNamePrompt"));
    if (!nomeProjetoSalvo) {
        alert(i18next.t("alerts.saveCancelledNoName"));
        return;
    }

    const resultadosDoCalculo = calcularPrecoProjeto(false);
    if (!resultadosDoCalculo) {
        alert(i18next.t("alerts.projectNotCalculated"));
        return;
    }

    const historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    const novoProjetoSalvo = {
        id: "proj_" + Date.now(),
        nomeProjetoSalvo: nomeProjetoSalvo,
        dataSalvamento: new Date().toISOString(),
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
        resultados: resultadosDoCalculo
    };

    historico.unshift(novoProjetoSalvo);
    localStorage.setItem(HISTORICO_PROJETOS_KEY, JSON.stringify(historico));
    alert(i18next.t("alerts.projectSavedSuccess", { projectName: nomeProjetoSalvo }));
    carregarHistoricoProjetos();
}

function carregarHistoricoProjetos() {
    const listaHistoricoDiv = document.getElementById("listaHistoricoProjetos");
    const historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    listaHistoricoDiv.innerHTML = "";

    if (historico.length === 0) {
        listaHistoricoDiv.innerHTML = `<p data-i18n="tabHistory.noProjectsSaved">${i18next.t("tabHistory.noProjectsSaved")}</p>`;
        return;
    }

    historico.forEach(projeto => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "historico-item";
        itemDiv.innerHTML = `
            <h4>${projeto.nomeProjetoSalvo}</h4>
            <p><strong><span data-i18n="tabHistory.client">${i18next.t("tabHistory.client")}</span></strong> ${projeto.nomeContratante || i18next.t("projectDetailsModal.notInformed")}</p>
            <p><strong><span data-i18n="tabHistory.projectDateLabel">${i18next.t("tabHistory.projectDateLabel")}</span></strong> ${formatDate(projeto.dataProjeto)}</p>
            <p><strong><span data-i18n="tabHistory.description">${i18next.t("tabHistory.description")}</span></strong> ${projeto.descricaoProjeto ? (projeto.descricaoProjeto.substring(0, 100) + (projeto.descricaoProjeto.length > 100 ? "..." : "")) : i18next.t("projectDetailsModal.notInformed")}</p>
            <p><strong><span data-i18n="tabHistory.pricePix">${i18next.t("tabHistory.pricePix")}</span></strong> ${formatCurrency(projeto.resultados.precoPix)}</p>
            <p><strong><span data-i18n="tabHistory.priceCard">${i18next.t("tabHistory.priceCard")}</span></strong> ${formatCurrency(projeto.resultados.precoCartao)}</p>
            <p><em><span data-i18n="tabHistory.savedAt">${i18next.t("tabHistory.savedAt")}</span> ${new Date(projeto.dataSalvamento).toLocaleString(i18next.language.startsWith("pt") ? "pt-BR" : i18next.language.split("-")[0])}</em></p>
            <div class="historico-item-actions">
                <button onclick="verDetalhesProjeto(\'${projeto.id}\')" data-i18n="buttons.viewDetails">${i18next.t("buttons.viewDetails")}</button>
                <button class="remove-btn" onclick="excluirProjetoDoHistorico(\'${projeto.id}\')" data-i18n="buttons.delete">${i18next.t("buttons.delete")}</button>
            </div>
        `;
        listaHistoricoDiv.appendChild(itemDiv);
    });
}

function excluirProjetoDoHistorico(idProjeto) {
    if (!confirm(i18next.t("alerts.confirmDeleteProject"))) {
        return;
    }
    let historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    historico = historico.filter(p => p.id !== idProjeto);
    localStorage.setItem(HISTORICO_PROJETOS_KEY, JSON.stringify(historico));
    carregarHistoricoProjetos();
    alert(i18next.t("alerts.projectDeleted"));
}

function verDetalhesProjeto(idProjeto) {
    const historico = JSON.parse(localStorage.getItem(HISTORICO_PROJETOS_KEY)) || [];
    const projeto = historico.find(p => p.id === idProjeto);
    if (!projeto) {
        alert(i18next.t("alerts.projectNotFound"));
        return;
    }

    const modalBody = document.getElementById("modalBodyDetalhesProjeto");
    document.getElementById("modalNomeProjetoSalvo").textContent = projeto.nomeProjetoSalvo;

    let detalhesHtml = `
        <p><strong>${i18next.t("projectDetailsModal.clientNameLabel")}</strong> ${projeto.nomeContratante || i18next.t("projectDetailsModal.notInformed")}</p>
        <p><strong>${i18next.t("projectDetailsModal.projectDateLabel")}</strong> ${formatDate(projeto.dataProjeto)}</p>
        <p><strong>${i18next.t("projectDetailsModal.detailedDescriptionLabel")}</strong></p>
        <p style="white-space: pre-wrap;">${projeto.descricaoProjeto || i18next.t("projectDetailsModal.notInformed")}</p>
        <hr>
        <h4>${i18next.t("projectDetailsModal.calculationInfoTitle")}</h4>
        <p>${i18next.t("projectDetailsModal.estimatedWorkTimeLabel")} ${projeto.tempoTrabalhoProjeto} ${i18next.t("projectDetailsModal.hours")}</p>
        <p>${i18next.t("projectDetailsModal.deliverablesLabel")} ${projeto.numeroEntregaveis}</p>
        <p>${i18next.t("projectDetailsModal.avgTimePerDeliverableLabel")} ${projeto.tempoEdicaoEntregavel} ${i18next.t("projectDetailsModal.minutes")}</p>
        <p>${i18next.t("projectDetailsModal.profitPercentageLabel")} ${projeto.percentualLucro}%</p>
        <p>${i18next.t("projectDetailsModal.taxPercentageLabel")} ${projeto.percentualImpostos}%</p>
        <p>${i18next.t("projectDetailsModal.cardFeeLabel")} ${projeto.taxaCartao || 0}%</p>
    `;

    if (projeto.custosAdicionaisProjetoList && projeto.custosAdicionaisProjetoList.length > 0) {
        detalhesHtml += `<h5>${i18next.t("projectDetailsModal.additionalProjectCostsTitle")}</h5><ul>`;
        projeto.custosAdicionaisProjetoList.forEach(custo => {
            detalhesHtml += `<li>${custo.desc}: ${formatCurrency(custo.val)}</li>`;
        });
        detalhesHtml += "</ul>";
    }

    detalhesHtml += `<hr><h4>${i18next.t("projectDetailsModal.financialResultsTitle")}</h4>
        <p><strong>${i18next.t("projectDetailsModal.totalAllocatedCostLabel")}</strong> ${formatCurrency(projeto.resultados.custoTotalAlocadoAoProjeto)}</p>
        <p><strong>${i18next.t("projectDetailsModal.calculatedProfitLabel")}</strong> ${formatCurrency(projeto.resultados.valorLucro)}</p>
        <p><strong>${i18next.t("projectDetailsModal.estimatedTaxesLabel")}</strong> ${formatCurrency(projeto.resultados.valorImpostos)}</p>
        <p><strong>${i18next.t("projectDetailsModal.suggestedPricePixLabel")} ${formatCurrency(projeto.resultados.precoPix)}</strong></p>
        <p><strong>${i18next.t("projectDetailsModal.suggestedPriceCardLabel")} ${formatCurrency(projeto.resultados.precoCartao)}</strong></p>
        <hr>
        <h4>${i18next.t("projectDetailsModal.detailedFinancialSummaryTitle")}</h4>
        <p>${i18next.t("projectDetailsModal.personalCostShareLabel")} ${formatCurrency(projeto.resultados.parcelaCustoPessoal)}</p>
        <p>${i18next.t("projectDetailsModal.companyCostShareLabel")} ${formatCurrency(projeto.resultados.parcelaCustoEmpresaBase)}</p>
        <p>${i18next.t("projectDetailsModal.salaryShareLabel")} ${formatCurrency(projeto.resultados.parcelaSalario)}</p>
        <p>${i18next.t("projectDetailsModal._13thShareLabel")} ${formatCurrency(projeto.resultados.parcela13)}</p>
        <p>${i18next.t("projectDetailsModal.vacationShareLabel")} ${formatCurrency(projeto.resultados.parcelaFerias)}</p>
        <p>${i18next.t("projectDetailsModal.depreciationShareLabel")} ${formatCurrency(projeto.resultados.parcelaDepreciacao)}</p>
        <p>${i18next.t("projectDetailsModal.occasionalExpensesShareLabel")} ${formatCurrency(projeto.resultados.parcelaGastosOcasionais)}</p>
        <p>${i18next.t("projectDetailsModal.sumAdditionalCostsLabel")} ${formatCurrency(projeto.resultados.somaCustosAdicionaisProjeto)}</p>
        <p>${i18next.t("projectDetailsModal.projectProfitLabel")} ${formatCurrency(projeto.resultados.valorLucro)}</p>
        <p>${i18next.t("projectDetailsModal.projectTaxesLabel")} ${formatCurrency(projeto.resultados.valorImpostos)}</p>
        <p>${i18next.t("projectDetailsModal.projectsNeededMonthlyLabel")} ${isFinite(projeto.resultados.projetosNecessariosMes) ? projeto.resultados.projetosNecessariosMes : i18next.t("projectDetailsModal.notInformed")}</p>
        <hr>
        <h4>${i18next.t("projectDetailsModal.optionalsTitle")}</h4>
        <p>${i18next.t("projectDetailsModal.pricePerAdditionalDeliverableLabel")} ${formatCurrency(projeto.resultados.precoPorEntregavelAdicional)}</p>
        <p>${i18next.t("projectDetailsModal.pricePerAdditionalHourLabel")} ${formatCurrency(projeto.resultados.precoPorHoraAdicional)}</p>
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

async function initializeApp() {
    await initI18next();
    loadTheme();
    loadAppDataFromLocalStorage();
    carregarHistoricoProjetos();

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("change", saveAppDataToLocalStorage);
        input.addEventListener("keyup", saveAppDataToLocalStorage);
    });

    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
        themeSelector.addEventListener("change", (event) => {
            setTheme(event.target.value);
        });
    }

    const savedAppData = localStorage.getItem(APP_DATA_KEY);
    if (!savedAppData) {
        // Add initial example data if no saved data exists, using translated keys
        addCustoPessoalItem(i18next.t("initialData.rent"), 1200);
        addCustoEmpresaItem(i18next.t("initialData.adobeSoftware"), 150);
        addEquipamentoItem(i18next.t("initialData.sonyCamera"), 10000);
        addCustoAdicionalProjetoItem(i18next.t("initialData.transport"), 50);
    }

    const appData = JSON.parse(localStorage.getItem(APP_DATA_KEY)) || {};
    const activeTab = appData.activeTab || "tabCustos";
    const tabButtonToActivate = document.querySelector(`.tab-button[onclick*="${activeTab}"]`);
    if (tabButtonToActivate) {
        openTab({ currentTarget: tabButtonToActivate }, activeTab);
    } else {
        const firstTabButton = document.querySelector(".tab-button");
        if (firstTabButton) {
             openTab({ currentTarget: firstTabButton }, firstTabButton.getAttribute("onclick").split("'")[1]);
        }
    }
    updateContent(); // Ensure content is updated after all initial loads and potential language changes
}

document.addEventListener("DOMContentLoaded", initializeApp);

