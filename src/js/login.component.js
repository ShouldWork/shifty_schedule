(function(){
    angular.module("shiftyApp")
        .component('login', {
            templateUrl: "src/html/login.component.html",
            controller: loginController
        });
    function loginController($firebaseObject,$scope,$firebaseArray){
        var login = this;
        
        login.testData = [{text: "Month"},{text: "Year"},{text: "Week"},{text: "Day"},{text: "Level"},{text: "Team"},{text: "Filter"},{text: "Weekends"},{text: "Grave"},{text: "Swing"},{text: "Shift"}];
        login.login = login; 
        
        var ref = firebase.database().ref().child("filters");
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


        function login(provider) {
            var auth = $firebaseAuth();
            // login with provider
            auth.$signInWithPopup(provider).then(function (firebaseUser) {
                $log.log(firebaseUser);
                vm.displayName = firebaseUser.user.displayName;
                vm.providerUser = firebaseUser.user;
                var ref = firebase.database().ref("users");
                var profileRef = ref.child(vm.providerUser.uid);
                vm.user = $firebaseObject(profileRef);
                $log.log(vm.user);
                $log.log(profileRef);
                vm.user.$loaded().then(function () {
                    if (!vm.user.displayName) {
                        $log.log("creating user...");
                        profileRef.set({
                            displayName: vm.providerUser.displayName,
                            email: vm.providerUser.email,
                            photoURL: vm.providerUser.photoURL
                        }).then(function () {
                            $log.log("user created.");
                        }, function () {
                            $log.log("user could not be created.");
                        });
                    } else {
                        $log.log('user already created!');
                    }
                });
            }).catch(function (error) {
                $log.log("Authentication failed:", error);
            });
        }
    }
})();