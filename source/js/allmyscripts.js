//Some js13k code
/*
//ideation around texture generator
function rdm(s,e)
{
  return s+Math.random()*(e-s);
}

function cp_f(fixed) //fixed control point
{
   return {
     val: fixed
   };
}

function cp_b(st,end,spmin,spmax) {
  if (!spmax) spmax=spmin;
  return {
    val: st-1,
    sp:  0,
    step: function(time) {
      var reset=0;
      this.val+=this.sp*time;
      if (this.val<st) {reset=1; this.val=st;}
      if (this.val>end) {reset=-1; this.val=end;}
      if (reset)
        this.sp=rdm(this.spmin,this.spmax)*reset;

      return true;
    }
  }
}


function createTexture(canvasId)
{
  var cps=[];
  var pts=[];
  var canvas = document.getElementById(canvasId);
  canvas.width=1000;
  canvas.height=1000;
  var ctx = canvas.getContext('2d');
  var last=0;
  function addCp(cp) {
    //check it is unique
    for (var i=0;i<cps.length;i+=1)
      if (cps[i]==cp) return;
    cps.push(cp);
  }

  function each(ts)
  {
    var t=.1;
    if (!last) t=(ts-last)/1000;
    last=ts;
    for (var i=0;i<cps.length();i+=1)
      if (cps[i].step) cps[i].step(t);
    for (var i=0;i<pts.length();i+=1)
      pts[i]();
    window.requestAnimationFrame(each);
  }

  canvas.texture={
    opacity: function(val) {
      addCp(val);
      pts.push(function() { });
    },
    mv: function(x,y) {
      addCp(x);
      addCp(y);
      pts.push(function() { ctx.moveTo(x.val,y.val);});
    },
    ln: function(x,y) {
      addCp(x);
      addCp(y);
      pts.push(function() { ctx.lineTo(x.val,y.val); });
    }
   };
   window.requestAnimationFrame(each);
   return canvas.texture;
}

createTexture('backdrop1').
    //opacity(cp_b(0.5,1,1)).
    //width(cp_f(20)).
    //rgb(cp_b(128,255,100),cp_f(64),cp_f(64)).
    mv(cp_b(0,1000,200,1000),cp_b(0,1000,200,1000)).
    ln(cp_b(0,1000,200,1000),cp_b(0,1000,200,1000));
*/
