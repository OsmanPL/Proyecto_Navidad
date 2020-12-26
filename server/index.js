
const loginRouter = require('./routes/login.route.js')
const hijoBuenasAccionesRouter = require('./routes/routesHijo/buenasAcciones.route')
const hijoCartaRouter = require('./routes/routesHijo/carta.route')

var express = require('express');
const bodyParser = require('body-parser');

var app = express();
const cors = require('cors')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use("/login", loginRouter)
app.use("/hijoBuenasAcciones", hijoBuenasAccionesRouter)
app.use("/hijoCarta", hijoCartaRouter)


app.listen(port, function () {
  console.log('Listening on port',port);
});