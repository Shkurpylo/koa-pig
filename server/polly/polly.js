import AWS from 'aws-sdk';
import path from 'path';

AWS.config.loadFromPath(getConfigPath());

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
});

export default Polly;

function getConfigPath(){
  let configPath = path.join(__dirname, '../../', 'aws_config.json');  // path work on RPI, for ubuntu try (__dirname, '../../', 'aws_config.json')
  return configPath.toString();
}