import Alumno from "./models/alumno.js"

import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"

import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js" 

import express  from "express"; 

import cors     from "cors";   

const app  = express();

const port = 3000;              // El puerto 3000 (http://localhost:3000)


app.use(cors());         

app.use(express.json()); 

// ENDPOINTS COMUNES
app.get('/saludar/:nombre', (req, res) => {             // EndPoint "/saludar"
    const nombre =req.params.nombre; 
    res.status(200).send(`Hola  ${nombre}`);

}) 
app.get('/validarfecha/:anio/:mes/:dia', (req, res) => {             // EndPoint "/saludar"
    const anio =req.params.anio;  
    const mes =req.params.mes;  
    const dia =req.params.dia;  
    var fechaIng = new Date(anio, mes, dia);  
    if(Number.isNaN(Date.parse(fechaIng))) 
    {
        res.status(400).send(`Fecha Invalida`); 
    } 
    else 
    {      
        res.status(200).send(`Fecha Valida`)

    }
   

})   

// ENDPOINTS MATEMATICA 

app.get('/matematica/sumar', (req, res) => {             
   
    const n1 =parseInt(req.query.n1); 
    const n2 =parseInt(req.query.n2); 
    const resultado = sumar(n1, n2);
    res.status(200).send({ resultado });

})  
app.get('/matematica/restar', (req, res) => {             
   
    const n1 =parseInt(req.query.n1); 
    const n2 =parseInt(req.query.n2); 
    const resultado = restar(n1, n2);
    res.status(200).send({ resultado });

})  
app.get('/matematica/multiplicar', (req, res) => {             
   
    const n1 =parseInt(req.query.n1); 
    const n2 =parseInt(req.query.n2); 
    const resultado = multiplicar(n1, n2);
    res.status(200).send({ resultado });

})  
app.get('/matematica/dividir', (req, res) => {             
   
    const n1 =parseInt(req.query.n1); 
    const n2 =parseInt(req.query.n2); 
    
    if(n2 == 0)
    {
        res.status(400).send(`El divisor no puede ser 0`);
    } 
    else 
    {
        const resultado = dividir(n1, n2); 
        res.status(200).send({ resultado });
    }
    

})  

// ENDPOINTS OMBD  

// ENDPOINTS ALUMNOS 
const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido"  , "22888444", 20));

alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));

alumnosArray.push(new Alumno("Elba Calao"    , "32623391", 18)); 

app.get('/alumnos', (req, res) => {

    res.status(200).json(alumnosArray);
  });
  app.get('/alumnos/:dni', (req, res) => {
    const dniBuscado = req.params.dni;
    const alumnoEncontrado = alumnosArray.find(alumno => alumno.dni === dniBuscado);
  
    if (alumnoEncontrado) {
      res.status(200).json(alumnoEncontrado);
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  }); 
  app.use(express.json());
  app.post('/alumnos', (req, res) => {                // EndPoint "/"

    const { username, dni, edad } = req.body; 
    if (!username || !dni || !edad) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
    
      const nuevoAlumno = new Alumno(username, dni, edad);
      alumnosArray.push(nuevoAlumno);
    
      res.status(201).json(nuevoAlumno);


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