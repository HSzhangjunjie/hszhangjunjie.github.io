'use strict';
!function (z) {
    var a = function (t, e, a) {
        var n, r = new Date(), l = r.getDate(), F = r.getMonth(), O = r.getFullYear(), j = l, A = F, S = O, W = a, s = null, o = null, E = {
                posts: [],
                prev: null,
                next: null
            }, u = 'en';
        (n = t) && 'undefined' != typeof calLanguages && calLanguages[n] && (u = n);
        var R = z.extend({}, z.fn.aCalendar.defaults, 'undefined' == typeof calLanguages ? {} : calLanguages[u], e);
        function J() {
            A < 11 ? A++ : (A = 0, S++), d();
        }
        function U() {
            0 < A ? A-- : (A = 11, S--), d();
        }
        function Y(t) {
            t && (S = t.getFullYear(), A = t.getMonth(), d());
        }
        function $() {
            R.single ? null != R.url && '' != R.url && (null === s && z.ajax({
                url: R.url,
                async: !1,
                success: function (t) {
                    s = t, p(Object.keys(s));
                }
            }), null !== s && i() && (E.posts = s[S + '-' + (A + 1)])) : function () {
                null === o && z.ajax({
                    url: R.root + 'list.json',
                    async: !1,
                    success: function (t) {
                        p(t);
                    }
                });
                i() && z.ajax({
                    url: R.root + S + '-' + (A + 1) + '.json',
                    async: !1,
                    success: function (t) {
                        E.posts = t;
                    }
                });
            }();
        }
        function p(t) {
            o = t.map(function (t) {
                var e = t.split('-');
                return new Date(Date.UTC(+e[0], +e[1] - 1));
            });
        }
        function i() {
            var t = Date.UTC(S, A);
            if (null === o || 0 === o.length)
                return !1;
            if (0 === E.posts.length && (null === E.prev && null !== E.next && E.next.getTime() > t || null === E.next && null !== E.prev && E.prev.getTime() < t))
                return !1;
            E.posts = [];
            for (var e = 0; e < o.length; e++) {
                var a = o[e].getTime();
                if (t === a)
                    return E.prev = 0 === e ? null : o[e - 1], E.next = e === o.length - 1 ? null : o[e + 1], !0;
                if (t < a) {
                    E.prev = 0 === e ? null : o[e - 1], E.next = o[e];
                    break;
                }
                E.prev = o[e], E.next = null;
            }
            return !1;
        }
        function N(t, e) {
            var a = {
                'LMM+': R.months[t.getMonth()],
                'MM+': t.getMonth() + 1
            };
            for (var n in (/(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))), a))
                new RegExp('(' + n + ')').test(e) && (e = e.replace(RegExp.$1, 'LMM+' === n ? a[n] : ('00' + a[n]).substr(('' + a[n]).length)));
            return e;
        }
        function d() {
            $();
            var t = new Date(S, A, 1).getDay() - R.weekOffset;
            t <= 0 && (t = 6 - -1 * (t + 1));
            var e = new Date(S, A + 1, 0).getDate(), a = new Date(S, A, 0).getDate() - t + 1, n = z('<div/>').addClass('cal-head'), r = z('<div/>'), l = z('<div/>'), s = z('<div/>').addClass('cal-title');
            l.html(R.headArrows.previous), r.html(R.headArrows.next), curDate = new Date(Date.UTC(S, A)), 0 === E.posts.length ? s.html(N(curDate, R.titleFormat)) : (cTitleLink = z('<a/>').attr('href', N(curDate, R.titleLinkFormat)).attr('title', N(curDate, R.postsMonthTip)).html(N(curDate, R.titleFormat)), s.html(cTitleLink)), l.on('click', U), r.on('click', J), n.append(l), n.append(s), n.append(r);
            for (var o = z('<table/>').addClass('cal'), u = R.weekOffset, p = z('<thead/>'), i = z('<tr/>'), d = 0; d < 7; d++) {
                6 < u && (u = 0);
                var c = z('<th/>').attr('scope', 'col').attr('title', R.dayOfWeek[u]);
                c.html(R.dayOfWeekShort[u]), i.append(c), u++;
            }
            p.append(i), o.append(p);
            var f = z('<tfoot/>'), h = z('<tr/>'), y = z('<td/>').attr('colspan', 3), g = z('<td/>').html('&nbsp;'), v = z('<td/>').attr('colspan', 3);
            E.prev && y.html(R.footArrows.previous + R.months[E.prev.getMonth()]).addClass('cal-foot').attr('title', N(E.prev, R.postsMonthTip)), E.next && v.html(R.months[E.next.getMonth()] + R.footArrows.next).addClass('cal-foot').attr('title', N(E.next, R.postsMonthTip)), y.on('click', function () {
                Y(E.prev);
            }), v.on('click', function () {
                Y(E.next);
            }), h.append(y), h.append(g), h.append(v), f.append(h);
            var m = z('<tbody/>'), M = 1, x = 1;
            for (d = 0; d < 6; d++) {
                for (var D = z('<tr/>'), k = 0; k < 7; k++) {
                    var w = z('<td/>');
                    if (7 * d + k < t)
                        w.addClass('cal-gray'), w.html(a++);
                    else if (M <= e) {
                        M == j && F == A && O == S && w.addClass('cal-today');
                        for (var C = {
                                    num: 0,
                                    keys: []
                                }, T = 0; T < E.posts.length; T++) {
                            new Date(Date.parse(E.posts[T].date)).getDate() == M && (C.keys[C.num++] = T);
                        }
                        if (0 !== C.num) {
                            var b = C.keys[0], L = z('<a>').attr('href', E.posts[b].link).attr('title', E.posts[b].title).html(M++);
                            w.append(L);
                        } else
                            w.html(M++);
                    } else
                        w.addClass('cal-gray'), w.html(x++);
                    D.append(w);
                }
                m.append(D);
            }
            o.append(p), o.append(f), o.append(m), z(W).html(n), z(W).append(o);
        }
        return '/' !== R.root[0] && (R.root = '/' + R.root), '/' !== R.root[R.root.length - 1] && (R.root += '/'), d();
    };
    z.fn.aCalendar = function (t, e) {
        return this.each(function () {
            return a(t, e, z(this));
        });
    }, z.fn.aCalendar.defaults = {
        months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        dayOfWeekShort: ["S","M","T","W","T","F","S"],
        dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        postsMonthTip: 'Posts published in LMM yyyy',
        titleFormat: 'yyyy LMM',
        titleLinkFormat: '/archives/yyyy/MM/',
        headArrows: {
            previous: '<span class="cal-prev"></span>',
            next: '<span class="cal-next"></span>'
        },
        footArrows: {
            previous: '\xAB ',
            next: ' \xBB'
        },
        weekOffset: 0,
        single: !0,
        root: '/calendar/',
        url: '/calendar.json'
    }, z(document).ready(function () {
        z('#calendar').aCalendar('zh-CN');
    });
}(jQuery);