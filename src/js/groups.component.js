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
                //firebase setup 
        var ref = firebase.database().ref("xactware").child("techs");
        syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope,"data.techs");
        syncObject.$loaded().then(function(){
            groups.techs = data.form;
            console.log(group.techs);
        });

    }
})();