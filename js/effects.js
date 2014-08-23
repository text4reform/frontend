var $name    = $('#input_name');

// Set up fancybox
$(document).ready(function() {

  $('.fancybox').fancybox();

  $(".video").fancybox({
    maxWidth : 853,
    maxHeight : 455,
    openEffect  : 'none',
    closeEffect : 'none',
    helpers : {
      media : {}
    }
  });
});

// Scroll to anchors
$('a[href*=#]').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var $target = $(this.hash);
    $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

    if ($target.length) {
      var targetOffset = $target.offset().top;
      $('html,body')
      .animate({scrollTop: targetOffset}, 700);

      // Add focus name input box
      if(targetOffset == 0){
        $name.focus(); 
      }
      return false;
    }
  }
});

// When scroll over the invite panel, make the input
// box for name or friend's phone number focused. 
$(window).scroll(function() {
  if(null == $('#invite-panel').offset()){
    return;
  }

  var yourName    = $('#input_yourname');
  var friendPhone = $('#input_friendphone');
  var inviteBtn   = $('#invite');
  var invitePanel = $('#invite-panel');

  var hT          = invitePanel.offset().top,
      hH          = invitePanel.outerHeight(),
      wH          = $(window).height(),
      wS          = $(this).scrollTop();
  
  var isFocus = $(yourName).is(":focus") || $(friendPhone).is(":focus");
  var isPosition = wS > (hT+hH-wH) && wS < (hT+hH-wH+400);

  if(isPosition){
    if(!isFocus){
      if(!yourName.val().length){
        $(yourName).focus();
      }else if(!friendPhone.val().length){
        $(friendPhone).focus();
      }else{
        $(inviteBtn).focus();
      }
    }
  }else{
    if(isFocus){
      $(yourName).blur();
      $(friendPhone).blur();
      $(inviteBtn).blur();
    }
  }
});

// Fade in and fade out secondary navigation
jQuery(function($){
  var starting_position = $(window).height();
  var navFixed          = $("#nav-fixed");
  var minWidth          = 480;
  
  $(window).scroll(function() {
    var yPos = ($(window).scrollTop());
    // show sticky menu after these many (starting_position) pixels have been 
    // scrolled down from the top and only when viewport width is greater than 480px.
    if(yPos > starting_position && window.innerWidth > minWidth){ 
      navFixed.fadeIn();
    }else{
      navFixed.fadeOut();
    }
  });
});

// Scroll to the top and focus name input box
$('#signup').click(function(){
  $('html,body').animate({scrollTop: 0}, 800,
    function(){
      $name.focus();
    });
  return false; 
});

// automatically populate name input on invite a friend panel
// $name.change(function(){
//   var input = $name.val(); 
//   $('#input_yourname').val(input);
// });


