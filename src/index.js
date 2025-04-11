import Alumno from "./models/alumno.js"

import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"

import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js" 

import express  from "express"; 

import cors     from "cors";   

const app  = express();

const port = 3000;              // El puerto 3000 (http://localhost:3000)


app.use(cors());         

app.use(express.json()); 


app.get('/saludar/:nombre', (req, res) => {             // EndPoint "/saludar"
    const nombre =req.params.nombre; 
    res.status(200).send(`Hola  ${nombre}`);

}) 
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {             // EndPoint "/saludar"
    const ano =req.params.ano;  
    const mes =req.params.mes;  
    const dia =req.params.dia; 
   res.status(200)

})

app.get('/', (req, res) => {                // EndPoint "/"

    res.status(200).send('Ya estoy respondiendo!');

})


app.get('/saludar', (req, res) => {             // EndPoint "/saludar"

    res.send('Hello World!');

})

 

//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})