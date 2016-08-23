(function(){
    angular.module("shiftyApp")
        .component('navBar', {
            templateUrl: "src/html/nav-bar.component.html",
            controller: navController
        })
        function navController(){
        	var nav = this;
        	nav.buttons = [{text: "Home"},{text: "Calendar"},{text: "Groups"},{text: "About"}]
        }
})();