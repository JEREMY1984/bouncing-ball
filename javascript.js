let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let random = function(x,y){
  return Math.floor(Math.random()*(y-x)+x);
}

let randomColor = function(){
  return 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
}

// constructor 
function Ball(x,y,velX,velY,size,color){
  this.x=x;
  this.y=y;
  this.velX=velX;
  this.velY= velY;
  this.color=color;
  this.size=size;
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
}

Ball.prototype.update = function(){
  if(this.x + this.size >= width){
    this.velX = -(this.velX);
  }
  if(this.x - this.size <=0){
    this.velX = -(this.velX);
  }
  if(this.y + this.size >= height){
    this.velY = -(this.velY);
  }
  if(this.y -this.size <=0){
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}
Ball.prototype.collisionDetect = function(){
  for(j=0;j<balls.length;j++){
    if(this !== balls[j]){
      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx*dx+dy*dy);
      if(distance < this.size + balls[j].size) {
        this.color = balls[j].color = randomColor();
      }
    }
  }
}

// balls container

let balls = [];
while(balls.length<50){
  let size = random(1,30);
  let ball = new Ball(random(size,width-size),random(size,height-size),random(1,10),random(1,10),size,randomColor());
  balls.push(ball);
}

// animate ball, draw balls, update balls, collisionDetect balls

function animate(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  for(i=0;i<balls.length;i++){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(animate);
}


animate();
