const express = require('express');
const rutas = require('./rutas');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('./config/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: 'variables.env'});

//Crear la conexion a la base de datos
const db = require('./config/database');

//Importar el modelo para la creacion de las tablas en la base de datos
    require('./models/Proyectos');
    require('./models/Tareas');
    require('./models/Usuarios');
    

db.sync().then(()=> console.log("Conectado a la base de datos :)"))
    .catch(err => console.log(err));



//crear aplicacion de express
const app = express();


//Habilitar Pug
app.set('view engine', 'pug');

//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar connect flash para los errores
app.use(flash());

app.use(cookieParser());

//Agregar express-session para que la sesion quede abierta en el navegador
app.use(session({
    secret: 'SECRETO',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());




//Habilitar bodyParser para poder leer datos de un formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', rutas());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 7000;

app.listen(port, host, ()=>{
    console.log("El puerto esta funcionando");
});