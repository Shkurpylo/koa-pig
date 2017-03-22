import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

const base = path.resolve(__dirname, '../../templates')
    , cache = new Map();

function resolve(fileName) {
  if (!fileName.startsWith('/')) {
    throw new Error(`invalid template file name: ${fileName}`);
  }
  return base + fileName;
}

export default (fileName, data) => {

  fileName = resolve(fileName);
  var compiled = cache.get(fileName);
  if (!compiled) {
    console.log('compiling template %s', fileName);
    compiled = handlebars.compile(fs.readFileSync(fileName, 'utf8'));
    cache.set(fileName, compiled);
  }
  return compiled(data);
};