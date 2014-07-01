var server        = '162.209.126.106:1234';

// regular expression to validate phone and zip
var phoneRegexp   = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var zipCodeRegexp = /^([0-9]{5})(?:-[0-9]{4})?$/;

// kill form submit
$('form').submit(function(e) {
  e.preventDefault();
  // $('#submit').click();
  return false;
});

var $phone   = $('#input_phone');
var $zipcode = $('#input_zip');
var $warning = $('#warning-alert');
var $success = $('#success-alert');
var $error   = $('#error-alert');

function warning(msg) {
  $success.addClass('hide');
  $error.addClass('hide');
  $warning.text(msg);
  $warning.removeClass('hide');
}

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
        warning('Already texted that number.');
      } else {
        // clear phone and zip input
        $phone.val('');
        $zipcode.val('');
        // show for a while and then hide alert
        $warning.addClass('hide');
        $error.addClass('hide');
        $success.removeClass('hide').delay(5000).queue(function(){
          $(this).addClass('hide').dequeue();
        });
      }
    },
    error: function(data) {
      console.log("Error: ", data);
      btn.button('reset')
      // clear phone and zip input
      $phone.val('');
      $zipcode.val('');
      // show for a while and then hide alert
      $warning.addClass('hide');
      $success.addClass('hide');
      $error.removeClass('hide').delay(5000).queue(function(){
        $(this).addClass('hide').dequeue();
      });
    }});
return false; 
});
