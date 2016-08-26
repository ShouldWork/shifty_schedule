(function(){
    angular.module("shiftyApp")
        .component('login', {
            templateUrl: "src/html/login.component.html",
            controller: loginController
        });
    function loginController($firebaseObject,$scope,$firebaseArray,$firebaseAuth,$log,shiftyService){
        var login = this;
        
        login.testData = [{text: "Month"},{text: "Year"},{text: "Week"},{text: "Day"},{text: "Level"},{text: "Team"},{text: "Filter"},{text: "Weekends"},{text: "Grave"},{text: "Swing"},{text: "Shift"}];
        login.signIn = signIn;
        login.logout = logout;
        login.showToast = shiftyService.showToast; 
        
        var ref = firebase.database().ref().child("users");
        syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope,"login.form");
        syncObject.$loaded().then(function(){
            login.fireBase = login.form;
        });
        
        
        login.testSave = function (){
            console.log("saving...");
            console.log(JSON.stringify(login.testData));
            login.form = login.testData;
        };


        function signIn(provider) {
            var auth = $firebaseAuth();
            // login with provider
            auth.$signInWithPopup(provider).then(function (firebaseUser) {
                $log.log(firebaseUser);
                login.displayName = firebaseUser.user.displayName;
                login.providerUser = firebaseUser.user;
                var ref = firebase.database().ref("users");
                var profileRef = ref.child(login.providerUser.uid);
                login.user = $firebaseObject(profileRef);
                $log.log(login.user);
                $log.log(profileRef);
                login.user.$loaded().then(function () {
                    if (!login.user.displayName) {
                        showToast("Creating user...");
                        profileRef.set({
                            displayName: login.providerUser.displayName,
                            email: login.providerUser.email,
                            photoURL: login.providerUser.photoURL
                        }).then(function () {
                            showToast("user created.");
                        }, function () {
                            showToast("user could not be created.");
                        });
                    } else {
                        showToast('user already created!');
                    }
                });
            }).catch(function (error) {
                $log.log("Authentication failed:", error);
            });
            console.log(login.user = login.providerUser.displayName);
        }
        function logout() {
            var auth = $firebaseAuth();
            $log.log(login.displayName + " logged out");
            auth.$signOut();
            login.user = undefined;
        }
    }
})();