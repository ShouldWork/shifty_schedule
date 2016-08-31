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
        groups.isLoggedIn = srv.isLoggedIn;


        $scope.$watch(function () {
            return srv.isLoggedIn;
        },           
          function() {
            groups.techs = [];
            groups.techs = srv.techList;
            groups.isLoggedIn = srv.isLoggedIn;
            // console.log("Controller techs: " + groups.techs + " user: " + groups.isLoggedIn);
        }, true);
    }
})();