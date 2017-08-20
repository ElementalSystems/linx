
var context = new AudioContext;


function tone(length,type) {
  var current= context.currentTime;
  var oscillator = context.createOscillator();
  var gain = context.createGain();

  if (type) oscillator.type=type;
  oscillator.frequency.value=0;
  gain.gain.value=0;
  oscillator.connect(gain);
  gain.connect(context.destination);

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
  beep: function() { tone(1,'square').v(0,1,1,1,0).f(300);},
  hop: function() { tone(1).v(0,1,1,1,0).f(300); },
  home: function() { tone(1.5).v(1,1,1,1,0).f(100,300,100,200,100,150,50);},
  start: function() { tone(1).v(0,1,.7).f(400,100,400,100,300,300,300,300);},
  death: function() { tone(2).v(1,0,.8,0,.5,0).f(150,100);},
  chirp: function() { tone(1).v(0,.7,.7,.7,.3,.7,.9,.3,1,0).f(100,200);},
  spdup: function() { tone(1).v(0,.7,.7,.7,.3,.7,.9,.3,1,0).f(100,200);},
  spddn: function() { tone(1).v(0,1,1,1,.3,.9,.9,.3,.7,0).f(200,100);},
  click: function() { tone(.1).v(0,.3,.5).f(100,100,200); }
}
