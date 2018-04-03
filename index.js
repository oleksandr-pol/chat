if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('./config');

const path = require('path');
const fs = require('fs');

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
middlewares
  .forEach(middlewares => require(`./middlewares/${middlewares}`).init(app));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(config.defaults.port, () => {
  console.log(`server is listening, port: ${config.defaults.port}`);
});