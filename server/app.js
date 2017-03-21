import koa from 'koa';
import bodyParser from 'koa-body-parser';
import debounce from 'lodash.debounce';
import ivona from './ivona';


const app = new koa();

const debounceIvona = debounce(ivona, 1000);

app.use(bodyParser());

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(ctx => {
  // ctx.body = '';
  let url = ctx.request.url;
  if (url === '/say') {
    console.log(ctx.request.ip + ' send:');
    console.log(ctx.request.body);

    debounceIvona(ctx.request.body);

    ctx.body = 'Little Piggy say: ' + '"' + ctx.request.body + '" \n';
  }
});

app.listen(3005);

export default app;