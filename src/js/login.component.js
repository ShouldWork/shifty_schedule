(function(){
    angular.module("shiftyApp")
        .component('login', {
            templateUrl: "src/html/login.component.html",
            controller: loginController
        });
    function loginController($firebaseObject,$scope,$firebaseArray,$firebaseAuth,$log,shiftyService,$localStorage){
        var login = this;
        login.logoutMessages = ['See you later, ','Thanks for stopping by, ','Check ya later, ','Smell ya later, ','Salutations, ','Peace out, ','Ciao, ','Well it was real, ','You\'ll be back, ','We\'ll miss you, ']
        login.loginMessages = ['Welcome back, ','We have a lot to discuss, ','It\s you again, ', 'Hello,  ','Salutations, ','How you doing, ','You\'re looking good, ','Another great day ahead for, ','Let\'s schedule somethinng, ','I missed you...a little. Welcome back, ']
        
        // local functions
        login.signIn = signIn;
        login.logout = logout;
        login.user = user(); 

        // From service
        
        

        //firebase setup 
        var ref = firebase.database().ref().child("users");
        syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope,"login.form");
        syncObject.$loaded().then(function(){
            login.fireBase = login.form;
        });
        
        function user(){
            return login.user = shiftyService.user;
        };


        function signIn(provider) {
            login.user = shiftyService.signIn(provider,login.loginMessages);
        }
        function logout() {
            login.user = undefined;
            shiftyService.logout(login.logoutMessages);
        }
    }
})();