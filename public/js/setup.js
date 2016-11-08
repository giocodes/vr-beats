var camera, scene, renderer;
var effect, controls;
var element, container;

var clock = new THREE.Clock();

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    element = renderer.domElement;
    container = document.getElementById('main');
    container.appendChild(element);

    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();

    // console.dir(scene)


    // PerspectiveCamera( fov, aspect, near, far )
    // camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
    camera = new THREE.PerspectiveCamera(90, 2560 / 1440, 0.001, 1000);
    camera.position.set(0, 10, 0);
    // camera.lookAt(50,10,0)
    scene.add(camera);

    controls = new THREE.OrbitControls(camera, element);
    controls.rotateUp(Math.PI / 4);
    controls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
    );
    controls.noZoom = true;
    controls.noPan = true;

    function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);


    var light = new THREE.HemisphereLight('#0080FF', '#00FF00', 0.5);
    // var light = new THREE.HemisphereLight('#800000', '#FFFFFF', 0.3);

    // console.dir(light)
    scene.add(light);

    var texture = THREE.ImageUtils.loadTexture(
        'textures/patterns/pentagon.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
    });

    var geometry = new THREE.PlaneGeometry(1000, 1000);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);
}
// 3) Add objects to scene
addElements(scene);


function resize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    effect.setSize(width, height);
}

function update(dt) {
    resize();

    camera.updateProjectionMatrix();

    controls.update(dt);

}

function render(dt) {
    // VR Version
    effect.render(scene, camera);
    // Desktop Version
    // scene.background = new THREE.Color('#e9ecf1');
    // renderer.render(scene, camera);
}
var timeInMs = Date.now();
var beatBox;

function animate(t) {
    requestAnimationFrame(animate);

    if (beatBox) {
        if (beatBox.beats[32].playing) {
            var realNow = Date.now();
            // console.log(realNow,timeInMs)
            // console.log(presentColor)
            if ((realNow - timeInMs) > 500) {
                if (presentColor >= colorPalette.length) {
                    presentColor = 0
                } else {
                    presentColor += 1
                }
                scene.children[1].color = new THREE.Color(colorPalette[presentColor]);
                // allBalls.add(0.25, colorPalette[presentColor], 32)
                timeInMs = realNow;
            }

        }
    }

    if (allBalls) {
        allBalls.update();
        for (var key in beatBox.beats) {
            if (beatBox.beats[key].playing) {
                if (+key === 32) {
                    var spaceColor = Math.floor(Math.random() * colorPalette.length)
                    console.log(spaceColor)
                    beatBox.beats[key].color = spaceColor;
                }
                console.log(beatBox.beats[key].color)
                allBalls.add(0.25, beatBox.beats[key].color, key);
            }
        }
    }
    update(clock.getDelta());
    render(clock.getDelta());
}

function fullscreen() {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
}
