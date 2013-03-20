answerbox = jQuery '#answerbox'
answertext = jQuery '#answertext'
field1 = jQuery '#field1'
field2 = jQuery '#field2'
button = jQuery '#button'
dragtargets = jQuery '#draggable'

jQuery ->
    jQuery(document).ready ->
        jQuery('#draggable').draggable(containment: 'parent')


        flickraddress = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
        jQuery.getJSON(flickraddress, {tags: "little wild horse canyon", tagmode: "any", format:"json"}).done (data)->
            for item in data.items
                do (item) ->
                    jQuery("<img/>").attr("src", item.media.m).attr("class", "rounded").appendTo("#flickrarea")

        button.click (event) ->
            word1 = field1.val()
            word2 = field2.val()
            alert("Look at the box below!")
            answertext.html("Knock knock.<br> Who is there? <br>" + word1 + ". <br>" + word1 + " who? <br>" + word1 + " " + word2 + ".")
