(function(){
    angular.module("shiftyApp")
        .component('filters', {
            templateUrl: "src/html/filters.component.html",
            controller: filterController
        });
    function filterController($firebaseArray){
        var filter = this;
        filter.filters = getFilters();
        filter.addFilter = addFilter;

      	function getFilters(){
     		var ref = firebase.database().ref().child("xactware/filters");
            return $firebaseArray(ref);
      	}

      	function addFilter(pass){
      		var filters = getFilters();
			filters.$add({ name: "New Filter",set: false}).then(function(ref) {
				filters.$indexFor(id); // returns location in the array
			});
      	}
    }
})();