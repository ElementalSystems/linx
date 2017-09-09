
var _dec='012345abcdefABCDEF';
function dec(at)
{
  var v=_dec.indexOf(at);
  return {
    cls: Math.floor(v/6),
    val: v%6
  }
}


function rdm(a,b) {
  return a+Math.random()*(b-a);
}

function rdmi(a,b)
{
   return Math.floor(a+Math.random()*(b-a+1));
}

function fullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  requestFullScreen.call(docEl);

}
