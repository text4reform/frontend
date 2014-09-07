$('#share-twitter').click(function(event) {
  var width   = 575,
  height  = 260,
  left    = ($(window).width()  - width)  / 2,
  top     = ($(window).height() - height) / 2,
  text    = "The time for immigration reform is now! Send a personalized letter to Congress easily via text. More info: "
  type    = "&tw_p=tweetbutton",
  url     = "&url=http%3A%2F%2Ftext4reform.org"
  url     = "https://twitter.com/intent/tweet?" + text + type + url,
  opts    = 'status=1' +',width='  + width  +',height=' + height +',top=' + top +',left='   + left;

  window.open(url, 'twitter', opts);

  return false;
});


$('#share-facebook').click(function(event) {
  var width  = 575,
  height = 260,
  left   = ($(window).width()  - width)  / 2,
  top    = ($(window).height() - height) / 2,
  pic    = "&p[images][0]=" + "http://text4reform.org/img/text4reform-debugdc.jpg",
  title  = "&p[title]=Text4Reform:%20Immigration%20Advocacy%20via%20Texting",
  text   = "&p[summary]=Urge%20Congress%20to%20take%20action%20on%20immigration%20reform.%20We%20will%20deliver%20your%20message%20as%20posted%20letter%20on%20your%20behalf.",
  url    = "p[url]=http://text4reform.org",
  url    = "http://www.facebook.com/sharer.php?s=100&" + url + pic + title + text,
  opts   = 'status=1' +',width='  + width  +',height=' + height +',top=' + top +',left='   + left;

  window.open(url, 'fb', opts);

  return false;
});  

// $('#share-google-plus').click(function(event) {

//   var width  = 575,
//   height = 260,
//   left   = ($(window).width()  - width)  / 2,
//   top    = ($(window).height() - height) / 2,

//   window.open(url, 'fb', opts);

//   return false;
// });



// <a href="https://plus.google.com/share?url={URL}" onclick="javascript:window.open(this.href,
//   '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><img
//   src="https://www.gstatic.com/images/icons/gplus-64.png" alt="Share on Google+"/></a>













