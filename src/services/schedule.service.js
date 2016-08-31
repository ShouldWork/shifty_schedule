(function(){
    // var lists = [];
    // var listindex = 0;
    // var activeList;
    //

    angular.module('shiftyApp')
        .service('shiftyService',shiftyService);

    
    function shiftyService($state,$q, $log, $sessionStorage, $localStorage,$state,$mdToast,$firebaseObject,$firebaseArray,$firebaseAuth) {
		var self = this;
		self.showToast   = showToast;
		self.getToastMsg = getToastMsg; 
		self.getTechs    = getTechs; 
		self.getFilters  = getFilters; 
		self.logout 	 = logout; 		
		self.signIn 	 = signIn;
		self.getUser  	 = getUser(); 
		self.isLoggedIn  = false;
        self.tags        = {a: true,b: false};
		self.list 		 = undefined; 
		self.filterList	 = undefined;
		self.techList 	 = undefined; 
        // self.setTechsGroup = function() {
        //     console.log("Within myService->setFalseTag" + self.techList);
        //     self.tags.a = false;
        //     self.tags.b = false;
        //     getTechs();
        //     //how do I get the watch in MyCtrl to be triggered?
        // };
        getTechs();
        getFilters();

		// Toast setup and functions
		last = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};
		self.toastPos    = angular.extend({},last);
		self.getToastPos = function (){
			cleanUp();
			return Object.keys(self.toastPos)
				.filter(function(pos) { return self.toastPos[pos]; })
				.join(' ');
		};
		function showToast(message,delay){
			var pinTo = self.getToastPos(),
				msg = getToastMsg(message);
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position(pinTo)
					.hideDelay(delay || 2500)
			);
		}

		function getToastMsg(whatGet){
			return ($.isArray(whatGet)) ? getToastMsg(whatGet[Math.floor((Math.random() * whatGet.length - 1) + 1)]) : whatGet;
		}

		function cleanUp(){
			var current = self.toastPos;
			if ( current.bottom && last.top ) current.top = false;
			if ( current.top && last.bottom ) current.bottom = false;
			if ( current.right && last.left ) current.left = false;
			if ( current.left && last.right ) current.right = false;
			last = angular.extend({},current);
		}


		// getting lists
		function getTechs(){
			var techRef = firebase.database().ref('xactware').child('techs');
				console.log(self.techList = $firebaseArray(techRef));
   		 }		

   		 function getFilters(){
			var filterRef = firebase.database().ref('xactware').child('filters');
				console.log(self.filterList = $firebaseArray(filterRef));
   		 }


   		 // authentication

   	function logout(msg) {
            var auth = $firebaseAuth();
     //       var ref = new Firebase("https//shifty-4d692.firebaseio.com")
     //       var authData = ref.getAuth();
	    //if (authData) {
	    //	console.log("Authenticated user with uid:", authData.uid);
	    //} else {
	    //	console.log("Not Authenticated user with uid:", authData.uid);
	    //}
	    var providerUser = self.firebUser;
            var message = self.getToastMsg(msg);
            var profileref = firebase.database().ref("users").child(providerUser.uid);
            //var profileRef = ref.child(providerUser.uid);
	    self.user = $firebaseObject(profileRef);
	     if (!self.user.displayName) {
	            showToast("Logging out user... " + self.user.displayName + ".",1500);
	            profileRef.set({
	                lastLogout: firebase.database.SEerverValue.TIMESTAMP,
	                active: false
	            }).then(function () {
	                showToast(self.user.displayName + "'s profile updated.");
	            }, function () {
	                showToast("Logged out: This toast: " + self.user.diplayName);
	            });
	    	} 
            auth.$signOut();
            self.showToast( message + self.user.displayName);
            self.isLoggedIn = false;
            $localStorage.user = {
            	isLoggedIn: self.isLoggedIn,
            	displayName: false
            };
        };

        function signIn(provider,msg) {
            var auth = $firebaseAuth();
            return auth.$signInWithPopup(provider)
            	.then(loginSuccess)
            	.catch(loginError);

            // // login with provider
            // auth.$signInWithPopup(provider).then(function (firebaseUser) {
            //     self.displayName = firebaseUser.user.displayName;
            //     self.providerUser = firebaseUser.user;

            //     var ref = firebase.database().ref("users"),
            //         profileRef = ref.child(self.providerUser.uid);
            //     self.user = $firebaseObject(profileRef);
            //     self.user.$loaded().then(function () {
            //         if (!self.user.displayName) {
            //             self.showToast("Creating user...");
            //             profileRef.set({
            //                 displayName: self.providerUser.displayName,
            //                 email: self.providerUser.email,
            //                 photoURL: self.providerUser.photoURL,
            //                 chatColor: 'blue'
            //             }).then(function () {
            //                 self.showToast("New user created. Welcome, " + self.providerUser.displayName + "!");
            //             }, function () {
            //                 self.showToast("User could not be created.");
            //             });
            //         } else {
            //         	var message = getToastMsg(msg);
            //             self.showToast(message + self.providerUser.displayName);
            //         }
            //         $localStorage.user = self.user = self.providerUser.displayName; 
            //         return self.user;
            //     });
            // }).catch(function (error) {
            //     $log.log("Authentication failed:", error);
            // });
        }

        function getUser(){
            var user = $localStorage.user; 
            console.log(user);
            if (user !== undefined){
                return user; 
            } else {
                return false;
            }
        }

        function loginSuccess(firebaseUser,msg) {
            var deferred = $q.defer();
            // showToast(firebaseUser);
            console.log(msg);
            self.firebUser = firebaseUser; 
            var providerUser = firebaseUser.user ? firebaseUser.user : firebaseUser;
            var ref = firebase.database().ref("users");
            var profileRef = ref.child(providerUser.uid);
            self.user = $firebaseObject(profileRef);
            self.user.$loaded().then(function () {
                if (!self.user.displayName) {
                    showToast("Updating user... " + self.user.displayName + ".",1500);
                    profileRef.set({
                        displayName: providerUser.displayName || providerUser.email,
                        email: providerUser.email,
                        photoURL: providerUser.photoURL,
                        lastLogin: firebase.database.ServerValue.TIMESTAMP,
                        lastLogout: firebase.database.ServerValue.TIMESTAMP,
                        active: true
                    }).then(function () {
                        showToast(self.user.displayName + "'s profile updated.");
                    }, function () {
                        showToast("This toast: " + self.user.diplayName);
                    });
                } 
                self.isLoggedIn = true;
                self.userLoggedIn  = providerUser.displayName;
                $localStorage.user = {
                	displayName: self.userLoggedIn,
                	isLoggedIn: self.isLoggedIn
                }
		// $localStorage.user = self.userLoggedIn;
                deferred.resolve();
            });
            return deferred.promise;
        }

        function loginError(error) {
            showToast("Authentication failed:", error);
        }
    }
}());

			//   var data = snapshot.val();
			//   // data equals { "name": { "first": "Fred", "last": "Flintstone" }, "age": 53 }
			//   console.log(data);
			//   console.log(data[0].name);  // "Fred"
			//   console.log(data.level);  // 53
			// });
     	// };
