import koa from 'koa';
import koarouter from 'koa-router';
import body from 'koa-better-body';
import winston from 'winston';
import cors from 'kcors';
import {
  addToQueue,
  getVoicesList,
  getUniqLanguagesList,
  getSpeakersNameList
} from './polly';

const app = new koa();
const router = new koarouter();

app
  .use(body())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  const ms = new Date() - start;
  let fileLogger = new(winston.Logger)({
    transports: [
      new(winston.transports.File)({
        filename: __dirname + '/logs/' + ctx.request.ip + '.log'
      })
    ]
  });

  let speach = ctx.request.body;
  if (!speach) {
    speach = ctx.request.files || ctx.request.fields;
    speach = speach ? speach.text : '';
  }
  fileLogger.log('info', `${speach}`);
  winston.log('info', `${ctx.method} ${ctx.url} - ${ms} text - ${speach}`);
  return next();
});

router
  .post('/say', ctx => {
    winston.log(ctx.request.ip + ' send:');
    let text = '';
    let name = '';

    if (typeof ctx.request.body === 'string' && ctx.request.body.length > 0) {
      text = ctx.body;
    } else {
      let body = ctx.request.files || ctx.request.fields;
      name = body.name || '';
      text = body.text || '';
    }

    if (text.length > 0) {
      addToQueue(text, name)
        .catch(err => {
          ctx.body = err;
        });
      ctx.body = 'Little Piggy ' + name + ' say: ' + '"' + text + '" \n';
    } else {
      ctx.body = 'text is empty';
    }

  })
  .get('/voices', ctx => {
    return getVoicesList()
      .then(voices => {
        ctx.body = voices;
      })
      .catch(err => {
        ctx.body = err;
      });
  })
  .get('/languages', ctx => {
    return getUniqLanguagesList()
      .then(voices => {
        ctx.body = voices;
      })
      .catch(err => {
        ctx.body = err;
      });
  })
  .get('/speakers/', ctx => {
    return getSpeakersNameList()
      .then(voices => {
        ctx.body = voices;
      })
      .catch(err => {
        ctx.body = err;
      });
  })
  .get('/speakers/:id', ctx => {

    console.log(ctx.params.id);

    return getSpeakersNameList(ctx.params.id)
      .then(voices => {
        ctx.body = voices;
      })
      .catch(err => {
        ctx.body = err;
      });
  });

app.listen(3005, () => {
  addToQueue('月に代わって、お仕置きよ!', 'Mizuki');
  winston.log('koa server start listening on port 3005');
});

export default app;
