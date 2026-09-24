/**
 * 目录：滚动联动自动展开
 *
 * 当前阅读章节所在的分支自动展开，同级其它分支收起。
 * 点击目录条目也会立刻展开对应分支。
 * 没有目录、或浏览器不支持 IntersectionObserver 时静默退出。
 */
(function () {
  "use strict";

  var content = document.querySelector(".post-content");
  if (!content || typeof IntersectionObserver !== "function") return;

  var ACTIVE = "toc-active";
  var OPEN = "toc-open";
  var BRANCH = "toc-branch";

  // 正文里所有带 id 的标题，按文档顺序
  var headings = Array.prototype.filter.call(
    content.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]"),
    function (h) { return !!h.id; }
  );
  if (!headings.length) return;

  var navs = [];
  var currentId = null;
  var visible = new Set();

  function markBranches(nav) {
    var lis = nav.querySelectorAll("li");
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].querySelector(":scope > ul")) lis[i].classList.add(BRANCH);
    }
  }

  function apply(id, force) {
    if (!force && id === currentId) return;
    currentId = id;

    for (var n = 0; n < navs.length; n++) {
      var nav = navs[n];
      var anchors = nav.querySelectorAll("a");
      var target = null;

      for (var i = 0; i < anchors.length; i++) {
        var on = anchors[i].getAttribute("href") === "#" + id;
        if (on) target = anchors[i];
        anchors[i].classList.toggle(ACTIVE, on);
      }

      var opened = nav.querySelectorAll("li." + OPEN);
      for (var j = 0; j < opened.length; j++) opened[j].classList.remove(OPEN);

      if (!target) continue;

      var node = target.parentElement;
      while (node && node.tagName === "LI") {
        node.classList.add(OPEN);
        node = node.parentElement ? node.parentElement.closest("li") : null;
      }
    }
  }

  function adopt(nav) {
    if (!nav || navs.indexOf(nav) !== -1) return;
    markBranches(nav);
    navs.push(nav);
    if (currentId) apply(currentId, true);
  }

  function init() {
    var found = document.querySelectorAll(".post-toc nav, #post-toc-container nav");
    for (var i = 0; i < found.length; i++) adopt(found[i]);

    if (location.hash.length > 1) apply(decodeURIComponent(location.hash.slice(1)), true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // 主题的目录克隆由 async 脚本完成，可能晚于本脚本，这里补接一次
  var container = document.getElementById("post-toc-container");
  if (container && typeof MutationObserver === "function") {
    new MutationObserver(function () {
      var nav = container.querySelector("nav");
      if (nav) adopt(nav);
    }).observe(container, { childList: true, subtree: true });
  }

  // 记录当前落在“可读带”里的标题
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) visible.add(entries[i].target);
      else visible.delete(entries[i].target);
    }
    for (var h = 0; h < headings.length; h++) {
      if (visible.has(headings[h])) { apply(headings[h].id); return; }
    }
  }, { rootMargin: "-88px 0px -68% 0px", threshold: 0 });

  for (var k = 0; k < headings.length; k++) io.observe(headings[k]);

  // 点击目录条目立刻展开
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || !a.closest(".post-toc, #post-toc-container")) return;
    var id = decodeURIComponent(a.getAttribute("href").slice(1));
    if (id) apply(id, true);
  }, false);
})();
