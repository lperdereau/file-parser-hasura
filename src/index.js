const Hapi = require('hapi')
const routes_address = require('./address/routes')
const routes_light = require('./light/routes')


const server = new Hapi.Server({ port: 3000 });


server.route(routes_address.csv);
server.route(routes_light.csv)

async function startServer() {
  await server.start(); // start the Hapi server on your localhost
  console.log('Now Visit: http://localhost:' + server.info.port);
}

startServer();