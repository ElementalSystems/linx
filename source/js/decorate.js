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

  //make a slow play button
  gs(50).lineWidth(11).lineGrad("#D80","#F80")
        .line(.1,-.2,.1,+.2)
        .lineGrad("#BA0","#080")
        .line(-.1,-.2,.1,0).line(-.1,.2,.1,0).line(-.1,-.2,-.1,+.2)
        .setbg(document.getElementById('s1'));

  //play button
  var t=gs(50).lineWidth(10).lineGrad("#080","#0F0")
        .line(-.1,-.2,.1,0).line(-.1,.2,.1,0).line(-.1,-.2,-.1,+.2);

  t.setbg(document.getElementById('s2'));
  t.echo(2,-.1,0,.3,0,0,0,1,1,1,1)
   .setbg(document.getElementById('s3'));

  //levels next
  gs(50).lineWidth(10).lineGrad("#884","#FF8")
        .line(-.3,-.3,.1,0).line(-.3,.3,.1,0)
        .echo(5,-.2,0,.3,0,0,0,1,1,.1,1)
        .setbg(document.getElementById('lvnext'));
  gs(50).lineWidth(10).lineGrad("#884","#FF8")
        .line(.3,-.3,-.1,0).line(.3,.3,-.1,0)
        .echo(5,.2,0,-.3,0,0,0,1,1,.1,1)
        .setbg(document.getElementById('lvprev'));


  addStrs(document.getElementById('dpst'),3);

}



function mkStr(el) {
  gs(100).lineStyle('#000').lineWidth(14).line(0,-.35,.2,0)
         .lineStyle('#FF0').lineWidth(12).line(0,-.35,.2,0)
         .lineGrad('#F80',"#FF0").lineWidth(8).line(0,-.35,.2,0)
     .mirror(1,0)
     .rotSym(5)
     .setbg(el);
}
