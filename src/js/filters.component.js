(function(){
    angular.module("shiftyApp")
        .component('filters', {
            templateUrl: "src/html/filters.component.html",
            controller: filterController
        });
    function filterController(){
        var filter = this;
        filter.filters = [{text: "Month"},{text: "Year"},{text: "Week"},{text: "Day"},{text: "Level"},{text: "Team"},{text: "Filter"},{text: "Weekends"},{text: "Grave"},{text: "Swing"},{text: "Shift"}];
    }
})();