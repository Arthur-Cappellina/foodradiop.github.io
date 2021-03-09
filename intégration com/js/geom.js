let Engine, World, Bodies, Composites, Body, Render;

let engine, render;

let topWall, rightWall, leftWall, bottomWall;

setup();

let img;

let spriteTab = [];
let angle = []; 
let moveX = []; 
let moveY = [];
let inverse = [];
let change = [];
let idColliding = 0;

loadSprites();

World.add(engine.world, [topWall,leftWall,rightWall,bottomWall]);

Matter.Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach((collision) => {
        if(collision["bodyA"]["id"] > 0 && collision["bodyA"]["id"] < 5) {
           // Matter.Body.applyForce(img,{x:img.position.x, y:img.position.y },{ x:-1*(img.velocity.x*img.mass)/Math.pow(runner.deltaMin,2), y:-1*(img.velocity.y*img.mass)/Math.pow(runner.deltaMin,2) });
            i = collision["bodyB"]["id"] - 5; 
           inverse[i] = !inverse[i];
           change[i] = true;
           force(i);
            //idColliding = collision["bodyA"]["id"];
        } else {
            force(i);
        }
    });
});

Matter.Events.on(engine, "afterUpdate", function(event){
    update();
});

let changeDirection = true;
