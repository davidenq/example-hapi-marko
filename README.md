# Basic Example

## How to use example

To view the example, clone the repo and install the dependencies:

```bash
$ git@github.com:davidenq/example-hapi-marko.git
$ cd example-hapi-marko
$ [sudo] npm install
```

## Run the app

```
node index.js
```


## License

MIT Licence


## _Directory structure:_

```
├── hapi-marko/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   ├── js/
│   │   │   ├── img/
│   │   ├── resources/
│   │   │   ├── errors/
│   │   │   │     ├── 404.marko
│   │   │   ├── partials/
│   │   │   │     ├── aside.marko
│   │   │   │     ├── footer.marko
│   │   │   │     ├── header.marko
│   │   │   ├── template/
│   │   │   │     ├── master.marko
│   │   │   ├── index.marko
│   ├── index.js
│   ├── package.json
│   ├── README.md

/public/assets
Web resources that are publicly available (css, js, img, fonts)

/public/resouces
Server and browser-side templates

index.js
Application entry point
```

## Server side rendering

**_index.js_**

```js
const Hapi = require('hapi');

 
 // The following line installs the Node.js require extension
 // for '.marko' files. Once installed, '*.marko' files can be
 // required just like any other JavaScript modules.
 
require('marko/node-require').install();
 
// If true(the default)then compiled templates will be written to disk. If false,
// compiled templates will not be written to disk (i.e., no '.marko.js' file will
// be generated)
require('marko/compiler').defaultOptions.writeToDisk = false;

const server = new Hapi.Server();
server.connection();


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
``` 


**_index.marko_**
``` html
<layout-use template="./template/master.marko" show-header="$true">
    <layout-put into="content">
       <div >${data.message}</div>
       or
       <div >$data.message</div>
    </layout-put>
</layout-use>
``` 

**_master.marko_**
``` html
<!DOCTYPE html>
<html lang="es">
    <head>
    </head>
    <body>
        <div id="layout">
            <aside>
                <include template="../partials/aside.marko"/>
            </aside>
            <section class="section">
                <layout-placeholder name="content" />
            </section>
	    <footer class="footer">
                <include template="../partials/footer.marko"/>
	    </footer>
        </div>
    </body>
</html>
``` 


**_header.marko_**

```html
<div>header content</div>
```


**_aside.marko_**

```html
<div>aside content</div>
```


**_footer.marko_**

```html
<div>footer content</div>
```

### execute

```
node index.js
```

### Open your browser and visit http://localhost:8000
#### gives the following output
```
aside content
hello world!
or
hello world!
footer content
```
