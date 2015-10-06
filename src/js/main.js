$(document).ready(function() {

var landingNav = function() {
  $('a.me-links').click(function (e){
	   e.preventDefault();
	   var href = $(this).attr("href");//get the href so we can navigate later
	   $('.content').hide();
	   $(href).show();
	   var res = href.replace("#", "");
	   History.pushState({state:1}, res, '?' + res);
  });
}; 

var browserBack = function(div_id) {
	   $('.content').hide();
	   $('#' + div_id).show();
}; 

// Bind to StateChange Event
History.Adapter.bind(window, 'statechange', function() {
  var State = History.getState();
    urlIs();
});

var urlIs = function() {
	if(window.location.href.indexOf("") > -1) {
           //console.log("Welcome!");
           browserBack('landing-welcome');
    }
	if(window.location.href.indexOf("landing-welcome") > -1) {
           //console.log("Welcome!");
           browserBack('landing-welcome');
    }
};

landingNav();
urlIs();


}); /* End document ready */
