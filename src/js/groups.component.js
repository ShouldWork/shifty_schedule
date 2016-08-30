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
            $scope.$watch('srv.list',function(){
                groups.techs = srv.list[0];
                console.log(groups.techs);
                console.log(srv.list[0]);
                console.log(srv.list[2]);
                console.log(srv.list[1]);
            });
        }
    }
})();