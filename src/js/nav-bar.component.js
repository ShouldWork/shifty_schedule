(function(){
    angular.module("shiftyApp")
        .component('navBar', {
            templateUrl: "src/html/nav-bar.component.html",
            controller: navController
        });
        function navController($firebaseObject,$scope,$firebaseArray,$mdSidenav,loginService){
        	var nav = this;
        	var logSrv = loginService;
            nav.isLoggedIn = logSrv.isLoggedIn;
            nav.currentUser = logSrv.currentUser;
            nav.buttons = [{text: "Home"},{text: "Calendar"},{text: "Groups"},{text: "About"}];
            nav.toggleLeft = function() {
               $mdSidenav('left').toggle();
             };
        }
})();