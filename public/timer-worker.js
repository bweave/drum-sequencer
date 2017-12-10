let timerID = null
let interval = 100

self.onmessage = (e) => {
  if (e.data.interval) {
    console.log("setting interval")
    interval = e.data.interval
    console.log(`interval: ${interval}`)
    if (timerID) {
      clearInterval(timerID)
      timerID = setInterval(() => postMessage("tick"), interval)
    }
  }
  switch(e.data) {
    case "start":
      console.log("starting")
      timerID = setInterval(() => postMessage("tick"), interval)
      break
    case "stop":
      console.log("stopping")
      clearInterval(timerID)
      timerID=null
      break
    default:
      break
  }
}
postMessage("hi there from timer-worker")
