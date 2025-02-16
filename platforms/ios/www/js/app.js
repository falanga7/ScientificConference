// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('scientificConference', ['ionic', 'scientificConference.controllers','ionic.native','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {


      // Ios requires permissions to make notifications

      if(device.platform === "iOS") {
          window.plugin.notification.local.promptForPermission();
      }


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($ionicConfigProvider,$stateProvider, $urlRouterProvider) {


  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.program', {
    url: '/program',
    views: {
      'tab-program': {
        templateUrl: 'templates/tab-program.html',
        controller: 'ProgramCtrl'
      }
    }
  })


  .state('tab.info', {
      url: '/info',
      views: {
        'tab-info': {
          templateUrl: 'templates/tab-info.html',
          controller: 'InfoCtrl'
        }
      }
    })

  .state('tab.participants', {
      url: '/participants',
      views: {
          'tab-participants': {
              templateUrl: 'templates/tab-participants.html',
              controller: 'ParticipantsCtrl'
          }
      }
  })
    .state('map', {
            url: '/map',
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/info');

});
