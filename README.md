# gulp-little-template
> Generate static HTML files with [Little Template](https://github.com/maskedcoder/little-template)

## Usage

### `src/world.html`

```html
<html>
<body>
{{#template greet.ejs}}
  {{#var who}}world{{/var}}
{{/template}}
</body>
</html>
```

### `templates/greet.ejs`

```
<h1>Hello, <%= who %>!</h1>
```

### `gulpfile.js`

```javascript
var gulp = require('gulp');
var littleTemplate = require('gulp-little-template');
var ejs = require('ejs');

gulp.task('default', function () {
  return gulp.src('src/greeting.html')
    .pipe(littleTemplate({
      path: 'templates',
      render: function (templateText, context, templateName) {
        return ejs.render(templateText, {locals: context, filename: templateName});
      }
    }))
    .pipe(gulp.dest('dist'));
});
```

### `dist/world.html`

```html
<html>
<body>
<h1>Hello, world!</h1>
</body>
</html>
```

## API

### littleTemplate(options)

#### options
Type: `hash`
Default: `{ext: '.html'}`

A hash object to configure the plugin.

##### options.render
Type: `Function (String, hash, String) -> String`
**Required**

A function to handle rendering any templates referenced in the HTML. The arguments are:
 - `String` **templateText** - the text of the template file referenced
 - `hash` **context** - A hash object where each key corresponds to a variable in your template
 - `String` **templateText** - the name of the template referenced
The function should return a String with the rendered template.

##### options.path
Type: `String`
Default `''`

Defines where to find the templates. If this is left out, you will need to include the
path in your source files, e.g. `{{#template path/to/template.jade}}`.

##### options.ext
Type: `String`
Default: `.html`

Defines the default file extension that will be appended to the filename.

## License

The MIT License (MIT)

Copyright (c) 2015 Andrew Myers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
