# _This project was created with Node and Express JS._

## Information

This is a **basic** Node JS, Express JS Real World API Rest Server Template. You can use this template to start a new API Rest and then add all the complexity you need using the middleware approach as Express aims to.

**_Note: You must complete routes, model, controllers and additional middlewares_**

### `SERVER:PORT`: http://your-ip:8080
**Important:** 
* Rename _.env.dist_ to _.env_
* Please see /config/config.js and .env.dist files for configuration
* Create a folder name **logs** for the access and error log files
* Use **npm install** to add all dependencies
* Use **npm run dev** to run in development mode with nodemon
* Use **npm start** to run in production mode with pm2

### `API endpoints` for Users

**GET /users/:id** Gets one user by id

**GET /users** Gets all users

**POST /users** Create an user

**PUT /users/:id** Update an user

**DELETE /users/:id** Delete an user

### `API endpoints` for Test
**Important:** This routes are just to check the functionality

**GET /tests/:id** Gets one tests by id

**GET /tests** Gets all tests

**POST /tests** Create an tests

**PUT /tests/:id** Update an tests

**DELETE /tests/:id** Delete an tests

### `@TODO`
* Add SSL.
* For big traffic apps or for mainly static files serving, you might want to add Nginx in front of Express. If doing so, please remove compressing and adding extra headers from Express (App.js) and delegate it to Nginx.
* Authentication is not implemented. You might want to add a JWT middleware to each route you want to control (coming in version 1.1.0)

### `License`
Public domain: Free to use and modify