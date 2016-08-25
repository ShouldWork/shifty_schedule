(function(){
    angular.module("shiftyApp")
        .component('navBar', {
            templateUrl: "src/html/nav-bar.component.html",
            controller: navController
        });
        function navController($firebaseObject,$scope,$firebaseArray){
        	var nav = this;

            var ref = firebase.database().ref().child("buttons");
            syncObject = $firebaseObject(ref);
            nav.firebaseArray = $firebaseArray(ref);
            syncObject.$bindTo($scope,"nav.form");
            
            nav.buttons = [{text: "Home"},{text: "Calendar"},{text: "Groups"},{text: "About"}];
            syncObject.$loaded().then(function(){
               nav.fireBase = nav.form;
            });
        }
})();