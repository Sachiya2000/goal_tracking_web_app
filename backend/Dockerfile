# backend/Dockerfile


FROM node:18-alpine


WORKDIR /app/backend


COPY package*.json ./
RUN npm install


COPY . .


EXPOSE 5001


CMD ["npm", "start"]
