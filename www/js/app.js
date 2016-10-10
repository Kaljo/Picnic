
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

   .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }  
  })

  .state('tab.register', {
    url: '/register',
    views: {
      'tab-register': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }  
  })



  .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-users.html',
          controller: 'UsersCtrl'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

      .state('app.group-home', {
      url: '/group-home/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/group-home.html',
          controller: 'GroupHomeCtrl'
        }
      }
    })

   .state('app.groups', {
      url: '/groups',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-groups.html',
          controller: 'GroupsCtrl'
        }
      }
    })

      .state('app.new_groups', {
      url: '/new_group',
      views: {
        'menuContent': {
          templateUrl: 'templates/new_group.html',
          controller: 'NewGroupCtrl'
        }
      }
    })

      .state('app.my_groups', {
      url: '/my_groups',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-my-groups.html',
          controller: 'MyGroupsCtrl'
        }
      }
    })

    .state('app.user-detail', {
      url: '/users/id=:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/user-detail.html',
          controller: 'UserDetailCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/register');

});
