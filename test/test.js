'use strict';

var fs = require('fs'),
    should = require('should'),
    path = require('path');
require('mocha');

var gutil = require('gulp-util'),
    little = require('../'),
    mustache = require('./lib/mustache');

describe('gulp-little-template', function () {

    var expectedFile = new gutil.File({
        path: 'test/expected/output.html',
        cwd: 'test/',
        base: 'test/expected',
        contents: fs.readFileSync('test/expected/output.html')
    });

    it('should produce correct html output when rendering a file', function (done) {

        var srcFile = new gutil.File({
            path: 'test/fixtures/ok.html',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.readFileSync('test/fixtures/ok.html')
        });

        var stream = little({
          path: 'test/fixtures/templates',
          render: function (template, context, templateName) {
            return mustache.render(template, context);
          }
        });

        stream.on('error', function (err) {
          console.log(err);
            should.exist(err);
            done(err);
        });

        stream.on('data', function (newFile) {

            should.exist(newFile);
            should.exist(newFile.contents);

            String(newFile.contents).should.equal(String(expectedFile.contents));
            done();
        });

        stream.write(srcFile);
        String(path.extname(srcFile.path)).should.equal('.html');

      stream.end();
    });

});
