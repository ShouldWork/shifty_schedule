(function(){
    angular.module('shiftyApp')
        .service('loginService',loginService);


        function loginService($q,$firebaseArray,$firebaseAuth,$firebaseObject,shiftyService){
        	var ls = this;
        	ls.signIn 	   = signIn;
        	ls.signOut	   = signOut;
        	ls.getTime	   = getTime;
        	// ls.signOut();
        	ls.isLoggedIn  = isLoggedIn();
        	ls.currentUser = setCurrentUser();
            ls.authDataCheck = authDataCheck();


            function authDataCheck(){
                firebase.auth().onAuthStateChanged(function(user){
                    if (user){
                        console.log("user is " + user.displayName)
                    }else{
                        console.log("failed")
                    }
                })
            }

        	function setCurrentUser(){
                var user = firebase.auth().currentUser,
                    name , email, photoURL, uid;
                if (user !== null){
                    ls.currentUser = {
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid
                    };
                    ls.isLoggedIn = true;
                    console.log(ls.currentUser) 
                } else{
                    ls.currentUser = undefined;
                    ls.isLoggedIn = false; 
                }
        	}

        	function signIn(provider){
	            var auth = $firebaseAuth();
	            return auth.$signInWithPopup(provider)
	            	.then(loginSuccess).then(function(){
	            		ls.isLoggedIn = isLoggedIn();
	            	})
	            	.catch(loginError);
        	}

        	function signOut(msg){
        		var auth = $firebaseAuth();
        		auth.$signOut();
        		ls.currentUser = undefined;
        		ls.isLoggedIn = isLoggedIn();
        		// console.log(self.isLoggedIn)
        	}

        	function loginSuccess(firebaseUser){
        		var deferred = $q.defer(),
        			currentTime = getTime(),
        			user = firebaseUser.user,
        			userProfile = user.uid,
                    ref = firebase.database().ref('users/' + userProfile);
                setCurrentUser();
                self.user = $firebaseObject(ref);
                self.user.$loaded().then(function(){
                    ref.set({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        lastLogin: getTime(),
                        active: true
                    }).then(function(){
                        shiftyService.showToast("User updated!",1500)
                    })
                })
        		deferred.resolve();
        		return deferred.promise;
        	}

        	function loginError(error) {
            	// console.log("Authentication failed:", error);
        	}

        	function isLoggedIn(){
                firebase.auth().onAuthStateChanged(function(user){
                    if (user){
                        setCurrentUser();
                        return ls.isLoggedIn = true;
                    }else{
                        return ls.isLoggedIn = false; 
                    }
                });
        	}

        	function getTime(){
            	var date = new Date(),
            	    dateObject = date.getFullYear() +'/'+ ('0' + (date.getMonth() + 1)).slice(-2) +'/'+ ('0' + date.getDate()).slice(-2);
            	return dateObject;
        	}     
        }
}());