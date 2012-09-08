/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Utils
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-07
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declaration
    var uAgUtils = parent.utils = parent.utils || {};

    /*

    Portions copyright (C) 2006  Ross Kendall - http://rosskendall.com
    Portions copyright (C) 1993-2005 Cal Henderson - http://iamcal.com

    Licenced under Creative Commons _or_ GPL according to the terms below...

    --

     Licensed under a Creative Commons Attribution-ShareAlike 2.5 License

     You are free:

        * to Share -- to copy, distribute, display, and perform the work
        * to Remix -- to make derivative works

     Under the following conditions:

        * Attribution. You must attribute the work in the manner specified by the author or licensor.
        * Share Alike. If you alter, transform, or build upon this work, you may distribute the resulting work only under a license identical to this one.

        * For any reuse or distribution, you must make clear to others the license terms of this work.
        * Any of these conditions can be waived if you get permission from the copyright holder.

     http://creativecommons.org/licenses/by-sa/2.5/

    --

     This program is free software; you can redistribute it and/or
     modify it under the terms of the GNU General Public License
     as published by the Free Software Foundation; either version 2
     of the License, or (at your option) any later version.

     This program is distributed in the hope that it will be useful,
     but WITHOUT ANY WARRANTY; without even the implied warranty of
     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     GNU General Public License for more details.

     You should have received a copy of the GNU General Public License
     along with this program; if not, write to the Free Software
     Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
     http://www.gnu.org/copyleft/gpl.html

    */

    /**
     * @function
     * @description Check if an email address conforms to <a href="http://www.ietf.org/rfc/rfc0822.txt">IETF RFC822</a>, based on the <a href="http://iamcal.com/publish/articles/php/parsing_email/">PHP code by Cal Henderson</a>.
     * @version 0.2 (created: 2006-12-16; updated: 2007-03-22)
     * @author: <a href="http://rosskendall.com/blog/web/javascript-function-to-check-an-email-address-conforms-to-rfc822">Ross Kendall</a>
     * @param {string} sEmail Email string.
     * @returns {boolean} Success.
     */
    uAgUtils.isRFC822ValidEmail = function(sEmail) {
        var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
        var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
        var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
        var sQuotedPair = '\\x5c[\\x00-\\x7f]';
        var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
        var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
        var sDomain_ref = sAtom;
        var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
        var sWord = '(' + sAtom + '|' + sQuotedString + ')';
        var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
        var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
        var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
        var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

        var reValidEmail = new RegExp(sValidEmail);

        if (reValidEmail.test(sEmail)) {
            return true;
        }

        return false;
    }

    /*

     Other interesting solutions found over the Internet:

     - On http://stackoverflow.com/questions/46155/validate-email-address-in-javascript

     function validateEmail(email) {
         var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(email);
     }

     - On http://www.w3schools.com/js/js_form_validation.asp

     function validateForm() {
         var x=document.forms["myForm"]["email"].value;
         var atpos=x.indexOf("@");
         var dotpos=x.lastIndexOf(".");
         if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
             alert("Not a valid e-mail address");
             return false;
         }
     }

    */

    /**
     * @function
     * @description Check if a phone number is valid.
     * @author: <a href="http://www.mykeblack.com/scripts/javascript/form-validation/check-valid-phone-number">Myke Black</a>
     * @param {string} phonenumberStr Phone number string.
     * @returns {boolean} Success.
     */
    uAgUtils.isValidPhoneNumber = function(phonenumberStr) {
        if (phonenumberStr !== '') {
            var goodCharsStr = '+- 1234567890()';
            for (var i = 0, len = phonenumberStr.length; i < len; i++) {
                var c = phonenumber.charAt(i);
                if (goodCharsStr.indexOf(c) < 0) {
                    console.info('Info: not a phone number');
                    return false;
                }
            }
            return true;
        } else {
            console.error('Error: empty phone number');
            return false;
        }
    }

    /*

     Other interesting solution found over the Internet:

     - On http://www.dreamincode.net/code/snippet69.htm

     function isPhoneNumber(s) {
         // Check for correct phone number
         rePhoneNumber = new RegExp(/^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/);

         if (!rePhoneNumber.test(s)) {
             alert("Phone Number Must Be Entered As: (555) 555-1234");
             return false;
         }

         return true;
     }

    */

    return parent;
}(uag || {}, jQuery, this, this.document));
