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




        	function setCurrentUser(name,email,userImg,uid){
        		if (name){
	      			return currentUser = {
	        			displayName: name,
	        			email: email,
	        			userImage: userImg,
	        			uid: uid,
	        			loggedIn: getTime()
	        		};
	        		ls.isLoggedIn = true;
        		} else {
        			ls.isLoggedIn = false;
        			return currentUser = false; 
        		}
        	}

        	function signIn(provider){
	            var auth = $firebaseAuth();
	            return auth.$signInWithPopup(provider)
	            	.then(loginSuccess).then(function(){
	            		console.log(ls.isLoggedIn = isLoggedIn());
	            	})
	            	.catch(loginError);
        	}

        	function signOut(msg){
        		var auth = $firebaseAuth();
        		auth.$signOut();
        		ls.currentUser = undefined;
        		ls.isLoggedIn = isLoggedIn();
        		console.log(self.isLoggedIn)
        	}

        	function loginSuccess(firebaseUser){
        		var deferred = $q.defer(),
        			currentTime = getTime(),
        			user = firebaseUser.user,
        			userProfile = firebaseUser.user.uid;
                    console.log('login service');
        		ls.currentUser = setCurrentUser(user.displayName,user.email,user.photoURL,user.uid)
        		if(ls.currentUser.displayName !== undefined){
        			setCurrentUser(self.currentUser);
        		}
        		deferred.resolve();
        		return deferred.promise;
        	}

        	function loginError(error) {
            	console.log("Authentication failed:", error);
        	}

        	function isLoggedIn(){
        		var isloggedin= (ls.isLoggedIn) ? false : true;
        		return isloggedin;
        	}

        	function getTime(){
            	var date = new Date(),
            	    dateObject = date.getFullYear() +'/'+ ('0' + (date.getMonth() + 1)).slice(-2) +'/'+ ('0' + date.getDate()).slice(-2);
            	return dateObject;
        	}     
        }
}());