function setup(){
    var body = document.querySelector("html");
    console.log(window.innerHeight);
    Engine = Matter.Engine;
        World = Matter.World;
        Render = Matter.Render;
        Bodies = Matter.Bodies;
        Composites = Matter.Composites; 
        Body = Matter.Body; 
    engine = Engine.create();
    render = Render.create({
        element: body,
        engine: engine,
        options: {
            width:window.innerWidth -20,
            height: window.innerHeight*4,
            wireframes: false, // disable Wireframe
            background: 'rgb(255,0,0,0)'
        }
    });
    topWall = Bodies.rectangle(body.clientWidth/2, -1, body.clientWidth+20, 1, { isStatic: true });
    leftWall = Bodies.rectangle(-1, body.clientHeight * 4 /2, 1, window.innerHeight*4 +70 , { isStatic: true });
    rightWall = Bodies.rectangle(body.clientWidth + 1, window.innerHeight * 4 /2, 1, window.innerHeight*4+20, { isStatic: true });
    bottomWall = Bodies.rectangle(body.clientWidth/2, window.innerHeight * 4 + 1, body.clientWidth + 40, 1, { isStatic: true });
    Engine.run(engine);
    Render.run(render);
    engine.world.gravity.y = 0;
}

function loadSprites () {
    var nbSprites = Math.round(Math.random() * 10) + 10;
    var links = ["donut", "citron", "fraise", "pop-corn", "poulet", "cake", "choco", "piment", "tacos", "hamburger", "pasteque", "poire",
    "pizza", "tartine", "kiwi"];
    for(var i = 0; i < 20; i++){
        inverse[i] = true;
        change[i] = true;   
        createSprite("icons/" + links[Math.floor(Math.random() * links.length - 0.001)] + ".png", i);
        force(i);
        addEvent(i);
    }
}

const loadImage = (url, onSuccess, onError) => {
    const img = new Image();
    img.onload = () => {
      onSuccess(img.src);
    };
    img.onerror = onError();
    img.src = url;
    return onSuccess;
 };

 function createSprite (url, i){
    spriteTab[i] = Bodies.circle(window.innerWidth/2,window.innerHeight*2, 30, {
        density: 0.0005,
        frictionAir: 0.06,
        restitution: 1,
        friction: 0.00,
        render:{
            sprite: {
                texture: url
            }
        }
    });
    loadImage( url,
          url => {
              console.log("Success");
              World.add(engine.world, spriteTab[i]);
            },
        () => {
            console.log("Error  Loading ");
        }
    );
 }

 /**
  * fonction ajoutant les événements nécessaire aux sprites
  * @param  i -> Index dans le tableau du sprite 
  */
 
 function addEvent (i){
        Matter.Events.on(engine, "afterUpdate", function(event){
            force(i);
        });

 }

 function update (){
     for(var i = 0; i < spriteTab.length; i++){
         force(i);
     }
 }
 function force(i) {
     console.log(i);
    if(change[i]){
        angle[i] = Math.random();
        moveX[i] = Math.random();
        moveY[i] = Math.random();
        if(idColliding == 1)
            moveY[i] -= 1;
        if(idColliding == 2)
            moveX[i] -= 1;
        if(idColliding == 1 || idColliding == 4|| idColliding == 0)
            moveX[i] = moveX[i] * 2 - 1;
        else if (idColliding == 2 || idColliding == 3 || idColliding == 0)
            moveY[i] = moveY[i] * 2 - 1;
        moveX[i] /= 2000;
        moveY[i] /= 2000;
        angle[i] /= 2000;
    }   
    change[i] = false;
    if(!inverse[i]) {
        Body.setAngle(spriteTab[i], spriteTab[i].angle + angle[i]) ; 
        Body.applyForce( spriteTab[i], {x: spriteTab[i].position.x, y: spriteTab[i].position.y}, {x: moveX[i], y: moveY[i] });
    } else {
        Body.setAngle(spriteTab[i], spriteTab[i].angle - angle[i]/100);  
        Body.applyForce( spriteTab[i], {x: spriteTab[i].position.x, y: spriteTab[i].position.y}, {x:  -moveX[i], y: -moveY[i]});
    }
}
