var t_set = {
  0: "",
  1: "0a",
  2: "0d",
  3: "0e",
  4: "0c",
  5: "0b",
  6: "0b1b",
  7: "0c2b5b",
  8: "0c1a4a",
  9: "0a223a",
  a: "00",
  b: "03",
  c: "04",
  d: "01",
  e: "02",
  f: "013b",
  g: "021c"

};


function drawLnk(s,lk) {
  var cl="255,255,255";
  switch (lk.ty) {
    case 0: cl="0,255,0"; break;
    case 1: cl="255,0,0"; break;
    case 2: cl="0,0,255"; break;
  }
  s.lineStyle("rgba(0,0,0,.5)").lineWidth(1).fillStyle("rgba(0,0,0,.5)")
    .discPath(lk.pts, .03, true);
  s.lineStyle("rgba("+cl+",.8)").lineWidth(1).fillStyle("rgba("+cl+",.5)")
    .discPath(lk.pts, .02, true);
  if (lk.ed==6) { //need to draw the start point
    s.lineStyle("rgba("+cl+",1)").lineWidth(3)
     .circle(.2,0,.1);
  }
  if (lk.ed==7) { //need to draw the end point
    s.lineStyle("rgba("+cl+",.8)").lineWidth(3)
    .line(-.3,-.1,-.1,-.1)
    .line(-.3,.1,-.1,.1)
    .line(-.3,.1,-.3,-.1)
    .line(-.1,.1,-.1,-.1);
  }
}

function drawLnks(s, lk) {
  for (var i = 0; i < lk.length; i += 1)
    drawLnk(s,lk[i]);
}

function tile(ti, at,txt) {
  var tc = document.createElement('div');
  if (txt) tc.innerHTML = txt;
  tc.classList.add('tile');

  tc.lk = [];
  var tds = t_set[ti];
  for (var i = 0; i < tds.length; i += 2) {
    var start = Number(tds.charAt(i));
    var sc=dec(tds.charAt(i + 1));
    var end=0;
    if (sc.val<3)
      end = h_ni(start + sc.val+1);
    else if (sc.val==3)
      end=6;
    else
      end=7;
    tc.lk.push({
      st: start,
      ed: end,
      ty: sc.cls,
      pts: bez(20, h_mx[start], h_my[start], h_mx[end], h_my[end], 0, 0)
    });
  }

  //create the top layer
  tc.t_t = document.createElement('div');
  tc.t_t.classList.add('top');
  var top = gs(200).lineStyle("rgba(0,0,128,.8)").lineWidth(2).fillStyle("rgba(0,0,255,.1)").hex(.95, true);
  drawLnks(top, tc.lk)
  top.setbg(tc.t_t);
  tc.appendChild(tc.t_t);

  //create the bottom layer
  tc.t_b = document.createElement('div');
  tc.t_b.classList.add('bot');
  var bot = gs(200).lineStyle("rgba(0,128,128,.8)").lineWidth(2).hex(.95)
    .echo(10, 0, 0, 0, 0, 0, 0, 1, .1, 1, 0);
  bot.setbg(tc.t_b);
  tc.appendChild(tc.t_b);

  if (at) { //create the action button to get pressed
    tc.t_a = document.createElement('div');
    tc.t_a.classList.add('act');
    var act = gs(200).lineStyle("rgba(255,255,0,1)").lineWidth(1)
    .line(0,-.4,.1,-.35).line(0,-.3,.1,-.35)
    .echo(20, 0, 0, 0, 0, -60 , 0, 1, 1, .1, 1)
      .rotSym(5);
    act.setbg(tc.t_a);
    tc.appendChild(tc.t_a);
    tc.t_a.addEventListener("click", function() { tc.t_dir=tc.t_dir+1; tc.setTransform();});
  }


  tc.style.transform="translate3d(50vmin,-30vmin,0px)"
  tc.setTransformFuture=function(tm) {
    setTimeout(function(){tc.setTransform();},tm*1000);
  };


  tc.setTransform=function()
  {
    var x=ti_to_x(tc.t_i)*25;
    var y=ti_to_y(tc.t_i)*25;
    tc.style.transform="translate3d("+x+"vmin,"+y+"vmin,0vmin) rotateZ("+tc.t_dir*60+"deg)";
  }

  return tc;
}
