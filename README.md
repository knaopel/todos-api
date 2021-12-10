# Honey Dew
A simple todo app made with docker compose that uses a Ruby on Rails web-api and React-Redux for the front-end server
## Setup
On a machine running docker compose, run `docker-compose up -d` to start the web-api and database.

### DB Setup
In order to set up the database the first time, run `docker-compose exec web-api rails db:create db:migrate`. For more information, see the [Web-Api documentation](./web-api/README.md).

## Run Front End
The React-Redux front end runs on the local machine. Run `cd front-end` to change the font-end directory and then run `npm i && npm start` from Cmd or bash, or `npm i; npm start` from PowerShell. For more information on the front-end, see the [Front-End documentaion](./front-end/README.md).
