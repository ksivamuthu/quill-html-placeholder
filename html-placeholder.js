'use strict';

( function loadQuillHTMLPlaceholderModule() {
  var Placeholder = function( quill, options ) {
      this.quill    = quill;
      this.options  = options;
      this.html     = options.html  || '';

      var handler   = this.placeholderHandler.bind(this);

      quill.on( 'selection-change', handler );
      quill.placeholder = this.html;
  };

  Placeholder.prototype.isEmpty = function isEmpty() {
      var length      = this.quill.getLength();
      var currentText = this.quill.getHTML();
      var result      = ( length === 1 ) || ( currentText === this.html );
      return result;
  };

  Placeholder.prototype.addPlaceholder = function addPlaceholder() {
      var placeholder = this.html;
      this.quill.setHTML( placeholder );
  };

  Placeholder.prototype.removePlaceholder = function removePlaceholder() {
    this.quill.setHTML( '' );
  };

  Placeholder.prototype.placeholderHandler = function placeholderHandler( range ) {
    if ( !range ) {
      if ( this.isEmpty() ) {
        this.addPlaceholder();
      }
    } else {
      if ( this.isEmpty() ) {
        this.removePlaceholder();
      }
    }
  };
  Placeholder.prototype.initialize = Placeholder.prototype.placeholderHandler;

  window.Quill.registerModule( 'html-placeholder', Placeholder );
} )();

// To make it work in phantomjs karma tests
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
