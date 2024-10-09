# Etapa 1: Configurar o backend com Python
FROM python:3.9-slim AS python-backend

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o script Python da pasta src e o arquivo cidades.txt da raiz
COPY src/coleta_api.py ./
COPY cidades.txt ./

# Instalar as dependências, se houver
#COPY requirements.txt .
#RUN pip install --no-cache-dir -r requirements.txt

# Expor a porta da API (ajuste se necessário)
EXPOSE 5000

# Comando para rodar o backend Python (ajuste se necessário)
CMD ["python3", "coleta_api.py"]

# Etapa 2: Configurar o Nginx para servir arquivos estáticos
FROM nginx:alpine AS nginx-frontend

# Copiar todos os arquivos da pasta src para o diretório padrão do Nginx
COPY src/ /usr/share/nginx/html/

# Expor a porta 80 para acessar a aplicação via HTTP
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
