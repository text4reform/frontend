var server        = '162.209.126.106:1234';
server = 'localhost:1234';

// regular expression to validate phone and zip
var phoneRegexp   = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
var zipCodeRegexp = /^([0-9]{5})(?:-[0-9]{4})?$/;

// kill form submit
$('form').submit(function(e) {
  e.preventDefault();
  // $('#submit').click();
  return false;
});

// text me
$('#submit').click(function() {
  var btn       = $(this);
  var phone     = $('input#input_phone').val();
  var zipcode   = $('input#input_zip').val();

  console.log("talk to twilio");

  // validate phone
  var result = phoneRegexp.exec(phone);
  if(!result){
    console.log("fail phone");
    $('input#input_phone').val('').focus();
    $('#warning-alert').removeClass('hide');
    return false;
  }else{
    console.log("success phone");
    phone = result[1] + result[2] + result[3];
  }

  // validate zip
  result = zipCodeRegexp.exec(zipcode);
  if(!result){
    console.log("fail zip");
    $('input#input_zip').val('').focus();
    $('#warning-alert').removeClass('hide');
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

      setTimeout(function () {
        btn.button('reset')
        // clear phone and zip input
        $('input#input_phone').val('').dequeue();
        $('input#input_zip').val('').dequeue();
        // show for a while and then hide alert
        $('#success-alert').removeClass('hide').delay(5000).queue(function(){
          $(this).addClass('hide').dequeue();
        });
      }, 1000)
    },
    error: function(data) {
      console.log("Error: ", data);

      setTimeout(function () {
        btn.button('reset')
        // clear phone and zip input
        $('input#input_phone').val('').dequeue();
        $('input#input_zip').val('').dequeue();
        // show for a while and then hide alert
        $('#error-alert').removeClass('hide').delay(5000).queue(function(){
          $(this).addClass('hide').dequeue();
        });
      }, 1000)
    }});
return false; 
});
