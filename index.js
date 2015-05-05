'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var little = require('little-template');
var fs = require('fs');
var path = require('path');

/**
 * Render a string of HTML using Little Template
 *
 *  @param {Object|Function}  settings    Plugin settings, or a function to use to render templates. If an object is given, the value for 'render' must be a function to handle rendering templates.
 * @api public
 */
module.exports = function (settings) {
    settings = (typeof settings == 'function') ? {render: settings} : settings;
    settings.ext = typeof settings.ext === "undefined" ? ".html" : settings.ext;

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit(
                'error',
                new gutil.PluginError('gulp-little-template', 'Streaming not supported')
            );
        }

        try {
            file.contents = new Buffer(little(file.contents.toString(), function (templateName, context) {
              var filePath = (settings.path) ? path.join(settings.path, templateName) : templateName,
                  templateFile = fs.readFileSync(filePath, 'utf-8');

              return settings.render(templateFile, context, templateName);
            }));
            file.path = gutil.replaceExtension(file.path, settings.ext);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-little-template', err.toString()));
          throw err;
        }

        this.push(file);
        cb();
    });
};
