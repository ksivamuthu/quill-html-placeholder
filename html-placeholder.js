'use strict';

( function loadQuillHTMLPlaceholderModule() {
  var Placeholder = function( quill, options ) {
      this.quill    = quill;
      this.options  = options;
      this.html     = options.html  || '';

      quill.on( 'selection-change', this.placeholderHandler );
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
