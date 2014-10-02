var server     = '192.241.252.139:1234';

// regular expression to validate phone and zip
var phoneRegexp   = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var zipCodeRegexp = /^([0-9]{5})(?:-[0-9]{4})?$/;
var nameRegexp    = /^[A-Za-z ]+$/;

// signup 
var $name    = $('#input_name');
var $phone   = $('#input_phone');
var $zipcode = $('#input_zip');
var $alert   = $('#message-alert');

// invite a friend
var $yourName    = $('#input_yourname');
var $friendPhone = $('#input_friendphone'); 
var $inviteAlert = $('#invite-message-alert');

// Change warning message
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
  var name      = $name.val();
  var phone     = $phone.val();
  var zipcode   = $zipcode.val();

  console.log("talk to twilio");

  // validate name
  var result = nameRegexp.exec(name);
  if(!result){
    $name.val('').focus();
    warning('Whoops, invalid name.');
    return false;
  }else{
    console.log("success name");
    name = result[0];
  }

  // validate phone
  var result = phoneRegexp.exec(phone);
  if(!result){
    console.log("fail phone");
    $phone.val('').focus();
    // $zipcode.val('');
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

  console.log("name: " +name);

  // submit phone and zip to twilio
  $.ajax({
    type: "post",
    dataType: "json",
    url: 'http://' + server + '/textme',
    data: { zip: zipcode, number: phone, name: name },
    crossDomain: true,
    timeout: 2000,
    success: function(data) {
      console.log("success: ", data);
      btn.button('reset');
      if (data.exists) {
        warning('We have already texted that number recently.');
        $phone.val('');
        $zipcode.val('');
        $name.val('');
      } else {
        // clear phone and zip input
        warning('Thanks! We will contact you shortly via text.');
        $phone.val('');
        $zipcode.val('');
        $name.val('');
      }
    },
    error: function(data) {
      console.log("Error: ", data);
      btn.button('reset')
      // clear phone and zip input
      $phone.val('');
      $zipcode.val('');
      $name.val('');
      warning('Sorry, we were unable to submit your information this time.');
    }});
  return false; 
});

function showAlert(msg){
  $inviteAlert.text(msg);
  $inviteAlert.fadeIn();
  setTimeout(function(){
    $inviteAlert.fadeOut();
  }, 5000);
}

// Invite a friend
$('#invite').click(function() {
  var btn     = $(this);
  var name    = $yourName.val();
  var phone   = $friendPhone.val();

  var invalidName  = "Whoops, invalid name.";
  var invalidPhone = "Whoops, invalid phone number.";

  // console.log("invite a friend");

  // validate name
  var result = nameRegexp.exec(name);
  if(!result){
    $yourName.val('').focus();
    showAlert(invalidName);
    return false;
  }else{
    name = result[0];
  }

  // validate phone
  result = phoneRegexp.exec(phone);
  if(!result){
    $friendPhone.val('').focus();
    showAlert(invalidPhone);
    return false;
  }else{
    phone = result[1] + result[2] + result[3];
  }

  showAlert("This feature is under development. Please come back next week.");

  $.ajax({
      type: "post",
      dataType: "json",
      url: 'http://' + server + '/textme',
      data: { friend: name, number: phone},
      crossDomain: true,
      timeout: 2000,
      success: function(data) {
        console.log("success: ", data);
        btn.button('reset');
        // clear phone and zip input  
        showAlert("Success!");
        $phone.val('');
        $name.val('');
      },
      error: function(data) {
        console.log("Error: ", data);
        btn.button('reset')
        // clear phone and zip input
        $phone.val('');
        $name.val('');
        showAlert('Sorry, an error occurred.');
      }
  });
  
  return false; 
});