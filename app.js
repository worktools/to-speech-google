
const Koa = require('koa');
const cors = require('@koa/cors');
const body = require('koa-body');

const app = new Koa();
app.use(cors());
app.use(body());

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

let enReq = {
  input: {text: "TODO template"},
  // Select the language and SSML voice gender (optional)
  voice: {
    languageCode: 'en-US',
    // https://cloud.google.com/text-to-speech/docs/voices
    name: 'en-US-Wavenet-H',
    ssmlGender: 'FEMALE'
  },
  // select the type of audio encoding
  audioConfig: {
    audioEncoding: 'MP3',
    speakingRate: 1.0,
  },
}

let zhReq = {
  input: {text: "TODO template"},
  // Select the language and SSML voice gender (optional)
  voice: {
    languageCode: 'zh-CN',
    // https://cloud.google.com/text-to-speech/docs/voices
    name: 'cmn-CN-Wavenet-B',
    ssmlGender: 'MALE'
  },
  // select the type of audio encoding
  audioConfig: {
    audioEncoding: 'MP3',
    speakingRate: 1.2,
  },
}

let requestVoice = async (text, lang) => {
  // Construct the request
  const request = lang === 'en' ? {...enReq, input: {text}} : {...zhReq, input: {text}};

  // console.log('sending', request);

  let start = Date.now()

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile('output.mp3', response.audioContent, 'binary');
  console.log(`cost ${Date.now() - start}ms`);
  return response.audioContent
}

app.use(async ctx => {

  let data = ctx.request.body;

  let binaryData = await requestVoice((data.text || '文本内容为空').trim(), data.lang);
  // console.log('binary', binaryData)
  ctx.response.set('content-type', 'audio/mp3');
  ctx.body = binaryData;
});

app.listen(3001);

console.log("Started")
