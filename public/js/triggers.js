// var BeatLink = function(key,sound) {
//     this.key = key;
//     this.sound = sound;
// }

var BeatBox = function() {
    this.beats = {}
}

BeatBox.prototype.add = function(file, key, name) {
    this.beats[key] = new Howl({
        src: ['sounds/' + file],
        loop: true
    });
    this.beats[key].playing = false;

}

beatBox = new BeatBox();
beatBox.add('sayyou.mp3', 81)

console.log(beatBox)

$("body").keydown(function(event) {
    console.log(event.which);
    if (event.which === 40) {
        location.reload();
    }


    for (var link in beatBox.beats) {
        console.log(link)
        if (event.which === +link) {
            console.log(beatBox.beats[link].playing)
            if (!beatBox.beats[link].playing) {
                beatBox.beats[link].play();
                beatBox.beats[link].playing = true;
            }
        }

    }


    if (event.which === 74) {
        if (!playingBass) {
            // kick.volume(1);
            // kick.play();
            // allCircles.add(rms);
            bass.play();
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
    for (var link in beatBox.beats) {
        if (event.which === +link) {
            beatBox.beats[link].stop();
            beatBox.beats[link].playing = false;

        }

    }
    if (event.which === 74) {
        playingBass = false;
        // kick.stop();
        bass.stop()

        // kick.fade(1, 0, 200);
        // kick.on('fade', () => kick.stop());
    }
    if (event.which === 70) {
        playingTreble = false;
        treble.stop()
    }
    if (event.which === 85) {
        playingVocals = false;
        vocals.stop()
    }
    // if (event.which === 70) {
    //     playingBass = false;
    //     bass.fade(1, 0, 200);
    //     bass.on('fade', () => bass.stop());
    // }
});
