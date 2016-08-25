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
      		filters = $firebaseArray(ref);
			filters.$add({ foo: "bar" }).then(function(ref) {
			  var id = ref.key();
			  console.log("added record with id " + id);
			  filters.$indexFor(id); // returns location in the array
			});
      	}
      	getFilters();
    }
})();