// var width = 200;
//  var drawRange = function() {
//     var incAmount = 0.01;
//     for (var t = 0; t < incAmount*width; t += incAmount) {
//         var n = noise(t);
//         var y = map(n, 0, 1, 0, height/2);
//         rect(t*100, height-y, 1, y);
//     }
// };

// drawRange();

// var c = document.createElement("canvas");
// var ctx = c.getContext("2d");
// c.width = 1350;
// c.height = 480;
// document.body.appendChild(c);

//  function loop(){
//     ctx.fillStyle = "red";
//     ctx.fillRect(0, 0, c.width, c.height);


//     requestAnimationFrame(loop);
//  }


// var Player = function () {
//     this.x = c.width / 2;
//     this.y = 0;
//     this.ySpeed = 0;
//     this.rot = 0;
//     this.rSpeed = 0;
//     this.img = new Image();
//     this.img.src = "moto.png";
//     this.draw = function () {
//         var p1 = c.height - noise(t + this.x) * 0.25;
//         var p2 = c.height - noise(t + 5 + this.x) * 0.25;

//         var grounded = 0;

// }

// const timeScreen = document.querySelector(".timeScreen");
// const timeScreenP = document.querySelector(".timeScreenP");
// timeScreen.style.display = "none";





var c = document.createElement("canvas");
c.classList.add("gameScreen");
var ctx = c.getContext("2d");
c.width = 1350;
c.height = 480;
document.body.appendChild(c);

 
var perm = [];
while (perm.length < 255) {
    while (perm.includes(val = Math.floor(Math.random() * 255)));
    perm.push(val);
}

var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
var noise = x => {
    x = x * 0.01 % 254;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

var Player = function () {
    this.x = c.width / 2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;
    this.rSpeed = 0;
    this.img = new Image();
    this.img.src = "img/Untitled-2.png";
    this.draw = function () {
        var p1 = c.height - noise(t + this.x) * 0.25;
        var p2 = c.height - noise(t + 5 + this.x) * 0.25;

        var grounded = 0;
        if (p1 - 12 > this.y) {
            this.ySpeed += 0.1;
        } else {
            this.ySpeed -= this.y - (p1 - 12);
            this.y = p1 - 12;
            grounded = 1;
        }

        var angle = Math.atan2((p2 - 12) - this.y, (this.x + 5) - this.x);
        this.y += this.ySpeed;

        if (!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5) {
            playing = false;
            this.rSpeed = 5;
            k.ArrowUp = 1;
            this.x -= speed * 5;
        }


        if (grounded && playing) {
            this.rot -= (this.rot - angle) * 0.60;
            this.rSpeed = this.rSpeed - (angle - this.rot);
        }
        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.02;
        this.rot -= this.rSpeed * 0.01;
        if (this.rot > Math.PI) this.rot = -Math.PI;
        if (this.rot < -Math.PI) this.rot = Math.PI;
        ctx.save();
        ctx.translate(this.x, this.y - 3);
        ctx.rotate(this.rot);
        ctx.drawImage(this.img, -65, -75, 90, 90);
        ctx.restore();
    }
}

var player = new Player();
var t = 0;
var speed = 0;
var playing = true;
var k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };
function loop() {
    speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01;
    t += 10 * speed;
    // ctx.fillStyle = "#5ff7f9";
    var grd = ctx.createLinearGradient(0, 0, 000, 350);
    grd.addColorStop(0, "#65DDEF");
    grd.addColorStop(1, "#C9F6FF");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(10, 10, 150, 80);
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#3c2515";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for (let i = 0; i < c.width; i++)
        ctx.lineTo(i, c.height * 0.8 - noise(t + i * 5) * 0.25);
    ctx.lineTo(c.width, c.height);
    ctx.fill();

    ctx.fillStyle = "#23904F";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for (let i = 0; i < c.width; i++)
        ctx.lineTo(i, c.height - noise(t + i) * 0.25);
    ctx.lineTo(c.width, c.height);
    ctx.fill();

    player.draw();
    if (player.x < 0)
    {  
        displaytime();

    }
    requestAnimationFrame(loop);
} 

onkeydown = d => k[d.key] = 1;
onkeyup = d => k[d.key] = 0;

function restart() {

    player = new Player();
    t = 0;
    speed = 0;
    playing = true;
    k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };

}
loop();

var info = document.createElement("div");
info.classList.add("info");
info.innerHTML = "[up] [down] = accelerate <br> [Left] [Rigth] = rotate";
document.body.appendChild(info);



var timeScreen = document.createElement("div");
timeScreen.classList.add("timeScreen");
document.body.appendChild(timeScreen);

var btn = document.createElement("a");
btn.classList.add("restart");
btn.setAttribute('href',"");
btn.innerText = "Restart";
timeScreen.appendChild(btn);

var timeScreenP = document.createElement("p");
timeScreenP.classList.add("timeScreenP");
timeScreen.appendChild(timeScreenP);

timeScreen.style.display = "none";


var timeElement = document.createElement("div");
timeElement.classList.add("time");
document.body.appendChild(timeElement);



const startTime = 0;
let time = startTime*60;

var timmer = setInterval(updateTime, 1000);

function updateTime(){
    var min = Math.floor(time / 60);
    var sec = time % 60;

    timeElement.innerHTML = `${min}:${sec}`;
    time++;
}

function displaytime(){
    timeScreen.style.display = "block";
    // info.style.display = "none";
    info.innerText = "Game Over";
    timeScreenP.innerText = "Your Highest Time is :";
    clearInterval(timmer);
}
