const express = require('express');
const app = express();
const fileServerMiddleware = express.static('servidor/public');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const MAX_DIRECTORES = 25; // maximo número de respuestas de base de datos
const MAX_PELICULAS  = 10;

require('dotenv').config();
const USUARIO = process.env.USUARIO_BD;
const CLAVE   = process.env.CLAVE_BD;
const SERVIDOR = process.env.SERVIDOR_BD;

console.log("USUARIO", USUARIO);
console.log("CLAVE", CLAVE);
console.log("SERVIDOR", SERVIDOR);
 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://" + USUARIO + ":" + CLAVE + "@" + SERVIDOR + "?retryWrites=true&w=majority";



// Creación del cliente mongoDB con opciones.
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// Ruta y query para la búsqueda de directores: /directores?nombre_incompleto=...
app.get('/directores', async (req, res)=> {
  console.log("URL:", req.url, "Query: ", req.query)
  let results   = await getDirectores(client, req.query.nombre_incompleto);
  res.json( { directores: results.dirs } ); 
})

// Ruta y query para la búsqueda de películas de un director
app.get('/peliculas', async (req, res) => {
  console.log("URL:", req.url, "Query: ", req.query)
  let peliculas = await getPeliculas(client, req.query.director);
  console.log("peliculas de ", req.query.director, ": ", peliculas)
  res.json( { pelis: peliculas } );
})

// servicio estático desde public 
app.use('/', fileServerMiddleware);   

app.listen(function () {
  console.log('App escuchando en el puerto 3000');
});



// Funciones de peticion de info a MongoDB



// getDirectores:
// - client: cliente MongoDB
// - regexp_nombre: expresión regular para búsqueda de director en forma de regex /<regexp_nombre>/i
async function getDirectores(client, regexp_nombre) {

  const re = new RegExp(`${regexp_nombre}`, "i"); //  exp. reg.  /<regexp_nombre>/i
  console.log("expresión regular: ", re);
  
  let resultados = await client.connect().then( (conexion) => {
            return conexion.db("sample_mflix")
                        .collection("movies")
                        .find({ directors: {$elemMatch: {$regex: re}}})
                        .project({_id:0, directors:1})
                        .toArray();
          });
  let directores=[];
  resultados.forEach( (peli) => { 
          peli.directors.forEach( (dir) => { 
              // como directores es un array, se pasa el "test" a todos los elementos del 
              // mismo y solo se añade, directores.push(dir), si cumple con la expresión regular 
              // del nombre: re.test(dir), siempre y cuando no esté incluido ya: !directores.includes(dir)
              if ( re.test(dir) && !directores.includes(dir)) {
                directores.push(dir);       
              }
            }); 
        }); 

  console.log("resultados: directores ("+directores.length+"), regex: ["+regexp_nombre+"]: ", directores);      
  const res = { dirs: directores.sort().slice(0,MAX_DIRECTORES)}      
  console.log("resultados: dirs ("+res.dirs.length+"), regex: ["+regexp_nombre+"]: ", res);
  return res;

}


/************************************************************ */
// Devuelve las películas de cierto director
// - cliente: cliente MongoDB
// - director: nombre  del director
async function getPeliculas(client, director) {

  /******** CODIGO A DESARROLLAR *************/


  const re = new RegExp(director, "i"); //  exp. reg.  /<regexp_nombre>/i
  
  let pelis = await client.connect().then( (conexion) => {
            return conexion.db("sample_mflix")
                        .collection("movies")
                        .find({ directors: {$elemMatch: {$regex: re}}})
                        .project({_id:0, title:1, poster:1, plot:1, imdb:1, tomatoes:1, released:1, genres:1, cast:1})
                        .toArray();
          });
  
//console.log(pelis);
          /* let peliculas=[];
          pelis.forEach( (peli) => { 
                  peli.title.forEach( (dir) => { 
                      // como directores es un array, se pasa el "test" a todos los elementos del 
                      // mismo y solo se añade, directores.push(dir), si cumple con la expresión regular 
                      // del nombre: re.test(dir), siempre y cuando no esté incluido ya: !directores.includes(dir)
                      if ( re.test(dir) && !directores.includes(dir)) {
                        peliculas.push(dir);       
                      }
                    }); 
                });  */



              /*   let peliculas=[];

                peliculas = pelis.map(peli => peli.title);
                console.log(peliculas); */

               




 // console.log("resultados: peliculas ("+peliculas.length+ peliculas);      
  const res = { pelis: pelis.sort().slice(0,MAX_PELICULAS)}      
  console.log("resultados: pelis ("+res.pelis.length+ res);
  return res;

}
/************************************************************* */


