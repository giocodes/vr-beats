// 1) Set global variables
var ball, sphere, allBalls;

var colorPalette = ['#e9ecf1', '#f1f1cf', '#f4cec3', '#d3a0a9', '#7690c3', '#bec1e0'];

var BeatBall = function(sceneObj, variable, randomColor) {
    var xStart = -100 + (200 * Math.random());
    var yStart = 50 * Math.random();
    var zStart = 100
    var radiusStart = .25;

    var ballGeo = new THREE.SphereGeometry(radiusStart, 32, 32);
    var ballColor = new THREE.MeshBasicMaterial({ color: randomColor });
    newBall = new THREE.Mesh(ballGeo, ballColor);
    newBall.used = false;
    newBall.position.set(xStart, yStart, zStart)
    return newBall;
};

var BallHandler = function(sceneObj, speed, colors) {
    this.scene = sceneObj;
    this.queue = {};
    this.speed = speed;
    this.colors = colors;
};

BallHandler.prototype.add = function(radius) {
    var aColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    var singleBall = new BeatBall(this.scene, radius, aColor);
    console.log(singleBall.id + ' is in!')
    this.scene.add(singleBall);
    // this.queue.push(singleBall);
    this.queue[singleBall.id] = singleBall;
    console.dir(this.queue)
};

BallHandler.prototype.remove = function(singleBall) {
    console.dir(singleBall.id + ' is out!')
    delete this.queue[singleBall.id];
    // this.queue.pop();
    this.scene.remove(singleBall);
};

BallHandler.prototype.update = function() {
    // console.dir(this.queue);
    for (var item in this.queue) {
        // console.dir(item);
        if (this.queue[item].position.z < -11 || this.queue[item].position.y < -11) {
            this.remove(this.queue[item]);
        } else {
            if (!playingBass) {
            // not playing fall
                this.queue[item].position.y -= this.speed;
                this.queue[item].position.z -= this.speed/2;
            } else {
            // while playing move forward
                this.queue[item].position.z -= this.speed;
            }

        }
    }

    // Array Loop
    // return this.queue.forEach(item => {
    //     // TO LOOP
    //     // if (item.position.z < -100) {
    //     //     item.position.z = 100;
    //     // } else { item.position.z -= this.speed; }
    //     // TO RUN ONCE
    //     if (item.position.z < -11) {
    //         this.remove(item);
    //     } else { item.position.z -= this.speed; }
    // });
};


function addElements(sceneObj) {
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
    allBalls = new BallHandler(sceneObj, 1, colorPalette)
        // sceneObj.add(ball);
    allBalls.add(.25)
}


// // Sounds
var bass = new Howl({
    src: ['sounds/bass.wav'],
    loop: true
});
var playingBass = false;

// var bass, treble, voice;
// // var analyzer;
// // // var playingKick = false;
// function preload() {
//     bass = loadSound('sounds/foundbass.mp3');
//     treble = loadSound('sounds/foundsynth.mp3');
//     voice = loadSound('sounds/deeptwo.mp3');
// }

// function setup() {
// //     // Analyzer
// //     analyzer = new p5.Amplitude();
// //     analyzer.smooth(.9);
// //     analyzer.setInput(bass);
// //     // FFT
// //     fft = new p5.FFT();
// //     // Perk Detect
// //     peakDetect = new p5.PeakDetect(600, 11050, .1, 10);
// //     peakDetect.onPeak(peak => {
// // 	console.log('peak', peak);
// //     allBalls.add(peak*1);
// //     });
// }
