# Use uma imagem base com Node.js
FROM node:18-alpine

# Instale as dependências necessárias
RUN apk add --no-cache bash git python3 py3-pip build-base

# Crie o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos de configuração do projeto para o container
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn

# Copie o restante do código para o container
COPY . .

# Exponha a porta que o Expo utiliza
EXPOSE 19000

# Comando padrão para iniciar o Expo
CMD ["yarn", "start"]
