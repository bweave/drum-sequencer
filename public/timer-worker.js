let timerID = null
let interval = 100

self.onmessage = (e) => {
  if (e.data.interval) {
    interval = e.data.interval
    console.log(`interval: ${interval}`)
    if (timerID) {
      clearInterval(timerID)
      timerID = setInterval(() => postMessage("tick"), interval)
    }
  } else if (e.data === "start") {
      timerID = setInterval(() => postMessage("tick"), interval)
  } else if (e.data === "stop") {
      clearInterval(timerID)
      timerID=null
  }
}
postMessage("hi there from timer-worker")
