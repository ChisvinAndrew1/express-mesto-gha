[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд



## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.
https://github.com/ChisvinAndrew1/express-mesto-gha
```
[![Tests for sprint 13](https://github.com/ChisvinAndrew1/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/ChisvinAndrew1/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```

## перечень команд 
 npm init -y (create package.json)
 npm i express
 npm i mogoose
 npm i nodemon -D
.editorconfig
.eslint
git init
.gitignore
{
  npm i bcryptjs,
  npm i jsonwebtoken,
  npm i celebrate,
  npm i cookie-parser,
  npm install validator
}

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
