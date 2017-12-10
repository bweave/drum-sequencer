import Sounds from "./Sounds"

export default class Sequencer {
  constructor() {
    this.audio = new(window.AudioContext || window.webkitAudioContext)()
    this.sounds = new Sounds(this.audio)
    this.buffers = this.sounds.buffers
    this.altBuffers = this.sounds.altBuffers
    this.notesInQueue = []
    this.nextNoteTime = 0.0
    this.lookAhead = 0.1 // seconds
    this.timerWorker = this.setupTimer()
    this.timerWorker.onmessage = this.handleTimerMessage
    this.timerWorker.postMessage({interval: 25.0})
  }

  setupTimer() {
    const swUrl = `${process.env.PUBLIC_URL}/timer-worker.js`
    const timerWorker = new Worker(swUrl)
    return timerWorker
  }

  handleTimerMessage = (e) => {
    if (e.data === "tick") {
      console.log("tick")
      this.schedule()
    } else {
      console.log(e.data)
    }
  }

  play(state) {
    this.tempo = state.tempo
    this.subdivision = state.subdivision
    this.notes = state.notes
    this.currentTick = 0

    this.timerWorker.postMessage("start")
  }

  stop() {
    this.timerWorker.postMessage("stop")
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
    // push the note on the queue, even if we're not playing.
    // this is really only needed for visuals
    // this.notesInQueue.push({ note: beatNumber, time: time })

    // create sources via buffers for currentTick
    console.log(`scheduling notes for ${this.currentTick}`)
    // start them at this.nextNoteTime
  }

  nextTick() {
    // Advance current note and time
    // Notice this picks up the CURRENT tempo value to calculate beat length.
    let secondsPerBeat = 60.0 / this.tempo

    // Add beat length to last beat time
    this.nextNoteTime += (1/this.subdivision) * secondsPerBeat

    // Advance the beat number, wrap to zero
    this.currentTick++
    if (this.currentTick === this.subdivision) {
      this.currentTick = 0
    }
    console.log(`currentTick advanced to: ${this.currentTick}`)
  }
}
