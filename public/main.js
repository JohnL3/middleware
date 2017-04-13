
$('#myForm').submit(function() {
	var username = $('#username').val();
	var password = $('#password').val();
	var encrypt = username+':'+ password;
	var encodedData = btoa(encrypt);
	$('#encrypt').val(encodedData);
  return true;
});