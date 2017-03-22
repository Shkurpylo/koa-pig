import koa from 'koa';
import body from 'koa-better-body';
import debounce from 'lodash.debounce';
import {
  say,
  getVoicesList
} from './ivona';

const app = new koa();

const debounceIvona = debounce(say, 1000);

app.use(body());

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(ctx => {
  let url = ctx.request.url;
  if (url === '/say') {

    if (typeof ctx.request.body === 'string') {
      debounceIvona(ctx.request.body);
    } else {
      let body = ctx.request.files || ctx.request.fields;
      let name = body.name;
      let text = body.text;

      debounceIvona(text, name);
 
    }
    ctx.body = 'Little Piggy say: ' + '"' + ctx.request.body + '" \n';
  } else if (url === '/voices') {
    return getVoicesList()
      .then(voices => {
        ctx.body = voices;
      })
      .catch(err => {
        ctx.body = err;
      });

  }

});

app.listen(3005, () => {
  debounceIvona('oink oink Ich bin bereit', 'Marlene');
  console.log('koa server start listening on port 3005');
});

export default app;