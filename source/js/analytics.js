(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-60046020-10', 'auto');
var anaytics_id='';
ga(function(tracker) {
  analytics_id=tracker.get('clientId');
});
ga('send', 'pageview');

function analytics_event(type,label,value)
{
  ga('send', 'event', 'game',type,label,value);
}
