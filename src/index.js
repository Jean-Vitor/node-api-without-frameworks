const http = require('http');
const { URL } = require('url');
const routes = require('./routes')
const bodyParser = require('./helpers/bodyParser')
const PORT = 3001
const URL_ORIGIN = `http://localhost:${PORT}`

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`${URL_ORIGIN}${req.url}`);

  let { pathname } = parsedUrl

  let [name, id] = parsedUrl.pathname.split('/').filter(Boolean)

  if (id) {
    pathname = `/${name}/:id`
  }

  const currentRoute = routes.find(
    (route) => (route.endpoint === pathname && route.method === req.method)
  )

  if (currentRoute) {
    req.query = Object.fromEntries(parsedUrl.searchParams);
    req.params = {id};

    res.send = (statusCode, body) => {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' })
      res.end(JSON.stringify(body))
    }

    const requestHasBody = ['POST', 'PUT', 'PATCH'].includes(req.method);

    if(requestHasBody) {
      bodyParser(req, () => currentRoute.handler(req, res))
    } else {
      currentRoute.handler(req, res)
    }

  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end(`Cannot ${req.method} ${pathname}`)
  }
})

server.listen(3001, () => console.log(`Server foi iniciado em: ${URL_ORIGIN}`))
