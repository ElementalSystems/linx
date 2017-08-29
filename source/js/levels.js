var lev={
  1: "02424522000000000055520000114a41140000555200000031525a000000001500",
  2: "1242671134d1d200b2had400d3c1ffgae1d4215200530000005554000000000000",
  3: "0040430022000000001170130000008a8c1300008c8a1500317b72140000001500",
  4: "504057000000000031418b413412517c1400109a544210225053219b00558b4154",
  5: "304057211300000000606113000010646c0000001d5c140000305a1c0000000000",
  6: "620204222300000051715200005040425300001f8a1f130000318a540000000000"
};


var lv_id=0;

function level(lv) {
   lv_id=lv;
   thm(lev[lv_id]);
   //set up start thing
   document.getElementById('dp').classList.toggle('st',true);
   document.getElementById('dp').classList.toggle('ed',false);
   document.getElementById('dpl').innerHTML=lv;
   document.getElementById('dpr').innerHTML="Best: Never Attempted";
   document.getElementById('dpt').innerHTML="Goal: Save 50% for One Star";
   document.getElementById('main').innerHTML='';
}

function startNext()
{
  level(lv_id+1);
}

function start() {
  document.getElementById('dp').classList.toggle('st',false);
  document.getElementById('dp').classList.toggle('ed',false);
  buildGrid(document.getElementById('main'), lev[lv_id],1);
}

function end(com,tm)
{
  document.getElementById('dp').classList.toggle('ed',true);
  document.getElementById('dpr').innerHTML="You saved "+com+"% in "+tm.toFixed(1)+"s";
  document.getElementById('dpt').innerHTML="Goal: Save 100% for 2 Stars";
}
