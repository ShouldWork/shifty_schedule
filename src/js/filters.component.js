(function(){
    angular.module("shiftyApp")
        .component('filters', {
            templateUrl: "src/html/filters.component.html",
            controller: filterController
        });
    function filterController($firebaseArray,$mdToast,shiftyService,$state){
        var filter = this,
        	srv = shiftyService;
        filter.getFilters = getFilters();
        filter.addFilter = addFilter;
        filter.addFilterEnter = addFilterEnter;
        filter.setListProperty = setListProperty;
		filter.showToast = srv.showToast;
		filter.newListName = "";

      	function getFilters(){
      		return filter.filters = srv.getList("xactware/filters",false)
      	}

      	function getFilters(){
            console.log("Fetching filters...");
            $scope.$watch('srv.filterList',function(){
                filter.filters = srv.filterList;
                console.log(filter.filters);
            });
        }

      	function addFilter(name,set){
			filter.showToast("Added filter " + filter.newListName);
      		var ref = firebase.database().ref().child("xactware/filters"),
            	dbFilters = $firebaseArray(ref);
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