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
            nav.filters = [{text: "Month"},{text: "Year"},{text: "Week"},{text: "Day"},{text: "Level"},{text: "Team"},{text: "Filter"},{text: "Weekends"},{text: "Grave"},{text: "Swing"},{text: "Shift"}];
            syncObject.$loaded().then(function(){
               nav.fireBase = nav.form;
            });
            
            nav.save = function (){
                console.log("saving...");
                console.log(JSON.stringify(nav.buttons));
                nav.form = nav.buttons;
            };
        }
})();