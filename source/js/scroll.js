$(function () {
  const navBarHeight = $(".navbar").height();
  if (!navBarHeight || !$(".navbar").hasClass("is-fixed-top")) {
    navBarHeight = 0;
  }
  let hash = window.location.hash.substr(1);
  if (hash) {
    let hashItem = $("#" + decodeURIComponent(hash));
    if (hashItem.length) {
      let topOffset = hashItem.offset().top;
      scrollAnimate(topOffset - navBarHeight);
    }
  }
  $(".menu-list-link").click(function (e) {
    e.preventDefault();
    let topOffset = $(decodeURIComponent($(this).html())).offset().top;
    scrollAnimate(topOffset - navBarHeight);
  });
});

function scrollAnimate(top) {
  $("html, body").animate(
    {
      scrollTop: top - 10,
    },
    300
  );
}
