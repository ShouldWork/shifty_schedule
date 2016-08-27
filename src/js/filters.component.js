(function(){
    angular.module("shiftyApp")
        .component('filters', {
            templateUrl: "src/html/filters.component.html",
            controller: filterController
        });
    function filterController($firebaseArray,$mdToast,shiftyService){
        var filter = this;
        filter.getFilters = getFilters();
        filter.addFilter = addFilter;
        filter.setListProperty = setListProperty;
		filter.showToast = shiftyService.showToast;
		filter.newListName = "";

      	function getFilters(){
      		return filter.filters = shiftyService.getList("xactware/filters")
      	}

      	function addFilter(name,set){
      		console.log("Name: " + name + " set: " + set);
			filter.showToast("Added filter " + filter.newListName);
      		var filters = getFilters();
      		console.log(filters);
			filters.$add({ name: name || "New filter",set: set || false}).then(function(ref) {
				var id = ref.key,
					index = filters.$indexFor(id);
			});
			filter.newListName = "";
		}

      	function setListProperty(id){
			var ref = firebase.database().ref().child("xactware/filters");
			ref.child(id).once("value", function(snapshot) {
				var data = snapshot.val();
				var toggle = (data.set) ? false : true;
				(!toggle) ? filter.showToast("Removing " + data.name + " from filters",1000) : filter.showToast("Adding " + data.name + " to filters",1000);	
				ref.child(id).child("set").set(toggle);
				// data === "hello"
			});
			// console.log(ref.child(id).child("set").set());
      	}
    }
})();