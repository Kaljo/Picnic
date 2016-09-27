angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $http, $rootScope) {

})

.controller('UsersCtrl', function($scope, $http, $rootScope) {

  $http.get("http://localhost/~nelipetkova/picnic/php/all_users.php")
  .success(function (response) {$rootScope.users = response.records;});

  $scope.remove = function(user) {

  };
})

.controller('HomeCtrl', function($scope, $http, $rootScope, $cordovaImagePicker, $ionicPlatform) {

  $scope.now=new Date();

  $scope.morning1=new Date();
  $scope.morning1.setHours(5);
  $scope.morning1.setMinutes(0);

  $scope.morning2=new Date();
  $scope.morning2.setHours(12);
  $scope.morning2.setMinutes(0); 

  $scope.day=new Date();
  $scope.day.setHours(17);
  $scope.day.setMinutes(0); 

  $http.get("http://localhost/~nelipetkova/picnic/php/notifications.php?RECEIVER_ID=2")
            .success(function (response) {$scope.notifications = response.records;});

  $http.get("http://localhost/~nelipetkova/picnic/php/upcoming_events.php?id=2")
            .success(function (response) {$scope.upcoming_events = response.records;});


    $scope.collection = {
        selectedImage : ''
    };
 
    $ionicPlatform.ready(function() {
 
        $scope.getImageSaveContact = function() {       
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 80            // Higher is better
            };
 
            $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
 
                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.collection.selectedImage = base64;
                    });
                }
            }, function(error) {
                console.log('Error: ' + JSON.stringify(error));    // In case of error
            });
        };  
 
    }); 
 
    $scope.contact = {     // We will use it to save a contact

        "photos": [
            {
                "type": "base64",
                "value": $scope.collection.selectedImage
 
            }
        ]
    };           



})

.controller('GroupHomeCtrl', function($scope, $http, $rootScope, $stateParams) {
  if($stateParams.id!= '')
      $scope.groupid=$stateParams.id;
  else if ($rootScope.last_joined != undefined)
      $scope.groupid=$rootScope.last_joined;
   else 
      $scope.groupid=$rootScope.newest_group.id;
 
  $http.get("http://localhost/~nelipetkova/picnic/php/get_group_id.php?id=" + $scope.groupid)
            .success(function (response) {$scope.group = response.records;});


})
.controller('GroupsCtrl', function($scope, $state, $http, $rootScope, $ionicPopup) {

  $http.get("http://localhost/~nelipetkova/picnic/php/all_groups.php")
  .success(function (response) {$rootScope.groups = response.records;});

  $scope.showPopup = function(id) {
  $scope.data = {};

  $scope.id = id;
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.password">',
    title: 'Enter Group Password',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Confirm</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.password) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {    
            $http.get("http://localhost/~nelipetkova/picnic/php/join_group.php?P=" + $scope.data.password + "&GROUPID=" + id + "&USERID="+ $rootScope.id + "")
            .success(function (response) {$scope.resu = response.records;
              if($scope.resu.ok == '1'){
              $rootScope.last_joined = $scope.id;
              $state.go('app.group-home');
            }
            else{
              $scope.showPopup1(id);
            }
            });

            
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });


 };

   
  $scope.showPopup1 = function(id) {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.password">',
    title: 'Enter Group Password',
    subTitle: 'Wrong password! Please, try again.',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Confirm</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.password) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {    
            $http.get("http://localhost/~nelipetkova/picnic/php/join_group.php?P=" + $scope.data.password + "&GROUPID=" + id + "&USERID="+ $rootScope.id + "")
            .success(function (response) {$scope.resu = response.records;
              if($scope.resu.ok == '1'){
              $rootScope.last_joined = $scope.id;
              $state.go('app.group-home');
            }
            else{
              $scope.showPopup1(id);
            }
            });            
          }
        }
      }
    ]
  });

 };

  $scope.remove = function(group) {
     
  };
  
})

.controller('MyGroupsCtrl', function( $scope, $http, $rootScope) {

  $http.get("http://localhost/~nelipetkova/picnic/php/my_groups.php?id=" + $rootScope.id)
  .success(function (response) {$scope.my_groups = response.records;});

  $scope.remove = function(group) {
    //Users.remove(group);
  };
  
})

.controller('UserDetailCtrl', function($rootScope, $scope, $stateParams, $http) {
  $scope.id = $stateParams.id;
  $http.get("http://localhost/~nelipetkova/picnic/php/get.php?id=" + $scope.id)
  .success(function (response) {$scope.user_detail = response.records;});
})

.controller("NewGroupCtrl", function($scope, $rootScope, $ionicPlatform, $state, $http, $cordovaDatePicker, $ionicTabsDelegate) {


  $ionicTabsDelegate.showBar(false);

  $scope.data = {
    name: '',
    location: '',
    date: '',
    password: ''
  };
  
   
  $ionicPlatform.ready(function() {
      $scope.getDatePicker = function() {
         var options = {
            date: new Date(),
            mode: 'date', // or 'time'
            minDate: new Date() - 10000,
            allowOldDates: false,
            allowFutureDates: true,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
          };
         
         $cordovaDatePicker.show(options).then(function(date){

            $scope.m = date.getMonth();
            $scope.d = date.getDay();
            $scope.y = date.getFullYear();

            $scope.formated_date = $scope.y + "-" + $scope.m + "-" + $scope.d;
            $scope.data.date = $scope.formated_date;
        });
      };    
  });

   $scope.addGroup = function (data) {

      $http.get("http://localhost/~nelipetkova/picnic/php/new_group.php?name=" + $scope.data.name + "&password=" + $scope.data.password + "&location=" + $scope.data.location + "&date=" + $scope.data.date + "&userid=2" + "")
      .success(function (response) {
          $rootScope.newest_group = response.records;
          $state.go('app.group-home');
      });

  };       
  
})

.controller("RegisterCtrl", function($scope, $rootScope, $state, $http, $ionicTabsDelegate) {

  $ionicTabsDelegate.showBar(false);

  $scope.data = {
    email: ''
  };
  
   $scope.register = function (data) {

      $http.get("http://localhost/~nelipetkova/picnic/php/register.php?EMAIL=" + $scope.data.email + "")
      .success(function () {
            $http.get("http://localhost/~nelipetkova/picnic/php/get_email.php?EMAIL='" + $scope.data.email + "'")
            .success(function (response) {$scope.user = response.records;
                                          $rootScope.id = $scope.user.id;
                                          $rootScope.email = $scope.user.email;});

            
            $state.go('app.home');
      });
       $state.go('app.home');
  };       
  
});
