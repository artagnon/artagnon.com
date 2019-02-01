$(function() {
  $("p, li").each(function() {
    $(this).html($(this).html().replace(/`([^`]+)`/g, "<span class=\"tick\">$1</span>"));
    $(this).html($(this).html().replace(/\[([^\]]+)\]\(([^\)]+)\)/g, "<a href=\"$2\" target=\"_blank\">$1</a>"));
  });
});