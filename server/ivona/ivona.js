import Ivona from 'ivona-node';
import conf from '../../config.json';

const ivona = new Ivona({
  accessKey: conf.credentials.accessKey,
  secretKey: conf.credentials.secretKey,
});

export default ivona;