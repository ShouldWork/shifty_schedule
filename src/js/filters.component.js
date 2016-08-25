(function(){
    angular.module("shiftyApp")
        .component('filters', {
            templateUrl: "src/html/filters.component.html",
            controller: filterController
        });
    function filterController(){
        var filter = this;
        filter.filters = getFilters;
        
      	function getFilters(){
     		var ref = firebase.database().ref().child("xactware/techs");
            filter.filtersList = $firebaseArray(ref)
      	}
    }
})();