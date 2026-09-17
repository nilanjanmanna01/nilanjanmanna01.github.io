(function () {
  "use strict";

  // ---- Theme toggle ----
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch (e) {}
    return stored || (systemPrefersDark() ? "dark" : "light");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  // ---- Table of contents ----
  var toc = document.getElementById("post-toc");
  var content = document.getElementById("post-content");

  if (toc && content) {
    var headings = content.querySelectorAll("h2, h3");
    if (headings.length > 1) {
      var list = document.createElement("ul");
      headings.forEach(function (h) {
        if (!h.id) return;
        var li = document.createElement("li");
        if (h.tagName === "H3") li.className = "toc-h3";
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        list.appendChild(li);
      });
      var title = document.createElement("p");
      title.className = "post-toc-title";
      title.textContent = "Contents";
      toc.appendChild(title);
      toc.appendChild(list);

      var tocLinks = toc.querySelectorAll("a");
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var link = toc.querySelector('a[href="#' + entry.target.id + '"]');
            if (!link) return;
            if (entry.isIntersecting) {
              tocLinks.forEach(function (l) {
                l.classList.remove("active");
              });
              link.classList.add("active");
            }
          });
        },
        { rootMargin: "0px 0px -70% 0px" }
      );
      headings.forEach(function (h) {
        if (h.id) observer.observe(h);
      });
    }
  }

  // ---- Lightbox for in-content images ----
  if (content) {
    var images = content.querySelectorAll(".post-figure img");
    images.forEach(function (img) {
      img.addEventListener("click", function () {
        var overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";

        var full = document.createElement("img");
        full.src = img.getAttribute("src");
        full.alt = img.getAttribute("alt") || "";

        var close = document.createElement("button");
        close.className = "lightbox-close";
        close.setAttribute("aria-label", "Close");
        close.innerHTML = "&times;";

        function dismiss() {
          overlay.remove();
          document.removeEventListener("keydown", onKey);
        }
        function onKey(e) {
          if (e.key === "Escape") dismiss();
        }

        overlay.addEventListener("click", function (e) {
          if (e.target === overlay) dismiss();
        });
        close.addEventListener("click", dismiss);
        document.addEventListener("keydown", onKey);

        overlay.appendChild(full);
        overlay.appendChild(close);
        document.body.appendChild(overlay);
      });
    });
  }

  // ---- Copy button on code blocks ----
  document.querySelectorAll("div.highlight, figure.highlight").forEach(function (block) {
    var wrapper = block.closest(".highlighter-rouge") || block;
    if (wrapper.querySelector(".copy-code")) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-code";
    btn.textContent = "Copy";
    btn.style.cssText =
      "position:absolute;top:0.5rem;right:0.5rem;font-size:0.75rem;padding:0.25rem 0.6rem;" +
      "border-radius:6px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);" +
      "color:#e8e3d9;cursor:pointer;";

    if (getComputedStyle(wrapper).position === "static") {
      wrapper.style.position = "relative";
    }

    btn.addEventListener("click", function () {
      var code = block.querySelector("code") || block;
      navigator.clipboard.writeText(code.innerText).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.textContent = "Copy";
        }, 1500);
      });
    });

    wrapper.appendChild(btn);
  });
})();
