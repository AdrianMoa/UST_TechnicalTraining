# Application Docker file Configuration
# Using multi stage build

FROM node:20-slim as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Build the image as production
FROM node:20-slim

WORKDIR /app
COPY package*.json ./
ENV PORT=4000
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}

CMD ["npm", "run", "start"]