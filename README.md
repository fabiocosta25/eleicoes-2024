Eleicoes-2024 🗳️

Eleicoes-2024 é uma aplicação desenvolvida para acompanhar e processar dados eleitorais em tempo real. A aplicação coleta informações sobre candidatos e apurações diretamente de fontes públicas, oferecendo uma interface dinâmica para visualização e análise dos dados.

⚙️ Funcionalidades
Coleta de dados via API: Scripts automatizados para requisição de informações com intervalos de tempo definidos.
Visualização dinâmica: Interface interativa onde os dados são atualizados conforme a apuração das seções eleitorais.
Integração com Docker: A aplicação roda em um ambiente isolado utilizando Docker e Docker Compose.
Barra de progresso: Atualiza em tempo real com base no percentual de seções apuradas por cidade.
Customização de cores dos partidos: Box shadow das fotos dos candidatos alterado conforme a cor correspondente ao partido, definida no arquivo cores_partido.json.
🛠️ Tecnologias Utilizadas
Python: Para scripts de coleta e processamento de dados.
Docker & Docker Compose: Para facilitar o setup e o deploy da aplicação.
HTML, CSS, JavaScript: Para construção da interface do usuário.
APIs: Integração com fontes de dados públicos.
JSON: Para armazenamento e processamento das informações dos partidos, candidatos, e apurações.


bash
Copiar código
git clone https://github.com/fabiocosta25/eleicoes-2024.git
cd eleicoes-2024
Construa e inicie os containers Docker:

bash
Copiar código
docker-compose up --build
Acesse a aplicação: Acesse http://localhost:8000 no navegador para visualizar a interface.

Personalize o arquivo cores_partido.json: Configure as cores dos partidos conforme necessário.

📊 Coleta de Dados
O script coleta_api.py realiza requisições a cada 5 segundos, coletando os dados mais recentes das apurações. Os resultados são armazenados em arquivos JSON e exibidos na interface.

🖼️ Customização da Interface
A interface é totalmente responsiva e pode ser customizada conforme sua necessidade. A barra de progresso reflete o percentual de seções apuradas em tempo real com base nos dados recebidos.

🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request para melhorias e correções.

📄 Licença
Este projeto está licenciado sob os termos da Licença MIT.
