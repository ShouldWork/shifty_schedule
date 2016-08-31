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


        $scope.$watch('groups.techs', function(){
            return srv.techList; 
        },
        function(newVal, oldVal){
            console.log(newVal);
            console.log(oldVal);
        }, true);

        function getTechs(){
            console.log("Getting techs list...");
        }

        $scope.setFTag = function() {
            console.log("Within MyCtrl->setFTag");
            srv.setFalseTag();
        };    

        $scope.$watch(function () {
            return srv.tags;
        },           
          function(newVal, oldVal) {
            groups.techs = srv.techList;
            groups.tags = srv.tags;
            console.log("Controller techs: " + groups.techs + " tags: " + groups.tags.a);
        }, true);

        $scope.$watch(function () {
            return srv.user;
        },           
          function(newVal, oldVal) {
            groups.techs = [];
            groups.techs = srv.techList;
            groups.user = srv.displayName;
            console.log("Controller techs: " + groups.techs + " user: " + groups.user);
        }, true);
    }
})();