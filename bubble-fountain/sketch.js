var system;

function setup() {

  createCanvas(windowWidth, windowHeight);

  system = new ParticalSystem(createVector(width/2 , height/2));

}

function draw() {

  background(50);

  system.addPartical();

  system.run();

}

var Partical = function(position){

  this.acceleration = createVector(random(-0.5,0.5),random(-0.5 , 0.5));

  this.velocity = createVector(random(-1,1),random(-1,0));

  this.position = position.copy();

  this.lifespan = 255.0;

  this.maxDiameter = random(10,40);

  this.diameter = 0;

  this.r = random(0,255);

  this.g = random(0,255);

  this.b = random(0,255);

};

Partical.prototype.run = function(){

  this.update();

  this.display();

};

Partical.prototype.update = function(){

  this.velocity.add(this.acceleration);

  this.position.add(this.velocity);

  this.lifespan -= 2;

  if(this.diameter < this.maxDiameter){

    this.diameter += 1;

  }

};

Partical.prototype.display = function(){

  stroke(this.r,this.g,this.b,this.lifespan);

  strokeWeight(1);

  fill(this.r,this.g,this.b,map(this.lifespan,0,255,0,127));

  ellipse(this.position.x,this.position.y,this.diameter,this.diameter);

};

Partical.prototype.isDead = function(){

  return (this.lifespan <= 0 ||

    this.position.x <= 0 ||

    this.position.y <= 0 ||

    this.position.x >= width ||

    this.position.y >= height);

};

var ParticalSystem = function(position){

  this.origin = position.copy();

  this.particals = [];

};

ParticalSystem.prototype.addPartical = function(){

  this.particals.push(new Partical(this.origin));

};

ParticalSystem.prototype.run = function(){

  var p;

  for(var i = this.particals.length - 1 ; i >= 0 ; i--){

    p = this.particals[i];

    p.run();

    if(p.isDead()){

      this.particals.splice(i,1);

    }

  }

};