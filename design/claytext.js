// $() is from cash, doing a document.onLoad
$(() => {
  // main should have a valid taborder
  document.querySelector("main").focus();

  for (el of $("p, li")) {
    // we use fn.html() from cash
    $(el).html(
      $(el)
        .html()
        // `...` text
        .replace(/`([^`]+)`/g, "<mark>$1</mark>")
        // [...](...) links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    );
  }

  // humanize timestamp
  for (el of $("#timestamp time")) {
    // plain js
    el.textContent = moment(el.textContent).fromNow();
  }
});
