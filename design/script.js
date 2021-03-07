// $() is from cash, doing a document.onLoad
$(() => {
  // humanize timestamp
  dayjs.extend(window.dayjs_plugin_relativeTime);
  for (el of $("#timestamp time")) {
    el.textContent = dayjs(el.textContent).fromNow();
  }

  // syntax-highlight on startup
  hljs.initHighlightingOnLoad();
});
