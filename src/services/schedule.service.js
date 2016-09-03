(function(){
    // var lists = [];
    // var listindex = 0;
    // var activeList;
    //

    angular.module('shiftyApp')
        .service('shiftyService',shiftyService);

    
    function shiftyService($state,$q, $log, $sessionStorage, $localStorage,$state,$mdToast,$firebaseObject,$firebaseArray,$firebaseAuth) {
    		var self = this;
    		self.showToast   = showToast;
    		self.getToastMsg = getToastMsg; 
    		self.getTechs    = getTechs; 
    		self.getFilters  = getFilters; 
    		self.isLoggedIn  = false;
            self.tags        = {a: true,b: false};
    		self.list 		 = undefined; 
    		self.filterList	 = undefined;
    		self.techList 	 = undefined; 

            getTechs();
            getFilters();


        function getTime(){
            var date = new Date();
            var dateObject = date.getFullYear() +'/'+ ('0' + (date.getMonth() + 1)).slice(-2) +'/'+ ('0' + date.getDate()).slice(-2);
            return dateObject;
        }  

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
		function getTechs(){
			var techRef = firebase.database().ref().child('xactware/techs');
                self.techList = $firebaseArray(techRef);
            // var data = {};
            // techRef.orderByKey().on("value", function(snapshot) {
            //     data = snapshot.val();
            //     self.techList = $firebaseArray(techRef);
            // })
		    // console.log(self.techList = data);
   		 }		

   		 function getFilters(){
			var filterRef = firebase.database().ref().child('xactware/filters');
				self.filterList = $firebaseArray(filterRef);

   		 }
    }
}());