// 1) Set global variables
var ball, sphere, allBalls;

var colorPalette = ['#f4cec3', '#d3a0a9', '#7690c3', '#bec1e0', '#8ad2bc', '#2fa478', '#223941', '#f29665', '#f4cfbd', '#b0657a', '#7d957f', '#b0657a', '#d57f80', '#eab595', '#e8d7bb'];

// GRay e7e7e5
// Yellow #f1f1cf

var presentColor = 0;

var BeatBall = function(sceneObj, variable, randomColor, key) {
    var xStart = -300 + (600 * Math.random())
    var yStart = 5 + (200 * Math.random());
    var zStart = 300
    var radiusStart = 5 * Math.random();

    var ballGeo = new THREE.SphereGeometry(radiusStart, 32, 32);
    var ballColor = new THREE.MeshBasicMaterial({ color: randomColor });
    newBall = new THREE.Mesh(ballGeo, ballColor);
    newBall.key = key;
    newBall.position.set(xStart, yStart, zStart)
    return newBall;
};

var BallHandler = function(sceneObj, speed, colors) {
    this.scene = sceneObj;
    this.queue = {};
    this.speed = speed;
    this.colors = colors;
};

BallHandler.prototype.add = function(radius, color, key) {
    // var aColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    var aColor = this.colors[color];
    var singleBall = new BeatBall(this.scene, radius, aColor, key);
    // console.log(singleBall.id + ' is in!')
    this.scene.add(singleBall);
    // this.queue.push(singleBall);
    this.queue[singleBall.id] = singleBall;
    // console.dir(this.queue)
};

BallHandler.prototype.remove = function(singleBall) {
    // console.dir(singleBall.id + ' is out!')
    delete this.queue[singleBall. id];
    // this.queue.pop();
    this.scene.remove(singleBall);
};

BallHandler.prototype.update = function() {
    for (var item in this.queue) {
        if (this.queue[item].position.z < -300 || this.queue[item].position.y < -11) {
            this.remove(this.queue[item]);
        } else {
            for (var link in beatBox.beats) {
                // console.log(this.queue[item].key)
                if (!beatBox.beats[link].playing && this.queue[item].key === link) {
                    this.queue[item].position.y -= (this.speed );
                    this.queue[item].position.z -= (this.speed / 2);
                } else if (beatBox.beats[link].playing && this.queue[item].key === link) {
                    // while playing move forward
                    this.queue[item].position.z -= this.speed;
                }
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
    // BallHandler(sceneObj, speed, colorPalette)
    allBalls = new BallHandler(sceneObj, 4, colorPalette)
        // sceneObj.add(ball);
    allBalls.add(.25,'#d3a0a9', 81)
}


// // Sounds
var playingBass = false;
var playingTreble = false;
var playingVocals = false;
var bass = new Howl({
    src: ['sounds/bass.wav'],
    loop: true,
    rate: 1
        // volume: 0
});
bass.isPlaying = false;

var treble = new Howl({
    src: ['sounds/thinkicanfly.mp3'],
    loop: true
        // volume: 0
});


var vocals = new Howl({
    src: ['sounds/wefound.mp3'],
    loop: true
        // volume: 0
});



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
