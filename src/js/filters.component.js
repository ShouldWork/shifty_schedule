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

      	function addFilter(){
      		var filters = getFilters();
			filters.$add({ name: "New Filter",set: false}).then(function(ref) {
				filters.$indexFor(id); // returns location in the array
			});
      	}

      	function setListProperty(prop){
      		var filters = getFilters();
      		var prop = filters.$indexFor(prop);
      		console.log(prop);
      	}
    }
})();