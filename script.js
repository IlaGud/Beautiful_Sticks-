const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const particlesArray = [];

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillStyle = 'grey'

ctx.lineWidth = 1;
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    if (rand == 0) {
        return randomInteger(min, max)
    }
    return Math.floor(rand);
 }

class Particle {
    constructor() {
       this.x = randomInteger(0, canvas.width)
       this.y = randomInteger(0, canvas.height)
       this.size = randomInteger(0.2, 2)
       this.speedX = Math.random() * 3 - 1.5
       this.speedY = Math.random() * 3 - 1.5
       this.deg = randomInteger(0, 360)
       this.colorLine = `hsl(${this.deg}, 50%, 50%)`
    }
    update() {
        this.deg++
      //  ctx.strokeStyle = `hsl(${this.deg}, 50%, 50%)`
        this.x += this.speedX
        this.y = this.y + this.speedY
        if (this.x >= canvas.width || this.x <= 0 ) {
            this.speedX = -this.speedX
        }
        if (this.y >= canvas.width || this.y <= 0 ) {
            this.speedY = -this.speedY
        }
    }
    draw() {
        ctx.fillStyle = `hsl(${this.deg}, 50%, 50%)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

for (let i = 0; i < 500; i++) {
    particlesArray.push(new Particle())
}

requestAnimationFrame(draw)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArray.length; i++) {

         particlesArray[i].update()
         particlesArray[i].draw()
         for (let j = 0; j < particlesArray.length; j++) {
            let x1 = particlesArray[i].x
            let y1 = particlesArray[i].y
            let x2 = particlesArray[j].x
            let y2 = particlesArray[j].y
            let deg=particlesArray[i].deg
            
            let dx = x1 - x2
            let dy = y1 - y2
            let distance = Math.sqrt(dx*dx + dy*dy)
           
            if (distance < 150) {
                let stepProgress = 1/50
                let opacity = -((distance-100) * stepProgress)
               // ctx.strokeStyle = `rgba(255, 255, 0, ${opacity})`
                ctx.strokeStyle = `hsla(${deg}, 50%, 50%, ${opacity})`
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
console.log(deg)
                ctx.stroke();
                if (distance > 100) {
                    ctx.strokeStyle = `hsla(${deg}, 50%, 50%, 1)`
                    // ctx.strokeStyle = `rgba(255, 255, 0, 1)`
                }
            }
         }
         
    }
    requestAnimationFrame(draw)
}
