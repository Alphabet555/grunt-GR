 /*
 * buddle-yo
 * 
 *
 * Copyright (c) 2015 AlphaBet
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path')

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddle', 'For your code', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who: 'buddle',
      commentSymbol: '//'
    });

    var who = options.who,
        commentSymbol = options.commentSymbol,
        commentFilePathMap = {
        'buddle': 'assets/buddle.txt'
      },
      commentFilePath = path.join(__dirname, commentFilePathMap[who] ),
      commentContent = grunt.file.read(commentFilePath),
      lineCommentArr = commentContent.split(grunt.util.normalizelf('\n')),
      fileTestRexgMap = {
        'buddle': /o8888888o/
      }

    lineCommentArr.forEach(function(value, index, arr ){
      arr[index] = commentSymbol + value 
    })

    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'))

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
          file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
            newFileContent = commentContent+ grunt.util.normalizelf('\n')+ originalFileContent

            if(fileTestRexgMap[who].test(originalFileContent)){
              return;
            }
            grunt.file.write(filepath, newFileContent)
      })
      

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
