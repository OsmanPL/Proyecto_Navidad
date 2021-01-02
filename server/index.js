
const loginRouter = require('./routes/login.route.js')

//Hijo
const hijoBuenasAccionesRouter = require('./routes/routesHijo/buenasAcciones.route')
const hijoCartaRouter = require('./routes/routesHijo/carta.route')
const hijoPublicacionRouter = require('./routes/routesHijo/publicacion.route')
const hijoConversacionRouter = require('./routes/routesHijo/conversacion.route')
const hijoJuguetesRouter = require('./routes/routesHijo/juguetes.route')
const hijoDeseoRouter = require('./routes/routesHijo/deseo.route')
const recuperarHijo = require('./routes/routesHijo/recuperarHijo.route')

//Admin
const adminBuenasAcciones = require('./routes/routesAdmin/buenasAccione.route')
const adminProducto = require('./routes/routesAdmin/producto.route')
const adminPerfilSanta = require('./routes/routesAdmin/perfilSanta.route')
const adminPerfilPadre = require('./routes/routesAdmin/perfilPadre.route')
const adminPerfilHijo = require('./routes/routesAdmin/perfilHijo.route')
const adminConversacion = require('./routes/routesAdmin/conversacion.route')
const adminReportes1 = require('./routes/routesAdmin/reportes1.route')
const adminReportes2 = require('./routes/routesAdmin/reportes2.route')

//Padre
const padreBuenasAcciones = require('./routes/routesPadre/buenasAcciones.route')
const padreCarta = require('./routes/routesPadre/carta.route')
const padreHijo = require('./routes/routesPadre/perfilHijo.route')
const recuperarpadre = require('./routes/routesPadre/recuperarPadre.route')

//Santa
const santaPublicaciones = require('./routes/routesSanta/publicaciones.router')
const santaCarta = require('./routes/routesSanta/carta.route')

var express = require('express');
const bodyParser = require('body-parser');

var app = express();
const cors = require('cors')
const port = 3000

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use("/login", loginRouter)

//Hijo
app.use("/hijoBuenasAcciones", hijoBuenasAccionesRouter)
app.use("/hijoCarta", hijoCartaRouter)
app.use("/hijoPublicacion",hijoPublicacionRouter)
app.use("/hijoConversacion", hijoConversacionRouter)
app.use("/hijoJuguetes", hijoJuguetesRouter)
app.use("/hijoDeseo", hijoDeseoRouter)
app.use("/recuperarHijo",recuperarHijo)

//Admin
app.use("/adminBuenasAcciones",adminBuenasAcciones)
app.use("/adminProducto",adminProducto)
app.use("/adminPerfilSanta",adminPerfilSanta)
app.use("/adminPerfilPadre",adminPerfilPadre)
app.use("/adminPerfilHijo",adminPerfilHijo)
app.use("/adminConversacion",adminConversacion)
app.use("/reportes1",adminReportes1)
app.use("/reportes2",adminReportes2)

//Padre
app.use("/padreBuenasAcciones",padreBuenasAcciones)
app.use("/padreCartas",padreCarta)
app.use("/padreHijo",padreHijo)
app.use("/recuperarPadre",recuperarpadre)

//Santa
app.use("/santaPublicaciones",santaPublicaciones)
app.use("/santaCarta",santaCarta)

app.listen(port, function () {
  console.log('Listening on port',port);
});