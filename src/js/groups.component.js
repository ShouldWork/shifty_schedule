(function(){
    angular.module("shiftyApp")
        .component('groups', {
            templateUrl: "src/html/groups.component.html",
            controller: groupsController
        });
    function groupsController($firebaseObject,$scope,$firebaseArray,shiftyService,$timeout){
        var groups = this,
            srv = shiftyService; 
        groups.techs = getTechs();
        groups.isSignedin = srv.isLoggedIn;

        function getTechs(){
            console.log("Getting techs list...");
            $timeout(function(){
                groups.techs = srv.techList;
                console.log(groups.techs);
            });
        }
    }
})();