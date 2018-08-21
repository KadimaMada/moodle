/* * * * * * * * * * * * * * * * * * * *
*
* NagishLi v2.1 Copyright (c) 2016-2017 Localize* (http://www.nagish.li)

! This program is free software: you can redistribute it and/or modify
! it under the terms of the GNU Lesser General Public License as published by
! the Free Software Foundation, either version 3 of the License, or
! (at your option) any later version.
!
! This program is distributed in the hope that it will be useful,
! but WITHOUT ANY WARRANTY; without even the implied warranty of
! MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
! GNU Lesser General Public License for more details.
!
! You should have received a copy of the GNU Lesser General Public License
! along with this program.  If not, see <http://www.gnu.org/licenses/>.

! People & Disability Pictograms Copyright (c) 2016 anatom5 GmbH in cooperation with Natko (http://www.anatom5.de & http://www.natko.de)
! Balloon.css Copyright (c) 2016 Claudio Holanda (https://kazzkiq.github.io/balloon.css/)
! NiceScroll Copyright (c) 2011-14 InuYaksa (http://nicescroll.areaaperta.com)
! Normalize.css Copyright В© Nicolas Gallagher and Jonathan Neal (https://necolas.github.io/normalize.css/)
! Styling inspired by Pedro Nauk (https://codepen.io/pedronauck/)
! Arrows icons from Flaticon by Dave Gandy (http://www.flaticon.com/authors/dave-gandy)
! Star Of David icon from Flaticon by Scott de Jonge (http://www.flaticon.com/authors/scott-de-jonge)
! Bounce animations from Animate.css Copyright (c) 2016 Daniel Eden (https://daneden.github.io/animate.css/)
! Cursor icons from Flaticon by Freepik (http://www.flaticon.com/authors/freepik)

*
* * * * * * * * * * * * * * * * * * * */

define(['jquery'], function($) {
    if ($('html[lang="he"]').length) {
        nl_pos = "LT";
        nl_lang = "he";
    } else {
        nl_pos = "TL";
        nl_lang = "en";
    }
    var jq_not_found;
    if ("querySelector" in document && "localStorage" in window && "addEventListener" in window) {
        var initNagishLi = function() {
            function I(b, d, f, l) {
                0 > f && (f += b.length);
                l = void 0 !== l ? l : b.length;
                0 > l && (l = l + b.length - f);
                return b.slice(0, f) + d.substr(0, l) + d.slice(l) + b.slice(f + l)
            }

            function n(b) {
                function d(b) {
                    return ("0" + parseInt(b).toString(16)).slice(-2)
                }
                b = b.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                return "#" + d(b[1]) + d(b[2]) + d(b[3])
            }

            function W(b) {
                b = b.replace("#", "");
                b = b.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(b,
                                                                           d, f, l) {
                    return d + d + f + f + l + l
                });
                return "rgb(" + [(bigint = parseInt(b, 16)) >> 16 & 255, bigint >> 8 & 255, bigint & 255].join() + ")"
            }

            function l(b, d, f, p, n) {
                if (!D) return !1;
                b = window.atob(window.btoa("NagishLi"));
                var x = localStorage.getItem(b) ? localStorage.getItem(b) : window.btoa("version:" + L + "|menu:closed|position:" + M + "|submenus:000000|help:0|text:0|colors:normal|display:normal|highlight:00|zoom:0.0|font:normal|animations:on|cursor:normal|tabbing:off|r2m:off|ok:0");
                n = n ? n.toString() : "";
                var w = "menu position submenus help text colors display highlight zoom font animations cursor tabbing r2m ok all".split(" ");
                var q = "write change edit replace read delete".split(" ");
                if ("version" != f && (-1 === w.indexOf(f) || -1 === q.indexOf(d))) return console.log(phrases.missing_setting, "color: RoyalBlue; font-weight: bold;", "", "color: #EB2B36;", ""), !1;
                if ("delete" == d) return localStorage.removeItem(b), !1;
                x = window.atob(x).toString();
                var v = x.split("|");
                a: {
                    w = f + ":";
                    for (q = 0; q < v.length; q++)
                        if (0 == v[q].indexOf(w)) {
                            var t = q;
                            break a
                        }
                    t = -1
                }
                w = v[t] ? v[t].length : "not_found";
                if ("not_found" == w) return l("NagishLi", "delete", "all"), $(commons.bar).css({
                    "max-height": "",
                    "overflow-y": ""
                }), $("" + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove").remove(), $("" + commons.bar + " > #NagishLiBarStrip").addClass("open"), $(commons.menus).show(), $(commons.menus).html('<li class="dropdown"><ul class="dropdown-menu show"><li class="not-clickable"><div href="#">' + phrases.settings_upgrade_html + "</div></li></ul></li>"), !1;
                q = v[t].split(":")[0];
                v = v[t].split(":")[1];
                if ("write" == d || "change" == d || "edit" == d || "replace" == d) {
                    if (x) {
                        var A =
                            "highlight" == q || "submenus" == q && "all" != p || "ok" == q || p ? 1 : v.length;
                        d = x;
                        p = f + ":" + I(v, n, ("highlight" != q && "submenus" != q && "all" != p && "ok" != q || !p ? 1 : p) - 1, A);
                        f = (x + "").indexOf(f + ":", 0);
                        A = I(d, p, -1 === f ? !1 : f, w)
                    }
                    localStorage.setItem(b, window.btoa(A));
                    return !1
                }
                if ("read" == d) return A = "highlight" == q || "ok" == q ? 1 : v.length, A = v.substr(("highlight" != q && "ok" != q || !p ? 1 : p) - 1, A)
            }
            var E, d, f;
            var L = "2.1";
            a11y_link = "undefined" != typeof nl_link && "0" != nl_link ? nl_link : !1;
            var p = "undefined" != typeof nl_lang ? nl_lang.toLowerCase() : "he";
            var M =
                "undefined" != typeof nl_pos ? nl_pos.toUpperCase() : "TL";
            var U = "undefined" != typeof nl_color && /^(blue|red|green|purple|yellow|pink|gray|brown|orange|turquoise)$/i.test(nl_color) ? ' class="' + nl_color.toLowerCase() + '"' : "";
            var ma = location.hostname ? (location.hostname.startsWith("www.") ? location.hostname.substr(location.hostname.indexOf(".") + 1, location.hostname.length) : location.hostname).toLowerCase() : "";
            if ("undefined" != typeof nl_lic) try {
                var t = nl_lic;
                window.atob(t)
            } catch (b) {
                t = "0"
            } else t = "0";
            if ("0" != t) {
                var na =
                    window.atob(t).split("+", 2)[0];
                var oa = window.atob(t).split("+", 2)[1]
            }
            var pa = -1 < navigator.userAgent.toLowerCase().indexOf("firefox") ? !0 : !1;
            var N = "en" == p && (window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance || window.oSpeechSynthesisUtterance || window.SpeechSynthesisUtterance) ? !0 : !1;
            (function(b) {
                (jQuery.browser = jQuery.browser || {}).mobile = /(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
                        4))
            })(navigator.userAgent || navigator.vendor || window.opera);
            var O = jQuery.browser.mobile ? !0 : !1;
            var D = function() {
                var b = new Date,
                    d;
                try {
                    (d = window.localStorage).setItem(b, b);
                    var f = d.getItem(b) == b;
                    d.removeItem(b);
                    return f && d
                } catch (C) {}
            }();
            phrases = "en" == p ? {
                a11y_info: "Accessibilty Statement",
                a11y_info_exp: "This website's accessibilty statement",
                a11y_title: "Accessibility",
                about: "About NagishLi",
                about_text: '<span class="nlap-stitle">How this website was made accessible?</span><br />This website was made accessible with <a href="https://www.nagish.li/' +
                p + '/" target="_blank" tabindex="1">NagishLi</a>, a free accessibility plugin developed by <a href="http://www.localize.co.il" target="_blank" tabindex="1">Localize*</a> and using it is under its <a href="https://www.nagish.li/' + p + '/license.html" target="_blank" tabindex="1">license terms</a>.<br /><br /><span class="nlap-stitle">Why develop such a plugin?</span><br />Since the accessibility subject got more attention, free accessibility plugins were offered mostly to WordPress users. Other scripts and website owners were pretty much "left out". Making a website accessible is a complicated and relatively long process (or at least that\'s how people describe it). Localize* also needed a plugin for its own websites, and if you need to manage a few websites, the time and cost of making them accessible can be expensive.<br /><br /><span class="nlap-stitle">Is it really free? Why?</span><br />The plugin was developed initially for Localize\'s personal use, which later decided to release it to the public in order to make every website accessible to impaired people. It still has a long way to develop and improve, but if it\'ll help make more websites accessible to impaired people - Localize* is happy to be a part of that.',
                accessibility_statement: 'This website takes accessibilty seriously and make every effort possible to be comfortably accessed by the general population and users with disabilties so that every user will be able to make the most out of the content it presents. For this important purpose, this website uses <a href="https://www.nagish.li/' + p + '/" target="_blank" tabindex="1">NagishLi</a> - a free accessibility plugin. The usage of NagishLi is subject to the terms of <a href="https://www.nagish.li/' + p +
                '/license.html" target="_blank" tabindex="1">license</a> attached to it.<br /><br /><span class="nlas-stitle">How to use the plugin</span><br />After clicking the accesibility button, the accessibility plugin\'s menus will expand, presenting you with the following options:<ul><li>Adjusting text sizes</li><li>Changing website\'s colors</li><li>Changing website\'s display</li><li>Highlight titles and links</li><li>Shrink or magnify the website\'s display (zoom)</li><li>Make the website\'s font easier to read</li><li>Pause animations in the website</li><li>Listen to substituted audio for the pictures in the website using a text-to-speech program</li><li>Listen to an audio reading of phone numbers</li><li>Change the mouse cursor</li><li>Navigate through the plugin options using the Tab key (and also Shift+Tab) and activate them using the Enter key</li></ul>Despite the efforts expended in the development of this plugin, scenarios are possible where content may not be made accessible by it, such as contents presented by a third party (e.g. YouTube, other external embedded content, etc.). Note that NagishLi is in continuous development in order to improve and comply with the latest accessibility standards.<br /><br />This statement was last updated on July 4th, 2017.',
                align_left: "right",
                align_right: "left",
                and: "and&nbsp;",
                animations: "Animations",
                animations_exp: "Stops moving and flickering elements on the page",
                animations_on: "On",
                animations_off: "Off",
                aria_select_bgcolor: "Choose background color",
                aria_select_color: "Choose the color of the ",
                aria_select_txtcolor: "Choose text color",
                aria_the_option: "The option ",
                bg: "Background",
                bl_filter: "Blue light",
                bl_filter_exp: "Warm colors",
                blind: "Color blind",
                blind_exp: "Gray colors",
                body_missing: "NagishLi says: the <body> is missing! the accessibility plugin can't work without it.",
                chrome: "Chrome",
                clr_black: "Black",
                clr_blue: "Blue",
                clr_custom: "Custom color",
                clr_gray: "Gray",
                clr_green: "Green",
                clr_orange: "Orange",
                clr_pink: "Pink",
                clr_purple: "Purple",
                clr_red: "Red",
                clr_white: "White",
                clr_yellow: "Yellow",
                collapse_all: "Collapse all the menus",
                color_select: "Choose color",
                color: "color",
                colors: "Colors",
                cursor: "Cursor",
                cursor_exp: "Change the cursor icon",
                cursor_black: "Black",
                cursor_white: "White",
                custom_colors: "Custom",
                custom_colors_exp: "Change background and text colors",
                developed_by: "Developed by Localize",
                developed_by_exp: "Localize* - Web development services",
                developed_in: "Developed in Israel",
                developed_in_link: "https://en.wikipedia.org/wiki/Israel",
                developer_message: "A few words from the main person working on the plugin: \"I'm still studying and investigating the website accessibility subject when I can, and I'm interested in developing more features for this free plugin (there's already a feature list for the next versions), but I'm a busy guy - I can usually only work on this plugin in my free time. I do try my best to make it useful to as many website owners and visitors as possible. If you do decide to use the plugin, and like it - you can donate towards its developement. Any amount is more than welcome. If you choose not to donate, or can't donate, I still hope that the plugin will be useful to you and help your website's visitors.\"",
                dir: "ltr",
                display: "Display",
                edge: "Edge",
                expand_all: "Expand all the menus",
                experimental_feat: "This is an experimental feature",
                firefox: "Firefox",
                font: "Font",
                font_exp: "Changes the font of the page",
                font_readable: "Readable",
                help: "Help",
                help_exp: "Click here for help",
                highlight: "Highlight",
                hl_headings: "Highlight titles",
                hl_headings_exp: "Highlights all the titles of the page",
                hl_links: "Highlight links",
                hl_links_exp: "Highlights all the links of the page",
                how_accessible: "About this website accessibility",
                how_accessible_exp: "About this accessibilty plugin",
                images_only: "Images only",
                images_only_exp: "Hides the text of the page",
                img_alt_missing: "Image with no description",
                img_alt: "Possible image description: ",
                impaired: "Impaired vision",
                impaired_exp: "Maximum contrast",
                jq_too_low: "%cNagishLi%c says: your jQuery version is too low, it's possible that some (or all) options of the accessibility plugin won't work.",
                jq_not_found_msg: "%cNagishLi%c says: it seems that jQuery do not exist on this page. The plugin can't function without it, and added the required minimum jQuery version to the page automatically.",
                kbnav: "Keyboard navigation",
                kbnav_exp: "Navigate this site using the keyboard",
                kbnav_off: "Off",
                kbnav_on: "On",
                larger_text: "Larger",
                larger_text_exp: "Enlarges the text with each click",
                lc_filter: "Living colors",
                lc_filter_exp: "Cold colors",
                lic_warn: 'This website is using an unlicensed version of NagishLi. A lot of time and effort were put into this plugin, please <a href="http://www.nagish.li/en/contact.html" target="_blank" style="color: black !important; text-decoration: underline !important;" tabindex="1">click here</a> to send an anonymous report about this website. Thank you!',
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABGdBTUEAAK/INwWK6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4AIFCjcm2BOybwAABSBJREFUOMuFkltsVFUUhv+99zlzztw7bekFaKlQIJgqlwDS2qKFchUNlwcVUR40MTwYo+EBNSTyQFBJjIqSCMKLUTQRDMGYGlQod0MLQbAFWqD3acvMnM59zux99vaBWEJS8E9W1kpW8mXlXz/wn6a2AuZ+0O15iq0CWN+3puqj1O3nDtlq7lfZOF4f2QalMEcpgjltQM0VPExsbLKmgGx8iaq+pEQ4tkhbUNbcNN9dNKWQqbISzdULc1n6y0hy6Cw7T54sZWi+rJD/flyodv/SFaCLS4mSAK4ltiivoZ/qBHcx6FJCJhQDqfBvce16d4+NKk4a1hJ1GurRUADaUigkAHGdTgQHhnOghABKgVIGMEZDdumrAbi1KAwND9MDG3lAUChIjPLLLKSaKIh0JAgDJCXQZJzfKh2qjRYCuD6/Xf0/lFHItgFH3YpAk2K3MGuaApO8cwv9kKk8NGsknyTdox/ENmVhGRpVfXH5aGh1G3xNM5A63wPc5chPC3JzMNGWGMnEcwWGwdNCOZHMRe14S4vAJqDsotQenwjhawVuzx8f6qougYgJBBdVaYlaF1dh660NG4rfCDIn0hvmo4VB0808BXW/VK4OvbBTbfYboJ/X/yUJc437KXKvTYOx9gK1+/MSPLto9trJv9c+YXiTOagMB1EKKPJBXekSpPXwQCNc+knXBMby1/qd8S4lAKAv6SX80rACl0Ulm2ouVDzmqe4Li1R0KNPpxLgFEEp8zB2Y5FmYj2X365WBN2UOmuqNi/SVLkDhARs0AKAek+q1lY60+WKhuapv9gPJv4d+DZR4Jy9sKpjn06U9MJSP/NNuncvFs1aWeuB2OJywRcyKcqWkhI37/jIAoMVbwE+cgbrT260qquZqbmOGy+8ukcnMYKDQMyvHqdftNyaEyryVttDMzIWbzeJsdNT3VCnl0TQICJhhwBn84j6UmC9j+tWV8CyrEenfRmarTF4xr3eWk7Tbe5r7XuvrET/0jIiMrfS5rqA52dFcC5SPlxHKOmjAm3ESKaJ7fBD6RiD29T1P3Y1hphzHUXm+2JxW0SKzdjjXM7CDFfhPuUqKOqQkmiJU8OGRd9yTSj4lUJY9HOtibiNWdzSwsv1D0P4dR2Xo+SWwjgVAAcAVKiBGcRG0YKCeKQZKmMMHh37MXevssIcjGo9GsPoQJfkTe/aqlN1FFQtRhTDTjeWnG4fXW+di0ttUz6xjAQC4B2VMv1eEFRAHQFZ0vzfYMDphQ4M2+49yQYZ6xfltoPNO7LSJ7fQSByCKehlY3CwIHZSJ9NOwheNfGqVjUJmyoVI2VE5ECAco0ap3lbcU3927T9yoj+lGsFrv/3i6c2nVz35KtOmUA9IWKZeUKa/Bgsx0N+peLzSXQccixWOWdLiAcsSfhicgdd0o81XXbC975Zm3nSwcOw74Z3Zi9EbkfU0zKlROKBGP77bSmXI4POWZOaOZekCiR74RY+FnVWcxdXUddfKQ0RvWt55gaBMhEpl4+ngunf1OAcrtNV/0BHyrQChJW9YByfNXzYLiz6TgXYlwdyNlrF8zPTR9cbIkAGDOvwNkOcl1XFIIBX2hWXWHA0HfctNNpZKKAgChROayiibjydOxM8FnCxsSPxke/zpHCKRi4UbC2ElKKEteLHcoADjZHCSF0qbXkM1HVqatMwfXRMN3tyYimS6R4Xme4TwRydyODt3dFmtvWWHMuiVz8egn+WSqg6eS+zKXK1vSretgJ2ISAP4FuwyM/eNnkswAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDItMDVUMTA6NTU6MzgtMDU6MDBQ8wJzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAyLTA1VDEwOjU1OjM4LTA1OjAwIa66zwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
                logo_alt: "Logo",
                misc: "Misc",
                missing_setting: "%cNagishLi%c says: %cThe setting is missing.%c",
                move_bl: "Move to Bottom Left",
                move_br: "Move to Bottom Right",
                move_tl: "Move to Top Left",
                move_tr: "Move to Top Right",
                normal: "Normal",
                normal_display: "Normal",
                normal_plu: "Normal",
                not_supported: "This feature is not supported by your browser.",
                opera: "Opera",
                r2m: "Audio reading",
                r2m_exp: "Digits reading",
                r2m_na: "Audio reading is not available at the moment. Try again later.",
                r2m_off: "Off",
                r2m_on: "On",
                reset_prompt: "Would you like to reset the accessibilty settings?",
                reset_settings: "Reset settings",
                reset_settings_exp: "Reset all of the settings set by the plugin",
                settings: "Info & Settings",
                settings_prompt: "It seems that the current accessibility settings might be problematic. Would you like to reset the settings? (Recommended)",
                settings_reset_alert_ok: "The settings have been reset. Please refresh the page.",
                settings_reset_html_ok: 'The settings have been reset. <a href="javascript:void(0);" onclick="javascript:location.replace(window.location.href.split(\'#\')[0]);" style="color: black !important; text-decoration: underline !important;" tabindex="1">Refresh the page</a>',
                settings_save: "The settings will be saved.",
                settings_upgrade_html: 'NagishLi was upgraded. <a href="javascript:void(0);" onclick="javascript:location.replace(window.location.href.split(\'#\')[0]);" style="color: black !important; text-decoration: underline !important;" tabindex="1">Refresh the page</a>',
                smaller_text: "Smaller",
                smaller_text_exp: "Shrinks the text with each click",
                supported_browsers: "Supported browsers",
                supported_browsers_exp: "Supported browsers: Google Chrome, Microsoft Edge, Mozilla Firefox and Opera. The accessibility plugin makes use of advanced features in your browser. Please use an up-to-date browser.",
                text_only: "Text only",
                text_only_exp: "Hides the images of the page",
                text_size: "Text size",
                txt: "Text",
                toggle_single_alt: "Close or open the menu options of ",
                zoom: "Zoom",
                zoom_exp: "Zoom in and out of the page"
            } : {
                a11y_info: "\u05d4\u05e6\u05d4\u05e8\u05ea \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea",
                a11y_info_exp: "\u05d4\u05e6\u05d4\u05e8\u05ea \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05e9\u05dc \u05d0\u05ea\u05e8 \u05d6\u05d4",
                a11y_title: "\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea",
                about: "\u05d0\u05d5\u05d3\u05d5\u05ea \u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9",
                about_text: '<span class="nlap-stitle">\u05db\u05d9\u05e6\u05d3 \u05d4\u05d5\u05e0\u05d2\u05e9 \u05d0\u05ea\u05e8 \u05d6\u05d4?</span><br />\u05d0\u05ea\u05e8 \u05d6\u05d4 \u05d4\u05d5\u05e0\u05d2\u05e9 \u05e2\u05dc \u05d9\u05d3\u05d9 <a href="https://www.nagish.li/' + p + '/" target="_blank" tabindex="1">\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9</a>, \u05ea\u05d5\u05e1\u05e3 \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05dc\u05dc\u05d0 \u05e2\u05dc\u05d5\u05ea \u05e9\u05e4\u05d5\u05ea\u05d7 \u05e2\u05dc \u05d9\u05d3\u05d9 <a href="http://www.localize.co.il" target="_blank" tabindex="1">\u05dc\u05d5\u05e7\u05dc\u05d9\u05d9\u05d6*</a> \u05d5\u05d4\u05e9\u05d9\u05de\u05d5\u05e9 \u05d1\u05d5 \u05db\u05e4\u05d5\u05e3 \u05dc\u05ea\u05e0\u05d0\u05d9 <a href="https://www.nagish.li/' +
                p + '/license.html" target="_blank" tabindex="1">\u05d4\u05e8\u05d9\u05e9\u05d9\u05d5\u05df</a> \u05d4\u05de\u05e6\u05d5\u05e8\u05e4\u05d9\u05dd \u05d0\u05dc\u05d9\u05d5.<br /><br /><span class="nlap-stitle">\u05dc\u05de\u05d4 \u05e4\u05d5\u05ea\u05d7 \u05ea\u05d5\u05e1\u05e3 \u05d6\u05d4?</span><br />\u05de\u05d0\u05d6 \u05e9\u05e0\u05d5\u05e9\u05d0 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05e2\u05dc\u05d4, \u05ea\u05d5\u05e1\u05e4\u05d9 \u05d4\u05e0\u05d2\u05e9\u05d4 \u05d7\u05d9\u05e0\u05de\u05d9\u05d9\u05dd \u05d4\u05d5\u05e6\u05e2\u05d5 \u05d1\u05e2\u05d9\u05e7\u05e8 \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9 \u05de\u05e2\u05e8\u05db\u05ea \u05d5\u05d5\u05e8\u05d3\u05e4\u05e8\u05e1. \u05d1\u05e2\u05dc\u05d9 \u05d0\u05ea\u05e8\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05dd \u05d5\u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05d0\u05d7\u05e8\u05d5\u05ea \u05d3\u05d9 "\u05d4\u05d5\u05d6\u05e0\u05d7\u05d5". \u05d4\u05e0\u05d2\u05e9\u05ea \u05d0\u05ea\u05e8 \u05d4\u05d9\u05d0 \u05ea\u05d4\u05dc\u05d9\u05da \u05de\u05d5\u05e8\u05db\u05d1, \u05de\u05e1\u05d5\u05d1\u05da \u05d5\u05d0\u05e8\u05d5\u05da \u05d9\u05d7\u05e1\u05d9\u05ea (\u05d0\u05d5 \u05dc\u05e4\u05d7\u05d5\u05ea \u05db\u05db\u05d4 \u05de\u05ea\u05d0\u05e8\u05d9\u05dd \u05d0\u05d5\u05ea\u05d5). \u05d2\u05dd \u05dc\u05d5\u05e7\u05dc\u05d9\u05d9\u05d6* \u05e0\u05d6\u05e7\u05e7\u05d4 \u05dc\u05ea\u05d5\u05e1\u05e3 \u05dc\u05d0\u05ea\u05e8\u05d9\u05dd \u05e9\u05dc\u05d4, \u05d5\u05d0\u05dd \u05e6\u05e8\u05d9\u05da \u05dc\u05ea\u05d7\u05d6\u05e7 \u05db\u05de\u05d4 \u05d0\u05ea\u05e8\u05d9\u05dd, \u05e2\u05dc\u05d5\u05ea \u05d5\u05d6\u05de\u05df \u05d4\u05d4\u05e0\u05d2\u05e9\u05d4 \u05e9\u05dc \u05d4\u05d0\u05ea\u05e8\u05d9\u05dd \u05d4\u05d0\u05dc\u05d4 \u05d9\u05db\u05d5\u05dc\u05d9\u05dd \u05dc\u05d4\u05d9\u05d5\u05ea \u05d9\u05e7\u05e8\u05d9\u05dd.<br /><br /><span class="nlap-stitle">\u05d4\u05d5\u05d0 \u05d1\u05d0\u05de\u05ea \u05d1\u05d7\u05d9\u05e0\u05dd? \u05dc\u05de\u05d4?</span><br />\u05d4\u05ea\u05d5\u05e1\u05e3 \u05e4\u05d5\u05ea\u05d7 \u05d1\u05ea\u05d7\u05d9\u05dc\u05d4 \u05e2\u05d1\u05d5\u05e8 \u05d4\u05e9\u05d9\u05de\u05d5\u05e9 \u05d4\u05d0\u05d9\u05e9\u05d9 \u05e9\u05dc \u05dc\u05d5\u05e7\u05dc\u05d9\u05d9\u05d6*, \u05e9\u05dc\u05d0\u05d7\u05e8 \u05de\u05db\u05df \u05d4\u05d7\u05dc\u05d9\u05d8\u05d4 \u05dc\u05e9\u05d7\u05e8\u05e8 \u05d0\u05d5\u05ea\u05d5 \u05dc\u05e6\u05d9\u05d1\u05d5\u05e8 \u05d4\u05e8\u05d7\u05d1 \u05d1\u05de\u05d8\u05e8\u05d4 \u05dc\u05d4\u05e0\u05d2\u05d9\u05e9 \u05db\u05dc \u05d0\u05ea\u05e8 \u05e2\u05d1\u05d5\u05e8 \u05d1\u05e2\u05dc\u05d9 \u05de\u05d5\u05d2\u05d1\u05dc\u05d5\u05d9\u05d5\u05ea. \u05dc\u05ea\u05d5\u05e1\u05e3 \u05d9\u05e9 \u05e2\u05d5\u05d3 \u05d3\u05e8\u05da \u05d0\u05e8\u05d5\u05db\u05d4 \u05dc\u05d4\u05ea\u05e4\u05ea\u05d7 \u05d5\u05dc\u05d4\u05e9\u05ea\u05e4\u05e8, \u05d0\u05d1\u05dc \u05d0\u05dd \u05d4\u05d5\u05d0 \u05d9\u05e1\u05d9\u05d9\u05e2 \u05dc\u05d4\u05e4\u05d5\u05da \u05d9\u05d5\u05ea\u05e8 \u05d0\u05ea\u05e8\u05d9\u05dd \u05dc\u05e0\u05d2\u05d9\u05e9\u05d9\u05dd \u05e2\u05d1\u05d5\u05e8 \u05d1\u05e2\u05dc\u05d9 \u05de\u05d5\u05d2\u05d1\u05dc\u05d5\u05d9\u05d5\u05ea - \u05dc\u05d5\u05e7\u05dc\u05d9\u05d9\u05d6* \u05e9\u05de\u05d7\u05d4 \u05e9\u05d4\u05d9\u05d0 \u05d9\u05db\u05d5\u05dc\u05d4 \u05dc\u05e7\u05d7\u05ea \u05d7\u05dc\u05e7 \u05d1\u05d6\u05d4.',
                about_text_lic: '<span class="nlap-stitle">\u05db\u05d9\u05e6\u05d3 \u05d4\u05d5\u05e0\u05d2\u05e9 \u05d0\u05ea\u05e8 \u05d6\u05d4?</span><br />\u05d0\u05ea\u05e8 \u05d6\u05d4 \u05d4\u05d5\u05e0\u05d2\u05e9 \u05e2\u05dc \u05d9\u05d3\u05d9 <a href="https://www.nagish.li/' + p + '/" target="_blank" tabindex="1">\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9</a> \u05d5\u05d4\u05e9\u05d9\u05de\u05d5\u05e9 \u05d1\u05d5 \u05db\u05e4\u05d5\u05e3 \u05dc\u05ea\u05e0\u05d0\u05d9 <a href="https://www.nagish.li/' + p + '/license.html" target="_blank" tabindex="1">\u05d4\u05e8\u05d9\u05e9\u05d9\u05d5\u05df</a> \u05d4\u05de\u05e6\u05d5\u05e8\u05e4\u05d9\u05dd \u05d0\u05dc\u05d9\u05d5.<br /><br /><span class="nlap-stitle">\u05dc\u05de\u05d4 \u05e4\u05d5\u05ea\u05d7 \u05ea\u05d5\u05e1\u05e3 \u05d6\u05d4?</span><br />\u05de\u05d0\u05d6 \u05e9\u05e0\u05d5\u05e9\u05d0 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05e2\u05dc\u05d4, \u05ea\u05d5\u05e1\u05e4\u05d9 \u05d4\u05e0\u05d2\u05e9\u05d4 \u05d7\u05d9\u05e0\u05de\u05d9\u05d9\u05dd \u05d4\u05d5\u05e6\u05e2\u05d5 \u05d1\u05e2\u05d9\u05e7\u05e8 \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9 \u05de\u05e2\u05e8\u05db\u05ea \u05d5\u05d5\u05e8\u05d3\u05e4\u05e8\u05e1. \u05d1\u05e2\u05dc\u05d9 \u05d0\u05ea\u05e8\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05dd \u05d5\u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05d0\u05d7\u05e8\u05d5\u05ea \u05d3\u05d9 "\u05d4\u05d5\u05d6\u05e0\u05d7\u05d5". \u05d4\u05e0\u05d2\u05e9\u05ea \u05d0\u05ea\u05e8 \u05d4\u05d9\u05d0 \u05ea\u05d4\u05dc\u05d9\u05da \u05de\u05d5\u05e8\u05db\u05d1, \u05de\u05e1\u05d5\u05d1\u05da \u05d5\u05d0\u05e8\u05d5\u05da \u05d9\u05d7\u05e1\u05d9\u05ea (\u05d0\u05d5 \u05dc\u05e4\u05d7\u05d5\u05ea \u05db\u05db\u05d4 \u05de\u05ea\u05d0\u05e8\u05d9\u05dd \u05d0\u05d5\u05ea\u05d5). \u05ea\u05d5\u05e1\u05e3 \u05d6\u05d4 \u05e4\u05d5\u05ea\u05d7 \u05d2\u05dd \u05e2\u05d1\u05d5\u05e8 \u05d0\u05ea\u05e8\u05d9\u05dd \u05e9\u05d0\u05d9\u05e0\u05dd \u05de\u05d5\u05e4\u05e2\u05dc\u05d9\u05dd \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05e2\u05e8\u05db\u05ea \u05d5\u05d5\u05e8\u05d3\u05e4\u05e8\u05e1.',
                accessibility_statement: '\u05d0\u05ea\u05e8 \u05d6\u05d4 \u05de\u05d9\u05d9\u05d7\u05e1 \u05d7\u05e9\u05d9\u05d1\u05d5\u05ea \u05e8\u05d1\u05d4 \u05dc\u05d4\u05e0\u05d2\u05e9\u05ea \u05d4\u05e9\u05d9\u05de\u05d5\u05e9 \u05d1\u05d5 \u05dc\u05db\u05dc\u05dc \u05d4\u05d0\u05d5\u05db\u05dc\u05d5\u05e1\u05d9\u05d9\u05d4 \u05d5\u05e2\u05d5\u05e9\u05d4 \u05db\u05dc \u05e9\u05d1\u05d9\u05db\u05d5\u05dc\u05ea\u05d5 \u05dc\u05d4\u05d1\u05d8\u05d9\u05d7 \u05e9\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05d1\u05e2\u05dc\u05d9 \u05de\u05d5\u05d2\u05d1\u05dc\u05d5\u05d9\u05d5\u05ea \u05d9\u05d5\u05db\u05dc\u05d5 \u05dc\u05d4\u05e4\u05d9\u05e7 \u05d0\u05ea \u05d4\u05de\u05d9\u05d8\u05d1 \u05de\u05d4\u05ea\u05db\u05e0\u05d9\u05dd \u05d4\u05de\u05d5\u05e6\u05d2\u05d9\u05dd \u05d1\u05d5. \u05d0\u05ea\u05e8 \u05d6\u05d4 \u05de\u05e9\u05ea\u05de\u05e9 \u05d1\u05ea\u05d5\u05e1\u05e3 <a href="https://www.nagish.li/' +
                p + '/" target="_blank" tabindex="1">\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9</a> \u05dc\u05e9\u05dd \u05de\u05d8\u05e8\u05d4 \u05d7\u05e9\u05d5\u05d1\u05d4 \u05d6\u05d5, \u05d5\u05d4\u05e9\u05d9\u05de\u05d5\u05e9 \u05d1\u05ea\u05d5\u05e1\u05e3 \u05db\u05e4\u05d5\u05e3 \u05dc\u05ea\u05e0\u05d0\u05d9 <a href="https://www.nagish.li/' + p + '/license.html" target="_blank" tabindex="1">\u05d4\u05e8\u05d9\u05e9\u05d9\u05d5\u05df</a> \u05d4\u05de\u05e6\u05d5\u05e8\u05e4\u05d9\u05dd \u05d0\u05dc\u05d9\u05d5.<br /><br /><span class="nlas-stitle">\u05d0\u05d9\u05da \u05dc\u05d4\u05e9\u05ea\u05de\u05e9 \u05d1\u05ea\u05d5\u05e1\u05e3</span><br />\u05dc\u05d0\u05d7\u05e8 \u05d4\u05dc\u05d7\u05d9\u05e6\u05d4 \u05e2\u05dc \u05db\u05e4\u05ea\u05d5\u05e8 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05d9\u05d9\u05e4\u05ea\u05d7\u05d5 \u05d1\u05e4\u05e0\u05d9\u05db\u05dd \u05ea\u05e4\u05e8\u05d9\u05d8\u05d9 \u05ea\u05d5\u05e1\u05e3 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea, \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea\u05dd \u05ea\u05d5\u05db\u05dc\u05d5:<ul><li>\u05dc\u05e9\u05e0\u05d5\u05ea \u05d0\u05ea \u05d2\u05d5\u05d3\u05dc \u05d4\u05d8\u05e7\u05e1\u05d8</li><li>\u05dc\u05e9\u05e0\u05d5\u05ea \u05d0\u05ea \u05e6\u05d1\u05e2\u05d9 \u05d4\u05d0\u05ea\u05e8</li><li>\u05dc\u05e9\u05e0\u05d5\u05ea \u05d0\u05ea \u05ea\u05e6\u05d5\u05d2\u05ea \u05d4\u05d0\u05ea\u05e8</li><li>\u05dc\u05e1\u05de\u05df \u05e7\u05d9\u05e9\u05d5\u05e8\u05d9\u05dd \u05d5\u05db\u05d5\u05ea\u05e8\u05d5\u05ea \u05d1\u05d0\u05ea\u05e8</li><li>\u05dc\u05d4\u05d2\u05d3\u05d9\u05dc \u05d5\u05dc\u05d4\u05e7\u05d8\u05d9\u05df \u05d0\u05ea \u05ea\u05e6\u05d5\u05d2\u05ea \u05d4\u05d0\u05ea\u05e8 (\u05d6\u05d5\u05dd)</li><li>\u05dc\u05e9\u05e0\u05d5\u05ea \u05d0\u05ea \u05d2\u05d5\u05e4\u05df \u05d4\u05d0\u05ea\u05e8 \u05dc\u05e7\u05e8\u05d9\u05d0</li><li>\u05dc\u05e2\u05e6\u05d5\u05e8 \u05d4\u05e0\u05e4\u05e9\u05d5\u05ea (\u05d0\u05e0\u05d9\u05de\u05e6\u05d9\u05d5\u05ea) \u05d1\u05d0\u05ea\u05e8</li><li>\u05dc\u05d4\u05d0\u05d6\u05d9\u05df \u05dc\u05d8\u05e7\u05e1\u05d8 \u05d7\u05dc\u05d5\u05e4\u05d9 \u05e2\u05d1\u05d5\u05e8 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea \u05ea\u05d5\u05db\u05e0\u05ea \u05d4\u05e7\u05e8\u05d0\u05d4</li><li>\u05dc\u05d4\u05d0\u05d6\u05d9\u05df \u05dc\u05de\u05e1\u05e4\u05e8\u05d9 \u05d8\u05dc\u05e4\u05d5\u05df \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea \u05d4\u05e7\u05e8\u05d0\u05d4 \u05e7\u05d5\u05dc\u05d9\u05ea</li><li>\u05dc\u05e9\u05e0\u05d5\u05ea \u05d0\u05ea \u05e1\u05de\u05df \u05d4\u05e2\u05db\u05d1\u05e8</li><li>\u05dc\u05e0\u05d5\u05d5\u05d8 \u05d1\u05d9\u05df \u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05d4\u05ea\u05d5\u05e1\u05e3 \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea \u05d4\u05de\u05e7\u05e9 Tab (\u05d5\u05d2\u05dd Shift+Tab) \u05d5\u05d4\u05e4\u05e2\u05dc\u05ea\u05df \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea \u05d4\u05de\u05e7\u05e9 Enter</li></ul>\u05dc\u05de\u05e8\u05d5\u05ea \u05d4\u05de\u05d0\u05de\u05e6\u05d9\u05dd \u05e9\u05d4\u05d5\u05e9\u05e7\u05e2\u05d5 \u05d1\u05e4\u05d9\u05ea\u05d5\u05d7 \u05ea\u05d5\u05e1\u05e3 \u05d6\u05d4, \u05d9\u05d9\u05ea\u05db\u05e0\u05d5 \u05de\u05e6\u05d1\u05d9\u05dd \u05e9\u05d1\u05d4\u05dd \u05dc\u05d0 \u05ea\u05d4\u05d9\u05d4 \u05dc\u05d5 \u05d0\u05e4\u05e9\u05e8\u05d5\u05ea \u05dc\u05d4\u05e0\u05d2\u05d9\u05e9 \u05d7\u05dc\u05e7 \u05de\u05ea\u05db\u05e0\u05d9 \u05d4\u05d0\u05ea\u05e8, \u05db\u05d2\u05d5\u05df \u05ea\u05db\u05e0\u05d9\u05dd \u05d4\u05de\u05d5\u05e6\u05e2\u05d9\u05dd \u05d3\u05e8\u05da \u05d2\u05d5\u05e8\u05de\u05d9 \u05e6\u05d3 \u05e9\u05dc\u05d9\u05e9\u05d9 (\u05db\u05d3\u05d5\u05d2\u05de\u05ea YouTube, \u05ea\u05db\u05e0\u05d9\u05dd \u05de\u05d5\u05d8\u05de\u05e2\u05d9\u05dd \u05de\u05d0\u05ea\u05e8\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05dd \u05d5\u05db\u05d3\u05d5\u05de\u05d4). \u05d7\u05e9\u05d5\u05d1 \u05dc\u05e6\u05d9\u05d9\u05df \u05e9\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9 \u05e0\u05de\u05e6\u05d0 \u05d1\u05e4\u05d9\u05ea\u05d5\u05d7 \u05de\u05ea\u05de\u05d9\u05d3 \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05d4\u05e9\u05ea\u05e4\u05e8 \u05d5\u05dc\u05e2\u05de\u05d5\u05d3 \u05d1\u05ea\u05e7\u05e0\u05d9 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05d4\u05e2\u05d3\u05db\u05e0\u05d9\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8.<br /><br />\u05d4\u05e6\u05d4\u05e8\u05d4 \u05d6\u05d5 \u05e2\u05d5\u05d3\u05db\u05e0\u05d4 \u05dc\u05d0\u05d7\u05e8\u05d5\u05e0\u05d4 \u05d1\u05ea\u05d0\u05e8\u05d9\u05da \u05d4-4.7.2017.',
                align_left: "left",
                align_right: "right",
                and: "\u05d5",
                animations: "\u05d4\u05e0\u05e4\u05e9\u05d5\u05ea \u05d1\u05d3\u05e3",
                animations_exp: "\u05d4\u05e4\u05e1\u05e7\u05ea \u05ea\u05d6\u05d5\u05d6\u05d5\u05ea \u05d5\u05d4\u05d1\u05d4\u05d5\u05d1\u05d9\u05dd \u05d1\u05d3\u05e3",
                animations_on: "\u05e4\u05e2\u05d9\u05dc\u05d5\u05ea",
                animations_off: "\u05de\u05d5\u05e4\u05e1\u05e7\u05d5\u05ea",
                aria_select_bgcolor: "\u05d1\u05d7\u05d9\u05e8\u05ea \u05e6\u05d1\u05e2 \u05e8\u05e7\u05e2",
                aria_select_color: "\u05d1\u05d7\u05d9\u05e8\u05ea \u05e6\u05d1\u05e2 ",
                aria_select_txtcolor: "\u05d1\u05d7\u05d9\u05e8\u05ea \u05e6\u05d1\u05e2 \u05d8\u05e7\u05e1\u05d8",
                aria_the_option: "\u05d4\u05d0\u05e4\u05e9\u05e8\u05d5\u05ea ",
                bg: "\u05e8\u05e7\u05e2",
                bl_filter: "\u05d0\u05d5\u05e8 \u05db\u05d7\u05d5\u05dc",
                bl_filter_exp: "\u05e6\u05d1\u05e2\u05d9\u05dd \u05d7\u05de\u05d9\u05dd",
                blind: "\u05e2\u05d9\u05d5\u05d5\u05e8\u05d9 \u05e6\u05d1\u05e2\u05d9\u05dd",
                blind_exp: "\u05d2\u05d5\u05d5\u05e0\u05d9 \u05e9\u05d7\u05d5\u05e8 \u05dc\u05d1\u05df",
                body_missing: "\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9 \u05d0\u05d5\u05de\u05e8: \u05ea\u05d2 \u05d4-<body> \u05d7\u05e1\u05e8! \u05ea\u05d5\u05e1\u05e3 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05dc\u05d0 \u05d9\u05db\u05d5\u05dc \u05dc\u05e2\u05d1\u05d5\u05d3 \u05d1\u05dc\u05e2\u05d3\u05d9\u05d5.",
                chrome: "\u05db\u05e8\u05d5\u05dd",
                clr_black: "\u05e9\u05d7\u05d5\u05e8",
                clr_blue: "\u05db\u05d7\u05d5\u05dc",
                clr_custom: "\u05d1\u05d7\u05d9\u05e8\u05d4 \u05d0\u05d9\u05e9\u05d9\u05ea",
                clr_gray: "\u05d0\u05e4\u05d5\u05e8",
                clr_green: "\u05d9\u05e8\u05d5\u05e7",
                clr_orange: "\u05db\u05ea\u05d5\u05dd",
                clr_pink: "\u05d5\u05e8\u05d5\u05d3",
                clr_purple: "\u05e1\u05d2\u05d5\u05dc",
                clr_red: "\u05d0\u05d3\u05d5\u05dd",
                clr_white: "\u05dc\u05d1\u05df",
                clr_yellow: "\u05e6\u05d4\u05d5\u05d1",
                collapse_all: "\u05dc\u05e1\u05d2\u05d5\u05e8 \u05d0\u05ea \u05db\u05dc \u05d4\u05ea\u05e4\u05e8\u05d9\u05d8\u05d9\u05dd",
                color: "\u05e6\u05d1\u05e2",
                colors: "\u05e6\u05d1\u05e2\u05d9\u05dd",
                cursor: "\u05e1\u05de\u05df \u05e2\u05db\u05d1\u05e8",
                cursor_exp: "\u05e9\u05d9\u05e0\u05d5\u05d9 \u05e1\u05de\u05df \u05d4\u05e2\u05db\u05d1\u05e8 \u05dc\u05d4\u05ea\u05d0\u05de\u05d4 \u05e2\u05d1\u05d5\u05e8 \u05e6\u05d1\u05e2\u05d9 \u05e8\u05e7\u05e2 \u05e9\u05d5\u05e0\u05d9\u05dd",
                cursor_black: "\u05e9\u05d7\u05d5\u05e8",
                cursor_white: "\u05dc\u05d1\u05df",
                custom_colors: "\u05d4\u05ea\u05d0\u05de\u05d4 \u05d0\u05d9\u05e9\u05d9\u05ea",
                custom_colors_exp: "\u05e9\u05d9\u05e0\u05d5\u05d9 \u05e6\u05d1\u05e2\u05d9 \u05d4\u05e8\u05e7\u05e2 \u05d5\u05d4\u05d8\u05e7\u05e1\u05d8",
                developed_by: "\u05e4\u05d5\u05ea\u05d7 \u05e2\u05dc \u05d9\u05d3\u05d9 \u05dc\u05d5\u05e7\u05dc\u05d9\u05d9\u05d6",
                developed_by_exp: "\u05dc\u05d5\u05e7\u05dc\u05d9\u05d9\u05d6* - \u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05d1\u05e0\u05d9\u05d9\u05ea \u05d0\u05ea\u05e8\u05d9\u05dd",
                developed_in: "\u05e4\u05d5\u05ea\u05d7 \u05d1\u05d9\u05e9\u05e8\u05d0\u05dc",
                developed_in_link: "https://he.wikipedia.org/wiki/\u05d9\u05e9\u05e8\u05d0\u05dc",
                developer_message: '\u05db\u05de\u05d4 \u05de\u05d9\u05dc\u05d9\u05dd \u05de\u05d4\u05de\u05e4\u05ea\u05d7 \u05d4\u05e2\u05d9\u05e7\u05e8\u05d9 \u05e9\u05dc \u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9: "\u05d0\u05e0\u05d9 \u05e2\u05d3\u05d9\u05d9\u05df \u05d1\u05d5\u05d3\u05e7 \u05d5\u05dc\u05d5\u05de\u05d3 \u05d0\u05ea \u05e0\u05d5\u05e9\u05d0 \u05d4\u05e0\u05d2\u05e9\u05ea \u05d4\u05d0\u05ea\u05e8\u05d9\u05dd \u05db\u05e9\u05d0\u05e0\u05d9 \u05d9\u05db\u05d5\u05dc, \u05d5\u05de\u05e2\u05d5\u05e0\u05d9\u05d9\u05df \u05dc\u05e4\u05ea\u05d7 \u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05e0\u05d5\u05e1\u05e4\u05d5\u05ea \u05e2\u05d1\u05d5\u05e8 \u05d4\u05ea\u05d5\u05e1\u05e3 \u05d4\u05d7\u05d9\u05e0\u05de\u05d9 \u05d4\u05d6\u05d4 (\u05d9\u05e9 \u05db\u05d1\u05e8 \u05e8\u05e9\u05d9\u05de\u05ea \u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05dc\u05d2\u05d9\u05e8\u05e1\u05d0\u05d5\u05ea \u05d4\u05d1\u05d0\u05d5\u05ea), \u05d0\u05d1\u05dc \u05d0\u05e0\u05d9 \u05d0\u05d3\u05dd \u05e2\u05d5\u05d1\u05d3 \u05e9\u05dc\u05d0 \u05ea\u05de\u05d9\u05d3 \u05d9\u05db\u05d5\u05dc \u05dc\u05de\u05e6\u05d5\u05d0 \u05d0\u05ea \u05d4\u05d6\u05de\u05df \u05dc\u05d4\u05de\u05e9\u05d9\u05da \u05d5\u05dc\u05e4\u05ea\u05d7 \u05d0\u05ea \u05d4\u05ea\u05d5\u05e1\u05e3 \u05de\u05e2\u05d1\u05e8 \u05dc\u05d6\u05de\u05e0\u05d9 \u05d4\u05e4\u05e0\u05d5\u05d9. \u05d0\u05e0\u05d9 \u05de\u05e9\u05ea\u05d3\u05dc \u05dc\u05d4\u05e9\u05e7\u05d9\u05e2 \u05d1\u05d5 \u05db\u05d3\u05d9 \u05e9\u05d9\u05d5\u05db\u05dc \u05dc\u05d4\u05d5\u05e2\u05d9\u05dc \u05dc\u05db\u05de\u05d4 \u05e9\u05d9\u05d5\u05ea\u05e8 \u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05d5\u05d1\u05e2\u05dc\u05d9 \u05d0\u05ea\u05e8\u05d9\u05dd. \u05d0\u05dd \u05d4\u05d7\u05dc\u05d8\u05ea\u05dd \u05dc\u05d4\u05e9\u05ea\u05de\u05e9 \u05d1\u05ea\u05d5\u05e1\u05e3, \u05d5\u05d0\u05d4\u05d1\u05ea\u05dd \u05d0\u05d5\u05ea\u05d5 - \u05d0\u05ea\u05dd \u05de\u05d5\u05d6\u05de\u05e0\u05d9\u05dd \u05dc\u05ea\u05e8\u05d5\u05dd \u05e2\u05d1\u05d5\u05e8 \u05d4\u05ea\u05e7\u05d3\u05de\u05d5\u05ea \u05d4\u05e4\u05d9\u05ea\u05d5\u05d7 \u05e9\u05dc\u05d5. \u05db\u05dc \u05e1\u05db\u05d5\u05dd \u05d9\u05ea\u05e7\u05d1\u05dc \u05d1\u05d1\u05e8\u05db\u05d4. \u05d0\u05dd \u05d4\u05d7\u05dc\u05d8\u05ea\u05dd \u05dc\u05d0 \u05dc\u05ea\u05e8\u05d5\u05dd \u05d0\u05d5 \u05e9\u05d0\u05d9\u05df \u05d1\u05d0\u05e4\u05e9\u05e8\u05d5\u05ea\u05db\u05dd \u05dc\u05ea\u05e8\u05d5\u05dd, \u05d0\u05e0\u05d9 \u05de\u05e7\u05d5\u05d5\u05d4 \u05e9\u05d4\u05ea\u05d5\u05e1\u05e3 \u05d1\u05db\u05dc \u05d6\u05d0\u05ea \u05d9\u05d5\u05e2\u05d9\u05dc \u05dc\u05db\u05dd \u05d5\u05d9\u05e1\u05d9\u05d9\u05e2 \u05dc\u05d2\u05d5\u05dc\u05e9\u05d9\u05dd \u05d1\u05d0\u05ea\u05e8 \u05e9\u05dc\u05db\u05dd."',
                dir: "rtl",
                display: "\u05ea\u05e6\u05d5\u05d2\u05d4",
                edge: "\u05d0\u05d3\u05d2'",
                expand_all: "\u05dc\u05e4\u05ea\u05d5\u05d7 \u05d0\u05ea \u05db\u05dc \u05d4\u05ea\u05e4\u05e8\u05d9\u05d8\u05d9\u05dd",
                experimental_feat: "\u05d6\u05d5\u05d4\u05d9 \u05ea\u05db\u05d5\u05e0\u05d4 \u05e0\u05d9\u05e1\u05d9\u05d5\u05e0\u05d9\u05ea",
                firefox: "\u05e4\u05d9\u05d9\u05e8\u05e4\u05d5\u05e7\u05e1",
                font: "\u05d2\u05d5\u05e4\u05df",
                font_exp: "\u05e9\u05d9\u05e0\u05d5\u05d9 \u05d4\u05d2\u05d5\u05e4\u05df \u05e9\u05dc \u05d4\u05d3\u05e3",
                font_readable: "\u05e7\u05e8\u05d9\u05d0",
                help: "\u05e2\u05d6\u05e8\u05d4",
                help_exp: "\u05dc\u05d7\u05e6\u05d5 \u05db\u05d0\u05df \u05dc\u05d4\u05e6\u05d2\u05ea \u05e2\u05d6\u05e8\u05d4 \u05d1\u05ea\u05d5\u05e1\u05e3 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea",
                highlight: "\u05d4\u05d3\u05d2\u05e9\u05d4",
                hl_headings: "\u05e1\u05d9\u05de\u05d5\u05df \u05db\u05d5\u05ea\u05e8\u05d5\u05ea",
                hl_headings_exp: "\u05e1\u05d9\u05de\u05d5\u05df \u05db\u05dc \u05d4\u05db\u05d5\u05ea\u05e8\u05d5\u05ea \u05d1\u05d3\u05e3",
                hl_links: "\u05e1\u05d9\u05de\u05d5\u05df \u05e7\u05d9\u05e9\u05d5\u05e8\u05d9\u05dd",
                hl_links_exp: "\u05e1\u05d9\u05de\u05d5\u05df \u05db\u05dc \u05d4\u05e7\u05d9\u05e9\u05d5\u05e8\u05d9\u05dd \u05d1\u05d3\u05e3",
                how_accessible: "\u05db\u05d9\u05e6\u05d3 \u05d4\u05d5\u05e0\u05d2\u05e9 \u05d0\u05ea\u05e8 \u05d6\u05d4",
                how_accessible_exp: "\u05d0\u05d5\u05d3\u05d5\u05ea \u05ea\u05d5\u05e1\u05e3 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea",
                images_only: "\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d1\u05dc\u05d1\u05d3",
                images_only_exp: "\u05d4\u05e1\u05ea\u05e8\u05ea \u05d4\u05d8\u05e7\u05e1\u05d8 \u05d1\u05d3\u05e3",
                img_alt_missing: "\u05ea\u05de\u05d5\u05e0\u05d4 \u05dc\u05dc\u05d0 \u05ea\u05d9\u05d0\u05d5\u05e8",
                img_alt: "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05d0\u05e4\u05e9\u05e8\u05d9 \u05e9\u05dc \u05ea\u05de\u05d5\u05e0\u05d4: ",
                impaired: "\u05db\u05d1\u05d3\u05d9 \u05e8\u05d0\u05d9\u05d9\u05d4",
                impaired_exp: "\u05e0\u05d9\u05d2\u05d5\u05d3\u05d9\u05d5\u05ea \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05ea",
                jq_too_low: "%c\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9%c \u05d0\u05d5\u05de\u05e8: \u05d2\u05d9\u05e8\u05e1\u05ea jQuery \u05d1\u05d0\u05ea\u05e8 \u05d6\u05d4 \u05e0\u05de\u05d5\u05db\u05d4 \u05de\u05d3\u05d9. \u05d9\u05d9\u05ea\u05db\u05df \u05e9\u05d7\u05dc\u05e7 \u05de\u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05ea\u05d5\u05e1\u05e3 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05dc\u05d0 \u05d9\u05e2\u05d1\u05d3\u05d5 (\u05d0\u05d5 \u05db\u05d5\u05dc\u05df).",
                jq_not_found_msg: "%c\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9%c \u05d0\u05d5\u05de\u05e8: \u05e0\u05e8\u05d0\u05d4 \u05e9-jQuery \u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d4 \u05d1\u05d3\u05e3 \u05d6\u05d4. \u05d4\u05ea\u05d5\u05e1\u05e3 \u05dc\u05d0 \u05d9\u05db\u05d5\u05dc \u05dc\u05e4\u05e2\u05d5\u05dc \u05d1\u05dc\u05e2\u05d3\u05d9\u05d4, \u05d5\u05d4\u05d8\u05de\u05d9\u05e2 \u05d1\u05d3\u05e3 \u05d0\u05ea \u05d4\u05d2\u05d9\u05e8\u05e1\u05d4 \u05d4\u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05ea \u05d4\u05d3\u05e8\u05d5\u05e9\u05d4 \u05e2\u05d1\u05d5\u05e8\u05d5 \u05d1\u05d0\u05d5\u05e4\u05df \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9.",
                kbnav: "\u05e0\u05d9\u05d5\u05d5\u05d8 \u05de\u05e7\u05dc\u05d3\u05ea",
                kbnav_exp: "\u05e0\u05d9\u05d5\u05d5\u05d8 \u05d1\u05d0\u05ea\u05e8 \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea \u05de\u05e7\u05e9\u05d9 \u05d4\u05de\u05e7\u05dc\u05d3\u05ea",
                kbnav_off: "\u05db\u05d1\u05d5\u05d9",
                kbnav_on: "\u05e4\u05e2\u05d9\u05dc",
                larger_text: "\u05d2\u05d3\u05d5\u05dc \u05d9\u05d5\u05ea\u05e8",
                larger_text_exp: "\u05d4\u05d2\u05d3\u05dc\u05ea \u05d4\u05d8\u05e7\u05e1\u05d8 \u05d1\u05db\u05dc \u05dc\u05d7\u05d9\u05e6\u05d4",
                lc_filter: "\u05e6\u05d1\u05e2\u05d9\u05dd \u05d7\u05d9\u05d9\u05dd",
                lc_filter_exp: "\u05e6\u05d1\u05e2\u05d9\u05dd \u05e7\u05e8\u05d9\u05dd",
                lic_warn: '\u05d0\u05ea\u05e8 \u05d6\u05d4 \u05de\u05e9\u05ea\u05de\u05e9 \u05d1\u05e2\u05d5\u05ea\u05e7 \u05dc\u05d0 \u05d7\u05d5\u05e7\u05d9 \u05e9\u05dc \u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9. \u05de\u05d0\u05de\u05e5 \u05d5\u05d6\u05de\u05df \u05e8\u05d1\u05d9\u05dd \u05d4\u05d5\u05e9\u05e7\u05e2\u05d5 \u05d1\u05e4\u05d9\u05ea\u05d5\u05d7 \u05d4\u05ea\u05d5\u05e1\u05e3, \u05d0\u05e0\u05d0 <a href="http://www.nagish.li/he/contact.html" target="_blank" style="color: black !important; text-decoration: underline !important;" tabindex="1">\u05dc\u05d7\u05e6\u05d5 \u05db\u05d0\u05df</a> \u05db\u05d3\u05d9 \u05dc\u05d3\u05d5\u05d5\u05d7 \u05e2\u05dc \u05d0\u05ea\u05e8 \u05d6\u05d4 \u05d1\u05d0\u05d5\u05e4\u05df \u05d0\u05e0\u05d5\u05e0\u05d9\u05de\u05d9. \u05ea\u05d5\u05d3\u05d4!',
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABGdBTUEAAK/INwWK6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAB3RJTUUH4AIFCjEgZyqw3AAAAAZiS0dEAP8A/wD/oL2nkwAABQ5JREFUOMuNlGtM1QUYxp//7fzPDc4NEAhTEXDm3QOC3DpyUY4c7HCAUGFS4CaSpqnzls7Uaehmacua6WpOp9Was2YzK2diGiqy3LwMUCAOl8OBc+RwP9e3D31AV6nPp/fTb7/32bsX+L9MvwvMvoPZRAyIgAr71jlHR1y5Z900sXqwGRarCZt8YHd6WEiPA9F1eHGCLoDZ5eawYQQo7d4Q9omPKq+Sf10NBd68RMTvGfXA2JwEczuYFTYW2PdiJpPWwAAHIGK1wGwbbpIeIYo6Sr5XPycK/5Q83CEi9l3XSfYLAneCuJcyZbIeM5h4Cxh3Q8fvGO3lqomYfRRg9xMx+8jHVRNxGwZ+Ee8SxBZiXw6qv4+pRBhHBH7twE3JfiJ+N3nZ3eQX9pJHsjdAXLnzoPC+F8IOL/9ynYbdgKTcyQoldgh51ixhk7s/7CBR9GHyq/cRsVWD9ZKY2lA2rg6csZVBbP0LgNF14A2tQPhtAACP0wKyrYe5ZY7r0pWuG2yh/YrU3Hkc8Q/U0PwBzL7PKFcPAjF3nrN6bD2YabVY/4TYChshtMJ58u0zflpxwt1uOjTcVHXG21NyKkAw23cyq71QVQ4J0uI+SHKszzeVLLFxmN8B6FsN8fu9VPEtBcxfEuV/RVRymgKV3xHN2jU6iFmPkhDfAdHcwwKT/xuGyXVQWPqgXE988FaCbLnrmGqNJ8Dk99Ui23EF2b2XuWJXfdg674C+mihs1VATFDd1UN+GkNHG/AsoplshNXRAMr+FkS0b5lHqBZPWWi03df+esHnwnvkjjy3rgO9JcKHzOtKt3wStIdK+4yUuoz1fMHZDNNm5Z5iShMcQk/+CJLGZURU5WXB/ApPvjg8pGbg9bw+RoZoCyR/4Awk7/aTIs18OestjD64kklpcF4CzUuAshOTmMVMmph7y120QEpoYuckB+cKuEF7fuE1ucl6LXEsUUu71MtnOzzCzMwOvPEyUGXsvBJf5SZZjvyamtR0Yf5EQ10HgYmvHLDV5/QDOI2oXsQuJoFzi+kmWbb+lLvU5VaV+kizoek+x1A9lsZcPXuaBNLNrqqBvXBVkGepUlfhITGpJl6a3Q7ag69n1FVm9nCLbAZnBZlEVjAYUWfbvtSVEwebhJmC7WETEiFldvJjRyWNcDRBRo1YVjFq1y4kUixzbVZYRqCwj/NhDynSwijQbZIltKRqzu09b4H2izOz9VbeUSGUcuDz3CiFqC3HS6TcxjwihVcRvI4Jq8eA1XTFRcE7fQW2RD9oi3xhUYxzk1TkDUL7esyOq2Efh+W6rPNV2PrSASLN4pA3Sc0FADFQpDkGV4hCAY0D4byGa3NGuEAtRkKF3s8Y4BLVxiH/qdx6HrowYTRFBnNmQI85pLpTMaEgJyfUGQpcESJnS82FUOSGyhNhJVcTGbCQoU3uPhL1BFLLY4xdnPYqXzm2FIrGdHeszoZ0VZzRCeO1hlC5zpCl0kY+CEm3rVKnOE5F5RJEmf0Cd7vpR1HevkOq7y9Tp/T9H5vkpwkSkSnOeil5JiK0ilpt4/SnRhC5OEd8B+Zw2Q1imlyIWEWnT+s8BYLWprpoJuQGaUkj+OEuA4iz/zBNy/aRJdV2C7qIS7NeQTmtkpPEtTx3+lPsMMA8AGE2i85gueeCBfGZLkjj1MaD9QabUd2+JMAw1Tcpxe6Jz3O4Iw1CDcq5tI/CxUHaVGH7KPUYyoxHCtIcAgL8BvCpNE7lQjigAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDItMDVUMTA6NDk6MzItMDU6MDAvMWJzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAyLTA1VDEwOjQ5OjMyLTA1OjAwXmzazwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
                logo_alt: "\u05dc\u05d5\u05d2\u05d5",
                misc: "\u05e9\u05d5\u05e0\u05d5\u05ea",
                missing_setting: "%c\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9%c \u05d0\u05d5\u05de\u05e8: %c\u05d4\u05d4\u05d2\u05d3\u05e8\u05d4 \u05d7\u05e1\u05e8\u05d4.%c",
                move_bl: "\u05dc\u05d4\u05d6\u05d9\u05d6 \u05e9\u05de\u05d0\u05dc\u05d4 \u05d5\u05dc\u05de\u05d8\u05d4",
                move_br: "\u05dc\u05d4\u05d6\u05d9\u05d6 \u05d9\u05de\u05d9\u05e0\u05d4 \u05d5\u05dc\u05de\u05d8\u05d4",
                move_tl: "\u05dc\u05d4\u05d6\u05d9\u05d6 \u05e9\u05de\u05d0\u05dc\u05d4 \u05d5\u05dc\u05de\u05e2\u05dc\u05d4",
                move_tr: "\u05dc\u05d4\u05d6\u05d9\u05d6 \u05d9\u05de\u05d9\u05e0\u05d4 \u05d5\u05dc\u05de\u05e2\u05dc\u05d4",
                normal: "\u05e8\u05d2\u05d9\u05dc",
                normal_display: "\u05e8\u05d2\u05d9\u05dc\u05d4",
                normal_plu: "\u05e8\u05d2\u05d9\u05dc\u05d9\u05dd",
                not_supported: "\u05d0\u05e4\u05e9\u05e8\u05d5\u05ea \u05d6\u05d5 \u05d0\u05d9\u05e0\u05d4 \u05e0\u05ea\u05de\u05db\u05ea \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d4\u05d3\u05e4\u05d3\u05e4\u05df \u05e9\u05dc\u05da.",
                opera: "\u05d0\u05d5\u05e4\u05e8\u05d4",
                r2m: "\u05d4\u05e7\u05e8\u05d0\u05d4 \u05e7\u05d5\u05dc\u05d9\u05ea",
                r2m_exp: "\u05d4\u05e7\u05e8\u05d0\u05ea \u05e1\u05e4\u05e8\u05d5\u05ea",
                r2m_na: "\u05d4\u05e7\u05e8\u05d0\u05d4 \u05e7\u05d5\u05dc\u05d9\u05ea \u05d0\u05d9\u05e0\u05d4 \u05d6\u05de\u05d9\u05e0\u05d4 \u05db\u05e8\u05d2\u05e2. \u05e0\u05e1\u05d5 \u05e9\u05d5\u05d1 \u05de\u05d0\u05d5\u05d7\u05e8 \u05d9\u05d5\u05ea\u05e8.",
                r2m_off: "\u05db\u05d1\u05d5\u05d9\u05d4",
                r2m_on: "\u05e4\u05e2\u05d9\u05dc\u05d4",
                reset_prompt: "\u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea?",
                reset_settings: "\u05d0\u05d9\u05e4\u05d5\u05e1 \u05d4\u05d2\u05d3\u05e8\u05d5\u05ea",
                reset_settings_exp: "\u05d0\u05d9\u05e4\u05d5\u05e1 \u05db\u05dc \u05d4\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05e9\u05dc \u05ea\u05d5\u05e1\u05e3 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea",
                settings: "\u05de\u05d9\u05d3\u05e2 \u05d5\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea",
                settings_prompt: "\u05e0\u05e8\u05d0\u05d4 \u05e9\u05de\u05d9\u05e9\u05d4\u05d5 \u05d4\u05ea\u05e2\u05e1\u05e7 \u05e2\u05dd \u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea. \u05d4\u05d0\u05dd \u05d1\u05e8\u05e6\u05d5\u05e0\u05da \u05dc\u05d0\u05e4\u05e1 \u05d0\u05ea \u05d4\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea? (\u05de\u05d5\u05de\u05dc\u05e5)",
                settings_reset_alert_ok: "\u05d4\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d0\u05d5\u05e4\u05e1\u05d5. \u05e0\u05d0 \u05dc\u05e8\u05e2\u05e0\u05df \u05d0\u05ea \u05d4\u05e2\u05de\u05d5\u05d3.",
                settings_reset_html_ok: '\u05d4\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d0\u05d5\u05e4\u05e1\u05d5. <a href="javascript:void(0);" onclick="javascript:location.replace(window.location.href.split(\'#\')[0]);" style="color: black !important; text-decoration: underline !important;" tabindex="1">\u05dc\u05e8\u05e2\u05e0\u05df \u05d0\u05ea \u05d4\u05e2\u05de\u05d5\u05d3</a>',
                settings_save: "\u05d4\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d9\u05d9\u05e9\u05de\u05e8\u05d5.",
                settings_upgrade_html: '\u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9 \u05e9\u05d5\u05d3\u05e8\u05d2. <a href="javascript:void(0);" onclick="javascript:location.replace(window.location.href.split(\'#\')[0]);" style="color: black !important; text-decoration: underline !important;" tabindex="1">\u05dc\u05e8\u05e2\u05e0\u05df \u05d0\u05ea \u05d4\u05e2\u05de\u05d5\u05d3</a>',
                smaller_text: "\u05e7\u05d8\u05df \u05d9\u05d5\u05ea\u05e8",
                smaller_text_exp: "\u05d4\u05e7\u05d8\u05e0\u05ea \u05d4\u05d8\u05e7\u05e1\u05d8 \u05d1\u05db\u05dc \u05dc\u05d7\u05d9\u05e6\u05d4",
                supported_browsers: "\u05d3\u05e4\u05d3\u05e4\u05e0\u05d9\u05dd \u05e0\u05ea\u05de\u05db\u05d9\u05dd",
                supported_browsers_exp: "\u05d3\u05e4\u05d3\u05e4\u05e0\u05d9\u05dd \u05e0\u05ea\u05de\u05db\u05d9\u05dd: \u05d2\u05d5\u05d2\u05dc \u05db\u05e8\u05d5\u05dd, \u05de\u05d9\u05e7\u05e8\u05d5\u05e1\u05d5\u05e4\u05d8 \u05d0\u05d3\u05d2', \u05de\u05d5\u05d6\u05d9\u05dc\u05d4 \u05e4\u05d9\u05d9\u05e8\u05e4\u05d5\u05e7\u05e1 \u05d5\u05d0\u05d5\u05e4\u05e8\u05d4. \u05ea\u05d5\u05e1\u05e3 \u05d4\u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05e2\u05d5\u05e9\u05d4 \u05e9\u05d9\u05de\u05d5\u05e9 \u05d1\u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05de\u05ea\u05e7\u05d3\u05de\u05d5\u05ea \u05d1\u05d3\u05e4\u05d3\u05e4\u05df \u05e9\u05dc\u05db\u05dd. \u05d4\u05e7\u05e4\u05d9\u05d3\u05d5 \u05ea\u05de\u05d9\u05d3 \u05dc\u05d4\u05e9\u05ea\u05de\u05e9 \u05d1\u05d3\u05e4\u05d3\u05e4\u05df \u05e2\u05d3\u05db\u05e0\u05d9.",
                text_only: "\u05d8\u05e7\u05e1\u05d8 \u05d1\u05dc\u05d1\u05d3",
                text_only_exp: "\u05d4\u05e1\u05ea\u05e8\u05ea \u05d4\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d1\u05d3\u05e3",
                text_size: "\u05d2\u05d5\u05d3\u05dc \u05d8\u05e7\u05e1\u05d8",
                txt: "\u05d8\u05e7\u05e1\u05d8",
                toggle_single_alt: "\u05dc\u05e1\u05d2\u05d5\u05e8 \u05d0\u05d5 \u05dc\u05e4\u05ea\u05d5\u05d7 \u05d0\u05ea \u05d4\u05ea\u05e4\u05e8\u05d9\u05d8 ",
                zoom: "\u05d6\u05d5\u05dd",
                zoom_exp: "\u05d6\u05d5\u05dd \u05e4\u05e0\u05d9\u05de\u05d4 \u05d5\u05d4\u05d7\u05d5\u05e6\u05d4 \u05dc\u05d3\u05e3"
            };
            positions = {
                TR: "top: 0; right: 0 !important;",
                TL: "top: 0; left: 0 !important;",
                BR: "bottom: 0; right: 0 !important;",
                BL: "bottom: 0; left: 0 !important;"
            };
            icons = {
                TR_pos: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTCtCgrAAAAAjUlEQVQYV2P4//8/Q9q2mP8pW6L/J22K/J+wPuJ/3Nqw/2AJoKB4+pb4/1NO9P6ferLvf8yqEKDg5ijxpI2RH+v2lv1vO1D3f8LRrv9RK4L+MyRujHxTu7f0/+TjPf+Lt+X+j1we9D98acB/hvh14ZtLd+T9L96aAxJcBzI6dJEfxI7olcE7YIIQ/J8BAEUKWnHSg8ptAAAAAElFTkSuQmCC",
                BR_pos: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTCtCgrAAAAAi0lEQVQYV2P4//8/Q8Acr81+Mz3e+Ex3FwfxQZjBf7bXjpTl8f/TVyT995rq+tFjsou4+0Tn/wy+Mz3WJS6N/V+5ufR/8pL4/z5T3P+79jtCtHlOcV0XtyDqf8qyuP8Fa3P+u/Q6QCRA2G2C0//Ctbn/i9fl/XfqsUcIuvY5/ncGqnTqtv/v2GX3HwAA5FKFD23TPAAAAABJRU5ErkJggg==",
                TL_pos: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTCtCgrAAAAAiElEQVQYV2MoOZ7xH4SLj6X/Lzqa9r/wcOp/IGAAS6y8sfD/8mvz4IJgCZDKpdfm/p99cdL/9lN1//MOJK8DSxQdSftfejT7f8+Z5v9LLs/+33K8+n/2noR1DAVA7fkHU8Rz9yd/7DzZ8L/pSOX/zJ3xO8DmgXDO3kTxrN0JbzJ2xm3+//8/AwDUSWAq6dVzvgAAAABJRU5ErkJggg==",
                BL_pos: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTCtCgrAAAAAiElEQVQYV2P4//8/HMevC18XuyZ0B4jNkLw5CkhDBIu35fwv3JL1P3J50GaGxA0R/4GC/0GCXQda/pdszfsfviTgDUP82jCgQPP/qu3F/4u35IAEP4Yu8hNniFkd8r9zf/P/5t21/6OXhfwPWegnDrYjakXw/4hlgf/DFvuDBP8HzfcBiv9nAACGxFiiAjsS3gAAAABJRU5ErkJggg==",
                toggle_all: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI4NC45MjkgMjg0LjkyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjg0LjkyOSAyODQuOTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTEzNS44OTksMTY3Ljg3N2MxLjkwMiwxLjkwMiw0LjA5MywyLjg1MSw2LjU2NywyLjg1MXM0LjY2MS0wLjk0OCw2LjU2Mi0yLjg1MUwyODIuMDgyLDM0LjgyOSAgICBjMS45MDItMS45MDMsMi44NDctNC4wOTMsMi44NDctNi41NjdzLTAuOTUxLTQuNjY1LTIuODQ3LTYuNTY3TDI2Ny44MDgsNy40MTdjLTEuOTAyLTEuOTAzLTQuMDkzLTIuODUzLTYuNTctMi44NTMgICAgYy0yLjQ3MSwwLTQuNjYxLDAuOTUtNi41NjMsMi44NTNMMTQyLjQ2NiwxMTkuNjIyTDMwLjI2Miw3LjQxN2MtMS45MDMtMS45MDMtNC4wOTMtMi44NTMtNi41NjctMi44NTMgICAgYy0yLjQ3NSwwLTQuNjY1LDAuOTUtNi41NjcsMi44NTNMMi44NTYsMjEuNjk1QzAuOTUsMjMuNTk3LDAsMjUuNzg0LDAsMjguMjYyYzAsMi40NzgsMC45NTMsNC42NjUsMi44NTYsNi41NjdMMTM1Ljg5OSwxNjcuODc3eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTxwYXRoIGQ9Ik0yNjcuODA4LDExNy4wNTNjLTEuOTAyLTEuOTAzLTQuMDkzLTIuODUzLTYuNTctMi44NTNjLTIuNDcxLDAtNC42NjEsMC45NS02LjU2MywyLjg1M0wxNDIuNDY2LDIyOS4yNTdMMzAuMjYyLDExNy4wNSAgICBjLTEuOTAzLTEuOTAzLTQuMDkzLTIuODUzLTYuNTY3LTIuODUzYy0yLjQ3NSwwLTQuNjY1LDAuOTUtNi41NjcsMi44NTNMMi44NTYsMTMxLjMyN0MwLjk1LDEzMy4yMywwLDEzNS40MiwwLDEzNy44OTMgICAgYzAsMi40NzQsMC45NTMsNC42NjUsMi44NTYsNi41N2wxMzMuMDQzLDEzMy4wNDZjMS45MDIsMS45MDMsNC4wOTMsMi44NTQsNi41NjcsMi44NTRzNC42NjEtMC45NTEsNi41NjItMi44NTRsMTMzLjA1NC0xMzMuMDQ2ICAgIGMxLjkwMi0xLjkwMywyLjg0Ny00LjA5MywyLjg0Ny02LjU2NWMwLTIuNDc0LTAuOTUxLTQuNjYxLTIuODQ3LTYuNTY3TDI2Ny44MDgsMTE3LjA1M3oiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
                toggle_single: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI4NC45MjkgMjg0LjkyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjg0LjkyOSAyODQuOTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Mi4wODIsNzYuNTExbC0xNC4yNzQtMTQuMjczYy0xLjkwMi0xLjkwNi00LjA5My0yLjg1Ni02LjU3LTIuODU2Yy0yLjQ3MSwwLTQuNjYxLDAuOTUtNi41NjMsMi44NTZMMTQyLjQ2NiwxNzQuNDQxICAgTDMwLjI2Miw2Mi4yNDFjLTEuOTAzLTEuOTA2LTQuMDkzLTIuODU2LTYuNTY3LTIuODU2Yy0yLjQ3NSwwLTQuNjY1LDAuOTUtNi41NjcsMi44NTZMMi44NTYsNzYuNTE1QzAuOTUsNzguNDE3LDAsODAuNjA3LDAsODMuMDgyICAgYzAsMi40NzMsMC45NTMsNC42NjMsMi44NTYsNi41NjVsMTMzLjA0MywxMzMuMDQ2YzEuOTAyLDEuOTAzLDQuMDkzLDIuODU0LDYuNTY3LDIuODU0czQuNjYxLTAuOTUxLDYuNTYyLTIuODU0TDI4Mi4wODIsODkuNjQ3ICAgYzEuOTAyLTEuOTAzLDIuODQ3LTQuMDkzLDIuODQ3LTYuNTY1QzI4NC45MjksODAuNjA3LDI4My45ODQsNzguNDE3LDI4Mi4wODIsNzYuNTExeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
                chrome: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVR42qWTXUhTYRzGn/Oenc1t7kPdlqZmKUiaHx3zIxXxY115VRndFYRX6qXoRXkjeFMSQRdbkAiRoBDSRQRBzKiLSiI/KLCQIEimtradubntnO09b2fTvEi8qf/ln5ff87wPz5/Dfw7392K9u0nkTDmTxGJy8wIPVWVQ4zJoNOajcWWk6u3K8pGAtdpKD0zGASE3BzZHPjiegFEGlqKIBAJQdhIaTPHWrn8bPATw8y6PVGIcsB53gdOUoSPgVBXQHIByUBUVTE4huBkA21G9ouwfPAA0zreL4ovA0sQzBsUuaLbTIIkYzN2doLshxAIrADODQadBGaSgBEFUGmpmI8tZQOtsmy9h1fVMjG6gbkuBoaYSrlcvsSgREAI02RjCH5tB5TXoc3VQ5EhGesHZBHcW0DbTyqyl+Sh47sfNO59RzRT0PfyCPANAOA4WgxF3r5YCnwhUImhueIRCSTg7wWUB7Y9bWV6hHTGe4sYjAxxjT3F77gOK7PrsL7clBUO9Lbji6AaV3mgrPcIZQNc+oHX6PHMU5yFFKM7snEBXxX0Mz7yH02rIhvQzqmCsrwPXii4cAIKBJI659wEtD1qY82S+FpKKKI3gde87uPqfgPJcFkBVHcJTF4FVDpRkXBFsbaRQ0kv3AI33mn1Gl9BjK7Aipcoot5XB0zaNOd8GMk8udRZD/VoHc/oTGMlBOCgjGjIunLoc3wvx7MQ5UW/hl1zlmgsto7SqIKnG0VHcASlGULgxjVu1Ac2JATStx+b3FBKxnIaq69LyQZFqxhs8RrtuwFWWD+g5TUlFkjHYd2OYr1zUkjdAlg3w/9DUJZO3vv/X4KEqnx4TPUYzP2DKE2Bx2hCmPKacq6g2JuDflrEjCZqy3ts4tH24yn+mYrhe1Om5ScoTd5s5gfGCLQRlAZRyvrRCRtpHN48+pn+Z30ZDICBvHVUrAAAAAElFTkSuQmCC",
                edge: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAAGaSURBVDhPpZLPSwJBFMfn0F/QX+StTh3q0E2IzMp+F/28dQyJDl0qSIiiQ5S3oktQEdEhUHfVRYhQU0vxB5mUmvbtzeyu7bpWRIfPzLw3733nzcxjAP5FS+ex8gKn9xFdOw9wX2SRf62R2xrHMRlndyWwiSCYS1bnqRDYOM0DAXRsxynEnMxpLA6lIlifH2yUknUBvh4j5sNCqH05QqHfCDC7D2w2DG+wiFihSi5NWCbhEU2EBOdO0o09jhi6dxOwbUbFhm0rhkimItY6nZ442DRdZ45XIpv2xGA/SApn734CbDKIbKmGQOpNcJ+rwHGUUgUWFLAhyVRhQ6lUqYM5AuopvGQjejKHbPmpbBVYv86rL95KwAi9lY8qswgsnmaEQNuSgmK5jhCd0kw4XRbJlfcPq4DntqB+G50SzX/d8TfMhlN7A/r7tascCloHJp+rWDnPgg1KwjZiMtyXOdF1QoQ30rCk4iK43e+nsB8EOKtchE4SHchbWW9n+j42E6IQc7zJMLJxk0fPXgK8yXj5Cj1gcwzH4vgbYJ9eB99a1Gfy3wAAAABJRU5ErkJggg==",
                firefox: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lJREFUeNpEU11sFFUYPffemdmZ7i5ddmkXSLO7FGsbFCQCJkj8Qf6aEk2MSVMD8uIP4otGo4EaMfEBfOBVH3gymhgkaIxREwQNoVhtoIgUti0t4q6k7tbd7nZ2d3b+7ox3tv6c5My9d+53zky+cy/xfR/vq+wMgOOHTT4e6927uc8ovBjm1qPj0XQnljAheEHwa8ErwYvq9DetDfKPgR8svk3cf2xBDg/tL4x1B+t9JgcR4+C+Ezj8XB2zn/3kXfzFOL+rdPW9Wsn8MaihQrw/mLwwHMNA+cZwIA7mAXIWkK9zHP3gVbxxUsOelzL0taf93TwcOZ95KD7YMiAEj8cTrCV4ZiiOdFrGv7jUzvB6TMFN3cLgwQE88W4G3U/2Yedb96m1Gj25bm/HSsoo2bSmR7aNvAuv2sTmrdH/zFqGFNAhoZK6B35IwaejMWQeTiKR0trrRecIlUNk9eoupjhND+HM0tebi0ms6H8en59agH+uil+vlnHj4u/wwJCdtbG46KJ3VwKNkrldEj1cFo5RSJTAqFFEHlnbMpHkbGucmymgkp1Eba4A15MwPkmhUY5kWkWjwvsky/RCcAF1FcXIdzU431/BXKEVCo7t+RDOx6dFVFyIPDRNgmTGQGzZAiqGAVN3JRqSSb22KAQir3iSoSPqYZUwCzB89hV8sfUHHN2Sgz5fgq1X8FhXHqgsoD5VhBYhhiT6f/3PvLMtupzh3nUq/phwsT4tYcMWFWHVxVjuL+DLC3C7XkZKy+PgxklYBRt3L1XAiDchudw/NTNhP9iekLTOlIqu9XG4Nsf4zw3kbtviP27iSPhZbGubxqH+MhLMQnWmiuxlBiUWP0eOh2hEYxiRCNm4fSgKNSSBcwlUZbhTUVDSTbSRBlKdDjKZEJoi0snROn7LafrKVEcv2ykRu+njmuBTxawdVtsI2jQO6rhIyE2sjZhIqoDi0eDgI3fLxXTWMWfr1iH9enlUCpr1jsnH+mX65gPACWvU6EhEKLp7FbTHCZqaKBDHY/6ug9wIge7A/KrA397h4ZNW3MFD3Aecdf3irI+PBmRyoGH4y8vXLIW7S+koKgGNUrdQQ+OMzk/fcr2pHaGlpAj+R3B1k4I9PYxsSjOyIcbIClFAStyfz3N/6jb3L4v9KcGi4Hwg+luAAQD0OGaLejQqagAAAABJRU5ErkJggg==",
                opera: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4AIGBhkMEwAkHwAAAvBJREFUOMstkj1onWUYhq/7eb/znS/JOUlOomkSawOGEqEE/KVdxKV0qqBRg4M4iIuDi4N2kUAXEe3mJqLg0EFbhC5addDBPxCs6NCKAQ3G0pjE/J6T873v+zgk271c3NwXt3x6HgBMAXICtXE9AX4WCydQEPifWPiK4alrnurtb2//HO70tpNLyMdnYGA0oJDI9XnQO+BzIP8v9vTXwQ6bdc/dUWXh94bZaynkT7tFCMNru0l+fD6AEs6r4JcAB/Rv7H7zxebKB//0D7qdRlgsLCwI+YAFmXTBcn6rUTVNfs88wFPAVaAGGn3PHzZXf3vRl90/e2jM9nI/t0LzQhJvRs91QA2TFuX+sXx6voX0PfipQxncwv3hvL+x+ys0ftlf85Fm5dNjY2mn37/mcN4Bg5tudtoQC0dw/5DXe1jY7Q92itmB4XqdOo53OirKkqGqeneoqhisqjhYVXOtsny6yO7nQDheSEL417hTyrIk5kbuptNuJ0mEovhRcCfDhA7bzhXuzCQygOG+7fjq0RRvYgw0GjTLks26ZifGrfva7dXoPgEQpNmi9qzkR+qB5O7SYf479nn89APc3txkryhoVhVDZUl0B6CQrOimvOIChxygLWcqoNUEOojRkRhsNjlRlkgaDmaT2R0BkpaLfvbrGX8u49GgFDzWQD/VhZm1q8zUGO1VN6QEPOLuk+6eJAXBddvL6WovpVvdlMu9lOmm/NJaigOTow/G0fF2g7WtQiGgokDSyyYRzIKZLUu6Yr0Yt/ZTWuqmxF5K/Z2YTrl06YWbl/noxg8x9WNGSjnGV9x9AaiRAJYw29CNoRnrxZwx3kj4xQQ5IBsda39+/6Mn39doq8tu91liep6clWOWTBdjyktmMl3hLk62W7aeY/Y6LUbn7eh+AvCRkSFNHOvQalUud+WUV9x5vTzwy+1jw7a+uZH13dC9h/9LHlZ7dRKMyfyZ6H42epxNZAn9YfDlClufVLL1J8+cCcc7Iwngfx1BeMyyHxfoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTAyLTA2VDA2OjI1OjEyLTA1OjAwi7/FmgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wMi0wNlQwNjoyNToxMi0wNTowMPrifSYAAAAASUVORK5CYII=",
                sod: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MiA0OTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5MiA0OTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDYxLDEyNEgzMTlMMjQ2LDBsLTczLDEyNEgzMWw3MSwxMjJMMzEsMzY4aDE0Mmw3MywxMjRsNzMtMTI0aDE0MmwtNzEtMTIyTDQ2MSwxMjR6IE0yNDYsODggICAgbDIxLDM1aC00MkwyNDYsODh6IE0xMDcsMzI4bDIxLTM1bDIwLDM1SDEwN3ogTTEyOCwxOTlsLTIxLTM1aDQxTDEyOCwxOTl6IE0yNDYsNDA0bC0yMS0zNWg0MkwyNDYsNDA0eiBNMjkzLDMyOGgtOTRsLTQ2LTgyICAgIGw0Ni04Mmg5NGw0Niw4MkwyOTMsMzI4eiBNMzQ0LDMyOGwyMC0zNWwyMSwzNUgzNDR6IE0zNjQsMTk5bC0yMC0zNWg0MUwzNjQsMTk5eiIgZmlsbD0iIzAwMDBmZiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
                r2m: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABGdBTUEAAK/INwWK6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4AoICB4EiKsrEgAABWhJREFUOMtt1VlsXNUZB/D/d5Y7c2d17PGSsR3imOBAcOJAgqISEojVUJYWAmopEWoFCPOAKqBRJegbILFIFQLEE2IVqhqQuoGgEiiQRFhCLImtpCTOMiHxMp7xeDLbnXvn3nvO6QPClkXP0/f00/87y3cI/29dcRQY6QIaPrDoES5LEmKS0AwMLtQMMrbhN68Fu4oQ/nVBmtAEWGjswbaej+Cp72gFtu4bUH8KZrwEhD6sJ0b44INp7Tow1DQwNiEaB+XeqjL/udcVu/93wlT8EHVvN7Zn/40+O4GLzdoKlG48AzAGKENsKEnqtQkN1C0Mb7oCXdE0il4Fx78+DbQFfOw6acpBYC41R+m67AeUtWNm1q2ar2Z+s4wOHQOmvga6hxB7dydr/hwa9+bHuofT+wf6rMF4lHHH0+r8jH+2cKL2IkZ7XmP/mr6NrsocoB47YfJuUx+d/SV1pD9bQvmO/0JValhzfDtNAwYPl9/o2Zh+oL+ba9XULPA1pMXAY0zPFDXLf1t6lQXIsM1dvzUFt66Pze5FPHkQnUIuJ207AvHQNq4CrZCv77c3Z/4StRmq5xpfqFPV5ynf+t6sjgzwDeknUusS1/uBQfPL+ZfFqtgvdLH+R0qlPzYiEOwPHeGSya6fIuADAO8l5WPO95FnjWFj1U+BFAe6gK0nCOgB0MbZWPXTyLPGyMedc+D/GQTeAds7zSOfG1j/MFhKKu7KcyitjBfuEiO9h2CAcGL6Jmh+CFnb0iUnZJm4xJzbAle7xeb+gyAgPD63gwQfBxEX96xW3tMTEEtJbYsAwJCfZZrBuEFFnSmdhhuAO5mAYsLgTMVXFxZBEXaK1mcrZMs2JmU/JSwAIO+pCWBqyzIKJzQwBvDCCrUMSLM070l3kSXnKCJI2sb4hhNf024QqlVMUxwtA/i6CVcBIIOpLT90/aOpiw0dzleAIJy0spkyJaPtVm/n46l9bb9ncZjC/hOIjV5N4ECYW3yAMSlNo1UNzxYmIARER8IsbeWPhTo3bdL7dnFozPm5xXcljzyqwTYW7nrMAnp8a8e93Bs/oxCoDdFNA2MsAIKS837b3VsugoFXXh9XS48IAOjyo4jdsQX+oSkizowO/Yzs7HouXCg9TRF7GkpRbHiQAVD+fPklq7v9UdX0LjkTp7aC8ZxoSzItoMMjAz8kpfXHkB0dgR0H5hMpsjps1liol8NS5SE73gsrxVgjX0LljUcUELVSe5/ZQz5gqu6B9h0jOR1ClN+mkG08vnQ8on/XCAhA4cglxpwTpnz4Tdg3vQT322+gL6+1NfJeoM8+5WDtixA2+jjkWvI0dN39vHVewwDG2nkR/kxx+c5LASyeXBSGcx3IDbfHb3zlI3f8sMXXr+9IDgwdTqy5+u/o+nNnYt0ArHTHrVwLmzwVhNX6SX+xAlVrmqBQBnJblwdT8oaSDPwwMK36aCzb+09h28lmsfiObvrfJbtXvyAkh++25nUY5mTU2sy4jLv1+hf7PkzesDMB3Dc0iTAMV6Lx7UWEbnV3vLv3Qxm3Y4HjNdxK6Z7ea/s+Lh4tvZBIp/8Uj0viDNoPwGq1ZqG2MHszyeikZVmsvjCtcX7birFMkU2n9yQ6+96XMTsdNN2mU5r7FYvGDgorzo2VUt7sueFketWvheBdrZZ/srY4f8AEvBBpjxGT2qgwhD85tBLt2OlUI7FYynfdRqM8dwezop/xqCXqF2ZUZmiQlQ7+TQFPou/OPAIvBGNEzqUaSdvWRhuUL+aA3LUr0faf1SYZE1c6lfztIpr4hATJzHBnkIgCr74C3HLNLEumO5htR1Gr1eFUFxSTESNlBLXyNMzZa37yxf0PN7KCMbUxhSsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMTAtMDhUMDg6MzA6MDQtMDQ6MDBwaURzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTEwLTA4VDA4OjMwOjA0LTA0OjAwATT8zwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
                black_cursor: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABQCAQAAADxCu5rAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMzQDW3oAAAnySURBVFjDtZl7lNVl1cefw21ghjvkiIAgBZmmiZlUZuEyYpllmYWkdnlDC1qWZmlmZrHMqBYuvKSlltlSUIsUUzNqqXhdBS8K3t43bnEdQebuzPx+z7O/3+9+/zjzwsxxLszFc/4+57O+e+/vfp69n4BqJNTwAc3XiPB2fUAQROIG/7qPepsgkiSXI+PTdroPfHuUGEC6g8ixVVf7NC+8HeEC6U5RFF7St3y8D+j3cEGUSEruzLGHN/gJ/YyBAa6Gmk311dEoybFb1/vRPqifqyvx/r0X1SzO16OFLgC7+Jv0UZX1G4QSt/FbzYdl49LC7PmUAZJQzftsrg/tJ4hB2KkL8qEWMCFfEB/ALprkqMOD+pQq+idcEOp9QVaBgALGYU68K+6BJEcjV+s8H98viRc2+VetHIFBQeVxbvwTGkW5I+IJ/2o/lDRN2KhzbCiDggcPGG5nxvviduR0ZyOf0yU+ra9KJG7muXHY/0MUUJafmi+1jUWM4RVdoYl9UgMTtvPCWFEMVytmMI6LV+cvIpc7Ejfiar2vD32NiajWwrwiBQQGb8VoQJoef5ResUSJwA4u0/G9NihJ1unifERbiAcPDHhPXJyvs1rS3bmVN+mUXjqHJmzlNzDcDoTrAGagzUgX2iqroUtgte7Rab3qA0jEZp2Xyq0E4UFBgaPxxbgaDXJ3ZzWX6xP7R/TCjMBeLcg7UNJaBJXx3PSw1cPpYj0fwTwf02MlsmpekkZZSU4OqrHhaV72YNrD5O7M+A98UWN7CkGzrsjHpA4hrSUwPs5Jy7AJie7M+BS+oYk9STzIel0ZR3ccrgO5KePMeHPcSZe7IjfiMj+yB2YktnGhjUCnSlpRg9OH0222BwlySC/gCk0/ROcgCfu0KB9p3UECy9IJ+bVxHZrg9IgdvCnOPNS2wka/Mo3qPFxtKq1g0+yS9M/UAnd3bLdf6hgf0j0kJ9/0n6TxKaAbiAcFFjghfj1/Ui1yybSPK/zj3WIMYPKfZpUxWJfhOlBpAe+wRem/LSPkbjW8U6d00weKOflRGtNdTg5WmgImZl/L/2j/IUiyXv/Q+V1ecdEs281LbCS6zUkbPQWrwEfT3bGW7u7I+Ljma2SX50mzrsrHHZqSNs4pT2fmK7CfkoRmPK9FfniniRcafImNQw8gxeywzGbld+avG4r3gY34Xid9AI20zJdmldkhVFcHambHX6YNzIqYDfh+h30ARkC/ikfEYD2CtNbaEExLl2cbzCRZwg7eorcaFFHYz6swxnqo5ICaAZger7EthNxJ7uINOraD6qrRD/PK1IPqKjHoQDsq/iD7Z6olHYYqrtAcDSvxSe5LU6X1EuJBgQPsyHS+Pcw3KVFo4B91altIJuR+a6qMvQhXG0zgWHwh+2usFwXgDT6icw4YFM00+J35UXkvEt8egxHx0/Eha6YkMfEZff7AGU9Ev9kmpwL6AGktglE2L1+Vtih3AI1Yo//yw0MIaBLq/GcYj17npN1hMDzOsuu4qziDEpt1qSoDGoHcr4+Te+YTtfkyICBYQLAhNoQTsIivubu7HMBLWhSQCPkdNjn1KPHFP0aBA1CRRsdJ6eg4M52ePhPPxzX4K3e1QiiSawLqaMmX26QeKSlYRZqSjstn2ty0MF+c3WLL00P2DNbhZe1Ts+jucndJwrMBdYD8nvju7NAhA/XOdFG81e6Nq+xZ7EDOTC2CIEguSaJoJkMDdvC6gCiY32ZTetBWxvJivqQmZTLRi5Ep/jWBHHWswja8iCfxMG/DFdnUgBpagy+zwztqK8XEvgUyEb+wWri7k0yIaOZ+7OImrMMTXMmb8QO/UHN0ig7TET40hIBag/kdcUbeAYShw8Iez8uxnZQ7c9uK1byLP8Nlmq/T/YSmCT7eB/ugdhsavGmkr8TU0nCpeAUajMEslOgZqFP5IOrpzhau1Ic0VhU+pItJDG8kwh+LxzSXJJ6Bg9KMeFaai0kcWKJnPC/HZkrM+Rd/f/f3rgYjtSqdENu0leLtN86KN9p6ruZ3MbXkaB6g0/g3ZBSxTd/sdhmHJmPOWzHhYLgUGDAKZ9jvUxXdMz3Hz2JIyfl/pJZYFSQkPqYPdrMjw77ETL+P0w92YQ1Mk/MF8QFUkXJ3r9J1mlyS/jKeY88hp4TturgbLWhOpK+096ZCEcJynByX5q9aA6GiBTJ/VKdrQMlEOQ1LsRdyNPLutxy4JZA6AL4G744FCwwqzz+d3Z32mOgOYD9qGOmbeSUOax8wDePn8Ryjk3hZ5/rgriBVMPrj6cQsWLBKOzuuSjXFhaHxVS6z5aiRN3AVPsYSLTpat7NW7qzjbT6jK0gjjH6/HZsCJqWL49+sBk53NvF5XJpNszP5Aglt4XcxpiT5w3kRXiNE4jVc0IUW7AOi/syP4ET7Xlprb4JyRw3+hPO9MgRN4PXY797IFXZ8iVsKPAnLUUd31nOZpnQO2Skzvqjbea+9bC3FML3O3/pHfHgIIfggnYHnhaQN9hUML8nLWC60V0BXjjU6owvH08gmr1Ujje6MWMtrddLBaVBTeCsb5DW4w97L9i1zAE/GSjbJiSpeq3GdQfbAim5wuauFa7BAU9ounjRMX+a/3RNfwFcwjO28r0r+ENsoZ8RTmtOJKbEbxtZDATv5IOaX7hu8oPfYfcik/fwV3lXSYIbwE/YYWiRhL37cyRIBVZLkTmEHf+GzO/Kul+Nr9m951NM8iwPb92ROwmLbTjkzPKSTO14WPKtEogkbubjzlbOO5f2Wy3fzWhzRXouG8JNYzegCNmNRhw1fl/FJrrV7dJFP7XwFqJH4Dna6Z/g75mJQ+1LWUfy5XpfLmnivjuvg5z7VPocL9AEf3VXz8YI+iKcocKeu4YSSvAzjuVhLiMBmfLuDgdsLGqaK7teYPpo/RbU800M6pfQU5TH4DfZTYjNXaHqvd5VesNl8nCRf0yKOaD/zawS/ZGtBl2G95vXlEWQcl6BaqtVdOrFES4HH4w42SMQbvEnv6IMWnY0X3cGX9E2MLNEyiovwKikmrPfP9kXLUfwdorORf+AxFtD2djaIp9mjiJRQq1u6LqOutQzSPGykjGt5HsqKhdx6qy9Ls1sezXO6I/JJfbgvWibb7cilfVrKKcWLH4OVpUnx4y1LmrblrVPJ/+rLfYGU6UJscoc/zbNtGALK44yWeS03Zs+k12FyJxGxhzf37aFtplZJ8r28y87KZ7V8qenu7D9okUlOGdGM/+GfuaRPEB+E76OBonbjieypfKs1FQdRwdCALXxEl2myl/f10fADXAXIeXAeISKqsZ6/1nyfpol6X5/fjnyMrsJuuVxOAshRh3Vc6rN9eLEH98srZToVT7c+TLdgCx/ApTrJh/bzc65m8bf4F7bjZS7XPB3W3fPN/wF26MNxjaN4dQAAAABJRU5ErkJggg==",
                white_cursor: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABQCAQAAADxCu5rAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMzQDW3oAAAjrSURBVBgZtcELdNb1fcfx95MEQgJE5KJIh9UWJlJ1rYwzW7WFWi5tdafjYFt7seixWssmHmeVudrC1FMvTNRu80hRbDcd6oplejLrTsess3exjqE1ggbkfg1JniT////3/Xymdet5oCQkJL5eMIGpXMc0qngHzWctW2nib3gPJd4hz9BFIDbxTY7lHfJvJIQRLfw9p1DFO6CRwBgjyiznNEoMuFdICGOM2MsDvJ8qBtgqEsIYY0ROI7MZxIB6moTxoK5SQhhTZhWnM6CeIWF81rZrt17YNVYYkbOWeYxkwDxE4DG6q31f/nNdlGqEMRlrmE01A+RpcjxBD6VMWfpVxxXF+1VrRM52rmccA2I1Cdf70XJ7UqRo0h3xbmGM+TWXUscA+C6B3+Vvp86Q7PCGrluKSao2pqCZxUykRD89RYGn+CkXflvSrnR7dlJCGNHMYsbST/9IwmO9qqM9LP+Woim7s5ilEcYEO7ibU+mXBwg83iuiU5bfpkKtejyfkQYLY1pYzpn0QyMZGuX7u9oKyRV25Q+lqcYYs5vlTOGoLSOhGv9t1haSKyS1pe93zsqHCyPaaOQT1HFUVpDwJD8YXfKhtLdoTF/S8caYdh7nXI7KY+R4vB/O20PyIUIder7zynycMaLMc8xjFH12Fwkf62V5Z0g+jDw9F5+PIcKYnP/kAvrsQbrQaN+ZymH5cNQRP+66Ip+kWiM6WM9fMY4+WUaBqn1H1/7C4cNTV/wmbo0JgTHmf7iS4fTBbSQ8wrcX7SG5W3JTtriY7JIxGU0sZgK9towOdLKXRyb3qIjNxZJ8QkIY08xNjKeXlpChBt+XtSTJPYum7Lb8wxphTLCJpUymV24hx8f41tQeknumPHbH6mJmMUQYs5v7OZNe+Dva0TDfnLXkknthb7GiONcYY/awnDM5osVkCF+b7S4c7oWkfcVj2Yy8QRizn0Y+QR09uokCj/FStcty78S+YnXxBY02xnSymvPo0RLK6Dh/O98Xknsp1Kqf5Jd3nWCMaGUNFzGKbi0kQ7W+Od8fkvugKH6SXRJDhTHBs1xItxbTiYZ4YTpQSO4LdcQzXfPy90atEWV+ynxO4LAWUUbVvirflivcN8qK9em2ODUwxrzKX9DAYSwgx3W+Ie1LkvtOr6ZF2URjTMZ6vs7J/J4bOYBG+ZZoC8l9pzxez5cUExLGmK3czIkc4lraUa2/me8sFD46sTFbnJ8Vw40xr3MbEzjIV8hQja9Oe5PkoyJl8UZ6Is3Ia40xu7iPD1DhevYSg315sTcL+eipnB7sOlcYY1q4nz/id66kDeEr8s2Zwv2QtCs9kp9TNAhj9vJ9plPHb11GJ6rz12KPJPePytm/ZJdqpEvGiNV8lBJvuoY9xDH+62JvIfloybYsa1c8pY+5ZIxo4WlmUQeXcABVeX6xOYXcF7IsyykVram1qznW5y+lf4874mxjjDFmNePhUlpRlS+OnUlyb0WRWtKefFN6ITVm38vuTN/oXBCfKz4VH9EfaLAxxpjgBabCFewmqjwn39gV4V5J3lI8kd+RbsivjgvjtHRSHK86N7jauGSMMcYY8yBTYC5lVOXLUnOE3Ct7/YCmaYzr3eBBxhhjjDHCHGAPW3iR/+IRZjIM5tGK6nxd7A/JvbJBCzTcGCOMSQSt7OQNfsWPeIR7WMhXOZ+PcDyDeNPF7ESD/eXitTzCvbIlbojRxpiczTxHI99lKdfxFWbyQRoYyyE+SQfCF0VzEfKhIsLyITI/4Q+5ZMx+lnE2Z3AMI6mmW19kB1Hl2emNTPIhDqS1+S9ikzokV2rSVzXUmAPcy2iOaA7bEZ5brM+SXCG0P384fSZmaGH8OgpXKut7caowZh2zOaLplFG1L4vmCPl3Cm2KZZ1nJ4zfo/vUKlcIr4tLot6YPdxMHUfwOZqJWl8S23KH36Yofl7cFH+iIca43l+KdRGu1KplmmRMzg85kyOYzVaE56aX8iS/SbEnPdMxNx8jjDHGk3V/HJAP8rz+TFXG7ORGaunReexDeIaak+Q37c6+U3w06oUx7ZRJqMaX6mX5INt1q04wxjzPKfRoDhsJPK1oKjuy2Bkr8tNTjTCmix/wMK8TeKpXOXOlzGs0WzXGNDOfGnrwIbYhPCe9mIpYXyzKpqhkTNDCk3yQ47iXMh7jhdosH2S3FmuMMR08xLvowUx2EFX+vJv8s3SjJqpGGLORu/lj3vJFmjCeph9GIVfI/JTPccmYDZxPiW59nFeIGp/ieZ4dY4QxGa+xgPGUeMup/CsJj/GNsTV8kNe0QMOM6WAlx9OtM9iNMK51lTGmnR9xGXX8v2q+xnZc7Y9rjZIrdeifY7Iw5jdcQLdmsJnAGGOCdlYynWFUOoUnKfBJvlstcgX55bg8hhqznyUMpRvTeZnAGCM2spz3cqh6rmcrrvdnY22EK7Vphd5nTM6zTKEbEyljjEm8wjVMoMTvm85zGE/SvdEiH+S/daGqjdnDN6jnsN7Hk5QxB3iBTzOEwxvBP5DhGn9B6+SD7NJSjTXGrGcy3fg0P2Ad3+GTlOhOidn8DOEPeKVyuULuZ3W+Bhmzhaup5rBGcR6TOY5qejKSpbTh0b4mXg+50j59SycY08mjvJt++SwvYXyOnoxCrpB7jae5ZMwWLqCKfpjEYwQe5eu1Va4gN+sv1WBMJ49zHP1QzVVsxdWe4acdrtSpVXGGMGIDn6JEP0xgJYFP9O3aJ1eQX9WfR70wbdzFcFdx1IZyFZtxnefoF5Ir6EDck8YFpuCXdVM9nn44h//A+A99l/bLb5GUlMcb2dfbhghjWriOfmlgKQkP9mfixbCkiHKxoevRzvkdJyaMEZ01y+iXEh/jxwifpgdSR7SnpvKK8p8WJ0W1S8aYvHbb3Gfpp5F8i1bc4NnFLeVF5VnFMFcbY0TQyS+5hgEwh3UY40EaEVXGGJGzg59yOx9mQEzknxDGGCNEwXYaWcDpDKf/PNg1VHM5mxBGJNp5lZV8mbEMJJ9890wWsZOgnbXcwyzG8X9UqzMYKPdefOWOYx/jKs6iF/4XEkyQUVUS8EAAAAAASUVORK5CYII="
            };
            commons = {
                bar: "nagishli#NagishLiTag > #NagishLiBar",
                menus: "nagishli#NagishLiTag > #NagishLiBar > #NagishLiMenus",
                dropdown: "nagishli#NagishLiTag > #NagishLiBar > #NagishLiMenus > .dropdown",
                checkmark: '<span class="sign">&#x2714;&#xfe0e;&nbsp;&nbsp;</span>',
                not: "#NagishLiTag *, html, head, script, style, br, img"
            };
            $NagishLi = jQuery;
            $NagishLi(function(b) {
                function I(c, e) {
                    e = void 0 === e ? "grayscale" : e;
                    if (b("body").attr("nl-colors") != e) {
                        if ("custom" == b("body").attr("nl-colors") && (b("*").not(commons.not).each(function() {
                                for (var c =
                                    b(this).length; c--;) b(this)[c].style.setProperty("background-color", "", ""), b(this)[c].style.setProperty("color", "", "")
                            }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG, " + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT").css({
                                "background-color": "transparent",
                                display: "none"
                            }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors").children("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #colorPanel > li.selected").removeClass("selected"),
                                b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.bg + "'] > li[aria-label='" + phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("background-color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" + phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" +
                                phrases.bg + "'] > li[aria-label='" + phrases.clr_custom + "']").attr("aria-label", phrases.aria_select_bgcolor).css("background-color", b("body").css("background-color")), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" + phrases.clr_custom + "']").attr("aria-label", phrases.aria_select_txtcolor).css("color", b("body").css("color"))), "100%" != b("html").css("height") && b("html").css("height", "100%"), b(":root").css({
                                filter: "grayscale(100%)",
                                "-webkit-filter": "grayscale(100%)",
                                "-khtml-filter": "grayscale(100%)",
                                "-ms-filter": "grayscale(100%)",
                                "-o-filter": "grayscale(100%)",
                                "-moz-filter": "grayscale(100%)"
                            }), b("body").attr("nl-colors", e), c) return b("" + commons.dropdown + " > #NagishLiColors > li > #NLGrayscaleColors").attr("aria-label", phrases.aria_the_option + phrases.blind + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiColors").prev("div.dropdown-toggle").hasClass("open") ||
                        b('<span class="selected">' + phrases.blind + "</span>").insertAfter(b("" + commons.dropdown + " > #NagishLiColors").prev("div", ".dropdown-toggle").children(".dropdown-title")), !1
                    } else b("body").removeAttr("nl-colors"), b("html").css("height", ""), b(":root").css({
                        filter: "",
                        "-webkit-filter": "",
                        "-khtml-filter": "",
                        "-ms-filter": "",
                        "-o-filter": "",
                        "-moz-filter": ""
                    }), e = "normal";
                    l("NagishLi", "write", "colors", "", e)
                }

                function V(c, e) {
                    c = void 0 === c ? !1 : c;
                    e = void 0 === e ? "invert" : e;
                    if (b("body").attr("nl-colors") != e) {
                        if ("custom" ==
                            b("body").attr("nl-colors") && (b("*").not(commons.not).each(function() {
                                for (var c = b(this).length; c--;) b(this)[c].style.setProperty("background-color", "", ""), b(this)[c].style.setProperty("color", "", "")
                            }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG, " + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT").css({
                                "background-color": "transparent",
                                display: "none"
                            }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors").children("span.sign").remove(),
                                b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #colorPanel > li.selected").removeClass("selected"), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.bg + "'] > li[aria-label='" + phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("background-color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" +
                                phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.bg + "'] > li[aria-label='" + phrases.clr_custom + "']").attr("aria-label", phrases.aria_select_bgcolor).css("background-color", b("body").css("background-color")), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" +
                                phrases.clr_custom + "']").attr("aria-label", phrases.aria_select_txtcolor).css("color", b("body").css("color"))), "100%" != b("html").css("height") && b("html").css("height", "100%"), b(":root").css({
                                filter: "invert(100%)",
                                "-webkit-filter": "invert(100%)",
                                "-khtml-filter": "invert(100%)",
                                "-ms-filter": "invert(100%)",
                                "-o-filter": "invert(100%)",
                                "-moz-filter": "invert(100%)"
                            }), b("body").attr("nl-colors", e), c) return b("" + commons.dropdown + " > #NagishLiColors > li > #NLInvertColors").attr("aria-label", phrases.aria_the_option +
                            phrases.invert + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiColors").prev("div.dropdown-toggle").hasClass("open") || b('<span class="selected">' + phrases.impaired + "</span>").insertAfter(b("" + commons.dropdown + " > #NagishLiColors").prev("div", ".dropdown-toggle").children(".dropdown-title")), !1
                    } else b("body").removeAttr("nl-colors"), b("html").css("height", ""), b(":root").css({
                        filter: "",
                        "-webkit-filter": "",
                        "-khtml-filter": "",
                        "-ms-filter": "",
                        "-o-filter": "",
                        "-moz-filter": ""
                    }), e = "normal";
                    l("NagishLi", "write", "colors", "", e)
                }

                function C(c, e) {
                    c = void 0 === c ? "warm" : c;
                    e = void 0 === e ? !1 : e;
                    if (b("body").attr("nl-colors") != c) {
                        "custom" == b("body").attr("nl-colors") && (b("*").not(commons.not).each(function() {
                            for (var c = b(this).length; c--;) b(this)[c].style.setProperty("background-color", "", ""), b(this)[c].style.setProperty("color", "", "")
                        }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG, " +
                            commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT").css({
                            "background-color": "transparent",
                            display: "none"
                        }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors").children("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #colorPanel > li.selected").removeClass("selected"), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.bg + "'] > li[aria-label='" +
                            phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("background-color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" + phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.bg + "'] > li[aria-label='" + phrases.clr_custom + "']").attr("aria-label",
                            phrases.aria_select_bgcolor).css("background-color", b("body").css("background-color")), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" + phrases.clr_custom + "']").attr("aria-label", phrases.aria_select_txtcolor).css("color", b("body").css("color")));
                        var d = "sepia(80%)" + ("cold" == c ? " hue-rotate(200deg)" : "") + "";
                        "normal" != c && "100%" != b("html").css("height") && b("html").css("height", "100%");
                        b(":root").css({
                            filter: d,
                            "-webkit-filter": d,
                            "-khtml-filter": d,
                            "-ms-filter": d,
                            "-o-filter": d,
                            "-moz-filter": d
                        });
                        b("body").attr("nl-colors", c);
                        if (e) return "warm" == c ? (b("" + commons.dropdown + " > #NagishLiColors > li > #NLWarmColors").attr("aria-label", phrases.aria_the_option + phrases.bl_filter + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiColors").prev("div.dropdown-toggle").hasClass("open") || b('<span class="selected">' +
                            phrases.bl_filter + "</span>").insertAfter(b("" + commons.dropdown + " > #NagishLiColors").prev("div", ".dropdown-toggle").children(".dropdown-title"))) : (b("" + commons.dropdown + " > #NagishLiColors > li > #NLColdColors").attr("aria-label", phrases.aria_the_option + phrases.lc_filter + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiColors").prev("div.dropdown-toggle").hasClass("open") ||
                        b('<span class="selected">' + phrases.lc_filter + "</span>").insertAfter(b("" + commons.dropdown + " > #NagishLiColors").prev("div", ".dropdown-toggle").children(".dropdown-title"))), !1
                    } else b("body").removeAttr("nl-colors"), b("html").css("height", ""), b(":root").css({
                        filter: "",
                        "-webkit-filter": "",
                        "-khtml-filter": "",
                        "-ms-filter": "",
                        "-o-filter": "",
                        "-moz-filter": ""
                    }), c = "normal";
                    l("NagishLi", "write", "colors", "", c)
                }

                function G(c, e, d, f, u, J) {
                    c = void 0 === c ? "bg" : c;
                    d = void 0 === d ? !1 : d;
                    D && (J = l(name, "read", "colors"), -1 !==
                    J.indexOf(",") ? (f = 1 < J.split(",")[0].length ? J.split(",")[0] : "-", u = 1 < J.split(",")[1].length ? J.split(",")[1] : "-") : u = f = "-");
                    d ? (b("body").attr("nl-colors", "custom"), d = {
                        "#000000": phrases.clr_black,
                        "#6495ed": phrases.clr_blue,
                        "#3cb371": phrases.clr_green,
                        "#ffd800": phrases.clr_yellow,
                        "#e95d4f": phrases.clr_red,
                        "#ffa500": phrases.clr_orange,
                        "#a569bd": phrases.clr_purple,
                        "#ff78bb": phrases.clr_pink,
                        "#ffffff": phrases.clr_white,
                        "#a3a3a3": phrases.clr_gray,
                        custom: phrases.clr_custom
                    }, "bg" == c ? (c = "he" == p ? "undefined" !==
                    typeof d[n(e)] ? phrases.bg + " " + d[n(e)] : d.custom : "undefined" !== typeof d[n(e)] ? d[n(e)] + " " + phrases.bg.toLowerCase() : d.custom, b("*").not(commons.not).each(function() {
                        for (var c = b(this).length; c--;) b(this)[c].style.setProperty("background-color", e, "important")
                    }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG").css({
                        "background-color": e,
                        display: "inline-block"
                    }).attr("aria-label", c)) : (c = "he" == p ? "undefined" !== typeof d[n(e)] ? phrases.txt + " " + d[n(e)] : d.custom :
                        "undefined" !== typeof d[n(e)] ? d[n(e)] + " " + phrases.txt.toLowerCase() : d.custom, b("*").not(commons.not).each(function() {
                        for (var c = b(this).length; c--;) b(this)[c].style.setProperty("color", e, "important")
                    }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT").css({
                        "background-color": e,
                        display: "inline-block"
                    }).attr("aria-label", c)), b("div#NLCustomColors").children("span.sign").length || (b("" + commons.dropdown + " > #NagishLiColors > li.active > #NLNormalColors").children("span.sign").remove(),
                        b("" + commons.dropdown + " > #NagishLiColors > li.active > #NLNormalColors").parent("li.active").removeClass("active"), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors").parent("li.not-clickable").addClass("active"), b(commons.checkmark).prependTo(b("div#NLCustomColors")), b("" + commons.dropdown + " > #NagishLiColors").prev("div.dropdown-toggle").hasClass("open") || b('<span class="selected">' + phrases.custom_colors + "</span>").insertAfter(b("" + commons.dropdown + " > #NagishLiColors").prev("div",
                        ".dropdown-toggle").children(".dropdown-title")))) : b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel > li.selected").length ? ("custom" != b("body").attr("nl-colors") && (b("html").css("height", ""), b(":root").css({
                        filter: "",
                        "-webkit-filter": "",
                        "-moz-filter": "",
                        "-khtml-filter": "",
                        "-ms-filter": "",
                        "-o-filter": ""
                    })), b("body").attr("nl-colors", "custom"), e = b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel > li.selected").css("background-color"),
                        "bg" == c ? (b("*").not(commons.not).each(function() {
                            for (var c = b(this).length; c--;) b(this)[c].style.setProperty("background-color", e, "important")
                        }), f = n(e)) : (b("*").not(commons.not).each(function() {
                            for (var c = b(this).length; c--;) b(this)[c].style.setProperty("color", e, "important")
                        }), u = n(e)), l("NagishLi", "write", "colors", "", f + "," + u)) : ("bg" == c ? (b("*").not(commons.not).each(function() {
                        for (var c = b(this).length; c--;) b(this)[c].style.setProperty("background-color", "", "")
                    }), f = "-") : (b("*").not(commons.not).each(function() {
                        for (var c =
                            b(this).length; c--;) b(this)[c].style.setProperty("color", "", "")
                    }), u = "-"), l("NagishLi", "write", "colors", "", "-" == f && "-" == u ? "normal" : f + "," + u), "-" == f && "-" == u && b("body").removeAttr("nl-colors"))
                }

                function x(c) {
                    c = void 0 === c ? "normal" : c;
                    "custom" == b("body").attr("nl-colors") ? (b("*").not(commons.not).each(function() {
                        for (var c = b(this).length; c--;) b(this)[c].style.setProperty("background-color", "", ""), b(this)[c].style.setProperty("color", "", "")
                    }), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG, " +
                        commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT").css({
                        "background-color": "transparent",
                        display: "none"
                    }).removeAttr("aria-label"), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors").children("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #colorPanel > li.selected").removeClass("selected"), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" +
                        phrases.bg + "'] > li[aria-label='" + phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("background-color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" + phrases.clr_custom + "'] > input#NLColorPicker").attr("value", n(b("body").css("color"))), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.bg + "'] > li[aria-label='" +
                        phrases.clr_custom + "']").removeClass("selected").attr("aria-label", phrases.aria_select_bgcolor).css("background-color", b("body").css("background-color")), b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li[aria-label='" + phrases.clr_custom + "']").removeClass("selected").attr("aria-label", phrases.aria_select_txtcolor).css("color", b("body").css("color"))) : (b("html").css("height", ""), b(":root").css({
                        filter: "",
                        "-webkit-filter": "",
                        "-moz-filter": "",
                        "-khtml-filter": "",
                        "-ms-filter": "",
                        "-o-filter": ""
                    }));
                    b("body").removeAttr("nl-colors");
                    l("NagishLi", "write", "colors", "", c)
                }

                function w(c) {
                    (void 0 === c ? 0 : c) ? (b("" + commons.dropdown + " > #NagishLiText > li > #NLNormalText").removeClass("active").find("span.sign").remove(), c = l(name, "read", "text")) : (c = 16 != parseInt(b("body").css("font-size")) ? parseInt(b("body").css("font-size")) : 16, c += 1);
                    var e = c;
                    b("*").not(commons.not).each(function() {
                        // for (var c = b(this).length; c--;) {
                        var style = window.getComputedStyle(this, null);
                        var fontSize = style.getPropertyValue("font-size").replace( /\D+/g, '');
                        // b(this)[c].style.setProperty("font-size", fontSize + 1 + "px", "important")
                        this.style.setProperty("font-size", ++fontSize + "px", "important")
                        // }
                    });
                    "he" == p ? b("" + commons.dropdown + " > .dropdown-toggle > #NLTextVal")[0].innerHTML = ":&nbsp;" + e : b("" + commons.dropdown + " > .dropdown-toggle > #NLTextVal")[0].innerHTML = ":&nbsp;" + e + "px";
                    b("body").attr("nl-text", e);
                    l("NagishLi", "write", "text", "", e)
                }

                function q(c) {
                    (void 0 === c ? 0 : c) ? (b("" + commons.dropdown + " > #NagishLiText > li > #NLNormalText").removeClass("active").find("span.sign").remove(), c = l(name, "read", "text")) : (c = 16 != parseInt(b("body").css("font-size")) ? parseInt(b("body").css("font-size")) :
                        16, --c);
                    var e = Math.max(0, c);
                    b("*").not(commons.not).each(function() {
                        // for (var c = b(this).length; c--;) {
                        var style = window.getComputedStyle(this, null);
                        var fontSize = style.getPropertyValue("font-size").replace( /\D+/g, '');
                        if (fontSize <= 0) return;
                        this.style.setProperty("font-size", --fontSize + "px", "important")
                        // b(this)[c].style.setProperty("font-size", e + "px", "important");
                        // }
                    });
                    "he" == p ? b("" + commons.dropdown + " > .dropdown-toggle > #NLTextVal")[0].innerHTML = ":&nbsp;" + e : b("" + commons.dropdown + " > .dropdown-toggle > #NLTextVal")[0].innerHTML = ":&nbsp;" + e + "px";
                    b("body").attr("nl-text", e);
                    l("NagishLi", "write", "text", "", e)
                }

                function v(c) {
                    c = void 0 === c ? "0" : c;
                    b("body[nl-text]").length && (b("body").removeAttr("nl-text"), b("*").not(commons.not).each(function() {
                        for (var c =
                            b(this).length; c--;) b(this)[c].style.setProperty("font-size", "", ""), "0px" == b(this).css("font-size") && b(this)[c].style.setProperty("font-size", "initial", "")
                    }), b("" + commons.dropdown + " > .dropdown-toggle > #NLTextVal")[0].innerHTML = "", l("NagishLi", "write", "text", "", c))
                }

                function X(c) {
                    c = void 0 === c ? !1 : c;
                    if ("text" != b("body").attr("nl-display")) {
                        b("body").attr("nl-display", "text");
                        S();
                        b("link[rel='stylesheet']").prop("disabled", !0);
                        b("body > *").not("#NagishLiBar").css("visibility", "");
                        b("body > .fb-like, img").not("#NagishLiBar img").css("display",
                            "none");
                        b("iframe[src*='youtube.com'], video").css("visibility", "hidden");
                        b("body").css("background-image", "none");
                        var d = "textonly"
                    } else b("body").removeAttr("nl-display"), b("link[rel='stylesheet']").prop("disabled", !1), b("body > .fb-like, img").not("#NagishLiBar img").css("display", ""), b("iframe[src*='youtube.com'], video").css("visibility", ""), b("body").css("background-image", ""), d = "normal";
                    if (c) return b("" + commons.dropdown + " > #NagishLiDisplay > li > #NLTextDisplay").attr("aria-label", phrases.aria_the_option +
                        phrases.text_only + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiDisplay").prev("div.dropdown-toggle").hasClass("open") || b('<span class="selected">' + phrases.text_only + "</span>").insertAfter(b("" + commons.dropdown + " > #NagishLiDisplay").prev("div", ".dropdown-toggle").children(".dropdown-title")), !1;
                    l("NagishLi", "write", "display", "", d)
                }

                function A(c, d) {
                    "images" != b("body").attr("nl-display") ?
                        (b("body").attr("nl-display", "images"), S(), b("link[rel='stylesheet']").prop("disabled") && b("link[rel='stylesheet']").prop("disabled", !1), b("body > *").not("#NagishLiTag").css("visibility", "hidden"), b("body > .fb-like").css("display", "none"), b("iframe[src*='youtube.com'], video").css("visibility", "hidden"), b("body").css("background-image", ""), b("img").css({
                            visibility: "visible",
                            display: ""
                        }), d = "imagesonly") : (b("body").removeAttr("nl-display"), b("body > *").not("#NagishLiBar").css("visibility", ""), b("body > .fb-like").css("display",
                        ""), d = "normal");
                    if (c) return b("" + commons.dropdown + " > #NagishLiDisplay > li > #NLImagesDisplay").attr("aria-label", phrases.aria_the_option + phrases.images_only + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(), b("" + commons.dropdown + " > #NagishLiDisplay").prev("div.dropdown-toggle").hasClass("open") || b('<span class="selected">' + phrases.images_only + "</span>").insertAfter(b("" + commons.dropdown + " > #NagishLiDisplay").prev("div",
                        ".dropdown-toggle").children(".dropdown-title")), !1;
                    l("NagishLi", "write", "display", "", d)
                }

                function Y(c) {
                    c = void 0 === c ? "normal" : c;
                    b("body[nl-display]").length && (b("body").removeAttr("nl-display"), b("link[rel='stylesheet']").prop("disabled") && b("link[rel='stylesheet']").prop("disabled", !1), b("body > *, img, iframe[src*='youtube.com'], video").css({
                        display: "",
                        visibility: ""
                    }), b("body").css("background-image", ""), l("NagishLi", "write", "display", "", c))
                }

                function Z(c) {
                    if (c) return b("" + commons.dropdown + " > #NagishLiHighlight > li > #NLHighlightLinks").attr("aria-label",
                        phrases.aria_the_option + phrases.hl_links + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active"), b("* a").not("#NagishLiBar a").each(function() {
                        this.style.setProperty("outline", "3px red dotted", "important");
                        this.style.setProperty("background-color", "black", "important");
                        this.style.setProperty("color", "yellow", "important");
                        b("body").attr("nl-hl-links", "1")
                    }), !1;
                    b("body[nl-hl-links]").length ? (b("* a").not("#NagishLiBar a").each(function() {
                        this.style.setProperty("outline", "", "");
                        this.style.setProperty("background-color", "", "");
                        this.style.setProperty("color", "", "")
                    }), b("body[nl-hl-headings]").length && b("h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, h1 span, h2 span, h3 span, h4 span, h5 span, h6 span").each(function() {
                        this.style.setProperty("color", "inherit", "important")
                    }), b("body").removeAttr("nl-hl-links"), c = "0") : (b("* a").not("#NagishLiBar a").each(function() {
                        this.style.setProperty("outline", "3px red dotted", "important");
                        this.style.setProperty("background-color", "black", "important");
                        this.style.setProperty("color", "yellow", "important")
                    }), b("body").attr("nl-hl-links", "1"), c = "1");
                    l("NagishLi", "write", "highlight", 1, c)
                }

                function aa(c) {
                    if (c) return b("" + commons.dropdown + " > #NagishLiHighlight > li > #NLHighlightHeadings").attr("aria-label", phrases.aria_the_option + phrases.hl_headings + " " + phrases.r2m_on).prepend(commons.checkmark).parent("li").addClass("active"), b("h1, h2, h3, h4, h5, h6").each(function() {
                        this.style.setProperty("outline", "3px red dotted", "important");
                        this.style.setProperty("background",
                            "black", "important");
                        this.style.setProperty("color", "yellow", "important")
                    }), b("body[nl-hl-links]").length || b("h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, h1 span, h2 span, h3 span, h4 span, h5 span, h6 span").each(function() {
                        this.style.setProperty("color", "inherit", "important")
                    }), b("body").attr("nl-hl-headings", "1"), !1;
                    b("body[nl-hl-headings]").length ? (b("h1, h2, h3, h4, h5, h6").each(function() {
                        this.style.setProperty("outline", "", "");
                        this.style.setProperty("background", "", "");
                        this.style.setProperty("color",
                            "", "")
                    }), b("body[nl-hl-links]").length || b("h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, h1 span, h2 span, h3 span, h4 span, h5 span, h6 span").each(function() {
                        this.style.setProperty("color", "", "")
                    }), b("body").removeAttr("nl-hl-headings"), c = "0") : (b("h1, h2, h3, h4, h5, h6, h1").each(function() {
                        this.style.setProperty("outline", "3px red dotted", "important");
                        this.style.setProperty("background", "black", "important");
                        this.style.setProperty("color", "yellow", "important")
                    }), b("body[nl-hl-links]").length || b("h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, h1 span, h2 span, h3 span, h4 span, h5 span, h6 span").each(function() {
                        this.style.setProperty("color",
                            "inherit", "important")
                    }), c = "1", b("body").attr("nl-hl-headings", "1"));
                    l("NagishLi", "write", "highlight", 2, c)
                }

                function ba(c) {
                    if ("zoom" in document.documentElement.style) c ? (c = l("NagishLi", "read", "zoom", ""), c = +c) : (c = b("body[style*='zoom']").length ? -1 !== b("body").css("zoom").indexOf("%") ? parseInt(b("body").css("zoom")) / 100 : parseFloat(b("body").css("zoom")) : 1, c = +(c + .1).toFixed(1)), b("body").css("zoom", c), b("body > iframe").css({
                        "-webkit-transform-origin": "0 0",
                        "-moz-transform-origin": "0 0",
                        "-khtml-transform-origin": "0 0",
                        "-ms-transform-origin": "0 0",
                        "-o-transform-origin": "0 0",
                        "-webkit-transform": "scale(" + c + ")",
                        "-moz-transform": "scale(" + c + ")",
                        "-khtml-transform": "scale(" + c + ")",
                        "-ms-transform": "scale(" + c + ")",
                        "-o-transform": "scale(" + c + ")"
                    });
                    else if ("transform" in document.documentElement.style) c ? (c = l("NagishLi", "read", "zoom", ""), c = +c) : (b("body[style*='transform: scale']").length ? (c = b("body").css("transform").match(/-?[\d\.]+/g), c = parseFloat(c[0])) : c = 1, c = +(c + .1).toFixed(1)), b("body, body > iframe").css({
                        "-webkit-transform-origin": "0 0",
                        "-moz-transform-origin": "0 0",
                        "-khtml-transform-origin": "0 0",
                        "-ms-transform-origin": "0 0",
                        "-o-transform-origin": "0 0",
                        "-webkit-transform": "scale(" + c + ")",
                        "-moz-transform": "scale(" + c + ")",
                        "-khtml-transform": "scale(" + c + ")",
                        "-ms-transform": "scale(" + c + ")",
                        "-o-transform": "scale(" + c + ")"
                    });
                    else return alert(phrases.not_supported), !1;
                    l("NagishLi", "write", "zoom", "", c);
                    b("html")[0].style.setProperty("overflow-y", "auto", "important");
                    b(commons.bar)[0].style.setProperty("position", "absolute", "important");
                    b("" +
                        commons.dropdown + " > #NagishLiMisc > li.not-clickable > #NLZoom > #NLZoomVal")[0].innerHTML = c + "&nbsp;";
                    "0px" == b(commons.bar).css("top") && b(commons.bar)[0].style.setProperty("top", b("html").offset().top, "important")
                }

                function ca(c) {
                    if ("zoom" in document.documentElement.style) c ? (c = l("NagishLi", "read", "zoom", ""), c = +c) : (c = b("body[style*='zoom']").length ? -1 !== b("body").css("zoom").indexOf("%") ? parseInt(b("body").css("zoom")) / 100 : parseFloat(b("body").css("zoom")) : 1, c = +(c - .1).toFixed(1)), b("body").css("zoom",
                        c), b("body > iframe").css({
                        "-webkit-transform-origin": "0 0",
                        "-moz-transform-origin": "0 0",
                        "-khtml-transform-origin": "0 0",
                        "-ms-transform-origin": "0 0",
                        "-o-transform-origin": "0 0",
                        "-webkit-transform": "scale(" + c + ")",
                        "-moz-transform": "scale(" + c + ")",
                        "-khtml-transform": "scale(" + c + ")",
                        "-ms-transform": "scale(" + c + ")",
                        "-o-transform": "scale(" + c + ")"
                    });
                    else if ("transform" in document.documentElement.style) c ? (c = l("NagishLi", "read", "zoom", ""), c = +c) : (b("body[style*='transform: scale']").length ? (c = b("body").css("transform").match(/-?[\d\.]+/g),
                        c = parseFloat(c[0])) : c = 1, c = +(c - .1).toFixed(1)), b("body, body > iframe").css({
                        "-webkit-transform-origin": "0 0",
                        "-moz-transform-origin": "0 0",
                        "-khtml-transform-origin": "0 0",
                        "-ms-transform-origin": "0 0",
                        "-o-transform-origin": "0 0",
                        "-webkit-transform": "scale(" + c + ")",
                        "-moz-transform": "scale(" + c + ")",
                        "-khtml-transform": "scale(" + c + ")",
                        "-ms-transform": "scale(" + c + ")",
                        "-o-transform": "scale(" + c + ")"
                    });
                    else return alert(phrases.not_supported), !1;
                    l("NagishLi", "write", "zoom", "", c);
                    1 >= c && "absolute" == b(commons.bar).css("position") &&
                    (b("html")[0].style.setProperty("overflow-y", "", ""), b(commons.bar)[0].style.setProperty("position", "fixed", "important"));
                    b("" + commons.dropdown + " > #NagishLiMisc > li.not-clickable > #NLZoom > #NLZoomVal")[0].innerHTML = c + "&nbsp;"
                }

                function da(c) {
                    c = void 0 === c ? "0.0" : c;
                    b("body, body > iframe").css({
                        zoom: "",
                        "-webkit-transform-origin": "",
                        "-moz-transform-origin": "",
                        "-khtml-transform-origin": "",
                        "-ms-transform-origin": "",
                        "-o-transform-origin": "",
                        "-webkit-transform": "",
                        "-moz-transform": "",
                        "-khtml-transform": "",
                        "-ms-transform": "",
                        "-o-transform": ""
                    });
                    b("html")[0].style.setProperty("overflow-y", "", "");
                    b(commons.bar)[0].style.setProperty("position", "fixed", "important");
                    b("" + commons.dropdown + " > #NagishLiMisc > li.not-clickable > #NLZoom > #NLZoomVal").empty();
                    l("NagishLi", "write", "zoom", "", c)
                }

                function ea(c, d) {
                    c = void 0 === c ? "readable" : c;
                    d = void 0 === d ? !1 : d;
                    b("body[nl-font]").length ? (b("body").removeAttr("nl-font"), b("body *").not(commons.not).each(function() {
                        this.style.setProperty("font-family", "", "")
                    }), b("" + commons.dropdown +
                        " > #NagishLiMisc > li > #NLFont > #NLFontVal").text(phrases.normal), c = "normal") : (b("body").attr("nl-font", "readable"), b("body *").not(commons.not).each(function() {
                        this.style.setProperty("font-family", "Arial, Helvetica, sans-serif", "important")
                    }), b("" + commons.dropdown + " > #NagishLiMisc > li > #NLFont > #NLFontVal").text(phrases.font_readable));
                    d || l("NagishLi", "write", "font", "", c)
                }

                function B(c, d) {
                    "TL" == c ? (b(commons.bar)[0].style.setProperty("top", "0", "important"), b(commons.bar)[0].style.setProperty("bottom",
                        "auto", "important"), b(commons.bar)[0].style.setProperty("left", "0", "important"), b(commons.bar)[0].style.setProperty("right", "auto", "important")) : "BR" == c ? (b(commons.bar)[0].style.setProperty("bottom", "0", "important"), b(commons.bar)[0].style.setProperty("top", "auto", "important"), b(commons.bar)[0].style.setProperty("right", "0", "important"), b(commons.bar)[0].style.setProperty("left", "auto", "important")) : "TR" == c ? (b(commons.bar)[0].style.setProperty("bottom", "auto", "important"), b(commons.bar)[0].style.setProperty("top",
                        "0", "important"), b(commons.bar)[0].style.setProperty("right", "0", "important"), b(commons.bar)[0].style.setProperty("left", "auto", "important")) : "BL" == c && (b(commons.bar)[0].style.setProperty("bottom", "0", "important"), b(commons.bar)[0].style.setProperty("top", "auto", "important"), b(commons.bar)[0].style.setProperty("right", "auto", "important"), b(commons.bar)[0].style.setProperty("left", "0", "important"));
                    b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > span").css("visibility", "visible");
                    b("" + commons.bar +
                        " > #NagishLiBarStrip > #NagishLiMove > #NagishLiMove" + c).css("visibility", "hidden");
                    if (d) return !1;
                    l("NagishLi", "write", "position", "", c)
                }

                function fa(c, d) {
                    c = void 0 === c ? !1 : c;
                    d = void 0 === d ? "off" : d;
                    b("body[nl-animations]").length || "off" != d ? (jQuery.fx.off = !1, b("body *").not(commons.not).each(function() {
                        this.style.setProperty("animation-play-state", "", "");
                        this.style.setProperty("transition-duration", "", "")
                    }), b("body").removeAttr("nl-animations"), b("" + commons.dropdown + " > #NagishLiMisc > li > #NLAnimations > #NLAnimationsVal").attr({
                        title: phrases.animations_on
                    }),
                        b("" + commons.dropdown + " > #NagishLiMisc > li > #NLAnimations > #NLAnimationsVal")[0].innerHTML = "&#x25ba;&nbsp;" + phrases.animations_on + "", d = "on") : (jQuery.fx.off = !0, b("body *").not(commons.not).each(function() {
                        this.style.setProperty("animation-play-state", "paused", "important");
                        this.style.setProperty("transition-duration", "0s", "important")
                    }), b("body").attr("nl-animations", d), b("" + commons.dropdown + " > #NagishLiMisc > li > #NLAnimations > #NLAnimationsVal").attr({
                        title: phrases.animations_off
                    }), b("" + commons.dropdown +
                        " > #NagishLiMisc > li > #NLAnimations > #NLAnimationsVal")[0].innerHTML = "&#x275a;&#x275a;&nbsp;" + phrases.animations_off + "");
                    if (c) return !1;
                    l("NagishLi", "write", "animations", "", d)
                }

                function ha(c, d) {
                    c = void 0 === c ? !1 : c;
                    d = void 0 === d ? "off" : d;
                    if (b("body[nl-r2m]").length || b("body span.r2m").length || "off" != d) b("body span.r2m > img").toggleClass("bounceIn bounceOut").fadeOut(600, function() {
                        b(this).parent("span.r2m").remove()
                    }), b("body").removeAttr("nl-r2m"), b("" + commons.bar + " > script#nlr2ms, " + commons.bar +
                        " > audio#nlr2mp").remove(), b("" + commons.dropdown + " > #NagishLiMisc > li > #NLR2M > #NLR2MVal")[0].innerHTML = phrases.r2m_off, d = "off";
                    else {
                        var e = function(c, d) {
                                3 === d.nodeType ? f.test(d.data) && b(d).replaceWith(d.data.replace(f, u)) : b(d).not("iframe").contents().each(e)
                            },
                            f = /([0|1][0-9-]{9,})/g,
                            u = '$1<span style="display: inline !important; overflow-x: visible !important;" class="r2m" data-balloon="' + phrases.r2m_exp + '" nl-r2m-data="$1" data-balloon-pos="' + phrases.align_left + '">&nbsp;<img style="display: inline-block !important; vertical-align: top !important; width: 21px !important; height: 21px !important; cursor: pointer !important;" class="bounceIn animated" src="' +
                                icons.r2m + '" alt="' + phrases.r2m_exp + '" /></span>';
                        N || !c && (b("" + commons.bar + " > #nlr2mp").length || b("" + commons.bar + " > #nlr2ms").length) || b.ajax({
                            url: "//static.localize.co.il/nagishli/r2m/male_" + p + "/sounds.js",
                            dataType: "script",
                            cache: !0
                        }).done(function() {
                            b(commons.bar).append('<script id="nlr2ms" src="//static.localize.co.il/nagishli/r2m/male_' + p + '/sounds.js" crossorigin="anonymous" charset="utf-8">\x3c/script><audio crossorigin="anonymous" id="nlr2mp" style="display: none !important;">' + phrases.not_supported +
                                "</audio>")
                        }).fail(function() {
                            alert(phrases.r2m_na);
                            b("body span.r2m > img").toggleClass("bounceIn bounceOut").fadeOut(600, function() {
                                b(this).parent("span.r2m").remove()
                            });
                            b("body").removeAttr("nl-r2m");
                            b("" + commons.dropdown + " > #NagishLiMisc > li > #NLR2M > #NLR2MVal")[0].innerHTML = phrases.r2m_off;
                            l("NagishLi", "write", "r2m", "", "off");
                            return !1
                        });
                        b("body").attr("nl-r2m", "1").not(commons.not).each(e);
                        b("" + commons.dropdown + " > #NagishLiMisc > li > #NLR2M > #NLR2MVal")[0].innerHTML = phrases.r2m_on;
                        b("span.r2m > img").click(function() {
                            if (N) {
                                var c =
                                    new SpeechSynthesisUtterance;
                                c.lang = "en";
                                pa ? (c.pitch = .7, c.rate = .7) : (c.pitch = 1, c.rate = .7 - .2);
                                c.text = b(this).parent("span.r2m").attr("nl-r2m-data").replace(/(\D+)/, "");
                                speechSynthesis.speak(c)
                            } else {
                                var d = function(b) {
                                        f.src = "data:audio/mp3;base64," + edgts[b];
                                        f.load();
                                        f.play()
                                    },
                                    e = b(this).parent("span.r2m").attr("nl-r2m-data").replace(/(\D+)/, "").split(""),
                                    f = document.getElementById("nlr2mp"),
                                    l = 0;
                                f.addEventListener("ended", function() {
                                    l < e.length - 1 && (l++, d(e[l]))
                                });
                                d(l)
                            }
                        });
                        d = "on"
                    }
                    if (c) return !1;
                    l("NagishLi",
                        "write", "r2m", "", d)
                }

                function H(c, d) {
                    c = void 0 === c ? "black" : c;
                    d = void 0 === d ? !1 : d;
                    b("html[nl-cursor]").length && b("html").attr("nl-cursor") == c ? (b(":root").removeAttr("nl-cursor"), c = "normal") : b(":root").attr("nl-cursor", c);
                    if (d) return "black" == c ? b(commons.checkmark).prependTo(b("" + commons.dropdown + " > #NagishLiMisc > li > #NLCursor > #NLCursorBlack").attr("aria-label", phrases.aria_the_option + phrases.cursor + " " + phrases.cursor_black + " " + phrases.r2m_on).addClass("active")) : b(commons.checkmark).prependTo(b("" +
                        commons.dropdown + " > #NagishLiMisc > li > #NLCursor > #NLCursorWhite").attr("aria-label", phrases.aria_the_option + phrases.cursor + " " + phrases.cursor_white + " " + phrases.r2m_on).addClass("active")), !1;
                    l("NagishLi", "write", "cursor", "", c)
                }

                function ia() {
                    b("" + commons.dropdown + " > .dropdown-toggle.open").length ? b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus").attr("class", "collapse-all").children("img").attr("alt", phrases.collapse_all) : b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus").attr("class",
                        "expand-all").children("img").attr("alt", phrases.expand_all)
                }

                function ja(c, d) {
                    c = void 0 === c ? !1 : c;
                    d = void 0 === d ? "1" : d;
                    b("" + commons.dropdown + " > #NagishLiInfo > #NagishLiHelp").hasClass("active") ? (b("" + commons.dropdown + " > #NagishLiInfo > #NagishLiHelp").removeClass("active").find("span.sign").remove(), b("" + commons.dropdown + " > .dropdown-menu > li > div").children("span.help, span.notice").hide(), d = "0") : (b(commons.checkmark).prependTo(b("" + commons.dropdown + " > #NagishLiInfo > #NagishLiHelp").attr("aria-label",
                        phrases.aria_the_option + phrases.help + " " + phrases.r2m_on).addClass("active").children("div")), b("" + commons.dropdown + " > .dropdown-menu > li > div").children("span.help, span.notice").show());
                    if (c) return !1;
                    l("NagishLi", "write", "help", "", d)
                }

                function ka(c, d) {
                    c = void 0 === c ? !1 : c;
                    d = void 0 === d ? "on" : d;
                    b("body[nl-kbnav]").length || "on" != d ? (b("body").removeAttr("nl-kbnav"), b("nagishli > style#NagishLiTabbingStyle").remove(), b("" + commons.dropdown + " > #NagishLiMisc > li > #NLKBNav > #NLKBNavVal")[0].innerHTML = phrases.kbnav_off,
                        b("#NagishLiMenus .dropdown-toggle").off("keypress.nlkbnavclk"), d = "off") : (b("" + commons.bar + " > #NagishLiBarStrip, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > span#NagishLiMoveTL, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > span#NagishLiMoveTR, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > span#NagishLiMoveBL, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > span#NagishLiMoveBR, " + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus, " + commons.dropdown + " > .dropdown-toggle, " +
                        commons.dropdown + " > .dropdown-menu > li > div, " + commons.dropdown + " > .dropdown-menu > li > div > a, " + commons.dropdown + " > .dropdown-menu > li > div > span, " + commons.dropdown + " > .dropdown-menu > li#NagishLiHelp, " + commons.dropdown + " > ul > li, " + commons.dropdown + " > .dropdown-menu > li > div > ul > li, " + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > ul > li#NLCloseColorPanel").on("keypress.nlkbnavclk", function(c) {
                        13 === c.which && b(this).triggerHandler("click")
                    }), b("body").attr("nl-kbnav",
                        "1"), b("nagishli").append('<style type="text/css" id="NagishLiTabbingStyle">body *:focus { outline: 5px solid rgba(88, 144, 255, 0.75) !important; } ' + commons.dropdown + " > .dropdown-menu > li > div:focus, " + commons.dropdown + " > .dropdown-toggle:focus, " + commons.dropdown + " > .dropdown-menu > li > div > span:focus, " + commons.menus + " > .dropdown:last-child > .dropdown-menu > li:last-child > div:focus, " + commons.dropdown + " > .dropdown-menu > li > div > a:focus, #NagishLiBarStrip:focus { border: 5px solid rgba(88, 144, 255, 0.75) !important; } " +
                        commons.bar + " > #NagishLiBarStrip > #NagishLiMove > span:focus, " + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus:focus, nagishli#NagishLiTag > .NagishLiOverlay #closeBtn:focus, #NagishLiOverlayContent > .NagishLiStatementText > a:focus, #NagishLiOverlayContent > .NagishLiAboutText > a:focus, #NagishLiOverlayContent > .NagishLiAboutText > span#licWarn > a:focus, #NagishLiOverlayContent > .NagishLiStatementText > span#licWarn > a:focus, #NagishLiOverlayContent > .NagishLiAboutText > #DeveloperMsg > a:focus > img, " +
                        commons.dropdown + " > .dropdown-menu > li > div > ul > li:focus, " + commons.dropdown + " > .dropdown-menu > li > div > ul > li > input:focus { outline: 5px solid rgba(88, 144, 255, 0.75) !important; } " + commons.dropdown + " > .dropdown-menu > li > div > ul > li > input:focus { outline-width: 8px !important; } " + commons.dropdown + " > .dropdown-menu > li > div:focus { background: #f6f6f6 !important; } " + commons.menus + " > .dropdown > .dropdown-toggle:focus, " + commons.menus + ".blue > .dropdown > .dropdown-toggle:focus { background: #5478E4 !important; } " +
                        commons.menus + ".red > .dropdown > .dropdown-toggle:focus { background: #EB2B36 !important; } " + commons.menus + ".green > .dropdown > .dropdown-toggle:focus { background: #365E1B !important; } " + commons.menus + ".purple > .dropdown > .dropdown-toggle:focus { background: #8562B1 !important; } " + commons.menus + ".yellow > .dropdown > .dropdown-toggle:focus { background: #EDCA19 !important; } " + commons.menus + ".pink > .dropdown > .dropdown-toggle:focus { background: #FF78BB !important; } " + commons.menus + ".gray > .dropdown > .dropdown-toggle:focus { background: #8493A3 !important; } " +
                        commons.menus + ".brown > .dropdown > .dropdown-toggle:focus { background: #A96342 !important; } " + commons.menus + ".orange > .dropdown > .dropdown-toggle:focus { background: #FF9719 !important; } " + commons.menus + ".turquoise > .dropdown > .dropdown-toggle:focus { background: #36B9B2 !important; }</style>"), b("" + commons.dropdown + " > #NagishLiMisc > li > #NLKBNav > #NLKBNavVal")[0].innerHTML = phrases.kbnav_on, b("" + commons.dropdown + " > #NagishLiMisc > li > #NLKBNav").blur(), b("" + commons.bar + " > #NagishLiBarStrip").focus());
                    if (c) return !1;
                    l("NagishLi", "write", "tabbing", "", d)
                }

                function S() {
                    b("[nl-role*='media']").length && (b("iframe[src*='youtube.com']").each(function() {
                        for (var c = b(this).length; c--;) "ytmedia" == b(this).attr("nl-role") ? (b("iframe[src*='youtube.com']")[c].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"), b(this).attr("nl-role", "ytmedia-paused")) : b(this).attr("nl-role", "ytmedia")
                    }), b("video, audio").each(function() {
                        for (var c = b(this).length; c--;) "media" == b(this).attr("nl-role") ?
                            (b("video, audio")[c].pause(), b(this).attr("nl-role", "media-paused")) : b(this).attr("nl-role", "media")
                    }))
                }
                jq_not_found && console.log(phrases.jq_not_found_msg, "color: RoyalBlue; font-weight: bold;", "");
                180 > jQuery.fn.jquery.replace(/\D/g, "") && console.log(phrases.jq_too_low, "color: RoyalBlue; font-weight: bold;", "");
                if (!b("body").length) throw alert(phrases.body_missing), Error(phrases.body_missing);
                if (D && 2 > parseInt(l("NagishLi", "read", "version"))) return l("NagishLi", "delete", "all"), b(commons.bar).css({
                    "max-height": "",
                    "overflow-y": ""
                }), b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove").remove(), b("" + commons.bar + " > #NagishLiBarStrip").addClass("open"), b(commons.menus).show(), b(commons.menus).html('<li class="dropdown"><ul class="dropdown-menu show"><li class="not-clickable"><div href="#">' + phrases.settings_upgrade_html + "</div></li></ul></li>"), !1;
                (function(b) {
                    "function" === typeof define && define.amd ? define(["jquery"], b) : "object" === typeof exports ? module.exports =
                        b(require("jquery")) : b(jQuery)
                })(function(b) {
                    var c = !1,
                        d = !1,
                        f = 0,
                        l = 2E3,
                        p = 0,
                        n = ["webkit", "ms", "moz", "o"],
                        q = window.requestAnimationFrame || !1,
                        v = window.cancelAnimationFrame || !1;
                    if (!q)
                        for (var t in n) {
                            var x = n[t];
                            if (q = window[x + "RequestAnimationFrame"]) {
                                v = window[x + "CancelAnimationFrame"] || window[x + "CancelRequestAnimationFrame"];
                                break
                            }
                        }
                    var w = window.MutationObserver || window.WebKitMutationObserver || !1,
                        A = {
                            zindex: "auto",
                            cursoropacitymin: 0,
                            cursoropacitymax: 1,
                            cursorcolor: "#424242",
                            cursorwidth: "6px",
                            cursorborder: "1px solid #fff",
                            cursorborderradius: "5px",
                            scrollspeed: 60,
                            mousescrollstep: 24,
                            touchbehavior: !1,
                            hwacceleration: !0,
                            usetransition: !0,
                            boxzoom: !1,
                            dblclickzoom: !0,
                            gesturezoom: !0,
                            grabcursorenabled: !0,
                            autohidemode: !0,
                            background: "",
                            iframeautoresize: !0,
                            cursorminheight: 32,
                            preservenativescrolling: !0,
                            railoffset: !1,
                            railhoffset: !1,
                            bouncescroll: !0,
                            spacebarenabled: !0,
                            railpadding: {
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0
                            },
                            disableoutline: !0,
                            horizrailenabled: !0,
                            railalign: "right",
                            railvalign: "bottom",
                            enabletranslate3d: !0,
                            enablemousewheel: !0,
                            enablekeyboard: !0,
                            smoothscroll: !0,
                            sensitiverail: !0,
                            enablemouselockapi: !0,
                            cursorfixedheight: !1,
                            directionlockdeadzone: 6,
                            hidecursordelay: 400,
                            nativeparentscrolling: !0,
                            enablescrollonselection: !0,
                            overflowx: !0,
                            overflowy: !0,
                            cursordragspeed: .3,
                            rtlmode: "auto",
                            cursordragontouch: !1,
                            oneaxismousemode: "auto",
                            scriptpath: function() {
                                var b = document.getElementsByTagName("script");
                                b = b.length ? b[b.length - 1].src.split("?")[0] : "";
                                return 0 < b.split("/").length ? b.split("/").slice(0, -1).join("/") + "/" : ""
                            }(),
                            preventmultitouchscrolling: !0,
                            disablemutationobserver: !1
                        },
                        B = !1,
                        D = function() {
                            if (B) return B;
                            var b = document.createElement("DIV"),
                                c = b.style,
                                d = navigator.userAgent,
                                e = navigator.platform,
                                g = {
                                    haspointerlock: "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document
                                };
                            g.isopera = "opera" in window;
                            g.isopera12 = g.isopera && "getUserMedia" in navigator;
                            g.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini);
                            g.isie = "all" in document && "attachEvent" in b && !g.isopera;
                            g.isieold = g.isie && !("msInterpolationMode" in
                                c);
                            g.isie7 = g.isie && !g.isieold && (!("documentMode" in document) || 7 == document.documentMode);
                            g.isie8 = g.isie && "documentMode" in document && 8 == document.documentMode;
                            g.isie9 = g.isie && "performance" in window && 9 == document.documentMode;
                            g.isie10 = g.isie && "performance" in window && 10 == document.documentMode;
                            g.isie11 = "msRequestFullscreen" in b && 11 <= document.documentMode;
                            g.isieedge12 = navigator.userAgent.match(/Edge\/12\./);
                            g.isieedge = "msOverflowStyle" in b;
                            g.ismodernie = g.isie11 || g.isieedge;
                            g.isie9mobile = /iemobile.9/i.test(d);
                            g.isie9mobile && (g.isie9 = !1);
                            g.isie7mobile = !g.isie9mobile && g.isie7 && /iemobile/i.test(d);
                            g.ismozilla = "MozAppearance" in c;
                            g.iswebkit = "WebkitAppearance" in c;
                            g.ischrome = "chrome" in window;
                            g.ischrome38 = g.ischrome && "touchAction" in c;
                            g.ischrome22 = !g.ischrome38 && g.ischrome && g.haspointerlock;
                            g.ischrome26 = !g.ischrome38 && g.ischrome && "transition" in c;
                            g.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;
                            g.hasw3ctouch = (window.PointerEvent || !1) && (0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints);
                            g.hasmstouch = !g.hasw3ctouch && (window.MSPointerEvent || !1);
                            g.isios = g.cantouch && /iphone|ipad|ipod/i.test(e);
                            g.isios4 = g.isios && !("seal" in Object);
                            g.isios7 = g.isios && "webkitHidden" in document;
                            g.isios8 = g.isios && "hidden" in document;
                            g.isandroid = /android/i.test(d);
                            g.haseventlistener = "addEventListener" in b;
                            g.trstyle = !1;
                            g.hastransform = !1;
                            g.hastranslate3d = !1;
                            g.transitionstyle = !1;
                            g.hastransition = !1;
                            g.transitionend = !1;
                            e = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];
                            for (d = 0; d < e.length; d++)
                                if (void 0 !==
                                    c[e[d]]) {
                                    g.trstyle = e[d];
                                    break
                                }
                            g.hastransform = !!g.trstyle;
                            g.hastransform && (c[g.trstyle] = "translate3d(1px,2px,3px)", g.hastranslate3d = /translate3d/.test(c[g.trstyle]));
                            g.transitionstyle = !1;
                            g.prefixstyle = "";
                            g.transitionend = !1;
                            e = "transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" ");
                            var f = " -webkit- -ms- -moz- -o- -o -khtml-".split(" "),
                                l = "transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" ");
                            for (d = 0; d < e.length; d++)
                                if (e[d] in c) {
                                    g.transitionstyle = e[d];
                                    g.prefixstyle = f[d];
                                    g.transitionend = l[d];
                                    break
                                }
                            g.ischrome26 && (g.prefixstyle = f[1]);
                            g.hastransition = g.transitionstyle;
                            a: {
                                d = ["grab", "-webkit-grab", "-moz-grab"];
                                if (g.ischrome && !g.ischrome38 || g.isie) d = [];
                                for (e = 0; e < d.length; e++)
                                    if (f = d[e], c.cursor = f, c.cursor == f) {
                                        c = f;
                                        break a
                                    }
                                c = "url(//patriciaportfolio.googlecode.com/files/openhand.cur),n-resize"
                            }
                            g.cursorgrabvalue = c;
                            g.hasmousecapture = "setCapture" in b;
                            g.hasMutationObserver = !1 !== w;
                            return B = g
                        },
                        E = function(e,
                                     h) {
                            function Q() {
                                var b = a.doc.css(k.trstyle);
                                return b && "matrix" == b.substr(0, 6) ? b.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
                            }

                            function u() {
                                var b = a.win;
                                if ("zIndex" in b) return b.zIndex();
                                for (; 0 < b.length && 9 != b[0].nodeType;) {
                                    var c = b.css("zIndex");
                                    if (!isNaN(c) && 0 != c) return parseInt(c);
                                    b = b.parent()
                                }
                                return !1
                            }

                            function g(b, c, d) {
                                c = b.css(c);
                                b = parseFloat(c);
                                return isNaN(b) ? (b = J[c] || 0, d = 3 == b ? d ? a.win.outerHeight() - a.win.innerHeight() : a.win.outerWidth() - a.win.innerWidth() : 1, a.isie8 && b && (b += 1), d ?
                                    b : 0) : b
                            }

                            function K(b, c, d, h) {
                                a._bind(b, c, function(a) {
                                    a = a ? a : window.event;
                                    var m = {
                                        original: a,
                                        target: a.target || a.srcElement,
                                        type: "wheel",
                                        deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
                                        deltaX: 0,
                                        deltaZ: 0,
                                        preventDefault: function() {
                                            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                                            return !1
                                        },
                                        stopImmediatePropagation: function() {
                                            a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.cancelBubble = !0
                                        }
                                    };
                                    "mousewheel" == c ? (a.wheelDeltaX && (m.deltaX = -.025 * a.wheelDeltaX), a.wheelDeltaY && (m.deltaY = -.025 * a.wheelDeltaY),
                                    m.deltaY || m.deltaX || (m.deltaY = -.025 * a.wheelDelta)) : m.deltaY = a.detail;
                                    return d.call(b, m)
                                }, h)
                            }

                            function n(b, c, d) {
                                var m, r;
                                0 == b.deltaMode ? (m = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaX), r = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaY)) : 1 == b.deltaMode && (m = -Math.floor(b.deltaX * a.opt.mousescrollstep), r = -Math.floor(b.deltaY * a.opt.mousescrollstep));
                                c && a.opt.oneaxismousemode && 0 == m && r && (m = r, r = 0, d && (0 > m ? a.getScrollLeft() >= a.page.maxw : 0 >= a.getScrollLeft()) && (r = m, m = 0));
                                a.isrtlmode && (m = -m);
                                m && (a.scrollmom && a.scrollmom.stop(),
                                    a.lastdeltax += m, a.debounced("mousewheelx", function() {
                                    var b = a.lastdeltax;
                                    a.lastdeltax = 0;
                                    a.rail.drag || a.doScrollLeftBy(b)
                                }, 15));
                                if (r) {
                                    if (a.opt.nativeparentscrolling && d && !a.ispage && !a.zoomactive)
                                        if (0 > r) {
                                            if (a.getScrollTop() >= a.page.maxh) return !0
                                        } else if (0 >= a.getScrollTop()) return !0;
                                    a.scrollmom && a.scrollmom.stop();
                                    a.lastdeltay += r;
                                    a.synched("mousewheely", function() {
                                        var b = a.lastdeltay;
                                        a.lastdeltay = 0;
                                        a.rail.drag || a.doScrollBy(b)
                                    }, 15)
                                }
                                b.stopImmediatePropagation();
                                return b.preventDefault()
                            }
                            var a = this;
                            this.version =
                                "3.6.8";
                            this.name = "nicescroll";
                            this.me = h;
                            this.opt = {
                                doc: b("body"),
                                win: !1
                            };
                            b.extend(this.opt, A);
                            this.opt.snapbackspeed = 80;
                            if (e)
                                for (var z in a.opt) void 0 !== e[z] && (a.opt[z] = e[z]);
                            a.opt.disablemutationobserver && (w = !1);
                            this.iddoc = (this.doc = a.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
                            this.ispage = /^BODY|HTML/.test(a.opt.win ? a.opt.win[0].nodeName : this.doc[0].nodeName);
                            this.haswrapper = !1 !== a.opt.win;
                            this.win = a.opt.win || (this.ispage ? b(window) : this.doc);
                            this.docscroll = this.ispage && !this.haswrapper ? b(window) :
                                this.win;
                            this.body = b("body");
                            this.iframe = this.isfixed = this.viewport = !1;
                            this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
                            this.istextarea = "TEXTAREA" == this.win[0].nodeName;
                            this.forcescreen = !1;
                            this.canshowonmouseevent = "scroll" != a.opt.autohidemode;
                            this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
                            this.scroll = {
                                x: 0,
                                y: 0
                            };
                            this.scrollratio = {
                                x: 0,
                                y: 0
                            };
                            this.cursorheight = 20;
                            this.scrollvaluemax = 0;
                            if ("auto" == this.opt.rtlmode) {
                                z = this.win[0] == window ? this.body : this.win;
                                var F = z.css("writing-mode") || z.css("-webkit-writing-mode") || z.css("-ms-writing-mode") || z.css("-moz-writing-mode");
                                "horizontal-tb" == F || "lr-tb" == F || "" == F ? (this.isrtlmode = "rtl" == z.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == F || "tb" == F || "tb-rl" == F || "rl-tb" == F, this.isvertical = "vertical-rl" == F || "tb" == F || "tb-rl" == F)
                            } else this.isrtlmode = !0 === this.opt.rtlmode, this.isvertical = !1;
                            this.observerbody = this.observerremover = this.observer = this.scrollmom = this.scrollrunning = !1;
                            do this.id = "ascrail" + l++; while (document.getElementById(this.id));
                            this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1;
                            this.visibility = !0;
                            this.hidden = this.locked = this.railslocked = !1;
                            this.cursoractive = !0;
                            this.wheelprevented = !1;
                            this.overflowx = a.opt.overflowx;
                            this.overflowy = a.opt.overflowy;
                            this.nativescrollingarea = !1;
                            this.checkarea = 0;
                            this.events = [];
                            this.saved = {};
                            this.delaylist = {};
                            this.synclist = {};
                            this.lastdeltay = this.lastdeltax = 0;
                            this.detected = D();
                            var k = b.extend({}, this.detected);
                            this.ishwscroll = (this.canhwscroll = k.hastransform && a.opt.hwacceleration) && a.haswrapper;
                            this.hasreversehr = this.isrtlmode ? this.isvertical ? !(k.iswebkit || k.isie || k.isie11) : !(k.iswebkit || k.isie && !k.isie10 && !k.isie11) : !1;
                            this.istouchcapable = !1;
                            k.cantouch || !k.hasw3ctouch && !k.hasmstouch ? !k.cantouch || k.isios || k.isandroid || !k.iswebkit && !k.ismozilla ||
                                (this.istouchcapable = !0) : this.istouchcapable = !0;
                            a.opt.enablemouselockapi || (k.hasmousecapture = !1, k.haspointerlock = !1);
                            this.debounced = function(b, c, d) {
                                a && (a.delaylist[b] || (a.delaylist[b] = {
                                    h: q(function() {
                                        a.delaylist[b].fn.call(a);
                                        a.delaylist[b] = !1
                                    }, d)
                                }, c.call(a)), a.delaylist[b].fn = c)
                            };
                            var t = !1;
                            this.synched = function(b, c) {
                                a.synclist[b] = c;
                                (function() {
                                    t || (q(function() {
                                        if (a) {
                                            t = !1;
                                            for (var b in a.synclist) {
                                                var c = a.synclist[b];
                                                c && c.call(a);
                                                a.synclist[b] = !1
                                            }
                                        }
                                    }), t = !0)
                                })();
                                return b
                            };
                            this.unsynched = function(b) {
                                a.synclist[b] &&
                                (a.synclist[b] = !1)
                            };
                            this.css = function(b, c) {
                                for (var m in c) a.saved.css.push([b, m, b.css(m)]), b.css(m, c[m])
                            };
                            this.scrollTop = function(b) {
                                return void 0 === b ? a.getScrollTop() : a.setScrollTop(b)
                            };
                            this.scrollLeft = function(b) {
                                return void 0 === b ? a.getScrollLeft() : a.setScrollLeft(b)
                            };
                            var R = function(a, b, c, d, h, e, f) {
                                this.st = a;
                                this.ed = b;
                                this.spd = c;
                                this.p1 = d || 0;
                                this.p2 = h || 1;
                                this.p3 = e || 0;
                                this.p4 = f || 1;
                                this.ts = (new Date).getTime();
                                this.df = this.ed - this.st
                            };
                            R.prototype = {
                                B2: function(a) {
                                    return 3 * a * a * (1 - a)
                                },
                                B3: function(a) {
                                    return 3 *
                                        a * (1 - a) * (1 - a)
                                },
                                B4: function(a) {
                                    return (1 - a) * (1 - a) * (1 - a)
                                },
                                getNow: function() {
                                    var a = 1 - ((new Date).getTime() - this.ts) / this.spd,
                                        b = this.B2(a) + this.B3(a) + this.B4(a);
                                    return 0 > a ? this.ed : this.st + Math.round(this.df * b)
                                },
                                update: function(a, b) {
                                    this.st = this.getNow();
                                    this.ed = a;
                                    this.spd = b;
                                    this.ts = (new Date).getTime();
                                    this.df = this.ed - this.st;
                                    return this
                                }
                            };
                            if (this.ishwscroll) {
                                this.doc.translate = {
                                    x: 0,
                                    y: 0,
                                    tx: "0px",
                                    ty: "0px"
                                };
                                k.hastranslate3d && k.isios && this.doc.css("-webkit-backface-visibility", "hidden");
                                this.getScrollTop =
                                    function(b) {
                                        if (!b) {
                                            if (b = Q()) return 16 == b.length ? -b[13] : -b[5];
                                            if (a.timerscroll && a.timerscroll.bz) return a.timerscroll.bz.getNow()
                                        }
                                        return a.doc.translate.y
                                    };
                                this.getScrollLeft = function(b) {
                                    if (!b) {
                                        if (b = Q()) return 16 == b.length ? -b[12] : -b[4];
                                        if (a.timerscroll && a.timerscroll.bh) return a.timerscroll.bh.getNow()
                                    }
                                    return a.doc.translate.x
                                };
                                this.notifyScrollEvent = function(a) {
                                    var b = document.createEvent("UIEvents");
                                    b.initUIEvent("scroll", !1, !0, window, 1);
                                    b.niceevent = !0;
                                    a.dispatchEvent(b)
                                };
                                var x = this.isrtlmode ? 1 : -1;
                                k.hastranslate3d && a.opt.enabletranslate3d ? (this.setScrollTop = function(b, c) {
                                    a.doc.translate.y = b;
                                    a.doc.translate.ty = -1 * b + "px";
                                    a.doc.css(k.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                                    c || a.notifyScrollEvent(a.win[0])
                                }, this.setScrollLeft = function(b, c) {
                                    a.doc.translate.x = b;
                                    a.doc.translate.tx = b * x + "px";
                                    a.doc.css(k.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                                    c || a.notifyScrollEvent(a.win[0])
                                }) : (this.setScrollTop = function(b, c) {
                                    a.doc.translate.y = b;
                                    a.doc.translate.ty = -1 * b + "px";
                                    a.doc.css(k.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                                    c || a.notifyScrollEvent(a.win[0])
                                }, this.setScrollLeft = function(b, c) {
                                    a.doc.translate.x = b;
                                    a.doc.translate.tx = b * x + "px";
                                    a.doc.css(k.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                                    c || a.notifyScrollEvent(a.win[0])
                                })
                            } else this.getScrollTop = function() {
                                return a.docscroll.scrollTop()
                            }, this.setScrollTop = function(b) {
                                return setTimeout(function() {
                                    a && a.docscroll.scrollTop(b)
                                }, 1)
                            }, this.getScrollLeft = function() {
                                return a.hasreversehr ?
                                    a.detected.ismozilla ? a.page.maxw - Math.abs(a.docscroll.scrollLeft()) : a.page.maxw - a.docscroll.scrollLeft() : a.docscroll.scrollLeft()
                            }, this.setScrollLeft = function(b) {
                                return setTimeout(function() {
                                    if (a) return a.hasreversehr && (b = a.detected.ismozilla ? -(a.page.maxw - b) : a.page.maxw - b), a.docscroll.scrollLeft(b)
                                }, 1)
                            };
                            this.getTarget = function(a) {
                                return a ? a.target ? a.target : a.srcElement ? a.srcElement : !1 : !1
                            };
                            this.hasParent = function(a, b) {
                                if (!a) return !1;
                                for (var c = a.target || a.srcElement || a || !1; c && c.id != b;) c = c.parentNode ||
                                    !1;
                                return !1 !== c
                            };
                            var J = {
                                thin: 1,
                                medium: 3,
                                thick: 5
                            };
                            this.getDocumentScrollOffset = function() {
                                return {
                                    top: window.pageYOffset || document.documentElement.scrollTop,
                                    left: window.pageXOffset || document.documentElement.scrollLeft
                                }
                            };
                            this.getOffset = function() {
                                if (a.isfixed) {
                                    var b = a.win.offset();
                                    var c = a.getDocumentScrollOffset();
                                    b.top -= c.top;
                                    b.left -= c.left;
                                    return b
                                }
                                b = a.win.offset();
                                if (!a.viewport) return b;
                                c = a.viewport.offset();
                                return {
                                    top: b.top - c.top,
                                    left: b.left - c.left
                                }
                            };
                            this.updateScrollBar = function(b) {
                                var c;
                                if (a.ishwscroll) a.rail.css({
                                    height: a.win.innerHeight() -
                                    (a.opt.railpadding.top + a.opt.railpadding.bottom)
                                }), a.railh && a.railh.css({
                                    width: a.win.innerWidth() - (a.opt.railpadding.left + a.opt.railpadding.right)
                                });
                                else {
                                    var d = a.getOffset();
                                    var m = d.top;
                                    var h = d.left - (a.opt.railpadding.left + a.opt.railpadding.right);
                                    m += g(a.win, "border-top-width", !0);
                                    h += a.rail.align ? a.win.outerWidth() - g(a.win, "border-right-width") - a.rail.width : g(a.win, "border-left-width");
                                    if (c = a.opt.railoffset) c.top && (m += c.top), c.left && (h += c.left);
                                    a.railslocked || a.rail.css({
                                        top: m,
                                        left: h,
                                        height: (b ? b.h :
                                            a.win.innerHeight()) - (a.opt.railpadding.top + a.opt.railpadding.bottom)
                                    });
                                    a.zoom && a.zoom.css({
                                        top: m + 1,
                                        left: 1 == a.rail.align ? h - 20 : h + a.rail.width + 4
                                    });
                                    if (a.railh && !a.railslocked) {
                                        m = d.top;
                                        h = d.left;
                                        if (c = a.opt.railhoffset) c.top && (m += c.top), c.left && (h += c.left);
                                        b = a.railh.align ? m + g(a.win, "border-top-width", !0) + a.win.innerHeight() - a.railh.height : m + g(a.win, "border-top-width", !0);
                                        h += g(a.win, "border-left-width");
                                        a.railh.css({
                                            top: b - (a.opt.railpadding.top + a.opt.railpadding.bottom),
                                            left: h,
                                            width: a.railh.width
                                        })
                                    }
                                }
                            };
                            this.doRailClick =
                                function(b, c, d) {
                                    var m;
                                    a.railslocked || (a.cancelEvent(b), c ? (c = d ? a.doScrollLeft : a.doScrollTop, m = d ? (b.pageX - a.railh.offset().left - a.cursorwidth / 2) * a.scrollratio.x : (b.pageY - a.rail.offset().top - a.cursorheight / 2) * a.scrollratio.y, c(m)) : (c = d ? a.doScrollLeftBy : a.doScrollBy, m = d ? a.scroll.x : a.scroll.y, b = d ? b.pageX - a.railh.offset().left : b.pageY - a.rail.offset().top, d = d ? a.view.w : a.view.h, c(m >= b ? d : -d)))
                                };
                            a.hasanimationframe = q;
                            a.hascancelanimationframe = v;
                            a.hasanimationframe ? a.hascancelanimationframe || (v = function() {
                                a.cancelAnimationFrame = !0
                            }) : (q = function(a) {
                                return setTimeout(a, 15 - Math.floor(+new Date / 1E3) % 16)
                            }, v = clearTimeout);
                            this.init = function() {
                                a.saved.css = [];
                                if (k.isie7mobile || k.isoperamini) return !0;
                                k.hasmstouch && a.css(a.ispage ? b("html") : a.win, {
                                    _touchaction: "none"
                                });
                                var m = k.ismodernie || k.isie10 ? {
                                    "-ms-overflow-style": "none"
                                } : {
                                    "overflow-y": "hidden"
                                };
                                a.zindex = "auto";
                                a.zindex = a.ispage || "auto" != a.opt.zindex ? a.opt.zindex : u() || "auto";
                                !a.ispage && "auto" != a.zindex && a.zindex > p && (p = a.zindex);
                                a.isie && 0 == a.zindex && "auto" == a.opt.zindex && (a.zindex =
                                    "auto");
                                if (!a.ispage || !k.cantouch && !k.isieold && !k.isie9mobile) {
                                    var h = a.docscroll;
                                    a.ispage && (h = a.haswrapper ? a.win : a.doc);
                                    k.isie9mobile || a.css(h, m);
                                    a.ispage && k.isie7 && ("BODY" == a.doc[0].nodeName ? a.css(b("html"), {
                                        "overflow-y": "hidden"
                                    }) : "HTML" == a.doc[0].nodeName && a.css(b("body"), m));
                                    !k.isios || a.ispage || a.haswrapper || a.css(b("body"), {
                                        "-webkit-overflow-scrolling": "touch"
                                    });
                                    var e = b(document.createElement("div"));
                                    e.css({
                                        position: "relative",
                                        top: 0,
                                        "float": "right",
                                        width: a.opt.cursorwidth,
                                        height: 0,
                                        "background-color": a.opt.cursorcolor,
                                        border: a.opt.cursorborder,
                                        "background-clip": "padding-box",
                                        "-webkit-border-radius": a.opt.cursorborderradius,
                                        "-moz-border-radius": a.opt.cursorborderradius,
                                        "border-radius": a.opt.cursorborderradius
                                    });
                                    e.hborder = parseFloat(e.outerHeight() - e.innerHeight());
                                    e.addClass("nicescroll-cursors");
                                    a.cursor = e;
                                    var g = b(document.createElement("div"));
                                    g.attr("id", a.id);
                                    g.addClass("nicescroll-rails nicescroll-rails-vr");
                                    var l, Q = ["left", "right", "top", "bottom"],
                                        K;
                                    for (K in Q) {
                                        var z = Q[K];
                                        (l = a.opt.railpadding[z]) ? g.css("padding-" +
                                            z, l + "px"): a.opt.railpadding[z] = 0
                                    }
                                    g.append(e);
                                    g.width = Math.max(parseFloat(a.opt.cursorwidth), e.outerWidth());
                                    g.css({
                                        width: g.width + "px",
                                        zIndex: a.zindex,
                                        background: a.opt.background,
                                        cursor: "default"
                                    });
                                    g.visibility = !0;
                                    g.scrollable = !0;
                                    g.align = "left" == a.opt.railalign ? 0 : 1;
                                    a.rail = g;
                                    e = a.rail.drag = !1;
                                    if (a.opt.boxzoom && !a.ispage && !k.isieold) {
                                        e = document.createElement("div");
                                        a.on(e, "click", a.doZoom);
                                        a.on(e, "mouseenter", function() {
                                            a.zoom.css("opacity", a.opt.cursoropacitymax)
                                        });
                                        a.on(e, "mouseleave", function() {
                                            a.zoom.css("opacity",
                                                a.opt.cursoropacitymin)
                                        });
                                        a.zoom = b(e);
                                        a.zoom.css({
                                            cursor: "pointer",
                                            zIndex: a.zindex,
                                            backgroundImage: "url(" + a.opt.scriptpath + "zoomico.png)",
                                            height: 18,
                                            width: 18,
                                            backgroundPosition: "0px 0px"
                                        });
                                        if (a.opt.dblclickzoom) a.on(a.win, "dblclick", a.doZoom);
                                        k.cantouch && a.opt.gesturezoom && (a.ongesturezoom = function(b) {
                                            1.5 < b.scale && a.doZoomIn(b);
                                            .8 > b.scale && a.doZoomOut(b);
                                            return a.cancelEvent(b)
                                        }, a.on(a.win, "gestureend", a.ongesturezoom))
                                    }
                                    a.railh = !1;
                                    var n;
                                    a.opt.horizrailenabled && (a.css(h, {
                                        overflowX: "hidden"
                                    }), e = b(document.createElement("div")),
                                        e.css({
                                            position: "absolute",
                                            top: 0,
                                            height: a.opt.cursorwidth,
                                            width: 0,
                                            backgroundColor: a.opt.cursorcolor,
                                            border: a.opt.cursorborder,
                                            backgroundClip: "padding-box",
                                            "-webkit-border-radius": a.opt.cursorborderradius,
                                            "-moz-border-radius": a.opt.cursorborderradius,
                                            "border-radius": a.opt.cursorborderradius
                                        }), k.isieold && e.css("overflow", "hidden"), e.wborder = parseFloat(e.outerWidth() - e.innerWidth()), e.addClass("nicescroll-cursors"), a.cursorh = e, n = b(document.createElement("div")), n.attr("id", a.id + "-hr"), n.addClass("nicescroll-rails nicescroll-rails-hr"),
                                        n.height = Math.max(parseFloat(a.opt.cursorwidth), e.outerHeight()), n.css({
                                        height: n.height + "px",
                                        zIndex: a.zindex,
                                        background: a.opt.background
                                    }), n.append(e), n.visibility = !0, n.scrollable = !0, n.align = "top" == a.opt.railvalign ? 0 : 1, a.railh = n, a.railh.drag = !1);
                                    a.ispage ? (g.css({
                                        position: "fixed",
                                        top: 0,
                                        height: "100%"
                                    }), g.align ? g.css({
                                        right: 0
                                    }) : g.css({
                                        left: 0
                                    }), a.body.append(g), a.railh && (n.css({
                                        position: "fixed",
                                        left: 0,
                                        width: "100%"
                                    }), n.align ? n.css({
                                        bottom: 0
                                    }) : n.css({
                                        top: 0
                                    }), a.body.append(n))) : (a.ishwscroll ? ("static" ==
                                    a.win.css("position") && a.css(a.win, {
                                        position: "relative"
                                    }), h = "HTML" == a.win[0].nodeName ? a.body : a.win, b(h).scrollTop(0).scrollLeft(0), a.zoom && (a.zoom.css({
                                        position: "absolute",
                                        top: 1,
                                        right: 0,
                                        "margin-right": g.width + 4
                                    }), h.append(a.zoom)), g.css({
                                        position: "absolute",
                                        top: 0
                                    }), g.align ? g.css({
                                        right: 0
                                    }) : g.css({
                                        left: 0
                                    }), h.append(g), n && (n.css({
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0
                                    }), n.align ? n.css({
                                        bottom: 0
                                    }) : n.css({
                                        top: 0
                                    }), h.append(n))) : (a.isfixed = "fixed" == a.win.css("position"), h = a.isfixed ? "fixed" : "absolute", a.isfixed ||
                                    (a.viewport = a.getViewport(a.win[0])), a.viewport && (a.body = a.viewport, 0 == /fixed|absolute/.test(a.viewport.css("position")) && a.css(a.viewport, {
                                        position: "relative"
                                    })), g.css({
                                        position: h
                                    }), a.zoom && a.zoom.css({
                                        position: h
                                    }), a.updateScrollBar(), a.body.append(g), a.zoom && a.body.append(a.zoom), a.railh && (n.css({
                                        position: h
                                    }), a.body.append(n))), k.isios && a.css(a.win, {
                                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                                        "-webkit-touch-callout": "none"
                                    }), k.isie && a.opt.disableoutline && a.win.attr("hideFocus", "true"), k.iswebkit &&
                                    a.opt.disableoutline && a.win.css("outline", "none"));
                                    !1 === a.opt.autohidemode ? (a.autohidedom = !1, a.rail.css({
                                        opacity: a.opt.cursoropacitymax
                                    }), a.railh && a.railh.css({
                                        opacity: a.opt.cursoropacitymax
                                    })) : !0 === a.opt.autohidemode || "leave" === a.opt.autohidemode ? (a.autohidedom = b().add(a.rail), k.isie8 && (a.autohidedom = a.autohidedom.add(a.cursor)), a.railh && (a.autohidedom = a.autohidedom.add(a.railh)), a.railh && k.isie8 && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "scroll" == a.opt.autohidemode ? (a.autohidedom = b().add(a.rail),
                                    a.railh && (a.autohidedom = a.autohidedom.add(a.railh))) : "cursor" == a.opt.autohidemode ? (a.autohidedom = b().add(a.cursor), a.railh && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "hidden" == a.opt.autohidemode && (a.autohidedom = !1, a.hide(), a.railslocked = !1);
                                    if (k.isie9mobile) a.scrollmom = new I(a), a.onmangotouch = function() {
                                        var b = a.getScrollTop(),
                                            c = a.getScrollLeft();
                                        if (b == a.scrollmom.lastscrolly && c == a.scrollmom.lastscrollx) return !0;
                                        var d = b - a.mangotouch.sy,
                                            m = c - a.mangotouch.sx;
                                        if (0 != Math.round(Math.sqrt(Math.pow(m,
                                                2) + Math.pow(d, 2)))) {
                                            var h = 0 > d ? -1 : 1,
                                                e = 0 > m ? -1 : 1,
                                                g = +new Date;
                                            a.mangotouch.lazy && clearTimeout(a.mangotouch.lazy);
                                            80 < g - a.mangotouch.tm || a.mangotouch.dry != h || a.mangotouch.drx != e ? (a.scrollmom.stop(), a.scrollmom.reset(c, b), a.mangotouch.sy = b, a.mangotouch.ly = b, a.mangotouch.sx = c, a.mangotouch.lx = c, a.mangotouch.dry = h, a.mangotouch.drx = e, a.mangotouch.tm = g) : (a.scrollmom.stop(), a.scrollmom.update(a.mangotouch.sx - m, a.mangotouch.sy - d), a.mangotouch.tm = g, d = Math.max(Math.abs(a.mangotouch.ly - b), Math.abs(a.mangotouch.lx -
                                                c)), a.mangotouch.ly = b, a.mangotouch.lx = c, 2 < d && (a.mangotouch.lazy = setTimeout(function() {
                                                a.mangotouch.lazy = !1;
                                                a.mangotouch.dry = 0;
                                                a.mangotouch.drx = 0;
                                                a.mangotouch.tm = 0;
                                                a.scrollmom.doMomentum(30)
                                            }, 100)))
                                        }
                                    }, g = a.getScrollTop(), n = a.getScrollLeft(), a.mangotouch = {
                                        sy: g,
                                        ly: g,
                                        dry: 0,
                                        sx: n,
                                        lx: n,
                                        drx: 0,
                                        lazy: !1,
                                        tm: 0
                                    }, a.on(a.docscroll, "scroll", a.onmangotouch);
                                    else {
                                        if (k.cantouch || a.istouchcapable || a.opt.touchbehavior || k.hasmstouch) {
                                            a.scrollmom = new I(a);
                                            a.ontouchstart = function(c) {
                                                if (c.pointerType && 2 != c.pointerType && "touch" !=
                                                    c.pointerType) return !1;
                                                a.hasmoving = !1;
                                                if (!a.railslocked) {
                                                    var d;
                                                    if (k.hasmstouch)
                                                        for (d = c.target ? c.target : !1; d;) {
                                                            var m = b(d).getNiceScroll();
                                                            if (0 < m.length && m[0].me == a.me) break;
                                                            if (0 < m.length) return !1;
                                                            if ("DIV" == d.nodeName && d.id == a.id) break;
                                                            d = d.parentNode ? d.parentNode : !1
                                                        }
                                                    a.cancelScroll();
                                                    if ((d = a.getTarget(c)) && /INPUT/i.test(d.nodeName) && /range/i.test(d.type)) return a.stopPropagation(c);
                                                    !("clientX" in c) && "changedTouches" in c && (c.clientX = c.changedTouches[0].clientX, c.clientY = c.changedTouches[0].clientY);
                                                    a.forcescreen &&
                                                    (m = c, c = {
                                                        original: c.original ? c.original : c
                                                    }, c.clientX = m.screenX, c.clientY = m.screenY);
                                                    a.rail.drag = {
                                                        x: c.clientX,
                                                        y: c.clientY,
                                                        sx: a.scroll.x,
                                                        sy: a.scroll.y,
                                                        st: a.getScrollTop(),
                                                        sl: a.getScrollLeft(),
                                                        pt: 2,
                                                        dl: !1
                                                    };
                                                    if (a.ispage || !a.opt.directionlockdeadzone) a.rail.drag.dl = "f";
                                                    else {
                                                        m = b(window).width();
                                                        var h = b(window).height();
                                                        h = Math.max(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - h);
                                                        m = Math.max(0, Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - m);
                                                        a.rail.drag.ck = !a.rail.scrollable && a.railh.scrollable ? 0 < h ? "v" : !1 : a.rail.scrollable && !a.railh.scrollable ? 0 < m ? "h" : !1 : !1;
                                                        a.rail.drag.ck || (a.rail.drag.dl = "f")
                                                    }
                                                    a.opt.touchbehavior && a.isiframe && k.isie && (m = a.win.position(), a.rail.drag.x += m.left, a.rail.drag.y += m.top);
                                                    a.hasmoving = !1;
                                                    a.lastmouseup = !1;
                                                    a.scrollmom.reset(c.clientX, c.clientY);
                                                    if (!k.cantouch && !this.istouchcapable && !c.pointerType) {
                                                        if (!d || !/INPUT|SELECT|TEXTAREA/i.test(d.nodeName)) return !a.ispage && k.hasmousecapture && d.setCapture(), a.opt.touchbehavior ? (d.onclick &&
                                                        !d._onclick && (d._onclick = d.onclick, d.onclick = function(b) {
                                                            if (a.hasmoving) return !1;
                                                            d._onclick.call(this, b)
                                                        }), a.cancelEvent(c)) : a.stopPropagation(c);
                                                        /SUBMIT|CANCEL|BUTTON/i.test(b(d).attr("type")) && (pc = {
                                                            tg: d,
                                                            click: !1
                                                        }, a.preventclick = pc)
                                                    }
                                                }
                                            };
                                            a.ontouchend = function(b) {
                                                if (!a.rail.drag) return !0;
                                                if (2 == a.rail.drag.pt) {
                                                    if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                                                    a.scrollmom.doMomentum();
                                                    a.rail.drag = !1;
                                                    if (a.hasmoving && (a.lastmouseup = !0, a.hideCursor(), k.hasmousecapture && document.releaseCapture(), !k.cantouch)) return a.cancelEvent(b)
                                                } else if (1 == a.rail.drag.pt) return a.onmouseup(b)
                                            };
                                            var q = a.opt.touchbehavior && a.isiframe && !k.hasmousecapture;
                                            a.ontouchmove = function(c, d) {
                                                if (!a.rail.drag || c.targetTouches && a.opt.preventmultitouchscrolling && 1 < c.targetTouches.length || c.pointerType && 2 != c.pointerType && "touch" != c.pointerType) return !1;
                                                if (2 == a.rail.drag.pt) {
                                                    if (k.cantouch && k.isios && void 0 === c.original) return !0;
                                                    a.hasmoving = !0;
                                                    a.preventclick && !a.preventclick.click && (a.preventclick.click = a.preventclick.tg.onclick ||
                                                        !1, a.preventclick.tg.onclick = a.onpreventclick);
                                                    c = b.extend({
                                                        original: c
                                                    }, c);
                                                    "changedTouches" in c && (c.clientX = c.changedTouches[0].clientX, c.clientY = c.changedTouches[0].clientY);
                                                    if (a.forcescreen) {
                                                        var m = c;
                                                        c = {
                                                            original: c.original ? c.original : c
                                                        };
                                                        c.clientX = m.screenX;
                                                        c.clientY = m.screenY
                                                    }
                                                    var h;
                                                    m = h = 0;
                                                    q && !d && (h = a.win.position(), m = -h.left, h = -h.top);
                                                    var e = c.clientY + h;
                                                    h = e - a.rail.drag.y;
                                                    var g = c.clientX + m;
                                                    var r = g - a.rail.drag.x;
                                                    var f = a.rail.drag.st - h;
                                                    a.ishwscroll && a.opt.bouncescroll ? 0 > f ? f = Math.round(f / 2) : f > a.page.maxh &&
                                                        (f = a.page.maxh + Math.round((f - a.page.maxh) / 2)) : (0 > f && (e = f = 0), f > a.page.maxh && (f = a.page.maxh, e = 0));
                                                    var y;
                                                    a.railh && a.railh.scrollable && (y = a.isrtlmode ? r - a.rail.drag.sl : a.rail.drag.sl - r, a.ishwscroll && a.opt.bouncescroll ? 0 > y ? y = Math.round(y / 2) : y > a.page.maxw && (y = a.page.maxw + Math.round((y - a.page.maxw) / 2)) : (0 > y && (g = y = 0), y > a.page.maxw && (y = a.page.maxw, g = 0)));
                                                    m = !1;
                                                    if (a.rail.drag.dl) m = !0, "v" == a.rail.drag.dl ? y = a.rail.drag.sl : "h" == a.rail.drag.dl && (f = a.rail.drag.st);
                                                    else {
                                                        h = Math.abs(h);
                                                        r = Math.abs(r);
                                                        var T = a.opt.directionlockdeadzone;
                                                        if ("v" == a.rail.drag.ck) {
                                                            if (h > T && r <= .3 * h) return a.rail.drag = !1, !0;
                                                            r > T && (a.rail.drag.dl = "f", b("body").scrollTop(b("body").scrollTop()))
                                                        } else if ("h" == a.rail.drag.ck) {
                                                            if (r > T && h <= .3 * r) return a.rail.drag = !1, !0;
                                                            h > T && (a.rail.drag.dl = "f", b("body").scrollLeft(b("body").scrollLeft()))
                                                        }
                                                    }
                                                    a.synched("touchmove", function() {
                                                        a.rail.drag && 2 == a.rail.drag.pt && (a.prepareTransition && a.prepareTransition(0), a.rail.scrollable && a.setScrollTop(f), a.scrollmom.update(g, e), a.railh && a.railh.scrollable ? (a.setScrollLeft(y), a.showCursor(f,
                                                            y)) : a.showCursor(f), k.isie10 && document.selection.clear())
                                                    });
                                                    k.ischrome && a.istouchcapable && (m = !1);
                                                    if (m) return a.cancelEvent(c)
                                                } else if (1 == a.rail.drag.pt) return a.onmousemove(c)
                                            }
                                        }
                                        a.onmousedown = function(b, c) {
                                            if (!a.rail.drag || 1 == a.rail.drag.pt) {
                                                if (a.railslocked) return a.cancelEvent(b);
                                                a.cancelScroll();
                                                a.rail.drag = {
                                                    x: b.clientX,
                                                    y: b.clientY,
                                                    sx: a.scroll.x,
                                                    sy: a.scroll.y,
                                                    pt: 1,
                                                    hr: !!c
                                                };
                                                var d = a.getTarget(b);
                                                !a.ispage && k.hasmousecapture && d.setCapture();
                                                a.isiframe && !k.hasmousecapture && (a.saved.csspointerevents =
                                                    a.doc.css("pointer-events"), a.css(a.doc, {
                                                    "pointer-events": "none"
                                                }));
                                                a.hasmoving = !1;
                                                return a.cancelEvent(b)
                                            }
                                        };
                                        a.onmouseup = function(b) {
                                            if (a.rail.drag) {
                                                if (1 != a.rail.drag.pt) return !0;
                                                k.hasmousecapture && document.releaseCapture();
                                                a.isiframe && !k.hasmousecapture && a.doc.css("pointer-events", a.saved.csspointerevents);
                                                a.rail.drag = !1;
                                                a.hasmoving && a.triggerScrollEnd();
                                                return a.cancelEvent(b)
                                            }
                                        };
                                        a.onmousemove = function(b) {
                                            if (a.rail.drag) {
                                                if (1 == a.rail.drag.pt) {
                                                    if (k.ischrome && 0 == b.which) return a.onmouseup(b);
                                                    a.cursorfreezed = !0;
                                                    a.hasmoving = !0;
                                                    if (a.rail.drag.hr) {
                                                        a.scroll.x = a.rail.drag.sx + (b.clientX - a.rail.drag.x);
                                                        0 > a.scroll.x && (a.scroll.x = 0);
                                                        var c = a.scrollvaluemaxw;
                                                        a.scroll.x > c && (a.scroll.x = c)
                                                    } else a.scroll.y = a.rail.drag.sy + (b.clientY - a.rail.drag.y), 0 > a.scroll.y && (a.scroll.y = 0), c = a.scrollvaluemax, a.scroll.y > c && (a.scroll.y = c);
                                                    a.synched("mousemove", function() {
                                                        a.rail.drag && 1 == a.rail.drag.pt && (a.showCursor(), a.rail.drag.hr ? a.hasreversehr ? a.doScrollLeft(a.scrollvaluemaxw - Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) :
                                                            a.doScrollLeft(Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollTop(Math.round(a.scroll.y * a.scrollratio.y), a.opt.cursordragspeed))
                                                    });
                                                    return a.cancelEvent(b)
                                                }
                                            } else a.checkarea = 0
                                        };
                                        if (k.cantouch || a.opt.touchbehavior) a.onpreventclick = function(b) {
                                            if (a.preventclick) return a.preventclick.tg.onclick = a.preventclick.click, a.preventclick = !1, a.cancelEvent(b)
                                        }, a.on(a.win, "mousedown", a.ontouchstart), a.onclick = k.isios ? !1 : function(b) {
                                            return a.lastmouseup ? (a.lastmouseup = !1, a.cancelEvent(b)) :
                                                !0
                                        }, a.opt.grabcursorenabled && k.cursorgrabvalue && (a.css(a.ispage ? a.doc : a.win, {
                                            cursor: k.cursorgrabvalue
                                        }), a.css(a.rail, {
                                            cursor: k.cursorgrabvalue
                                        }));
                                        else {
                                            var la = function(b) {
                                                if (a.selectiondrag) {
                                                    if (b) {
                                                        var c = a.win.outerHeight();
                                                        b = b.pageY - a.selectiondrag.top;
                                                        0 < b && b < c && (b = 0);
                                                        b >= c && (b -= c);
                                                        a.selectiondrag.df = b
                                                    }
                                                    0 != a.selectiondrag.df && (a.doScrollBy(2 * -Math.floor(a.selectiondrag.df / 6)), a.debounced("doselectionscroll", function() {
                                                        la()
                                                    }, 50))
                                                }
                                            };
                                            a.hasTextSelected = "getSelection" in document ? function() {
                                                    return 0 < document.getSelection().rangeCount
                                                } :
                                                "selection" in document ? function() {
                                                    return "None" != document.selection.type
                                                } : function() {
                                                    return !1
                                                };
                                            a.onselectionstart = function(b) {
                                                a.ispage || (a.selectiondrag = a.win.offset())
                                            };
                                            a.onselectionend = function(b) {
                                                a.selectiondrag = !1
                                            };
                                            a.onselectiondrag = function(b) {
                                                a.selectiondrag && a.hasTextSelected() && a.debounced("selectionscroll", function() {
                                                    la(b)
                                                }, 250)
                                            }
                                        }
                                        k.hasw3ctouch ? (a.css(a.rail, {
                                            "touch-action": "none"
                                        }), a.css(a.cursor, {
                                            "touch-action": "none"
                                        }), a.on(a.win, "pointerdown", a.ontouchstart), a.on(document, "pointerup", a.ontouchend),
                                            a.on(document, "pointermove", a.ontouchmove)) : k.hasmstouch ? (a.css(a.rail, {
                                            "-ms-touch-action": "none"
                                        }), a.css(a.cursor, {
                                            "-ms-touch-action": "none"
                                        }), a.on(a.win, "MSPointerDown", a.ontouchstart), a.on(document, "MSPointerUp", a.ontouchend), a.on(document, "MSPointerMove", a.ontouchmove), a.on(a.cursor, "MSGestureHold", function(a) {
                                            a.preventDefault()
                                        }), a.on(a.cursor, "contextmenu", function(a) {
                                            a.preventDefault()
                                        })) : this.istouchcapable && (a.on(a.win, "touchstart", a.ontouchstart), a.on(document, "touchend", a.ontouchend), a.on(document,
                                            "touchcancel", a.ontouchend), a.on(document, "touchmove", a.ontouchmove));
                                        if (a.opt.cursordragontouch || !k.cantouch && !a.opt.touchbehavior) a.rail.css({
                                            cursor: "default"
                                        }), a.railh && a.railh.css({
                                            cursor: "default"
                                        }), a.jqbind(a.rail, "mouseenter", function() {
                                            if (!a.ispage && !a.win.is(":visible")) return !1;
                                            a.canshowonmouseevent && a.showCursor();
                                            a.rail.active = !0
                                        }), a.jqbind(a.rail, "mouseleave", function() {
                                            a.rail.active = !1;
                                            a.rail.drag || a.hideCursor()
                                        }), a.opt.sensitiverail && (a.on(a.rail, "click", function(b) {
                                            a.doRailClick(b, !1, !1)
                                        }), a.on(a.rail, "dblclick", function(b) {
                                            a.doRailClick(b, !0, !1)
                                        }), a.on(a.cursor, "click", function(b) {
                                            a.cancelEvent(b)
                                        }), a.on(a.cursor, "dblclick", function(b) {
                                            a.cancelEvent(b)
                                        })), a.railh && (a.jqbind(a.railh, "mouseenter", function() {
                                            if (!a.ispage && !a.win.is(":visible")) return !1;
                                            a.canshowonmouseevent && a.showCursor();
                                            a.rail.active = !0
                                        }), a.jqbind(a.railh, "mouseleave", function() {
                                            a.rail.active = !1;
                                            a.rail.drag || a.hideCursor()
                                        }), a.opt.sensitiverail && (a.on(a.railh, "click", function(b) {
                                            a.doRailClick(b, !1, !0)
                                        }), a.on(a.railh,
                                            "dblclick",
                                            function(b) {
                                                a.doRailClick(b, !0, !0)
                                            }), a.on(a.cursorh, "click", function(b) {
                                            a.cancelEvent(b)
                                        }), a.on(a.cursorh, "dblclick", function(b) {
                                            a.cancelEvent(b)
                                        })));
                                        if (k.cantouch || a.opt.touchbehavior) {
                                            a.on(k.hasmousecapture ? a.win : document, "mouseup", a.ontouchend);
                                            a.on(document, "mousemove", a.ontouchmove);
                                            if (a.onclick) a.on(document, "click", a.onclick);
                                            a.opt.cursordragontouch ? (a.on(a.cursor, "mousedown", a.onmousedown), a.on(a.cursor, "mouseup", a.onmouseup), a.cursorh && a.on(a.cursorh, "mousedown", function(b) {
                                                a.onmousedown(b, !0)
                                            }), a.cursorh && a.on(a.cursorh, "mouseup", a.onmouseup)) : (a.on(a.rail, "mousedown", function(a) {
                                                a.preventDefault()
                                            }), a.railh && a.on(a.railh, "mousedown", function(a) {
                                                a.preventDefault()
                                            }))
                                        } else {
                                            a.on(k.hasmousecapture ? a.win : document, "mouseup", a.onmouseup);
                                            a.on(document, "mousemove", a.onmousemove);
                                            if (a.onclick) a.on(document, "click", a.onclick);
                                            a.on(a.cursor, "mousedown", a.onmousedown);
                                            a.on(a.cursor, "mouseup", a.onmouseup);
                                            a.railh && (a.on(a.cursorh, "mousedown", function(b) {
                                                a.onmousedown(b, !0)
                                            }), a.on(a.cursorh, "mouseup",
                                                a.onmouseup));
                                            if (!a.ispage && a.opt.enablescrollonselection) {
                                                a.on(a.win[0], "mousedown", a.onselectionstart);
                                                a.on(document, "mouseup", a.onselectionend);
                                                a.on(a.cursor, "mouseup", a.onselectionend);
                                                if (a.cursorh) a.on(a.cursorh, "mouseup", a.onselectionend);
                                                a.on(document, "mousemove", a.onselectiondrag)
                                            }
                                            a.zoom && (a.jqbind(a.zoom, "mouseenter", function() {
                                                a.canshowonmouseevent && a.showCursor();
                                                a.rail.active = !0
                                            }), a.jqbind(a.zoom, "mouseleave", function() {
                                                a.rail.active = !1;
                                                a.rail.drag || a.hideCursor()
                                            }))
                                        }
                                        a.opt.enablemousewheel &&
                                        (a.isiframe || a.mousewheel(k.isie && a.ispage ? document : a.win, a.onmousewheel), a.mousewheel(a.rail, a.onmousewheel), a.railh && a.mousewheel(a.railh, a.onmousewheelhr));
                                        a.ispage || k.cantouch || /HTML|^BODY/.test(a.win[0].nodeName) || (a.win.attr("tabindex") || a.win.attr({
                                            tabindex: f++
                                        }), a.jqbind(a.win, "focus", function(b) {
                                            c = a.getTarget(b).id || !0;
                                            a.hasfocus = !0;
                                            a.canshowonmouseevent && a.noticeCursor()
                                        }), a.jqbind(a.win, "blur", function(b) {
                                            c = !1;
                                            a.hasfocus = !1
                                        }), a.jqbind(a.win, "mouseenter", function(b) {
                                            d = a.getTarget(b).id ||
                                                !0;
                                            a.hasmousefocus = !0;
                                            a.canshowonmouseevent && a.noticeCursor()
                                        }), a.jqbind(a.win, "mouseleave", function() {
                                            d = !1;
                                            a.hasmousefocus = !1;
                                            a.rail.drag || a.hideCursor()
                                        }))
                                    }
                                    a.onkeypress = function(m) {
                                        if (a.railslocked && 0 == a.page.maxh) return !0;
                                        m = m ? m : window.e;
                                        var h = a.getTarget(m);
                                        if (h && /INPUT|TEXTAREA|SELECT|OPTION/.test(h.nodeName) && (!h.getAttribute("type") && !h.type || !/submit|button|cancel/i.tp) || b(h).attr("contenteditable")) return !0;
                                        if (a.hasfocus || a.hasmousefocus && !c || a.ispage && !c && !d) {
                                            h = m.keyCode;
                                            if (a.railslocked &&
                                                27 != h) return a.cancelEvent(m);
                                            var e = m.ctrlKey || !1,
                                                g = m.shiftKey || !1,
                                                r = !1;
                                            switch (h) {
                                                case 38:
                                                case 63233:
                                                    a.doScrollBy(72);
                                                    r = !0;
                                                    break;
                                                case 40:
                                                case 63235:
                                                    a.doScrollBy(-72);
                                                    r = !0;
                                                    break;
                                                case 37:
                                                case 63232:
                                                    a.railh && (e ? a.doScrollLeft(0) : a.doScrollLeftBy(72), r = !0);
                                                    break;
                                                case 39:
                                                case 63234:
                                                    a.railh && (e ? a.doScrollLeft(a.page.maxw) : a.doScrollLeftBy(-72), r = !0);
                                                    break;
                                                case 33:
                                                case 63276:
                                                    a.doScrollBy(a.view.h);
                                                    r = !0;
                                                    break;
                                                case 34:
                                                case 63277:
                                                    a.doScrollBy(-a.view.h);
                                                    r = !0;
                                                    break;
                                                case 36:
                                                case 63273:
                                                    a.railh && e ? a.doScrollPos(0,
                                                        0) : a.doScrollTo(0);
                                                    r = !0;
                                                    break;
                                                case 35:
                                                case 63275:
                                                    a.railh && e ? a.doScrollPos(a.page.maxw, a.page.maxh) : a.doScrollTo(a.page.maxh);
                                                    r = !0;
                                                    break;
                                                case 32:
                                                    a.opt.spacebarenabled && (g ? a.doScrollBy(a.view.h) : a.doScrollBy(-a.view.h), r = !0);
                                                    break;
                                                case 27:
                                                    a.zoomactive && (a.doZoom(), r = !0)
                                            }
                                            if (r) return a.cancelEvent(m)
                                        }
                                    };
                                    if (a.opt.enablekeyboard) a.on(document, k.isopera && !k.isopera12 ? "keypress" : "keydown", a.onkeypress);
                                    a.on(document, "keydown", function(b) {
                                        b.ctrlKey && (a.wheelprevented = !0)
                                    });
                                    a.on(document, "keyup", function(b) {
                                        b.ctrlKey ||
                                        (a.wheelprevented = !1)
                                    });
                                    a.on(window, "blur", function(b) {
                                        a.wheelprevented = !1
                                    });
                                    a.on(window, "resize", a.lazyResize);
                                    a.on(window, "orientationchange", a.lazyResize);
                                    a.on(window, "load", a.lazyResize);
                                    if (k.ischrome && !a.ispage && !a.haswrapper) {
                                        var v = a.win.attr("style");
                                        g = parseFloat(a.win.css("width")) + 1;
                                        a.win.css("width", g);
                                        a.synched("chromefix", function() {
                                            a.win.attr("style", v)
                                        })
                                    }
                                    a.onAttributeChange = function(b) {
                                        a.lazyResize(a.isieold ? 250 : 30)
                                    };
                                    a.isie11 || !1 === w || (a.observerbody = new w(function(c) {
                                        c.forEach(function(c) {
                                            if ("attributes" ==
                                                c.type) return b("body").hasClass("modal-open") && b("body").hasClass("modal-dialog") && !b.contains(b(".modal-dialog")[0], a.doc[0]) ? a.hide() : a.show()
                                        });
                                        if (document.body.scrollHeight != a.page.maxh) return a.lazyResize(30)
                                    }), a.observerbody.observe(document.body, {
                                        childList: !0,
                                        subtree: !0,
                                        characterData: !1,
                                        attributes: !0,
                                        attributeFilter: ["class"]
                                    }));
                                    a.ispage || a.haswrapper || (!1 !== w ? (a.observer = new w(function(b) {
                                        b.forEach(a.onAttributeChange)
                                    }), a.observer.observe(a.win[0], {
                                        childList: !0,
                                        characterData: !1,
                                        attributes: !0,
                                        subtree: !1
                                    }), a.observerremover = new w(function(b) {
                                        b.forEach(function(b) {
                                            if (0 < b.removedNodes.length)
                                                for (var c in b.removedNodes)
                                                    if (a && b.removedNodes[c] == a.win[0]) return a.remove()
                                        })
                                    }), a.observerremover.observe(a.win[0].parentNode, {
                                        childList: !0,
                                        characterData: !1,
                                        attributes: !1,
                                        subtree: !1
                                    })) : (a.on(a.win, k.isie && !k.isie9 ? "propertychange" : "DOMAttrModified", a.onAttributeChange), k.isie9 && a.win[0].attachEvent("onpropertychange", a.onAttributeChange), a.on(a.win, "DOMNodeRemoved", function(b) {
                                        b.target == a.win[0] &&
                                        a.remove()
                                    })));
                                    if (!a.ispage && a.opt.boxzoom) a.on(window, "resize", a.resizeZoom);
                                    a.istextarea && (a.on(a.win, "keydown", a.lazyResize), a.on(a.win, "mouseup", a.lazyResize));
                                    a.lazyResize(30)
                                }
                                if ("IFRAME" == this.doc[0].nodeName) {
                                    var t = function() {
                                        a.iframexd = !1;
                                        try {
                                            var c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
                                        } catch (qa) {
                                            a.iframexd = !0, c = !1
                                        }
                                        if (a.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
                                        a.forcescreen = !0;
                                        a.isiframe && (a.iframe = {
                                            doc: b(c),
                                            html: a.doc.contents().find("html")[0],
                                            body: a.doc.contents().find("body")[0]
                                        }, a.getContentSize = function() {
                                            return {
                                                w: Math.max(a.iframe.html.scrollWidth, a.iframe.body.scrollWidth),
                                                h: Math.max(a.iframe.html.scrollHeight, a.iframe.body.scrollHeight)
                                            }
                                        }, a.docscroll = b(a.iframe.body));
                                        if (!k.isios && a.opt.iframeautoresize && !a.isiframe) {
                                            a.win.scrollTop(0);
                                            a.doc.height("");
                                            var d = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight);
                                            a.doc.height(d)
                                        }
                                        a.lazyResize(30);
                                        k.isie7 && a.css(b(a.iframe.html),
                                            m);
                                        a.css(b(a.iframe.body), m);
                                        k.isios && a.haswrapper && a.css(b(c.body), {
                                            "-webkit-transform": "translate3d(0,0,0)"
                                        });
                                        if ("contentWindow" in this) a.on(this.contentWindow, "scroll", a.onscroll);
                                        else a.on(c, "scroll", a.onscroll);
                                        a.opt.enablemousewheel && a.mousewheel(c, a.onmousewheel);
                                        if (a.opt.enablekeyboard) a.on(c, k.isopera ? "keypress" : "keydown", a.onkeypress);
                                        if (k.cantouch || a.opt.touchbehavior) a.on(c, "mousedown", a.ontouchstart), a.on(c, "mousemove", function(b) {
                                            return a.ontouchmove(b, !0)
                                        }), a.opt.grabcursorenabled &&
                                        k.cursorgrabvalue && a.css(b(c.body), {
                                            cursor: k.cursorgrabvalue
                                        });
                                        a.on(c, "mouseup", a.ontouchend);
                                        if (a.zoom) {
                                            if (a.opt.dblclickzoom) a.on(c, "dblclick", a.doZoom);
                                            if (a.ongesturezoom) a.on(c, "gestureend", a.ongesturezoom)
                                        }
                                    };
                                    this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                                        t.call(a.doc[0], !1)
                                    }, 500);
                                    a.on(this.doc, "load", t)
                                }
                            };
                            this.showCursor = function(b, c) {
                                a.cursortimeout && (clearTimeout(a.cursortimeout), a.cursortimeout = 0);
                                if (a.rail) {
                                    a.autohidedom && (a.autohidedom.stop().css({
                                        opacity: a.opt.cursoropacitymax
                                    }),
                                        a.cursoractive = !0);
                                    a.rail.drag && 1 == a.rail.drag.pt || (void 0 !== b && !1 !== b && (a.scroll.y = Math.round(1 * b / a.scrollratio.y)), void 0 !== c && (a.scroll.x = Math.round(1 * c / a.scrollratio.x)));
                                    a.cursor.css({
                                        height: a.cursorheight,
                                        top: a.scroll.y
                                    });
                                    if (a.cursorh) {
                                        var d = a.hasreversehr ? a.scrollvaluemaxw - a.scroll.x : a.scroll.x;
                                        !a.rail.align && a.rail.visibility ? a.cursorh.css({
                                            width: a.cursorwidth,
                                            left: d + a.rail.width
                                        }) : a.cursorh.css({
                                            width: a.cursorwidth,
                                            left: d
                                        });
                                        a.cursoractive = !0
                                    }
                                    a.zoom && a.zoom.stop().css({
                                        opacity: a.opt.cursoropacitymax
                                    })
                                }
                            };
                            this.hideCursor = function(b) {
                                a.cursortimeout || !a.rail || !a.autohidedom || a.hasmousefocus && "leave" == a.opt.autohidemode || (a.cursortimeout = setTimeout(function() {
                                    a.rail.active && a.showonmouseevent || (a.autohidedom.stop().animate({
                                        opacity: a.opt.cursoropacitymin
                                    }), a.zoom && a.zoom.stop().animate({
                                        opacity: a.opt.cursoropacitymin
                                    }), a.cursoractive = !1);
                                    a.cursortimeout = 0
                                }, b || a.opt.hidecursordelay))
                            };
                            this.noticeCursor = function(b, c, d) {
                                a.showCursor(c, d);
                                a.rail.active || a.hideCursor(b)
                            };
                            this.getContentSize = a.ispage ? function() {
                                return {
                                    w: Math.max(document.body.scrollWidth,
                                        document.documentElement.scrollWidth),
                                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                                }
                            } : a.haswrapper ? function() {
                                return {
                                    w: a.doc.outerWidth() + parseInt(a.win.css("paddingLeft")) + parseInt(a.win.css("paddingRight")),
                                    h: a.doc.outerHeight() + parseInt(a.win.css("paddingTop")) + parseInt(a.win.css("paddingBottom"))
                                }
                            } : function() {
                                return {
                                    w: a.docscroll[0].scrollWidth,
                                    h: a.docscroll[0].scrollHeight
                                }
                            };
                            this.onResize = function(b, c) {
                                if (!a || !a.win) return !1;
                                if (!a.haswrapper && !a.ispage) {
                                    if ("none" ==
                                        a.win.css("display")) return a.visibility && a.hideRail().hideRailHr(), !1;
                                    a.hidden || a.visibility || a.showRail().showRailHr()
                                }
                                var d = a.page.maxh,
                                    m = a.page.maxw,
                                    h = a.view.h,
                                    e = a.view.w;
                                a.view = {
                                    w: a.ispage ? a.win.width() : parseInt(a.win[0].clientWidth),
                                    h: a.ispage ? a.win.height() : parseInt(a.win[0].clientHeight)
                                };
                                a.page = c ? c : a.getContentSize();
                                a.page.maxh = Math.max(0, a.page.h - a.view.h);
                                a.page.maxw = Math.max(0, a.page.w - a.view.w);
                                if (a.page.maxh == d && a.page.maxw == m && a.view.w == e && a.view.h == h) {
                                    if (a.ispage) return a;
                                    d = a.win.offset();
                                    if (a.lastposition && (m = a.lastposition, m.top == d.top && m.left == d.left)) return a;
                                    a.lastposition = d
                                }
                                0 == a.page.maxh ? (a.hideRail(), a.scrollvaluemax = 0, a.scroll.y = 0, a.scrollratio.y = 0, a.cursorheight = 0, a.setScrollTop(0), a.rail && (a.rail.scrollable = !1)) : (a.page.maxh -= a.opt.railpadding.top + a.opt.railpadding.bottom, a.rail.scrollable = !0);
                                0 == a.page.maxw ? (a.hideRailHr(), a.scrollvaluemaxw = 0, a.scroll.x = 0, a.scrollratio.x = 0, a.cursorwidth = 0, a.setScrollLeft(0), a.railh && (a.railh.scrollable = !1)) : (a.page.maxw -= a.opt.railpadding.left +
                                    a.opt.railpadding.right, a.railh && (a.railh.scrollable = a.opt.horizrailenabled));
                                a.railslocked = a.locked || 0 == a.page.maxh && 0 == a.page.maxw;
                                if (a.railslocked) return a.ispage || a.updateScrollBar(a.view), !1;
                                a.hidden || a.visibility ? !a.railh || a.hidden || a.railh.visibility || a.showRailHr() : a.showRail().showRailHr();
                                a.istextarea && a.win.css("resize") && "none" != a.win.css("resize") && (a.view.h -= 20);
                                a.cursorheight = Math.min(a.view.h, Math.round(a.view.h / a.page.h * a.view.h));
                                a.cursorheight = a.opt.cursorfixedheight ? a.opt.cursorfixedheight :
                                    Math.max(a.opt.cursorminheight, a.cursorheight);
                                a.cursorwidth = Math.min(a.view.w, Math.round(a.view.w / a.page.w * a.view.w));
                                a.cursorwidth = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorwidth);
                                a.scrollvaluemax = a.view.h - a.cursorheight - a.cursor.hborder - (a.opt.railpadding.top + a.opt.railpadding.bottom);
                                a.railh && (a.railh.width = 0 < a.page.maxh ? a.view.w - a.rail.width : a.view.w, a.scrollvaluemaxw = a.railh.width - a.cursorwidth - a.cursorh.wborder - (a.opt.railpadding.left + a.opt.railpadding.right));
                                a.ispage || a.updateScrollBar(a.view);
                                a.scrollratio = {
                                    x: a.page.maxw / a.scrollvaluemaxw,
                                    y: a.page.maxh / a.scrollvaluemax
                                };
                                a.getScrollTop() > a.page.maxh ? a.doScrollTop(a.page.maxh) : (a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y)), a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)), a.cursoractive && a.noticeCursor());
                                a.scroll.y && 0 == a.getScrollTop() && a.doScrollTo(Math.floor(a.scroll.y * a.scrollratio.y));
                                return a
                            };
                            this.resize = a.onResize;
                            this.hlazyresize = 0;
                            this.lazyResize = function(b) {
                                a.haswrapper ||
                                a.hide();
                                a.hlazyresize && clearTimeout(a.hlazyresize);
                                a.hlazyresize = setTimeout(function() {
                                    a && a.show().resize()
                                }, 240);
                                return a
                            };
                            this.jqbind = function(c, d, h) {
                                a.events.push({
                                    e: c,
                                    n: d,
                                    f: h,
                                    q: !0
                                });
                                b(c).on(d, h)
                            };
                            this.mousewheel = function(b, c, d) {
                                b = "jquery" in b ? b[0] : b;
                                if ("onwheel" in document.createElement("div")) a._bind(b, "wheel", c, d || !1);
                                else {
                                    var m = void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                                    K(b, m, c, d || !1);
                                    "DOMMouseScroll" == m && K(b, "MozMousePixelScroll", c, d || !1)
                                }
                            };
                            k.haseventlistener ? (this.on = function(b,
                                                                     c, d, h) {
                                a._bind("jquery" in b ? b[0] : b, c, d, h || !1)
                            }, this._bind = function(b, c, d, h) {
                                a.events.push({
                                    e: b,
                                    n: c,
                                    f: d,
                                    b: h,
                                    q: !1
                                });
                                b.addEventListener(c, d, h || !1)
                            }, this.cancelEvent = function(a) {
                                if (!a) return !1;
                                a = a.original ? a.original : a;
                                a.cancelable && a.preventDefault();
                                a.stopPropagation();
                                a.preventManipulation && a.preventManipulation();
                                return !1
                            }, this.stopPropagation = function(a) {
                                if (!a) return !1;
                                a = a.original ? a.original : a;
                                a.stopPropagation();
                                return !1
                            }, this._unbind = function(a, b, c, d) {
                                a.removeEventListener(b, c, d)
                            }) : (this.on = function(b,
                                                     c, d, h) {
                                var m = "jquery" in b ? b[0] : b;
                                a._bind(m, c, function(b) {
                                    (b = b || window.event || !1) && b.srcElement && (b.target = b.srcElement);
                                    "pageY" in b || (b.pageX = b.clientX + document.documentElement.scrollLeft, b.pageY = b.clientY + document.documentElement.scrollTop);
                                    return !1 === d.call(m, b) || !1 === h ? a.cancelEvent(b) : !0
                                })
                            }, this._bind = function(b, c, d, h) {
                                a.events.push({
                                    e: b,
                                    n: c,
                                    f: d,
                                    b: h,
                                    q: !1
                                });
                                b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d
                            }, this.cancelEvent = function(a) {
                                a = window.event || !1;
                                if (!a) return !1;
                                a.cancelBubble = !0;
                                a.cancel = !0;
                                return a.returnValue = !1
                            }, this.stopPropagation = function(a) {
                                a = window.event || !1;
                                if (!a) return !1;
                                a.cancelBubble = !0;
                                return !1
                            }, this._unbind = function(a, b, c, d) {
                                a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = !1
                            });
                            this.unbindAll = function() {
                                for (var b = 0; b < a.events.length; b++) {
                                    var c = a.events[b];
                                    c.q ? c.e.unbind(c.n, c.f) : a._unbind(c.e, c.n, c.f, c.b)
                                }
                            };
                            this.showRail = function() {
                                0 == a.page.maxh || !a.ispage && "none" == a.win.css("display") || (a.visibility = !0, a.rail.visibility = !0, a.rail.css("display", "block"));
                                return a
                            };
                            this.showRailHr =
                                function() {
                                    if (!a.railh) return a;
                                    0 == a.page.maxw || !a.ispage && "none" == a.win.css("display") || (a.railh.visibility = !0, a.railh.css("display", "block"));
                                    return a
                                };
                            this.hideRail = function() {
                                a.visibility = !1;
                                a.rail.visibility = !1;
                                a.rail.css("display", "none");
                                return a
                            };
                            this.hideRailHr = function() {
                                if (!a.railh) return a;
                                a.railh.visibility = !1;
                                a.railh.css("display", "none");
                                return a
                            };
                            this.show = function() {
                                a.hidden = !1;
                                a.railslocked = !1;
                                return a.showRail().showRailHr()
                            };
                            this.hide = function() {
                                a.hidden = !0;
                                a.railslocked = !0;
                                return a.hideRail().hideRailHr()
                            };
                            this.toggle = function() {
                                return a.hidden ? a.show() : a.hide()
                            };
                            this.remove = function() {
                                a.stop();
                                a.cursortimeout && clearTimeout(a.cursortimeout);
                                for (var c in a.delaylist) a.delaylist[c] && v(a.delaylist[c].h);
                                a.doZoomOut();
                                a.unbindAll();
                                k.isie9 && a.win[0].detachEvent("onpropertychange", a.onAttributeChange);
                                !1 !== a.observer && a.observer.disconnect();
                                !1 !== a.observerremover && a.observerremover.disconnect();
                                !1 !== a.observerbody && a.observerbody.disconnect();
                                a.events = null;
                                a.cursor && a.cursor.remove();
                                a.cursorh && a.cursorh.remove();
                                a.rail && a.rail.remove();
                                a.railh && a.railh.remove();
                                a.zoom && a.zoom.remove();
                                for (c = 0; c < a.saved.css.length; c++) {
                                    var d = a.saved.css[c];
                                    d[0].css(d[1], void 0 === d[2] ? "" : d[2])
                                }
                                a.saved = !1;
                                a.me.data("__nicescroll", "");
                                var h = b.nicescroll;
                                h.each(function(b) {
                                    if (this && this.id === a.id) {
                                        delete h[b];
                                        for (var c = ++b; c < h.length; c++, b++) h[b] = h[c];
                                        h.length--;
                                        h.length && delete h[h.length]
                                    }
                                });
                                for (var e in a) a[e] = null, delete a[e];
                                a = null
                            };
                            this.scrollstart = function(b) {
                                this.onscrollstart = b;
                                return a
                            };
                            this.scrollend = function(b) {
                                this.onscrollend =
                                    b;
                                return a
                            };
                            this.scrollcancel = function(b) {
                                this.onscrollcancel = b;
                                return a
                            };
                            this.zoomin = function(b) {
                                this.onzoomin = b;
                                return a
                            };
                            this.zoomout = function(b) {
                                this.onzoomout = b;
                                return a
                            };
                            this.isScrollable = function(a) {
                                a = a.target ? a.target : a;
                                if ("OPTION" == a.nodeName) return !0;
                                for (; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                                    var c = b(a);
                                    c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                                    if (/scroll|auto/.test(c)) return a.clientHeight != a.scrollHeight;
                                    a = a.parentNode ? a.parentNode : !1
                                }
                                return !1
                            };
                            this.getViewport =
                                function(a) {
                                    for (a = a && a.parentNode ? a.parentNode : !1; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                                        var c = b(a);
                                        if (/fixed|absolute/.test(c.css("position"))) return c;
                                        var d = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                                        if (/scroll|auto/.test(d) && a.clientHeight != a.scrollHeight || 0 < c.getNiceScroll().length) return c;
                                        a = a.parentNode ? a.parentNode : !1
                                    }
                                    return !1
                                };
                            this.triggerScrollEnd = function() {
                                if (a.onscrollend) {
                                    var b = a.getScrollLeft(),
                                        c = a.getScrollTop();
                                    a.onscrollend.call(a, {
                                        type: "scrollend",
                                        current: {
                                            x: b,
                                            y: c
                                        },
                                        end: {
                                            x: b,
                                            y: c
                                        }
                                    })
                                }
                            };
                            this.onmousewheel = function(b) {
                                if (!a.wheelprevented) {
                                    if (a.railslocked) return a.debounced("checkunlock", a.resize, 250), !0;
                                    if (a.rail.drag) return a.cancelEvent(b);
                                    "auto" == a.opt.oneaxismousemode && 0 != b.deltaX && (a.opt.oneaxismousemode = !1);
                                    if (a.opt.oneaxismousemode && 0 == b.deltaX && !a.rail.scrollable) return a.railh && a.railh.scrollable ? a.onmousewheelhr(b) : !0;
                                    var c = +new Date,
                                        d = !1;
                                    a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
                                    a.checkarea = c;
                                    if (a.nativescrollingarea) return !0;
                                    if (b = n(b, !1, d)) a.checkarea = 0;
                                    return b
                                }
                            };
                            this.onmousewheelhr = function(b) {
                                if (!a.wheelprevented) {
                                    if (a.railslocked || !a.railh.scrollable) return !0;
                                    if (a.rail.drag) return a.cancelEvent(b);
                                    var c = +new Date,
                                        d = !1;
                                    a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
                                    a.checkarea = c;
                                    return a.nativescrollingarea ? !0 : a.railslocked ? a.cancelEvent(b) : n(b, !0, d)
                                }
                            };
                            this.stop = function() {
                                a.cancelScroll();
                                a.scrollmon && a.scrollmon.stop();
                                a.cursorfreezed = !1;
                                a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
                                a.noticeCursor();
                                return a
                            };
                            this.getTransitionSpeed = function(b) {
                                b = Math.min(Math.round(10 * a.opt.scrollspeed), Math.round(b / 20 * a.opt.scrollspeed));
                                return 20 < b ? b : 0
                            };
                            a.opt.smoothscroll ? a.ishwscroll && k.hastransition && a.opt.usetransition && a.opt.smoothscroll ? (this.prepareTransition = function(b, c) {
                                var d = c ? 20 < b ? b : 0 : a.getTransitionSpeed(b),
                                    h = d ? k.prefixstyle + "transform " + d + "ms ease-out" : "";
                                a.lasttransitionstyle && a.lasttransitionstyle ==
                                h || (a.lasttransitionstyle = h, a.doc.css(k.transitionstyle, h));
                                return d
                            }, this.doScrollLeft = function(b, c) {
                                var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
                                a.doScrollPos(b, d, c)
                            }, this.doScrollTop = function(b, c) {
                                var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
                                a.doScrollPos(d, b, c)
                            }, this.doScrollPos = function(b, c, d) {
                                var h = a.getScrollTop(),
                                    e = a.getScrollLeft();
                                (0 > (a.newscrolly - h) * (c - h) || 0 > (a.newscrollx - e) * (b - e)) && a.cancelScroll();
                                0 == a.opt.bouncescroll && (0 > c ? c = 0 : c > a.page.maxh && (c = a.page.maxh), 0 > b ? b = 0 : b >
                                    a.page.maxw && (b = a.page.maxw));
                                if (a.scrollrunning && b == a.newscrollx && c == a.newscrolly) return !1;
                                a.newscrolly = c;
                                a.newscrollx = b;
                                a.newscrollspeed = d || !1;
                                if (a.timer) return !1;
                                a.timer = setTimeout(function() {
                                    var d = a.getScrollTop(),
                                        h = a.getScrollLeft(),
                                        e = Math.round(Math.sqrt(Math.pow(b - h, 2) + Math.pow(c - d, 2)));
                                    e = a.newscrollspeed && 1 < a.newscrollspeed ? a.newscrollspeed : a.getTransitionSpeed(e);
                                    a.newscrollspeed && 1 >= a.newscrollspeed && (e *= a.newscrollspeed);
                                    a.prepareTransition(e, !0);
                                    a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                                    0 < e && (!a.scrollrunning && a.onscrollstart && a.onscrollstart.call(a, {
                                        type: "scrollstart",
                                        current: {
                                            x: h,
                                            y: d
                                        },
                                        request: {
                                            x: b,
                                            y: c
                                        },
                                        end: {
                                            x: a.newscrollx,
                                            y: a.newscrolly
                                        },
                                        speed: e
                                    }), k.transitionend ? a.scrollendtrapped || (a.scrollendtrapped = !0, a.on(a.doc, k.transitionend, a.onScrollTransitionEnd, !1)) : (a.scrollendtrapped && clearTimeout(a.scrollendtrapped), a.scrollendtrapped = setTimeout(a.onScrollTransitionEnd, e)), a.timerscroll = {
                                        bz: new R(d, a.newscrolly, e, 0, 0, .58, 1),
                                        bh: new R(h, a.newscrollx, e, 0, 0, .58, 1)
                                    }, a.cursorfreezed || (a.timerscroll.tm =
                                        setInterval(function() {
                                            a.showCursor(a.getScrollTop(), a.getScrollLeft())
                                        }, 60)));
                                    a.synched("doScroll-set", function() {
                                        a.timer = 0;
                                        a.scrollendtrapped && (a.scrollrunning = !0);
                                        a.setScrollTop(a.newscrolly);
                                        a.setScrollLeft(a.newscrollx);
                                        if (!a.scrollendtrapped) a.onScrollTransitionEnd()
                                    })
                                }, 50)
                            }, this.cancelScroll = function() {
                                if (!a.scrollendtrapped) return !0;
                                var b = a.getScrollTop(),
                                    c = a.getScrollLeft();
                                a.scrollrunning = !1;
                                k.transitionend || clearTimeout(k.transitionend);
                                a.scrollendtrapped = !1;
                                a._unbind(a.doc[0], k.transitionend,
                                    a.onScrollTransitionEnd);
                                a.prepareTransition(0);
                                a.setScrollTop(b);
                                a.railh && a.setScrollLeft(c);
                                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                                a.timerscroll = !1;
                                a.cursorfreezed = !1;
                                a.showCursor(b, c);
                                return a
                            }, this.onScrollTransitionEnd = function() {
                                a.scrollendtrapped && a._unbind(a.doc[0], k.transitionend, a.onScrollTransitionEnd);
                                a.scrollendtrapped = !1;
                                a.prepareTransition(0);
                                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                                a.timerscroll = !1;
                                var b = a.getScrollTop(),
                                    c = a.getScrollLeft();
                                a.setScrollTop(b);
                                a.railh && a.setScrollLeft(c);
                                a.noticeCursor(!1, b, c);
                                a.cursorfreezed = !1;
                                0 > b ? b = 0 : b > a.page.maxh && (b = a.page.maxh);
                                0 > c ? c = 0 : c > a.page.maxw && (c = a.page.maxw);
                                if (b != a.newscrolly || c != a.newscrollx) return a.doScrollPos(c, b, a.opt.snapbackspeed);
                                a.onscrollend && a.scrollrunning && a.triggerScrollEnd();
                                a.scrollrunning = !1
                            }) : (this.doScrollLeft = function(b, c) {
                                var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
                                a.doScrollPos(b, d, c)
                            }, this.doScrollTop = function(b, c) {
                                var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
                                a.doScrollPos(d, b, c)
                            }, this.doScrollPos = function(b, c, d) {
                                function h() {
                                    if (a.cancelAnimationFrame) return !0;
                                    a.scrollrunning = !0;
                                    if (l = 1 - l) return a.timer = q(h) || 1;
                                    var b = 0,
                                        c, d = c = a.getScrollTop();
                                    if (a.dst.ay) {
                                        d = a.bzscroll ? a.dst.py + a.bzscroll.getNow() * a.dst.ay : a.newscrolly;
                                        var e = d - c;
                                        if (0 > e && d < a.newscrolly || 0 < e && d > a.newscrolly) d = a.newscrolly;
                                        a.setScrollTop(d);
                                        d == a.newscrolly && (b = 1)
                                    } else b = 1;
                                    c = e = a.getScrollLeft();
                                    if (a.dst.ax) {
                                        c = a.bzscroll ? a.dst.px + a.bzscroll.getNow() * a.dst.ax : a.newscrollx;
                                        e = c - e;
                                        if (0 > e && c < a.newscrollx ||
                                            0 < e && c > a.newscrollx) c = a.newscrollx;
                                        a.setScrollLeft(c);
                                        c == a.newscrollx && (b += 1)
                                    } else b += 1;
                                    2 == b ? (a.timer = 0, a.cursorfreezed = !1, a.bzscroll = !1, a.scrollrunning = !1, 0 > d ? d = 0 : d > a.page.maxh && (d = Math.max(0, a.page.maxh)), 0 > c ? c = 0 : c > a.page.maxw && (c = a.page.maxw), c != a.newscrollx || d != a.newscrolly ? a.doScrollPos(c, d) : a.onscrollend && a.triggerScrollEnd()) : a.timer = q(h) || 1
                                }
                                c = void 0 === c || !1 === c ? a.getScrollTop(!0) : c;
                                if (a.timer && a.newscrolly == c && a.newscrollx == b) return !0;
                                a.timer && v(a.timer);
                                a.timer = 0;
                                var e = a.getScrollTop(),
                                    g =
                                        a.getScrollLeft();
                                (0 > (a.newscrolly - e) * (c - e) || 0 > (a.newscrollx - g) * (b - g)) && a.cancelScroll();
                                a.newscrolly = c;
                                a.newscrollx = b;
                                a.bouncescroll && a.rail.visibility || (0 > a.newscrolly ? a.newscrolly = 0 : a.newscrolly > a.page.maxh && (a.newscrolly = a.page.maxh));
                                a.bouncescroll && a.railh.visibility || (0 > a.newscrollx ? a.newscrollx = 0 : a.newscrollx > a.page.maxw && (a.newscrollx = a.page.maxw));
                                a.dst = {};
                                a.dst.x = b - g;
                                a.dst.y = c - e;
                                a.dst.px = g;
                                a.dst.py = e;
                                var f = Math.round(Math.sqrt(Math.pow(a.dst.x, 2) + Math.pow(a.dst.y, 2)));
                                a.dst.ax = a.dst.x /
                                    f;
                                a.dst.ay = a.dst.y / f;
                                var m = 0,
                                    k = f;
                                0 == a.dst.x ? (m = e, k = c, a.dst.ay = 1, a.dst.py = 0) : 0 == a.dst.y && (m = g, k = b, a.dst.ax = 1, a.dst.px = 0);
                                f = a.getTransitionSpeed(f);
                                d && 1 >= d && (f *= d);
                                a.bzscroll = 0 < f ? a.bzscroll ? a.bzscroll.update(k, f) : new R(m, k, f, 0, 1, 0, 1) : !1;
                                if (!a.timer) {
                                    (e == a.page.maxh && c >= a.page.maxh || g == a.page.maxw && b >= a.page.maxw) && a.checkContentSize();
                                    var l = 1;
                                    a.cancelAnimationFrame = !1;
                                    a.timer = 1;
                                    a.onscrollstart && !a.scrollrunning && a.onscrollstart.call(a, {
                                        type: "scrollstart",
                                        current: {
                                            x: g,
                                            y: e
                                        },
                                        request: {
                                            x: b,
                                            y: c
                                        },
                                        end: {
                                            x: a.newscrollx,
                                            y: a.newscrolly
                                        },
                                        speed: f
                                    });
                                    h();
                                    (e == a.page.maxh && c >= e || g == a.page.maxw && b >= g) && a.checkContentSize();
                                    a.noticeCursor()
                                }
                            }, this.cancelScroll = function() {
                                a.timer && v(a.timer);
                                a.timer = 0;
                                a.bzscroll = !1;
                                a.scrollrunning = !1;
                                return a
                            }) : (this.doScrollLeft = function(b, c) {
                                var d = a.getScrollTop();
                                a.doScrollPos(b, d, c)
                            }, this.doScrollTop = function(b, c) {
                                var d = a.getScrollLeft();
                                a.doScrollPos(d, b, c)
                            }, this.doScrollPos = function(b, c, d) {
                                var h = b > a.page.maxw ? a.page.maxw : b;
                                0 > h && (h = 0);
                                var e = c > a.page.maxh ? a.page.maxh : c;
                                0 > e && (e = 0);
                                a.synched("scroll",
                                    function() {
                                        a.setScrollTop(e);
                                        a.setScrollLeft(h)
                                    })
                            }, this.cancelScroll = function() {});
                            this.doScrollBy = function(b, c) {
                                var d = c ? Math.floor((a.scroll.y - b) * a.scrollratio.y) : (a.timer ? a.newscrolly : a.getScrollTop(!0)) - b;
                                if (a.bouncescroll) {
                                    var h = Math.round(a.view.h / 2);
                                    d < -h ? d = -h : d > a.page.maxh + h && (d = a.page.maxh + h)
                                }
                                a.cursorfreezed = !1;
                                h = a.getScrollTop(!0);
                                if (0 > d && 0 >= h) return a.noticeCursor();
                                if (d > a.page.maxh && h >= a.page.maxh) return a.checkContentSize(), a.noticeCursor();
                                a.doScrollTop(d)
                            };
                            this.doScrollLeftBy = function(b,
                                                           c) {
                                var d = c ? Math.floor((a.scroll.x - b) * a.scrollratio.x) : (a.timer ? a.newscrollx : a.getScrollLeft(!0)) - b;
                                if (a.bouncescroll) {
                                    var h = Math.round(a.view.w / 2);
                                    d < -h ? d = -h : d > a.page.maxw + h && (d = a.page.maxw + h)
                                }
                                a.cursorfreezed = !1;
                                h = a.getScrollLeft(!0);
                                if (0 > d && 0 >= h || d > a.page.maxw && h >= a.page.maxw) return a.noticeCursor();
                                a.doScrollLeft(d)
                            };
                            this.doScrollTo = function(b, c) {
                                a.cursorfreezed = !1;
                                a.doScrollTop(b)
                            };
                            this.checkContentSize = function() {
                                var b = a.getContentSize();
                                b.h == a.page.h && b.w == a.page.w || a.resize(!1, b)
                            };
                            a.onscroll =
                                function(b) {
                                    a.rail.drag || a.cursorfreezed || a.synched("scroll", function() {
                                        a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
                                        a.railh && (a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)));
                                        a.noticeCursor()
                                    })
                                };
                            a.on(a.docscroll, "scroll", a.onscroll);
                            this.doZoomIn = function(c) {
                                if (!a.zoomactive) {
                                    a.zoomactive = !0;
                                    a.zoomrestore = {
                                        style: {}
                                    };
                                    var d = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                                        h = a.win[0].style,
                                        e;
                                    for (e in d) {
                                        var g = d[e];
                                        a.zoomrestore.style[g] =
                                            void 0 !== h[g] ? h[g] : ""
                                    }
                                    a.zoomrestore.style.width = a.win.css("width");
                                    a.zoomrestore.style.height = a.win.css("height");
                                    a.zoomrestore.padding = {
                                        w: a.win.outerWidth() - a.win.width(),
                                        h: a.win.outerHeight() - a.win.height()
                                    };
                                    k.isios4 && (a.zoomrestore.scrollTop = b(window).scrollTop(), b(window).scrollTop(0));
                                    a.win.css({
                                        position: k.isios4 ? "absolute" : "fixed",
                                        top: 0,
                                        left: 0,
                                        zIndex: p + 100,
                                        margin: 0
                                    });
                                    d = a.win.css("backgroundColor");
                                    ("" == d || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(d)) && a.win.css("backgroundColor",
                                        "#fff");
                                    a.rail.css({
                                        zIndex: p + 101
                                    });
                                    a.zoom.css({
                                        zIndex: p + 102
                                    });
                                    a.zoom.css("backgroundPosition", "0px -18px");
                                    a.resizeZoom();
                                    a.onzoomin && a.onzoomin.call(a);
                                    return a.cancelEvent(c)
                                }
                            };
                            this.doZoomOut = function(c) {
                                if (a.zoomactive) return a.zoomactive = !1, a.win.css("margin", ""), a.win.css(a.zoomrestore.style), k.isios4 && b(window).scrollTop(a.zoomrestore.scrollTop), a.rail.css({
                                    "z-index": a.zindex
                                }), a.zoom.css({
                                    "z-index": a.zindex
                                }), a.zoomrestore = !1, a.zoom.css("backgroundPosition", "0px 0px"), a.onResize(), a.onzoomout &&
                                a.onzoomout.call(a), a.cancelEvent(c)
                            };
                            this.doZoom = function(b) {
                                return a.zoomactive ? a.doZoomOut(b) : a.doZoomIn(b)
                            };
                            this.resizeZoom = function() {
                                if (a.zoomactive) {
                                    var c = a.getScrollTop();
                                    a.win.css({
                                        width: b(window).width() - a.zoomrestore.padding.w + "px",
                                        height: b(window).height() - a.zoomrestore.padding.h + "px"
                                    });
                                    a.onResize();
                                    a.setScrollTop(Math.min(a.page.maxh, c))
                                }
                            };
                            this.init();
                            b.nicescroll.push(this)
                        },
                        I = function(b) {
                            var c = this;
                            this.nc = b;
                            this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx =
                                0;
                            this.snapy = this.snapx = !1;
                            this.demuly = this.demulx = 0;
                            this.lastscrolly = this.lastscrollx = -1;
                            this.timer = this.chky = this.chkx = 0;
                            this.time = function() {
                                return +new Date
                            };
                            this.reset = function(b, d) {
                                c.stop();
                                var e = c.time();
                                c.steptime = 0;
                                c.lasttime = e;
                                c.speedx = 0;
                                c.speedy = 0;
                                c.lastx = b;
                                c.lasty = d;
                                c.lastscrollx = -1;
                                c.lastscrolly = -1
                            };
                            this.update = function(b, d) {
                                var e = c.time();
                                c.steptime = e - c.lasttime;
                                c.lasttime = e;
                                e = d - c.lasty;
                                var h = b - c.lastx,
                                    f = c.nc.getScrollTop(),
                                    a = c.nc.getScrollLeft();
                                f += e;
                                a += h;
                                c.snapx = 0 > a || a > c.nc.page.maxw;
                                c.snapy = 0 > f || f > c.nc.page.maxh;
                                c.speedx = h;
                                c.speedy = e;
                                c.lastx = b;
                                c.lasty = d
                            };
                            this.stop = function() {
                                c.nc.unsynched("domomentum2d");
                                c.timer && clearTimeout(c.timer);
                                c.timer = 0;
                                c.lastscrollx = -1;
                                c.lastscrolly = -1
                            };
                            this.doSnapy = function(b, d) {
                                var e = !1;
                                0 > d ? (d = 0, e = !0) : d > c.nc.page.maxh && (d = c.nc.page.maxh, e = !0);
                                0 > b ? (b = 0, e = !0) : b > c.nc.page.maxw && (b = c.nc.page.maxw, e = !0);
                                e ? c.nc.doScrollPos(b, d, c.nc.opt.snapbackspeed) : c.nc.triggerScrollEnd()
                            };
                            this.doMomentum = function(b) {
                                var d = c.time(),
                                    e = b ? d + b : c.lasttime;
                                b = c.nc.getScrollLeft();
                                var h = c.nc.getScrollTop(),
                                    f = c.nc.page.maxh,
                                    a = c.nc.page.maxw;
                                c.speedx = 0 < a ? Math.min(60, c.speedx) : 0;
                                c.speedy = 0 < f ? Math.min(60, c.speedy) : 0;
                                e = e && 60 >= d - e;
                                if (0 > h || h > f || 0 > b || b > a) e = !1;
                                b = c.speedx && e ? c.speedx : !1;
                                if (c.speedy && e && c.speedy || b) {
                                    var l = Math.max(16, c.steptime);
                                    50 < l && (b = l / 50, c.speedx *= b, c.speedy *= b, l = 50);
                                    c.demulxy = 0;
                                    c.lastscrollx = c.nc.getScrollLeft();
                                    c.chkx = c.lastscrollx;
                                    c.lastscrolly = c.nc.getScrollTop();
                                    c.chky = c.lastscrolly;
                                    var n = c.lastscrollx,
                                        k = c.lastscrolly,
                                        K = function() {
                                            var b = 600 < c.time() - d ? .04 : .02;
                                            c.speedx && (n = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = n, 0 > n || n > a) && (b = .1);
                                            c.speedy && (k = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = k, 0 > k || k > f) && (b = .1);
                                            c.demulxy = Math.min(1, c.demulxy + b);
                                            c.nc.synched("domomentum2d", function() {
                                                c.speedx && (c.nc.getScrollLeft(), c.chkx = n, c.nc.setScrollLeft(n));
                                                c.speedy && (c.nc.getScrollTop(), c.chky = k, c.nc.setScrollTop(k));
                                                c.timer || (c.nc.hideCursor(), c.doSnapy(n, k))
                                            });
                                            1 > c.demulxy ? c.timer = setTimeout(K, l) : (c.stop(), c.nc.hideCursor(),
                                                c.doSnapy(n, k))
                                        };
                                    K()
                                } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop())
                            }
                        },
                        C = b.fn.scrollTop;
                    b.cssHooks.pageYOffset = {
                        get: function(c, d, e) {
                            return (d = b.data(c, "__nicescroll") || !1) && d.ishwscroll ? d.getScrollTop() : C.call(c)
                        },
                        set: function(c, d) {
                            var e = b.data(c, "__nicescroll") || !1;
                            e && e.ishwscroll ? e.setScrollTop(parseInt(d)) : C.call(c, d);
                            return this
                        }
                    };
                    b.fn.scrollTop = function(c) {
                        if (void 0 === c) {
                            var d = this[0] ? b.data(this[0], "__nicescroll") || !1 : !1;
                            return d && d.ishwscroll ? d.getScrollTop() : C.call(this)
                        }
                        return this.each(function() {
                            var d =
                                b.data(this, "__nicescroll") || !1;
                            d && d.ishwscroll ? d.setScrollTop(parseInt(c)) : C.call(b(this), c)
                        })
                    };
                    var G = b.fn.scrollLeft;
                    b.cssHooks.pageXOffset = {
                        get: function(c, d, e) {
                            return (d = b.data(c, "__nicescroll") || !1) && d.ishwscroll ? d.getScrollLeft() : G.call(c)
                        },
                        set: function(c, d) {
                            var e = b.data(c, "__nicescroll") || !1;
                            e && e.ishwscroll ? e.setScrollLeft(parseInt(d)) : G.call(c, d);
                            return this
                        }
                    };
                    b.fn.scrollLeft = function(c) {
                        if (void 0 === c) {
                            var d = this[0] ? b.data(this[0], "__nicescroll") || !1 : !1;
                            return d && d.ishwscroll ? d.getScrollLeft() :
                                G.call(this)
                        }
                        return this.each(function() {
                            var d = b.data(this, "__nicescroll") || !1;
                            d && d.ishwscroll ? d.setScrollLeft(parseInt(c)) : G.call(b(this), c)
                        })
                    };
                    var H = function(c) {
                        var d = this;
                        this.length = 0;
                        this.name = "nicescrollarray";
                        this.each = function(c) {
                            b.each(d, c);
                            return d
                        };
                        this.push = function(b) {
                            d[d.length] = b;
                            d.length++
                        };
                        this.eq = function(b) {
                            return d[b]
                        };
                        if (c)
                            for (var e = 0; e < c.length; e++) {
                                var f = b.data(c[e], "__nicescroll") || !1;
                                f && (this[this.length] = f, this.length++)
                            }
                        return this
                    };
                    (function(b, c, d) {
                        for (var e = 0; e < c.length; e++) d(b,
                            c[e])
                    })(H.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(b, c) {
                        b[c] = function() {
                            var b = arguments;
                            return this.each(function() {
                                this[c].apply(this, b)
                            })
                        }
                    });
                    b.fn.getNiceScroll = function(c) {
                        return void 0 === c ? new H(this) : this[c] && b.data(this[c], "__nicescroll") || !1
                    };
                    b.expr[":"].nicescroll = function(c) {
                        return void 0 !== b.data(c, "__nicescroll")
                    };
                    b.fn.niceScroll = function(c, d) {
                        void 0 !== d || "object" != typeof c || "jquery" in c || (d = c, c = !1);
                        d = b.extend({}, d);
                        var e = new H;
                        void 0 === d &&
                        (d = {});
                        c && (d.doc = b(c), d.win = b(this));
                        var f = !("doc" in d);
                        f || "win" in d || (d.win = b(this));
                        this.each(function() {
                            var c = b(this).data("__nicescroll") || !1;
                            c || (d.doc = f ? b(this) : d.doc, c = new E(d, b(this)), b(this).data("__nicescroll", c));
                            e.push(c)
                        });
                        return 1 == e.length ? e[0] : e
                    };
                    window.NiceScroll = {
                        getjQuery: function() {
                            return b
                        }
                    };
                    b.nicescroll || (b.nicescroll = new H, b.nicescroll.options = A)
                });
                "he" == p ? (E = "\x3c!--\n", E += "/* * * * * * * * * * * * * * * * * * * *\n* \u05e0\u05d2\u05d9\u05e9 \u05dc\u05d9 - \u05ea\u05d5\u05e1\u05e3 \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea \u05d1\u05d7\u05d9\u05e0\u05dd\n* \u05e4\u05d5\u05ea\u05d7 \u05e2\u05dc \u05d9\u05d3\u05d9 \u05dc\u05d5\u05e7\u05dc\u05d9\u05d9\u05d6* (c) 2016-2017\n* http://www.nagish.li\n* * * * * * * * * * * * * * * * * * * */\n") :
                    (E = "\x3c!--\n", E += "/* * * * * * * * * * * * * * * * * * * *\n* NagishLi - Free accessibility plugin\n* Developed by Localize* (c) 2016-2017\n* http://www.nagish.li\n* * * * * * * * * * * * * * * * * * * */\n");
                E += "--\x3e";
                d = '<nagishli id="NagishLiTag">';
                d += '<div id="NagishLiBar">';
                d += '<div id="NagishLiBarStrip" tabindex="1">';
                d += '<img id="NagishLiLogo" src="' + phrases.logo + '" alt="' + phrases.logo_alt + '" style="padding-' + phrases.align_left + ": 5px !important; vertical-align: " + ("he" == p ? "middle" : "top") +
                    ' !important;">' + phrases.a11y_title + '&nbsp;&nbsp;<span id="NagishLiToggleMenus" class="expand-all" tabindex="6"><img src="' + icons.toggle_all + '" alt="' + phrases.expand_all + '" /></span>';
                d = "he" == p ? d + ('<span id="NagishLiMove" style="height: 21px !important; width: 21px !important; display: inline-block !important; vertical-align: middle !important; float: ' + phrases.align_left + ' !important;"><span id="NagishLiMoveTL" alt="' + phrases.move_tl + '" title="' + phrases.move_tl + '" style="background-image: url(\'' +
                    icons.TL_pos + '\');" tabindex="3"></span><span id="NagishLiMoveTR" alt="' + phrases.move_tr + '" title="' + phrases.move_tr + '" style="background-image: url(\'' + icons.TR_pos + '\');" tabindex="2"></span><span id="NagishLiMoveBL" alt="' + phrases.move_bl + '" title="' + phrases.move_bl + '" style="background-image: url(\'' + icons.BL_pos + '\');" tabindex="5"></span><span id="NagishLiMoveBR" alt="' + phrases.move_br + '" title="' + phrases.move_br + '" style="background-image: url(\'' + icons.BR_pos + '\');" tabindex="4"></span></span>') :
                    d + ('<span id="NagishLiMove" style="height: 21px !important; width: 21px !important; display: inline-block !important; vertical-align: middle !important; float: ' + phrases.align_left + ' !important;"><span id="NagishLiMoveTR" alt="' + phrases.move_tr + '" title="' + phrases.move_tr + '" style="background-image: url(\'' + icons.TR_pos + '\');" tabindex="3"></span><span id="NagishLiMoveTL" alt="' + phrases.move_tl + '" title="' + phrases.move_tl + '" style="background-image: url(\'' + icons.TL_pos + '\');" tabindex="2"></span><span id="NagishLiMoveBR" alt="' +
                    phrases.move_br + '" title="' + phrases.move_br + '" style="background-image: url(\'' + icons.BR_pos + '\');" tabindex="5"></span><span id="NagishLiMoveBL" alt="' + phrases.move_bl + '" title="' + phrases.move_bl + '" style="background-image: url(\'' + icons.BL_pos + '\');" tabindex="4"></span></span>');
                d += "</div>";
                d += '<ul id="NagishLiMenus"' + U + ">";
                d += '<li class="dropdown">';
                d += '<div class="dropdown-toggle" tabindex="10"><span class="dropdown-title">' + phrases.settings + '</span><span class="dropdown-arrow"></span></div>';
                d += '<ul id="NagishLiInfo" class="dropdown-menu">';
                d += '<li><div id="NagishLiStatement" tabindex="11"><span class="help" data-balloon="' + phrases.a11y_info_exp + '" tabindex="11">&#x2753;&#xfe0e;&nbsp;</span>' + phrases.a11y_info + "</div></li>";
                d += '<li><div id="NagishLiHowAccessible" tabindex="12"><span class="help" data-balloon="' + phrases.how_accessible_exp + '" tabindex="12">&#x2753;&#xfe0e;&nbsp;</span>' + phrases.how_accessible + "</span></div></li>";
                d += '<li class="not-clickable"><div data-balloon-length="large" data-balloon="' +
                    phrases.supported_browsers_exp + '" tabindex="13"><span id="NagishLiSupportedBrowsers">' + phrases.supported_browsers + ':<img src="' + icons.chrome + '" alt="' + phrases.chrome + '" title="' + phrases.chrome + '" /><img src="' + icons.edge + '" alt="' + phrases.edge + '" title="' + phrases.edge + '" /><img src="' + icons.firefox + '" alt="' + phrases.firefox + '" title="' + phrases.firefox + '" /><img src="' + icons.opera + '" alt="' + phrases.opera + '" title="' + phrases.opera + '" /></span></div></li>';
                d += '<li id="NagishLiHelp">';
                d += '<div id="NLToggleHelp" tabindex="14">';
                d += '<span class="tooltip" data-balloon="' + phrases.help_exp + '" data-balloon-pos="' + phrases.align_left + '">' + phrases.help + "</span>";
                d += "</div>";
                d += "</li>";
                D && (d += "<li>", d += '<div id="NLResetSettings" tabindex="15"><span class="help" data-balloon="' + phrases.reset_settings_exp + '" tabindex="15">&#x2753;&#xfe0e;&nbsp;</span>' + phrases.reset_settings + "</div>", d += "</li>");
                "0" != na && ma != oa && (d += '<li id="NagishLiDeveloper" class="not-clickable">', d += "<div>", d += '<a href="http://www.localize.co.il" target="_blank" id="NLDevelopedBy" title="' +
                    phrases.developed_by_exp + '" tabindex="16">' + phrases.developed_by + '<sup style="font-size: 65% !important;">&#x2731;</sup></a>', d += '<a href="' + phrases.developed_in_link + '" target="_blank" id="NLDevelopedIn" data-balloon="' + phrases.developed_in + '" data-balloon-pos="' + phrases.align_right + '" tabindex="16"><img src="' + icons.sod + '" /></a>', d += "</div>", d += "</li>");
                d += "</ul>";
                d += "</li>";
                d += '<li class="dropdown">';
                d += '<div class="dropdown-toggle" tabindex="20"><span class="dropdown-title">' + phrases.text_size +
                    '</span><span id="NLTextVal"></span><span class="dropdown-arrow"></span></div>';
                d += '<ul id="NagishLiText" class="dropdown-menu">';
                d += "<li>";
                d += '<div id="NLBiggerText" tabindex="21"><span class="help" data-balloon="' + phrases.larger_text_exp + '" tabindex="21">&#x2753;&#xfe0e;&nbsp;</span>' + phrases.larger_text + "</div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLSmallerText" tabindex="22"><span class="help" data-balloon="' + phrases.smaller_text_exp + '" tabindex="22">&#x2753;&#xfe0e;&nbsp;</span>' + phrases.smaller_text +
                    "</div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLNormalText" tabindex="23">' + commons.checkmark + phrases.normal + "</div>";
                d += "</li>";
                d += "</ul>";
                d += "</li>";
                d += '<li class="dropdown">';
                d += '<div class="dropdown-toggle" tabindex="30"><span class="dropdown-title">' + phrases.colors + '</span><span class="dropdown-arrow"></span></div>';
                d += '<ul id="NagishLiColors" class="dropdown-menu">';
                d += "<li>";
                d += '<div id="NLGrayscaleColors" tabindex="31"><span class="help" data-balloon="' + phrases.blind_exp + '" tabindex="31">&#x2753;&#xfe0e;&nbsp;</span><span class="option-title">' +
                    phrases.blind + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLInvertColors" tabindex="32"><span class="help" data-balloon="' + phrases.impaired_exp + '" tabindex="32">&#x2753;&#xfe0e;&nbsp;</span><span class="option-title">' + phrases.impaired + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLWarmColors" tabindex="33"><span class="help" data-balloon="' + phrases.bl_filter_exp + '" tabindex="33">&#x2753;&#xfe0e;&nbsp;</span><span class="notice" data-balloon="' + phrases.experimental_feat + '" tabindex="33">&#x26a0;&#xfe0e;&nbsp;</span><span class="option-title">' +
                    phrases.bl_filter + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLColdColors" tabindex="34"><span class="help" data-balloon="' + phrases.lc_filter_exp + '" tabindex="34">&#x2753;&#xfe0e;&nbsp;</span><span class="notice" data-balloon="' + phrases.experimental_feat + '" tabindex="34">&#x26a0;&#xfe0e;&nbsp;</span><span class="option-title">' + phrases.lc_filter + "</span></div>";
                d += "</li>";
                d += '<li class="not-clickable">';
                d += '<div id="NLCustomColors"><span class="help" data-balloon="' + phrases.custom_colors_exp +
                    '" tabindex="35">&#x2753;&#xfe0e;&nbsp;</span><span class="notice" data-balloon="' + phrases.experimental_feat + '" tabindex="35">&#x26a0;&#xfe0e;&nbsp;</span><span class="option-title">' + phrases.custom_colors + "</span>:&nbsp;" + ("none" == b("body").css("background-image") ? '<span id="NLCustomColorsBG" tabindex="35"><span id="NLCurrentBG" style="display: none;"></span>' + phrases.bg + "</span>&nbsp;" : "") + '<span id="NLCustomColorsTXT" tabindex="35"><span id="NLCurrentTXT" style="display: none;"></span>' + phrases.txt +
                    "</span></div>";
                d += "</li>";
                d += '<li class="active">';
                d += '<div id="NLNormalColors" tabindex="35">' + commons.checkmark + '<span class="option-title">' + phrases.normal_plu + "</span></div>";
                d += "</li>";
                d += "</ul>";
                d += "</li>";
                d += '<li class="dropdown">';
                d += '<div class="dropdown-toggle" tabindex="40"><span class="dropdown-title">' + phrases.display + '</span><span class="dropdown-arrow"></span></div>';
                d += '<ul id="NagishLiDisplay" class="dropdown-menu">';
                d += "<li>";
                d += '<div id="NLTextDisplay" tabindex="41"><span class="help" data-balloon="' +
                    phrases.text_only_exp + '" tabindex="41">&#x2753;&#xfe0e;&nbsp;</span><span class="option-title">' + phrases.text_only + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLImagesDisplay" tabindex="42"><span class="help" data-balloon="' + phrases.images_only_exp + '" tabindex="42">&#x2753;&#xfe0e;&nbsp;</span><span class="option-title">' + phrases.images_only + "</span></div>";
                d += "</li>";
                d += '<li class="active">';
                d += '<div id="NLNormalDisplay" tabindex="43">' + commons.checkmark + '<span class="option-title">' + phrases.normal_display +
                    "</span></div>";
                d += "</li>";
                d += "</ul>";
                d += "</li>";
                d += '<li class="dropdown">';
                d += '<div class="dropdown-toggle" tabindex="50"><span class="dropdown-title">' + phrases.highlight + '</span><span class="dropdown-arrow"></span></div>';
                d += '<ul id="NagishLiHighlight" class="dropdown-menu">';
                d += "<li>";
                d += '<div id="NLHighlightLinks" tabindex="51"><span class="help" data-balloon="' + phrases.hl_links_exp + '" tabindex="51">&#x2753;&#xfe0e;&nbsp;</span><span class="option-title">' + phrases.hl_links + "</span></div>";
                d +=
                    "</li>";
                d += "<li>";
                d += '<div id="NLHighlightHeadings" tabindex="52"><span class="help" data-balloon="' + phrases.hl_headings_exp + '" tabindex="52">&#x2753;&#xfe0e;&nbsp;</span><span class="option-title">' + phrases.hl_headings + "</span></div>";
                d += "</li>";
                d += "</ul>";
                d += "</li>";
                d += '<li class="dropdown">';
                d += '<div class="dropdown-toggle" tabindex="60"><span class="dropdown-title">' + phrases.misc + '</span><span class="dropdown-arrow"></span></div>';
                d += '<ul id="NagishLiMisc" class="dropdown-menu">';
                d += '<li class="not-clickable">';
                d += '<div id="NLZoom"><span class="help" data-balloon="' + phrases.zoom_exp + '" tabindex="62">&#x2753;&#xfe0e;&nbsp;</span>' + phrases.zoom + ':&nbsp;<span id="NLZoomVal"></span><span id="NLZoomIn" tabindex="61">&#x2795;&#xfe0e;</span>&nbsp;&nbsp;<span id="NLZoomOut" tabindex="61">&#x2796;&#xfe0e;</span>&nbsp;&nbsp;<span id="NLNormalZoom" tabindex="61">' + phrases.normal + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLFont" tabindex="63"><span class="help" data-balloon="' + phrases.font_exp + '" tabindex="63">&#x2753;&#xfe0e;&nbsp;</span>' +
                    phrases.font + ':&nbsp;<span id="NLFontVal">' + phrases.normal + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLAnimations" tabindex="64"><span class="help" data-balloon="' + phrases.animations_exp + '" tabindex="64">&#x2753;&#xfe0e;&nbsp;</span><span class="notice" data-balloon="' + phrases.experimental_feat + '" tabindex="64">&#x26a0;&#xfe0e;&nbsp;</span>' + phrases.animations + ':&nbsp;<span id="NLAnimationsVal" title="' + phrases.animations_on + '">&#x25ba;&#xfe0e;&nbsp;' + phrases.animations_on + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLR2M" tabindex="65"><span class="help" data-balloon="' + phrases.r2m_exp + '" tabindex="65">&#x2753;&#xfe0e;&nbsp;</span><span class="notice" data-balloon="' + phrases.experimental_feat + '" tabindex="65">&#x26a0;&#xfe0e;&nbsp;</span>' + phrases.r2m + ':&nbsp;<span id="NLR2MVal" title="' + phrases.r2m_off + '">' + phrases.r2m_off + "</span></div>";
                d += "</li>";
                d += '<li class="not-clickable">';
                d += '<div id="NLCursor"><span class="help" data-balloon="' + phrases.cursor_exp + '" tabindex="67">&#x2753;&#xfe0e;&nbsp;</span><span class="notice" data-balloon="' +
                    phrases.experimental_feat + '" tabindex="67">&#x26a0;&#xfe0e;&nbsp;</span>' + phrases.cursor + ':&nbsp;<span id="NLCursorBlack" title="' + phrases.cursor_black + '" tabindex="66">' + phrases.cursor_black + '</span>&nbsp;<span id="NLCursorWhite" title="' + phrases.cursor_white + '" tabindex="66">' + phrases.cursor_white + "</span></div>";
                d += "</li>";
                d += "<li>";
                d += '<div id="NLKBNav" tabindex="68"><span class="help" data-balloon="' + phrases.kbnav_exp + '" tabindex="68">&#x2753;&#xfe0e;&nbsp;</span><span class="notice" data-balloon="' +
                    phrases.experimental_feat + '" tabindex="68">&#x26a0;&#xfe0e;&nbsp;</span>' + phrases.kbnav + ':&nbsp;<span id="NLKBNavVal" title="' + phrases.kbnav_off + '">' + phrases.kbnav_off + "</span></div>";
                d += "</li>";
                d += "</ul>";
                d += "</li>";
                d += "</ul>";
                d += "</div>";
                d += "</nagishli>";
                f = '<style type="text/css" id="NagishLiStyle">';
                f += "* nagishli#NagishLiTag * { font-family: Arial, Helvetica, sans-serif !important; font-size: 18px !important; line-height: 1.15 !important; -ms-text-size-adjust: 100% !important; -webkit-text-size-adjust: 100% !important; box-sizing: border-box !important; z-index: 9999998 !important; -webkit-user-select: none !important; -khtml-user-select: none !important; -o-user-select: none !important; -moz-user-select: none !important; user-select: none !important; backface-visibility: hidden !important; color: inherit !important; vertical-align: baseline !important; font-weight: bold !important; outline: none !important; }";
                f += "* nagishli#NagishLiTag a { color: inherit !important; text-decoration: none !important; cursor: pointer !important; }";
                f += "* nagishli#NagishLiTag a:hover, * nagishli#NagishLiTag a:active { outline-width: 0 !important; }";
                f += "* nagishli#NagishLiTag sub, * nagishli#NagishLiTag sup { font-size: 75% !important; line-height: 0 !important; position: relative !important; vertical-align: baseline !important; }";
                f += "* nagishli#NagishLiTag sub { bottom: -0.25em !important; }";
                f += "* nagishli#NagishLiTag sup { top: -0.5em !important; }";
                f += "* nagishli#NagishLiTag #NagishLiOverlayContent > .NagishLiStatementText > ul { display: block !important; list-style-type: disc !important; margin: 1em 0 !important; padding-" + phrases.align_right + ": 40px !important; }";
                f += "* nagishli#NagishLiTag li { margin: 0 !important; }";
                f += "nagishli#NagishLiTag, nagishli#NagishLiTag:before, nagishli#NagishLiTag:after { box-sizing: border-box !important; }";
                f += commons.menus + " { list-style: none !important; display: none; padding: 0 !important; margin: 0 !important; width: 100% !important; min-width: 345px !important; max-height: " +
                    (b(window).height() - 41) + "px; overflow-x: hidden !important; }";
                f += commons.bar + " { position: fixed !important; direction: " + phrases.dir + "; text-align: " + phrases.align_right + " !important; " + positions[M.toUpperCase()] + " }";
                f += commons.dropdown + " > .dropdown-toggle { cursor: pointer !important; position: relative !important; display: block !important; color: white !important; text-shadow: 0 0 1px #000 !important; padding: 15px !important; }";
                f += commons.bar + " > #NagishLiBarStrip { display: inline-block; color: white !important; cursor: pointer !important; background: #000000 !important; box-shadow: -1px -1px 0 #404040 inset, -1px -1px 0 #404040 !important; text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3) !important; padding: 10px !important; }";
                f += commons.bar + " > #NagishLiBarStrip.open { display: block; }";
                f += commons.menus + " > .dropdown > .dropdown-menu > li > div { border-right: 2px solid !important; border-left: 2px solid !important; }";
                f += commons.menus + " > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-bottom: 2px solid !important; }";
                f += commons.dropdown + ' > .dropdown-toggle > .selected:before {content: ": " !important; }';
                f += commons.dropdown + " > .dropdown-menu { display: none; list-style: none !important; padding: 0 !important; margin: 0 !important; position: relative !important; float: none !important; border: 0 !important; border-radius: 0 !important; }";
                f += commons.dropdown + " > .dropdown-menu > li { position: relative !important; }";
                f += commons.dropdown + " > .dropdown-menu > li > div { display: block !important; color: #6f6f6f !important; background: #EEE !important; box-shadow: 0 1px 0 white inset, 0 -1px 0 #d5d5d5 inset !important; text-shadow: 0 -1px 0 rgba(255, 255, 255, 0.3) !important; padding: 15px !important; cursor: pointer !important; }";
                f += commons.dropdown + " > .dropdown-menu > li > div:hover { background: #f6f6f6 !important; }";
                f += commons.dropdown +
                    " > .dropdown-menu > li.not-clickable > div { cursor: default !important; }";
                f += commons.dropdown + " > .dropdown-menu > li.not-clickable > div:hover { background: #EEE !important; }";
                f += commons.dropdown + " > .dropdown-menu.show { display: block !important; }";
                f += commons.bar + " > #NagishLiBarStrip > .expand-all, " + commons.bar + " > #NagishLiBarStrip > .collapse-all, " + commons.dropdown + " > .dropdown-toggle > .dropdown-arrow { display: none; position: absolute !important; }";
                f += commons.bar + " > #NagishLiBarStrip.open > .expand-all, " +
                    commons.bar + " > #NagishLiBarStrip.open > .collapse-all { display: inline-block !important; }";
                f += commons.bar + " > #NagishLiBarStrip > .collapse-all, " + commons.dropdown + " > .dropdown-toggle.open > .dropdown-arrow { top: 13px !important; " + phrases.align_left + ': 15px !important; -moz-transform: scaleY(-1) !important; -o-transform: scaleY(-1) !important; -webkit-transform: scaleY(-1); transform: scaleY(-1) !important; filter: FlipV !important; -ms-filter: "FlipV" !important; }';
                f += commons.bar + " > #NagishLiBarStrip > .collapse-all { top: 8px !important; " +
                    phrases.align_left + ": 15px !important; }";
                f += commons.bar + " > #NagishLiBarStrip > .expand-all { top: 12px !important; " + phrases.align_left + ": 15px !important; }";
                f += commons.dropdown + " > .dropdown-menu > li > div > .help, " + commons.dropdown + " > .dropdown-menu > li > div > .notice { display: none; cursor: help !important; }";
                f += commons.dropdown + " > .dropdown-toggle > .dropdown-arrow { display: inline-block !important; top: 18px !important; " + phrases.align_left + ": 15px !important; }";
                f += commons.menus +
                    " > .dropdown > .dropdown-menu > li > div, " + commons.menus + " > .dropdown:last-child > .dropdown-menu > li:last-child > div, " + commons.menus + ".blue > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".blue > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #5478E4 !important; }";
                f += commons.dropdown + " > .dropdown-toggle, " + commons.menus + ".blue > .dropdown > .dropdown-toggle { background: #4169E1 !important; box-shadow: 0 1px 0 #5478E4 inset, 0 -1px 0 #3A5ECA inset !important; }";
                f += commons.dropdown + " > .dropdown-toggle:hover, " + commons.menus + ".blue > .dropdown > .dropdown-toggle:hover { background: #5478E4 !important; }";
                f += commons.menus + ".red > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".red > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #EB2B36 !important; }";
                f += commons.menus + ".red > .dropdown > .dropdown-toggle { background: #E50000 !important; box-shadow: 0 1px 0 #E71919 inset, 0 -1px 0 #CE0000 inset !important; }";
                f += commons.menus +
                    ".red > .dropdown > .dropdown-toggle:hover { background: #EB2B36 !important; }";
                f += commons.menus + ".green > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".green > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #365E1B !important; }";
                f += commons.menus + ".green > .dropdown > .dropdown-toggle { background: #204D02 !important; box-shadow: 0 1px 0 #365E1B inset, 0 -1px 0 #1C4501 inset !important; }";
                f += commons.menus + ".green > .dropdown > .dropdown-toggle:hover { background: #365E1B !important; }";
                f += commons.menus + ".purple > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".purple > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #8562B1 !important; }";
                f += commons.menus + ".purple > .dropdown > .dropdown-toggle { background: #7851A9 !important; box-shadow: 0 1px 0 #8562B1 inset, 0 -1px 0 #6C4898 inset !important; }";
                f += commons.menus + ".purple > .dropdown > .dropdown-toggle:hover { background: #8562B1 !important; }";
                f += commons.menus + ".yellow > .dropdown > .dropdown-menu > li > div, " +
                    commons.menus + ".yellow > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #EDCA19 !important; }";
                f += commons.menus + ".yellow > .dropdown > .dropdown-toggle { background: #E5C100 !important; box-shadow: 0 1px 0 #EDCA19 inset, 0 -1px 0 #D5B516 inset !important; }";
                f += commons.menus + ".yellow > .dropdown > .dropdown-toggle:hover { background: #EDCA19 !important; }";
                f += commons.menus + ".pink > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".pink > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #FF69B4 !important; }";
                f += commons.menus + ".pink > .dropdown > .dropdown-toggle { background: #FF69B4 !important; box-shadow: 0 1px 0 #FF78BB inset, 0 -1px 0 #E55EA2 inset !important; }";
                f += commons.menus + ".pink > .dropdown > .dropdown-toggle:hover { background: #FF78BB !important; }";
                f += commons.menus + ".gray > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".gray > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #778899 !important; }";
                f += commons.menus + ".gray > .dropdown > .dropdown-toggle { background: #778899 !important; box-shadow: 0 1px 0 #8493A3 inset, 0 -1px 0 #6B7A89 inset !important; }";
                f += commons.menus + ".gray > .dropdown > .dropdown-toggle:hover { background: #8493A3 !important; }";
                f += commons.menus + ".brown > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".brown > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #A0522D !important; }";
                f += commons.menus + ".brown > .dropdown > .dropdown-toggle { background: #A0522D !important; box-shadow: 0 1px 0 #A96342 inset, 0 -1px 0 #904928 inset !important; }";
                f += commons.menus + ".brown > .dropdown > .dropdown-toggle:hover { background: #A96342 !important; }";
                f += commons.menus + ".orange > .dropdown > .dropdown-menu > li > div, " + commons.menus + ".orange > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #FF8C00 !important; }";
                f += commons.menus + ".orange > .dropdown > .dropdown-toggle { background: #FF8C00 !important; box-shadow: 0 1px 0 #FF9719 inset, 0 -1px 0 #E57E00 inset !important; }";
                f += commons.menus + ".orange > .dropdown > .dropdown-toggle:hover { background: #FF9719 !important; }";
                f += commons.menus + ".turquoise > .dropdown > .dropdown-menu > li > div, " +
                    commons.menus + ".turquoise > .dropdown:last-child > .dropdown-menu > li:last-child > div { border-color: #20B2AA !important; }";
                f += commons.menus + ".turquoise > .dropdown > .dropdown-toggle { background: #20B2AA !important; box-shadow: 0 1px 0 #36B9B2 inset, 0 -1px 0 #1CA099 inset !important; }";
                f += commons.menus + ".turquoise > .dropdown > .dropdown-toggle:hover { background: #36B9B2 !important; }";
                f += commons.dropdown + " > .dropdown-menu > li > div > #NagishLiSupportedBrowsers > img { vertical-align: middle !important; margin: 0 2px !important; }";
                f += commons.dropdown + " > .dropdown-menu > li > div > #NagishLiSupportedBrowsers > img:first-child { margin-" + phrases.align_right + ": 4px !important; }";
                f += commons.dropdown + " > .dropdown-menu > li > div > #NagishLiSupportedBrowsers > img:last-child { margin-" + phrases.align_right + ": 4px !important; }";
                f += commons.dropdown + " > .dropdown-menu > li > div > #NLDevelopedIn { display: inline-block !important; position: absolute !important; " + phrases.align_left + ": 10px !important; top: 12px !important; }";
                f +=
                    commons.bar + " > #NagishLiBarStrip.open > #NagishLiMove { margin-" + phrases.align_left + ": 30px !important; }";
                f += "button[data-balloon]{overflow:visible}[data-balloon]{position:relative}[data-balloon]:after,[data-balloon]:before{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";filter:alpha(opacity=0);-khtml-opacity:0;-moz-opacity:0;opacity:0;pointer-events:none;-webkit-transition:all .18s ease-out .18s;transition:all .18s ease-out .18s;bottom:100%;left:50%;position:absolute;z-index:10;-webkit-transform:translate(-50%,10px);-ms-transform:translate(-50%,10px);transform:translate(-50%,10px);-webkit-transform-origin:top;-ms-transform-origin:top;transform-origin:top}[data-balloon]:after{background:rgba(17,17,17,.9);border-radius:4px;color:#fff;content:attr(data-balloon);font-size:12px;padding:.5em 1em;white-space:nowrap;margin-bottom:11px}[data-balloon]:before{background:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E') no-repeat;background-size:100% auto;height:6px;width:18px;content:\"\";margin-bottom:5px}[data-balloon]:hover:after,[data-balloon]:hover:before,[data-balloon][data-balloon-visible]:after,[data-balloon][data-balloon-visible]:before{-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";filter:alpha(opacity=100);-khtml-opacity:1;-moz-opacity:1;opacity:1;pointer-events:auto;-webkit-transform:translate(-50%,0);-ms-transform:translate(-50%,0);transform:translate(-50%,0)}[data-balloon].font-awesome:after{font-family:FontAwesome}[data-balloon][data-balloon-break]:after{white-space:pre}[data-balloon-pos=down]:after,[data-balloon-pos=down]:before{bottom:auto;left:50%;top:100%;-webkit-transform:translate(-50%,-10px);-ms-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}[data-balloon-pos=down]:after{margin-top:11px}[data-balloon-pos=down]:before{background:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E') no-repeat;background-size:100% auto;height:6px;width:18px;margin-top:5px;margin-bottom:0}[data-balloon-pos=down]:hover:after,[data-balloon-pos=down]:hover:before,[data-balloon-pos=down][data-balloon-visible]:after,[data-balloon-pos=down][data-balloon-visible]:before{-webkit-transform:translate(-50%,0);-ms-transform:translate(-50%,0);transform:translate(-50%,0)}[data-balloon-pos=left]:after,[data-balloon-pos=left]:before{bottom:auto;left:auto;right:100%;top:50%;-webkit-transform:translate(10px,-50%);-ms-transform:translate(10px,-50%);transform:translate(10px,-50%)}[data-balloon-pos=left]:after{margin-right:11px}[data-balloon-pos=left]:before{background:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E') no-repeat;background-size:100% auto;height:18px;width:6px;margin-right:5px;margin-bottom:0}[data-balloon-pos=left]:hover:after,[data-balloon-pos=left]:hover:before,[data-balloon-pos=left][data-balloon-visible]:after,[data-balloon-pos=left][data-balloon-visible]:before{-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%)}[data-balloon-pos=right]:after,[data-balloon-pos=right]:before{bottom:auto;left:100%;top:50%;-webkit-transform:translate(-10px,-50%);-ms-transform:translate(-10px,-50%);transform:translate(-10px,-50%)}[data-balloon-pos=right]:after{margin-left:11px}[data-balloon-pos=right]:before{background:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E') no-repeat;background-size:100% auto;height:18px;width:6px;margin-bottom:0;margin-left:5px}[data-balloon-pos=right]:hover:after,[data-balloon-pos=right]:hover:before,[data-balloon-pos=right][data-balloon-visible]:after,[data-balloon-pos=right][data-balloon-visible]:before{-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%)}[data-balloon-length]:after{white-space:normal}[data-balloon-length=small]:after{width:80px}[data-balloon-length=medium]:after{width:150px}[data-balloon-length=large]:after{width:260px}[data-balloon-length=xlarge]:after{width:90vw}@media screen and (min-width:768px){[data-balloon-length=xlarge]:after{width:380px}}[data-balloon-length=fit]:after{width:100%}";
                f += "nagishli#NagishLiTag > .NagishLiOverlay { position: fixed !important; top: 0 !important; " + phrases.align_left + ": 0 !important; width: 100% !important; height: 100% !important; background: rgba(0, 0, 0, 0.7) repeat !important; text-align: center !important; z-index: 9999999 !important; opacity: 1; }";
                f += "nagishli#NagishLiTag > .NagishLiOverlay #closeBtn { position: absolute !important; " + phrases.align_left + ": 1% !important; top: 2% !important; font-size: 120% !important; cursor: pointer !important; }";
                f += ".animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated.bounceIn,.animated.bounceOut{-webkit-animation-duration:.75s;animation-duration:.75s}@-webkit-keyframes bounceIn{20%,40%,60%,80%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes bounceIn{20%,40%,60%,80%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}.bounceIn{-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}@keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}.bounceOut{-webkit-animation-name:bounceOut;animation-name:bounceOut}";
                f += commons.dropdown + " > #NagishLiMisc > li > #NLZoom > span:not(#NLZoomVal), #NagishLiMisc > li > #NLCursor > span, " + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG, " + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT { cursor: pointer !important; }";
                f += 'html[nl-cursor="white"] * { cursor: url(' + icons.white_cursor + "), auto !important; }";
                f += 'html[nl-cursor="black"] * { cursor: url(' + icons.black_cursor + "), auto !important; }";
                f += "" + commons.dropdown +
                    " > #NagishLiColors > li > #NLCustomColors > ul > li { display: inline-block !important; vertical-align: middle !important; width: 20px !important; height: 20px !important; cursor: pointer !important; margin: 5px !important; border: 1px solid black !important; }";
                f += "" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > ul > li:hover, " + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > ul > li.selected { border-color: white !important; }";
                f += "" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG, " +
                    commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT { width: 16px !important; height: 16px !important; vertical-align: middle !important; border: 1px solid black !important; margin-" + phrases.align_left + ": 5px !important; background-color: transparent; }";
                f += "</style>";
                b("body").append(E, f, d);
                b("video, audio").attr("nl-role", "media");
                b("iframe[src*='youtube.com']").attr("nl-role", "ytmedia");
                b("img").each(function() {
                    if (!b(this).attr("alt")) {
                        var c = b(this).attr("title") ?
                            phrases.img_alt + b(this).attr("title") : phrases.img_alt_missing;
                        b(this).attr("alt", c)
                    }
                });
                b("" + commons.dropdown + " > #NagishLiColors > li > #NLGrayscaleColors").click(function() {
                    I()
                });
                b("" + commons.dropdown + " > #NagishLiColors > li > #NLInvertColors").click(function() {
                    V()
                });
                b("" + commons.dropdown + " > #NagishLiColors > li > #NLWarmColors").click(function() {
                    C("warm")
                });
                b("" + commons.dropdown + " > #NagishLiColors > li > #NLColdColors").click(function() {
                    C("cold")
                });
                b("" + commons.dropdown + " > #NagishLiColors > li > #NLNormalColors").click(function() {
                    x()
                });
                b("" + commons.dropdown + " > #NagishLiText > li > #NLBiggerText").click(function() {
                    w()
                });
                b("" + commons.dropdown + " > #NagishLiText > li > #NLSmallerText").click(function() {
                    q()
                });
                b("" + commons.dropdown + " > #NagishLiText > li > #NLNormalText").click(function() {
                    v()
                });
                b("" + commons.dropdown + " > #NagishLiDisplay > li > #NLTextDisplay").click(function() {
                    X()
                });
                b("" + commons.dropdown + " > #NagishLiDisplay > li > #NLImagesDisplay").click(function() {
                    A()
                });
                b("" + commons.dropdown + " > #NagishLiDisplay > li > #NLNormalDisplay").click(function() {
                    Y()
                });
                b("" + commons.dropdown + " > #NagishLiHighlight > li > #NLHighlightLinks").click(function() {
                    Z()
                });
                b("" + commons.dropdown + " > #NagishLiHighlight > li > #NLHighlightHeadings").click(function() {
                    aa()
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLZoom > #NLZoomIn").click(function() {
                    ba()
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLZoom > #NLZoomOut").click(function() {
                    ca()
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLZoom > #NLNormalZoom").click(function() {
                    da()
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLFont").click(function() {
                    ea()
                });
                b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > #NagishLiMoveTL").click(function() {
                    B("TL")
                });
                b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > #NagishLiMoveBR").click(function() {
                    B("BR")
                });
                b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > #NagishLiMoveBL").click(function() {
                    B("BL")
                });
                b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > #NagishLiMoveTR").click(function() {
                    B("TR")
                });
                D && b("" + commons.dropdown + " > #NagishLiInfo > li > #NLResetSettings").click(function() {
                    var c = confirm(phrases.reset_prompt);
                    if (1 == c) return l("NagishLi", "delete", "all"), b(commons.bar).css({
                        "max-height": "",
                        "overflow-y": ""
                    }), b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove").remove(), b("" + commons.bar + " > #NagishLiBarStrip").addClass("open"), b(commons.menus).show(), b(commons.menus).html('<li class="dropdown"><ul class="dropdown-menu show"><li class="not-clickable"><div href="#">' + phrases.settings_reset_html_ok + "</div></li></ul></li>"), alert(phrases.settings_reset_alert_ok), !1;
                    0 == c && alert(phrases.settings_save)
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLAnimations").click(function() {
                    fa()
                });
                b("" + commons.dropdown + " > #NagishLiInfo > #NagishLiHelp").click(function() {
                    ja()
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLR2M").click(function() {
                    ha()
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLCursor > #NLCursorBlack").click(function() {
                    H("black")
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLCursor > #NLCursorWhite").click(function() {
                    H("white")
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLKBNav").click(function() {
                    ka()
                });
                D ? function(c) {
                    c = void 0 === c ? "NagishLi" : c;
                    var d = l(c, "read", "ok", ""),
                        f = l(c, "read", "position");
                    var n = l(c, "read", "text");
                    var u = l(c, "read", "colors"),
                        t = l(c, "read", "display"),
                        P = l(c, "read", "zoom"),
                        D = l(c, "read", "font"),
                        E = l(c, "read", "highlight", 1),
                        L = l(c, "read", "highlight", 2),
                        M = l(c, "read", "help"),
                        O = l(c, "read", "animations"),
                        N = l(c, "read", "cursor"),
                        S = l(c, "read", "tabbing"),
                        U = l(c, "read", "r2m");
                    if ("0" == d && "0" != n && (8 >= parseInt(n) || 35 <=
                            parseInt(n)) || "0.0" != P && (.5 >= parseFloat(P) || 2.5 <= parseFloat(P)) || -1 !== u.indexOf(",") && u.split(",")[0] == u.split(",")[1]) {
                        d = confirm(phrases.settings_prompt);
                        if (1 == d) return l("NagishLi", "delete", "all"), b(commons.bar).css({
                            "max-height": "",
                            "overflow-y": ""
                        }), b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus, " + commons.bar + " > #NagishLiBarStrip > #NagishLiMove").remove(), b("" + commons.bar + " > #NagishLiBarStrip").addClass("open"), b(commons.menus).show(), b(commons.menus).html('<li class="dropdown"><ul class="dropdown-menu show"><li class="not-clickable"><div href="#">' +
                            phrases.settings_reset_html_ok + "</div></li></ul></li>"), alert(phrases.settings_reset_alert_ok), !1;
                        0 == d && (l(c, "write", "ok", 1, "1"), alert(phrases.settings_save))
                    }
                    "open" == l(c, "read", "menu") ? b("#NagishLiBarStrip").addClass("open").next("#NagishLiMenus").show() : b("#NagishLiMenus").hide();
                    "TR" == f ? B("TR", !0) : "BR" == f ? B("BR", !0) : "BL" == f ? B("BL", !0) : B("TL", !0);
                    c = l(c, "read", "submenus");
                    f = void 0;
                    c = void 0 === c ? "000000" : c;
                    f = void 0 === f ? "1" : f;
                    for (d = c.length; d--;) c[d] == f && b("" + commons.dropdown + " > .dropdown-toggle:eq(" + [d] + ")").addClass("open").next("ul.dropdown-menu").slideDown("fast").addClass("show");
                    ia();
                    0 == parseInt(n) ? v() : 0 < parseInt(n) ? w(!0) : q(!0);
                    "grayscale" == u ? I(!0) : "invert" == u ? V(!0) : "warm" == u ? C("warm", !0) : "cold" == u ? C("cold", !0) : -1 !== u.indexOf(",") ? ("-" != u.split(",")[0] && G("bg", W(u.split(",")[0]), !0), "-" != u.split(",")[1] && G("txt", W(u.split(",")[1]), !0)) : x();
                    "textonly" == t ? X(!0) : "imagesonly" == t ? A(!0) : Y();
                    0 < parseFloat(P) ? ba(!0) : 0 > parseFloat(P) ? ca(!0) : da();
                    "readable" == D && ea("readable", !0);
                    "1" == E && Z(!0);
                    "1" ==
                    L && aa(!0);
                    !b("ul#NagishLiHighlight").prev(".dropdown-toggle", "div").hasClass("open") && b("ul#NagishLiHighlight > li.active").length && (1 < b("ul#NagishLiHighlight > li.active").find("span.sign").length ? (n = b("ul#NagishLiHighlight").children("li.active:first-child").find(".option-title").text() + " " + b("ul#NagishLiHighlight").children("li.active:nth-child(2)").find(".option-title").text(), n = n.split(" "), n[1] = "en" == p ? n[1].charAt(0).toUpperCase() + n[1].substr(1) : n[1], b('<span class="selected">' + n[1] + "&nbsp;" +
                        phrases.and + n[3] + "</span>").insertAfter(b("ul#NagishLiHighlight").prev(".dropdown-toggle", "div").children(".dropdown-title"))) : (n = b("ul#NagishLiHighlight > li.active").find(".option-title").text(), b('<span class="selected">' + n + "</span>").insertAfter(b("ul#NagishLiHighlight").prev(".dropdown-toggle", "div").children(".dropdown-title"))));
                    "1" == M && ja(!0);
                    "off" == O && fa(!0);
                    "on" == U && ha(!0);
                    "black" == N ? H("black", !0) : "white" == N && H("white", !0);
                    "on" == S && ka(!0)
                }() : b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiMove > #NagishLiMove" +
                    M).css("visibility", "hidden");
                b("body").on("mousedown", function(c) {
                    !b(commons.menus).is(":visible") || b(c.target).parents("#NagishLiBar, .NagishLiOverlay, a, span[nl-r2m-data]").length || b(c.target).is(".NagishLiOverlay, a") || b(this).children("a").length || (b(commons.menus).slideUp(150, function() {
                        b("" + commons.bar + " > #NagishLiBarStrip").removeClass("open")
                    }), l("NagishLi", "write", "menu", "", "closed"))
                });
                b("" + commons.bar + " > #NagishLiBarStrip").on("click keypress", function(c) {
                    1 !== c.which && 13 !== c.which ||
                    b(c.target).parent("span").is("#NagishLiMove, #NagishLiToggleMenus") || (b(commons.menus).is(":visible") ? (b(commons.menus).slideUp(150, function() {
                        b("" + commons.bar + " > #NagishLiBarStrip").removeClass("open")
                    }), c = "closed") : (b(this).addClass("open").next("#NagishLiMenus").slideDown(150), c = "open"), l("NagishLi", "write", "menu", "", c))
                });
                b("" + commons.dropdown + " > .dropdown-toggle").click(function(c, d) {
                    b(this).toggleClass("open").next("ul.dropdown-menu").slideToggle("fast").toggleClass("show");
                    c = b(this).hasClass("open") ?
                        "1" : "0";
                    d = b("" + commons.dropdown + " > .dropdown-toggle").index(this) + 1;
                    l("NagishLi", "write", "submenus", d, c);
                    ia()
                });
                b("" + commons.bar + " > #NagishLiBarStrip > #NagishLiToggleMenus").on("click keypress", function(c) {
                    !b(c.target).parent("span#NagishLiToggleMenus") || 1 !== c.which && 13 !== c.which || (b(this).hasClass("expand-all") ? (b(this).attr("class", "collapse-all").children("img").attr("alt", phrases.collapse_all), b("" + commons.dropdown + " > .dropdown-toggle").addClass("open").children("span.selected").remove(),
                        b("" + commons.dropdown + " > .dropdown-menu").slideDown("fast").addClass("show"), c = "111111") : (b(this).attr("class", "expand-all").children("img").attr("alt", phrases.expand_all), b("" + commons.dropdown + " > .dropdown-toggle.open").removeClass("open"), b("" + commons.dropdown + " > .dropdown-menu.show").slideUp("fast").removeClass("show"), c = "000000", b("" + commons.dropdown + " > .dropdown-toggle").each(function(c) {
                        b(this).next("#NagishLiColors, #NagishLiDisplay", "ul").children("li.active:not(':last-child')").length ?
                            !b(this).children("span.selected").length && b(this).next("ul").children("li.active").length && (c = b(this).next("ul").children("li.active").find(".option-title").text(), b('<span class="selected">' + c + "</span>").insertAfter(b(this).children(".dropdown-title"))) : b(this).next("#NagishLiHighlight", "ul").length && (!b(this).children("span.selected").length && 1 < b(this).next("ul").children("li.active").find("span.sign").length ? (c = b(this).next("ul").children("li.active:first-child").find(".option-title").text() +
                            " " + b(this).next("ul").children("li.active:nth-child(2)").find(".option-title").text(), c = c.split(" "), c[1] = "en" == p ? c[1].charAt(0).toUpperCase() + c[1].substr(1) : c[1], b('<span class="selected">' + c[1] + "&nbsp;" + phrases.and + c[3] + "</span>").insertAfter(b(this).children(".dropdown-title"))) : !b(this).children("span.selected").length && b(this).next("ul").find("span.sign").length ? (c = b(this).next("ul").children("li.active").find(".option-title").text(), b('<span class="selected">' + c + "</span>").insertAfter(b(this).children(".dropdown-title"))) :
                            b(this).children("span.selected").remove())
                    })), l(name, "write", "submenus", "all", c))
                });
                b("" + commons.dropdown + " > #NagishLiInfo > li > #NagishLiStatement, " + commons.dropdown + " > #NagishLiInfo > li > #NagishLiHowAccessible").click(function(c) {
                    "0" != t && checkLic();
                    if ("NagishLiStatement" == c.target.id && a11y_link) return window.location.replace(a11y_link), !1;
                    b("body[nl-kbnav]").length && b(this).blur();
                    b("html")[0].style.setProperty("overflow", "hidden", "important");
                    b("body")[0].style.setProperty("overflow", "hidden",
                        "important");
                    b(document).on("keydown.nlkbnav mousedown.nlkbnav", function(c) {
                        if (27 === c.which || b(c.target).hasClass("NagishLiOverlay") || "closeBtn" == c.target.id && 9 !== c.which) b("#DeveloperMsg").length ? b(".NagishLiOverlay").fadeOut("fast", function() {
                            b(this).remove();
                            b("body[nl-kbnav]").length && b("" + commons.dropdown + " > #NagishLiInfo > li > #NagishLiHowAccessible").focus()
                        }) : b(".NagishLiOverlay").fadeOut("fast", function() {
                            b(this).remove();
                            b("body[nl-kbnav]").length && b("" + commons.dropdown + " > #NagishLiInfo > li > #NagishLiStatement").focus()
                        }),
                            b("html")[0].style.setProperty("overflow", "", ""), b("body")[0].style.setProperty("overflow", "", ""), b(document).off("keydown.nlkbnav mousedown.nlkbnav")
                    });
                    var d = b("" + commons.menus + " > .dropdown:last-child > .dropdown-menu > li:last-child > div").css("border-bottom-color");
                    "NagishLiHowAccessible" == c.target.id ? (c = '<div class="NagishLiAboutText" style="text-align: ' + phrases.align_right + ' !important; width: 80% !important; margin: 0 auto !important;"><a role="button" id="closeBtn" tabindex="1">&#x274c;&#xfe0e;</a><span class="nlap-title">' +
                        phrases.about + "</span>", c = "0" != t ? c + phrases.about_text_lic : c + ('<span id="DeveloperMsg" style="border: 1px solid ' + d + " !important; border-" + phrases.align_right + "-width: 10px !important; border-radius: 10px !important; display: block !important; padding: 2% !important; text-align: " + phrases.align_right + ' !important; font-size: 90% !important; background: #EEE !important; font-weight: bold !important; color: #6f6f6f !important; margin-bottom: 2% !important;"><a href="http://fb.me/ZannyBoy" target="_blank" tabindex="1"><img src="//graph.facebook.com/1452532180/picture?type=normal&amp;width=87&amp;height=87" onerror="this.parentNode.style.display=\'none\';" style="border-radius: 50% !important; margin-top: 1% !important; margin-' +
                        phrases.align_left + ": 2% !important; float: " + phrases.align_right + ' !important;" /></a>' + phrases.developer_message + "</span>" + phrases.about_text), c += '<br /><br /></div><style type="text/css">#NagishLiOverlayContent > .NagishLiAboutText > .nlap-title { font-size: 150% !important; color: ' + d + " !important; display: block !important; margin: 2% 0 !important; font-weight: bold !important; text-align: center !important; } #NagishLiOverlayContent > .NagishLiAboutText > a { color: " + d + " !important; text-decoration: none !important; } #NagishLiOverlayContent > .NagishLiAboutText > .nlap-stitle { font-weight: bold !important; font-size: 110% !important; text-decoration: underline !important; }</style>") :
                        (c = location.hostname ? (location.hostname.startsWith("www.") ? location.hostname.substr(location.hostname.indexOf(".") + 1, location.hostname.length) : location.hostname).toUpperCase() + "&nbsp;-&nbsp;" : "", c = '<div class="NagishLiStatementText" style="text-align: ' + phrases.align_right + ' !important; width: 80% !important; margin: 0 auto !important;"><a href="javascript:void(0);" role="button" id="closeBtn" tabindex="1">&#x274c;&#xfe0e;</a><span class="nlas-title">' + c + phrases.a11y_info + "</span>" + phrases.accessibility_statement +
                            '</div><style type="text/css">#NagishLiOverlayContent > .NagishLiStatementText > .nlas-title { font-size: 150% !important; color: ' + d + " !important; display: block !important; margin: 2% 0 !important; font-weight: bold !important; text-align: center !important; } #NagishLiOverlayContent > .NagishLiStatementText > a { color: " + d + " !important; text-decoration: none !important; } #NagishLiOverlayContent > .NagishLiStatementText > .nlas-stitle { font-weight: bold !important; font-size: 110% !important; text-decoration: underline !important; }</style>");
                    b('<div class="NagishLiOverlay"><div id="NagishLiOverlayContent" style="color: black !important; background-color: white !important; width: 50% !important; margin: auto !important; top: 25% !important; height: 50% !important; position: relative !important; border: 10px solid !important; border-color: ' + d + " !important; border-radius: 25px !important; overflow-x: hidden !important; direction: " + phrases.dir + ' !important; cursor: context-menu !important;">' + c + "</div></div>").fadeIn("fast").appendTo("#NagishLiTag");
                    b("#NagishLiOverlayContent").niceScroll({
                        autohidemode: !O,
                        horizrailenabled: !1,
                        railalign: phrases.align_left,
                        cursorcolor: d
                    });
                    d = b("#NagishLiOverlayContent a");
                    var f = d.first(),
                        l = d.last();
                    f.focus();
                    l.on("keydown", function(b) {
                        9 !== b.which || b.shiftKey || (b.preventDefault(), f.focus())
                    });
                    f.on("keydown", function(b) {
                        9 === b.which && b.shiftKey && (b.preventDefault(), l.focus())
                    })
                });
                b("" + commons.dropdown + " > ul > li > div > span.help, " + commons.dropdown + " > ul > li > div > span.notice").attr("data-balloon-pos", phrases.align_left);
                b("" + commons.dropdown + " > ul > li > div > span.help, " + commons.dropdown + " > ul > li > div > span.notice").on("mousedown", function() {
                    alert(b(this).data("balloon"));
                    return !1
                });
                b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > span:not(.sign, .help, .option-title)").click(function() {
                    var c = b(this).is("#NLCustomColorsBG") ? b("#NLCurrentBG") : b("#NLCurrentTXT"),
                        d = b(this).is("#NLCustomColorsBG") ? phrases.bg : phrases.txt,
                        f = b(this).parent("div#NLCustomColors").contents().detach();
                    var l = d == phrases.bg ?
                        n(b("body").css("background-color")) : n(b("body").css("color"));
                    var q = document.createElement("input");
                    q.setAttribute("type", "color");
                    q = "text" !== q.type ? '<li style="background-color: ' + l + '; width: inherit !important;" role="button" aria-label="' + phrases.aria_select_color + d.toLowerCase() + '"><input tabindex="35" id="NLColorPicker" type="color" value="' + l + "\" onchange=\"$(this).parent('li').css('background-color', $('#NLColorPicker').val()).attr('aria-label', '" + phrases.clr_custom + '\');" style="min-width: 18px !important; min-height: 18px !important; width: 100% !important; height: 100% !important; vertical-align: top !important;" /></li>' :
                        "";
                    l = '<span class="option-title" style="display: none !important;">' + phrases.custom_colors + "</span>";
                    "he" == p ? l += phrases.color + " " + d + ':<ul id="colorPanel" data-type="' + d + '" style="padding: 0 !important; text-align: center !important;"><li style="background-color: #000000;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_black + '"></li><li style="background-color: #6495ed;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_blue + '"></li><li style="background-color: #3cb371;" tabindex="35" role="button" aria-label="' +
                        d + " " + phrases.clr_green + '"></li><li style="background-color: #ffd800;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_yellow + '"></li><li style="background-color: #e95d4f;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_red + '"></li><li style="background-color: #ffa500;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_orange + '"></li><br /><li style="background-color: #a569bd;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_purple + '"></li><li style="background-color: #ff78bb;" tabindex="35" role="button" aria-label="' +
                        d + " " + phrases.clr_pink + '"></li><li style="background-color: #ffffff;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_white + '"></li><li style="background-color: #a3a3a3;" tabindex="35" role="button" aria-label="' + d + " " + phrases.clr_gray + '"></li>' + q : (l += d + " " + phrases.color + ':<ul id="colorPanel" data-type="' + d + '" style="padding: 0 !important; text-align: center !important;">', d = d.toLowerCase(), l += '<li style="background-color: #000000;" tabindex="35" role="button" aria-label="' + phrases.clr_black +
                        " " + d + '"></li><li style="background-color: #6495ed;" tabindex="35" role="button" aria-label="' + phrases.clr_blue + " " + d + '"></li><li style="background-color: #3cb371;" tabindex="35" role="button" aria-label="' + phrases.clr_green + " " + d + '"></li><li style="background-color: #ffd800;" tabindex="35" role="button" aria-label="' + phrases.clr_yellow + " " + d + '"></li><li style="background-color: #e95d4f;" tabindex="35" role="button" aria-label="' + phrases.clr_red + " " + d + '"></li><li style="background-color: #ffa500;" tabindex="35" role="button" aria-label="' +
                        phrases.clr_orange + " " + d + '"></li><br /><li style="background-color: #a569bd;" tabindex="35" role="button" aria-label="' + phrases.clr_purple + " " + d + '"></li><li style="background-color: #ff78bb;" tabindex="35" role="button" aria-label="' + phrases.clr_pink + " " + d + '"></li><li style="background-color: #ffffff;" tabindex="35" role="button" aria-label="' + phrases.clr_white + " " + d + '"></li><li style="background-color: #a3a3a3;" tabindex="35" role="button" aria-label="' + phrases.clr_gray + " " + d + '"></li>' + q);
                    l += '<li style="border-color: transparent !important;" tabindex="35" role="button" id="NLCloseColorPanel">&#x274c;&#xfe0e;</li></ul>';
                    b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors")[0].innerHTML = l;
                    "none" != c.css("display") && (b(commons.checkmark).prependTo(b("div#NLCustomColors")), b("" + commons.dropdown + ' > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel > li[style="background-color: ' + n(c.css("background-color")) + ';"]').eq(0).addClass("selected"));
                    b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > ul > li#NLCloseColorPanel").on("click keypress.nlkbnavclk", function() {
                        var c = b("" +
                            commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.bg + "'] > li.selected"),
                            d = b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable > #NLCustomColors > ul#colorPanel[data-type='" + phrases.txt + "'] > li.selected");
                        b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors").empty().append(f);
                        b(this).parent("ul#colorPanel").data("type") === phrases.bg ? c.length ? b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG").css({
                            "background-color": c.css("background-color"),
                            display: "inline-block"
                        }).attr("aria-label", c.attr("aria-label")) : b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsBG > #NLCurrentBG").css({
                            "background-color": "",
                            display: "none"
                        }) : d.length ? b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT").css({
                            "background-color": d.css("background-color"),
                            display: "inline-block"
                        }).attr("aria-label", d.attr("aria-label")) : b("" + commons.dropdown + " > #NagishLiColors > li > #NLCustomColors > #NLCustomColorsTXT > #NLCurrentTXT").css({
                            "background-color": "",
                            display: "none"
                        });
                        1 <= b("#NLCurrentBG:visible, #NLCurrentTXT:visible").length ? b("div#NLCustomColors").children("span.sign").length || b(commons.checkmark).prependTo(b("div#NLCustomColors")) : b("div#NLCustomColors").children("span.sign").remove()
                    })
                });
                b("" + commons.dropdown + " > .dropdown-toggle").click(function() {
                    if (b(this).next("#NagishLiColors, #NagishLiDisplay", "ul").children("li.active:not(':last-child')").length)
                        if (!b(this).children("span.selected").length && b(this).next("ul").children("li.active").length) {
                            var c =
                                b(this).next("ul").children("li.active").find(".option-title").text();
                            b('<span class="selected">' + c + "</span>").insertAfter(b(this).children(".dropdown-title"))
                        } else b(this).children("span.selected").remove();
                    else b(this).next("#NagishLiHighlight", "ul").length && (!b(this).children("span.selected").length && 1 < b(this).next("ul").children("li.active").find("span.sign").length ? (c = b(this).next("ul").children("li.active:first-child").find(".option-title").text() + " " + b(this).next("ul").children("li.active:nth-child(2)").find(".option-title").text(),
                        c = c.split(" "), c[1] = "en" == p ? c[1].charAt(0).toUpperCase() + c[1].substr(1) : c[1], b('<span class="selected">' + c[1] + "&nbsp;" + phrases.and + c[3] + "</span>").insertAfter(b(this).children(".dropdown-title"))) : !b(this).children("span.selected").length && b(this).next("ul").find("span.sign").length ? (c = b(this).next("ul").children("li.active").find(".option-title").text(), b('<span class="selected">' + c + "</span>").insertAfter(b(this).children(".dropdown-title"))) : b(this).children("span.selected").remove())
                });
                b("" + commons.dropdown +
                    " > #NagishLiText > li").click(function() {
                    b(this).is(":last-child") && !b(this).find("span.sign").length && b(commons.checkmark).prependTo(b(this).children("div"))
                }).on("mousedown keypress", function(c) {
                    if (1 === c.which || 13 === c.which) b(this).siblings("li:last").find("span.sign").remove(), b(this).is(":first-child") ? b('<span class="sign">&nbsp;&nbsp;&#x2795;&#xfe0e;</span>').appendTo(b(this).children("div")) : b(this).is(":nth-child(2)") && b('<span class="sign">&nbsp;&nbsp;&#x2796;</span>').appendTo(b(this).children("div"))
                }).on("mouseup mouseleave mouseout keydown keyup",
                    function() {
                        b(this).is(":last-child") || b(this).find("span.sign").remove()
                    });
                b("" + commons.dropdown + " > #NagishLiColors > li:not(.not-clickable), " + commons.dropdown + " > #NagishLiDisplay > li").click(function() {
                    b(this).hasClass("active") ? (b(this).not("li:last-child").removeClass("active").find("span.sign").remove(), b(commons.checkmark).prependTo(b(this).siblings("li:last-child").addClass("active").children("div"))) : (b(this).addClass("active").siblings("li").removeClass("active").find("span.sign").remove(),
                        b(commons.checkmark).prependTo(b(this).children("div")))
                });
                b("" + commons.dropdown + " > #NagishLiColors > li.not-clickable").on("click change keypress.nlkbnavclk", "#NLCustomColors > ul#colorPanel > li:not(#NLCloseColorPanel)", function() {
                    !b(this).hasClass("selected") || b(this).children("input").is("#NLColorPicker") ? (b(this).children("input").is("#NLColorPicker") && b(this).siblings("li.selected").length ? b(this).removeClass("selected") : b(this).addClass("selected").siblings("li").removeClass("selected").closest("li.not-clickable").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(),
                    b(this).closest("div#NLCustomColors").children("span.sign").length || b(commons.checkmark).prependTo(b(this).closest("#NLCustomColors", "div"))) : b(this).removeClass("selected").closest("#NLCustomColors", "div").find("span.sign").remove();
                    b(this).attr("aria-label") != phrases.aria_select_bgcolor && b(this).attr("aria-label") != phrases.aria_select_txtcolor ? (b(this).siblings("li").removeClass("selected").closest("li.not-clickable").addClass("active").siblings("li").removeClass("active").find("span.sign").remove(),
                        b(this).children("input").is("#NLColorPicker") ? b(this).addClass("selected").children("input#NLColorPicker").attr("value", b("#NLColorPicker").val()) : (b(this).parent("ul[data-type='" + phrases.bg + "']").children("li[aria-label='" + phrases.clr_custom + "']").attr("aria-label", phrases.aria_select_bgcolor).css("background-color", "transparent"), b(this).parent("ul[data-type='" + phrases.txt + "']").children("li[aria-label='" + phrases.clr_custom + "']").attr("aria-label", phrases.aria_select_txtcolor).css("background-color",
                            "transparent")), b(this).parent("ul#colorPanel").data("type") === phrases.bg ? G() : G("txt")) : b(this).closest("div#NLCustomColors").children("span.sign").length && !b("body[nl-colors]").length && b(this).removeClass("selected").closest("#NLCustomColors", "div").find("span.sign").remove();
                    b("body[nl-colors]").length || b("#NLCustomColors > ul#colorPanel > li.selected").length || b(commons.checkmark).prependTo(b(this).closest("li.not-clickable").removeClass("active").siblings("li:last-child").addClass("active").children("div"))
                });
                b("" + commons.dropdown + " > #NagishLiHighlight > li").click(function() {
                    b(this).hasClass("active") ? b(this).removeClass("active").find("span.sign").remove() : b(commons.checkmark).prependTo(b(this).addClass("active").children("div"))
                });
                b("" + commons.dropdown + " > #NagishLiMisc > li > #NLCursor > #NLCursorBlack, " + commons.dropdown + " > #NagishLiMisc > li > #NLCursor > #NLCursorWhite").click(function() {
                    b(this).hasClass("active") ? b(this).removeClass("active").find("span.sign").remove() : (b(this).siblings("span").removeClass("active").find("span.sign").remove(),
                        b(commons.checkmark).prependTo(b(this).addClass("active")))
                });
                b("" + commons.menus + " > li.dropdown > ul.dropdown-menu > li").on("dragstart", function() {
                    return !1
                });
                b("span#NagishLiMove > span").each(function() {
                    this.style.setProperty("display", "inline-block", "important");
                    this.style.setProperty("float", "" + phrases.align_left + "", "important");
                    this.style.setProperty("background-color", "transparent", "important");
                    this.style.setProperty("background-position", "center", "important");
                    this.style.setProperty("background-size",
                        "cover", "important");
                    this.style.setProperty("width", "50%", "important");
                    this.style.setProperty("height", "50%", "important")
                });
                b("span#NagishLiMove > span").hover(function(c) {
                    b(this).css("background-color", "mouseenter" === c.type ? "white" : "transparent")
                });
                b("" + commons.dropdown + " > .dropdown-toggle > .dropdown-arrow").each(function() {
                    b(this).html('<img src="' + icons.toggle_single + '" />').children("img").attr("alt", phrases.toggle_single_alt + b(this).siblings(".dropdown-title").text())
                });
                b("" + commons.dropdown +
                    " > .dropdown-menu > li > div[tabindex='13']").click(function() {
                    alert(b(this).data("balloon"))
                });
                var L = b("" + commons.menus + " > .dropdown:last-child > .dropdown-menu > li:last-child > div").css("border-bottom-color");
                b(commons.menus).niceScroll({
                    autohidemode: !O,
                    horizrailenabled: !1,
                    railalign: phrases.align_left,
                    cursorcolor: L
                });
                b(window).resize(function() {
                    b(commons.menus).css("max-height", b(window).height() - 40 + "px")
                });
                b(commons.bar).on("contextmenu", function() {
                    return !1
                });
                b("body").css("-ms-overflow-style",
                    "scrollbar");
                O && b(commons.bar)[0].style.setProperty("position", "absolute", "important")
            })
        };
        if ("undefined" == typeof jQuery) {
            var docHead, scriptTag;
            docHead = document.getElementsByTagName("head")[0];
            scriptTag = document.createElement("script");
            scriptTag.type = "text/javascript";
            scriptTag.src = "//code.jquery.com/jquery-1.8.0.min.js";
            scriptTag.onload = initNagishLi;
            docHead.appendChild(scriptTag);
            jq_not_found = !0
        } else initNagishLi()
    };
});
