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
    this.beats[key].color = this.colorCount;
    if (this.colorCount >= colorPalette.length)
        {this.colorCount = 0;}
    else {this.colorCount += 1;}
}
s
beatBox = new BeatBox();
// Voices
beatBox.add('ahh.mp3', 81);
beatBox.add('deep.mp3', 87);
beatBox.add('sayyou.mp3', 69);
beatBox.add('thinkicanfly.mp3', 82);
beatBox.add('wefound.mp3', 84);
beatBox.add('youandi.mp3', 89);
// Trebles
beatBox.add('wfl-treble.mp3', 65,.99);



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
