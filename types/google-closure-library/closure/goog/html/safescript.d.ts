/// <reference path="../../../globals.d.ts"/>
/// <reference path="../string/typedstring.d.ts"/>
/// <reference path="../string/const.d.ts"/>

declare module 'goog:goog.html.SafeScript' {
    import alias = goog.html.SafeScript;
    export default alias;
}

declare namespace goog.html {
    /**
     * A string-like object which represents JavaScript code and that carries the
     * security type contract that its value, as a string, will not cause execution
     * of unconstrained attacker controlled code (XSS) when evaluated as JavaScript
     * in a browser.
     *
     * Instances of this type must be created via the factory method
     * `goog.html.SafeScript.fromConstant` and not by invoking its
     * constructor. The constructor intentionally takes no parameters and the type
     * is immutable; hence only a default instance corresponding to the empty string
     * can be obtained via constructor invocation.
     *
     * A SafeScript's string representation can safely be interpolated as the
     * content of a script element within HTML. The SafeScript string should not be
     * escaped before interpolation.
     *
     * Note that the SafeScript might contain text that is attacker-controlled but
     * that text should have been interpolated with appropriate escaping,
     * sanitization and/or validation into the right location in the script, such
     * that it is highly constrained in its effect (for example, it had to match a
     * set of whitelisted words).
     *
     * A SafeScript can be constructed via security-reviewed unchecked
     * conversions. In this case producers of SafeScript must ensure themselves that
     * the SafeScript does not contain unsafe script. Note in particular that
     * {@code &lt;} is dangerous, even when inside JavaScript strings, and so should
     * always be forbidden or JavaScript escaped in user controlled input. For
     * example, if {@code &lt;/script&gt;&lt;script&gt;evil&lt;/script&gt;"} were
     * interpolated inside a JavaScript string, it would break out of the context
     * of the original script element and `evil` would execute. Also note
     * that within an HTML script (raw text) element, HTML character references,
     * such as "&lt;" are not allowed. See
     * http://www.w3.org/TR/html5/scripting-1.html#restrictions-for-contents-of-script-elements.
     *
     * @see goog.html.SafeScript#fromConstant
     * @final
     * @struct
     * @implements {goog.string.TypedString}
     */
    class SafeScript extends __SafeScript {}
    abstract class __SafeScript implements goog.string.TypedString {
        /**
         */
        constructor();

        /**
         * The contained value of this SafeScript.  The field has a purposely
         * ugly name to make (non-compiled) code that attempts to directly access this
         * field stand out.
         * @private {string}
         */
        private privateDoNotAccessOrElseSafeScriptWrappedValue_: any /*missing*/;

        /**
         * A type marker used to implement additional run-time type checking.
         * @see goog.html.SafeScript#unwrap
         * @const {!Object}
         * @private
         */
        private readonly SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_: any /*missing*/;

        /**
         * Called from createSafeScriptSecurityPrivateDoNotAccessOrElse(). This
         * method exists only so that the compiler can dead code eliminate static
         * fields (like EMPTY) when they're not accessed.
         * @param {string} script
         * @return {!goog.html.SafeScript}
         * @private
         */
        private initSecurityPrivateDoNotAccessOrElse_(script: string): goog.html.SafeScript;

        /**
         * Interface marker of the TypedString interface.
         *
         * This property can be used to determine at runtime whether or not an object
         * implements this interface.  All implementations of this interface set this
         * property to `true`.
         * @type {boolean}
         */
        implementsGoogStringTypedString: boolean;

        /**
         * Retrieves this wrapped string's value.
         * @return {string} The wrapped string's value.
         */
        getTypedStringValue(): string;
    }
}

declare namespace goog.html.SafeScript {
    /**
     * Creates a SafeScript object from a compile-time constant string.
     *
     * @param {!goog.string.Const} script A compile-time-constant string from which
     *     to create a SafeScript.
     * @return {!goog.html.SafeScript} A SafeScript object initialized to
     *     `script`.
     */
    function fromConstant(script: goog.string.Const): goog.html.SafeScript;

    /**
     * Creates a SafeScript from a compile-time constant string but with arguments
     * that can vary at run-time. The code argument should be formatted as an
     * inline function (see example below). The arguments will be JSON-encoded and
     * provided as input to the function specified in code.
     *
     * Example Usage:
     *
     *     let safeScript = SafeScript.fromConstantAndArgs(
     *         Const.from('function(arg1, arg2) { doSomething(arg1, arg2); }'),
     *         arg1,
     *         arg2);
     *
     * This produces a SafeScript equivalent to the following:
     *
     *     (function(arg1, arg2) { doSomething(arg1, arg2); })("value1", "value2");
     *
     * @param {!goog.string.Const} code
     * @param {...*} var_args
     * @return {!goog.html.SafeScript}
     */
    function fromConstantAndArgs(code: goog.string.Const, ...var_args: any[]): goog.html.SafeScript;

    /**
     * Performs a runtime check that the provided object is indeed a
     * SafeScript object, and returns its value.
     *
     * @param {!goog.html.SafeScript} safeScript The object to extract from.
     * @return {string} The safeScript object's contained string, unless
     *     the run-time type check fails. In that case, `unwrap` returns an
     *     innocuous string, or, if assertions are enabled, throws
     *     `goog.asserts.AssertionError`.
     */
    function unwrap(safeScript: goog.html.SafeScript): string;

    /**
     * Package-internal utility method to create SafeScript instances.
     *
     * @param {string} script The string to initialize the SafeScript object with.
     * @return {!goog.html.SafeScript} The initialized SafeScript object.
     * @package
     */
    function createSafeScriptSecurityPrivateDoNotAccessOrElse(script: string): goog.html.SafeScript;

    /**
     * A SafeScript instance corresponding to the empty string.
     * @const {!goog.html.SafeScript}
     */
    const EMPTY: any /*missing*/;
}
