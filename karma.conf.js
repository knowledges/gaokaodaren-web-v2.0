module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'build/bower_components/angular/angular.js',
      'build/bower_components/angular-route/angular-route.js',
      'build/bower_components/angular-mocks/angular-mocks.js',
      'build/components/**/*.js',
      'build/view*/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
