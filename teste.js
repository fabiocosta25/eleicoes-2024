document.addEventListener("DOMContentLoaded", function () {
    const candidateList = document.querySelector(".candidates-list");
    const cityCheckboxes = document.querySelectorAll(".city-checkbox");
    const regionSubtitle = document.getElementById("regionSubtitle");
    const refreshButton = document.getElementById("refreshButton");

    // Mapeamento de códigos de cidades para seus nomes
    const cityNames = {
        "sp61492": "APARECIDA",
        "sp61646": "ARAPEÍ",
        "sp61697": "AREIAS",
        "sp61816": "ATIBAIA",
        "sp61972": "BANANAL",
        "sp62413": "BOM JESUS DOS PERDÕES",
        "sp62510": "BRAGANÇA PAULISTA",
        "sp62731": "CACHOEIRA PAULISTA",
        "sp62103": "CANAS",
        "sp62715": "CAÇAPAVA",
        "sp63690": "CRUZEIRO",
        "sp63738": "CUNHA",
        "sp70939": "SÃO JOSÉ DO BARREIRO",
        "sp64696": "GUARATINGUETÁ",
        "sp65056": "IGARATÁ",
        "sp65897": "JACAREÍ",
        "sp65994": "JAMBEIRO",
        "sp66117": "JOANÓPOLIS",
        "sp66273": "LAGOINHA",
        "sp66338": "LAVRINHAS",
        "sp66451": "LORENA",
        "sp67350": "MONTEIRO LOBATO",
        "sp67474": "NATIVIDADE DA SERRA",
        "sp68136": "PARAIBUNA",
        "sp68616": "PINDAMONHANGABA",
        "sp68713": "PIQUETE",
        "sp61565": "POTIM",
        "sp69876": "ROSEIRA",
        "sp70998": "SÃO JOSÉ DOS CAMPOS",
        "sp71412": "SILVEIRAS",
        "sp71838": "TAUBATÉ",
        "sp71978": "TREMEMBÉ",
        "sp72095": "UBATUBA",
        "sp61549": "VARGEM",
        "sp62952": "CAMPOS DO JORDÃO",
        "sp70653": "SANTO ANTONIO DO PINHAL",
        "sp70734": "SÃO BENTO DO SAPUCAÍ",
        "sp71153": "SÃO SEBASTIÃO",
        "sp65099": "ILHABELA",
        "sp63118": "CARAGUATATUBA",
        "sp69477": "REDENÇÃO DA SERRA",
        "sp67490": "NAZARÉ PAULISTA",
        "sp68730": "PIRACAIA",
        "sp69396": "QUELUZ",
        "sp70211": "SANTA BRANCA",
        "sp71013": "SÃO LUIZ DO PARAITINGA"

    };

    // Mapeamento de cores dos partidos
    const coresPartido = {
        "AGIR": "#2c609d",
        "AVANTE": "#5f8d8e",
        "CID": "#c63c94",
        "DC": "#ab7c24",
        "MDB": "#4F9961",
        "MOB": "#cf7676",
        "NOVO": "#497677",
        "PCB": "#e63345",
        "PCdoB": "#800313",
        "PCO": "#923d00",
        "PDT": "#2569ad",
        "PL": "#30306d",
        "PMB": "#892a4b",
        "PODE": "#658c4c",
        "PP": "#2fa9af",
        "PRD": "#009b95",
        "PRTB": "#23488c",
        "PSB": "#d35224",
        "PSD": "#a0a00b",
        "PSDB": "#1c69b3",
        "PSOL": "#e08500",
        "PSTU": "#ce5252",
        "PT": "#c0122d",
        "PV": "#034701",
        "REDE": "#666666",
        "REP": "#385e7e",
        "SD": "#d86f3a",
        "UNIÃO": "#3a91af",
        "UP": "#333333"
    };

    // Adicionando o CSS diretamente no script (você já tinha isso)
    const style = document.createElement('style');
    style.innerHTML = `
        .progress-container {
            display: flex;
            justify-content: left;
            align-items: center;
            margin-top: 1rem;
            margin-left: 29rem;
            margin-bottom: 0rem;
        }
        .progress-label {
            font-size: 1rem;
            color: #4B5563;
        }
        .progress-bar {
            width: 450px;
            height: 0.8rem;
            background-color: #D1D5DB;
            border-radius: 9999px;
            overflow: hidden;
            margin: 0 0.5rem;
            margin-top: 0.5rem;
        }
        .progress-fill {
            background-color: #1554b3;
            height: 100%;
        }
        .error-message {
            color: red;
            text-align: center;
            margin: 1rem 0;
        }
        .candidate-info {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 700;
            color: #374151;
            margin-bottom: 0rem;
        }
        .candidate-percentage {
            margin-right: 7rem;
            margin-left: 8rem;
            color: #002BFF;
            font-size: 2rem;
            margin-top: 2rem;
            font-family: 'Globo Tx Bd', sans-serif;
        }
        .candidate-votes {
            margin-left: 7rem;
            margin-top: 2rem;
            margin-bottom: 0rem;
            font-family: 'Globo Tx Bd', sans-serif;
        }
        .eleito {
            color: green;
            font-weight: bold;
            font-size: 2.5rem;
            position: absolute;
            top: 50px; 
            left: 10px;
        }
        .segundo-turno {
            color: orange;
            font-weight: bold;
            font-size: 2.5rem;
            position: absolute;
            top: 6px;
            left: 0px;
            text-align: center;
        }
        .candidate-foto {
            top: 0px;
            left: 300px;
            width: 150px;
            height: 150px;
            position: absolute;
            border-radius: -5.5rem;
            box-shadow: -30px 29px 0px -14px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease;
        }
        .candidate-container {
            top: 0px;
            left: 100px;
            position: relative;
            margin-bottom: 0rem;

        }
    `;
    document.head.appendChild(style);

    // Função para carregar os dados dos candidatos e fotos
    function loadCandidatesData() {
        Promise.all([
            fetch('dados_unificados.json').then(res => res.json()),
            fetch('Url_fotos.json').then(res => res.json())
        ])
        .then(([candidatesData, photosData]) => {
            console.log("Dados carregados com sucesso:", candidatesData, photosData);
            window.candidates = [];
            
            candidatesData.forEach(cityData => {
                const cityCode = cityData.Cidade;
                const cityCandidates = cityData.Candidatos;
                cityCandidates.forEach(candidate => {
                    const votosComputados = parseInt(candidate.votos.replace(/\./g, '')) || 0;
                    const percentualVotos = parseFloat(candidate.percentual_votos.replace(',', '.')) || 0;
                    const photoUrl = photosData.cidades[cityCode]?.find(url => url.includes(candidate.sqcand)) || '/src/img/base/foto_candidato.png';
                    
                    window.candidates.push({
                        nome: candidate.nome,
                        partido: candidate.partido,
                        votos: votosComputados,
                        percentual_votos: percentualVotos,
                        cidade: cityCode,
                        foto: photoUrl,
                        status: candidate.status // Usando o campo status
                    });
                });
            });
            filterCandidates();
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
            displayErrorMessage('Erro ao carregar dados dos candidatos. Tente novamente mais tarde.');
        });
    }

    // Função para exibir mensagens de erro
    function displayErrorMessage(message) {
        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'error-message';
        errorMessageElement.textContent = message;
        candidateList.innerHTML = ""; // Limpar lista anterior
        candidateList.appendChild(errorMessageElement);
    }

    // Função para filtrar os candidatos com base nas cidades selecionadas e ordená-los
    function filterCandidates() {
        const selectedCities = Array.from(cityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Atualizar o subtítulo com os nomes das cidades
        if (selectedCities.length > 0) {
            const selectedCityNames = selectedCities.map(code => cityNames[code]).join(", ");
            regionSubtitle.textContent = `| ${selectedCityNames}`;
        } else {
            regionSubtitle.textContent = "| Região";
        }

        candidateList.innerHTML = "";

        if (window.candidates) {
            // Ordena os candidatos em ordem decrescente de percentual de votos
            const sortedCandidates = window.candidates
                .filter(candidate => selectedCities.includes(candidate.cidade))
                .sort((a, b) => b.percentual_votos - a.percentual_votos);

            const fragment = document.createDocumentFragment();
            sortedCandidates.forEach(candidate => {
                const candidateHTML = document.createElement('div');
                candidateHTML.className = "candidate-container";
                const candidateLabel = candidate.status === 'Eleito'
                    ? '<span class="eleito">ELEITO</span>'
                    : candidate.status.trim() === '2º turno'
                    ? '<span class="segundo-turno">2º TURNO</span>'
                    : candidate.status === 'Eleito por QP'
                    ? '<span class="eleito">ELEITO</span>'
                    : candidate.status === 'Eleito por média'
                    ? '<span class="eleito">ELEITO</span>'
                    : '';
                
                // Define a cor do box shadow com base no partido
                const partidoColor = coresPartido[candidate.partido] || '#d3d3d3'; // Cor padrão preta caso não encontre o partido
                
                candidateHTML.innerHTML = `
                    <div> 
                        <img src="/img/base/BASE_CANDIDATO.png" alt="Base Candidato" class="candidate-base">
                        <img src="${candidate.foto}" alt="foto de ${candidate.nome}" class="candidate-foto" style="box-shadow: -30px 29px 0px -14px ${partidoColor};">
                    ${candidateLabel}  <!-- Adicione o status aqui -->
                    </div>
                    <div class="candidate text-center">
                        <h2 class="titlecandidato">${candidate.nome} <span class="subtitlecandidato">| ${candidate.partido}</span></h2>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${candidate.percentual_votos}%"></div>
                            </div>
                        </div>
                        <div class="candidate-info">
                            <p class="candidate-percentage">${candidate.percentual_votos}%</p>
                            <p class="candidate-votes">Votos: ${candidate.votos.toLocaleString()}</p>
                        </div>
                    </div>
                `;
                fragment.appendChild(candidateHTML);
            });
            candidateList.appendChild(fragment);
        }
    }

    // Função para garantir que apenas um checkbox possa ser selecionado por vez
    function handleCheckboxChange(event) {
        cityCheckboxes.forEach(checkbox => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
        filterCandidates();
    }

    // Função para restaurar o estado dos checkboxes a partir do localStorage
    function restoreCheckboxState() {
        const selectedCity = localStorage.getItem('selectedCity');
        if (selectedCity) {
            const checkbox = document.getElementById(selectedCity);
            if (checkbox) {
                checkbox.checked = true;
                filterCandidates(); // Refiltra com a cidade restaurada
            }
        }
    }

    // Função para salvar a seleção do checkbox no localStorage
    function saveCheckboxState(event) {
        const checkbox = event.target;
        if (checkbox.checked) {
            localStorage.setItem('selectedCity', checkbox.id);
        } else {
            localStorage.removeItem('selectedCity');
        }
    }

    // Adicionar evento para salvar a seleção no localStorage
    cityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", saveCheckboxState);
        checkbox.addEventListener("change", handleCheckboxChange); // Atualiza a seleção ao mudar
    });

    // Adicionar evento para atualizar os dados ao clicar no botão
    refreshButton.addEventListener("click", loadCandidatesData);

    // Carregar dados e restaurar o estado dos checkboxes ao carregar a página
    loadCandidatesData();
    restoreCheckboxState();
});
