(function(){
    angular.module("shiftyApp")
        .component('groups', {
            templateUrl: "src/html/groups.component.html",
            controller: groupsController
        });
    function groupsController($route,$firebaseObject,$scope,$firebaseArray,shiftyService){
        var groups = this;
        groups.techs = getTechs();
        groups.isSignedin = shiftyService.isSignedin;

        function getTechs(){
            console.log("Getting techs list...");
            return groups.techs = shiftyService.getList("xactware/techs",false);
        }
    }
})();