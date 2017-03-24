import koa from 'koa';
import body from 'koa-better-body';
import debounce from 'lodash.debounce';
import winston from 'winston';
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
  const ms = new Date() - start;
  let fileLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: __dirname + '/logs/' + ctx.request.ip + '.log'})
    ]
  });
  next();

  let speach = ctx.request.body;
  if (!speach){
    speach =  ctx.request.files || ctx.request.fields;
    speach = speach.text;
  }
  fileLogger.log('info', `${speach}`);
  winston.log('info', `${ctx.method} ${ctx.url} - ${ms} text - ${speach}`);
});

app.use(ctx => {
  let url = ctx.request.url;
  if (url === '/say') {
    winston.log(ctx.request.ip + ' send:');
    if (typeof ctx.request.body === 'string') {
      debounceIvona(ctx.request.body);
      ctx.body = 'Little Piggy say: ' + '"' + ctx.request.body + '" \n';
    } else {
      let body = ctx.request.files || ctx.request.fields;
      let name = body.name;
      let text = body.text;

      debounceIvona(text, name);
      ctx.body = 'Little Piggy ' + name + ' say: ' + '"' + text + '" \n';
    }
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
  winston.log('koa server start listening on port 3005');
});

export default app;