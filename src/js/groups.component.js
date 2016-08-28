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
            groups.techs = shiftyService.displayList;
            console.log(groups.techs);
        }
    }
})();