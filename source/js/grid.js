//utility to store and display a 5 x 6 hex grid

g_dir=[-5,+1,+6,+5,-1,-6];
var activeGrid=null;
//create a grid in the dom element el from the init string
function buildGrid(el,fin)
{
  //first extract theme
  qThm(Number(fin.charAt(0)),Number(fin.substring(1,3))*10,
                             Number(fin.substring(3,5))*10,Number(fin.charAt(5))*10);
  //now get the tiles
  var init=fin.substring(6);
  var grd=[];
  for (var i=0;i<30;i+=1) {
    var ty=dec(init.charAt(i*2+1))
    var t=tile(init.charAt(i*2),ty.cls);

    el.appendChild(t);
    t.t_i=i;
    t.t_dir=ty.val;
    //t.setTransformFuture(i%10*.1);
    t.setTransform();
    grd.push(t)
  }
  var g={
    cell:grd,
    spark: function(type,grd,tile,lnk) {
      var x=_spark(type,grd,tile,lnk);
      this.spks.push(x)
      return x;
    },
    spd: 1,
    spks: []
  };
  activeGrid=g;
  setGS(1);
  //start the game loop
  var st=0;
  var spk_gap=.35;
  var spk_time=0;
  var spk_count=0;
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
            g.spark(g,l,m);

    }

    for (var i=0;i<g.spks.length;i+=1)
      g.spks[i].tick(gft);
    window.requestAnimationFrame(gl);
  };
  window.requestAnimationFrame(gl);

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
