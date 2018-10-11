define(['jquery'], function($) {
`use strict`;

    function sendAjax(type, courseid, instance) {

            var post = { type: type, courseid: courseid, instance: instance, sesskey: M.cfg.sesskey};
            Y.io(M.cfg.wwwroot + '/mod/kmgoogle/ajax/ajax.php', {
                method: 'POST',
                data: post,
                headers: {
                    //'Content-Type': 'application/json'
                },
                on: {
                    success: function (tid, response){
                        $('#id_associationname').html(response.responseText);
                    }
                }
            });


    };

    return {
        init: function(courseid, instance) {
            var present_type = $('#id_association').val();
            sendAjax(present_type, courseid, instance);

            $('#id_association').on('change', function() {
                sendAjax(this.value, courseid, instance);
            });

            //Disable select in form
            $('.disable_select select').prop('disabled', true);

            $('#id_submitmechanism').on('change', function() {
                if(this.value == '0'){
                    $('#id_numberattempts').prop('disabled', true);
                }else{
                    $('#id_numberattempts').prop('disabled', false);
                }
            });
        }
    };


});
