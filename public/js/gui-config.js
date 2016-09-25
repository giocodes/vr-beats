window.onload = function() {
    var gui = new dat.GUI();
    var f1 = gui.addFolder('CAMERA');
    f1.add(camera.position, 'x');
    f1.add(camera.position, 'y');
    f1.add(camera.position, 'z');
    f1.add(camera, 'fov');
    
    var f2 = gui.addFolder('CONTROLS');
    f2.add(controls.target, 'x');
    f2.add(controls.target, 'y');
    f2.add(controls.target, 'z');
    f2.add(controls, 'rotateUp');
    var f3 = gui.addFolder('ball');
    f3.add(ball.position, 'x');
    f3.add(ball.position, 'y');
    f3.add(ball.position, 'z');

    f1.open();
    f2.open();
    f3.open();

    // console.dir(controls);
    // console.dir(effect);
    // console.dir(camera);
    // console.dir(container);
    // console.dir(scene);
    // console.dir('cube',cube);
    // console.log('sphere');
    // console.dir(sphere);
};