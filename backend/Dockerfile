FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/

RUN npm install
RUN npx prisma generate
RUN npm run build

# Runtime
FROM node:18

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV DATABASE_URL=mysql://root:password@mysql:3306/my_database

EXPOSE 8080

# Initialize
CMD ["node", "dist/index.js"]
