function decorate()
{
  //make the timer
  gs(200).lineWidth(5).lineStyle("#FF0")
        .circle(0,0,.45)
        .echo(10,0,0,0,0,0,0,1,.01,.5,.1)
        .setbg(document.getElementById('ti'));

  //make a pause button
  gs(50).lineWidth(5).lineGrad("#FF0","#F80")
        .line(-.1,-.2,-.1,+.2)
        .mirror(1,0)
        .echo(4,0,0,0,0,0,0,1,.1,1,.1)
        .setbg(document.getElementById('s0'));


  var t=gs(50).lineWidth(5).lineGrad("#FF0","#0F0")
        //.lineStyle("#FF0")
        .line(-.1,-.2,.1,0)
        .line(-.1,.2,.1,0)
        .line(-.1,-.2,-.1,+.2);


  t.echo(4,0,0,0,0,0,0,1,.1,1,.1).setbg(document.getElementById('s1'));
  t.echo(2,-.1,0,.3,0,0,0,1,1,1,1)
   .echo(4,0,0,0,0,0,0,1,.1,1,.1)
   .setbg(document.getElementById('s2'));
  t.echo(3,-.2,0,.4,0,0,0,1,1,1,1)
    .echo(4,0,0,0,0,0,0,1,.1,1,.1)
    .setbg(document.getElementById('s3'));

}
