export default class Sounds {
  sounds = {
    kick: "https://s3.amazonaws.com/drum-samples/kick.mp3",
    snare: "https://s3.amazonaws.com/drum-samples/snare.mp3",
    hiHat: "https://s3.amazonaws.com/drum-samples/hihat.mp3",
    rackTom: "https://s3.amazonaws.com/drum-samples/rack-tom.mp3",
    floorTom: "https://s3.amazonaws.com/drum-samples/floor-tom.mp3",
  }

  constructor(audio) {
    this.audio = audio
    this.loadSamples(this.sounds)
  }

  buffers = {}

  loadSamples(sounds) {
    const self = this
    for (const sound in sounds) {
      const req = new XMLHttpRequest()
      req.open('GET', sounds[sound], true)
      req.responseType = 'arraybuffer'
      req.onload = () => {
        self.audio.decodeAudioData(req.response, buffer => self.buffers[sound] = buffer)
      }
      req.send()
    }
  }
}
