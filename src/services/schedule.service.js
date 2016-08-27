(function(){
    // var lists = [];
    // var listindex = 0;
    // var activeList;
    //

    angular.module('shiftyApp')
        .service('shiftyService',shiftyService);

    
    function shiftyService($q, $log, $sessionStorage, $localStorage,$state,$mdToast,$firebaseObject,$firebaseArray,$firebaseAuth) {
		var self = this;
		self.showToast   = showToast;
		self.getToastMsg = getToastMsg; 
		self.getList     = getList; 		


		
		// Toast setup and functions
		last = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};
		self.toastPos    = angular.extend({},last);
		self.getToastPos = function (){
			cleanUp();
			return Object.keys(self.toastPos)
				.filter(function(pos) { return self.toastPos[pos]; })
				.join(' ');
		};
		function showToast(message,delay){
			var pinTo = self.getToastPos(),
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
			var current = self.toastPos;
			if ( current.bottom && last.top ) current.top = false;
			if ( current.top && last.bottom ) current.bottom = false;
			if ( current.right && last.left ) current.left = false;
			if ( current.left && last.right ) current.right = false;
			last = angular.extend({},current);
		}


		// getting lists
		function getList(toGet,filtered){
			var fredRef = firebase.database().ref().child(toGet);
			if (filtered){
				fredRef.once("value", function(snapshot) {
					snapshot.forEach(function(techSnapshot) {
						var key = techSnapshot.val();
						var level = techSnapshot.child('level').val();
						var name = techSnapshot.child('name').val();
						console.log(level);
						self.displayTechs = [];
						if (level = "L1"){
							self.displayTechs.push([{name: name,level: level}])
						}
					});
					console.log(self.displayTechs);
				});
			} else {
				return $firebaseArray(fredRef);
			}
   		 }
   	}
}());

			//   var data = snapshot.val();
			//   // data equals { "name": { "first": "Fred", "last": "Flintstone" }, "age": 53 }
			//   console.log(data);
			//   console.log(data[0].name);  // "Fred"
			//   console.log(data.level);  // 53
			// });
     	// };
