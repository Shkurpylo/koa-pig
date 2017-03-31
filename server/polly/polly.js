import AWS from 'aws-sdk';
import path from 'path';
import conf from '../../config.json';

AWS.config.loadFromPath(getConfigPath());

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: conf.credentials.region || 'us-east-1',
});

export default Polly;

function getConfigPath(){
  let configPath = path.join(__dirname, '../..', 'config.json');

  return configPath.toString();
}