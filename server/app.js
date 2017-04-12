import koa from 'koa';
import koarouter from 'koa-router';
import body from 'koa-better-body';
import cors from 'kcors';
import {
  addToQueue,
  getVoicesList,
  getUniqLanguagesList,
  getSpeakersNameList
} from './polly';
import {winstonLog, fileLog} from './helpers/logger.js';

const app = new koa();
const router = new koarouter();

app
  .use(body())
  .use(cors())
  .use(async (ctx, next) => {
    // x-response-time
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  })
  .use(async (ctx, next) => {
    // logger
    winstonLog(ctx);
    fileLog(ctx);
    await next();
  })
  .use(router.routes())
  .use(router.allowedMethods());

router
  .post('/say', ctx => {
    let body = ctx.request.files || ctx.request.fields;
    let name = body.name || '';
    let text = body.text || '';

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
  .get('/speakers/:id', ctx => {
    return getSpeakersNameList(ctx.params.id)
      .then(voices => {
        ctx.body = voices;
      })
      .catch(err => {
        ctx.body = err;
      });
  })
  .get('/speakers', ctx => {
    return getSpeakersNameList()
      .then(voices => {
        ctx.body = voices;
      })
      .catch(err => {
        ctx.body = err;
      });
  });

app.listen(3005, () => {
  addToQueue('月に代わって、お仕置きよ!', 'Mizuki');
  winstonLog('koa server start listening on port 3005');
});

export default app;
