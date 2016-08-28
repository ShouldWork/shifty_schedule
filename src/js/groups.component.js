(function(){
    angular.module("shiftyApp")
        .component('groups', {
            templateUrl: "src/html/groups.component.html",
            controller: groupsController
        });
    function groupsController($firebaseObject,$scope,$firebaseArray,shiftyService){
        var groups = this;
        groups.techs = shiftyService.displayList;

        function getTechs(){
            console.log("Getting techs list...");
            return groups.techs = shiftyService.getList("xactware/techs",false);
        }
    }
})();