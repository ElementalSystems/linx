var lev={
  0: "2002020922A1B4000000h1G1b40000c042D3000000A1I534000000A5C50000000000",
  1: "1002424522000000000055520000114a41140000555200000031525a000000001500",
  2: "20304057211300000000606113000010646c0000001d5c140000305a1c0000000000",
  3: "221242671134d1d200b2had400d3c1ffgae1d4215200530000005554000000000000",
  4: "12335355B1E1E1D2000000A1A3D300C3A1FeD400A0AbFeA40000EbFeA40000A0FeA4",
  5: "135222230022000000003353b30000@aied4000000ia1400000000c5000000000000",
  6: "25201014a1b4a2000000fdfafdc40000fafaa40000a0faa40000a1faa4000000a5b5",
  7: "1010202500b1d20000000000d3B30000D1GbD4c3C3A0GcA3a0Gae1d4E000A0E1E1D4",
  8: "21710180122141130040@b41@e008a8c8c3000400000420010414141140000000000",
  9: "152040682113000000005012000011419a530000@e41@b0000505f@d@a0000153000",
  10: "205302080000b2000000c300d30000e000e00000ebe1ea0000000000000000000000",
  11: "102253030000214113d1d2330040b011jda34000c1jejb54000010jdad000000a0af",
  12: "17620204222300000051715200005040425300001f8a1f130000318a540000000000",
  13: "11703244515251240040A2JcA3B340HaIaIaD440IaJaJaA410818cE20000003000C5",
  14: "22709129000012211351@a54@e544033535053408f7a118050108b14150055240000",
  15: "22003036D1E1A3a200E023D0b0d3E09ajaGcd4E030jakdD3A0E1GbkdE00000c0C0B0",
  16: "16530285000000000031418b413412517c1400109a544210225053219b00558b4154",
  17: "10120256B300b30000D000e0C300A2DfGcDc00A0Ha00d3D30000D5GcD400000000c5",
  18: "21110105b1d21212000051ia@e25c1gcd44053003000105400000000000000000000",
  19: "30100241A200235124MbFd4040C3MbF3Jbl0E0MbF3518bk1A0F350401500A0B41f34",
  20: "3541216832a1e1e1a3D1Lakaa1d4C0kakaB2b500kakaA3D311LbkaMbD40025c5C0B5"

};


var lv_id=0;

function levTime(id)
{
  return Number(lev[id].substring(0,2));
}

function exp(com,tm) {
  if (!com) return "Never Attempted";
  var t="Saved <b>"+Number(com).toFixed(0)+"%</b> of the packets ";
  if (com==100)
    t+=" in "+Number(tm).toFixed(1)+"s";
  return t;
}

function expG(com,tm) {
  if ((!com)||(com<50))
    return "Save 50% for 1 Star";
  var tt=levTime(lv_id);
  if (com<100)
      return "Save 100% for 2 Stars";
  if (tm>tt)
      return "Save 100% in "+tt+"s for 3 Stars";
  return "Completed";
}

function decLev(id)
{
  var d=document.getElementById(id);
  d.style.color=t_thm.textc;
  t_thm.bot(d,[]);//no links just background

}

function level(lv) {
  lv_id=lv;
  killGrid(document.getElementById('main'));
  thm(lev[lv_id],document.getElementById('top'));
  //set up start thing
  document.getElementById('dp').classList.toggle('st',true);
  document.getElementById('dp').classList.toggle('ed',false);
  document.getElementById('menu').classList.toggle('act',false);
  document.getElementById('dpl').innerHTML=lv;
  checkStars(document.getElementById('dpst'),lv);
  decLev('dpl');
  document.getElementById('dpr').innerHTML="<i>Best:</i> "+exp(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id));
  document.getElementById('dpt').innerHTML="<i>Goal:</i> "+expG(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id));
  document.getElementById('main').innerHTML='';
  ae.click();
}

function startNext()
{
  level(lv_id+1);
}

function start() {
  document.getElementById('dp').classList.toggle('st',false);
  document.getElementById('dp').classList.toggle('ed',false);
  document.getElementById('menu').classList.toggle('act',false);
  killGrid(document.getElementById('main'));
  setTimeout(function(){  buildGrid(document.getElementById('main'), lev[lv_id],1); },1000);
  ae.levstart();
}

function menu() {
  document.getElementById('dp').classList.toggle('st',false);
  document.getElementById('dp').classList.toggle('ed',false);
  //set up starts
  var menu=document.getElementById('menu');
  var its=menu.childNodes;
  for (var i=1;i<16;i+=1)
    checkStars(its[i],i)
  menu.classList.toggle('act',true);
  killGrid(document.getElementById('main'));
  ae.click();
}

function end(com,tm)
{
  ae.levend();
  //update high scores
  var oc=localStorage.getItem("com_"+lv_id);
  if (!oc) oc=0;
  localStorage.setItem("com_"+lv_id,Math.max(com,oc));
  var otm=localStorage.getItem("tm_"+lv_id);
  if (!otm) otm=999;
  localStorage.setItem("tm_"+lv_id,Math.min(tm,otm));

  document.getElementById('dp').classList.toggle('ed',true);
  if (lv_id) { //if we are not on level 0
    document.getElementById('dpr').innerHTML="<i>Result:</i> "+exp(com,tm);
    document.getElementById('dpt').innerHTML="<i>Goal:</i> "+expG(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id));
  } else {
    document.getElementById('dpr').innerHTML="";
    document.getElementById('dpt').innerHTML="";
  }
}

function addStrs(el,c)
{
  if (!el) return;
  for (var i=0;i<c;i+=1) {
    var d=document.createElement('div');
    d.classList.add('str');
    mkStr(d);
    el.append(d);
  }
}

function checkStars(el,lev)
{
  var c=Number(localStorage.getItem("com_"+lev));
  var t=Number(localStorage.getItem("tm_"+lev));
  var tar=0;
  if (c>=50) tar=1;
  if (c>=100){
    tar=2;
    if (t<=levTime(lev)) tar=3
  }
  var chd = el.childNodes;
  for (var i = 0; i < 3; i++)
     chd[i].classList.toggle('off',((i+1)>tar));
}

function mkLvlMenu()
{
  function itm(i) {
    var e=document.createElement('div');
    var ei=document.createElement('div');
    ei.innerHTML=i;
    if (!lev[i]) return e;
    thm(lev[i],e);
    t_thm.bot(ei,[]);
    addStrs(e,3);
    e.append(ei);
    e.onclick=function() { level(i); }
    return e;
  }
  var m=document.getElementById('menu');
  for (var i=1;i<=20;i+=1)
    m.append(itm(i));
}
