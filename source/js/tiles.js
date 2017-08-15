var t_set = {
  0: "0a2a4a",
  1: "0a2b",
  2: "0c2b5b",
  3: "0b1b",
  4: "0c",
  5: "0b",
  6: "0a"
};


function drawLnks(s, lk) {
  for (var i = 0; i < lk.length; i += 1) {
    s.lineStyle("rgba(0,0,0,.5)").lineWidth(1).fillStyle("rgba(0,0,0,.5)")
      .discPath(lk[i].pts, .05, true);
    s.lineStyle("rgba(255,0,0,.8)").lineWidth(1).fillStyle("rgba(255,0,0,.5)")
      .discPath(lk[i].pts, .03, true);
  }
}

function tile(ti, txt) {
  var tc = document.createElement('div');
  if (txt) tc.innerHTML = txt;
  tc.classList.add('tile');

  tc.lk = [];
  var tds = t_set[ti];
  for (var i = 0; i < tds.length; i += 2) {
    var start = Number(tds.charAt(i));
    var dist = 1;
    var type = 0;
    switch (tds.charAt(i + 1)) {
      case 'b':
        dist = 2;
        break;
      case 'c':
        dist = 3;
        break;
    }
    var end = h_ni(start + dist);
    tc.lk.push({
      st: start,
      ed: end,
      ty: type,
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

  tc.setTransform=function()
  {
    var x=ti_to_x(tc.t_i)*25;
    var y=ti_to_y(tc.t_i)*25;
    tc.style.transform="translate3d("+x+"vmin,"+y+"vmin,0vmin)";
  }

  return tc;
}
