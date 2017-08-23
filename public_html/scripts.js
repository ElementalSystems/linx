function tone(length, type) {
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
    gs(200).lineWidth(5).lineStyle("#FF0").circle(0, 0, .45).echo(10, 0, 0, 0, 0, 0, 0, 1, .01, .5, .1).setbg(document.getElementById("ti")), 
    gs(50).lineWidth(5).lineGrad("#FF0", "#F80").line(-.1, -.2, -.1, .2).mirror(1, 0).echo(4, 0, 0, 0, 0, 0, 0, 1, .1, 1, .1).setbg(document.getElementById("s0"));
    var t = gs(50).lineWidth(5).lineGrad("#FF0", "#0F0").line(-.1, -.2, .1, 0).line(-.1, .2, .1, 0).line(-.1, -.2, -.1, .2);
    t.echo(4, 0, 0, 0, 0, 0, 0, 1, .1, 1, .1).setbg(document.getElementById("s1")), 
    t.echo(2, -.1, 0, .3, 0, 0, 0, 1, 1, 1, 1).echo(4, 0, 0, 0, 0, 0, 0, 1, .1, 1, .1).setbg(document.getElementById("s2")), 
    t.echo(3, -.2, 0, .4, 0, 0, 0, 1, 1, 1, 1).echo(4, 0, 0, 0, 0, 0, 0, 1, .1, 1, .1).setbg(document.getElementById("s3"));
}

function buildGrid(el, init) {
    function gl(t) {
        var ft = .01;
        st && (ft = (t - st) / 1e3);
        var gft = ft / 2 * g.spd;
        if (st = t, (spk_time -= gft) < 0 && spk_count < 8) {
            spk_time += spk_gap, spk_count += 1;
            for (var l = 0; l < 30; l += 1) for (var m = 0; m < g.cell[l].lk.length; m += 1) 6 == g.cell[l].lk[m].ed && g.spark(g, l, m);
        }
        for (var i = 0; i < g.spks.length; i += 1) g.spks[i].tick(gft);
        window.requestAnimationFrame(gl);
    }
    for (var grd = [], i = 0; i < 30; i += 1) {
        var ty = dec(init.charAt(2 * i + 1)), t = tile(init.charAt(2 * i), ty.cls);
        el.appendChild(t), t.t_i = i, t.t_dir = ty.val, t.setTransform(), grd.push(t);
    }
    var g = {
        cell: grd,
        spark: function(type, grd, tile, lnk) {
            var x = _spark(type, grd, tile, lnk);
            return this.spks.push(x), x;
        },
        spd: 1,
        spks: []
    };
    activeGrid = g, setGS(1);
    var st = 0, spk_gap = .35, spk_time = 0, spk_count = 0;
    return window.requestAnimationFrame(gl), g;
}

function ti_to_x(i) {
    return i % 5 * h_k * 2;
}

function ti_to_y(i) {
    return Math.floor(i / 5) * h_j * 2 - i % 5 * h_j;
}

function setGS(spd) {
    activeGrid.spd = spd;
    for (var i = 0; i < 4; i += 1) document.getElementById("s" + i).classList.toggle("active", spd == i);
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

function start() {
    console.log("start up code");
}

function _spark(grd, tile, lnk) {
    function link(tile, lnk, dir) {
        spk.fact = dir * spk.spk_spd, spk.tile = grd.cell[tile], spk.lk = spk.tile.lk[lnk], 
        spk.tile.appendChild(spk);
    }
    var spk = document.createElement("div");
    spk.classList.add("spk"), spk.spk_ty = grd.cell[tile].lk[lnk].ty;
    spk.spk_decor = document.createElement("div");
    var bg = gs(50);
    switch (spk.spk_ty) {
      case 0:
        spk.spk_spd = .6, bg.lineStyle("rgba(0,255,0,1)").lineWidth(10).hex(.8).hex(.4).echo(5, 0, .2, 0, 0, 0, 0, 1, 1, 1, .5).setbg(spk.spk_decor);
        break;

      case 1:
        spk.spk_spd = 1, bg.lineGrad("rgba(192,192,0,1)", "rgba(255,0,0,1)").lineWidth(15).line(0, .1, 0, .4).line(rdm(-.25, 0), .45, rdm(.1, .25), .45).echo(5, 0, 0, 0, 0, 0, rdm(25, 95), 1, 1, 1, 0).rotSym(rdmi(3, 6)).setbg(spk.spk_decor);
        break;

      case 2:
        spk.spk_spd = 2, bg.lineStyle("#000").lineWidth(20).line(-.3, -.3, .3, .3).lineGrad("rgba(0,0,64,1)", "rgba(0,0,255,1)").lineWidth(15).line(-.3, -.3, .3, .3).echo(10, 0, 0, 0, 0, rdm(-45, 0), rdm(45, 135), 1, 1, 1, .2).setbg(spk.spk_decor);
    }
    return spk.appendChild(spk.spk_decor), spk.pos = 1, link(tile, lnk, -1), spk.ch_tm = rdm(.1, 1), 
    spk.tick = function(time) {
        if (!spk.stop) {
            spk.pos += spk.fact * time;
            var sw = -1;
            if (spk.pos > 1 ? (spk.pos -= 1, sw = spk.lk.ed) : spk.pos < 0 && (spk.pos *= -1, 
            sw = spk.lk.st), 7 == sw) return spk.fx("home"), void (spk.stop = !0);
            if (sw >= 0) {
                for (var outward = h_ni(sw + spk.tile.t_dir), nextTi = spk.tile.t_i + g_dir[outward], nextT = grd.cell[nextTi], inward = h_ni(outward + 3 - nextT.t_dir), lnk = -1, dir = 1, i = 0; i < nextT.lk.length; i += 1) nextT.lk[i].ty == spk.spk_ty && (nextT.lk[i].st == inward && (lnk = i), 
                nextT.lk[i].ed == inward && (lnk = i, spk.pos = 1 - spk.pos, dir = -1));
                if (!(lnk >= 0)) return spk.fx("death"), void (spk.stop = !0);
                spk.fx("hop"), link(nextTi, lnk, dir);
            }
            var pp = spk.pos * (spk.lk.pts.length - 1), ppf = Math.floor(pp), ppd = pp - ppf, x = spk.lk.pts[ppf].x * (1 - ppd) + spk.lk.pts[ppf + 1].x * ppd, y = spk.lk.pts[ppf].y * (1 - ppd) + spk.lk.pts[ppf + 1].y * ppd;
            spk.style.transform = "translate3d(" + (25 * x + 12.5) + "vmin," + (25 * y + 12.5) + "vmin,0)", 
            spk.ch_tm -= time, spk.ch_tm < 0 && (spk.ch_tm = rdm(.2, 1.2), spk.fx("chirp"));
        }
    }, spk.fx = function(e) {
        ae[e](), spk.spk_decor.style.animation = e + " 1s 1 forwards";
    }, spk.fx("start"), spk;
}

function drawLnk(s, lk, sdw) {
    var cl = "255,255,255";
    switch (lk.ty) {
      case 0:
        cl = "0,255,0";
        break;

      case 1:
        cl = "255,0,0";
        break;

      case 2:
        cl = "0,0,255";
    }
    s.lineStyle("rgba(0,0,0,.5)").lineWidth(1).fillStyle("rgba(0,0,0,.5)").discPath(lk.pts, .03, !0), 
    sdw || s.lineStyle("rgba(" + cl + ",.8)").lineWidth(1).fillStyle("rgba(" + cl + ",.5)").discPath(lk.pts, .02, !0), 
    6 == lk.ed && s.lineStyle("rgba(" + cl + ",1)").lineWidth(3).circle(.2, 0, .1), 
    7 == lk.ed && s.lineStyle("rgba(" + cl + ",.8)").lineWidth(3).line(-.3, -.1, -.1, -.1).line(-.3, .1, -.1, .1).line(-.3, .1, -.3, -.1).line(-.1, .1, -.1, -.1);
}

function drawLnks(s, lk, sdw) {
    for (var i = 0; i < lk.length; i += 1) drawLnk(s, lk[i], sdw);
}

function tile(ti, at, txt) {
    var tc = document.createElement("div");
    txt && (tc.innerHTML = txt), tc.classList.add("tile"), tc.lk = [];
    for (var tds = t_set[ti], i = 0; i < tds.length; i += 2) {
        var start = Number(tds.charAt(i)), sc = dec(tds.charAt(i + 1)), end = 0;
        end = sc.val < 3 ? h_ni(start + sc.val + 1) : 3 == sc.val ? 6 : 7, tc.lk.push({
            st: start,
            ed: end,
            ty: sc.cls,
            pts: bez(20, h_mx[start], h_my[start], h_mx[end], h_my[end], 0, 0)
        });
    }
    if (tc.t_t = document.createElement("div"), tc.t_t.classList.add("top"), t_thm.top(tc.t_t, tc.lk), 
    tc.appendChild(tc.t_t), tc.t_b = document.createElement("div"), tc.t_b.classList.add("bot"), 
    tc.t_b.style.animation = "hover " + rdm(5, 10) + "s infinite", t_thm.bot(tc.t_b, tc.lk), 
    tc.appendChild(tc.t_b), at) {
        tc.t_a = document.createElement("div"), tc.t_a.classList.add("act");
        gs(200).lineStyle("rgba(255,255,0,1)").lineWidth(1).line(0, -.4, .1, -.35).line(0, -.3, .1, -.35).echo(20, 0, 0, 0, 0, -60, 0, 1, 1, .1, 1).rotSym(5).setbg(tc.t_a), 
        tc.appendChild(tc.t_a), tc.t_a.addEventListener("click", function() {
            tc.t_dir = tc.t_dir + 1, tc.setTransform();
        });
    }
    return tc.style.transform = "translate3d(50vmin,-30vmin,0px)", tc.setTransformFuture = function(tm) {
        setTimeout(function() {
            tc.setTransform();
        }, 1e3 * tm);
    }, tc.setTransform = function() {
        var x = 25 * ti_to_x(tc.t_i), y = 25 * ti_to_y(tc.t_i);
        tc.style.transform = "translate3d(" + x + "vmin," + y + "vmin,0vmin) rotateZ(" + 60 * tc.t_dir + "deg)";
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

var context = new AudioContext(), ae = {
    beep: function() {
        tone(1, "square").v(0, 1, 1, 1, 0).f(300);
    },
    hop: function() {
        tone(.25).v(0, 1, 1, 1, 0).f(300);
    },
    home: function() {
        tone(1.5).v(1, 1, 1, 1, 0).f(100, 300, 100, 200, 100, 150, 50);
    },
    start: function() {
        tone(1).v(0, 1, .7).f(400, 100, 400, 100, 300, 300, 300, 300);
    },
    death: function() {
        tone(2).v(1, 0, .8, 0, .5, 0).f(150, 100);
    },
    chirp: function() {
        tone(.1).v(0, 1, 1, .5).f(500, 1e3, 500);
    },
    spdup: function() {
        tone(1).v(0, .7, .7, .7, .3, .7, .9, .3, 1, 0).f(100, 200);
    },
    spddn: function() {
        tone(1).v(0, 1, 1, 1, .3, .9, .9, .3, .7, 0).f(200, 100);
    },
    click: function() {
        tone(.1).v(0, .3, .5).f(100, 100, 200);
    }
};

g_dir = [ -5, 1, 6, 5, -1, -6 ];

var activeGrid = null, _gs = {
    line: function(x, y, x2, y2) {
        return this.ctx.beginPath(), this.ctx.moveTo(x, y), this.ctx.lineTo(x2, y2), this.ctx.stroke(), 
        this;
    },
    circle: function(x, y, r) {
        return this.ctx.beginPath(), this.ctx.arc(x, y, r, 0, 2 * Math.PI, !1), this.ctx.stroke(), 
        this;
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
    discPath: function(pts, r, fill) {
        for (var i = 0; i < pts.length; i += 1) this.ctx.beginPath(), this.ctx.arc(pts[i].x, pts[i].y, r, 0, 2 * Math.PI), 
        this.ctx.stroke(), fill && this.ctx.fill();
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
    1: "22000000000055520000114a41140000555200000031525a000000001500",
    3: "0022000000001170130000008a8c1300008c8a1500317b72140000001500",
    4: "000000000031418b413412517c1400109a544210225053219b00558b4154",
    5: "211310000000606113000010646c0000001d5c140000305a1c0000000000",
    6: "222300000051715200005040425300001f8a1f130000318a540000000000"
}, t_set = {
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
    a: "00",
    b: "03",
    c: "04",
    d: "01",
    e: "02",
    f: "013b",
    g: "021c"
}, t_thm = {
    c1: "#",
    c2: "",
    top: function(el, lk) {
        var top = gs(200).lineStyle("rgba(0,0,128,.8)").lineWidth(2).fillStyle("rgba(0,0,255,.1)").hex(.95, !0);
        drawLnks(top, lk), top.setbg(el);
    },
    bot: function(el, lk) {
        var bot = gs(200).lineStyle("rgba(0,128,128,.8)").lineWidth(2).hex(.95).echo(10, 0, 0, 0, 0, 0, 0, 1, .1, 1, 0);
        drawLnks(bot, lk, !0), bot.setbg(el);
    }
}, _dec = "012345abcdefABCDEF";
//# sourceMappingURL=scripts.js.map