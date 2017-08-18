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
  gs(50).lineStyle("rgba(255,128,128,1)")
        .lineWidth(10).hex(.8).hex(.4)
        .setbg(spk.spk_decor);

  spk.appendChild(spk.spk_decor);

  function link(tile,lnk,dir) {
    spk.fact=dir;
    spk.tile=grd.cell[tile];
    spk.lk=spk.tile.lk[lnk];
    spk.tile.appendChild(spk);
  }
  spk.pos=1;
  link(tile,lnk,-1); //connect it to the first tile
  //add it's move me forward in time function
  spk.tick=function(time)
  {
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
        link(nextTi,lnk,dir);
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
  }
  return spk;
}
