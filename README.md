# Environment Settings 
## Installation
Download [![Static Badge](https://img.shields.io/badge/Nodejs-green)](https://nodejs.org/en/) module available through the
[![Static Badge](https://img.shields.io/badge/npm-registry-orange)](https://www.npmjs.com/).
1. Generate **package.json** for project
```console
npm init
```
2. Add ***Module packages*** for Webserver:
* [Socket.io](https://socket.io/docs/v4/tutorial/introduction) : server-client communicating
  ```console
  npm install socket.io
  ``` 
* [Express](https://expressjs.com/) : server-side
  ```console
  npm install express –-save
  ``` 
* [Ejs](https://www.npmjs.com/package/ejs) : view engine
  ```console
  npm install ejs
  ```
* [Lodash](https://lodash.com/) :  handle Array, Object, Function, Collection 
  ```console
  npm i –g npm
  ```
  ```console
  npm i –-save lodash	
  ```

* [Nodes7](https://www.npmjs.com/package/nodes7) : communication to S7-300/400/1200/1500 PLCs
  ```console
  npm install nodes7
  ```
* [mySQL](https://www.npmjs.com/package/mysql) : Database
  ```console
  npm install mysql
  ```
* [Exceljs](https://www.npmjs.com/package/exceljs#fills) : Report
  ```console
  npm install exceljs
  ```
* [Dotenv](https://www.npmjs.com/package/dotenv) : Environment Configuration
  ```console
  npm install dotenv
  ``` 
## CSS  Framework
Download [![Static Badge](https://img.shields.io/badge/css-Tailwind-blue)](https://tailwindcss.com/docs/installation) module available through the
[![Static Badge](https://img.shields.io/badge/npm-registry-orange)](https://www.npmjs.com/).
1. Install ***TailwindCSS*** module in Project:
    ```console
    npm install -D tailwindcss
    ```
2. Initial ***TailwindCSS*** for project:
* ```console
  npx tailwindcss init
  ```
* ```console
  npx tailwindcss build -o ./src/public/css/tailwind.css --watch
  ```  

3. Configure ***tailwind.config.js***:
```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
        content: ["./src/views/*.ejs"],
        theme: {
                extend: {},
        },
        plugins: [],
   }
```
## Configure DEV Environment
1. Configure ***package.json*** :

```json
"scripts": {
        "lvtn": "node ./src/index.js",
        "lvtn:css": "npx tailwindcss build -o ./src/public/css/tailwind.css --watch"
},
```
2. Configure **.env** file:
```txt
#----------SERVER--------------------------
SERVER_IP=
PORT=
#----------CPU CONFIGURATION---------------
CPU_PORT=
CPU_RACK=
CPU_SLOT=
## STATION 1
CPU_HOST_1=
## STATION 2
CPU_HOST_2=
#-----------SQL CONNECTION-----------------
SQL_HOST=
SQL_USER=
SQL_KEY=
#------------------------------------------
# DATABASE STATION 1
SQL_STATION_1=
TABLE_DATA_1=
TABLE_ALARM_1=
# DATABASE STATION 2
SQL_STATION_2=
TABLE_DATA_2=
TABLE_ALARM_2=
# DATABASE USERS
SQL_ACCOUNT=
TABLE_ACCOUNT=
```
## Running Test
* Run ***Tailwind*** :
```console
npm run lvtn:css 
```
* Run ***Server*** :
```console
npm run lvtn  
```