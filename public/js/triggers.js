// // Keyboard Trigger
//     var kick = new Howl({
//         src: ['sounds/kick.wav'],
//         loop: true,
//         speed: 2
//     });

//     var bass = new Howl({
//         src: ['sounds/bass.wav'],
//         loop: true
//     });

//     $('#status').click(function() {
//         $(this).text('Changed');
//         // alerta();
//     });

//     var playingKick = false;
//     var playingBass = false;

$("body").keydown(function(event) {
    // console.log(event.which);
    if (event.which === 40) {
        location.reload();
    }

    if (event.which === 74) {
        if (!playingBass) {
            // kick.volume(1);
            // kick.play();
            // allCircles.add(rms);
            bass.play()
            playingBass = true;
        }
    }
    if (event.which === 70) {
        if (!playingTreble) {
            // kick.volume(1);
            // kick.play();
            // allCircles.add(rms);
            treble.play()
            playingTreble = true;
        }
    }

    // if (event.which === 70) {
    //     if (!playingBass) {
    //         bass.volume(1);
    //         bass.play();
    //         console.dir(bass)
    //         playingBass = true;
    //     }
    // }
    // if (event.which === 86) {
    //     togglePlay();

    // }

    // kick.on('end', () => console.log('Psss!'));
    // bass.on('end', () => console.log('Boom!'));

});



$("body").keyup(function(event) {
    if (event.which === 74) {
        playingBass = false;
        // kick.stop();
        bass.stop()

        // kick.fade(1, 0, 200);
        // kick.on('fade', () => kick.stop());
    }
    if (event.which === 70) {
        playingTreble = false;
        // kick.stop();
        treble.stop()

        // kick.fade(1, 0, 200);
        // kick.on('fade', () => kick.stop());
    }
    // if (event.which === 70) {
    //     playingBass = false;
    //     bass.fade(1, 0, 200);
    //     bass.on('fade', () => bass.stop());
    // }
});
