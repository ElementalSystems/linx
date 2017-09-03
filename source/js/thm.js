var t_thm=null;

function theme(b,sym,s1,s1v,s2,s2v,c,cv,r,rv,fsc,l)
{
  s1+=rdm(-s1v,+s1v);
  s2+=rdm(-s2v,+s2v);
  function mod(v,o) { return v+rdm(-o,+o);}
  function mods(v,o) { return (v+rdm(-o,+o)+720)%360;}
  t_thm={ //set up the global theme
    top: function(el,lk) {
      var top = gs(200).lineStyle("hsla("+mods(s1,s1v)+",100%,"+l+"%,.8)");
      top.lineWidth(2).fillStyle("hsla("+mods(s1,s1v)+",100%,"+l+"%,.2)")
          .hex(.95, true);
      drawLnks(top, lk)
      top.setbg(el);
    },
    bot: function(el,lk) {
      var bot = gs(200).lineStyle("hsla("+mod(s2,s2v)+",50%,"+l+"%,.6)");
      switch (b) {
        case 0: bot.lineWidth(2).hex(.9); break;
        case 1: bot.lineStyle("hsla("+mods(s2,s2v)+",100%,"+l+",.2)").lineWidth(2).line(.1,.1,.3,.3); break;
        case 2: bot.lineWidth(0.5).fillStyle("hsla("+mods(s2,s2v)+",50%,"+l+"%,.5)").circle(.3,0,rdm(.03,.04),true);
                bot.fillStyle("hsla("+mods(s1,s1v)+",50%,"+l+"%,.5)").circle(0,rdm(.01,.25),rdm(.04,.05),true);
                break;
      }
      if (sym) bot=bot.rotSym(sym);

      bot=bot.echo(mod(c,cv), 0, 0, 0, 0, 0, mod(r,rv), 1, fsc, .7, 0);
      bot.lineStyle("hsla("+mods(s1,s1v)+",70%,"+l+"%,.3)").lineWidth(2).hex(.95);

      drawLnks(bot, lk,true)
      bot.setbg(el);
    }
  }
}

function qThm(id,c1,c2,l,bk)
{
  switch (id) {
    case 0: theme(0,0,c1,0,c2,30,8,2,0,0,.01,l); break;
    case 1: theme(0,0,c1,30,c2,0,12,4,30,0,.1,l); break;
    case 2: theme(0,4,c1,0,c2,10,6,0,0,0,.01,l); break;
    case 3: theme(1,3,c1,0,c2,10,40,0,180,0,.8,l); break;
    case 4: theme(1,6,c1,30,c2,10,15,0,50,20,.8,l); break;
    case 5: theme(2,3,c1,10,c2,30,20,10,80,20,1.2,l); break;
    case 6: theme(2,3,c1,10,c2,10,10,5,45,10,.1,l); break;
    case 7: theme(2,5,c1,10,c2,40,6,3,180,0,.4,l); break;
  }
  //also set up the background
  var bl=95;
  var bl2=80;
  var brt=true;
  if (l>70) {
    bl=0;
    bl2=10;
    brt=false;
  } else if (l>40) {
    bl=0;
    bl2=20;
    brt=false;
  }
  if (bk) {
    bk.style.backgroundImage="linear-gradient(30deg, hsl("+c1+",90%,"+bl+"%), hsl("+c1+",90%,"+bl2+"%))";
    bk.classList.toggle('brt',brt);
  }
}

function thm(fin,bk) {
  qThm(Number(fin.charAt(0)),Number(fin.substring(1,3))*10,Number(fin.substring(3,5))*10,Number(fin.charAt(5))*10,bk);
}
