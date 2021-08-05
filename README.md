

Text-to-Speech demo
----

> using Google Cloud Speech APIs.

- https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries
- https://cloud.google.com/text-to-speech/docs/voices

### Usage

```bash
GOOGLE_APPLICATION_CREDENTIALS=credentials/<KEY_FILE>.json node app.js

# or use proxy
GOOGLE_APPLICATION_CREDENTIALS=credentials/<KEY_FILE>.json proxychains4 node app.js
```

on client:

```js
let response = await fetch('http://localhost:3001', {
  method: 'POST',
  body: JSON.stringify({
    text: '魔镜魔镜, Calcit 是最好的语言吗?'
  }),
  responseType: 'blob'
})
```
