jQuery.noConflict();
jQuery(document).ready(function($) {
    $('form').inputLabels();
    var searchwrapper = $('#search-wrapper').hide()
    $('#search-button-nav').click(function(e) {
      e.preventDefault();
      searchwrapper.slideToggle();
    });
}); 
