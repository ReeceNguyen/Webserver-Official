# Các công việc cần làm 
## Thư viện ***cần cài*** 
### Thư viện webserver
1.  npm init	
2.  npm install socket.io	
3.  npm install express –-save	
4.  npm i –g npm	
5.  npm i –-save lodash	
6.  npm install ejs	
7.  npm install jquery	
8.  npm install nodes7	
9.  npm install mysql
10. npm install exceljs
11. npm install -D tailwindcss
### Thư viện CSS
1.  npx tailwindcss init
2.  npx tailwindcss build -o ./public/css/tailwind.css --watch

        Trong tailwind.config.js:
        /** @type {import('tailwindcss').Config} */
        module.exports = {
                content: ["./views/*.ejs"],
                theme: {
                        extend: {},
                },
                plugins: [],
        }
### Cài đặt môi trường
1. package.json

        "scripts": {
        "lvtn": "node index.js",
        "lvtn:css": "npx tailwindcss build -o ./public/css/tailwind.css --watch"
        },
