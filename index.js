const Hapi = require('hapi');

/** 
 * The following line installs the Node.js require extension
 * for `.marko` files. Once installed, `*.marko` files can be
 * required just like any other JavaScript modules. 
 */
require('marko/node-require').install();
/**
  * If true(the default)then compiled templates will be written to disk. If false,
  * compiled templates will not be written to disk (i.e., no `.marko.js` file will
  * be generated)
  */
require('marko/compiler').defaultOptions.writeToDisk = false;

const server = new Hapi.Server();
server.connection({
    port: 8000
});


/**
 * Load template
 */

const index = require('./public/resources/index.marko');

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        
        index.render({'message': 'hello world!'}, reply);
    }
});

server.start( () => {
    console.log('Running at:' + server.info.uri);
});