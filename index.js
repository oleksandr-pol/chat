if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const config = require('./config/defaults');
const cors = require('@koa/cors');

const Controller = require('./controller.js');
const controller = Controller();

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

app.use(bodyParser());
app.use(cors());

router.get('/', controller.read);
router.get('/tasks', controller.read);
router.post('/newTask', controller.wright);
router.put('/updateTask/:id', controller.update);
router.delete('/removeTask/:id', controller.remove);

app.use(router.routes());

app.listen(config.port, () => {
  console.log(`server is listening on ${config.port} port`);
});