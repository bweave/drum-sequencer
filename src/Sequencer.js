import Sounds from "./Sounds"

export default class Sequencer {
  audio = new(window.AudioContext || window.webkitAudioContext)()
  sounds = new Sounds(this.audio)
  // buffers = this.sounds.buffers
  sources = []
  notesInQueue = []
  currentTiming = "1.1.1"
  nextNoteTime = 0.0
  lookAhead = 0.1 // seconds
  timerWorker = new Worker(`${process.env.PUBLIC_URL}/timer-worker.js`)

  constructor() {
    this.timerWorker.onmessage = this.handleTimerMessage
    this.audio.suspend()
  }

  handleTimerMessage = (e) => {
    if (e.data === "tick") {
      this.schedule()
    } else {
      console.log(e.data)
    }
  }

  play(state) {
    this.tempo = state.tempo
    this.subdivision = state.subdivision
    this.notes = state.notes
    if (this.audio.state === "suspended") {
      this.audio.resume()
    }
  }

  stop() {
    this.audio.suspend()
    this.nextNoteTime = this.audio.currentTime
    this.currentTiming = "1.1.1"
    this.sources.forEach(source => source.stop())
  }

  schedule() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audio.currentTime + this.lookAhead ) {
      this.scheduleNotes()
      this.nextTick()
    }
  }

  scheduleNotes() {
    // const instruments = Object.keys(this.buffers)
    // TODO: need to account for ride and crash in a cleaner way
    // b/c right now notes and sounds are tightly coupled.
    const instruments = Object.keys(this.sounds.instruments)
    instruments.forEach(instrument => {
      this.notes[instrument]
        .filter(note => note.timing === this.currentTiming)
        .forEach(note => this.createSound(instrument, note), this)
    }, this)
  }

  createSound(instrument, note) {
    const offset = this.sounds.instruments[instrument].offset
    const duration = this.sounds.instruments[instrument].duration
    const vol = this.calculateVol(note.vol)
    const source = this.createSource(vol)
    source.start(this.nextNoteTime, offset, duration)
    this.sources.push(source)
  }

  createSource(vol) {
    const source = this.audio.createBufferSource()
    source.buffer = this.sounds.buffer
    source.connect(this.createGain(vol))
    return source
  }

  createGain(vol) {
    const gainNode = this.audio.createGain()
    gainNode.gain.setTargetAtTime(vol, this.nextNoteTime, 0)
    gainNode.connect(this.audio.destination)
    return gainNode
  }

  calculateVol(vol) {
    switch(vol) {
      case 2:
        vol = 1
        break
      case 1:
        vol = 0.2
        break
      default:
        vol = 0
        break
    }
    return vol
  }

  nextTick() {
    // Advance current note and time
    // Notice this picks up the CURRENT tempo value to calculate beat length.
    const secondsPerBeat = 60.0 / this.tempo //=> 60 / 120 = 0.5
    const ticksPerBeat = this.subdivision / 4 //=> ticksPerBeat: e.g. 8 / 4 = 2
    this.nextNoteTime += 1 / ticksPerBeat * secondsPerBeat //=> 1/2 * 0.5 = 0.25 seconds

    const maxTick = this.subdivision / 4
    this.currentTiming = this.currentTiming.replace(/^(\d).(\d).(\d)$/, (_, bar, beat, tick) => {
      tick = (tick < maxTick) ? parseInt(tick, 10) + 1 : 1
      if (tick === 1) {
        beat = (beat < 4) ? parseInt(beat, 10) + 1 : 1
      }
      return `${bar}.${beat}.${tick}`
    })
  }
}
