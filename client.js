
let load = async ()=>{
  let response = await fetch('http://localhost:3001', {
    method: 'POST',
    body: JSON.stringify({
      text: '魔镜魔镜, Calcit 是最好的语言吗?'
    }),
    responseType: 'blob'
  })
  let bb = await response.blob()
  // let bb = await (await response.body.getReader()).read()
  // let b = await response.blob()

  console.log(bb)

  let b = new Blob([bb], {type: 'audio/mp3'});

  // console.log(b.toString())
  let url = URL.createObjectURL(b);

  console.log('url', url)


  let audio = new Audio();
  audio.src = url;
  audio.controls = true
  document.body.appendChild(audio)
  // audio.onended = function(evt) {
  //   URL.revokeObjectURL(objectUrl);
  // };

  setTimeout(()=> {
    console.log('trying to play')
    audio.click()
    audio.play()
  }, 1000)
}

// window.onload = () => {
//   setTimeout(()=>{

//   load()
// }, 1000)
// }

document.querySelector('.start').onclick = () => {
  load()
}