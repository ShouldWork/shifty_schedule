(function(){
    angular.module("shiftyApp")
        .component('login', {
            templateUrl: "src/html/login.component.html",
            controller: loginController
        });
    function loginController($firebaseObject,$scope,$firebaseArray,$firebaseAuth,$log,shiftyService,$localStorage){
        var login = this;
        
        // local functions
        login.signIn = signIn;
        login.logout = logout;
        login.user = user(); 

        // From service
        login.showToast = shiftyService.showToast; 
        

        //firebase setup 
        var ref = firebase.database().ref().child("users");
        syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope,"login.form");
        syncObject.$loaded().then(function(){
            login.fireBase = login.form;
        });
        
        function user(){
            var user = $localStorage.user; 
            console.log(user);
            if (user !== undefined){
                return user; 
            }
        };


        login.testSave = function (){
            console.log("saving...");
            console.log(JSON.stringify(login.testData));
            login.form = login.testData;

        };


        function signIn(provider) {
            var auth = $firebaseAuth();
            // login with provider
            auth.$signInWithPopup(provider).then(function (firebaseUser) {
                login.displayName = firebaseUser.user.displayName;
                login.providerUser = firebaseUser.user;

                var ref = firebase.database().ref("users"),
                    profileRef = ref.child(login.providerUser.uid);
                login.user = $firebaseObject(profileRef);
                login.user.$loaded().then(function () {
                    if (!login.user.displayName) {
                        login.showToast("Creating user...");
                        profileRef.set({
                            displayName: login.providerUser.displayName,
                            email: login.providerUser.email,
                            photoURL: login.providerUser.photoURL
                        }).then(function () {
                            login.showToast("user created. Logging in as " + login.providerUser.displayName);
                        }, function () {
                            login.showToast("user could not be created.");
                        });
                    } else {
                        login.showToast('user already created! Logging in as ' + login.providerUser.displayName);
                    }
                    $localStorage.user = login.user = login.providerUser.displayName; 
                    login.signedIn = true;
                });
            }).catch(function (error) {
                $log.log("Authentication failed:", error);
            });
        }
        function logout() {
            var auth = $firebaseAuth();
            var user = login.user; 
            $log.log(user + " logged out");
            auth.$signOut();
            $localStorage.user = login.user = undefined;
            login.showToast("Come back soon, " + user +  " ya' hear?!")
        }
    }
})();