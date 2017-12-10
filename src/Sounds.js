export default class Sounds {
  sounds = {
    kick: "https://s3.amazonaws.com/drum-samples/kick.mp3",
    snare: "https://s3.amazonaws.com/drum-samples/snare.mp3",
    hiHat: "https://s3.amazonaws.com/drum-samples/hihat.mp3",
    rackTom: "https://s3.amazonaws.com/drum-samples/rack-tom.mp3",
    floorTom: "https://s3.amazonaws.com/drum-samples/floor-tom.mp3",
  };

  altSounds = {
    snareGhost: "https://s3.amazonaws.com/drum-samples/snare-ghost.mp3",
  };

  constructor(audio) {
    this.audio = audio
    this.loadSamples(this.sounds)
    this.loadSamples(this.altSounds, true)
  }

  buffers = {};
  altBuffers = {};

  loadSamples(sounds, isAlt = false) {
    const self = this
    const bufferName = isAlt ? "altBuffers" : "buffers"
    for (const sound in sounds) {
      const req = new XMLHttpRequest()
      req.open('GET', sounds[sound], true)
      req.responseType = 'arraybuffer'
      req.onload = () => {
        self.audio.decodeAudioData(req.response, buffer => self[bufferName][sound] = buffer)
      }
      req.send()
    }
  }
}
