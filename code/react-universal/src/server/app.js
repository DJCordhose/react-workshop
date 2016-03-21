import Hapi from 'hapi';
import { renderToString } from 'react-dom/server';
import React from 'react';
import HelloMessage from '../common/HelloMessage';

const server = new Hapi.Server();
server.connection({
    port: 3000,
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: `${__dirname}/../../public`
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        const greeting = 'Hello';
        const html = renderToString(<HelloMessage greeting={greeting}/>);
        const fullPage = renderFullPage(html, greeting);
        const response = reply(fullPage);
        response.type('text/html');
    }
});

server.start(() => console.log(`Server running at: ${server.info.uri}`));

function renderFullPage(html, initialData) {
    return `<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
    <title>react.js Hello World!</title>
<script>
  window.__INITIAL_STATE__ = ${JSON.stringify(initialData)};
</script>
  </head>

  <body>
    <div id="mount">${html}</div>
  </body>

  <script type="text/javascript"
          src="/dist/main.js">
  </script>
</html>`;
}