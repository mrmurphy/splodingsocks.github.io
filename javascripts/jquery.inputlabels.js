/**
 * Project: 	Jquery Inputlabels
 * Date: 		23/03/2011 
 * Company: 	Doghouse Media
 * URL: 		http://www.dhmedia.com.au
 * Author: 		Alex Parker
 */
( function($) {
	$.fn.inputLabels = function(){
	
		if (this.is('label')) {
			/* If this element is a label then convert it directly */
			convertLabel(this);
		} else {
			/* If this element is not a label then find any children that are and operate upon them */
			this.find('label').each(function(index,value) {
				convertLabel($(this));
			});
		}
	
		/* Remove label from DOM and initialise input value with label's title */
		function initialiseLabel(labelElement, inputField, labelTitle) {
			labelElement.remove();
			inputField.val(labelTitle);		
		}
	
	    /* This function does all the crazy magic */		
	    function convertLabel(labelElement) {
	
			/* Fetch the input field the label is for */
			var labelFor = labelElement.attr('for');
			if (labelFor) {
				var inputField = $("#" + labelFor);
				var labelTitle = labelElement.text();
				
				/* Fetch the parent form in which these fields reside */
				var parentForm = inputField.parents('form');

				/* We're choosy about which input types we want to apply this transform to */
				if (inputField.is('input') && inputField.attr('type') == 'text' || inputField.attr('type') == 'textarea') {
				
					/* Remove label from DOM and initialise input value with label's title */
					initialiseLabel(labelElement, inputField, labelTitle);
					
					/* 
					 * Bind click event 
					 * - Clear the input field if it contains the default value
					 */
					inputField.click( function() {
						if (inputField.val() == labelTitle) {
							inputField.val("");
						}			
					});
					
					/* 
					 * Bind blur event 
					 * - Restore the label value if the field is empty
					 */
					inputField.blur( function() {
						if ($(this).val() == "") {
							$(this).val(labelTitle);
						}			
					});
					
					/* 
					 * Bind submit event
					 * - Clear any default label values prior to submit (we don't want them cluttering up our data!)
					 */
					parentForm.submit( function() {
						if ( inputField.val() == labelTitle ) {
							inputField.val("");
						}
					});	
				} 
			}
		}
	}
})(jQuery);