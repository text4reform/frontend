var server        = '162.209.126.106:1234';

// regular expression to validate phone and zip
var phoneRegexp   = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var zipCodeRegexp = /^([0-9]{5})(?:-[0-9]{4})?$/;

var $name    = $('#input_name');
var $phone   = $('#input_phone');
var $zipcode = $('#input_zip');
var $alert   = $('#message-alert'); 

function warning(msg) {
  console.log("Warning");
  $alert.text(msg);
}

$(document).ready(function() {

  // Set jumbotron's height to window height
  // var windowHeight    = $(window).height();
  // var windowWidth     = $(window).width();
  // var jumbotronHeight = $('.jumbotron').height();
  // var minWidth        = 0;

  // if(windowHeight > jumbotronHeight && windowWidth > minWidth){
  //   $('.jumbotron').height(windowHeight);
  // }

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

jQuery(function($){
  var starting_position = $(window).height();
  var minWidth          = 480;
  
  $(window).scroll(function() {
    var yPos = ($(window).scrollTop());
    // show sticky menu after these many (starting_position) pixels have been 
    // scrolled down from the top and only when viewport width is greater than 500px.
    if(yPos > starting_position && window.innerWidth > minWidth){ 
      $("#nav-fixed").fadeIn();
    }else{
      $("#nav-fixed").fadeOut();
    }
  });
});

// kill form submit
$('form').submit(function(e) {
  e.preventDefault();
  // $('#submit').click();
  return false;
});

// text me
$('#submit').click(function() {
  var btn       = $(this);
  var phone     = $phone.val();
  var zipcode   = $zipcode.val();

  console.log("talk to twilio");

  // validate phone
  var result = phoneRegexp.exec(phone);
  if(!result){
    console.log("fail phone");
    $phone.val('').focus();
    $zipcode.val('');
    warning('Whoops, invalid phone number.');
    return false;
  }else{
    console.log("success phone");
    phone = result[1] + result[2] + result[3];
  }

  // validate zip
  result = zipCodeRegexp.exec(zipcode);
  if(!result){
    console.log("fail zip");
    $zipcode.val('').focus();
    warning('Whoops, invalid zip code.');
    return false;
  }else{
    console.log("success zip");
    zipcode = result[1];
  }
  
  // change button text to sending...
  btn.button('loading');

  // submit phone and zip to twilio
  $.ajax({
    type: "post",
    dataType: "json",
    url: 'http://' + server + '/textme',
    data: { zip: zipcode, number: phone },
    crossDomain: true,
    timeout: 2000,
    success: function(data) {
      console.log("success: ", data);
      btn.button('reset');
      if (data.exists) {
        warning('We have already texted that number recently.');
        $phone.val('');
        $zipcode.val('');
      } else {
        // clear phone and zip input
        warning('Thanks! We will contact you shortly via text.');
        $phone.val('');
        $zipcode.val('');
      }
    },
    error: function(data) {
      console.log("Error: ", data);
      btn.button('reset')
      // clear phone and zip input
      $phone.val('');
      $zipcode.val('');
      warning('Sorry, we were unable to submit your information this time.');
    }});
  return false; 
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

      if(targetOffset == 0){
        $name.focus(); 
      }
      return false;
    }
  }
});

// Scroll to the top
$('#signup').click(function(){
  $('html,body').animate({scrollTop: 0}, 800,
    function(){
      $name.focus();
    });
  return false; 
});

// change name input on invite a friend panel
// $name.change(function(){
//   var input = $name.val(); 
//   $('#input_yourname').val(input);
// });

// when scroll over the invite panel, make the input
// box for name or friend's phone number focused. 
$(window).scroll(function() {
  var yourName    = $('#input_yourname');
  var friendPhone = $('#input_friendphone');
  var hT          = $('#invite-panel').offset().top,
      hH          = $('#invite-panel').outerHeight(),
      wH          = $(window).height(),
      wS          = $(this).scrollTop();
  
  if (wS > (hT+hH-wH) && wS < (hT+hH-wH+400)){
    if($(yourName).is(":focus") || $(friendPhone).is(":focus")){
      return;
    }
    else if(yourName.val().length == 0){
      $(yourName).focus();
    }else{
      $(friendPhone).focus();
    }
  }else{
    if($(yourName).is(":focus") || $(friendPhone).is(":focus")){
      $(yourName).blur();
      $(friendPhone).blur();
    }
  }

});

// change icon color when hover over. 
// TODO: Can improve this to delete copy/paste.
$('.twitter-button').hover(
  function () {
    $('.twitter-img').css({'-webkit-filter':'invert(100%)'});
  }, 
  function () {
    $('.twitter-img').css({'-webkit-filter':'invert(50%)'});
  });

$('.fb-button').hover(
  function () {
    $('.fb-img').css({'-webkit-filter':'invert(100%)'});
  }, 
  function () {
    $('.fb-img').css({'-webkit-filter':'invert(50%)'});
  });

$('.google-button').hover(
  function () {
    $('.google-img').css({'-webkit-filter':'invert(100%)'});
  }, 
  function () {
    $('.google-img').css({'-webkit-filter':'invert(50%)'});
  });

