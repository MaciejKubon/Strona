$(document).ready(function () {
    $(".cancel_button button").click(function(){
        $('.window_content').addClass('opened');
        $('#window_overlay').addClass('opened');
    }); 
});