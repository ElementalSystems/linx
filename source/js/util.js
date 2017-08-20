
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
