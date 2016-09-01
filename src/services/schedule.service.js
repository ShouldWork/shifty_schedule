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
            self.getTime     = getTime; 



        function getTime(){
            var date = new Date();
            var dateObject = date.getFullYear() +'/'+ ('0' + (date.getMonth() + 1)).slice(-2) +'/'+ ('0' + date.getDate()).slice(-2);
            return dateObject;
        }  

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
			var techRef = firebase.database().ref().child('xactware/techs');
            techRef.orderByKey().on("value", function(snapshot) {
                var data = snapshot.val();
                console.log(data);
                console.log(snapshot.key);
            });
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
	     if (self.user.displayName) {
            var lastLogin = new Date(firebase.database.ServerValue.TIMESTAMP * 1000),
                lastLogout = new Date(firebase.database.ServerValue.TIMESTAMP * 1000);
	            // showToast("Logging out user... " + self.user.displayName + ". Last logout: " + lastLogout,1500);
	            profileRef.child('lastLogout').set(lastLogout + 'Updated by Blake').then(function () {
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
            	.then(function(){
                console.log("Second then")
	            	self.isLoggedIn = true;
	              
	              $localStorage.user = {
	                	displayName: self.userLoggedIn,
	                	isLoggedIn: self.isLoggedIn
	                };
            	})
            	.catch(loginError);
        }

        function getUser(){
            var user = $localStorage.user; 
            console.log(user.isLoggedIn);
            if (user.isLoggedIn !== false){
                return self.isLoggedIn = true; 
            } else {
                return self.isLoggedIn = false;
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
            	var now = self.getTime();
                if (!self.user.displayName) {
                    profileRef.set({
                        filterColor: 'Blue',
                        displayName: providerUser.displayName || providerUser.email,
                        email: providerUser.email,
                        photoURL: providerUser.photoURL,
                        lastLogin: now,
                        lastLogout: firebase.database.ServerValue.TIMESTAMP,
                        active: true
                    }).then(function () {
                        showToast(self.user.displayName + "'s profile updated.",1500);
                    }, function () {
                        showToast("This toast: " + self.user.diplayName,1500);
                    });
                }
                self.userLoggedIn  = providerUser.displayName; 
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
