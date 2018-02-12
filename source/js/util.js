
//this string defines the mapping from single characters to
// a cls a value from 0 to 4 indicateing which group of synbols
// and a value from 0 to 5 indciating the place in the group
var _dec='012345abcdefABCDEFklmnopKLMNOP';
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


var _fullScreenAttempt=0
function fullScreen() {
  if (_fullScreenAttempt) return;
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  requestFullScreen.call(docEl);
  _fullScreenAttempt+=1;
}

function sml(ty) //launch a social media message about me
{
  var url=window.location.href;
  var m="I just completed level "+lv_id+" of #TheLostPackets - an abstract puzzle game."
  switch (ty)
    {
      case 't':
        window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(m),'_blank');
        break;
      case 'f':
        window.open('https://www.facebook.com/sharer.php?u='+encodeURIComponent(url),'_blank');
        break;
      case 'u': //tumblr
        window.open('https://www.tumblr.com/widgets/share/tool?canonicalUrl='+encodeURIComponent(url)+'&title='+encodeURIComponent(m),'_blank');
        break;
      case 'r': //reddit
        window.open('https://reddit.com/submit?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(m),'_blank');
        break;
    }

}
