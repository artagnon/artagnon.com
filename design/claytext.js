// $() is from cash, doing a document.onLoad
$(() => {
  // main should have a valid taborder
  document.querySelector("main").focus();

  // humanize timestamp
  dayjs.extend(window.dayjs_plugin_relativeTime);
  for (el of $("#timestamp time")) {
    el.textContent = dayjs(el.textContent).fromNow();
  }

  // syntax-highlight coq and cpp
  hljs.initHighlightingOnLoad();
});
