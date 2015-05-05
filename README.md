# gulp-little-template
> Generate static HTML files with [Little Template](https://github.com/maskedcoder/little-template)

## Usage

### `src/world.html`

```html
<html>
<body>
{{#template templates/greet.ejs}}
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
var template = require('gulp-little-template');
var ejs = require('ejs');
var fs = require('fs');

gulp.task('default', function () {
  return gulp.src('src/greeting.html')
    .pipe(template(function (templateName, context) {
      var file = fs.readFileSync(templateName, {encoding: 'utf-8'});

      return ejs.render(file, {locals: context, filename: templateName});
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
