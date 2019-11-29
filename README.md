# REST-API

![alt text](https://i.ibb.co/yQwyp0R/123.png "Logo NewsExplorer")

## для проекта news-explorer

Обратиться к API:

- api.news-explorer
- 84.201.140.162

### Используемые технологии

На сервере: pm2, nginx, git, node.js, npm, ssl(certbot: Let's Encrypt), mongo.
В проекте:
> "devDependencies": {
> "cross-env": "^6.0.3",
> "eslint": "^6.5.1",
> "eslint-config-airbnb-base": "^14.0.0",
> "eslint-plugin-import": "^2.18.2",
> "nodemon": "^1.19.3"
> },
> "dependencies": {
> "bcryptjs": "^2.4.3",
> "body-parser": "^1.19.0",
> "celebrate": "^10.1.0",
> "cookie-parser": "^1.4.4",
> "crypto": "^1.0.1",
> "dotenv": "^8.2.0",
> "express": "^4.17.1",
> "express-winston": "^4.0.1",
> "jsonwebtoken": "^8.5.1",
> "mongoose": "^5.7.7",
> "validator": "^12.0.0",
> "winston": "^3.2.1"
> }
---

### Функциональность API

## Запросы

возвращает информацию о пользователе (email и имя)
> GET /users/me
возвращает все сохранённые пользователем статьи
> GET /articles
создаёт статью с переданными в теле
keyword, title, text, date, source, link и image
> POST /articles
удаляет сохранённую статью  по _id
> DELETE /articles/articleId
создаёт пользователя с переданными в теле
email, password и name
> POST /signup
проверяет переданные в теле почту и пароль
и возвращает JWT
> POST /signin

## Другой функционал

Настроено логирование:

- request.log, чтобы хранить информацию о всех запросах к API;
- error.log, чтобы хранить информацию об ошибках, которые возвращало API.

---

### Установка и запуск проекта

Склонируйте гит-репозиторий
> git clone <https://github.com/zuhijan/news-exlorer-api.git>
Установите npm-зависимости
> npm install
Установите MongoDB
<https://docs.mongodb.com/manual/installation/>
Запустите проект
Production сборка.Запустить сервер на localhost:3000.
> npm run start
Dev сборка.Запустить сервер на localhost:3000 с хот релоудом;
> npm run dev

Для Production сборки, необходим .env:
> NODE_ENV=production
> JWT_SECRET=some-secret-key
