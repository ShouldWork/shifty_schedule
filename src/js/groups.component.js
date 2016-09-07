(function(){
    angular.module("shiftyApp")
        .component('groups', {
            templateUrl: "src/html/groups.component.html",
            controller: groupsController
        });
    function groupsController($firebaseObject,$scope,$firebaseArray,shiftyService,$timeout,loginService){
        var groups = this,
            srv = shiftyService,
            logSrv = loginService;


        $scope.$watch(function () {
            return groups.isLoggedIn = logSrv.isLoggedIn;
        },function() {
            srv.getTechs();
            groups.techs = srv.techList;
            // console.log(groups.techs);
            // if (groups.techs == undefined){
            //     srv.getTechs();
            // } 
        });
    }
})();