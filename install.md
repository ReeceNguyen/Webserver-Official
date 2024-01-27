# Tasks to do 
## Installation
Download [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
1. Generate **package.json** for project
```console
npm init
```
2. Add modules package for Webserver:
* [Socket.io](https://socket.io/docs/v4/tutorial/introduction)
  ```console
  npm install socket.io
  ``` 
* [Express](https://expressjs.com/)
  ```console
  npm install express –-save
  ``` 
* [Ejs](https://www.npmjs.com/package/ejs)
  ```console
  npm install ejs
  ```
* [Lodash](https://lodash.com/)
  ```console
  npm i –g npm
  ```
  ```console
  npm i –-save lodash	
  ```

* [Nodes7](https://www.npmjs.com/package/nodes7)
  ```console
  npm install nodes7
  ```
* [mySQL](https://www.npmjs.com/package/mysql)
  ```console
  npm install mysql
  ```
* [Exceljs](https://www.npmjs.com/package/exceljs#fills)
  ```console
  npm install exceljs
  ```
* [Dotenv](https://www.npmjs.com/package/dotenv)
  ```console
  npm install dotenv
  ``` 
## CSS  Framework
Doc for [TailwindCSS](https://tailwindcss.com/docs/installation)
1. Install ***TailwindCSS*** module in Project:
    ```console
    npm install -D tailwindcss
    ```
2. Initial ***TailwindCSS*** for project:
* ```console
  npx tailwindcss init
  ```
* ```console
  npx tailwindcss build -o ./public/css/tailwind.css --watch
  ```  

3. Configure ***tailwind.config.js***:
```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
        content: ["./views/*.ejs"],
        theme: {
                extend: {},
        },
        plugins: [],
   }
```
## Configure DEV Environment
Configure ***package.json*** :

```json
"scripts": {
        "lvtn": "node index.js",
        "lvtn:css": "npx tailwindcss build -o ./public/css/tailwind.css --watch"
},
```
## Running Test
```console
npm run lvtn:css 
npm run lvtn  
```
