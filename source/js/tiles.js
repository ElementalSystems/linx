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
  9: "0a2a4a",
  '@': "0a2b",
  a: "00",
  b: "03",
  c: "04",
  d: "01",
  e: "02",
  f: "0111",
  g: "021c",
  h: "01311c",
  i: "0b11",
  j: "011b40",
  k: "002a4A",
  l: "0c2B51",
  A: "0A",
  B: "0D",
  C: "0E",
  D: "0B",
  E: "0C",
  F: "0B1B",
  G: "021C",
  H: "0B3A",
  I: "0b3A5B",
  J: "0B3a5b",
  L: "0c1A40",
  M: "0A2A4A"
};

function drawLnk(s, lk, sdw) {
  var cl = "255,255,255";
  switch (lk.ty) {
    case 0:
      cl = "0,255,0";
      s.lineStyle("rgba(0,0,0,.8)").lineWidth(1).fillStyle("rgba(0,0,0,.5)")
        .discPath(lk.pts, .05, true);
      if (!sdw)
        s.lineStyle("rgba(0,192,0,.9)").lineWidth(1).fillStyle("rgba(0,64,0,.4)")
         .discPath(lk.pts, .03, true,.01)
         .discPath(lk.pts, .02, true,.01)
         .discPath(lk.pts, .01, true,.02);

      break;
    case 1:
      cl = "255,0,0";
      s.lineStyle("rgba(0,0,0,.5)").lineWidth(1).fillStyle("rgba(0,0,0,.5)")
        .discPath(lk.pts, .03, true);
      if (!sdw)
        s.lineStyle("rgba(" + cl + ",.8)").lineWidth(1).fillStyle("rgba(" + cl + ",.5)")
        .discPath(lk.pts, .02, true);
      break;
    case 2:
      cl = "0,0,255";
      s.lineStyle("rgba(0,0,0,.5)").lineWidth(7)
        .linePath(lk.pts);
      if (!sdw) {
        s.lineStyle("rgba(" + cl + ",.8)").lineWidth(5).linePath(lk.pts);
        s.lineStyle("rgba(0,192,255,1)").lineWidth(2).linePath(lk.pts);
      }
      break;
  }
  if (lk.ed == 6) { //need to draw the start point
    s.lineStyle("rgba(" + cl + ",1)").lineWidth(3)
      .circle(.2, 0, .1);
  }
  if (lk.ed == 7) { //need to draw the end point
    s.lineStyle("rgba(" + cl + ",.8)").lineWidth(3)
      .line(-.3, -.1, -.1, -.1)
      .line(-.3, .1, -.1, .1)
      .line(-.3, .1, -.3, -.1)
      .line(-.1, .1, -.1, -.1);
  }
}

function drawLnks(s, lk, sdw) {
  for (var i = 0; i < lk.length; i += 1)
    drawLnk(s, lk[i], sdw);
}

function tile(ti, at, txt) {
  var tc = document.createElement('div');
  if (txt) tc.innerHTML = txt;
  tc.classList.add('tile');

  tc.lk = [];
  var tds = t_set[ti];
  for (var i = 0; i < tds.length; i += 2) {
    var start = Number(tds.charAt(i));
    var sc = dec(tds.charAt(i + 1));
    var end = 0;
    if (sc.val < 3)
      end = h_ni(start + sc.val + 1);
    else if (sc.val == 3)
      end = 6;
    else
      end = 7;
    tc.lk.push({
      st: start,
      ed: end,
      ty: sc.cls,
      pts: bez(20, h_mx[start], h_my[start], h_mx[end], h_my[end], 0, 0)
    });
  }
  if (tc.lk.length > 0) {
    //create the top layer
    tc.t_t = document.createElement('div');
    tc.t_t.classList.add('top');
    t_thm.top(tc.t_t, tc.lk);
    tc.appendChild(tc.t_t);
    //create the bottom layer
    tc.t_b = document.createElement('div');
    tc.t_b.classList.add('bot');
    tc.t_b.style.animation = "hover " + rdm(5, 10) + "s infinite";
    t_thm.bot(tc.t_b, tc.lk);
    tc.appendChild(tc.t_b);
  }
  if (at) { //create the action button to get pressed
    tc.t_a = document.createElement('div');
    tc.t_a.classList.add('act');
    var act = gs(200)
    .lineStyle("rgba(0,0,0,1)").lineWidth(6)
    .line(0, -.4, .1, -.35).line(0, -.3, .1, -.35)
    .lineStyle("rgba(255,255,0,1)").lineWidth(4)
    .line(0, -.4, .1, -.35).line(0, -.3, .1, -.35)
    .echo(10, 0, 0, 0, 0, -60, 0, 1, 1, .1, 1)
      .rotSym(5);
    act.setbg(tc.t_a);
    tc.appendChild(tc.t_a);
    tc.t_a.addEventListener("click", function() {
      ae.rothex();
      tc.t_dir = tc.t_dir + 1;
      tc.setTransform();
    });
  }


  tc.style.transform = "translate3d(0vmin,0vmin,100vmin)";
  tc.setTransformFuture = function(tm) {
    setTimeout(function() {
      tc.setTransform();
      ae.tiled();
    }, tm * 1000);
  };


  tc.setTransform = function() {
    var x = ti_to_x(tc.t_i) * 25;
    var y = ti_to_y(tc.t_i) * 25;
    tc.style.transform = "translate3d(" + x + "vmin," + y + "vmin,0vmin) rotateZ(" + tc.t_dir * 60 + "deg)";
  }

  return tc;
}
