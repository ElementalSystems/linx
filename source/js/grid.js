//utility to store and display a 5 x 6 hex grid

g_dir=[-5,+1,+6,+5,-1,-6];
var activeGrid=null;
var killgl;

//create a grid in the dom element el from the init string
function buildGrid(el,fin,bTm)
{
  //now get the tiles
  var init=fin.substring(6);
  var grd=[];
  var g={
    cell:grd,
    spark: function(tile,lnk) {
      var x=_spark(g,tile,lnk);
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
    var t=tile(init.charAt(i*2),ty.cls);

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
  ti.innerHTML=ot.innerHTML=hm.innerHTML=dd.innerHTML='';

  function gl(t)
  {
    var ft=.01;
    if (st) ft=(t-st)/1000;
    if (ft>.1) ft=.1; //we don't believe in longer frames than 1/10 of a second.
    var gft=ft/2*g.spd;
    st=t;

    spk_time-=gft;
    if ((spk_time<0)&&(spk_count<8)) { //time to launch a wave
      spk_time+=spk_gap;
      spk_count+=1;
      for (var l=0;l<30;l+=1) //search the grid for entry spots
        for (var m=0;m<g.cell[l].lk.length;m+=1)
          if (g.cell[l].lk[m].ed==6) //it's an entry
            g.spark(l,m);

    }

    for (var i=0;i<g.spks.length;i+=1)
      g.spks[i].tick(gft);

    g.l_tm+=gft;
    //update the score board
    ti.innerHTML=g.l_tm.toFixed(1)+'s';
    ot.innerHTML=(g.spk_out*100/g.spk_tot).toFixed(0)+'%';
    hm.innerHTML=(g.spk_home*100/g.spk_tot).toFixed(0)+'%';
    dd.innerHTML=(g.spk_dead*100/g.spk_tot).toFixed(0)+'%';
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
  for (var i=0;i<4;i+=1)
     document.getElementById('s'+i).classList.toggle('active',spd==i)
}
