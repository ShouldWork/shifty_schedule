(function(){
    angular.module("shiftyApp")
        .component('groups', {
            templateUrl: "src/html/groups.component.html",
            controller: groupsController
        });
    function groupsController($firebaseObject,$scope,$firebaseArray,shiftyService){
        var groups = this;
        groups.getTechs = getTechs();

        function getTechs(){
            return groups.techs = shiftyService.getList("xactware/techs")
        }
    }
})();