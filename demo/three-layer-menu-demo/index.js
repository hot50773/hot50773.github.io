$(document).ready(function () {
  $(".hamburger-wrap").on("click", function () {
    $(".menu-content-wrap").fadeIn(function () {
      $("body").addClass("active");
    });
  });
  $(".menu-close").on("click", function () {
    $(".menu-content-wrap").fadeOut(function () {
      $("body").removeClass("active");
    });
  });
  $(".js-slide").on("click", function () {
    var t = $(this).parent().parent().parent().parent(),
      n;
    t.addClass("menu-activate-slide");
    n = $(document.getElementById(this.dataset.id));
    n.removeClass("hide");
    n.siblings().addClass("hide");
  });
  $(".menu-back-btn").on("click", function () {
    var n = $(this).parent().parent().parent().parent();
    n.removeClass("menu-activate-slide");
    n.find(".menu-activate-slide").removeClass("menu-activate-slide");
  });
}),
  (function () {
    $("#main-loading").fadeOut(function () {
      $(this).remove();
    });
  })(),
  (function () {
    var i = location.pathname.toLowerCase(),
      u = location.search.toLowerCase(),
      o = u.indexOf("?") !== -1 ? u.substr(1) : "",
      s = o.split("&").map(function (n) {
        return n.split("=");
      }),
      n = {},
      t,
      r,
      f,
      e;
    s.forEach(function (t) {
      n[t[0]] = t[1];
    });
    t = $(".menu-root-wrap");
    n.hasOwnProperty("linktype") && n.hasOwnProperty("linkvalue")
      ? ((f = n.linktype.toLowerCase()),
        (e = n.linkvalue.toLowerCase()),
        (r = t.find("a[href]").filter(function (n, t) {
          var r = $(t).attr("href").toLowerCase();
          return (
            r.indexOf(i) != -1 &&
            r.indexOf("linktype=" + f) !== -1 &&
            r.indexOf("linkvalue=" + e) !== -1
          );
        })))
      : (r = t.find("a[href]").filter(function (n, t) {
          var r = $(t).attr("href").toLowerCase();
          return i.length > 1 && r.indexOf(i) !== -1;
        }));
    r.parent().addClass("active");
    t.find(".menulist").each(function (n, t) {
      var i = $(t),
        r = i.find(".menu-item.active"),
        u = r.length > 0,
        f =
          r.hasClass("is-dynamic-menu-link") &&
          i.find(".sub-menu").filter(function (n, t) {
            return t.childElementCount > 0;
          }).length > 0;
      u && (i.removeClass("hide"), f && i.addClass("menu-activate-slide"));
    });
  })()