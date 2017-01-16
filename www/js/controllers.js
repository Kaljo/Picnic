/*
************************
UNCOMMENT databaseUrl VARIABLE WITH YOUR PATH TO DATABASE TO WORK
ALSO CHANGE CREDENTIALS IN db.php
databaseUrl VARIABLE IS DECLARED AT THE BOTTOM OF THIS FILE
*/

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $http, $rootScope) {

})

.controller('UsersCtrl', function($scope, $http, $rootScope) {

  $http.get(databaseUrl + "php/all_users.php")
  .success(function (response) {$rootScope.users = response.records;});

  $scope.remove = function(user) {

  };
})

.controller('HomeCtrl', function($scope, $http, $rootScope, $cordovaImagePicker, $ionicPlatform) {
    
    $rootScope.refreshHome = function(){

    setTimeout(function(){
      
      $http.get(databaseUrl + "php/notifications.php?RECEIVER_ID=2")
                .success(function (response) {$scope.notifications = response.records;});

      $http.get(databaseUrl + "php/upcoming_events.php?id=" + $rootScope.id)
                .success(function (response) {$scope.upcoming_events = response.records;});


        $scope.collection = {
            selectedImage : 'img/default_picture.png'
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

    }, 0); 
  };

  $rootScope.refreshHome();

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



})

.controller('GroupHomeCtrl', function($scope, $state, $http, $rootScope, $stateParams, $ionicPopover, $cordovaGeolocation, $ionicPopup) {
	 $scope.data = {
    productName: ''
  };
	
  $rootScope.refreshGroupHome = function(){

    setTimeout(function(){
      if($stateParams.id!= '')
        $scope.groupid=$stateParams.id;
      else if ($rootScope.last_joined != undefined)
          $scope.groupid=$rootScope.last_joined;
      else 
          $scope.groupid=$rootScope.newest_group.id;
     
      $http.get(databaseUrl + "php/get_group_id.php?id=" + $scope.groupid)
                .success(function (response) {$scope.group = response.records;});  
	    $http.get(databaseUrl + "php/get_group_admin.php?groupid=" + $scope.groupid)
                .success(function (response) {$scope.admin = response.records;}); 
	    $http.get(databaseUrl + "php/get_group_members.php?groupid=" + $scope.groupid)
      			.success(function (response) {$scope.members = response.records;
											                    $scope.nr_members=$scope.members.length;});
	    $http.get(databaseUrl + "php/get_group_products.php?groupid=" + $scope.groupid)
      			.success(function (response) {$scope.products = response.records;});
	    $http.get(databaseUrl + "php/get_group_products_reserved.php?groupid=" + $scope.groupid)
      			.success(function (response) {$scope.products_reserved = response.records;});
		$http.get(databaseUrl + "php/get_group_money.php?id=" + $scope.groupid)
      			.success(function (response) {$scope.moneyData = response.records;});
	    
    }, 0); 
  };

		

	var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		//Wait until the map is loaded
   google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Your location!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });      
 
  });
 
  }, function(error){
    console.log("Could not get location");
  });

		
	var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hidden popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


	 $scope.popover2 = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover2.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover2 = popover;
  });


  $scope.openPopover2 = function($event) {
    $scope.popover2.show($event);
  };
  $scope.closePopover2 = function() {
    $scope.popover2.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover2.remove();
  });
 
	$scope.addProduct = function (data) {

      $http.get(databaseUrl + "php/new_product.php?groupID=" + $scope.groupid + "&productName=" + $scope.data.productName +"")
      .success(function (response) { 
			    $scope.data.productName = "";
          $scope.names =$scope.datapointsList;
          
          if(typeof $rootScope.refreshGroupHome == 'function')
                $rootScope.refreshGroupHome();

          $state.go('app.group-home');
      });
  };


	$scope.setBuyer = function (buyer_info) {
		$scope.data= {};		
		var myPopup = $ionicPopup.show({
    template: '<input type="text" style="color:black" ng-model="data.productPrice">',
    title: 'Do you already know the price?',
    scope: $scope,
    buttons: [
      { text: 'No, later' },
      {
        text: '<b>Yes, save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.productPrice) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            $http.get(databaseUrl + "php/product_set_price.php?productID=" + buyer_info + "&productPrice=" + $scope.data.productPrice +"")
      .success(function (response) {});
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
	 $http.get(databaseUrl + "php/product_set_buyer.php?productID=" + buyer_info + "&buyer_userID=" + $rootScope.id +"")
      .success(function (response) {
          if(typeof $rootScope.refreshGroupHome == 'function')
                $rootScope.refreshGroupHome();

          $state.go('app.group-home');
      });
  });

  $timeout(function() {
     myPopup.close(); //close the popup after 7 seconds for some reason
  }, 7000);
 
  };

	$scope.unsetBuyer = function (buyer_info) {

      $http.get(databaseUrl + "php/product_unset_buyer.php?productID=" + buyer_info + "&buyer_userID=" + $rootScope.id +"")
      .success(function (response) {
            if(typeof $rootScope.refreshGroupHome == 'function')
              $rootScope.refreshGroupHome();

            $state.go('app.group-home');
      });
  };

	$scope.calculate = function () {

		var names = $scope.members.user_email;
		var nr_people = $scope.nr_members;
		$scope.arr=[];
		$scope.messages=[];

		
		$scope.arr=$scope.moneyData;
		$scope.total = 0;
			
			for (var i=0; i<nr_people; i++){
				var found=0;
				for(var j=0; j<$scope.arr.length; j++){
					if($scope.members[i].userid==$scope.arr[j].userid)
						found=1;
				}

				if(found==0) {
					var new_member = $scope.members[i];
					new_member.groupid = $scope.groupid;
					new_member.hasGiven=0;
					$scope.arr.push(new_member); }
			}
			
			for (var i=0; i<$scope.arr.length; i++){
				$scope.total = Math.round( ($scope.total + parseFloat( $scope.arr[i].hasGiven ) )*100)/100  ;
			}
			

		$scope.total = Number($scope.total).toFixed(2);
		var avg = $scope.total/nr_people;
		avg = Number(avg).toFixed(2);
        console.log("Total: " + $scope.total);

    //pravimo 5 Osoba cija imena imamo.
    for (let i=0; i<nr_people; i++){
      //ime imamo, names[i]
      //dao para
      
      var status = Math.round( (avg - parseFloat( $scope.arr[i].hasGiven ) )*100)/100; //da li je u plusu ili minusu neko
      //polje izbrisan sluzi kada "brisemo" coveka iz $scope.arra
     	$scope.arr[i].status = status;
    }

	/*
    //racunanje resta ako je ukupno dato vise para
    var sum = 0;
    for (let j=0;j<$scope.arr.length;j++){
      sum = parseFloat(sum) + parseFloat($scope.arr[j].hasGiven);
    }
    var rest = sum - $scope.total;
    if (rest<0){
      console.log("Nije dato dovoljno novca!");
      return;
    }
    //rest cemo dati onome kome je najmanji status negativni
    var min=0;
    var index = 0;
    for (let i=0;i<$scope.arr.length;i++){
      if ($scope.arr[i].status<min){
        min = $scope.arr[i].status;
        index = i;
      }
    }
    console.log($scope.arr[index].user_email + " treba da uzme rest od " + rest + "din.")
    $scope.arr[index].status += rest;
    //ako svi statusi u zbiru nisu =0 onda znaci da ima greske pri unosu cena
    var sumStatus=0;
    for (let i=0;i<$scope.arr.length;i++){
      sumStatus+= $scope.arr[i].status;
    }
	
    if (sumStatus!=0){
      console.log(sumStatus);
     // return;
    }
	*/
//-----------------------------------------------------------------------------------------------------------
    //prolazimo kroz $scope.arr
    var i =0;
      //I nacin raskusuravanja, ako tacno ima da se raskusura!!!!
      while(i<$scope.arr.length){
        while ( i<$scope.arr.length && $scope.arr[i].status==0){
          i++;
        }
        if (i<$scope.arr.length){
          var person1 = $scope.arr[i];
        }
        else {
          break;
        }
        //trazimo onog u $scope.arru koji ima tacno onoliko koliko -person1 da se odmah raskusuraju
        var j=i;
        while (j<$scope.arr.length && $scope.arr[j].status!=-person1.status){
          j++;
        }
        if (j<$scope.arr.length){
          //nasli smo coveka koji ima tacno koliko fali
          var person2 = $scope.arr[j];
          //person1 i person2 treba da zamene pare
          //onaj koji je u plusu treba da da pare
          if (person1.status>0){
            console.log(person1.user_email + " should give  " + person1.status + " to " + person2.user_email);
			var message = person1.user_email + " should give  " + person1.status + " to " + person2.user_email;
			$scope.messages.push(message);
          }
          else {
            console.log(person2.user_email + " should give  " + person2.status + " to " + person1.user_email);
			var message = person2.user_email + " should give  " + person1.status + " to " + person1.user_email;
			$scope.messages.push(message);
          }
          person1.status = 0;
          person2.status = 0;
        }
        i++;
      }
//-----------------------------------------------------------------------------------------------------------
      //II nacin za rasrestavanje ukoliko postoji element u $scope.arru kome status != 0
      //provera da li treba raditi ovo
      i=0;
      var goOn = 0;
      for (i=0;i<$scope.arr.length;i++){
        if ($scope.arr[i].status!=0){
          goOn = 1;
        }
      }
      if (goOn){
        i=0;
        while(i<$scope.arr.length){
          //trazimo prvi element kome je status>0
          while (i<$scope.arr.length && $scope.arr[i].status<=0){
            i++;
          }
          if (i<$scope.arr.length){
            var person1 = $scope.arr[i];
          }
          else {
            break;
          }
            //trazimo nekog ko ima status<trazimo
            j=0;
            while(j<$scope.arr.length && $scope.arr[j].status>-person1.status){
              j++;
            }
            if (j<$scope.arr.length){
              //znaci nasli smo nekoga ciji je status<trazimo
              var person2 = $scope.arr[j];
              person2.status += person1.status;
              console.log(person1.user_email + " should give " + person1.status + " to " + person2.user_email);
			  var message = person1.user_email + " should give  " + person1.status + " to " + person2.user_email;
			  $scope.messages.push(message);
              i=-1;
              person1.status=0;
            }
            i++;
        }
      }
//-----------------------------------------------------------------------------------------------------------
      //Provera da li treba raditi i na treci nacin!!!
      i=0;
      var goOn2 = 0;
      for (i=0;i<$scope.arr.length;i++){
        if ($scope.arr[i].status!=0){
          goOn2 = 1;
        }
      }
      if (goOn2){
        //znaci postoji mnogo ljudi po malo u minusu a neko mnogo u plusu
        //trazim prvog coveka u minusu i neko ko je u vecem plusu
        i=0;
        while(i<$scope.arr.length){
          while (i<$scope.arr.length && $scope.arr[i].status>=0){
            i++;
          }
          if (i<$scope.arr.length){
            var person1 = $scope.arr[i];
          }
          else {
            break;
          }
          var trazimo =Math.round( ( -person1.status)*100)/100;
          //trazimo coveka status>trazimo
          j=0;
          while(j<$scope.arr.length && $scope.arr[j].status<trazimo){
            j++;
          }
          if (j<$scope.arr.length){
            var person2 = $scope.arr[j];
            console.log(person2.user_email + " should give " + trazimo + " to " + person1.user_email);
			var message = person2.user_email + " should give  " + trazimo + " to " + person1.user_email;
			$scope.messages.push(message);

			person2.status = Math.round( ( person2.status -trazimo)*100)/100;
            person1.status = 0;
            i=-1;
          }
          i++;
        }
      }


            if(typeof $rootScope.refreshGroupHome == 'function')
              $rootScope.refreshGroupHome();

            $state.go('app.group-home');
      
  };

  $rootScope.refreshGroupHome();

})
.controller('GroupsCtrl', function($scope, $state, $filter, $http, $rootScope, $ionicPopup) {

  $rootScope.refreshGroups = function(){

    setTimeout(function(){
      
      $http.get(databaseUrl + "php/all_groups.php")
      .success(function (response) {$rootScope.groups = response.records;
		                                $scope.datapointsList = $rootScope.groups ;
		                                $scope.names = $rootScope.groups ; });
    }, 0); 
  };

	
	 $scope.names=$scope.datapointsList;
   $scope.adn = {};
	 $scope.srchchange = function () {

  $scope.names = null;
  var filtervalue = [];
	var serachData=$scope.datapointsList;

  for (var i = 0; i <serachData.length; i++) {

      var a=serachData[i].name.toLowerCase();
			var b=$scope.adn.item.toLowerCase();
            if (a.includes(b)) {
                filtervalue.push(serachData[i]);
            }
        }
        $scope.names = filtervalue;
  };

  $scope.ressetserach = function () {

      $scope.adn.item = "";
      $scope.names =$scope.datapointsList;
  }
	
  $rootScope.refreshGroups();

  $scope.showPopup = function(groupid) {
  $scope.data = {};

  $scope.groupid = groupid;
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
            $http.get(databaseUrl + "php/join_group.php?P='" + $scope.data.password + "'&GROUPID=" + $scope.groupid + "&USERID="+ $rootScope.id + "")
            .success(function (response) {$scope.resu = response.records;
              if($scope.resu.ok == '1'){
              $rootScope.last_joined = $scope.groupid;

              if(typeof $rootScope.refreshGroups == 'function')
                $rootScope.refreshGroups();
              if(typeof $rootScope.refreshMyGroups == 'function')
                $rootScope.refreshMyGroups();
              if(typeof $rootScope.refreshGroupHome == 'function')
                $rootScope.refreshGroupHome();
			        if(typeof $rootScope.refreshHome == 'function')
                $rootScope.refreshHome();

              $state.go('app.group-home');
            }
            else{
              $scope.showPopup1(groupid);
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
  
  $scope.showPopup1 = function(groupid) {
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
            $http.get(databaseUrl + "php/join_group.php?P=" + $scope.data.password + "&GROUPID=" + $scope.groupid + "&USERID="+ $rootScope.id + "")
            .success(function (response) {$scope.resu = response.records;
              if($scope.resu.ok == '1'){
              $rootScope.last_joined = $scope.groupid;

              if(typeof $rootScope.refreshGroups == 'function')
                $rootScope.refreshGroups();
              if(typeof $rootScope.refreshMyGroups == 'function')
                $rootScope.refreshMyGroups();
              if(typeof $rootScope.refreshGroupHome == 'function')
                $rootScope.refreshGroupHome();

              $state.go('app.group-home');
            }
            else{
              $scope.showPopup1(groupid);
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

.controller('MyGroupsCtrl', function( $scope, $http, $rootScope, $log) {

  $log.info($rootScope.id);

  $rootScope.refreshMyGroups = function(){

    setTimeout(function(){
      
      $http.get(databaseUrl + "php/my_groups.php?id=" + $rootScope.id)
        .success(function (response) {
          $scope.my_groups = response.records;
        });

    }, 0); 
  };

  $rootScope.refreshMyGroups();

  $scope.remove = function(group) {
    //Users.remove(group);
  };
  
})

.controller('UserDetailCtrl', function($rootScope, $scope, $stateParams, $http) {
  $scope.id = $stateParams.id;
  $http.get(databaseUrl + "php/get.php?id=" + $scope.id)
  .success(function (response) {$scope.user_detail = response.records;});
})

.controller("NewGroupCtrl", function($scope, $rootScope, $ionicPlatform, $state, $http, $cordovaDatePicker, $ionicTabsDelegate) {


  $ionicTabsDelegate.showBar(false);

  $scope.data = {
    name: '',
    location: '',
    date: '',
    password: '',
	description: ''
  };
  
  /* 
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
		*/
   $scope.addGroup = function (data) {

      $http.get(databaseUrl + "php/new_group.php?name=" + $scope.data.name + "&password=" + $scope.data.password + "&location=" + $scope.data.location + "&date=" + $scope.data.date + "&userid=" + $rootScope.id +"" + "&description=" + $scope.data.description)
      .success(function (response) {
          if(typeof $rootScope.refreshGroups == 'function')
                $rootScope.refreshGroups();
          if(typeof $rootScope.refreshMyGroups == 'function')
                $rootScope.refreshMyGroups();
          if(typeof $rootScope.refreshGroupHome == 'function')
                $rootScope.refreshGroupHome();

          $rootScope.newest_group = response.records;
          $state.go('app.group-home');
      });

  };       
  
})

.controller("RegisterCtrl", function($scope, $rootScope, $state, $http, $ionicTabsDelegate) {

  $ionicTabsDelegate.showBar(false);

  $scope.data = {
    email: '',
	  password: ''
  };
  
   $scope.register = function (data) {

      $http.get(databaseUrl + "php/register.php?EMAIL=" + $scope.data.email + "&password="  + $scope.data.password)
      .success(function (response) {

            $rootScope.id = response.records.id;
            $rootScope.email = $scope.data.email;
            $state.go('app.home');

      });
  }; 

  $scope.login = function (data) {

      $http.get(databaseUrl + "php/login.php?email=" + $scope.data.email + "&password="  + $scope.data.password)
      .success(function (response) {
			if(response.records.id!=-1){
				$rootScope.id = response.records.id;
           		$rootScope.email = $scope.data.email;
           		$state.go('app.home');
			}
			else
				$state.go('tab.register');          
      });
  };      
  
})

.controller('LoginCtrl', function($scope, $rootScope, $http, $state){

  $scope.data = {
    email: '',
    password: ''
  };

  $scope.login = function(){
    console.log('login called');
    $http.get(databaseUrl + "php/login.php?EMAIL=" + $scope.data.email)
      .success(function(response){
        $rootScope.id = response.records.id;
        $state.go('app.home');
      })
      .error(function(response){
        console.log('error');
        //should show message and stay on same page
      });

  }

});

//Kaljo's database location
//var databaseUrl = "http://localhost:8080/Picnic/";
//Neli's database location
//Nikola's datebase location
var databaseUrl = "http://localhost/";
//var databaseUrl = "http://localhost/~nelipetkova/picnic/";
