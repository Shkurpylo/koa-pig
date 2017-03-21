const koa = require('koa');
const app = new koa();

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(ctx => {
  ctx.body = 'Hello im koa';
});

app.listen(3005);