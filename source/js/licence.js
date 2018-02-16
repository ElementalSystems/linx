var demoLevels=[1,2,3,4,5,8,10,12,15];
var isLocked=true;

var licenceSource=
{
  isUnlocked: function(lev) { return (!isLocked)||(demoLevels.includes(lev));},
  requestUnlock: function(lev,cb) {
     alert('unlock requested');
     isLocked=false;
     cb(); //call back that licences changed
  },
  getPriceText: function(lev) { return "10 rubles"},
  refresh: function() {}
}
