<?php
require_once(__DIR__.'/../../config.php');

$PAGE->set_context(context_system::instance());
//$strname = get_string('formexample', 'local_formexample');
$strname = 'Contact Form';
$PAGE->set_url('/local/contact/view.php', array());
$PAGE->set_title($strname);

echo $OUTPUT->header();
/*
echo "<form action=\"../../local/contact/index.php\" method=\"post\" class=\"contact-us\">
    <fieldset>
        <label for=\"name\" id=\"namelabel\">Your name <strong class=\"required\">(required)</strong></label><br>
        <input id=\"name\" name=\"name\" type=\"text\" size=\"57\" maxlength=\"45\" pattern=\"[A-zÀ-ž]([A-zÀ-ž\s]){2,}\"
                title=\"Minimum 3 letters/spaces.\" required=\"required\" value=\"\"><br>
        <label for=\"email\" id=\"emaillabel\">Email address <strong class=\"required\">(required)</strong></label><br>
        <input id=\"email\" name=\"email\" type=\"email\" size=\"57\" maxlength=\"60\" required=\"required\" value=\"\"><br>
        <label for=\"subject\" id=\"subjectlabel\">Subject <strong class=\"required\">(required)</strong></label><br>
        <input id=\"subject\" name=\"subject\" type=\"text\" size=\"57\" maxlength=\"80\" minlength=\"5\"
                title=\"Minimum 5 characters.\" required=\"required\"><br>
        <label for=\"message\" id=\"messagelabel\">Message <strong class=\"required\">(required)</strong></label><br>
        <textarea id=\"message\" name=\"message\" rows=\"5\" cols=\"58\" minlength=\"5\"
                title=\"Minimum 5 characters.\" required=\"required\"></textarea><br>
        <input type=\"hidden\" id=\"sesskey\" name=\"sesskey\" value=\"\">
        <script>document.getElementById('sesskey').value = M.cfg.sesskey;</script>
    </fieldset>
    <div>
        <input type=\"submit\" name=\"submit\" id=\"submit\" value=\"Send\">
    </div>
</form>";
*/
echo $OUTPUT->render_from_template('theme_kmboost/contacts');
echo $OUTPUT->footer();
