const postBeauty = function () {
  $d.each("li ruby", function (element) {
    var parent = element.parentNode;
    if (element.parentNode.tagName != "LI") {
      parent = element.parentNode.parentNode;
    }
    parent.addClass("ruby");
  });

  $d.each("#artDetail table", function (element) {
    element.wrap({
      className: "table-container",
    });
  });

  $d.each(".highlight > .table-container", function (element) {
    element.className = "code-container";
  });

  $d.each("figure.highlight", function (element) {
    var code_container = element.child(".code-container");
    var caption = element.child("figcaption");

    element.insertAdjacentHTML(
      "beforeend",
      '<div class="operation"><span class="breakline-btn"><i class="ic i-align-left"></i></span><span class="copy-btn"><i class="ic i-clipboard"></i></span><span class="fullscreen-btn"><i class="ic i-expand"></i></span></div>'
    );

    var copyBtn = element.child(".copy-btn");
    copyBtn.addEventListener("click", function (event) {
      var target = event.currentTarget;
      var comma = "",
        code = "";
      code_container.find("pre").forEach(function (line) {
        code += comma + line.innerText;
        comma = "\n";
      });

      clipBoard(code, function (result) {
        target.child(".ic").className = result ? "ic i-check" : "ic i-times";
        target.blur();
        showtip(LOCAL.copyright);
      });
    });
    copyBtn.addEventListener("mouseleave", function (event) {
      setTimeout(function () {
        event.target.child(".ic").className = "ic i-clipboard";
      }, 1000);
    });

    var breakBtn = element.child(".breakline-btn");
    breakBtn.addEventListener("click", function (event) {
      var target = event.currentTarget;
      if (element.hasClass("breakline")) {
        element.removeClass("breakline");
        target.child(".ic").className = "ic i-align-left";
      } else {
        element.addClass("breakline");
        target.child(".ic").className = "ic i-align-justify";
      }
    });

    var fullscreenBtn = element.child(".fullscreen-btn");
    var removeFullscreen = function () {
      element.removeClass("fullscreen");
      element.scrollTop = 0;
      BODY.removeClass("fullscreen");
      fullscreenBtn.child(".ic").className = "ic i-expand";
    };
    var fullscreenHandle = function (event) {
      var target = event.currentTarget;
      if (element.hasClass("fullscreen")) {
        removeFullscreen();
        hideCode && hideCode();
        pageScroll(element);
      } else {
        element.addClass("fullscreen");
        BODY.addClass("fullscreen");
        fullscreenBtn.child(".ic").className = "ic i-compress";
        showCode && showCode();
      }
    };
    fullscreenBtn.addEventListener("click", fullscreenHandle);
    caption && caption.addEventListener("click", fullscreenHandle);

    if (code_container && code_container.height() > 300) {
      code_container.style.maxHeight = "300px";
      code_container.insertAdjacentHTML(
        "beforeend",
        '<div class="show-btn"><i class="ic i-angle-down"></i></div>'
      );
      var showBtn = code_container.child(".show-btn");
      var showBtnIcon = showBtn.child("i");

      var showCode = function () {
        code_container.style.maxHeight = "";
        showBtn.addClass("open");
      };

      var hideCode = function () {
        code_container.style.maxHeight = "300px";
        showBtn.removeClass("open");
      };

      showBtn.addEventListener("click", function (event) {
        if (showBtn.hasClass("open")) {
          removeFullscreen();
          hideCode();
          pageScroll(code_container);
        } else {
          showCode();
        }
      });
    }
  });

  $d.each("pre.mermaid > svg", function (element) {
    element.style.maxWidth = "";
  });

  $d.each(".reward button", function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      var qr = $d("#qr");
      if (qr.display() === "inline-flex") {
        transition(qr, 0);
      } else {
        transition(qr, 1, function () {
          qr.display("inline-flex");
        }); // slideUpBigIn
      }
    });
  });

  //quiz
  $d.each(".quiz > ul.options li", function (element) {
    element.addEventListener("click", function (event) {
      if (element.hasClass("correct")) {
        element.toggleClass("right");
        element.parentNode.parentNode.addClass("show");
      } else {
        element.toggleClass("wrong");
      }
    });
  });

  $d.each(".quiz > p", function (element) {
    element.addEventListener("click", function (event) {
      element.parentNode.toggleClass("show");
    });
  });

  $d.each(".quiz > p:first-child", function (element) {
    var quiz = element.parentNode;
    var type = "choice";
    if (quiz.hasClass("true") || quiz.hasClass("false")) type = "true_false";
    if (quiz.hasClass("multi")) type = "multiple";
    if (quiz.hasClass("fill")) type = "gap_fill";
    if (quiz.hasClass("essay")) type = "essay";
    element.attr("data-type", LOCAL.quiz[type]);
  });

  $d.each(".quiz .mistake", function (element) {
    element.attr("data-type", LOCAL.quiz.mistake);
  });

  $d.each("div.tags a", function (element) {
    element.className = ["primary", "success", "info", "warning", "danger"][
      Math.floor(Math.random() * 5)
    ];
  });

  $d.each("#artDetail div.player", function (element) {
    mediaPlayer(element, {
      type: element.attr("data-type"),
      mode: "order",
      btns: [],
    })
      .player.load(JSON.parse(element.attr("data-src")))
      .fetch();
  });
};
postBeauty();
