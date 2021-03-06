

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext=null;
if (!AudioContext) alert("no Audio Context");
else audioContext = new AudioContext;
var audio_mute = false;

function tone(length,type) {
  if ((!audioContext)||(audio_mute)) return { //a null note
    f:function() { return this; },
    v:function() { return this; } };
  var current= audioContext.currentTime;
  var oscillator = audioContext.createOscillator();
  var gain = audioContext.createGain();

  if (type) oscillator.type=type;
  oscillator.frequency.value=0;
  gain.gain.value=0;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(0);
  oscillator.stop(current+length);

  return {
    f:function() {
      if (arguments.length==1) { oscillator.frequency.value=arguments[0]; return this; }
      for (var i=0;i<arguments.length;i+=1)
        oscillator.frequency.linearRampToValueAtTime(arguments[i],current+i/(arguments.length-1)*length);
      return this;
    },
    v:function() {
      if (arguments.length==1) { gain.gain.value=arguments[0]; return this; }
      for (var i=0;i<arguments.length;i+=1)
        gain.gain.linearRampToValueAtTime(arguments[i],current+i/(arguments.length-1)*length);
      return this;
    }
  };
}


var ae={
  levstart: function() { tone(2,'triangle').v(.2,.4,.2,.7,.2).f(500,300,400,100,300,300,250,200); },
  levend: function() { tone(1,'triangle').v(.2,.8,.2).f(300,250,400); },
  tiled: function() { tone(.3).v(.2,.5,0).f(rdm(200,350),480,450); },
  beep: function() { tone(1,'square').v(0,1,1,1,0).f(300);},
  spdup: function() { tone(1).v(0,.7,.7,.7,.3,.7,.9,.3,1,0).f(100,200);},
  spddn: function() { tone(1).v(0,1,1,1,.3,.9,.9,.3,.7,0).f(200,100);},
  click: function() { tone(.5).v(1,.1,.8,0.2,.5,0).f(150,200,150,100,150,100,150,100); },
  rothex: function() { tone(.3).v(1,.1,.8,.2,.5,0).f(150,100,150,100,150,100,150,100); tone(.3).v(0,.1,.1,0).f(800,900); },

  hop0: function(len) { tone(len).v(0,.5,0).f(150,200); },
  home0: function(len) {  tone(len).v(1,1,.1).f(200,500); },
  start0: function(len) { tone(len).v(0,1,.7).f(100,150); },
  death0: function(len) { tone(len).v(1,.1,.8,0.5,.6,0).f(250,200,250,150,200,150,200,150);},
  chirp0: function(len) { tone(len).v(0,.05,.1,0).f(300,rdm(350,400),rdm(350,400),rdm(350,400),200);},

  hop1: function(len) { tone(len).v(0,.5,rdm(.1,.6),0).f(200,250); },
  home1: function(len) {  tone(len).v(1,1,.1).f(200,500); },
  start1: function(len) { tone(len).v(0,1,.7).f(100,200); },
  death1: function(len) { tone(len).v(1,.1,.8,0.5,.6,0).f(250,200,250,150,200,150,200,150);},
  chirp1: function(len) { tone(len).v(0,.1,.2,0).f(600,rdm(650,700),rdm(650,700),rdm(650,700),500);},

  hop2: function(len) { tone(len).v(0,.2,0).f(350,450); },
  home2: function(len) {  tone(len).v(1,1,.1).f(200,500); },
  start2: function(len) { tone(len).v(0,1,.7).f(200,300); },
  death2: function(len) { tone(len).v(1,.1,.8,0.5,.6,0).f(250,200,250,150,200,150,200,150);},
  chirp2: function(len) { tone(len).v(0,.05,.1,0).f(800,rdm(900,1000),rdm(900,1000),rdm(900,1000),700);},

  hop3: function(len) { tone(len).v(0,.3,.5,0).f(150,250,200); },
  home3: function(len) {  tone(len).v(1,1,.1).f(200,100,200,500); },
  start3: function(len) { tone(len).v(0,1,.7,0).f(180,250,180,200); },
  death3: function(len) { tone(len).v(1,.1,.8,0.5,.6,0).f(250,200,250,150,200,150,200,150);},
  chirp3: function(len) { tone(len).v(.2,.2,.5,0).f(rdm(200,300),200,rdm(200,300),200,rdm(200,300));}
}
