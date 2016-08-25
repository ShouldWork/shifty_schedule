(function(){
    angular.module("shiftyApp")
        .component('calendarBox', {
            templateUrl: "src/html/calendar.component.html",
            controller: calendarController
        });
    function calendarController($firebaseObject,$scope,$firebaseArray){
        var cal = this;
        // var ref = firebase.database().ref().child("filters");
        // syncObject = $firebaseObject(ref);
        // syncObject.$bindTo($scope,"login.form");
        // syncObject.$loaded().then(function(){
        //     login.fireBase = login.form;
        // });
        //
        //
        // login.testSave = function (){
        //     console.log("saving...");
        //     console.log(JSON.stringify(login.testData));
        //     login.form = login.testData;
        // };
    }
})();