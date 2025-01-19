const canvas = document.querySelector("canvas");
const crc = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = crc.createRadialGradient(canvas.width / 2, canvas.height / 2, 200,
    canvas.width / 2, canvas.height / 2, 400);
gradient.addColorStop(0.1, 'red');
gradient.addColorStop(0.7, 'orange');
gradient.addColorStop(1, 'yellow')

class Symbol {
    constructor(x, y, fontSize, height) {
        this.characters = '(abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+';
        this.character = '';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.height = height;
    }
    draw(crc, index) {
        this.character = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        crc.fillText(this.character, this.x * this.fontSize, this.y * this.fontSize);
        //crc.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        crc.fillStyle = gradient

        // for (let i = index; i > 0; i--) {
        //     if (this.character === effect.symbol[i].character) {
        //         const deltaX = this.x * this.fontSize - effect.symbol[i].x * this.fontSize;
        //         const deltaY = this.y * this.fontSize - effect.symbol[i].y * this.fontSize;
        //         const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        //         if (distance != 0 ) {
        //             crc.beginPath();
        //             crc.moveTo(this.x * this.fontSize, this.y * this.fontSize);
        //             crc.lineTo(effect.symbol[i].x * this.fontSize, effect.symbol[i].y * this.fontSize - this.fontSize);
        //             crc.strokeStyle = 'red';
        //             crc.lineWidth = 1
        //             crc.stroke();
        //         }
        //     }
        // }

        if (this.y * this.fontSize >= this.height && Math.random() > 0.9) {
            this.y = 0;
        }
        else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.fontSize = 25;
        this.columns = this.width / this.fontSize;
        this.symbol = [];
        this.#initializer();
    }
    #initializer() {

        for (let i = 0; i < this.columns; i++) {
            this.symbol[i] = new Symbol(i, 0, this.fontSize, this.height);
        }
    }
    resize(x, y) {
        this.width = x;
        this.height = y;
        this.columns = this.width / this.fontSize;
        this.symbol = [];
        this.#initializer();
    }
}

let effect = new Effect(canvas.width, canvas.height);

let prevTime = 0;
const fps = 1000 / 120;
let timer = 0;

const animate = (timeStamp) => {
    const deltaTime = timeStamp - prevTime;
    prevTime = timeStamp;

    if (timer > fps) {
        crc.fillStyle = 'rgba(0,0,0,0.1)';
        crc.textAlign = 'center';
        crc.fillRect(0, 0, canvas.width, canvas.height);
        crc.font = effect.fontSize + 'px monospace';
        effect.symbol.forEach((symbol, index) => symbol.draw(crc, index));
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)

    gradient = crc.createRadialGradient(canvas.width / 2, canvas.height / 2, 200,
        canvas.width / 2, canvas.height / 2, 400);
    gradient.addColorStop(0.1, 'red');
    gradient.addColorStop(0.7, 'orange');
    gradient.addColorStop(1, 'yellow')

})