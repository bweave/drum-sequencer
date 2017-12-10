import Sounds from "./Sounds"

export default class Sequencer {
  audio = new(window.AudioContext || window.webkitAudioContext)()
  sounds = new Sounds(this.audio)
  buffers = this.sounds.buffers
  altBuffers = this.sounds.altBuffers
  sources = []

  play(state) {
    const {
      tempo,
      subdivision,
      notes,
    } = state

    this.sources = []
    this.setInterval(tempo, subdivision)
    this.subdivision = subdivision
    this.notes = notes
    this.lastTime = new Date().getTime()
    this.currentTick = 0
    this.lastTick = subdivision - 1

    // TODO: scheduling notes this way is ok, but not great
    // https://www.html5rocks.com/en/tutorials/audio/scheduling/

    window.animationId = requestAnimationFrame(this.loop.bind(this))
  }

  loop() {
    const self = this
    const currentTime = new Date().getTime()
    if (currentTime - self.lastTime >= self.interval) {
      const instruments = Object.keys(self.buffers)

      instruments.forEach(instrument => {
        // TODO: this code is eww
        if (Object.keys(self.notes[instrument]).includes(self.currentTick.toString())) {
          const source = self.audio.createBufferSource()
          if (self.notes[instrument][self.currentTick.toString()].volume === 1) {
            const gainNode = self.audio.createGain()
            gainNode.gain.value = 0.25 // 10 %
            gainNode.connect(self.audio.destination)
            source.buffer = self.buffers[instrument]
            source.connect(gainNode)
          } else {
            source.buffer = self.buffers[instrument]
            source.connect(self.audio.destination)
          }
          source.start()
          self.sources.push(source)
        }
      })

      self.lastTick = self.currentTick
      self.currentTick = (self.currentTick + 1) % self.subdivision
      self.lastTime = currentTime
    }

    window.animationId = requestAnimationFrame(self.loop.bind(this))
  }

  stop() {
    cancelAnimationFrame(window.animationId)
    this.sources.forEach(source => source.stop(0))
  }

  setInterval(tempo, subdivision) {
    this.interval = 1 / ((subdivision/4) * tempo / 60000)
  }
}
