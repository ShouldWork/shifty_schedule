(function(){
    angular.module("shiftyApp")
        .component('filters', {
            templateUrl: "src/html/filters.component.html",
            controller: filterController
        });
    function filterController($firebaseArray,$mdToast){
        var filter = this;
        filter.filters = getFilters();
        filter.addFilter = addFilter;
        filter.setListProperty = setListProperty;
		filter.showToast = showToast;
		filter.newListName = "";

      	function getFilters(){
     		var ref = firebase.database().ref().child("xactware/filters");
            return $firebaseArray(ref);
      	}

      	function addFilter(name,set){
			showToast("Added filter " + filter.newListName);
      		var filters = getFilters();
			filters.$add({ name: name || "New filter",set: set || false}).then(function(ref) {
				var id = ref.key,
					index = filters.$indexFor(id);
			});
			filter.newListName = "";
		}

      	function setListProperty(id){
			var ref = firebase.database().ref().child("xactware/filters");
			ref.child(id).once("value", function(snapshot) {
			showToast("Adding filter " + data.name + " to filters",1000);	
				var data = snapshot.val();
				var toggle = (data.set) ? false : true;
				ref.child(id).child("set").set(toggle);
				// data === "hello"
			});
			// console.log(ref.child(id).child("set").set());
      	}
		var last = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		filter.toastPos = angular.extend({},last);
		filter.getToastPos = function (){
			cleanUp();
			return Object.keys(filter.toastPos)
				.filter(function(pos) { return filter.toastPos[pos]; })
				.join(' ');
		};
		function showToast(message,delay){
			var pinTo = filter.getToastPos(),
				msg = getToastMsg(message);
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position(pinTo)
					.hideDelay(delay || 2500)
			);
		}

		function getToastMsg(whatGet){
			return ($.isArray(whatGet)) ? getToastMsg(whatGet[Math.floor((Math.random() * whatGet.length - 1) + 1)]) : whatGet;
		}

		function cleanUp(){
			var current = filter.toastPos;
			if ( current.bottom && last.top ) current.top = false;
			if ( current.top && last.bottom ) current.bottom = false;
			if ( current.right && last.left ) current.left = false;
			if ( current.left && last.right ) current.right = false;
			last = angular.extend({},current);
		}
    }
})();