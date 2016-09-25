// 1) Set global variables
var ball, sphere, allBalls;

var colorPalette = ['#e9ecf1','#f1f1cf','#f4cec3','#d3a0a9','#7690c3','#bec1e0'];

var BeatBall = function(sceneObj, variable,randomColor) {
    // xStart = 10 * Math.random();
    var xStart = 0;
    // yStart = 10 + (variable * 100);
    var yStart = 10;
    var zStart = 100
    var radiusStart = .25;

    var ballGeo = new THREE.SphereGeometry(radiusStart, 32, 32);
    var ballColor = new THREE.MeshBasicMaterial({ color: randomColor });
    newBall = new THREE.Mesh(ballGeo, ballColor);
    newBall.used = false;
    newBall.position.set(xStart, yStart, zStart)
    return newBall;
};

var BallHandler = function(sceneObj, speed,colors) {
    this.scene = sceneObj;
    this.queue = [];
    this.speed = speed;
    this.colors = colors;
};

BallHandler.prototype.add = function(radius) {
	var aColor = this.colors[Math.floor(Math.random()*this.colors.length)];
    var singleBall = new BeatBall(this.scene, radius,aColor);
    this.scene.add(singleBall);
    this.queue.push(singleBall);
};

BallHandler.prototype.remove = function() {
    this.queue.pop();
};

BallHandler.prototype.update = function() {
    // console.dir(this.queue);
    return this.queue.forEach(item => {
        // TO LOOP
        if (item.position.z < -100) {
            item.position.z = 100;
        } else { item.position.z -= this.speed; }
        // TO LOOP
        // if (item.translation.x > this.scene.width) {
        //     item.translation.x = 0;
        // } else { item.translation.x += 10; }
    });
};


function addElements(sceneObj){
	// Ball
    //SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    var ballGeo = new THREE.SphereGeometry(.25, 32, 32);
    var ballColor = new THREE.MeshBasicMaterial({ color: '#d3a0a9' });
    ball = new THREE.Mesh(ballGeo, ballColor);
    ball.lookAt(camera.position);
    //x, y, z
    ball.position.set(0, 10, 50);
    // ball.position.set(50, 10, 0);
    // 2) Add objects to scene
    allBalls = new BallHandler(sceneObj,1,colorPalette)
    // sceneObj.add(ball);
    allBalls.add(.25)
}