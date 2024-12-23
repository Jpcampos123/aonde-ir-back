# Etapa 1: Build da aplicação
FROM node:20 AS builder

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos necessários
COPY package.json yarn.lock ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Etapa 2: Executar a aplicação
FROM node:20

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos buildados e dependências
COPY --from=builder /usr/src/app /usr/src/app

# Variáveis de ambiente
ENV PORT=4000
ENV NODE_ENV=production

# Exposição da porta
EXPOSE 4000

# Comando para rodar a aplicação em produção
CMD ["npm", "run", "start:prod"]
