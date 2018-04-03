const pug = require('pug');

exports.init = app => app.use(async (ctx, next) => {
  ctx.render = function(tplPath, locals) {
    return pug.renderFile(tplPath, locals);
  }

  await next();
});
