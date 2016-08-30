(function(){
    angular.module("shiftyApp")
        .component('groups', {
            templateUrl: "src/html/groups.component.html",
            controller: groupsController
        });
    function groupsController($firebaseObject,$scope,$firebaseArray,shiftyService,$timeout){
        var groups = this,
            srv = shiftyService; 
        groups.techs = srv.techList;
        groups.isSignedin = srv.isLoggedIn;


        $scope.$watch('group.techs', function(){
            groups.techs = srv.techList;
            console.log(groups.techs);
        });

        function getTechs(){
            console.log("Getting techs list...");
        }
    }
})();