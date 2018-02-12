var scoreReporter={
  report: function(level,stars,time) {
    //I don't give a shit what the specific level is just write it all back to kongregate as per their directions
    if (window.kongregate) {
      //loop through all levels and check states and send back summaries
      var maxdone=0;
      for (var i=1;i<60;i+=1) {
        if (localStorage.get("com_"+level)==100) maxdone=i;
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
};
