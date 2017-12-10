export default function registerTimerWorker() {
  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/timer-worker.js`
    window.timerWorker = new Worker(swUrl)
    window.timerWorker.onmessage = (e) => {
      if (e.data === "tick") {
        console.log("tick")
        // TODO: schedule notes
      } else {
        console.log(e.data)
      }
    }
    window.timerWorker.postMessage({interval: 25.0})
  })
}
