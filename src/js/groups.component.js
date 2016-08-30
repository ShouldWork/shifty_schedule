(function(){
    angular.module("shiftyApp")
        .component('groups', {
            templateUrl: "src/html/groups.component.html",
            controller: groupsController
        });
    function groupsController($firebaseObject,$scope,$firebaseArray,shiftyService){
        var groups = this,
            srv = shiftyService; 
        groups.techs = getTechs();
        groups.isSignedin = shiftyService.isSignedin;

        function getTechs(){
            console.log("Getting techs list...");
            groups.techs = srv.list;
        }
    }
})();