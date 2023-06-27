
<!-- markdownlint-disable MD033 -->


<div style="background-color:white; color:black">

<h3 align="center"> <em>Frameworks</em> para el desarrollo completo de aplicaciones web</h3>



<img src="./figuras/UPVcolor300.png" align="left" height="40">
<img src="./figuras/DCOM.png" align="right" height="40">

<img src="./figuras/Teleco.png"       align="left" style="clear:left; padding-top:10px" height="40">

<img src="./figuras/GTDM.png"       align="right" style="clear:right; padding-top: 10px" height="40">

<h1 align="center"><b>Aplicación web con selectores actualizables</b></h1>
<h3 align="center"><b>Práctica 9/Propuesta inicial de trabajo de asignatura</b></h3>


<h4 align="center"><b>F. J. Martínez Zaldívar</b>
</h4>

<h3 align="center">Grado en Tecnología Digital y Multimedia</h3>
<h3 align="center">ETSIT-UPV</h3>

# 1. Introducción y objetivos

Primeramente recordemos que la realización de la presente práctica es completamente voluntaria.

El objetivo de su realización es doble: practicar la interacción entre HTML-CSS-JavaScript-Node.js/Express-MongoDB con una aplicación sencilla que se describirá a continuación y proponer con su ampliación un posible trabajo de asignatura.

Se va a proporcionar código parcialmente funcional siendo el objetivo de la práctica que se finalice el mismo definitivamente. 

Para aquellos alumnos que no tengan pensado ninguna aplicación como trabajo de asignatura, en la que intervengan la mayor parte posible de conceptos impartidos en la misma, la ampliación de los aspectos que el alumno considere oportunos de la presente práctica se podrá considerar como posible trabajo a entregar.


## 1.1. Clonación de repositorio

Tras clonar el repositorio con la instrucción

```bash
$ git clone <REPO> <DIR>
```

Se debe obtener bajo el directorio local una estructura de ficheros y directorios como la que sigue:

```text
├── README.md
├── figuras
└── servidor
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.png
    │   └── index.html
    └── servidor.js
```

En la carpeta `servidor` se halla todo lo necesario para desplegar un servidor de consulta a una base de datos cinematográfica en la URL `http://localhosts:3000/index.html`. Para que todo sea operativo, recuérdese, primero instalar los módulos necesarios y después arrancar el servidor:

```bash
$ cd servidor
$ npm install
$ npm start
```

Con esto se disponen de servicios parcialmente implementados que habrá que completar

## 1.2. Situación de partida y objetivo parcial

En la aplicación web (`http://localhost:3000/index.html`) habrá un cajetín de entrada de texto (dedicado a introducir el nombre o partes del nombre de un director de cine) con un _datalist_ con elementos `<option>` que sugieran posibles nombres completos de directores a partir de los caracteres que ya hayamos introducido en el citado cajetín del nombre del director. Los nombres completos de los directores que encajen con la expresión regular `/<NOMBRE_PARCIAL>/i`, siendo `<NOMBRE_PARCIAL>` algunos de los caracteres incluidos en el nombre del director (con independiencia de si son en mayúscula o minúscula), se emplearán como elementos `<option>` del _datalist_ asociado. Así por ejemplo

<div id="fig:peli1">
<p align="center"><br/>
<img src="figuras/peli1.svg" width="400" >
</p>
<p align="center"><b>Figura 1</b>: situación inicial con la escritura de algunos caracteres del nombre del director y aparición de propuestas en el <em>datalist</em></p><br/>
</div>



Una vez elegido el director del _datalist_ se muestra el mismo en el cajetín del nombre y se visualiza la primera de las películas recibidas, así como su cartel.

<div id="fig:peli2">
<p align="center"><br/>
<img src="figuras/peli2.svg" width="400" >
</p>
<p align="center"><b>Figura 2</b>: situación tras selección de opción dentro del <em>datalist</em>, con la aparición del primer título de película y su cartel</p><br/>
</div>



Clicando sobre el selector de películas podemos elegir una alternativa (si existe) actualizándose el cartel.

<div id="fig:peli3">
<p align="center"><br/>
<img src="figuras/peli3.svg" width="800" >
</p>
<p align="center"><b>Figura 3</b>: cambio de película</p><br/>
</div>


La plantilla entregada con una solución (parcial) no contempla toda la funcionalidad comentada en los párrafos anteriores, teniendo, por tanto, que completarla como objetivo de realización de la práctica, así como punto de partida inicial para el posible trabajo de asignatura (En el código aparecerá oportunamente indicado dónde llevar a cabo la finalización del mismo).


Recuérdese que en esta práctica intervienen tres entidades: 
- El _front-end_ con una sencilla página web en la que aparecen un par de selectores y una imagen. En la solución parcial proporcionada se debe completar la función `async function pedir_peliculas(director)`  dentro del fichero `servidor/public/index.html`, para que cumpla definitivamente su cometido.

- El _back-end_ en el que tenemos a Express bajo la batuta de Node.js sirviendo las páginas web y proporcionando los servicios que estas demandan. Aquí queda pendiente de implementación la función `async function getPeliculas(client, director)` dentro del fichero `servidor/servidor.js`.

- Asimismo está en contacto con una base de datos ubicada en la nube, concretamente de tipo MongoDB alojada en la plataforma Atlas y que será la misma que se empleó en la práctica anterior: `sample_mflix` con la colección `movies`. Para acceder a ella ya se ha proporcionado en la solución parcial la parte de código necesaria. 
> **IMPORTANTE**: para que no aparezcan explícitamente el nombre del usuario y sobre todo la clave de acceso a la base de datos en Atlas, se ha empleado el paquete `dotenv` de Node.js que permite leer estos variables desde el conjunto de  _variables de entorno_ o desde ficheros, como es el caso. Debe editarse el fichero `.env` ubicado en la raíz del servidor para proporcionar ambos valores, además del identificativo del servidor de Atlas.
  

El contexto y la comparación con otras partes de la solución proporcionada dará suficientes pistas para conseguir completar el código y que este sea perfectamente operativo.


El correcto diseño de las dos funciones indicadas deberían dar lugar a obtener ya una versión operativa con las características mostradas anteriormente, con lo que se habría finalizado la presente práctica.


# 2. Propuesta de trabajo de asignatura

El tema del trabajo de la asignatura es completamente libre, con la única condición de tratar de abarcar cuanta más temática impartida en la asignatura, mejor.

Para aquellos alumnos que no se les ocurra ninguna aplicación en particular, pueden ampliar la presente práctica con las siguientes posibles mejoras o ampliaciones:

- Mejorar la estética: no hay ningún problema en emplear plantillas diseñadas por terceros, con la única condición de citar de manera honesta el origen de las mismas y siempre y cuando sea algo legalmente permitido.

- Ampliar la información proporcionada: añadir reparto, guionistas, enlaces a otras webs como IMDB, enlaces a otras bases de datos, rankings, ...

- Ampliar la selectividad: si se muestra el reparto, al clicar en un actor, que aparezcan o sean seleccionables, de alguna manera, las películas en las que ha intervenido (extensible a guionistas, ...)

- Y un largo etcétera que se le ocurran al equipo de trabajo.

Hay que decir que no es necesario que el trabajo sea algo sobredimensionado y descomunal: un trabajo modesto y bien resuelto tendrá una muy buena calificación sin necesidad de que sea algo espectacular: la intención es simplemente mostrar y demostrar que se han adquirido mínimamente los conceptos que se han ido cubriendo en la asignatura a lo largo del cuatrimestre.

Hay que insistir en que no hay ningún problema, sino todo lo contrario, en utilizar plantillas o partes de software de terceros siempre y cuando sea algo legal y sea referenciado.

> **IMPORTANTE**: independientemente de que se elija como trabajo la ampliación de la presente práctica o cualquier otra temática, el repositorio del trabajo de asignatura será otro completamente distinto a este. Téngase en cuenta para, si se elige la alternativa de ampliar la presente práctica como trabajo de asignatura, NO UTILIZAR el presente repositorio como repositorio del trabajo de asignatura.



# 5. Resultados 

Súbase a GitHub el resultado de completar todo el código exigido en los apartados anteriores. 




  
</div>