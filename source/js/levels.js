var lev={
  1: "02424522000000000055520000114a41140000555200000031525a000000001500",
  2: "6040682113000000005012000011419a530000@e415b0000005f1e000000003000",
  3: "1242671134d1d200b2had400d3c1ffgae1d4215200530000005554000000000000",
  4: "335355B1E1E1D2000000A1A3D300C3A1FeD400A0AbFeA40000EbFeA40000A0FeA4",
  5: "5222230022000000003353b30000@aied4000000ia1400000000c5000000000000",
  6: "0040430022000000001170130000008a8c1300008c8a1500317b72140000001500",
  7: "504057000000000031418b413412517c1400109a544210225053219b00558b4154",
  8: "304057211300000000606113000010646c0000001d5c140000305a1c0000000000",
  9: "620204222300000051715200005040425300001f8a1f130000318a540000000000",
  10: "604128000012211351@a54@e544033535053408f7a118050108b14150055240000",
  11: "5302080000b2000000c300d30000e000e00000ebe1ea0000000000000000000000",
  12: "10202500b1d20000000000d3B30000D1GbD4c3C3A0GcA3a0Gae1d4E000A0E1E1D4",
  13: "2253030000214113d1d2330040b011jda34000c1jejb54000010jdad000000a0af"
};


var lv_id=0;

function exp(com,tm) {
  if (!com) return "Never Attempted";
  var t="<b>"+com+"%</b> of the packets ";
  if (com==100)
    t+=" in "+Number(tm).toFixed(1)+"s";
  return t;
}

function expG(com,tm) {
  if ((!com)||(com<50))
    return "Save 50% for 1*";
  if (com<100)
      return "Save 100% for 2*";
  return "Save 100% in x.xs 3*";
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
   decLev('dpl');
   document.getElementById('dpr').innerHTML="Your best: "+exp(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id));
   document.getElementById('dpt').innerHTML="Goal: "+expG(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id));
   document.getElementById('main').innerHTML='';

}

function startNext()
{
  level(lv_id+1);
}

function start() {
  document.getElementById('dp').classList.toggle('st',false);
  document.getElementById('dp').classList.toggle('ed',false);
  document.getElementById('menu').classList.toggle('act',false);
  buildGrid(document.getElementById('main'), lev[lv_id],1);
}

function menu() {
  document.getElementById('dp').classList.toggle('st',false);
  document.getElementById('dp').classList.toggle('ed',false);
  document.getElementById('menu').classList.toggle('act',true);
  killGrid(document.getElementById('main'));
}


function end(com,tm)
{
  //update high scores
  var oc=localStorage.getItem("com_"+lv_id);
  if (!oc) oc=0;
  localStorage.setItem("com_"+lv_id,Math.max(com,oc));
  var otm=localStorage.getItem("tm_"+lv_id);
  if (!otm) otm=999;
  localStorage.setItem("tm_"+lv_id,Math.min(tm,otm));

  document.getElementById('dp').classList.toggle('ed',true);
  document.getElementById('dpr').innerHTML="You saved "+exp(com,tm);
  document.getElementById('dpt').innerHTML="Goal: "+expG(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id));
}


function mkLvlMenu()
{
  function itm(i) {
    var e=document.createElement('div');
    var ei=document.createElement('div');
    ei.innerHTML=i;
    thm(lev[i],e);
    t_thm.bot(ei,[]);
    e.append(ei);
    e.onclick=function() { level(i); }
    return e;
  }
  var m=document.getElementById('menu');
  for (var i=1;i<=20;i+=1)
    m.append(itm(i))

}
