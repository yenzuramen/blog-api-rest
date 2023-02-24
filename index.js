const { conexion } = require('./database/connection') //importando metodo de conexion 
const express = require('express') //Para el servidor 
const cors = require('cors')
require('dotenv').config()

// Conectando a la bd
conexion();

//Create node server
const app = express();
const port = process.env.API_PORT || 4001

//Configurar cors
app.use(cors());


//Leer y convertir body a objeto js
//Parsear peticiones a objetos de js
app.use(express.json())//para recibir json
app.use(express.urlencoded({extended:true}))//form-url-endoded

//Rutas desde el archivo de routas;
const postRoutes = require('./routes/post');
// const { urlencoded } = require('express');
//Se cargan las rutas
app.use('/api',postRoutes) //se cargan todas las rutas que se tengan en el archivo


//Routas hardcoded ---------------------
// app.get('/', (req, res) => {

//     return res.status(200).send(
//         '<h1> Testing index </h1>'
//     )
// })


//Crear servidor y escuchar peticiones 
app.listen(port, () => {
    console.log("Server running on port " + port);
})
