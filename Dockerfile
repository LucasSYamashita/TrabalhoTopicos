FROM node:20-alpine

# Caso alguma lib nativa seja necessária
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

# Instalar dependências com cache eficiente
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar código
COPY . .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Healthcheck simples (ajuste a rota se quiser)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/ || exit 1

CMD ["npm", "start"]
