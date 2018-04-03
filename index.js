if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('./config/defaults');

const path = require('path');
const fs = require('fs');

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e.status) {
      ctx.body = e.message;
      ctx.status = e.status;
    } else {
      ctx.body = 'Server Error';
      ctx.status = 500;
      console.error(e.message, e.stack);
    }
  }
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(config.port, () => {
  console.log(`server is listening on ${config.port} port`);
});