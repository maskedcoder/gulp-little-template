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

    var expectedFileWithEmbed = new gutil.File({
        path: 'test/expected/outputWithEmbeddedTemplate.html',
        cwd: 'test/',
        base: 'test/expected',
        // This avoids issues like git and editors automatically adding spaces to files
        contents: new Buffer('<!DOCTYPE html>\n<html>\n  <head>\n    <title>Test</title>\n  </head>\n  <body>\n    <h1>This page contains a template</h1>\n    <h2>The test was successful</h2>\n<p>Testing...</p>\n\n        <p>This is <b>cool</b>.</p>\r\n\n      \n<ul>\n    <li>one</li>\n    <li>two</li>\n    <li>three</li>\n</ul>\n\n  </body>\n</html>\n')
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

    it('should throw error when syntax is incorrect', function (done) {

        var srcFile = new gutil.File({
            path: 'test/fixtures/nok.html',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.readFileSync('test/fixtures/nok.html')
        });

        var stream = little({
          path: 'test/fixtures/templates',
          render: function (template, context, templateName) {
            return mustache.render(template, context);
          }
        });

        stream.on('error', function (err) {
            should.exist(err);
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

  it('should produce correct html output with a specific file extension', function (done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/ok.html')
    });


    var stream = little({
      path: 'test/fixtures/templates',
      ext: '.txt',
      render: function (template, context, templateName) {
        return mustache.render(template, context);
      }
    });

    stream.on('error', function (err) {
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
    String(path.extname(srcFile.path)).should.equal('.txt');

    stream.end();
  });

  it('should produce correct html output using embedded templates', function (done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/withEmbeddedTemplate.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/withEmbeddedTemplate.html')
    });


    var stream = little({
      path: 'test/fixtures/templates',
      render: function (template, context, templateName) {
        return mustache.render(template, context);
      }
    });

    stream.on('data', function (newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFileWithEmbed.contents));
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

});
