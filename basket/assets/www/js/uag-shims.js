/**
 * Reference: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString
 */
if (!Date.prototype.toISOString) {
    (function() {
        function pad(number) {
            var r = String(number);
            if (r.length === 1) {
                r = '0' + r;
            }
            return r;
        }
        Date.prototype.toISOString = function() {
            return this.getUTCFullYear()
                + '-' + pad(this.getUTCMonth() + 1 )
                + '-' + pad(this.getUTCDate())
                + 'T' + pad(this.getUTCHours())
                + ':' + pad(this.getUTCMinutes())
                + ':' + pad(this.getUTCSeconds())
                + '.' + String((this.getUTCMilliseconds()/1000).toFixed(3)).slice(2, 5)
                + 'Z';
        };
    }());
    console.warn('Warning: toISOString() method from Date object is undefined -- providing shim instead'); // my contribution
}

/**
 * Reference: http://stackoverflow.com/questions/6228302/javascript-date-iso8601
 */
if (!Date.prototype.fromISOString) {
    (function() {
        var ISO_STR = '2011-06-02T09:34:29+02:00'; // my contribution
        var D = new Date(ISO_STR);
        if (isNaN(D) || D.getUTCMonth() !== 5 || D.getUTCDate() !== 2 ||
                         D.getUTCHours() !== 7 || D.getUTCMinutes() !== 34) {
            Date.prototype.fromISOString = function(s) { // my contribution
                var day, tz,
                rx = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
                p = rx.exec(s) || [];
                if (p[1]) {
                    day= p[1].split(/\D/);
                    for (var i = 0, L = day.length; i < L; i++) {
                        day[i] = parseInt(day[i], 10) || 0;
                    }
                    day[1] -= 1;
                    day = new Date(Date.UTC.apply(Date, day));
                    if (!day.getDate()) {
                        return NaN;
                    }
                    if (p[5]) {
                        tz = (parseInt(p[5], 10)*60);
                        if (p[6]) {
                            tz+= parseInt(p[6], 10);
                        }
                        if (p[4] === '+') {
                            tz*= -1;
                        }
                        if (tz) {
                            day.setUTCMinutes(day.getUTCMinutes()+ tz);
                        }
                    }
                    return day;
                }
                return NaN;
            }
            console.warn('Warning: ISO 8601 Date object not correctly implemented');
        } else {
            Date.prototype.fromISOString = function(s) { // my contribution
                return new Date(s);
            }
        }
        // remove test
        //var DD = new Date().fromISOString(ISO_STR);
        //console.log('Debug: testing ' + ISO_STR + ' gives ' + DD.toUTCString());
    }());
}
