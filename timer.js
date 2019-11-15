class Stopwatch {
  constructor(timerField) {
    this.time = 0
    this.offset = 0
    this.interval = 0
    this.isOn = false
    this.timerField = timerField
  }
  // controllers methods
  start() {
    this.interval = setInterval(() => {
      this.update()
    }, 10)
    this.offset = Date.now()
    this.isOn = true
  }
  stop() {
    clearInterval(this.interval)
    this.interval = null
    this.isOn = false
  }
  reset() {
    this.time = 0
    this.update()
  }
  // logic methods
  update() {
    if (this.isOn) {
      this.time += this.incrementedTimer()
    }
    this.timerField.textContent = this.timeFormatter()
  }
  incrementedTimer() {
    const now = Date.now()
    const timePassed = now - this.offset

    this.offset = now
    return timePassed
  }
  timeFormatter() {
    const time = new Date(this.time)
    let minutes = time.getMinutes().toString()
    let seconds = time.getSeconds().toString()
    let milliseconds = time.getMilliseconds().toString()

    if (minutes.length < 2) {
      minutes = '0' + minutes
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds
    }
    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds
    }
    return `${minutes}:${seconds}.${milliseconds}`
  }
}


const timer = document.getElementById('timer')
const toggleBtn = document.getElementById('toggle')
const resetBtn = document.getElementById('reset')

const watch = new Stopwatch(timer)

function start() {
  toggleBtn.textContent = 'Stop'
  watch.start()
}
function stop() {
  toggleBtn.textContent = 'Start'
  watch.stop()
}
toggleBtn.addEventListener('click', function() {
  watch.isOn ? stop() : start()
})
resetBtn.addEventListener('click', function() {
  watch.reset()
})