# koa-pig
koa-pig is JavaScript application, that let you to synthesize voice from text.
Based on Amazon [Polly][awspolly]. Developed to run on ARM processors systems, also can be run on linux.


## Installation

clone repo:

```
$ git clone git@github.com:Shkurpylo/koa-pig.git
$ cd koa-pig
```

install packages with npm :


```
$ npm install -g concurrently
$ npm install -g pm2
$ npm install
```

or with yarn: 


```
$ yarn global add concurrently
$ yarn global add pm2
$ yarn install
```

for better performance recomendated to install mpg123 player:
$ sudo apt-get install mpg123

if you wan't to install mpg123 - set another player in player.json "player" field,
(for example "aplay" - default player on RaspberryPi) 
or set an empty string - in that case will be used omxplayer (default on ubuntu).

!important
set your Amazon [accessKeyId and secretAccessKey][awscredentials] in aws_config.json

## Usage

for run application:

```
$ npm run dev 
```
for run application in background:
```
$ npm run deamon 
```

api runs on port 3005

routes:
GET /voices - get voices list
POST /say - synthesize and play speach from text.

## Built With

* [Amazon Polly](https://aws.amazon.com/polly/?nc2=h_a1) - Turn text into lifelike speech using deep learning
* [Koa](http://koajs.com/) - Expressive middleware for node.js

## Authors

* [Shkurpylo](https://github.com/Shkurpylo)

[awspolly]: https://aws.amazon.com/blogs/aws/polly-text-to-speech-in-47-voices-and-24-languages/
[awscredentials]: https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/

