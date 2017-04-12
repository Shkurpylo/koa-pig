import winston from 'winston';
import path from 'path';
import fs from 'fs';


export function fileLog(ctx) {
  let filePath = getPath(ctx.request.ip);
  let speach = getSpeachFromCtx(ctx);

  let fileLogger = new(winston.Logger)({
    transports: [
      new(winston.transports.File)({
        filename: filePath
      })
    ]
  });
  fileLogger.log('info', `${speach}`);
}

export function winstonLog(ctx){
  let speach = getSpeachFromCtx(ctx);  
  winston.log('info', `${ctx.method} ${ctx.url} - text - ${speach}`);
}


function getSpeachFromCtx(ctx) {
  let speach = ctx.request.body;
  if (!speach) {
    speach = ctx.request.files || ctx.request.fields;
    speach = speach ? speach.text : '';
  }
  return speach;
}

function getPath(ip) {
  let dir = path.join(__dirname, '../', '/logs/');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return `${dir}${ip}.log`;
}
