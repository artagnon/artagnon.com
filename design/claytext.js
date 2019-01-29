$(function() {
  var paras = document.getElementsByTagName("p");
  for (i = 0; i < paras.length; ++i) {
    paras[i].innerHTML = paras[i].innerHTML.replace(/`([^`]+)`/g, "<span class=\"tick\">$1</span>");
    paras[i].innerHTML = paras[i].innerHTML.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, "<a href=\"$2\" target=\"_blank\">$1</a>")
  }
})
