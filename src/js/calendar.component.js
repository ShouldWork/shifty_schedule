(function(){
    angular.module("shiftyApp")
        .component('calendarBox', {
            templateUrl: "src/html/calendar.component.html",
            controller: calendarController
        });
    function calendarController($firebaseObject,$scope,$firebaseArray){
        var cal = this;


        cal.shifts = [{text: "6:00 am - 3:00 pm"},{text: "7:00 am - 4:00 pm"},{text: "8:00 am - 5:00 pm"},{text: "9:00 am - 6:00 pm"},{text: "10:00 am - 7:00 pm"},{text: "11:00 am - 8:00 pm"},{text: "2:00 pm - 10:00 pm"}];
        
        
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