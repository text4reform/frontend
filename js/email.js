var email     = "info@text4reform.org";

$(document).ready(function(){
  var url    = "mailto:" + email,
      anchor = document.getElementById('email');

  anchor.href = url;   

  return false;
}); 

// Contact us
$('#contact').click(function(event) {
  var $name      =  $('#contact_name'),
      $from      =  $('#contact_email'),
      $comment   =  $('#contact_feedback');
  
  var subject   = ($name.val() ? "Feedback from " + $name.val() : "Feedback on Text4Teform"),
      cc        = $from.val(),
      text      = $comment.val(),
      url       = "mailto:" + email +"?cc=" + cc + "&subject=" + encodeURIComponent(subject) 
                + "&body=" + encodeURIComponent(text);

  window.location.href = url;

  $name.val('');
  $from.val('');
  $comment.val('');

  return false;
}); 