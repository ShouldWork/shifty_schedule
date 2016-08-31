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
        groups.getTime = getTime;


        $scope.$watch(function () {
            return srv.isLoggedIn;
        },           
          function() {
            groups.techs = [];
            groups.techs = srv.techList;
            groups.isLoggedIn = srv.isLoggedIn;
            // console.log("Controller techs: " + groups.techs + " user: " + groups.isLoggedIn);
        }, true);

        function getTime(){
            var date = new Date(timestamp * 1000);
            var dateObject = date.getFullYear() +'/'+ ('0' + (date.getMonth() + 1)).slice(-2) +'/'+ ('0' + date.getDate()).slice(-2);
            return dateObject;
        }      
    }
    var now = groups.getTime();
    console.log(now);
})();