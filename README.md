# quill-html-placeholder
a module for use with the quilljs editor that inserts placeholder html into the editor

## Usage

Include placeholder.js into your project after you load Quill. Then, when you initialize your editor, include `placeholder` in your modules configuration, like so:

```javascript

var options = {
    modules: {
        placeholder: { html: "<div>Your Placeholder Here</div>"}
    }
};
var editor  = new Quill("#my-editor", options);
```

Then, initialize the placeholder text once the module is loaded. For this, you can use the 'onModuleLoad' event that Quill exposes.

```javascript

editor.onModuleLoad('html-placeholder', function(placeholder) {
    placeholder.initialize();
});

```
