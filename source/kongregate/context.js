var demoLevels=[1,2,3,4,5,8,10,12,15];
var isKongUnlocked=false;
var callbackKong=null;

//auto start
kongregateAPI.loadAPI(function(){
  window.kongregate = kongregateAPI.getAPI();
  refreshKongregate(); //loads licencing data
  initGameSystem();
  window.kongregate.stats.submit("initialized", 1);
});


function refreshKongregate(cb) {
  kongregate.mtx.requestUserItemList(null, function(result) {
      console.log("User item list received, success: " + result.success);
      isKongUnlocked=false;
      if(result.success) {
        if (result.data[0].identifier=='linxrelease') isKongUnlocked=true;
      }
      if (cb) cb();
    });
}

var context=
{
  //parameter storage
  storageSet: function(key,val) { return localStorage.setItem(key+kongregate.services.getUserId(),val);},
  storageGet: function(key,val) { return localStorage.getItem(key+kongregate.services.getUserId(),val);},
  //licencing information
  isUnlocked: function(lev) { return isKongUnlocked|(demoLevels.includes(lev));},
  requestUnlock: function(lev,cb) {
    kongregate.mtx.purchaseItems(['linxrelease'],function() {
      refreshKongregate(cb);
    })},
  getPriceText: function(lev) { return "50 Kreds"},
  //general statistics report back
  reportLevelComplete: function(level,stars,time) {
    if (window.kongregate) {
      //loop through all levels and check states and send back summaries
      var maxdone=0;
      for (var i=1;i<60;i+=1) {
        if (context.storageGet("com_"+level)==100) maxdone=i;
        else break; //we're done.
      }
      kongregate.stats.submit("BestLevelCompleted", maxdone);
      kongregate.stats.submit("Completed_1", (maxdone>0)?1:0);
      kongregate.stats.submit("Completed_5", (maxdone>=5)?1:0);
      kongregate.stats.submit("Completed_10", (maxdone>=10)?1:0);
      kongregate.stats.submit("Completed_20", (maxdone>=20)?1:0);
      kongregate.stats.submit("Completed_40", (maxdone>=40)?1:0);
      kongregate.stats.submit("Completed_All", (maxdone>=55)?1:0);
    }
  }
}
