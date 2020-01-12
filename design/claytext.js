$(function() {
  document.getElementById("main").focus();

  $("p, li").each(function() {
    // `...` text
    $(this).html(
      $(this)
        .html()
        .replace(/`([^`]+)`/g, '<span class="tick">$1</span>')
    );
    // [...](...) links
    $(this).html(
      $(this)
        .html()
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
    );
  });

  // humanize timestamp
  $("#timestamp time").each(function() {
    $(this).text(moment($(this).text()).fromNow());
  });
});
