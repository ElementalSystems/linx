document.addEventListener('DOMContentLoaded', initGameSystem, false);

var context=
{
  //parameter storage
  storageSet: function(key,val) { return localStorage.setItem(key,val);},
  storageGet: function(key,val) { return localStorage.getItem(key,val);},
  //licencing information
  isUnlocked: function(lev) { return true;},
  requestUnlock: function(lev,cb) {
     cb();
  },
  getPriceText: function(lev) { return "FREE"},

  //general statistics report back
  reportLevelComplete: function(level,stars,time) {
  }
}
