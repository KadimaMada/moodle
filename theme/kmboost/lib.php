<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Theme functions.
 *
 * @package    theme_kmboost
 * @copyright  2016 Frédéric Massart - FMCorz.net
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

function theme_kmboost_pluginfile($course, $cm, $context, $filearea, $args, $forcedownload, array $options = array()) {
    if ($context->contextlevel == CONTEXT_SYSTEM and ($filearea === 'logo' )) {
        $theme = theme_config::load('kmboost');
        // By default, theme files must be cache-able by both browsers and proxies.
        if (!array_key_exists('cacheability', $options)) {
            $options['cacheability'] = 'public';
        }
        return $theme->setting_file_serve($filearea, $args, $forcedownload, $options);
    } else {
        send_file_not_found();
    }
}

/**
 * Get translated front page HTML info block (is stored in theme's settings)
 * 
 * @return string Translated text in current language
 */
function get_translated_frontpagehtmlblock() {

    $rawfrontpagehtmlblock = get_config('theme_kmboost', 'frontpagehtmlblock');
    $frontpagehtmlblock = get_translated_text($rawfrontpagehtmlblock);
    $frontpagehtmlblock = (isset($frontpagehtmlblock[1])) ? $frontpagehtmlblock[1] : $rawfrontpagehtmlblock;

    return $frontpagehtmlblock;
}

/**
 * Parse text for language blocks
 * 
 * @param string $content Original raw text with content in all languages
 * @param bool $findhebrew Force to find hebrew translation, if no any translation found for current lang (default: true)
 * @param string $clang Specified language code (default = null; we use current user's language)
 * @return array Array: [0] - raw text, [1] - block with text in specified or current language
 */
function get_translated_text($content, $findhebrew = true, $clang = null) {
    // set current lang
    $clang = (isset($clang)) ? $clang : current_language(); 

    // get list of all installed langs
    $langs = get_string_manager()->get_list_of_translations();
    // remove current lang from langs array
    unset($langs[$clang]);

    // prepare and execute regexp for detecting and extracting the defined language
    $excludelang = "";
    foreach ($langs as $langcode => $langname) {
        $excludelang .= "(?:$langcode%)|";
    }
    $reg = "/(?<=$clang%)([\s\S]*?)(?:$excludelang$)/i";
    preg_match($reg, $content, $langtext);

    // try to find hebrew, if no any text for current lang is present
    if (!isset($langtext[1]) && $findhebrew) {
        $langtext = get_translated_text($content, false, 'he');
    }

    return $langtext;
}

