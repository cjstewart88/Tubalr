var DimTheLights = {

	dim: false,

	button: $("#toggle-dim-the-lights"),

	init: function () {
		var cookie  			= document.cookie;
    DimTheLights.dim 	= cookie.indexOf('dimthelights') >= 0 ? true : false;
    console.log(document.cookie)
    if (DimTheLights.dim) {
    	DimTheLights.toggleUi();
    }
	},
		
	toggleUi: function () {
    $("#toggle-dim-the-lights").find('i').toggleClass('icon-moon icon-sun');
    $('html').toggleClass('dim-the-lights');

    if (DimTheLights.dim) {
      $("#toggle-dim-the-lights").find('span').text('Hit The Lights');
    }
    else {
      $("#toggle-dim-the-lights").find('span').text('Dim The Lights');
    }
	},

	toggleCookie: function () {
		if (DimTheLights.dim) {
			DimTheLights.dim = false;

			var expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
		}
		else {
			DimTheLights.dim = true;

			var date = new Date();
			date.setTime(date.getTime()+(365*24*60*60*1000));
			var expires = date.toGMTString();
		}

		document.cookie = "dimthelights=;path=/;expires=" + expires;
	}

};


$(document).ready(function () {
	DimTheLights.init();
	
	$('#toggle-dim-the-lights').click(function () {
    DimTheLights.toggleCookie();
    DimTheLights.toggleUi();
  });

})