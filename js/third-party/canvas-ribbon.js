'use strict';
!function () {
    var e = document.getElementById('ribbon');
    if ('false' != e.getAttribute('mobile') || !/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
        var o, a, t = {
                z: f(e, 'zIndex', -1),
                a: f(e, 'alpha', 0.6),
                s: f(e, 'size', 90),
                c: f(e, 'data-click', !0)
            }, n = document.createElement('canvas'), c = n.getContext('2d'), i = window.devicePixelRatio || 1, r = window.innerWidth, d = window.innerHeight, l = t.s, s = Math, u = 0, h = 2 * s.PI, g = s.cos, b = s.random;
        n.id = 'ribbon-canvas', n.width = r * i, n.height = d * i, c.scale(i, i), c.globalAlpha = t.a, n.style.cssText = 'opacity: ' + t.a + ';position:fixed;top:0;left:0;z-index: ' + t.z + ';width:100%;height:100%;pointer-events:none;', document.getElementsByTagName('body')[0].appendChild(n), 'false' !== t.c && (document.onclick = m, document.ontouchstart = m), m();
    }
    function f(e, t, n) {
        return !0 === n ? e.getAttribute(t) || n : Number(e.getAttribute(t)) || n;
    }
    function m() {
        for (c.clearRect(0, 0, r, d), o = [{x:0,y:.7*d+l},{x:0,y:.7*d-l}]; o[1].x < r + l;)
            x(o[0], o[1]);
    }
    function x(e, t) {
        c.beginPath(), c.moveTo(e.x, e.y), c.lineTo(t.x, t.y);
        var n = t.x + (2 * b() - 0.25) * l, i = function e(t) {
                a = t + (2 * b() - 1.1) * l;
                return d < a || a < 0 ? e(t) : a;
            }(t.y);
        c.lineTo(n, i), c.closePath(), u -= h / -50, c.fillStyle = '#' + (127 * g(u) + 128 << 16 | 127 * g(u + h / 3) + 128 << 8 | 127 * g(u + h / 3 * 2) + 128).toString(16), c.fill(), o[0] = o[1], o[1] = {
            x: n,
            y: i
        };
    }
}();