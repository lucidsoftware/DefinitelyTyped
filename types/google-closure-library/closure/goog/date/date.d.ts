/// <reference path="../../../globals.d.ts"/>
/// <reference path="./datelike.d.ts"/>

declare module 'goog:goog.date.month' {
    export = goog.date.month;
}

declare module 'goog:goog.date' {
    export = goog.date;
}

declare module 'goog:goog.date.weekDay' {
    import alias = goog.date.weekDay;
    export default alias;
}

declare module 'goog:goog.date.Interval' {
    import alias = goog.date.Interval;
    export default alias;
}

declare module 'goog:goog.date.DateTime' {
    import alias = goog.date.DateTime;
    export default alias;
}

declare module 'goog:goog.date.Date' {
    import alias = goog.date.Date;
    export default alias;
}

declare namespace goog.date {
    /**
     * Class representing a date/time interval. Used for date calculations.
     * <pre>
     * new goog.date.Interval(0, 1) // One month
     * new goog.date.Interval(0, 0, 3, 1) // Three days and one hour
     * new goog.date.Interval(goog.date.Interval.DAYS, 1) // One day
     * </pre>
     *
     * @struct
     * @final
     */
    class Interval extends __Interval {}
    abstract class __Interval {
        /**
         * @param {number|string=} opt_years Years or string representing date part.
         * @param {number=} opt_months Months or number of whatever date part specified
         *     by first parameter.
         * @param {number=} opt_days Days.
         * @param {number=} opt_hours Hours.
         * @param {number=} opt_minutes Minutes.
         * @param {number=} opt_seconds Seconds.
         */
        constructor(
            opt_years?: number|string,
            opt_months?: number,
            opt_days?: number,
            opt_hours?: number,
            opt_minutes?: number,
            opt_seconds?: number
        );

        /** @type {number} */
        years: number;

        /** @type {number} */
        months: number;

        /** @type {number} */
        days: number;

        /** @type {number} */
        hours: number;

        /** @type {number} */
        minutes: number;

        /** @type {number} */
        seconds: number;

        /**
         * Serializes goog.date.Interval into XML Schema duration (ISO 8601 extended).
         * @see http://www.w3.org/TR/xmlschema-2/#duration
         *
         * @param {boolean=} opt_verbose Include zero fields in the duration string.
         * @return {?string} An XML schema duration in ISO 8601 extended format,
         *     or null if the interval contains both positive and negative fields.
         */
        toIsoString(opt_verbose?: boolean): string|null;

        /**
         * Tests whether the given interval is equal to this interval.
         * Note, this is a simple field-by-field comparison, it doesn't
         * account for comparisons like "12 months == 1 year".
         *
         * @param {goog.date.Interval} other The interval to test.
         * @return {boolean} Whether the intervals are equal.
         */
        equals(other: goog.date.Interval): boolean;

        /**
         * @return {!goog.date.Interval} A clone of the interval object.
         */
        clone(): goog.date.Interval;

        /**
         * @return {boolean} Whether all fields of the interval are zero.
         */
        isZero(): boolean;

        /**
         * @return {!goog.date.Interval} Negative of this interval.
         */
        getInverse(): goog.date.Interval;

        /**
         * Calculates n * (this interval) by memberwise multiplication.
         * @param {number} n An integer.
         * @return {!goog.date.Interval} n * this.
         */
        times(n: number): goog.date.Interval;

        /**
         * Gets the total number of seconds in the time interval. Assumes that months
         * and years are empty.
         * @return {number} Total number of seconds in the interval.
         */
        getTotalSeconds(): number;

        /**
         * Adds the Interval in the argument to this Interval field by field.
         *
         * @param {goog.date.Interval} interval The Interval to add.
         */
        add(interval: goog.date.Interval): void;
    }

    /**
     * Class representing a date. Defaults to current date if none is specified.
     *
     * Implements most methods of the native js Date object (except the time related
     * ones, {@see goog.date.DateTime}) and can be used interchangeably with it just
     * as if goog.date.Date was a synonym of Date. To make this more transparent,
     * Closure APIs should accept goog.date.DateLike instead of the real Date
     * object.
     *
     * @struct
     * @see goog.date.DateTime
     */
    class Date extends __Date {}
    abstract class __Date {
        /**
         * @param {number|goog.date.DateLike=} opt_year Four digit year or a date-like
         *     object. If not set, the created object will contain the date
         *     determined by goog.now().
         * @param {number=} opt_month Month, 0 = Jan, 11 = Dec.
         * @param {number=} opt_date Date of month, 1 - 31.
         */
        constructor(opt_year?: number|goog.date.DateLike, opt_month?: number, opt_date?: number);

        /** @protected {!Date} The wrapped date or datetime. */
        protected date: any /*missing*/;

        /**
         * new Date(y, m, d) treats years in the interval [0, 100) as two digit years,
         * adding 1900 to them. This method ensures that calling the date constructor
         * as a copy constructor returns a value that is equal to the passed in
         * date value by explicitly setting the full year.
         * @private
         * @param {number} fullYear The full year (including century).
         * @param {number} month The month, from 0-11.
         * @param {number} date The day of the month.
         * @return {!Date} The constructed Date object.
         */
        private buildDate_(fullYear: number, month: number, date: number): Date;

        /**
         * First day of week. 0 = Mon, 6 = Sun.
         * @type {number}
         * @private
         */
        private firstDayOfWeek_: number;

        /**
         * The cut off weekday used for week number calculations. 0 = Mon, 6 = Sun.
         * @type {number}
         * @private
         */
        private firstWeekCutOffDay_: number;

        /**
         * @return {!goog.date.Date} A clone of the date object.
         */
        clone(): goog.date.Date;

        /**
         * @return {number} The four digit year of date.
         */
        getFullYear(): number;

        /**
         * Alias for getFullYear.
         *
         * @return {number} The four digit year of date.
         * @see #getFullYear
         */
        getYear(): number;

        /**
         * @return {goog.date.month} The month of date, 0 = Jan, 11 = Dec.
         */
        getMonth(): goog.date.month;

        /**
         * @return {number} The date of month.
         */
        getDate(): number;

        /**
         * Returns the number of milliseconds since 1 January 1970 00:00:00.
         *
         * @return {number} The number of milliseconds since 1 January 1970 00:00:00.
         */
        getTime(): number;

        /**
         * @return {number} The day of week, US style. 0 = Sun, 6 = Sat.
         */
        getDay(): number;

        /**
         * @return {goog.date.weekDay} The day of week, ISO style. 0 = Mon, 6 = Sun.
         */
        getIsoWeekday(): goog.date.weekDay;

        /**
         * @return {number} The day of week according to firstDayOfWeek setting.
         */
        getWeekday(): number;

        /**
         * @return {number} The four digit year of date according to universal time.
         */
        getUTCFullYear(): number;

        /**
         * @return {goog.date.month} The month of date according to universal time,
         *     0 = Jan, 11 = Dec.
         */
        getUTCMonth(): goog.date.month;

        /**
         * @return {number} The date of month according to universal time.
         */
        getUTCDate(): number;

        /**
         * @return {number} The day of week according to universal time, US style.
         *     0 = Sun, 1 = Mon, 6 = Sat.
         */
        getUTCDay(): number;

        /**
         * @return {number} The hours value according to universal time.
         */
        getUTCHours(): number;

        /**
         * @return {number} The minutes value according to universal time.
         */
        getUTCMinutes(): number;

        /**
         * @return {goog.date.weekDay} The day of week according to universal time, ISO
         *     style. 0 = Mon, 6 = Sun.
         */
        getUTCIsoWeekday(): goog.date.weekDay;

        /**
         * @return {number} The day of week according to universal time and
         *     firstDayOfWeek setting.
         */
        getUTCWeekday(): number;

        /**
         * @return {number} The first day of the week. 0 = Mon, 6 = Sun.
         */
        getFirstDayOfWeek(): number;

        /**
         * @return {number} The cut off weekday used for week number calculations.
         *     0 = Mon, 6 = Sun.
         */
        getFirstWeekCutOffDay(): number;

        /**
         * @return {number} The number of days for the selected month.
         */
        getNumberOfDaysInMonth(): number;

        /**
         * @return {number} The week number.
         */
        getWeekNumber(): number;

        /**
         * @return {number} The day of year.
         */
        getDayOfYear(): number;

        /**
         * Returns timezone offset. The timezone offset is the delta in minutes between
         * UTC and your local time. E.g., UTC+10 returns -600. Daylight savings time
         * prevents this value from being constant.
         *
         * @return {number} The timezone offset.
         */
        getTimezoneOffset(): number;

        /**
         * Returns timezone offset as a string. Returns offset in [+-]HH:mm format or Z
         * for UTC.
         *
         * @return {string} The timezone offset as a string.
         */
        getTimezoneOffsetString(): string;

        /**
         * Sets the date.
         *
         * @param {goog.date.Date} date Date object to set date from.
         */
        set(date: goog.date.Date): void;

        /**
         * Sets the year part of the date.
         *
         * @param {number} year Four digit year.
         */
        setFullYear(year: number): void;

        /**
         * Alias for setFullYear.
         *
         * @param {number} year Four digit year.
         * @see #setFullYear
         */
        setYear(year: number): void;

        /**
         * Sets the month part of the date.
         *
         * TODO(nnaze): Update type to goog.date.month.
         *
         * @param {number} month The month, where 0 = Jan, 11 = Dec.
         */
        setMonth(month: number): void;

        /**
         * Sets the day part of the date.
         *
         * @param {number} date The day part.
         */
        setDate(date: number): void;

        /**
         * Sets the value of the date object as expressed in the number of milliseconds
         * since 1 January 1970 00:00:00.
         *
         * @param {number} ms Number of milliseconds since 1 Jan 1970.
         */
        setTime(ms: number): void;

        /**
         * Sets the year part of the date according to universal time.
         *
         * @param {number} year Four digit year.
         */
        setUTCFullYear(year: number): void;

        /**
         * Sets the month part of the date according to universal time.
         *
         * @param {number} month The month, where 0 = Jan, 11 = Dec.
         */
        setUTCMonth(month: number): void;

        /**
         * Sets the day part of the date according to universal time.
         *
         * @param {number} date The UTC date.
         */
        setUTCDate(date: number): void;

        /**
         * Sets the first day of week.
         *
         * @param {number} day 0 = Mon, 6 = Sun.
         */
        setFirstDayOfWeek(day: number): void;

        /**
         * Sets cut off weekday used for week number calculations. 0 = Mon, 6 = Sun.
         *
         * @param {number} day The cut off weekday.
         */
        setFirstWeekCutOffDay(day: number): void;

        /**
         * Performs date calculation by adding the supplied interval to the date.
         *
         * @param {goog.date.Interval} interval Date interval to add.
         */
        add(interval: goog.date.Interval): void;

        /**
         * Returns ISO 8601 string representation of date.
         *
         * @param {boolean=} opt_verbose Whether the verbose format should be used
         *     instead of the default compact one.
         * @param {boolean=} opt_tz Whether the timezone offset should be included
         *     in the string.
         * @return {string} ISO 8601 string representation of date.
         */
        toIsoString(opt_verbose?: boolean, opt_tz?: boolean): string;

        /**
         * Returns ISO 8601 string representation of date according to universal time.
         *
         * @param {boolean=} opt_verbose Whether the verbose format should be used
         *     instead of the default compact one.
         * @param {boolean=} opt_tz Whether the timezone offset should be included in
         *     the string.
         * @return {string} ISO 8601 string representation of date according to
         *     universal time.
         */
        toUTCIsoString(opt_verbose?: boolean, opt_tz?: boolean): string;

        /**
         * Tests whether given date is equal to this Date.
         * Note: This ignores units more precise than days (hours and below)
         * and also ignores timezone considerations.
         *
         * @param {goog.date.Date} other The date to compare.
         * @return {boolean} Whether the given date is equal to this one.
         */
        equals(other: goog.date.Date): boolean;

        /**
         * Fixes date to account for daylight savings time in browsers that fail to do
         * so automatically.
         * @param {number} expected Expected date.
         * @private
         */
        private maybeFixDst_(expected: number): void;
    }

    /**
     * Class representing a date and time. Defaults to current date and time if none
     * is specified.
     *
     * Implements most methods of the native js Date object and can be used
     * interchangeably with it just as if goog.date.DateTime was a subclass of Date.
     *
     * @struct
     * @extends {goog.date.Date}
     */
    class DateTime extends __DateTime {}
    abstract class __DateTime extends goog.date.__Date {
        /**
         * @param {(number|{getTime:?}|null)=} opt_year Four digit year or a date-like
         *     object. If not set, the created object will contain the date determined
         *     by goog.now().
         * @param {number=} opt_month Month, 0 = Jan, 11 = Dec.
         * @param {number=} opt_date Date of month, 1 - 31.
         * @param {number=} opt_hours Hours, 0 - 23.
         * @param {number=} opt_minutes Minutes, 0 - 59.
         * @param {number=} opt_seconds Seconds, 0 - 61.
         * @param {number=} opt_milliseconds Milliseconds, 0 - 999.
         */
        constructor(
            opt_year?: number|{getTime: any}|null,
            opt_month?: number,
            opt_date?: number,
            opt_hours?: number,
            opt_minutes?: number,
            opt_seconds?: number,
            opt_milliseconds?: number
        );

        /**
         * Returns the hours part of the datetime.
         *
         * @return {number} An integer between 0 and 23, representing the hour.
         */
        getHours(): number;

        /**
         * Returns the minutes part of the datetime.
         *
         * @return {number} An integer between 0 and 59, representing the minutes.
         */
        getMinutes(): number;

        /**
         * Returns the seconds part of the datetime.
         *
         * @return {number} An integer between 0 and 59, representing the seconds.
         */
        getSeconds(): number;

        /**
         * Returns the milliseconds part of the datetime.
         *
         * @return {number} An integer between 0 and 999, representing the milliseconds.
         */
        getMilliseconds(): number;

        /**
         * Returns the seconds part of the datetime according to universal time.
         *
         * @return {number} An integer between 0 and 59, representing the seconds.
         */
        getUTCSeconds(): number;

        /**
         * Returns the milliseconds part of the datetime according to universal time.
         *
         * @return {number} An integer between 0 and 999, representing the milliseconds.
         */
        getUTCMilliseconds(): number;

        /**
         * Sets the hours part of the datetime.
         *
         * @param {number} hours An integer between 0 and 23, representing the hour.
         */
        setHours(hours: number): void;

        /**
         * Sets the minutes part of the datetime.
         *
         * @param {number} minutes Integer between 0 and 59, representing the minutes.
         */
        setMinutes(minutes: number): void;

        /**
         * Sets the seconds part of the datetime.
         *
         * @param {number} seconds Integer between 0 and 59, representing the seconds.
         */
        setSeconds(seconds: number): void;

        /**
         * Sets the milliseconds part of the datetime.
         *
         * @param {number} ms Integer between 0 and 999, representing the milliseconds.
         */
        setMilliseconds(ms: number): void;

        /**
         * Sets the hours part of the datetime according to universal time.
         *
         * @param {number} hours An integer between 0 and 23, representing the hour.
         */
        setUTCHours(hours: number): void;

        /**
         * Sets the minutes part of the datetime according to universal time.
         *
         * @param {number} minutes Integer between 0 and 59, representing the minutes.
         */
        setUTCMinutes(minutes: number): void;

        /**
         * Sets the seconds part of the datetime according to universal time.
         *
         * @param {number} seconds Integer between 0 and 59, representing the seconds.
         */
        setUTCSeconds(seconds: number): void;

        /**
         * Sets the seconds part of the datetime according to universal time.
         *
         * @param {number} ms Integer between 0 and 999, representing the milliseconds.
         */
        setUTCMilliseconds(ms: number): void;

        /**
         * @return {boolean} Whether the datetime is aligned to midnight.
         */
        isMidnight(): boolean;

        /**
         * Returns XML Schema 2 string representation of date/time.
         * The return value is also ISO 8601 compliant.
         *
         * @param {boolean=} opt_timezone Should the timezone offset be included in the
         *     string?.
         * @return {string} XML Schema 2 string representation of date/time.
         */
        toXmlDateTime(opt_timezone?: boolean): string;

        /**
         * Returns RFC 3339 string representation of datetime in UTC.
         *
         * @return {string} A UTC datetime expressed in RFC 3339 format.
         */
        toUTCRfc3339String(): string;

        /**
         * Generates time label for the datetime, e.g., '5:30 AM'.
         * By default this does not pad hours (e.g., to '05:30') and it does add
         * an am/pm suffix.
         * TODO(user): i18n -- hardcoding time format like this is bad.  E.g., in CJK
         *               locales, need Chinese characters for hour and minute units.
         * @param {boolean=} opt_padHours Whether to pad hours, e.g., '05:30' vs '5:30'.
         * @param {boolean=} opt_showAmPm Whether to show the 'am' and 'pm' suffix.
         * @param {boolean=} opt_omitZeroMinutes E.g., '5:00pm' becomes '5pm',
         *                                      but '5:01pm' remains '5:01pm'.
         * @return {string} The time label.
         * @deprecated Use goog.i18n.DateTimeFormat with
         *     goog.i18n.DateTimeFormat.Format.FULL_TIME or
         *     goog.i18n.DateTimeFormat.Format.LONG_TIME or
         *     goog.i18n.DateTimeFormat.Format.MEDIUM_TIME or
         *     goog.i18n.DateTimeFormat.Format.SHORT_TIME.
         */
        toUsTimeString(opt_padHours?: boolean, opt_showAmPm?: boolean, opt_omitZeroMinutes?: boolean): string;

        /**
         * Generates time label for the datetime in standard ISO 24-hour time format.
         * E.g., '06:00:00' or '23:30:15'.
         * @param {boolean=} opt_showSeconds Whether to shows seconds. Defaults to TRUE.
         * @return {string} The time label.
         */
        toIsoTimeString(opt_showSeconds?: boolean): string;

        /**
         * @return {!goog.date.DateTime} A clone of the DateTime object.
         */
        clone():  goog.date.DateTime;
    }

    /**
     * Constants for weekdays.
     * @enum {number}
     */
    enum weekDay { MON, TUE, WED, THU, FRI, SAT, SUN }

    /**
     * Constants for months.
     * @enum {number}
     */
    enum month { JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC }

    /**
     * Formats a month/year string.
     * Example: "January 2008"
     *
     * @param {string} monthName The month name to use in the result.
     * @param {number} yearNum The numeric year to use in the result.
     * @return {string} A formatted month/year string.
     * @deprecated Use goog.i18n.DateTimeFormat with
     *     goog.i18n.DateTimeFormat.Format.YEAR_MONTH_ABBR or
     *     goog.i18n.DateTimeFormat.Format.YEAR_MONTH_FULL.
     */
    function formatMonthAndYear(monthName: string, yearNum: number): string;

    /**
     * Number of milliseconds in a day.
     * @type {number}
     */
    let MS_PER_DAY: number;

    /**
     * Returns whether the given year is a leap year.
     *
     * @param {number} year Year part of date.
     * @return {boolean} Whether the given year is a leap year.
     */
    function isLeapYear(year: number): boolean;

    /**
     * Returns whether the given year is a long ISO year.
     * See {@link http://www.phys.uu.nl/~vgent/calendar/isocalendar_text3.htm}.
     *
     * @param {number} year Full year part of date.
     * @return {boolean} Whether the given year is a long ISO year.
     */
    function isLongIsoYear(year: number): boolean;

    /**
     * Returns the number of days for a given month.
     *
     * @param {number} year Year part of date.
     * @param {number} month Month part of date.
     * @return {number} The number of days for the given month.
     */
    function getNumberOfDaysInMonth(year: number, month: number): number;

    /**
     * Returns true if the 2 dates are in the same day.
     * @param {goog.date.DateLike} date The time to check.
     * @param {goog.date.DateLike=} opt_now The current time.
     * @return {boolean} Whether the dates are on the same day.
     */
    function isSameDay(date: goog.date.DateLike, opt_now?: goog.date.DateLike): boolean;

    /**
     * Returns true if the 2 dates are in the same month.
     * @param {goog.date.DateLike} date The time to check.
     * @param {goog.date.DateLike=} opt_now The current time.
     * @return {boolean} Whether the dates are in the same calendar month.
     */
    function isSameMonth(date: goog.date.DateLike, opt_now?: goog.date.DateLike): boolean;

    /**
     * Returns true if the 2 dates are in the same year.
     * @param {goog.date.DateLike} date The time to check.
     * @param {goog.date.DateLike=} opt_now The current time.
     * @return {boolean} Whether the dates are in the same calendar year.
     */
    function isSameYear(date: goog.date.DateLike, opt_now?: goog.date.DateLike): boolean;

    /**
     * Static function for week number calculation. ISO 8601 implementation.
     *
     * @param {number} year Year part of date.
     * @param {number} month Month part of date (0-11).
     * @param {number} date Day part of date (1-31).
     * @param {number=} opt_weekDay Cut off weekday, defaults to Thursday.
     * @param {number=} opt_firstDayOfWeek First day of the week, defaults to
     *     Monday.
     *     Monday=0, Sunday=6.
     * @return {number} The week number (1-53).
     */
    function getWeekNumber(
        year: number, month: number, date: number, opt_weekDay?: number, opt_firstDayOfWeek?: number
    ): number;

    /**
     * @param {T} date1 A datelike object.
     * @param {S} date2 Another datelike object.
     * @return {T|S} The earlier of them in time.
     * @template T,S
     */
    function min<T, S>(date1: T, date2: S): T|S;

    /**
     * @param {T} date1 A datelike object.
     * @param {S} date2 Another datelike object.
     * @return {T|S} The later of them in time.
     * @template T,S
     */
    function max<T, S>(date1: T, date2: S): T|S;

    /**
     * Parses a datetime string expressed in ISO 8601 format. Overwrites the date
     * and optionally the time part of the given object with the parsed values.
     *
     * @param {!goog.date.DateTime} dateTime Object whose fields will be set.
     * @param {string} formatted A date or datetime expressed in ISO 8601 format.
     * @return {boolean} Whether the parsing succeeded.
     */
    function setIso8601DateTime(dateTime: goog.date.DateTime, formatted: string): boolean;
}

declare namespace goog.date.Interval {
    /**
     * Parses an XML Schema duration (ISO 8601 extended).
     * @see http://www.w3.org/TR/xmlschema-2/#duration
     *
     * @param  {string} duration An XML schema duration in textual format.
     *     Recurring durations and weeks are not supported.
     * @return {goog.date.Interval} The duration as a goog.date.Interval or null
     *     if the parse fails.
     */
    function fromIsoString(duration: string): goog.date.Interval;

    /**
     * Years constant for the date parts.
     * @type {string}
     */
    let YEARS: string;

    /**
     * Months constant for the date parts.
     * @type {string}
     */
    let MONTHS: string;

    /**
     * Days constant for the date parts.
     * @type {string}
     */
    let DAYS: string;

    /**
     * Hours constant for the date parts.
     * @type {string}
     */
    let HOURS: string;

    /**
     * Minutes constant for the date parts.
     * @type {string}
     */
    let MINUTES: string;

    /**
     * Seconds constant for the date parts.
     * @type {string}
     */
    let SECONDS: string;
}

declare namespace goog.date.Date {
    /**
     * Compares two dates.  May be used as a sorting function.
     * @see goog.array.sort
     * @param {!goog.date.DateLike} date1 Date to compare.
     * @param {!goog.date.DateLike} date2 Date to compare.
     * @return {number} Comparison result. 0 if dates are the same, less than 0 if
     *     date1 is earlier than date2, greater than 0 if date1 is later than date2.
     */
    function compare(date1: goog.date.DateLike, date2: goog.date.DateLike): number;

    /**
     * Parses an ISO 8601 string as a `goog.date.Date`.
     * @param {string} formatted ISO 8601 string to parse.
     * @return {?goog.date.Date} Parsed date or null if parse fails.
     */
    function fromIsoString(formatted: string): goog.date.Date|null;
}

declare namespace goog.date.DateTime {
    /**
     * @param {number} timestamp Number of milliseconds since Epoch.
     * @return {!goog.date.DateTime}
     */
    function fromTimestamp(timestamp: number): goog.date.DateTime;

    /**
     * Creates a DateTime from a datetime string expressed in RFC 822 format.
     *
     * @param {string} formatted A date or datetime expressed in RFC 822 format.
     * @return {goog.date.DateTime} Parsed date or null if parse fails.
     */
    function fromRfc822String(formatted: string): goog.date.DateTime;

    /**
     * Parses an ISO 8601 string as a `goog.date.DateTime`.
     * @param {string} formatted ISO 8601 string to parse.
     * @return {?goog.date.DateTime} Parsed date or null if parse fails.
     * @override
     */
    function fromIsoString(formatted: string): goog.date.DateTime|null;
}
