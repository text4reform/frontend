var server        = '162.209.126.106:1234';

// regular expression to validate phone and zip
var phoneRegexp   = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var zipCodeRegexp = /^([0-9]{5})(?:-[0-9]{4})?$/;

var $name    = $('#input_name');
var $phone   = $('#input_phone');
var $zipcode = $('#input_zip');
var $alert   = $('#message-alert'); 

// Setup fancybox
$(document).ready(function() {
  fancybox();
  $name.focus();
});

function fancybox(){
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
}

function warning(msg) {
  console.log("Warning");
  $alert.text(msg);
}

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
