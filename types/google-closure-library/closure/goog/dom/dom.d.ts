/// <reference path="../../../globals.d.ts"/>
/// <reference path="./tagname.d.ts"/>
/// <reference path="../math/size.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../string/const.d.ts"/>

declare module 'goog:goog.dom' {
    export = goog.dom;
}

declare module 'goog:goog.dom.DomHelper' {
    import alias = goog.dom.DomHelper;
    export default alias;
}

declare module 'goog:goog.dom.Appendable' {
    import alias = goog.dom.Appendable;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Create an instance of a DOM helper with a new document object.
     */
    class DomHelper extends __DomHelper {}
    abstract class __DomHelper {
        /**
         * @param {Document=} opt_document Document object to associate with this
         *     DOM helper.
         */
        constructor(opt_document?: Document);

        /**
         * Reference to the document object to use
         * @type {!Document}
         * @private
         */
        private document_: Document;

        /**
         * Gets the dom helper object for the document where the element resides.
         * @param {Node=} opt_node If present, gets the DomHelper for this node.
         * @return {!goog.dom.DomHelper} The DomHelper.
         */
        getDomHelper(opt_node?: Node): goog.dom.DomHelper;

        /**
         * Sets the document object.
         * @param {!Document} document Document object.
         */
        setDocument(document: Document): void;

        /**
         * Gets the document object being used by the dom library.
         * @return {!Document} Document object.
         */
        getDocument(): Document;

        /**
         * Alias for `getElementById`. If a DOM node is passed in then we just
         * return that.
         * @param {string|Element} element Element ID or a DOM node.
         * @return {Element} The element with the given ID, or the node passed in.
         */
        getElement(element: string|Element): Element;

        /**
         * Gets an element by id, asserting that the element is found.
         *
         * This is used when an element is expected to exist, and should fail with
         * an assertion error if it does not (if assertions are enabled).
         *
         * @param {string} id Element ID.
         * @return {!Element} The element with the given ID, if it exists.
         */
        getRequiredElement(id: string): Element;

        /**
         * Alias for `getElement`.
         * @param {string|Element} element Element ID or a DOM node.
         * @return {Element} The element with the given ID, or the node passed in.
         * @deprecated Use {@link goog.dom.DomHelper.prototype.getElement} instead.
         */
        $(element: string|Element): Element;

        /**
         * Gets elements by tag name.
         * @param {!goog.dom.TagName<T>} tagName
         * @param {(!Document|!Element)=} opt_parent Parent element or document where to
         *     look for elements. Defaults to document of this DomHelper.
         * @return {!NodeList<R>} List of elements. The members of the list are
         *     {!Element} if tagName is not a member of goog.dom.TagName or more
         *     specific types if it is (e.g. {!HTMLAnchorElement} for
         *     goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         */
        getElementsByTagName<T, R>(tagName: goog.dom.TagName<T>, opt_parent?: Document|Element): NodeList;

        /**
         * Looks up elements by both tag and class name, using browser native functions
         * (`querySelectorAll`, `getElementsByTagName` or
         * `getElementsByClassName`) where possible. The returned array is a live
         * NodeList or a static list depending on the code path taken.
         *
         * @see goog.dom.query
         *
         * @param {(string|?goog.dom.TagName<T>)=} opt_tag Element tag name or * for all
         *     tags.
         * @param {?string=} opt_class Optional class name.
         * @param {(Document|Element)=} opt_el Optional element to look in.
         * @return {!IArrayLike<R>} Array-like list of elements (only a length property
         *     and numerical indices are guaranteed to exist). The members of the array
         *     are {!Element} if opt_tag is not a member of goog.dom.TagName or more
         *     specific types if it is (e.g. {!HTMLAnchorElement} for
         *     goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         */
        getElementsByTagNameAndClass<T, R>(
            opt_tag?: string|goog.dom.TagName<T>|null, opt_class?: string|null, opt_el?: Document|Element
        ): IArrayLike<R>;

        /**
         * Gets the first element matching the tag and the class.
         *
         * @param {(string|?goog.dom.TagName<T>)=} opt_tag Element tag name.
         * @param {?string=} opt_class Optional class name.
         * @param {(Document|Element)=} opt_el Optional element to look in.
         * @return {?R} Reference to a DOM node. The return type is {?Element} if
         *     tagName is a string or a more specific type if it is a member of
         *     goog.dom.TagName (e.g. {?HTMLAnchorElement} for goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         */
        getElementByTagNameAndClass<T, R>(
            opt_tag?: string|goog.dom.TagName<T>|null, opt_class?: string|null, opt_el?: Document|Element
        ): R|null;

        /**
         * Returns an array of all the elements with the provided className.
         * @see {goog.dom.query}
         * @param {string} className the name of the class to look for.
         * @param {Element|Document=} opt_el Optional element to look in.
         * @return {!IArrayLike<!Element>} The items found with the class name provided.
         */
        getElementsByClass(className: string, opt_el?: Element|Document): IArrayLike<Element>;

        /**
         * Returns the first element we find matching the provided class name.
         * @see {goog.dom.query}
         * @param {string} className the name of the class to look for.
         * @param {(Element|Document)=} opt_el Optional element to look in.
         * @return {Element} The first item found with the class name provided.
         */
        getElementByClass(className: string, opt_el?: Element|Document): Element;

        /**
         * Ensures an element with the given className exists, and then returns the
         * first element with the provided className.
         * @see {goog.dom.query}
         * @param {string} className the name of the class to look for.
         * @param {(!Element|!Document)=} opt_root Optional element or document to look
         *     in.
         * @return {!Element} The first item found with the class name provided.
         * @throws {goog.asserts.AssertionError} Thrown if no element is found.
         */
        getRequiredElementByClass(className: string, opt_root?: Element|Document): Element;

        /**
         * Alias for `getElementsByTagNameAndClass`.
         * @deprecated Use DomHelper getElementsByTagNameAndClass.
         * @see goog.dom.query
         *
         * @param {(string|?goog.dom.TagName<T>)=} opt_tag Element tag name.
         * @param {?string=} opt_class Optional class name.
         * @param {Element=} opt_el Optional element to look in.
         * @return {!IArrayLike<R>} Array-like list of elements (only a length property
         *     and numerical indices are guaranteed to exist). The members of the array
         *     are {!Element} if opt_tag is a string or more specific types if it is
         *     a member of goog.dom.TagName (e.g. {!HTMLAnchorElement} for
         *     goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         */
        $$<T, R>(opt_tag?: string|goog.dom.TagName<T>|null, opt_class?: string|null, opt_el?: Element): IArrayLike<R>;

        /**
         * Sets a number of properties on a node.
         * @param {Element} element DOM node to set properties on.
         * @param {Object} properties Hash of property:value pairs.
         */
        setProperties(element: Element, properties: Object): void;

        /**
         * Gets the dimensions of the viewport.
         * @param {Window=} opt_window Optional window element to test. Defaults to
         *     the window of the Dom Helper.
         * @return {!goog.math.Size} Object with values 'width' and 'height'.
         */
        getViewportSize(opt_window?: Window): goog.math.Size;

        /**
         * Calculates the height of the document.
         *
         * @return {number} The height of the document.
         */
        getDocumentHeight(): number;

        /**
         * Returns a dom node with a set of attributes.  This function accepts varargs
         * for subsequent nodes to be added.  Subsequent nodes will be added to the
         * first node as childNodes.
         *
         * So:
         * <code>createDom(goog.dom.TagName.DIV, null, createDom(goog.dom.TagName.P),
         * createDom(goog.dom.TagName.P));</code> would return a div with two child
         * paragraphs
         *
         * An easy way to move all child nodes of an existing element to a new parent
         * element is:
         * <code>createDom(goog.dom.TagName.DIV, null, oldElement.childNodes);</code>
         * which will remove all child nodes from the old element and add them as
         * child nodes of the new DIV.
         *
         * @param {string|!goog.dom.TagName<T>} tagName Tag to create.
         * @param {?Object|?Array<string>|string=} opt_attributes If object, then a map
         *     of name-value pairs for attributes. If a string, then this is the
         *     className of the new element. If an array, the elements will be joined
         *     together as the className of the new element.
         * @param {...goog.dom.Appendable} var_args Further DOM nodes or
         *     strings for text nodes. If one of the var_args is an array or
         *     NodeList, its elements will be added as childNodes instead.
         * @return {R} Reference to a DOM node. The return type is {!Element} if tagName
         *     is a string or a more specific type if it is a member of
         *     goog.dom.TagName (e.g. {!HTMLAnchorElement} for goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         */
        createDom<T, R>(
            tagName: string|goog.dom.TagName<T>,
            opt_attributes?: Object|null|string[]|null|string,
            ...var_args: goog.dom.Appendable[]
        ): R;

        /**
         * Alias for `createDom`.
         * @param {string|!goog.dom.TagName<T>} tagName Tag to create.
         * @param {?Object|?Array<string>|string=} opt_attributes If object, then a map
         *     of name-value pairs for attributes. If a string, then this is the
         *     className of the new element. If an array, the elements will be joined
         *     together as the className of the new element.
         * @param {...goog.dom.Appendable} var_args Further DOM nodes or strings for
         *     text nodes.  If one of the var_args is an array, its children will be
         *     added as childNodes instead.
         * @return {R} Reference to a DOM node. The return type is {!Element} if tagName
         *     is a string or a more specific type if it is a member of
         *     goog.dom.TagName (e.g. {!HTMLAnchorElement} for goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         * @deprecated Use {@link goog.dom.DomHelper.prototype.createDom} instead.
         */
        $dom<T, R>(
            tagName: string|goog.dom.TagName<T>,
            opt_attributes?: Object|null|string[]|null|string,
            ...var_args: goog.dom.Appendable[]
        ): R;

        /**
         * Creates a new element.
         * @param {string|!goog.dom.TagName<T>} name Tag to create.
         * @return {R} The new element. The return type is {!Element} if name is
         *     a string or a more specific type if it is a member of goog.dom.TagName
         *     (e.g. {!HTMLAnchorElement} for goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         */
        createElement<T, R>(name: string|goog.dom.TagName<T>): R;

        /**
         * Creates a new text node.
         * @param {number|string} content Content.
         * @return {!Text} The new text node.
         */
        createTextNode(content: number|string): Text;

        /**
         * Create a table.
         * @param {number} rows The number of rows in the table.  Must be >= 1.
         * @param {number} columns The number of columns in the table.  Must be >= 1.
         * @param {boolean=} opt_fillWithNbsp If true, fills table entries with
         *     `goog.string.Unicode.NBSP` characters.
         * @return {!HTMLElement} The created table.
         */
        createTable(rows: number, columns: number, opt_fillWithNbsp?: boolean): HTMLElement;

        /**
         * Converts an HTML into a node or a document fragment. A single Node is used if
         * `html` only generates a single node. If `html` generates multiple
         * nodes then these are put inside a `DocumentFragment`. This is a safe
         * version of `goog.dom.DomHelper#htmlToDocumentFragment` which is now
         * deleted.
         * @param {!goog.html.SafeHtml} html The HTML markup to convert.
         * @return {!Node} The resulting node.
         */
        safeHtmlToNode(html: goog.html.SafeHtml): Node;

        /**
         * Returns true if the browser is in "CSS1-compatible" (standards-compliant)
         * mode, false otherwise.
         * @return {boolean} True if in CSS1-compatible mode.
         */
        isCss1CompatMode(): boolean;

        /**
         * Gets the window object associated with the document.
         * @return {!Window} The window associated with the given document.
         */
        getWindow(): Window;

        /**
         * Gets the document scroll element.
         * @return {!Element} Scrolling element.
         */
        getDocumentScrollElement(): Element;

        /**
         * Gets the document scroll distance as a coordinate object.
         * @return {!goog.math.Coordinate} Object with properties 'x' and 'y'.
         */
        getDocumentScroll(): goog.math.Coordinate;

        /**
         * Determines the active element in the given document.
         * @param {Document=} opt_doc The document to look in.
         * @return {Element} The active element.
         */
        getActiveElement(opt_doc?: Document): Element;

        /**
         * Appends a child to a node.
         * @param {Node} parent Parent.
         * @param {Node} child Child.
         */
        appendChild(parent: Node, child: Node): void;

        /**
         * Appends a node with text or other nodes.
         * @param {!Node} parent The node to append nodes to.
         * @param {...goog.dom.Appendable} var_args The things to append to the node.
         *     If this is a Node it is appended as is.
         *     If this is a string then a text node is appended.
         *     If this is an array like object then fields 0 to length - 1 are appended.
         */
        append(parent: Node, ...var_args: goog.dom.Appendable[]): void;

        /**
         * Determines if the given node can contain children, intended to be used for
         * HTML generation.
         *
         * @param {Node} node The node to check.
         * @return {boolean} Whether the node can contain children.
         */
        canHaveChildren(node: Node): boolean;

        /**
         * Removes all the child nodes on a DOM node.
         * @param {Node} node Node to remove children from.
         */
        removeChildren(node: Node): void;

        /**
         * Inserts a new node before an existing reference node (i.e., as the previous
         * sibling). If the reference node has no parent, then does nothing.
         * @param {Node} newNode Node to insert.
         * @param {Node} refNode Reference node to insert before.
         */
        insertSiblingBefore(newNode: Node, refNode: Node): void;

        /**
         * Inserts a new node after an existing reference node (i.e., as the next
         * sibling). If the reference node has no parent, then does nothing.
         * @param {Node} newNode Node to insert.
         * @param {Node} refNode Reference node to insert after.
         */
        insertSiblingAfter(newNode: Node, refNode: Node): void;

        /**
         * Insert a child at a given index. If index is larger than the number of child
         * nodes that the parent currently has, the node is inserted as the last child
         * node.
         * @param {Element} parent The element into which to insert the child.
         * @param {Node} child The element to insert.
         * @param {number} index The index at which to insert the new child node. Must
         *     not be negative.
         */
        insertChildAt(parent: Element, child: Node, index: number): void;

        /**
         * Removes a node from its parent.
         * @param {Node} node The node to remove.
         * @return {Node} The node removed if removed; else, null.
         */
        removeNode(node: Node): Node;

        /**
         * Replaces a node in the DOM tree. Will do nothing if `oldNode` has no
         * parent.
         * @param {Node} newNode Node to insert.
         * @param {Node} oldNode Node to replace.
         */
        replaceNode(newNode: Node, oldNode: Node): void;

        /**
         * Flattens an element. That is, removes it and replace it with its children.
         * @param {Element} element The element to flatten.
         * @return {Element|undefined} The original element, detached from the document
         *     tree, sans children, or undefined if the element was already not in the
         *     document.
         */
        flattenElement(element: Element): Element|undefined;

        /**
         * Returns an array containing just the element children of the given element.
         * @param {Element} element The element whose element children we want.
         * @return {!(Array<!Element>|NodeList<!Element>)} An array or array-like list
         *     of just the element children of the given element.
         */
        getChildren(element: Element): Element[]|NodeList;

        /**
         * Returns the first child node that is an element.
         * @param {Node} node The node to get the first child element of.
         * @return {Element} The first child node of `node` that is an element.
         */
        getFirstElementChild(node: Node): Element;

        /**
         * Returns the last child node that is an element.
         * @param {Node} node The node to get the last child element of.
         * @return {Element} The last child node of `node` that is an element.
         */
        getLastElementChild(node: Node): Element;

        /**
         * Returns the first next sibling that is an element.
         * @param {Node} node The node to get the next sibling element of.
         * @return {Element} The next sibling of `node` that is an element.
         */
        getNextElementSibling(node: Node): Element;

        /**
         * Returns the first previous sibling that is an element.
         * @param {Node} node The node to get the previous sibling element of.
         * @return {Element} The first previous sibling of `node` that is
         *     an element.
         */
        getPreviousElementSibling(node: Node): Element;

        /**
         * Returns the next node in source order from the given node.
         * @param {Node} node The node.
         * @return {Node} The next node in the DOM tree, or null if this was the last
         *     node.
         */
        getNextNode(node: Node): Node;

        /**
         * Returns the previous node in source order from the given node.
         * @param {Node} node The node.
         * @return {Node} The previous node in the DOM tree, or null if this was the
         *     first node.
         */
        getPreviousNode(node: Node): Node;

        /**
         * Whether the object looks like a DOM node.
         * @param {?} obj The object being tested for node likeness.
         * @return {boolean} Whether the object looks like a DOM node.
         */
        isNodeLike(obj: any): boolean;

        /**
         * Whether the object looks like an Element.
         * @param {?} obj The object being tested for Element likeness.
         * @return {boolean} Whether the object looks like an Element.
         */
        isElement(obj: any): boolean;

        /**
         * Returns true if the specified value is a Window object. This includes the
         * global window for HTML pages, and iframe windows.
         * @param {?} obj Variable to test.
         * @return {boolean} Whether the variable is a window.
         */
        isWindow(obj: any): boolean;

        /**
         * Returns an element's parent, if it's an Element.
         * @param {Element} element The DOM element.
         * @return {Element} The parent, or null if not an Element.
         */
        getParentElement(element: Element): Element;

        /**
         * Whether a node contains another node.
         * @param {Node} parent The node that should contain the other node.
         * @param {Node} descendant The node to test presence of.
         * @return {boolean} Whether the parent node contains the descendent node.
         */
        contains(parent: Node, descendant: Node): boolean;

        /**
         * Compares the document order of two nodes, returning 0 if they are the same
         * node, a negative number if node1 is before node2, and a positive number if
         * node2 is before node1.  Note that we compare the order the tags appear in the
         * document so in the tree <b><i>text</i></b> the B node is considered to be
         * before the I node.
         *
         * @param {Node} node1 The first node to compare.
         * @param {Node} node2 The second node to compare.
         * @return {number} 0 if the nodes are the same node, a negative number if node1
         *     is before node2, and a positive number if node2 is before node1.
         */
        compareNodeOrder(node1: Node, node2: Node): number;

        /**
         * Find the deepest common ancestor of the given nodes.
         * @param {...Node} var_args The nodes to find a common ancestor of.
         * @return {Node} The common ancestor of the nodes, or null if there is none.
         *     null will only be returned if two or more of the nodes are from different
         *     documents.
         */
        findCommonAncestor(...var_args: Node[]): Node;

        /**
         * Returns the owner document for a node.
         * @param {Node} node The node to get the document for.
         * @return {!Document} The document owning the node.
         */
        getOwnerDocument(node: Node): Document;

        /**
         * Cross browser function for getting the document element of an iframe.
         * @param {Element} iframe Iframe element.
         * @return {!Document} The frame content document.
         */
        getFrameContentDocument(iframe: Element): Document;

        /**
         * Cross browser function for getting the window of a frame or iframe.
         * @param {Element} frame Frame element.
         * @return {Window} The window associated with the given frame.
         */
        getFrameContentWindow(frame: Element): Window;

        /**
         * Sets the text content of a node, with cross-browser support.
         * @param {Node} node The node to change the text content of.
         * @param {string|number} text The value that should replace the node's content.
         */
        setTextContent(node: Node, text: string|number): void;

        /**
         * Gets the outerHTML of a node, which islike innerHTML, except that it
         * actually contains the HTML of the node itself.
         * @param {Element} element The element to get the HTML of.
         * @return {string} The outerHTML of the given element.
         */
        getOuterHtml(element: Element): string;

        /**
         * Finds the first descendant node that matches the filter function. This does
         * a depth first search.
         * @param {Node} root The root of the tree to search.
         * @param {function(Node) : boolean} p The filter function.
         * @return {Node|undefined} The found node or undefined if none is found.
         */
        findNode(root: Node, p: (_0: Node) => boolean): Node|undefined;

        /**
         * Finds all the descendant nodes that matches the filter function. This does a
         * depth first search.
         * @param {Node} root The root of the tree to search.
         * @param {function(Node) : boolean} p The filter function.
         * @return {Array<Node>} The found nodes or an empty array if none are found.
         */
        findNodes(root: Node, p: (_0: Node) => boolean): Node[];

        /**
         * Returns true if the element has a tab index that allows it to receive
         * keyboard focus (tabIndex >= 0), false otherwise.  Note that some elements
         * natively support keyboard focus, even if they have no tab index.
         * @param {!Element} element Element to check.
         * @return {boolean} Whether the element has a tab index that allows keyboard
         *     focus.
         */
        isFocusableTabIndex(element: Element): boolean;

        /**
         * Enables or disables keyboard focus support on the element via its tab index.
         * Only elements for which {@link goog.dom.isFocusableTabIndex} returns true
         * (or elements that natively support keyboard focus, like form elements) can
         * receive keyboard focus.  See http://go/tabindex for more info.
         * @param {Element} element Element whose tab index is to be changed.
         * @param {boolean} enable Whether to set or remove a tab index on the element
         *     that supports keyboard focus.
         */
        setFocusableTabIndex(element: Element, enable: boolean): void;

        /**
         * Returns true if the element can be focused, i.e. it has a tab index that
         * allows it to receive keyboard focus (tabIndex >= 0), or it is an element
         * that natively supports keyboard focus.
         * @param {!Element} element Element to check.
         * @return {boolean} Whether the element allows keyboard focus.
         */
        isFocusable(element: Element): boolean;

        /**
         * Returns the text contents of the current node, without markup. New lines are
         * stripped and whitespace is collapsed, such that each character would be
         * visible.
         *
         * In browsers that support it, innerText is used.  Other browsers attempt to
         * simulate it via node traversal.  Line breaks are canonicalized in IE.
         *
         * @param {Node} node The node from which we are getting content.
         * @return {string} The text content.
         */
        getTextContent(node: Node): string;

        /**
         * Returns the text length of the text contained in a node, without markup. This
         * is equivalent to the selection length if the node was selected, or the number
         * of cursor movements to traverse the node. Images & BRs take one space.  New
         * lines are ignored.
         *
         * @param {Node} node The node whose text content length is being calculated.
         * @return {number} The length of `node`'s text content.
         */
        getNodeTextLength(node: Node): number;

        /**
         * Returns the text offset of a node relative to one of its ancestors. The text
         * length is the same as the length calculated by
         * `goog.dom.getNodeTextLength`.
         *
         * @param {Node} node The node whose offset is being calculated.
         * @param {Node=} opt_offsetParent Defaults to the node's owner document's body.
         * @return {number} The text offset.
         */
        getNodeTextOffset(node: Node, opt_offsetParent?: Node): number;

        /**
         * Returns the node at a given offset in a parent node.  If an object is
         * provided for the optional third parameter, the node and the remainder of the
         * offset will stored as properties of this object.
         * @param {Node} parent The parent node.
         * @param {number} offset The offset into the parent node.
         * @param {Object=} opt_result Object to be used to store the return value. The
         *     return value will be stored in the form {node: Node, remainder: number}
         *     if this object is provided.
         * @return {Node} The node at the given offset.
         */
        getNodeAtOffset(parent: Node, offset: number, opt_result?: Object): Node;

        /**
         * Returns true if the object is a `NodeList`.  To qualify as a NodeList,
         * the object must have a numeric length property and an item function (which
         * has type 'string' on IE for some reason).
         * @param {Object} val Object to test.
         * @return {boolean} Whether the object is a NodeList.
         */
        isNodeList(val: Object): boolean;

        /**
         * Walks up the DOM hierarchy returning the first ancestor that has the passed
         * tag name and/or class name. If the passed element matches the specified
         * criteria, the element itself is returned.
         * @param {Node} element The DOM node to start with.
         * @param {?(goog.dom.TagName<T>|string)=} opt_tag The tag name to match (or
         *     null/undefined to match only based on class name).
         * @param {?string=} opt_class The class name to match (or null/undefined to
         *     match only based on tag name).
         * @param {number=} opt_maxSearchSteps Maximum number of levels to search up the
         *     dom.
         * @return {?R} The first ancestor that matches the passed criteria, or
         *     null if no match is found. The return type is {?Element} if opt_tag is
         *     not a member of goog.dom.TagName or a more specific type if it is (e.g.
         *     {?HTMLAnchorElement} for goog.dom.TagName.A).
         * @template T
         * @template R := cond(isUnknown(T), 'Element', T) =:
         */
        getAncestorByTagNameAndClass<T, R>(
            element: Node,
            opt_tag?: goog.dom.TagName<T>|string|null,
            opt_class?: string|null,
            opt_maxSearchSteps?: number
        ): R|null;

        /**
         * Walks up the DOM hierarchy returning the first ancestor that has the passed
         * class name. If the passed element matches the specified criteria, the
         * element itself is returned.
         * @param {Node} element The DOM node to start with.
         * @param {string} class The class name to match.
         * @param {number=} opt_maxSearchSteps Maximum number of levels to search up the
         *     dom.
         * @return {Element} The first ancestor that matches the passed criteria, or
         *     null if none match.
         */
        getAncestorByClass(element: Node, _class: string, opt_maxSearchSteps?: number): Element;

        /**
         * Walks up the DOM hierarchy returning the first ancestor that passes the
         * matcher function.
         * @param {Node} element The DOM node to start with.
         * @param {function(Node) : boolean} matcher A function that returns true if the
         *     passed node matches the desired criteria.
         * @param {boolean=} opt_includeNode If true, the node itself is included in
         *     the search (the first call to the matcher will pass startElement as
         *     the node to test).
         * @param {number=} opt_maxSearchSteps Maximum number of levels to search up the
         *     dom.
         * @return {Node} DOM node that matched the matcher, or null if there was
         *     no match.
         */
        getAncestor(
            element: Node, matcher: (_0: Node) => boolean, opt_includeNode?: boolean, opt_maxSearchSteps?: number
        ): Node;

        /**
         * Gets '2d' context of a canvas. Shortcut for canvas.getContext('2d') with a
         * type information.
         * @param {!HTMLCanvasElement} canvas
         * @return {!CanvasRenderingContext2D}
         */
        getCanvasContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
    }

    /**
     * Gets the DomHelper object for the document where the element resides.
     * @param {(Node|Window)=} opt_element If present, gets the DomHelper for this
     *     element.
     * @return {!goog.dom.DomHelper} The DomHelper.
     */
    function getDomHelper(opt_element?: Node|Window): goog.dom.DomHelper;

    /**
     * Gets the document object being used by the dom library.
     * @return {!Document} Document object.
     */
    function getDocument(): Document;

    /**
     * Gets an element from the current document by element id.
     *
     * If an Element is passed in, it is returned.
     *
     * @param {string|Element} element Element ID or a DOM node.
     * @return {Element} The element with the given ID, or the node passed in.
     */
    function getElement(element: string|Element): Element;

    /**
     * Gets an element by id, asserting that the element is found.
     *
     * This is used when an element is expected to exist, and should fail with
     * an assertion error if it does not (if assertions are enabled).
     *
     * @param {string} id Element ID.
     * @return {!Element} The element with the given ID, if it exists.
     */
    function getRequiredElement(id: string): Element;

    /**
     * Alias for getElement.
     * @param {string|Element} element Element ID or a DOM node.
     * @return {Element} The element with the given ID, or the node passed in.
     * @deprecated Use {@link goog.dom.getElement} instead.
     */
    function $(element: string|Element): Element;

    /**
     * Gets elements by tag name.
     * @param {!goog.dom.TagName<T>} tagName
     * @param {(!Document|!Element)=} opt_parent Parent element or document where to
     *     look for elements. Defaults to document.
     * @return {!NodeList<R>} List of elements. The members of the list are
     *     {!Element} if tagName is not a member of goog.dom.TagName or more
     *     specific types if it is (e.g. {!HTMLAnchorElement} for
     *     goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     */
    function getElementsByTagName<T>(tagName: goog.dom.TagName<T>, opt_parent?: Document|Element): NodeList;

    /**
     * Looks up elements by both tag and class name, using browser native functions
     * (`querySelectorAll`, `getElementsByTagName` or
     * `getElementsByClassName`) where possible. This function
     * is a useful, if limited, way of collecting a list of DOM elements
     * with certain characteristics.  `goog.dom.query` offers a
     * more powerful and general solution which allows matching on CSS3
     * selector expressions, but at increased cost in code size. If all you
     * need is particular tags belonging to a single class, this function
     * is fast and sleek.
     *
     * Note that tag names are case sensitive in the SVG namespace, and this
     * function converts opt_tag to uppercase for comparisons. For queries in the
     * SVG namespace you should use querySelector or querySelectorAll instead.
     * https://bugzilla.mozilla.org/show_bug.cgi?id=963870
     * https://bugs.webkit.org/show_bug.cgi?id=83438
     *
     * @see {goog.dom.query}
     *
     * @param {(string|?goog.dom.TagName<T>)=} opt_tag Element tag name.
     * @param {?string=} opt_class Optional class name.
     * @param {(Document|Element)=} opt_el Optional element to look in.
     * @return {!IArrayLike<R>} Array-like list of elements (only a length property
     *     and numerical indices are guaranteed to exist). The members of the array
     *     are {!Element} if opt_tag is not a member of goog.dom.TagName or more
     *     specific types if it is (e.g. {!HTMLAnchorElement} for
     *     goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     */
    function getElementsByTagNameAndClass<T, R>(
        opt_tag?: string|goog.dom.TagName<T>|null, opt_class?: string|null, opt_el?: Document|Element
    ): IArrayLike<R>;

    /**
     * Gets the first element matching the tag and the class.
     *
     * @param {(string|?goog.dom.TagName<T>)=} opt_tag Element tag name.
     * @param {?string=} opt_class Optional class name.
     * @param {(Document|Element)=} opt_el Optional element to look in.
     * @return {?R} Reference to a DOM node. The return type is {?Element} if
     *     tagName is a string or a more specific type if it is a member of
     *     goog.dom.TagName (e.g. {?HTMLAnchorElement} for goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     */
    function getElementByTagNameAndClass<T, R>(
        opt_tag?: string|goog.dom.TagName<T>|null, opt_class?: string|null, opt_el?: Document|Element
    ): R|null;

    /**
     * Returns a static, array-like list of the elements with the provided
     * className.
     * @see {goog.dom.query}
     * @param {string} className the name of the class to look for.
     * @param {(Document|Element)=} opt_el Optional element to look in.
     * @return {!IArrayLike<!Element>} The items found with the class name provided.
     */
    function getElementsByClass(className: string, opt_el?: Document|Element): IArrayLike<Element>;

    /**
     * Returns the first element with the provided className.
     * @see {goog.dom.query}
     * @param {string} className the name of the class to look for.
     * @param {Element|Document=} opt_el Optional element to look in.
     * @return {Element} The first item with the class name provided.
     */
    function getElementByClass(className: string, opt_el?: Element|Document): Element;

    /**
     * Ensures an element with the given className exists, and then returns the
     * first element with the provided className.
     * @see {goog.dom.query}
     * @param {string} className the name of the class to look for.
     * @param {!Element|!Document=} opt_root Optional element or document to look
     *     in.
     * @return {!Element} The first item with the class name provided.
     * @throws {goog.asserts.AssertionError} Thrown if no element is found.
     */
    function getRequiredElementByClass(className: string, opt_root?: Element|Document): Element;

    /**
     * Alias for `getElementsByTagNameAndClass`.
     * @param {(string|?goog.dom.TagName<T>)=} opt_tag Element tag name.
     * @param {?string=} opt_class Optional class name.
     * @param {Element=} opt_el Optional element to look in.
     * @return {!IArrayLike<R>} Array-like list of elements (only a length property
     *     and numerical indices are guaranteed to exist). The members of the array
     *     are {!Element} if opt_tag is not a member of goog.dom.TagName or more
     *     specific types if it is (e.g. {!HTMLAnchorElement} for
     *     goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     * @deprecated Use {@link goog.dom.getElementsByTagNameAndClass} instead.
     */
    function $$<T, R>(opt_tag?: string|goog.dom.TagName<T>|null, opt_class?: string|null, opt_el?: Element):
        IArrayLike<R>;

    /**
     * Sets multiple properties, and sometimes attributes, on an element. Note that
     * properties are simply object properties on the element instance, while
     * attributes are visible in the DOM. Many properties map to attributes with the
     * same names, some with different names, and there are also unmappable cases.
     *
     * This method sets properties by default (which means that custom attributes
     * are not supported). These are the exeptions (some of which is legacy):
     * - "style": Even though this is an attribute name, it is translated to a
     *   property, "style.cssText". Note that this property sanitizes and formats
     *   its value, unlike the attribute.
     * - "class": This is an attribute name, it is translated to the "className"
     *   property.
     * - "for": This is an attribute name, it is translated to the "htmlFor"
     *   property.
     * - Entries in {@see goog.dom.DIRECT_ATTRIBUTE_MAP_} are set as attributes,
     *   this is probably due to browser quirks.
     * - "aria-*", "data-*": Always set as attributes, they have no property
     *   counterparts.
     *
     * @param {Element} element DOM node to set properties on.
     * @param {Object} properties Hash of property:value pairs.
     *     Property values can be strings or goog.string.TypedString values (such as
     *     goog.html.SafeUrl).
     */
    function setProperties(element: Element, properties: Object): void;

    /**
     * Gets the dimensions of the viewport.
     *
     * Gecko Standards mode:
     * docEl.clientWidth  Width of viewport excluding scrollbar.
     * win.innerWidth     Width of viewport including scrollbar.
     * body.clientWidth   Width of body element.
     *
     * docEl.clientHeight Height of viewport excluding scrollbar.
     * win.innerHeight    Height of viewport including scrollbar.
     * body.clientHeight  Height of document.
     *
     * Gecko Backwards compatible mode:
     * docEl.clientWidth  Width of viewport excluding scrollbar.
     * win.innerWidth     Width of viewport including scrollbar.
     * body.clientWidth   Width of viewport excluding scrollbar.
     *
     * docEl.clientHeight Height of document.
     * win.innerHeight    Height of viewport including scrollbar.
     * body.clientHeight  Height of viewport excluding scrollbar.
     *
     * IE6/7 Standards mode:
     * docEl.clientWidth  Width of viewport excluding scrollbar.
     * win.innerWidth     Undefined.
     * body.clientWidth   Width of body element.
     *
     * docEl.clientHeight Height of viewport excluding scrollbar.
     * win.innerHeight    Undefined.
     * body.clientHeight  Height of document element.
     *
     * IE5 + IE6/7 Backwards compatible mode:
     * docEl.clientWidth  0.
     * win.innerWidth     Undefined.
     * body.clientWidth   Width of viewport excluding scrollbar.
     *
     * docEl.clientHeight 0.
     * win.innerHeight    Undefined.
     * body.clientHeight  Height of viewport excluding scrollbar.
     *
     * Opera 9 Standards and backwards compatible mode:
     * docEl.clientWidth  Width of viewport excluding scrollbar.
     * win.innerWidth     Width of viewport including scrollbar.
     * body.clientWidth   Width of viewport excluding scrollbar.
     *
     * docEl.clientHeight Height of document.
     * win.innerHeight    Height of viewport including scrollbar.
     * body.clientHeight  Height of viewport excluding scrollbar.
     *
     * WebKit:
     * Safari 2
     * docEl.clientHeight Same as scrollHeight.
     * docEl.clientWidth  Same as innerWidth.
     * win.innerWidth     Width of viewport excluding scrollbar.
     * win.innerHeight    Height of the viewport including scrollbar.
     * frame.innerHeight  Height of the viewport exluding scrollbar.
     *
     * Safari 3 (tested in 522)
     *
     * docEl.clientWidth  Width of viewport excluding scrollbar.
     * docEl.clientHeight Height of viewport excluding scrollbar in strict mode.
     * body.clientHeight  Height of viewport excluding scrollbar in quirks mode.
     *
     * @param {Window=} opt_window Optional window element to test.
     * @return {!goog.math.Size} Object with values 'width' and 'height'.
     */
    function getViewportSize(opt_window?: Window): goog.math.Size;

    /**
     * Calculates the height of the document.
     *
     * @return {number} The height of the current document.
     */
    function getDocumentHeight(): number;

    /**
     * Calculates the height of the document of the given window.
     *
     * @param {!Window} win The window whose document height to retrieve.
     * @return {number} The height of the document of the given window.
     */
    function getDocumentHeightForWindow(win: Window): number;

    /**
     * Gets the page scroll distance as a coordinate object.
     *
     * @param {Window=} opt_window Optional window element to test.
     * @return {!goog.math.Coordinate} Object with values 'x' and 'y'.
     * @deprecated Use {@link goog.dom.getDocumentScroll} instead.
     */
    function getPageScroll(opt_window?: Window): goog.math.Coordinate;

    /**
     * Gets the document scroll distance as a coordinate object.
     *
     * @return {!goog.math.Coordinate} Object with values 'x' and 'y'.
     */
    function getDocumentScroll(): goog.math.Coordinate;

    /**
     * Gets the document scroll element.
     * @return {!Element} Scrolling element.
     */
    function getDocumentScrollElement(): Element;

    /**
     * Gets the window object associated with the given document.
     *
     * @param {Document=} opt_doc  Document object to get window for.
     * @return {!Window} The window associated with the given document.
     */
    function getWindow(opt_doc?: Document): Window;

    /**
     * Returns a dom node with a set of attributes.  This function accepts varargs
     * for subsequent nodes to be added.  Subsequent nodes will be added to the
     * first node as childNodes.
     *
     * So:
     * <code>createDom(goog.dom.TagName.DIV, null, createDom(goog.dom.TagName.P),
     * createDom(goog.dom.TagName.P));</code> would return a div with two child
     * paragraphs
     *
     * For passing properties, please see {@link goog.dom.setProperties} for more
     * information.
     *
     * @param {string|!goog.dom.TagName<T>} tagName Tag to create.
     * @param {?Object|?Array<string>|string=} opt_attributes If object, then a map
     *     of name-value pairs for attributes. If a string, then this is the
     *     className of the new element. If an array, the elements will be joined
     *     together as the className of the new element.
     * @param {...(Object|string|Array|NodeList)} var_args Further DOM nodes or
     *     strings for text nodes. If one of the var_args is an array or NodeList,
     *     its elements will be added as childNodes instead.
     * @return {R} Reference to a DOM node. The return type is {!Element} if tagName
     *     is a string or a more specific type if it is a member of
     *     goog.dom.TagName (e.g. {!HTMLAnchorElement} for goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     */
    function createDom<T, R>(
        tagName: string|goog.dom.TagName<T>,
        opt_attributes?: Object|null|string[]|null|string,
        ...var_args: (Object|string|any[]|NodeList)[]
    ): R;

    /**
     * Alias for `createDom`.
     * @param {string|!goog.dom.TagName<T>} tagName Tag to create.
     * @param {?Object|?Array<string>|string=} opt_attributes If object, then a map
     *     of name-value pairs for attributes. If a string, then this is the
     *     className of the new element. If an array, the elements will be joined
     *     together as the className of the new element.
     * @param {...(Object|string|Array|NodeList)} var_args Further DOM nodes or
     *     strings for text nodes. If one of the var_args is an array, its
     *     children will be added as childNodes instead.
     * @return {R} Reference to a DOM node. The return type is {!Element} if tagName
     *     is a string or a more specific type if it is a member of
     *     goog.dom.TagName (e.g. {!HTMLAnchorElement} for goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     * @deprecated Use {@link goog.dom.createDom} instead.
     */
    function $dom<T, R>(
        tagName: string|goog.dom.TagName<T>,
        opt_attributes?: Object|null|string[]|null|string,
        ...var_args: (Object|string|any[]|NodeList)[]
    ): R;

    /**
     * Creates a new element.
     * @param {string|!goog.dom.TagName<T>} name Tag to create.
     * @return {R} The new element. The return type is {!Element} if name is
     *     a string or a more specific type if it is a member of goog.dom.TagName
     *     (e.g. {!HTMLAnchorElement} for goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     */
    function createElement<T, R>(name: string|goog.dom.TagName<T>): R;

    /**
     * Creates a new text node.
     * @param {number|string} content Content.
     * @return {!Text} The new text node.
     */
    function createTextNode(content: number|string): Text;

    /**
     * Create a table.
     * @param {number} rows The number of rows in the table.  Must be >= 1.
     * @param {number} columns The number of columns in the table.  Must be >= 1.
     * @param {boolean=} opt_fillWithNbsp If true, fills table entries with
     *     `goog.string.Unicode.NBSP` characters.
     * @return {!Element} The created table.
     */
    function createTable(rows: number, columns: number, opt_fillWithNbsp?: boolean): Element;

    /**
     * Creates a new Node from constant strings of HTML markup.
     * @param {...!goog.string.Const} var_args The HTML strings to concatenate then
     *     convert into a node.
     * @return {!Node}
     */
    function constHtmlToNode(...var_args: goog.string.Const[]): Node;

    /**
     * Converts HTML markup into a node. This is a safe version of
     * `goog.dom.htmlToDocumentFragment` which is now deleted.
     * @param {!goog.html.SafeHtml} html The HTML markup to convert.
     * @return {!Node} The resulting node.
     */
    function safeHtmlToNode(html: goog.html.SafeHtml): Node;

    /**
     * Returns true if the browser is in "CSS1-compatible" (standards-compliant)
     * mode, false otherwise.
     * @return {boolean} True if in CSS1-compatible mode.
     */
    function isCss1CompatMode(): boolean;

    /**
     * Determines if the given node can contain children, intended to be used for
     * HTML generation.
     *
     * IE natively supports node.canHaveChildren but has inconsistent behavior.
     * Prior to IE8 the base tag allows children and in IE9 all nodes return true
     * for canHaveChildren.
     *
     * In practice all non-IE browsers allow you to add children to any node, but
     * the behavior is inconsistent:
     *
     * <pre>
     *   var a = goog.dom.createElement(goog.dom.TagName.BR);
     *   a.appendChild(document.createTextNode('foo'));
     *   a.appendChild(document.createTextNode('bar'));
     *   console.log(a.childNodes.length);  // 2
     *   console.log(a.innerHTML);  // Chrome: "", IE9: "foobar", FF3.5: "foobar"
     * </pre>
     *
     * For more information, see:
     * http://dev.w3.org/html5/markup/syntax.html#syntax-elements
     *
     * TODO(user): Rename shouldAllowChildren() ?
     *
     * @param {Node} node The node to check.
     * @return {boolean} Whether the node can contain children.
     */
    function canHaveChildren(node: Node): boolean;

    /**
     * Appends a child to a node.
     * @param {Node} parent Parent.
     * @param {Node} child Child.
     */
    function appendChild(parent: Node, child: Node): void;

    /**
     * Appends a node with text or other nodes.
     * @param {!Node} parent The node to append nodes to.
     * @param {...goog.dom.Appendable} var_args The things to append to the node.
     *     If this is a Node it is appended as is.
     *     If this is a string then a text node is appended.
     *     If this is an array like object then fields 0 to length - 1 are appended.
     */
    function append(parent: Node, ...var_args: goog.dom.Appendable[]): void;

    /**
     * Removes all the child nodes on a DOM node.
     * @param {Node} node Node to remove children from.
     */
    function removeChildren(node: Node): void;

    /**
     * Inserts a new node before an existing reference node (i.e. as the previous
     * sibling). If the reference node has no parent, then does nothing.
     * @param {Node} newNode Node to insert.
     * @param {Node} refNode Reference node to insert before.
     */
    function insertSiblingBefore(newNode: Node, refNode: Node): void;

    /**
     * Inserts a new node after an existing reference node (i.e. as the next
     * sibling). If the reference node has no parent, then does nothing.
     * @param {Node} newNode Node to insert.
     * @param {Node} refNode Reference node to insert after.
     */
    function insertSiblingAfter(newNode: Node, refNode: Node): void;

    /**
     * Insert a child at a given index. If index is larger than the number of child
     * nodes that the parent currently has, the node is inserted as the last child
     * node.
     * @param {Element} parent The element into which to insert the child.
     * @param {Node} child The element to insert.
     * @param {number} index The index at which to insert the new child node. Must
     *     not be negative.
     */
    function insertChildAt(parent: Element, child: Node, index: number): void;

    /**
     * Removes a node from its parent.
     * @param {Node} node The node to remove.
     * @return {Node} The node removed if removed; else, null.
     */
    function removeNode(node: Node): Node;

    /**
     * Replaces a node in the DOM tree. Will do nothing if `oldNode` has no
     * parent.
     * @param {Node} newNode Node to insert.
     * @param {Node} oldNode Node to replace.
     */
    function replaceNode(newNode: Node, oldNode: Node): void;

    /**
     * Flattens an element. That is, removes it and replace it with its children.
     * Does nothing if the element is not in the document.
     * @param {Element} element The element to flatten.
     * @return {Element|undefined} The original element, detached from the document
     *     tree, sans children; or undefined, if the element was not in the document
     *     to begin with.
     */
    function flattenElement(element: Element): Element|undefined;

    /**
     * Returns an array containing just the element children of the given element.
     * @param {Element} element The element whose element children we want.
     * @return {!(Array<!Element>|NodeList<!Element>)} An array or array-like list
     *     of just the element children of the given element.
     */
    function getChildren(element: Element): Element[]|NodeList;

    /**
     * Returns the first child node that is an element.
     * @param {Node} node The node to get the first child element of.
     * @return {Element} The first child node of `node` that is an element.
     */
    function getFirstElementChild(node: Node): Element;

    /**
     * Returns the last child node that is an element.
     * @param {Node} node The node to get the last child element of.
     * @return {Element} The last child node of `node` that is an element.
     */
    function getLastElementChild(node: Node): Element;

    /**
     * Returns the first next sibling that is an element.
     * @param {Node} node The node to get the next sibling element of.
     * @return {Element} The next sibling of `node` that is an element.
     */
    function getNextElementSibling(node: Node): Element;

    /**
     * Returns the first previous sibling that is an element.
     * @param {Node} node The node to get the previous sibling element of.
     * @return {Element} The first previous sibling of `node` that is
     *     an element.
     */
    function getPreviousElementSibling(node: Node): Element;

    /**
     * Returns the next node in source order from the given node.
     * @param {Node} node The node.
     * @return {Node} The next node in the DOM tree, or null if this was the last
     *     node.
     */
    function getNextNode(node: Node): Node;

    /**
     * Returns the previous node in source order from the given node.
     * @param {Node} node The node.
     * @return {Node} The previous node in the DOM tree, or null if this was the
     *     first node.
     */
    function getPreviousNode(node: Node): Node;

    /**
     * Whether the object looks like a DOM node.
     * @param {?} obj The object being tested for node likeness.
     * @return {boolean} Whether the object looks like a DOM node.
     */
    function isNodeLike(obj: any): boolean;

    /**
     * Whether the object looks like an Element.
     * @param {?} obj The object being tested for Element likeness.
     * @return {boolean} Whether the object looks like an Element.
     */
    function isElement(obj: any): boolean;

    /**
     * Returns true if the specified value is a Window object. This includes the
     * global window for HTML pages, and iframe windows.
     * @param {?} obj Variable to test.
     * @return {boolean} Whether the variable is a window.
     */
    function isWindow(obj: any): boolean;

    /**
     * Returns an element's parent, if it's an Element.
     * @param {Element} element The DOM element.
     * @return {Element} The parent, or null if not an Element.
     */
    function getParentElement(element: Element): Element;

    /**
     * Whether a node contains another node.
     * @param {?Node|undefined} parent The node that should contain the other node.
     * @param {?Node|undefined} descendant The node to test presence of.
     * @return {boolean} Whether the parent node contains the descendent node.
     */
    function contains(parent: Node|null|undefined, descendant: Node|null|undefined): boolean;

    /**
     * Compares the document order of two nodes, returning 0 if they are the same
     * node, a negative number if node1 is before node2, and a positive number if
     * node2 is before node1.  Note that we compare the order the tags appear in the
     * document so in the tree <b><i>text</i></b> the B node is considered to be
     * before the I node.
     *
     * @param {Node} node1 The first node to compare.
     * @param {Node} node2 The second node to compare.
     * @return {number} 0 if the nodes are the same node, a negative number if node1
     *     is before node2, and a positive number if node2 is before node1.
     */
    function compareNodeOrder(node1: Node, node2: Node): number;

    /**
     * Find the deepest common ancestor of the given nodes.
     * @param {...Node} var_args The nodes to find a common ancestor of.
     * @return {Node} The common ancestor of the nodes, or null if there is none.
     *     null will only be returned if two or more of the nodes are from different
     *     documents.
     */
    function findCommonAncestor(...var_args: Node[]): Node;

    /**
     * Returns the owner document for a node.
     * @param {Node|Window} node The node to get the document for.
     * @return {!Document} The document owning the node.
     */
    function getOwnerDocument(node: Node|Window): Document;

    /**
     * Cross-browser function for getting the document element of a frame or iframe.
     * @param {Element} frame Frame element.
     * @return {!Document} The frame content document.
     */
    function getFrameContentDocument(frame: Element): Document;

    /**
     * Cross-browser function for getting the window of a frame or iframe.
     * @param {Element} frame Frame element.
     * @return {Window} The window associated with the given frame, or null if none
     *     exists.
     */
    function getFrameContentWindow(frame: Element): Window;

    /**
     * Sets the text content of a node, with cross-browser support.
     * @param {Node} node The node to change the text content of.
     * @param {string|number} text The value that should replace the node's content.
     */
    function setTextContent(node: Node, text: string|number): void;

    /**
     * Gets the outerHTML of a node, which islike innerHTML, except that it
     * actually contains the HTML of the node itself.
     * @param {Element} element The element to get the HTML of.
     * @return {string} The outerHTML of the given element.
     */
    function getOuterHtml(element: Element): string;

    /**
     * Finds the first descendant node that matches the filter function, using
     * a depth first search. This function offers the most general purpose way
     * of finding a matching element. You may also wish to consider
     * `goog.dom.query` which can express many matching criteria using
     * CSS selector expressions. These expressions often result in a more
     * compact representation of the desired result.
     * @see goog.dom.query
     *
     * @param {Node} root The root of the tree to search.
     * @param {function(Node) : boolean} p The filter function.
     * @return {Node|undefined} The found node or undefined if none is found.
     */
    function findNode(root: Node, p: (_0: Node) => boolean): Node|undefined;

    /**
     * Finds all the descendant nodes that match the filter function, using a
     * a depth first search. This function offers the most general-purpose way
     * of finding a set of matching elements. You may also wish to consider
     * `goog.dom.query` which can express many matching criteria using
     * CSS selector expressions. These expressions often result in a more
     * compact representation of the desired result.

     * @param {Node} root The root of the tree to search.
     * @param {function(Node) : boolean} p The filter function.
     * @return {!Array<!Node>} The found nodes or an empty array if none are found.
     */
    function findNodes(root: Node, p: (_0: Node) => boolean): Node[];

    /**
     * Returns true if the element has a tab index that allows it to receive
     * keyboard focus (tabIndex >= 0), false otherwise.  Note that some elements
     * natively support keyboard focus, even if they have no tab index.
     * @param {!Element} element Element to check.
     * @return {boolean} Whether the element has a tab index that allows keyboard
     *     focus.
     */
    function isFocusableTabIndex(element: Element): boolean;

    /**
     * Enables or disables keyboard focus support on the element via its tab index.
     * Only elements for which {@link goog.dom.isFocusableTabIndex} returns true
     * (or elements that natively support keyboard focus, like form elements) can
     * receive keyboard focus.  See http://go/tabindex for more info.
     * @param {Element} element Element whose tab index is to be changed.
     * @param {boolean} enable Whether to set or remove a tab index on the element
     *     that supports keyboard focus.
     */
    function setFocusableTabIndex(element: Element, enable: boolean): void;

    /**
     * Returns true if the element can be focused, i.e. it has a tab index that
     * allows it to receive keyboard focus (tabIndex >= 0), or it is an element
     * that natively supports keyboard focus.
     * @param {!Element} element Element to check.
     * @return {boolean} Whether the element allows keyboard focus.
     */
    function isFocusable(element: Element): boolean;

    /**
     * Returns the text content of the current node, without markup and invisible
     * symbols. New lines are stripped and whitespace is collapsed,
     * such that each character would be visible.
     *
     * In browsers that support it, innerText is used.  Other browsers attempt to
     * simulate it via node traversal.  Line breaks are canonicalized in IE.
     *
     * @param {Node} node The node from which we are getting content.
     * @return {string} The text content.
     */
    function getTextContent(node: Node): string;

    /**
     * Returns the text content of the current node, without markup.
     *
     * Unlike `getTextContent` this method does not collapse whitespaces
     * or normalize lines breaks.
     *
     * @param {Node} node The node from which we are getting content.
     * @return {string} The raw text content.
     */
    function getRawTextContent(node: Node): string;

    /**
     * Returns the text length of the text contained in a node, without markup. This
     * is equivalent to the selection length if the node was selected, or the number
     * of cursor movements to traverse the node. Images & BRs take one space.  New
     * lines are ignored.
     *
     * @param {Node} node The node whose text content length is being calculated.
     * @return {number} The length of `node`'s text content.
     */
    function getNodeTextLength(node: Node): number;

    /**
     * Returns the text offset of a node relative to one of its ancestors. The text
     * length is the same as the length calculated by goog.dom.getNodeTextLength.
     *
     * @param {Node} node The node whose offset is being calculated.
     * @param {Node=} opt_offsetParent The node relative to which the offset will
     *     be calculated. Defaults to the node's owner document's body.
     * @return {number} The text offset.
     */
    function getNodeTextOffset(node: Node, opt_offsetParent?: Node): number;

    /**
     * Returns the node at a given offset in a parent node.  If an object is
     * provided for the optional third parameter, the node and the remainder of the
     * offset will stored as properties of this object.
     * @param {Node} parent The parent node.
     * @param {number} offset The offset into the parent node.
     * @param {Object=} opt_result Object to be used to store the return value. The
     *     return value will be stored in the form {node: Node, remainder: number}
     *     if this object is provided.
     * @return {Node} The node at the given offset.
     */
    function getNodeAtOffset(parent: Node, offset: number, opt_result?: Object): Node;

    /**
     * Returns true if the object is a `NodeList`.  To qualify as a NodeList,
     * the object must have a numeric length property and an item function (which
     * has type 'string' on IE for some reason).
     * @param {Object} val Object to test.
     * @return {boolean} Whether the object is a NodeList.
     */
    function isNodeList(val: Object): boolean;

    /**
     * Walks up the DOM hierarchy returning the first ancestor that has the passed
     * tag name and/or class name. If the passed element matches the specified
     * criteria, the element itself is returned.
     * @param {Node} element The DOM node to start with.
     * @param {?(goog.dom.TagName<T>|string)=} opt_tag The tag name to match (or
     *     null/undefined to match only based on class name).
     * @param {?string=} opt_class The class name to match (or null/undefined to
     *     match only based on tag name).
     * @param {number=} opt_maxSearchSteps Maximum number of levels to search up the
     *     dom.
     * @return {?R} The first ancestor that matches the passed criteria, or
     *     null if no match is found. The return type is {?Element} if opt_tag is
     *     not a member of goog.dom.TagName or a more specific type if it is (e.g.
     *     {?HTMLAnchorElement} for goog.dom.TagName.A).
     * @template T
     * @template R := cond(isUnknown(T), 'Element', T) =:
     */
    function getAncestorByTagNameAndClass<T, R>(
        element: Node, opt_tag?: goog.dom.TagName<T>|string|null, opt_class?: string|null, opt_maxSearchSteps?: number
    ): R|null;

    /**
     * Walks up the DOM hierarchy returning the first ancestor that has the passed
     * class name. If the passed element matches the specified criteria, the
     * element itself is returned.
     * @param {Node} element The DOM node to start with.
     * @param {string} className The class name to match.
     * @param {number=} opt_maxSearchSteps Maximum number of levels to search up the
     *     dom.
     * @return {Element} The first ancestor that matches the passed criteria, or
     *     null if none match.
     */
    function getAncestorByClass(element: Node, className: string, opt_maxSearchSteps?: number): Element;

    /**
     * Walks up the DOM hierarchy returning the first ancestor that passes the
     * matcher function.
     * @param {Node} element The DOM node to start with.
     * @param {function(Node) : boolean} matcher A function that returns true if the
     *     passed node matches the desired criteria.
     * @param {boolean=} opt_includeNode If true, the node itself is included in
     *     the search (the first call to the matcher will pass startElement as
     *     the node to test).
     * @param {number=} opt_maxSearchSteps Maximum number of levels to search up the
     *     dom.
     * @return {Node} DOM node that matched the matcher, or null if there was
     *     no match.
     */
    function getAncestor(
        element: Node, matcher: (_0: Node) => boolean, opt_includeNode?: boolean, opt_maxSearchSteps?: number
    ): Node;

    /**
     * Determines the active element in the given document.
     * @param {Document} doc The document to look in.
     * @return {Element} The active element.
     */
    function getActiveElement(doc: Document): Element;

    /**
     * Gives the current devicePixelRatio.
     *
     * By default, this is the value of window.devicePixelRatio (which should be
     * preferred if present).
     *
     * If window.devicePixelRatio is not present, the ratio is calculated with
     * window.matchMedia, if present. Otherwise, gives 1.0.
     *
     * Some browsers (including Chrome) consider the browser zoom level in the pixel
     * ratio, so the value may change across multiple calls.
     *
     * @return {number} The number of actual pixels per virtual pixel.
     */
    function getPixelRatio(): number;

    /**
     * Gets '2d' context of a canvas. Shortcut for canvas.getContext('2d') with a
     * type information.
     * @param {!HTMLCanvasElement} canvas
     * @return {!CanvasRenderingContext2D}
     */
    function getCanvasContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D;

    /**
     * Typedef for use with goog.dom.createDom and goog.dom.append.
     * @typedef {Object|string|Array|NodeList}
     */
    type Appendable = Object|string|any[]|NodeList;
}
