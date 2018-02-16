var demoLevels=[1,2,3,4,5,8,10,12,15];
var isKongUnlocked=false;


function refreshKongregate() {
  kongregate.mtx.requestUserItemList(null, function(result) {
      console.log("User item list received, success: " + result.success);
      isKongUnlocked=false;
      if(result.success) {
        if (result.data[0].identifier=='linxrelease') isKongUnlocked=true;
      }
    });
}



var licenceAuth=
{
  isUnlocked: function(lev) { return isUnlocked|(demoLevels.includes(lev));},
  requestUnlock: function(lev) { kongregate.mtx.purchaseItems(['linxrelease'],refreshKongregate)},
  getPriceText: function(lev) { return "50 Kreds"},
  refresh: refreshKongregate
}


//always load the user list
