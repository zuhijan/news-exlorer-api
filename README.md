# REST-API

![alt text](https://i.ibb.co/yQwyp0R/123.png "Logo NewsExplorer")

## для проекта [news-explorer](http://news-explorer.ru/)

Обратиться к API:

- api.news-explorer.ru
- 84.201.166.100

### Используемые технологии

pm2, nginx, git, node.js, express.js, npm, ssl(certbot: Let's Encrypt), mongo, mongoose, winston, celebrate.

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
> <https://docs.mongodb.com/manual/installation/>

#### Запустите проект

Production сборка.Запустить сервер на localhost:3000.
> npm run start

Dev сборка.Запустить сервер на localhost:3000 с хот релоудом;
> npm run dev

Для Production сборки, необходим .env:
> NODE_ENV=production
> JWT_SECRET=some-secret-key
> DB_ADRESS='mongodb://localhost:27017/newsdatab'
