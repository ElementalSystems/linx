//File for all the code that makes and moves sparks


//returns a fully present spark div that is already
//  attached to the tile and starts at the end of the lnk
function _spark(type,grd,tile,lnk)
{
  //create the base div that is the spark
  var spk = document.createElement('div');
  spk.classList.add('spk');

  //make a child div and decorate it with a GS
  spk.spk_decor = document.createElement('div');
  gs(50).lineGrad("rgba(192,192,0,1)","rgba(255,0,0,1)")
        .lineWidth(15).line(0,.1,0,.4).line(rdm(-.25,0),.45,rdm(.1,.25),.45)
        .echo(5,0,0,0,0,0,rdm(25,95),1,1,1,0)
        .rotSym(rdmi(3,6))
        .setbg(spk.spk_decor);

  spk.appendChild(spk.spk_decor);

  function link(tile,lnk,dir) {
    spk.fact=dir;
    spk.tile=grd.cell[tile];
    spk.lk=spk.tile.lk[lnk];
    spk.tile.appendChild(spk);
  }




  spk.pos=1;
  link(tile,lnk,-1); //connect it to the init tile
  spk.ch_tm=rdm(.1,1);
  //add it's move me forward in time function
  spk.tick=function(time)
  {
    if (spk.stop) return;
    //move my position
    spk.pos+=spk.fact*time; //because you move 1 unit in one second
    var sw=-1;
    if (spk.pos>1) { //next tile
      spk.pos-=1;
      sw=spk.lk.ed;
    } else if (spk.pos<0) {//previous tile
      spk.pos*=-1;
      sw=spk.lk.st;
    }
    if (sw==7) { //we got home
      spk.fx('home');
      spk.stop=true;
      return;
    }
    if (sw>=0) { //seems we are moving to a new hex;
      var outward=h_ni(sw+spk.tile.t_dir);
      var nextTi=spk.tile.t_i+g_dir[outward];
      var nextT=grd.cell[nextTi];
      var inward=h_ni(outward+3-nextT.t_dir);
      var lnk=-1;
      var dir=1;
      for (var i=0;i<nextT.lk.length;i+=1) {
        if (nextT.lk[i].st==inward) {
          lnk=i;
        }
        if (nextT.lk[i].ed==inward) {
          lnk=i;
          spk.pos=1-spk.pos;
          dir=-1;
        }
      }
      if (lnk>=0) {
        spk.fx('hop');
        link(nextTi,lnk,dir);
      } else {
        spk.fx('death');
        spk.stop=true;
        return;
      }
    }
    //position me on the lnk
    var pp=spk.pos*(spk.lk.pts.length-1);
    var ppf=Math.floor(pp);
    var ppd=pp-ppf;
    //interpolate between element ppf and ppf+1
    var x=spk.lk.pts[ppf].x*(1-ppd)+spk.lk.pts[ppf+1].x*ppd;
    var y=spk.lk.pts[ppf].y*(1-ppd)+spk.lk.pts[ppf+1].y*ppd;
    spk.style.transform="translate3d("+(x*25+12.5)+"vmin,"+(y*25+12.5)+"vmin,0)";

    //chirp code
    spk.ch_tm-=time;
    if (spk.ch_tm<0) {
      spk.ch_tm=rdm(.2,1.2);
      spk.fx('chirp')    
    }

  }
  //do a special effect thing
  spk.fx=function(e) {
    ae[e](); //play the sound
    spk.spk_decor.style.animation=e+" 1s 1 forwards"; //do the movement
  }
  spk.fx('start')
  return spk;
}
