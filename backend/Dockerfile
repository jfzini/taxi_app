FROM node:18

WORKDIR /app-backend

COPY . .

RUN npm install

EXPOSE 8080

ENV DATABASE_URL=mysql://root:password@mysql:3306/my_database

CMD ["npm", "run", "dev"]
