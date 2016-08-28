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
        filter.addFilterEnter = addFilterEnter;
        filter.setListProperty = setListProperty;
		filter.showToast = shiftyService.showToast;
		filter.newListName = "";

      	function getFilters(){
      		return filter.filters = shiftyService.getList("xactware/filters",false)
      	}

      	function addFilter(name,set){
			filter.showToast("Added filter " + filter.newListName);
      		var ref = firebase.database().ref().child("xactware/filters"),
            	dbFilters = $firebaseArray(ref);
            	console.log(dbFilters);
			dbFilters.$add({ 
				name: name || "New filter",
				set: set || false
				})
			.then(function(ref) {
				var id = ref.key,
					index = dbFilters.$indexFor(id);
			});
			filter.newListName = "";
		}

		function addFilterEnter(name,set,key){
			console.log("name: " + name + " set: " + set + " key: " + key);
			if (isEnter(key)){addFilter(name,set)};
		}
      	function setListProperty(id){
			var ref = firebase.database().ref().child("xactware/filters");
			ref.child(id).once("value", function(snapshot) {
				var data = snapshot.val();
				var toggle = (data.set) ? false : true;
				(!toggle) ? filter.showToast("Removed '" + data.name + "' from filters",1000) : filter.showToast("Added '" + data.name + "' to filters",1000);	
				ref.child(id).child("set").set(toggle);
				// data === "hello"
			});
			// console.log(ref.child(id).child("set").set());
      	}

      	function isEnter(key){
      		return (key.which == 13) ? true : false;
      	}
    }
})();