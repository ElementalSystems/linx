function tone(length, type) {
    if (audio_mute) return {
        f: function() {
            return this;
        },
        v: function() {
            return this;
        }
    };
    var current = context.currentTime, oscillator = context.createOscillator(), gain = context.createGain();
    return type && (oscillator.type = type), oscillator.frequency.value = 0, gain.gain.value = 0, 
    oscillator.connect(gain), gain.connect(context.destination), oscillator.start(0), 
    oscillator.stop(current + length), {
        f: function() {
            if (1 == arguments.length) return oscillator.frequency.value = arguments[0], this;
            for (var i = 0; i < arguments.length; i += 1) oscillator.frequency.linearRampToValueAtTime(arguments[i], current + i / (arguments.length - 1) * length);
            return this;
        },
        v: function() {
            if (1 == arguments.length) return gain.gain.value = arguments[0], this;
            for (var i = 0; i < arguments.length; i += 1) gain.gain.linearRampToValueAtTime(arguments[i], current + i / (arguments.length - 1) * length);
            return this;
        }
    };
}

function bez(len, xs, ys, xe, ye, xc, yc) {
    for (var cv = [], i = 0; i < len; i += 1) {
        var t = i / (len - 1), ti = 1 - t;
        cv.push({
            x: ti * ti * xs + 2 * ti * t * xc + t * t * xe,
            y: ti * ti * ys + 2 * ti * t * yc + t * t * ye
        });
    }
    return cv;
}

function decorate() {
    gs(50).lineWidth(5).lineStyle("#FF0").circle(0, -.25, .05).echo(30, 0, 0, 0, 0, 350, 45, 1, 1, .1, 1).setbg(document.getElementById("rs")), 
    gs(50).lineWidth(5).lineStyle("#FF0").hex(.8).echo(5, 0, 0, 0, 0, 10, 0, .1, 1, .5, 1).setbg(document.getElementById("lv")), 
    gs(50).lineWidth(12).lineGrad("#FF0", "#F80").line(-.1, -.2, -.1, .2).mirror(1, 0).setbg(document.getElementById("s0")), 
    gs(50).lineWidth(11).lineGrad("#D80", "#F80").line(.1, -.2, .1, .2).lineGrad("#BA0", "#080").line(-.1, -.2, .1, 0).line(-.1, .2, .1, 0).line(-.1, -.2, -.1, .2).setbg(document.getElementById("s1"));
    var t = gs(50).lineWidth(10).lineGrad("#080", "#0F0").line(-.1, -.2, .1, 0).line(-.1, .2, .1, 0).line(-.1, -.2, -.1, .2);
    t.setbg(document.getElementById("s2")), t.echo(2, -.1, 0, .3, 0, 0, 0, 1, 1, 1, 1).setbg(document.getElementById("s3")), 
    addStrs(document.getElementById("dpst"), 3);
}

function mkStr(el) {
    gs(100).lineStyle("#000").lineWidth(14).line(0, -.35, .2, 0).lineStyle("#FF0").lineWidth(12).line(0, -.35, .2, 0).lineGrad("#F80", "#FF0").lineWidth(8).line(0, -.35, .2, 0).mirror(1, 0).rotSym(5).setbg(el);
}

function mkN(n, len, dp) {
    return dp || (dp = 0), String("          " + Number(n).toFixed(dp)).slice(-len).replace(" ", "&nbsp;");
}

function buildGrid(el, fin, bTm) {
    function spk() {
        spk_time += spk_gap, spk_count += 1;
        for (var l = 0; l < 30; l += 1) for (var m = 0; m < g.cell[l].lk.length; m += 1) if (6 == g.cell[l].lk[m].ed) {
            var go = !0, ty = g.cell[l].lk[m].ty;
            switch (ty) {
              case 0:
                spk_count > 14 && (go = !1), spk_count > 4 && spk_count < 11 && (go = !1);
                break;

              case 1:
                spk_count > 8 && (go = !1);
                break;

              case 2:
                spk_count > 24 && (go = !1), (spk_count - 1) % 6 > 1 && (go = !1);
                break;

              case 3:
                go = !1, (1 == spk_count || 2 == spk_count || spk_count >= 11 && spk_count <= 14 || 23 == spk_count || 24 == spk_count) && (go = !0);
                break;

              default:
                alert("bad type " + ty);
            }
            go && g.spark(l, m, ty);
        }
    }
    function gl(t) {
        var ft = .01;
        st && (ft = (t - st) / 1e3), ft > .1 && (ft = .1);
        var gft = ft / 2 * g.spd;
        st = t, (spk_time -= gft) < 0 && spk();
        for (var i = 0; i < g.spks.length; i += 1) g.spks[i].tick(gft);
        if (g.l_tm += gft, ti.innerHTML = mkN(g.l_tm, 4, 1) + "s", ot.innerHTML = mkN(100 * g.spk_out / g.spk_tot, 3) + "%", 
        hm.innerHTML = mkN(100 * g.spk_home / g.spk_tot, 3) + "%", dd.innerHTML = mkN(100 * g.spk_dead / g.spk_tot, 3) + "%", 
        g.spk_home + g.spk_dead == g.spk_tot) return void end(100 * g.spk_home / g.spk_tot, g.l_tm);
        killgl || window.requestAnimationFrame(gl);
    }
    var init = fin.substring(9), tilesetindex = fin.charAt(0), grd = [], g = {
        cell: grd,
        spark: function(tile, lnk, ty) {
            var x = _spark(g, tile, lnk, ty);
            return this.spks.push(x), x;
        },
        spd: 1,
        spk_tot: 0,
        spk_out: 0,
        spk_dead: 0,
        spk_home: 0,
        l_tm: 0,
        spks: []
    };
    killgl = !0, el.innerHTML = "";
    for (var i = 0; i < 30; i += 1) {
        var ty = dec(init.charAt(2 * i + 1)), t = tile(tilesetindex, init.charAt(2 * i), ty.cls);
        el.appendChild(t);
        for (var j = 0; j < t.lk.length; j += 1) 6 == t.lk[j].ed && (g.spk_tot += 8);
        t.t_i = i, t.t_dir = ty.val, bTm ? t.setTransformFuture(rdm(.5, bTm)) : t.setTransform(), 
        grd.push(t);
    }
    activeGrid = g, setGS(lv_id > 1 ? 0 : 1);
    var st = 0, spk_gap = .35, spk_time = 0, spk_count = 0, ti = document.getElementById("tm"), ot = document.getElementById("ot"), dd = document.getElementById("dd"), hm = document.getElementById("hm");
    return ti.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", ot.innerHTML = hm.innerHTML = dd.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;", 
    setTimeout(function() {
        killgl = !1, window.requestAnimationFrame(gl);
    }, 1e3 * bTm), g;
}

function killGrid(el) {
    killgl = !0, el.innerHTML = "";
}

function ti_to_x(i) {
    return i % 5 * h_k * 2;
}

function ti_to_y(i) {
    return Math.floor(i / 5) * h_j * 2 - i % 5 * h_j;
}

function setGS(spd) {
    activeGrid.spd = spd;
    for (var i = 0; i < 4; i += 1) {
        var sel = !1;
        switch (i) {
          case 0:
            sel = 0 == spd;
            break;

          case 1:
            sel = .5 == spd;
            break;

          case 2:
            sel = 1 == spd;
            break;

          case 3:
            sel = 2.5 == spd;
        }
        document.getElementById("s" + i).classList.toggle("active", sel);
    }
}

function cgrad(ctx, s, c1, c2) {
    var grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
    return grd.addColorStop(0, c1), grd.addColorStop(1, c2), grd;
}

function gs(res) {
    var ngs = Object.create(_gs);
    return res || (res = 100), ngs.res = res, ngs.canvas = document.createElement("canvas"), 
    ngs.canvas.width = res, ngs.canvas.height = res, ngs.ctx = ngs.canvas.getContext("2d"), 
    ngs.ctx.translate(+ngs.canvas.width / 2, +ngs.canvas.height / 2), ngs.ctx.scale(ngs.canvas.width, ngs.canvas.height), 
    ngs.ctx.lineCap = "round", ngs.ctx.textAlign = "center", ngs.ctx.textBaseline = "middle", 
    ngs;
}

function h_ni(i) {
    return (i + 3600) % 6;
}

function levTime(id) {
    return Number(lev[id].substring(1, 3));
}

function exp(com, tm) {
    if (!com) return "Never Attempted";
    var t = "Saved <b>" + Number(com).toFixed(0) + "%</b> of the packets ";
    return 100 == com && (t += " in " + Number(tm).toFixed(1) + "s"), t;
}

function expG(com, tm) {
    var res = "", tt = levTime(lv_id);
    return res += "Save 50% for 1 Star", com >= 50 && (res += " <b>Complete</b>"), res += "<br>Save 100% for 2 Stars", 
    com >= 100 && (res += " <b>Complete</b>"), res += "<br>Save 100% in " + tt + "s for 3 Stars", 
    com >= 100 && tm <= tt && (res += " <b>Complete</b>"), res;
}

function decLev(id) {
    var d = document.getElementById(id);
    d.style.color = t_thm.textc, t_thm.bot(d, []);
}

function level(lv) {
    lv_id = lv, killGrid(document.getElementById("main")), thm(lev[lv_id], document.getElementById("top")), 
    document.getElementById("dp").classList.toggle("st", !0), document.getElementById("dp").classList.toggle("ed", !1), 
    document.getElementById("dp").classList.toggle("fst", !1), document.getElementById("menu").classList.toggle("act", !1), 
    document.getElementById("shr").classList.toggle("act", !1), document.getElementById("dpl").innerHTML = lv, 
    checkStars(document.getElementById("dpst"), lv), decLev("dpl"), document.getElementById("dpr").innerHTML = "<i>Best:</i> " + exp(localStorage.getItem("com_" + lv_id), localStorage.getItem("tm_" + lv_id)), 
    document.getElementById("dpt").innerHTML = "<i>Goals:</i> " + expG(localStorage.getItem("com_" + lv_id), localStorage.getItem("tm_" + lv_id)), 
    document.getElementById("main").innerHTML = "", document.getElementById("ti").classList.toggle("act", !1), 
    document.getElementById("ti2").classList.toggle("act", !1), lv_id && document.getElementById("ti3").classList.toggle("act", !0), 
    ae.click();
}

function startNext() {
    fullScreen(), level(lv_id + 1);
}

function start() {
    document.getElementById("dp").classList.toggle("st", !1), document.getElementById("dp").classList.toggle("ed", !1), 
    document.getElementById("menu").classList.toggle("act", !1), document.getElementById("shr").classList.toggle("act", !1), 
    document.getElementById("levctl").classList.toggle("act", !1), killGrid(document.getElementById("main")), 
    setTimeout(function() {
        buildGrid(document.getElementById("main"), lev[lv_id], 1), lv_id && (document.getElementById("ti").classList.toggle("act", !0), 
        document.getElementById("ti2").classList.toggle("act", !0)), document.getElementById("stut").classList.toggle("show", 2 == lv_id), 
        document.getElementById("ti3").classList.toggle("act", !0);
    }, 1e3), ae.levstart();
}

function menu() {
    document.getElementById("ti").classList.toggle("act", !1), document.getElementById("ti2").classList.toggle("act", !1), 
    document.getElementById("ti3").classList.toggle("act", !1), document.getElementById("shr").classList.toggle("act", !1), 
    document.getElementById("intro").classList.toggle("kill", !0), document.getElementById("levctl").classList.toggle("act", !0), 
    document.getElementById("dp").classList.toggle("st", !1), document.getElementById("dp").classList.toggle("ed", !1), 
    document.getElementById("dp").classList.toggle("fst", !1);
    for (var menu = document.getElementById("menu"), its = menu.childNodes, i = 0; i < 20; i += 1) checkStars(its[i], i + lv_menu_start);
    menu.classList.toggle("act", !0), killGrid(document.getElementById("main")), ae.click(), 
    fullScreen();
}

function end(com, tm) {
    document.getElementById("ti2").classList.toggle("act", !1), document.getElementById("ti3").classList.toggle("act", !1), 
    lv_id && document.getElementById("shr").classList.toggle("act", !0), ae.levend();
    var oc = localStorage.getItem("com_" + lv_id);
    oc || (oc = 0), localStorage.setItem("com_" + lv_id, Math.max(com, oc));
    var otm = localStorage.getItem("tm_" + lv_id);
    otm || (otm = 999), localStorage.setItem("tm_" + lv_id, Math.min(tm, otm)), checkStars(document.getElementById("dpst"), lv_id), 
    lv_id ? (document.getElementById("dpr").innerHTML = "<i>Result:</i> " + exp(com, tm), 
    document.getElementById("dpt").innerHTML = "<i>Goals:</i> " + expG(com, tm), document.getElementById("dp").classList.toggle("ed", !0)) : (document.getElementById("dpr").innerHTML = "The Lost Packets", 
    document.getElementById("dpt").innerHTML = "<i>... an abstract puzzle game in 13kb by elementalsystems ...</i>", 
    document.getElementById("dp").classList.toggle("fst", !0));
}

function addStrs(el, c) {
    if (el) for (var i = 0; i < c; i += 1) {
        var d = document.createElement("div");
        d.classList.add("str"), mkStr(d), el.appendChild(d);
    }
}

function checkStars(el, lev) {
    var c = Number(localStorage.getItem("com_" + lev)), t = Number(localStorage.getItem("tm_" + lev)), tar = 0;
    c >= 50 && (tar = 1), c >= 100 && (tar = 2, t <= levTime(lev) && (tar = 3));
    for (var chd = el.childNodes, i = 0; i < 3; i++) chd[i] && chd[i].classList.toggle("off", i + 1 > tar);
}

function mkLvlMenu() {
    var m = document.getElementById("menu");
    m.innerHTML = "";
    for (var i = lv_menu_start; i < lv_menu_start + 20; i += 1) m.appendChild(function(i) {
        var e = document.createElement("div"), ei = document.createElement("div");
        return ei.innerHTML = i, lev[i] ? (thm(lev[i], e), t_thm.bot(ei, []), addStrs(e, 3), 
        e.appendChild(ei), e.onclick = function() {
            level(i);
        }, e) : e;
    }(i));
}

function setSound(on) {
    ae.click(), audio_mute = !on, ae.click(), document.getElementById("soundon").classList.toggle("act", audio_mute), 
    document.getElementById("soundoff").classList.toggle("act", !audio_mute);
}

function changeLevels(dir) {
    ae.click(), document.getElementById("menu").classList.toggle("act", !1), lv_menu_start += 20 * dir, 
    lv_menu_start < 1 && (lv_menu_start = 1), lv_menu_start > 41 && (lv_menu_start = 41), 
    setTimeout(function() {
        mkLvlMenu(), menu(), ae.click();
    }, 400);
}

function _spark(g, tile, lnk, ty) {
    function link(tile, lnk, dir) {
        spk.fact = dir * spk.spk_spd, spk.tile = g.cell[tile], spk.lk = spk.tile.lk[lnk], 
        spk.tile.appendChild(spk);
    }
    var spk = document.createElement("div");
    spk.classList.add("spk"), spk.spk_ty = ty;
    g.spk_out += 1, spk.spk_decor = document.createElement("div");
    var bg = gs(100);
    switch (spk.spk_ty) {
      case 0:
        spk.spk_spd = .6, bg.lineStyle("rgba(0,255,0,1)").text(String(rdmi(0, 1)) + String(rdmi(0, 1)) + String(rdmi(0, 1)), 0, -.25, 5).mirror(1, 1).echo(3, 0, 0, 0, 0, 0, 90, 1, .1, 1, .1).setbg(spk.spk_decor);
        break;

      case 1:
        spk.spk_spd = 1, bg.lineGrad("rgba(128,128,0,1)", "rgba(255,0,0,1)").lineWidth(15).line(0, .1, 0, .4).line(rdm(-.25, 0), .45, rdm(.1, .25), .45).echo(5, 0, 0, 0, 0, 0, rdm(25, 95), 1, 1, 1, 0).rotSym(rdmi(3, 6)).setbg(spk.spk_decor);
        break;

      case 2:
        spk.spk_spd = 3, bg.lineStyle("#000").lineWidth(25).line(-.3, -.3, .3, .3).lineGrad("rgba(0,0,255,1)", "rgba(0,192,255,1)").lineWidth(20).line(0, 0, .3, .3).lineGrad("rgba(0,192,255,1)", "rgba(0,0,255,1)").lineWidth(20).line(-.3, -.3, 0, 0).echo(10, 0, 0, 0, 0, rdm(-45, 0), rdm(70, 135), 1, 1, 1, .2).setbg(spk.spk_decor);
        break;

      case 3:
        spk.spk_spd = .9;
        var xoff = rdm(-.2, .3), yoff = rdm(-.3, .2);
        bg.lineGrad("rgba(64,128,0,1)", "rgba(192,255,0,.4)").lineWidth(40).line(.5, .5, xoff, yoff).lineGrad("rgba(255,255,0,1)", "rgba(64,192,0,.5)").lineWidth(25).line(.5, .5, xoff, yoff).lineStyle("rgba(255,255,0,.8)").lineWidth(10).line(.5, .5, xoff, yoff).mirror(1, 0).mirror(0, 1).setbg(spk.spk_decor);
    }
    return spk.appendChild(spk.spk_decor), spk.pos = 1, link(tile, lnk, -1), spk.ch_tm = rdm(1, 2), 
    spk.tick = function(time) {
        if (!spk.stop) {
            spk.pos += spk.fact * time;
            var sw = -1;
            if (spk.pos > 1 ? (spk.pos -= 1, sw = spk.lk.ed) : spk.pos < 0 && (spk.pos *= -1, 
            sw = spk.lk.st), 7 == sw) return spk.fx("home", .75), spk.stop = !0, void (g.spk_home += 1);
            if (6 == sw) spk.pos = 1 - spk.pos, spk.fact = -spk.spk_spd; else if (sw >= 0) {
                var outward = h_ni(sw + spk.tile.t_dir), nextTi = spk.tile.t_i + g_dir[outward], nextT = g.cell[nextTi], lnk = -1, dir = 1, postpos = spk.pos;
                if (nextT) {
                    for (var inward = h_ni(outward + 3 - nextT.t_dir), i = 0; i < nextT.lk.length; i += 1) nextT.lk[i].ty == spk.spk_ty && (nextT.lk[i].st == inward && (lnk = i, 
                    dir = 1, postpos = spk.pos), nextT.lk[i].ed == inward && (lnk = i, postpos = 1 - spk.pos, 
                    dir = -1));
                    spk.pos = postpos;
                }
                if (!(lnk >= 0)) return spk.fx("death", .5), spk.stop = !0, void (g.spk_dead += 1);
                spk.fx("hop", .1), link(nextTi, lnk, dir);
            }
            var pp = spk.pos * (spk.lk.pts.length - 1), ppf = Math.floor(pp), ppd = pp - ppf, x = spk.lk.pts[ppf].x * (1 - ppd) + spk.lk.pts[ppf + 1].x * ppd, y = spk.lk.pts[ppf].y * (1 - ppd) + spk.lk.pts[ppf + 1].y * ppd;
            spk.style.transform = "translate3d(" + (25 * x + 12.5) + "vmin," + (25 * y + 12.5) + "vmin,.5vmin)", 
            spk.ch_tm -= time, spk.ch_tm < 0 && (spk.ch_tm = rdm(1.2, 5), spk.fx("chirp", rdm(.1, .3)));
        }
    }, spk.fx = function(e, len) {
        len || (len = .25), e += spk.spk_ty, len /= activeGrid.spd, ae[e](len), spk.spk_decor.style.animation = e + " " + len + "s 1 forwards";
    }, spk.fx("start"), spk;
}

function theme(b, sym, s1, s1v, s2, s2v, c, cv, r, rv, fsc, l) {
    function mod(v, o) {
        return v + rdm(-o, +o);
    }
    function mods(v, o) {
        return (v + rdm(-o, +o) + 720) % 360;
    }
    s1 += rdm(-s1v, +s1v), s2 += rdm(-s2v, +s2v), t_thm = {
        top: function(el, lk) {
            var top = gs(200).lineStyle("hsla(" + mods(s1, s1v) + ",100%," + l + "%,.8)");
            top.lineWidth(2).fillStyle("hsla(" + mods(s1, s1v) + ",100%," + l + "%,.2)").hex(.95, !0), 
            drawLnks(top, lk), top.setbg(el);
        },
        bot: function(el, lk) {
            var bot = gs(200).lineStyle("hsla(" + mod(s2, s2v) + ",50%," + l + "%,.6)");
            switch (b) {
              case 0:
                bot.lineWidth(2).hex(.9);
                break;

              case 1:
                bot.lineStyle("hsla(" + mods(s2, s2v) + ",100%," + l + ",.2)").lineWidth(2).line(.1, .1, .3, .3), 
                bot.lineStyle("hsla(" + mods(s2, s2v) + ",100%," + l + ",.2)").lineWidth(2).line(.1, .1, rdm(.1, .3), rdm(.1, .3)), 
                bot.lineStyle("hsla(" + mods(s2, s2v) + ",100%," + l + ",.2)").lineWidth(2).line(.1, .1, rdm(.1, .3), rdm(.1, .3));
                break;

              case 2:
                bot.lineWidth(.5).fillStyle("hsla(" + mods(s2, s2v) + ",50%," + l + "%,.5)").circle(.3, 0, rdm(.03, .04), !0), 
                bot.fillStyle("hsla(" + mods(s1, s1v) + ",50%," + l + "%,.5)").circle(0, rdm(.01, .25), rdm(.04, .05), !0);
                break;

              case 3:
                bot = bot.lineStyle("hsla(" + mods(s2, s2v) + ",100%," + l + ",.2)").lineWidth(rdm(1.5, 3.5)).line(.1, .1, .3, .3).line(.1, .1, .3, .1).line(.3, .1, .3, .3).mirror(0, 1);
                break;

              case 4:
                bot.lineWidth(2).lineStyle("hsla(" + mods(s2, s2v) + ",50%," + l + "%,.8)").line(.1, .1, .1, rdm(.2, .4)), 
                bot.lineWidth(2).lineStyle("hsla(" + mods(s2, s2v) + ",50%," + l + "%,.8)").line(.1, .1, rdm(.2, .4), .1), 
                bot = bot.mirror(0, 1);
            }
            sym && (bot = bot.rotSym(sym)), bot = bot.echo(mod(c, cv), 0, 0, 0, 0, 0, mod(r, rv), 1, fsc, .7, 0), 
            bot.lineStyle("hsla(" + mods(s1, s1v) + ",70%," + l + "%,.3)").lineWidth(2).hex(.95), 
            drawLnks(bot, lk, !0), bot.setbg(el);
        }
    };
}

function qThm(id, c1, c2, l, bk) {
    switch (id) {
      case "0":
        theme(0, 0, c1, 0, c2, 30, 8, 2, 0, 0, .01, l);
        break;

      case "1":
        theme(0, 0, c1, 30, c2, 0, 12, 4, 30, 0, .1, l);
        break;

      case "2":
        theme(0, 4, c1, 0, c2, 10, 4, 0, 30, 0, .01, l);
        break;

      case "3":
        theme(1, 3, c1, 0, c2, 10, 40, 0, 180, 0, .8, l);
        break;

      case "4":
        theme(1, 6, c1, 30, c2, 10, 15, 0, 50, 20, .8, l);
        break;

      case "5":
        theme(2, 3, c1, 10, c2, 30, 20, 10, 80, 20, 1.2, l);
        break;

      case "6":
        theme(2, 3, c1, 10, c2, 10, 10, 5, 45, 10, .1, l);
        break;

      case "7":
        theme(2, 5, c1, 10, c2, 40, 6, 3, 180, 0, .4, l);
        break;

      case "8":
        theme(3, 3, c1, 10, c2, 30, 10, 0, 30, 15, .5, l);
        break;

      case "9":
        theme(3, 6, c1, 10, c2, 0, 10, 0, 30, 15, .5, l);
        break;

      case "a":
        theme(4, 3, c1, 0, c2, 0, 10, 0, 20, 0, .5, l);
        break;

      case "b":
        theme(4, 6, c1, 10, c2, 30, 1, 0, 0, 0, 1, l);
        break;

      case "c":
        theme(4, 2, c1, 0, c2, 40, 15, 0, 60, 20, 1, l);
    }
    var bl = 95, bl2 = 80, brt = !0;
    l > 70 ? (bl = 0, bl2 = 10, brt = !1) : l > 40 && (bl = 0, bl2 = 20, brt = !1), 
    bk && (bk.style.backgroundImage = "linear-gradient(30deg, hsl(" + c1 + ",90%," + bl + "%), hsl(" + c1 + ",90%," + bl2 + "%))", 
    bk.classList.toggle("brt", brt));
}

function thm(fin, bk) {
    qThm(fin.charAt(3), 10 * Number(fin.substring(4, 6)), 10 * Number(fin.substring(6, 8)), 10 * Number(fin.charAt(8)), bk);
}

function drawLnk(s, lk, sdw) {
    var cl = "255,255,255";
    switch (lk.ty) {
      case 0:
        cl = "0,255,0", s.lineStyle("rgba(0,0,0,.8)").lineWidth(1).fillStyle("rgba(0,0,0,.5)").discPath(lk.pts, .05, !0), 
        sdw || s.lineStyle("rgba(0,192,0,.9)").lineWidth(1).fillStyle("rgba(0,64,0,.4)").discPath(lk.pts, .03, !0, .01).discPath(lk.pts, .02, !0, .01).discPath(lk.pts, .01, !0, .02);
        break;

      case 1:
        cl = "255,0,0", s.lineStyle("rgba(0,0,0,.5)").lineWidth(5).fillStyle("rgba(0,0,0,.5)").discPath(lk.pts, .04, !0), 
        sdw || s.lineStyle("rgba(" + cl + ",.8)").lineWidth(1).fillStyle("rgba(" + cl + ",.5)").discPath(lk.pts, .02, !0);
        break;

      case 2:
        cl = "0,0,255", s.lineStyle("rgba(0,0,0,.8)").lineWidth(8).linePath(lk.pts), sdw || (s.lineStyle("rgba(" + cl + ",.8)").lineWidth(4).linePath(lk.pts), 
        s.lineStyle("rgba(0,192,255,.6)").lineWidth(2).linePath(lk.pts));
        break;

      case 3:
        cl = "192,255,128", s.lineStyle("rgba(0,0,0,.5)").lineWidth(5).plusPath(lk.pts, .05), 
        sdw || (s.lineStyle("rgba(192,128,0,.7)").lineWidth(5).plusPath(lk.pts, .03), s.lineStyle("rgba(" + cl + ",1)").lineWidth(2).plusPath(lk.pts, .025));
    }
    6 == lk.ed && s.lineStyle("rgba(" + cl + ",1)").lineWidth(3).circle(.2, 0, .1), 
    7 == lk.ed && s.lineStyle("rgba(" + cl + ",.8)").lineWidth(3).line(-.3, -.1, -.1, -.1).line(-.3, .1, -.1, .1).line(-.3, .1, -.3, -.1).line(-.1, .1, -.1, -.1);
}

function drawLnks(s, lk, sdw) {
    for (var i = 0; i < lk.length; i += 1) drawLnk(s, lk[i], sdw);
}

function tile(tileSet, ti, at, txt) {
    var tc = document.createElement("div"), tSetIndex = dec(tileSet).val;
    dec(tileSet).cls;
    txt && (tc.innerHTML = txt), tc.classList.add("tile"), tc.lk = [];
    for (var tds = t_set[tSetIndex][ti], i = 0; i < tds.length; i += 2) {
        var start = Number(tds.charAt(i)), sc = dec(tds.charAt(i + 1)), end = 0;
        end = sc.val < 3 ? h_ni(start + sc.val + 1) : 3 == sc.val ? 6 : 7, tc.lk.push({
            st: start,
            ed: end,
            ty: sc.cls,
            pts: bez(20, h_mx[start], h_my[start], h_mx[end], h_my[end], 0, 0)
        });
    }
    if (tc.lk.length > 0 && (tc.t_t = document.createElement("div"), tc.t_t.classList.add("top"), 
    t_thm.top(tc.t_t, tc.lk), tc.appendChild(tc.t_t), tc.t_b = document.createElement("div"), 
    tc.t_b.classList.add("bot"), tc.t_b.style.animation = "hover " + rdm(5, 10) + "s infinite", 
    t_thm.bot(tc.t_b, tc.lk), tc.appendChild(tc.t_b)), at) {
        tc.t_a = document.createElement("div"), tc.t_a.classList.add("act");
        gs(200).lineStyle("rgba(0,0,0,1)").lineWidth(6).line(0, -.4, .1, -.35).line(0, -.3, .1, -.35).lineStyle("rgba(255,255,0,1)").lineWidth(4).line(0, -.4, .1, -.35).line(0, -.3, .1, -.35).echo(10, 0, 0, 0, 0, -60, 0, 1, 1, .1, 1).rotSym(5).setbg(tc.t_a), 
        tc.appendChild(tc.t_a), tc.t_a.addEventListener("click", function() {
            ae.rothex(), tc.t_dir = tc.t_dir + 1, tc.setTransform();
        }), 1 == lv_id && (tc.t_aex = document.createElement("div"), tc.t_aex.innerHTML = "Tap to Rotate Hex", 
        tc.t_aex.classList.add("act_tuttext"), tc.appendChild(tc.t_aex));
    }
    return tc.style.transform = "translate3d(0vmin,0vmin,100vmin)", tc.setTransformFuture = function(tm) {
        setTimeout(function() {
            tc.setTransform(), ae.tiled();
        }, 1e3 * tm);
    }, tc.setTransform = function() {
        var x = 25 * ti_to_x(tc.t_i), y = 25 * ti_to_y(tc.t_i);
        tc.style.transform = "translate3d(" + x + "vmin," + y + "vmin,-.1vmin) rotateZ(" + 60 * tc.t_dir + "deg)";
    }, tc;
}

function dec(at) {
    var v = _dec.indexOf(at);
    return {
        cls: Math.floor(v / 6),
        val: v % 6
    };
}

function rdm(a, b) {
    return a + Math.random() * (b - a);
}

function rdmi(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1));
}

function fullScreen() {
    if (!_fullScreenAttempt) {
        var doc = window.document, docEl = doc.documentElement;
        (docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen).call(docEl), 
        _fullScreenAttempt += 1;
    }
}

function sml(ty) {
    var url = window.location.href, m = "I just completed level " + lv_id + " of #TheLostPackets - a game for #js13k.";
    switch (ty) {
      case "t":
        window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(m), "_blank");
        break;

      case "f":
        window.open("https://www.facebook.com/sharer.php?u=" + encodeURIComponent(url), "_blank");
        break;

      case "u":
        window.open("https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(m), "_blank");
        break;

      case "r":
        window.open("https://reddit.com/submit?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(m), "_blank");
    }
}

var context = new AudioContext(), audio_mute = !1, ae = {
    levstart: function() {
        tone(2, "triangle").v(.2, .4, .2, .7, .2).f(500, 300, 400, 100, 300, 300, 250, 200);
    },
    levend: function() {
        tone(1, "triangle").v(.2, .8, .2).f(300, 250, 400);
    },
    tiled: function() {
        tone(.3).v(.2, .5, 0).f(rdm(200, 350), 480, 450);
    },
    beep: function() {
        tone(1, "square").v(0, 1, 1, 1, 0).f(300);
    },
    spdup: function() {
        tone(1).v(0, .7, .7, .7, .3, .7, .9, .3, 1, 0).f(100, 200);
    },
    spddn: function() {
        tone(1).v(0, 1, 1, 1, .3, .9, .9, .3, .7, 0).f(200, 100);
    },
    click: function() {
        tone(.5).v(1, .1, .8, .2, .5, 0).f(150, 200, 150, 100, 150, 100, 150, 100);
    },
    rothex: function() {
        tone(.3).v(1, .1, .8, .2, .5, 0).f(150, 100, 150, 100, 150, 100, 150, 100), tone(.3).v(0, .1, .1, 0).f(800, 900);
    },
    hop0: function(len) {
        tone(len).v(0, .5, 0).f(150, 200);
    },
    home0: function(len) {
        tone(len).v(1, 1, .1).f(200, 500);
    },
    start0: function(len) {
        tone(len).v(0, 1, .7).f(100, 150);
    },
    death0: function(len) {
        tone(len).v(1, .1, .8, .5, .6, 0).f(250, 200, 250, 150, 200, 150, 200, 150);
    },
    chirp0: function(len) {
        tone(len).v(0, .05, .1, 0).f(300, rdm(350, 400), rdm(350, 400), rdm(350, 400), 200);
    },
    hop1: function(len) {
        tone(len).v(0, .5, rdm(.1, .6), 0).f(200, 250);
    },
    home1: function(len) {
        tone(len).v(1, 1, .1).f(200, 500);
    },
    start1: function(len) {
        tone(len).v(0, 1, .7).f(100, 200);
    },
    death1: function(len) {
        tone(len).v(1, .1, .8, .5, .6, 0).f(250, 200, 250, 150, 200, 150, 200, 150);
    },
    chirp1: function(len) {
        tone(len).v(0, .1, .2, 0).f(600, rdm(650, 700), rdm(650, 700), rdm(650, 700), 500);
    },
    hop2: function(len) {
        tone(len).v(0, .2, 0).f(350, 450);
    },
    home2: function(len) {
        tone(len).v(1, 1, .1).f(200, 500);
    },
    start2: function(len) {
        tone(len).v(0, 1, .7).f(200, 300);
    },
    death2: function(len) {
        tone(len).v(1, .1, .8, .5, .6, 0).f(250, 200, 250, 150, 200, 150, 200, 150);
    },
    chirp2: function(len) {
        tone(len).v(0, .05, .1, 0).f(800, rdm(900, 1e3), rdm(900, 1e3), rdm(900, 1e3), 700);
    },
    hop3: function(len) {
        tone(len).v(0, .3, .5, 0).f(150, 250, 200);
    },
    home3: function(len) {
        tone(len).v(1, 1, .1).f(200, 100, 200, 500);
    },
    start3: function(len) {
        tone(len).v(0, 1, .7, 0).f(180, 250, 180, 200);
    },
    death3: function(len) {
        tone(len).v(1, .1, .8, .5, .6, 0).f(250, 200, 250, 150, 200, 150, 200, 150);
    },
    chirp3: function(len) {
        tone(len).v(.2, .2, .5, 0).f(rdm(200, 300), 200, rdm(200, 300), 200, rdm(200, 300));
    }
};

g_dir = [ -5, 1, 6, 5, -1, -6, 0 ];

var activeGrid = null, killgl, _gs = {
    line: function(x, y, x2, y2) {
        return this.ctx.beginPath(), this.ctx.moveTo(x, y), this.ctx.lineTo(x2, y2), this.ctx.stroke(), 
        this;
    },
    circle: function(x, y, r, fill) {
        return this.ctx.beginPath(), this.ctx.arc(x, y, r, 0, 2 * Math.PI, !1), this.ctx.stroke(), 
        fill && this.ctx.fill(), this;
    },
    lineStyle: function(s) {
        return this.ctx.strokeStyle = s, this;
    },
    fillStyle: function(s) {
        return this.ctx.fillStyle = s, this;
    },
    lineGrad: function(c1, c2) {
        return this.ctx.strokeStyle = cgrad(this.ctx, .5, c1, c2), this;
    },
    fillGrad: function(c1, c2) {
        return this.ctx.fillStyle = cgrad(this.ctx, 15, c1, c2), this;
    },
    lineWidth: function(w) {
        return this.ctx.lineWidth = w / 100, this;
    },
    linePath: function(pts, fill) {
        this.ctx.beginPath(), this.ctx.moveTo(pts[0].x, pts[0].y);
        for (var i = 1; i < pts.length; i += 1) this.ctx.lineTo(pts[i].x, pts[i].y);
        return this.ctx.stroke(), fill && this.ctx.fill(), this;
    },
    discPath: function(pts, r, fill, shk) {
        shk || (shk = 0);
        for (var i = 0; i < pts.length; i += 1) this.ctx.beginPath(), this.ctx.arc(pts[i].x + rdm(-shk, shk), pts[i].y + rdm(-shk, shk), r, 0, 2 * Math.PI), 
        this.ctx.stroke(), fill && this.ctx.fill();
        return this;
    },
    plusPath: function(pts, r) {
        for (var i = 0; i < pts.length; i += 1) {
            var rr = r;
            this.ctx.beginPath(), this.ctx.moveTo(pts[i].x + r, pts[i].y + rr / 2), this.ctx.lineTo(pts[i].x - r, pts[i].y - rr / 2), 
            this.ctx.moveTo(pts[i].x, pts[i].y + r / 4), this.ctx.lineTo(pts[i].x, pts[i].y - r / 4), 
            this.ctx.stroke();
        }
        return this;
    },
    hex: function(w, fill) {
        this.ctx.beginPath(), this.ctx.moveTo(h_vx[5] * w, h_vy[5] * w);
        for (var i = 0; i < 6; i += 1) this.ctx.lineTo(h_vx[i] * w, h_vy[i] * w);
        return this.ctx.stroke(), fill && this.ctx.fill(), this;
    },
    text: function(t, x, y, h, fill) {
        return this.ctx.save(), this.ctx.lineWidth = h / 5, this.ctx.translate(-x, -y), 
        this.ctx.scale(.01 * h, .01 * h), this.ctx.font = "10px sans-serif", fill ? this.ctx.fillText(t, 0, 0) : this.ctx.strokeText(t, 0, 0), 
        this.ctx.restore(), this;
    },
    setbg: function(el) {
        var data = this.canvas.toDataURL();
        return el.style.backgroundImage = "url(" + data + ")", this;
    },
    echo: function(frames, xs, ys, xe, ye, rots, rote, ss, se, alphas, alphae) {
        for (var ngs = gs(this.res), i = 0; i < frames; i += 1) {
            var re = i / frames, rs = 1 - re;
            ngs.ctx.save(), ngs.ctx.rotate((rots * rs + rote * re) * Math.PI / 180), ngs.ctx.translate(xs * rs + xe * re, ys * rs + ye * re), 
            ngs.ctx.scale(ss * rs + se * re, ss * rs + se * re), ngs.ctx.globalAlpha = alphas * rs + alphae * re, 
            ngs.ctx.drawImage(this.canvas, -.5, -.5, 1, 1), ngs.ctx.restore();
        }
        return ngs;
    },
    rotSym: function(num) {
        return this.echo(num, 0, 0, 0, 0, 0, 360, 1, 1, 1, 1);
    },
    mirror: function(x, y) {
        var ngs = gs(this.res);
        return ngs.ctx.drawImage(this.canvas, -.5, -.5, 1, 1), ngs.ctx.scale(x ? -1 : 1, y ? -1 : 1), 
        ngs.ctx.drawImage(this.canvas, -.5, -.5, 1, 1), ngs;
    }
}, h_r = .5, h_i = .25, h_j = .44301, h_k = .375, h_l = .2165, h_vx = [ h_i, h_r, h_i, -h_i, -h_r, -h_i ], h_vy = [ -h_j, 0, h_j, h_j, 0, -h_j ], h_mx = [ 0, h_k, h_k, 0, -h_k, -h_k, .2, -.2 ], h_my = [ -h_j, -h_l, h_l, h_j, h_l, -h_l, 0, 0 ], lev = {
    0: "02002020922A1B4000000h1G1b40000c042D3000000A1I534000000A5C50000000000",
    1: "01602424522000000000055520000114a41140000555200000031525a000000001500",
    2: "020304057211300000000606113000010646c0000001d5c140000305a1c0000000000",
    3: "0221242671134d1d200b2had400d3c1ffgae1d4215200530000005554000000000000",
    4: "012335355B1E1E1D2000000A1A3D300C3A1FeD400A0AbFeA40000EbFeA40000A0FeA4",
    5: "0135222230022000000003353b30000@aied4000000ia1400000000c5000000000000",
    6: "025201014a1b4a2000000fdfafdc40000fafaa40000a0faa40000a1faa4000000a5b5",
    7: "02210202500b1d20000000000d3B30000D1GbD4c3C3A0GcA3a0Gae1d4E000A0E1E1D4",
    8: "021710180122141130040@b41@e008a8c8c3000400000420010414141140000000000",
    9: "0152040682113000000005012000011419a530000@e41@b0000505f@d@a0000153000",
    10: "0205302080000b2000000c300d30000e000e00000ebe1ea0000000000000000000000",
    11: "0322253030000214113d1d2330040b011jda34000c1jejb54000010jdad000000a0af",
    12: "017620204222300000051715200005040425300001f8a1f130000318a540000000000",
    13: "011703244515251240040A2JcA3B340HaIaIaD440IaJaJaA410818cE20000003000C5",
    14: "022709129000012211351@a54@e544033535053408f7a118050108b14150055240000",
    15: "022003036D1E1A3a200E023D0b0d3E09ajaGcd4E030jakdD3A0E1GbkdE00000c0C0B0",
    16: "016530285000000000031418b413412517c1400109a544210225053219b00558b4154",
    17: "015802046B300b30000HaA3e0C300A2HfGcDc00A0Ha00d3D30000D5GcD400000000c5",
    18: "021110105b1d21212000051ia@e25c1gcd44053003000105400000000000000000000",
    19: "030400241A200235124MbFd4040C3MbF3Jbl0E0MbF3518bk1A0F350401500A0B41f34",
    20: "03502020932a1e1e1a3D1Lakaa1d4C0kakaB2b500kakaA3D311LbkaMbD40025c5C0B5",
    21: "13040606800005134000000OC4113235154Q3OA105451QA402141QA51630021416454",
    22: "1187192150000332300000040400051525080135000QDRD8300555440150000001024",
    23: "11800000100120023000030424000515211OD135021PA808300555440150000001024",
    24: "1274030060000000000005152000031Q02353000011P57C000011PAP0140000PA9014",
    25: "115530346000023000000004000005141OAPA345051QA4053001511PD540000001500",
    26: "0106002450000A2A1B400B2B0QAD300QBQCQCF300B0M1QEQC0000C1QAE000000000B0",
    27: "015720184B300C30000D0A2E00000A1QbPB0000D1M0P0PAA3B0D0PBM1D40000A5A5B5",
    28: "11032124800b1aD00000000d0c5000000d0a200e1d1eAe4e3e0a2d0e5e400a5a50000",
    29: "1118080860051240000004023000051QA4000001041NA130000004015000000300000",
    30: "111c12182000000000000511300000020SD13000031SCQA000000506C140000001500",
    31: "110703055b200a2b30000d2e0fDa30000d2gDf3000000dAa50000c1g4a40000000000",
    32: "110b0200300b1a300000000d00000a1d1dAe20000d2eAc4e30000a5e5e40000000000",
    33: "11050404800h3e2000000d0a2h50000fDe4gA0000h200d0e30000e5h0c00000000000",
    34: "1112303060032b300000051nA24000040iA42000050gDe3530000nAa5400000c05554",
    35: "11142429400a2b1e20000gEh1a3e300c0gFe4d000e1e4e5e400g000000000a0a40000",
    36: "1104202230032c2b300e1e28DgD23e021mDmC5400e5e415e300000000000000000000",
    37: "014801275D1D2514113P0JBJFB420PAJCJACA00QAQA40PA00Q0QAI0E1A4B000311400",
    38: "123b10103C3B3231200D0A0qBPB1400E240qC140000qBD45A00003055540000000000",
    39: "120a06069214113A20012D1r0FAD3qCqAr0D2A5E08CR052B5C09A90OAOA0000153515",
    40: "130c1818100e1e20000c2e000h50000eBdAe40000h200e3000000e5e4000000000000",
    41: "123b201050000b3a2001232d0gDgC806AoAg4gC408C40c50010542000000000000000"
}, lv_id = 0, lv_menu_start = 1, t_thm = null, tiles1 = {
    0: "",
    1: "0a",
    2: "0d",
    3: "0e",
    4: "0c",
    5: "0b",
    6: "0b1b",
    7: "0c2b5b",
    8: "0c1a4a",
    9: "0a2a4a",
    "@": "0a2b",
    a: "00",
    b: "03",
    c: "04",
    d: "01",
    e: "02",
    f: "0111",
    g: "021c",
    h: "01311c",
    i: "0b11",
    j: "011b40",
    k: "002a4A",
    l: "0c2B51",
    A: "0A",
    B: "0D",
    C: "0E",
    D: "0B",
    E: "0C",
    F: "0B1B",
    G: "021C",
    H: "0B3A",
    I: "0b3A5B",
    J: "0B3a5b",
    L: "0c1A40",
    M: "0A2A4A",
    N: "0B4B1B3B",
    O: "0a0c3a",
    P: "0A0B3A3B0C",
    Q: "0A0B5A4B0C",
    R: "0a1a2a3a4a"
}, tiles2 = {
    0: "",
    1: "0a",
    2: "0d",
    3: "0e",
    4: "0c",
    5: "0b",
    6: "0b1b",
    7: "0c2b5b",
    8: "0c1a4a",
    9: "0a2a4a",
    a: "0k",
    b: "0n",
    c: "0o",
    d: "0m",
    e: "0l",
    f: "0m0k",
    g: "0m0l",
    h: "0n4l",
    i: "0k5k0m",
    n: "0m1c",
    m: "5b2l4l1b",
    o: "0k3a",
    q: "3A1B5a0b",
    r: "0c1C",
    A: "0A",
    B: "0D",
    C: "0E",
    D: "0B",
    E: "0C",
    F: "0B2B",
    N: "5b2b4b1b",
    O: "0a0c3a",
    P: "0a3a0b3b",
    Q: "0b4b",
    R: "0a1a2a3a4a",
    S: "0c0a"
}, t_set = [ tiles1, tiles2 ], _dec = "012345abcdefABCDEFklmnopKLMNOP", _fullScreenAttempt = 0;
//# sourceMappingURL=scripts.js.map