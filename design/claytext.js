$(function() {
  var paragraphs = document.getElementsByTagName("p");
  for (i = 0; i < paragraphs.length; ++i) {
    paragraphs[i].innerHTML = paragraphs[i].innerHTML.replace(/`([^`]+)`/g, "<span class=\"tick\">$1</span>");
  }
})
