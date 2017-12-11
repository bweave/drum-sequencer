import Sounds from "./Sounds"

export default class Sequencer {
  constructor() {
    this.audio = new(window.AudioContext || window.webkitAudioContext)()
    this.sounds = new Sounds(this.audio)
    this.buffers = this.sounds.buffers
    this.notesInQueue = []
    this.currentTick = 0
    this.nextNoteTime = 0.0
    this.lookAhead = 0.1 // seconds
    this.timerWorker = new Worker(`${process.env.PUBLIC_URL}/timer-worker.js`)
    this.timerWorker.onmessage = this.handleTimerMessage
    this.timerWorker.postMessage({interval: 25.0})
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
  }

  stop() {
    // TODO: kill all audio sources???
    this.currentTick = 0
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

    const { audio, notes, buffers } = this
    const currentTick = this.currentTick.toString()
    const instruments = Object.keys(buffers)
    instruments.forEach(instrument => {
      const instrumentNotes = Object.keys(notes[instrument])
      if (instrumentNotes.includes(currentTick)) {
        const note = notes[instrument][currentTick]
        const volume = note.volume / 3.0
        const source = audio.createBufferSource()
        const gainNode = audio.createGain()
        gainNode.gain.value = volume
        gainNode.connect(audio.destination)
        source.buffer = buffers[instrument]
        source.connect(gainNode)
        source.start(this.nextNoteTime)
        console.log(`gonna play ${instrument} @ ${currentTick} : ${this.nextNoteTime}`)
      }
    })
  }

  nextTick() {
    // Advance current note and time
    // Notice this picks up the CURRENT tempo value to calculate beat length.
    let secondsPerBeat = 60.0 / this.tempo

    // Add beat length to last beat
    this.nextNoteTime += (1/(this.subdivision / 4)) * secondsPerBeat

    // Advance the beat number, wrap to zero
    this.currentTick++
    if (this.currentTick === this.subdivision) {
      this.currentTick = 0
    }
    console.log(`currentTick advanced to: ${this.currentTick}`)
  }
}
