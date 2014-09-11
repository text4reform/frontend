var width   = 575,
    height  = 260,
    left    = ($(window).width()  - width)  / 2,
    top     = ($(window).height() - height) / 2,
    opts    = 'status=1' + ',width=' + width  + ',height=' + height + ',top=' + top +',left=' + left;

$('#share-twitter').click(function(event) {
  var text    = "I support immigration reform and so should you. Send your personalized letter to Congress via text. #TimeIsNow #CIR"
      type    = "&tw_p=tweetbutton",
      url     = "&url=http%3A%2F%2Ftext4reform.org",
      url     = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + type + url;
  
  window.open(url, 'twitter', opts);

  return false;
});
    
$('#share-facebook').click(function(event) {
  var url    = "p[url]=http://text4reform.org",
      url    = "http://www.facebook.com/sharer.php?s=100&" + url;
  
  window.open(url, 'fb', opts);

  return false;
});  

$('#share-google-plus').click(function(event) {
  var url    = "http://text4reform.org",
      url    = "https://plus.google.com/share?url=" + url;
      
  window.open(url, 'google-plus', opts);

  return false;
}); 