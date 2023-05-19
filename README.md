# GLIMPSE BACKEND IN NODEJS
- [GLIMPSE BACKEND IN NODEJS](#glimpse-backend-in-nodejs)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Admin Dashboard](#admin-dashboard)
  - [Swagger Documentation](#swagger-documentation)

## Installation
- Clone the repository
- Run `npm install` to install all dependencies
- Run `npm run generate:keys` to generate the public and private keys
- Create a database in MariaDB
- Copy the `.env.example` file to `.env` and fill in the database credentials

## Usage

- Run `npm start` to start the server
- Run `npm run dev` to start the server in development mode
- Run `npm run test` to run the tests

## Admin Dashboard

To access the admin dashboard, go to `/admin` and login with the credentials you set in the `.env` file.

## Swagger Documentation

To access the swagger documentation, go to `/api-docs`.