// var BeatLink = function(key,sound) {
//     this.key = key;
//     this.sound = sound;
// }

var BeatBox = function() {
    this.beats = {}
    this.colorCount = 0;
}

BeatBox.prototype.add = function(file, key,rateis,name) {
    this.beats[key] = new Howl({
        src: ['sounds/' + file],
        loop: true,
        rate : rateis
    });
    // this.beats[key].rate = rateis | 1;
    // console.log(this.beats[key])
    this.beats[key].playing = false;
    if (this.colorCount === colorPalette.length)
        {this.colorCount = 0;}
    else {this.colorCount += 1;}
    this.beats[key].color = this.colorCount;
}
beatBox = new BeatBox();
// Trebles QWERT
beatBox.add('wefound.mp3', 81); // Q
beatBox.add('deep.mp3', 87); // W
beatBox.add('sayyou.mp3', 69); // E
beatBox.add('thinkicanfly.mp3', 82); // R
beatBox.add('treble-allright.mp3', 84);// T
beatBox.add('youandi.mp3', 89); // Y
beatBox.add('treble-piano.mp3', 85); // U
beatBox.add('treble-halo.mp3', 73); // I
beatBox.add('treble-leanon.mp3', 79); // O
beatBox.add('treble-paperplanes.mp3', 80); // P
// Beats ASDFGH
beatBox.add('beat-aha.mp3', 65); // A
beatBox.add('treble-aha.mp3', 83); // S
beatBox.add('beat-bruno.mp3', 68); // D
beatBox.add('beat-feelgood.mp3', 70); // F
beatBox.add('treble-macklemore.mp3', 71); //G
beatBox.add('treble-happy.mp3', 72); // H
beatBox.add('beat-rockyou.mp3', 74); // J
beatBox.add('beat-audioslave.mp3', 75); // K
beatBox.add('beat-cometogether.mp3', 76); // L
// Extras M
beatBox.add('treble-feelgood.mp3', 77); // M



console.log(beatBox)

$("body").keydown(function(event) {
    console.log(event.which);
    if (event.which === 40) {
        location.reload();
    }

    for (var link in beatBox.beats) {
        if (event.which === +link) {
            if (!beatBox.beats[link].playing) {
                beatBox.beats[link].play();
                beatBox.beats[link].playing = true;
            }
        }
    }

    // Toggle beat with space key
    if (event.which === 32) {
        togglePlay(bass);
    }
});



$("body").keyup(function(event) {
    for (var link in beatBox.beats) {
        if (event.which === +link) {
            beatBox.beats[link].stop();
            beatBox.beats[link].playing = false;
        }
    }
});

function togglePlay(sound) {
    if (sound.isPlaying) {
        sound.stop();
        sound.isPlaying = false;
    } else {
        sound.play();
        sound.isPlaying = true;
    }
}
