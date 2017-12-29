export default class Sounds {
  instruments = {
    kick: { offset: 0.06, duration: 0.515 },
    snare: { offset: 0.618, duration: 0.543 },
    rackTom: { offset: 1.228, duration: 1.47 },
    floorTom: { offset: 2.8, duration: 2.351 },
    hiHat: { offset: 11.579, duration: 0.174 },
    // ride: { offset: 5.194, duration: 3.751 },
    // crash: { offset: 9.012, duration: 2.454 },
  }

  constructor(audio) {
    const self = this
    const req = new XMLHttpRequest()
    req.open('GET', "https://s3.amazonaws.com/drum-samples/drum-sprite.mp3", true)
    req.responseType = 'arraybuffer'
    req.onload = () => {
      audio.decodeAudioData(req.response, buffer => self.buffer = buffer)
    }
    req.send()
  }
}
