var demoLevels=[1,2,3,4,5,8,11,12,14,16,20,21];
var isLocked=true;

document.addEventListener('DOMContentLoaded', initGameSystem, false);

var context=
{
  //parameter storage
  storageSet: function(key,val) { return localStorage.setItem(key,val);},
  storageGet: function(key,val) { return localStorage.getItem(key,val);},
  //licencing information
  isUnlocked: function(lev) { return (!isLocked)||(demoLevels.includes(lev));},
  requestUnlock: function(lev,cb) {
     alert('unlock requested');
     isLocked=false;
     cb(); //call back that licences changed
  },
  getPriceText: function(lev) { return "10 rubles"},

  //general statistics report back
  reportLevelComplete: function(level,stars,time) {
    //special code for beta form displays
    betaFeedbackPosition(lv_id);
  }
}

function betaFeedbackPosition(lev)
{
  var forms=
  {
    2: "https://docs.google.com/forms/d/e/1FAIpQLSdOJQoB_lJGFeXzn3s9RKosmQZYWBYnpooYG0I_Y-2R7rQH-A/viewform?usp=pp_url&entry.867156754=#ID#",
    7: "https://docs.google.com/forms/d/e/1FAIpQLSdhHHPCpxN_w2QFfOUpWw8K0i0j7JHNeqNIAB1sQjyA5p1ORg/viewform?usp=pp_url&entry.867156754=#ID#",
    15: "https://docs.google.com/forms/d/e/1FAIpQLSeOGeB1UrOYU6ddKDaTkX-zAPZGYj9AimQF1XkBq2Pf_Tz-Bg/viewform?usp=pp_url&entry.867156754=#ID#",
    35: "https://docs.google.com/forms/d/e/1FAIpQLSenSbphYBvZ5HBVfMCMl9DX1lNFhSKZuFiyy9-f70_0hEFQ0Q/viewform?usp=pp_url&entry.867156754=#ID#",
    50: "https://docs.google.com/forms/d/e/1FAIpQLScDUsDLbhQBhx39iDwcMAolyerMoq3SqBLs71FyvJTTSPQueQ/viewform?usp=pp_url&entry.867156754=#ID#"
  };

  if (forms[lev]) {
    document.getElementById('formholder').classList.toggle('act',true);
    var lnk=forms[lev].replace("#ID#",analytics_id);
    document.getElementById('formframe').src=lnk;
  }
}
