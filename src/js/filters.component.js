(function(){
    angular.module("shiftyApp")
        .component('filters', {
            templateUrl: "src/html/filters.component.html",
            controller: filterController
        });
    function filterController($firebaseArray){
        var filter = this;
        filter.filters = getFilters;
        filter.setFilter = setFilter;

      	function getFilters(){
     		var ref = firebase.database().ref().child("xactware/filters");
            filter.filtersList = $firebaseArray(ref)
      	}

      	function setFilter(pass){
      		var filters = firebase.database().ref().child("xactware/filters");
      		filters = $firebaseArray(filters);
			filters.$add({ name: "New Filter",set: false}).then(function(ref) {
			filters.$indexFor(id); // returns location in the array
			});
      	}
      	getFilters();
    }
})();