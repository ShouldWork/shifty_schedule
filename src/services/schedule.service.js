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
	    var firebaseUser = self.firebUser;
            var message = self.getToastMsg(msg);
            var providerUser = firebaseUser.user ? firebaseUser.user : firebaseUser;
            var ref = firebase.database().ref("users");
            var profileRef = ref.child(providerUser.uid);
            console.log(profileRef);
	    self.user = $firebaseObject(profileRef);
	     if (!self.user.displayName) {
	            showToast("Logging out user... " + self.user.displayName + ".",1500);
	            profileRef.set({
	            	displayName: providerUser.displayName || providerUser.email,
                        email: providerUser.email,
                        photoURL: providerUser.photoURL,
                        lastLogin: profileRef.child("lastLogin").val(),
	                lastLogout: new Date(firebase.database.ServerValue.TIMESTAMP).getTime(),
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
  function signIn() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // [START_EXCLUDE]
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      // [START_EXCLUDE]
      //document.getElementById('quickstart-sign-in').disabled = true;
      // [END_EXCLUDE]
    }
        function signInxx(provider,msg) {
            var auth = $firebaseAuth();
            return auth.$signInWithPopup(provider)
            	.then(loginSuccess)
            	.then(function(){
	            	self.isLoggedIn = true;
	                self.userLoggedIn  = providerUser.displayName;
	                $localStorage.user = {
	                	displayName: self.userLoggedIn,
	                	isLoggedIn: self.isLoggedIn
	                }
            	})
            	.catch(loginError);
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
            	 console.log(self.user.displayName);
                if (!self.user.displayName) {
                    showToast("Updating user... " + self.user.displayName + ".",1500);
                    console.log(profileRef);
                    profileRef.set({
                        displayName: providerUser.displayName || providerUser.email,
                        email: providerUser.email,
                        photoURL: providerUser.photoURL,
                        lastLogin: new Date(firebase.database.ServerValue.TIMESTAMP * 1000),
                        lastLogout: new Date(firebase.database.ServerValue.TIMESTAMP * 1000),
                        active: true
                    }).then(function () {
                        showToast(self.user.displayName + "'s profile updated.");
                    }, function () {
                        showToast("This toast: " + self.user.diplayName);
                    });
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
