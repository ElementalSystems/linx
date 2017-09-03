function decorate()
{
  //make the restart
  gs(50).lineWidth(5).lineStyle("#FF0")
        .circle(0,-.25,.05)
        .echo(30,0,0,0,0,350,45,1,1,.1,1)
        .setbg(document.getElementById('rs'));

    //make the levels
    gs(50).lineWidth(5).lineStyle("#FF0")
          .hex(.8)
          .echo(5,0,0,0,0,10,0,.1,1,.5,1)
          .setbg(document.getElementById('lv'));

  //make a pause button
  gs(50).lineWidth(12).lineGrad("#FF0","#F80")
        .line(-.1,-.2,-.1,+.2)
        .mirror(1,0)
        .setbg(document.getElementById('s0'));


  var t=gs(50).lineWidth(10).lineGrad("#080","#0F0")
        .line(-.1,-.2,.1,0)
        .line(-.1,.2,.1,0)
        .line(-.1,-.2,-.1,+.2);


  t.setbg(document.getElementById('s1'));
  t.echo(2,-.1,0,.3,0,0,0,1,1,1,1)
   .setbg(document.getElementById('s2'));
  t.echo(3,-.2,0,.4,0,0,0,1,1,1,1)
    .setbg(document.getElementById('s3'));

}
