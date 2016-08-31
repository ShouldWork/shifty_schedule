(function(){
    angular.module("shiftyApp")
        .component('login', {
            templateUrl: "src/html/login.component.html",
            controller: loginController
        });
    function loginController($state,$firebaseObject,$scope,$firebaseArray,$firebaseAuth,$log,shiftyService,$localStorage){
        var login = this,
            srv = shiftyService; 


        login.logoutMessages = ['See you later, ','Thanks for stopping by, ','Check ya later, ','Smell ya later, ','Salutations, ','Peace out, ','Ciao, ','Well it was real, ','You\'ll be back, ','We\'ll miss you, ']
        login.loginMessages = ['Welcome back, ','We have a lot to discuss, ','It\s you again, ', 'Hello,  ','Salutations, ','How you doing, ','You\'re looking good, ','Another great day ahead for, ','Let\'s schedule somethinng, ','I missed you...a little. Welcome back, ']
        
        // local functions
        login.isLoggedIn = srv.isLoggedIn
        login.signIn = signIn;
        login.logout = logout;




        // From service
        
        

        //firebase setup 
        var ref = firebase.database().ref().child("users");
        syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope,"login.form");
        syncObject.$loaded().then(function(){
            login.fireBase = login.form;
        });

        function signIn(provider) {
            srv.signIn(provider,login.loginMessages).then(function(){
                login.isLoggedIn = srv.isLoggedIn;
                srv.getTechs();
                srv.getFilters();
            });
        }

        function logout() {
            login.isLoggedIn = false; 
            srv.logout(login.logoutMessages);
        }
    }
})();