//utility to store and display a 5 x 6 hex grid

g_dir=[-5,+1,+6,+5,-1,-6,0];
var activeGrid=null;
var killgl;

function mkN(n,len,dp)
{
  if (!dp) dp=0;
  return String("          "+Number(n).toFixed(dp)).slice(-len).replace(" ","&nbsp;");
}

//create a grid in the dom element el from the init string
function buildGrid(el,fin,bTm)
{
  //now get the tiles
  var init=fin.substring(9);
  var tilesetindex=fin.charAt(0);
  var grd=[];
  var g={
    cell:grd,
    spark: function(tile,lnk,ty) {
      var x=_spark(g,tile,lnk,ty);
      this.spks.push(x)
      return x;
    },
    spd: 1,
    spk_tot: 0,
    spk_out: 0,
    spk_dead: 0,
    spk_home: 0,
    l_tm:0,
    spks: []
  };
  killgl=true;
  el.innerHTML='';
  for (var i=0;i<30;i+=1) {
    var ty=dec(init.charAt(i*2+1))
    var t=tile(tilesetindex,init.charAt(i*2),ty.cls);

    el.appendChild(t);
    for (var j=0;j<t.lk.length;j+=1)
      if (t.lk[j].ed==6) g.spk_tot+=8;

    t.t_i=i;
    t.t_dir=ty.val;
    if (bTm) t.setTransformFuture(rdm(.5,bTm));
    else t.setTransform();
    grd.push(t)
  }
  activeGrid=g;
  setGS(1);
  //start the game loop
  var st=0;
  var spk_gap=.35;
  var spk_time=0;
  var spk_count=0;
  var ti=document.getElementById('tm');
  var ot=document.getElementById('ot');
  var dd=document.getElementById('dd');
  var hm=document.getElementById('hm');
  ti.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; ot.innerHTML=hm.innerHTML=dd.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;';

  function spk() //make a wave of sparks because it's that time of the game
  {
    spk_time+=spk_gap;
    spk_count+=1;
    for (var l=0;l<30;l+=1) //search the grid for entry spots
      for (var m=0;m<g.cell[l].lk.length;m+=1)
        if (g.cell[l].lk[m].ed==6) {//it's an entry
          var go=true;
          var ty=g.cell[l].lk[m].ty;
          switch (ty) {
            case 0: //four on / six off /four on
              if (spk_count>14) go=false;
              if ((spk_count>4)&&(spk_count<11)) go=false;
              break;
            case 1: //every time for the first eight
              if (spk_count>8) go=false;
              break;
            case 2: //two on / four off for the first 16 counts
              if (spk_count>24) go=false;
              if (((spk_count-1)%6)>1) go=false;
              break;
            case 3: //one three thrre one far apart
              go=false
              if ((spk_count==1)||
                  ((spk_count>=13)&&(spk_count<=15))||
                  ((spk_count>=26)&&(spk_count<=28))||
                  (spk_count==39))
                    go=true;
              break;
            default:
              alert('bad type '+ty);
              break;
          }
          if (go) g.spark(l,m,ty);
        }
  }
  function gl(t)
  {
    var ft=.01;
    if (st) ft=(t-st)/1000;
    if (ft>.1) ft=.1; //we don't believe in longer frames than 1/10 of a second.
    var gft=ft/2*g.spd;
    st=t;

    spk_time-=gft;
    if (spk_time<0)  //time to launch a wave
      spk();


    for (var i=0;i<g.spks.length;i+=1)
      g.spks[i].tick(gft);

    g.l_tm+=gft;
    //update the score board
    ti.innerHTML=mkN(g.l_tm,4,1)+'s';
    ot.innerHTML=mkN(g.spk_out*100/g.spk_tot,3)+'%';
    hm.innerHTML=mkN(g.spk_home*100/g.spk_tot,3)+'%';
    dd.innerHTML=mkN(g.spk_dead*100/g.spk_tot,3)+'%';
    if ((g.spk_home+g.spk_dead)==g.spk_tot)  {//complete
      end(g.spk_home*100/g.spk_tot,g.l_tm);
      return; //so skip out of the game loop
    }
    if (!killgl)
      window.requestAnimationFrame(gl);
  };
  setTimeout(function(){
    killgl=false;
    window.requestAnimationFrame(gl);},bTm*1000);
  return g;
}

function killGrid(el) {
  killgl=true;
  el.innerHTML='';
}


function ti_to_x(i)
{
  return (i%5)*h_k*2;
}

function ti_to_y(i)
{
  return Math.floor(i/5)*h_j*2-(i%5)*h_j;
}

function setGS(spd)
{
  activeGrid.spd=spd;
  for (var i=0;i<4;i+=1) {
     var sel=false;
     switch (i) {
       case 0:  sel=(spd==0); break;
       case 1:  sel=(spd==.5); break;
       case 2:  sel=(spd==1); break;
       case 3:  sel=(spd==2.5); break;
     }
     document.getElementById('s'+i).classList.toggle('active',sel)
  }
}
