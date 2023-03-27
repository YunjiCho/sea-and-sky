
let colors = ["#B45B26", "#B9816C", "#B2A84E"];
let a = [];
let b = [];
let m = [];
let m1 = [];
let f = [];
let s = [];
let k = [];
var bubbles = [];

let x;
let easing = 0.001;
let speed1 = 0.4;
let speed2;
let lx;
let y;
let bx;
let pbx;
let num = 30;
let num2 = 100;
let num3 = 10;
let num4 = 30;
let num5 = 5;
let nwidth = 1.5;
let mools = 14;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  //canvas.position(windowWidth/2-1000/2,windowHeight/2-1000/2);
  frameRate(20);

  for (let i = 0; i < num; i++) {
    a[i] = new Pool(
      (width / num) * i * random(1, 1.1),
      random(height, height + 30),
      random(40 * nwidth, 44 * nwidth),
      (width / num) * (i - 1),
      (width / num) * i * 4,
      color(random(20, 80), random(130, 150), random(100, 30))
    );
  }

  for (let i = 0; i < num; i++) {
    b[i] = new Pool(
      (width / num) * i * random(1, 1.1) + 20,
      random(height + 20, height + 40),
      random(20 * nwidth, 35 * nwidth),
      (width / num) * (i - 1),
      (width / num) * i * 4,
      color(random(20, 80), random(130, 150), random(100, 30))
    );
  }

  for (let i = 0; i < num2; i++) {
    m[i] = new Mool(random(width), random(height / 3, height),10);
  }
  
  for (let i = 0; i < num2; i++) {
    m1[i] = new Mool(random(width), random(height / 3, height),15);
  }
  for (var i = 0; i < 100; i++) {
    var x = random(width);
    var y = random(height);
    var er = 10;
    if (i % 3 == 1) {
      col ="#B45B26";
    } else if (i % 3 == 2) {
      col ="#C58269";
    } else {
      col ="#B2A84E";
    }
    var col = col;
    bubbles.push(new Bubble(x, y, er,col));
  }

  for (let i = 0; i < num3; i++) {
    f[i] = new Fish(4 + i * 4, 0.1 + 0.01 * i, color("#FF602D"));
  }

  for (let i = 0; i < num4; i++) {
    s[i] = new Star(random(width), random(0, height / 3));
  }

  for (let i = 0; i < num3; i++) {
    k[i] = new Sky(i * 0.8, 0.45 + 0.02 * i, color("#FFE603"));
  }
}

function mouseClicked() {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
  
}
function draw() {
  
  background(80, 144, 232);

  //console.log(mousePressed());
  
  for (let i = 0; i < num2; i++) {
    m[i].draw();
     m1[i].draw();
  }
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].move();
  }
   
  if (mouseY > height / 3 && mouseY < height + 100) {
    for (let i = 0; i < num3; i++) {
      f[i].follow();
      f[i].grow();
    }
  }

  for (let i = 0; i < num; i++) {
    strokeCap(PROJECT);
    a[i].move();
    b[i].move();
  }

  noStroke();
  fill(0);
  rect(0, 0, width, height / 3);

  for (let i = 0; i < num4; i++) {
    s[i].shine();
  }

  if (mouseY < height / 3 && mouseY > 0) {
    for (let i = 0; i < num3; i++) {
      k[i].kfollow();
    }
  }
  //Click to feed

    fill(105);
  textSize(30);
  txt = text("Click to feed!",960, windowHeight/2-350);

}

class Pool {
  constructor(_lx, _y, _w, _pbx, _bx, _col) {
    this.x = 0;
    this.lx = _lx;
    this.y = _y;
    this.w = _w;
    this.bx = _bx;
    this.pbx = _pbx;
    this.col = _col;
  }

  move() {
    strokeWeight(this.w);
    stroke(this.col);

    let targetX = mouseX;
    let dx = targetX - this.x;
    this.x += dx * easing;
    let mx = map(this.x, 0, width, this.pbx, this.bx);

    this.x += random(-0.1, 0.1);
    line(this.lx, height, mx, (this.y / 4) * 3.2);
  }
}
function Bubble(x, y, er,col) {
  this.x = x;
  this.y = y;
  this.er = er;
  this.col = col;
  this.display = function () {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.er * 2, this.er * 2);
  };

  this.move = function () {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  };
  this.clicked = function () {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.er+10) {
      this.er = 0;
    }
  };
}
class Mool {
  constructor(_x, _y,_r) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
  }

  draw() {
    noFill();
    stroke(255, 99);
    strokeWeight(1.5);
    this.x += random(-speed1, speed1);
    this.y += random(-speed1, speed1);
    circle(this.x, this.y, random(this.r, this.r+1));
  
  }
}

class Fish {
  constructor(_dia, _speed2, _col) {
    this.dx = mouseX;
    this.dy = mouseY;
    this.dia = _dia;
    this.speed2 = _speed2;
    this.col = _col;
  }

  follow() {
    fill(this.col, 90);
    noStroke();
    this.dx = lerp(this.dx, mouseX, this.speed2);
    this.dy = lerp(this.dy, mouseY, this.speed2);
  
    circle(this.dx, this.dy, this.dia);
    
  }
  grow(){
    if(mouseIsPressed){
      this.dia+=0.5;
    } else{
      this.dia=this.dia;
    }
    if(this.dia>=70){
      this.dia= 0;
    }
  }
  
}

class Sky {
  constructor(_dia, _speed2, _col) {
    this.dx = mouseX;
    this.dy = mouseY;
    this.dia = _dia;
    this.speed2 = _speed2;
    this.col = _col;
  }

  kfollow() {
    fill(this.col);
    //stroke(255, 80);
    //strokeWeight(1.5);
    noStroke();
    this.dx = lerp(this.dx, mouseX, this.speed2);
    this.dy = lerp(this.dy, mouseY, this.speed2);
    circle(this.dx, this.dy, this.dia);
  }
}

class Star {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  shine() {
    fill("#F5E023");
    noStroke();
    this.x += random(-speed1, speed1);
    this.y += random(-speed1, speed1);
    circle(this.x, this.y, random(1, 3));
  }
}
