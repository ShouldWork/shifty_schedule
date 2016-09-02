(function(){
    angular.module("shiftyApp")
        .component('login', {
            templateUrl: "src/html/login.component.html",
            controller: loginController
        });
    function loginController($state,$firebaseObject,$scope,$firebaseArray,$firebaseAuth,$log,shiftyService,$localStorage,loginService){
        var login = this,
            srv = shiftyService,
            logSrv = loginService;


        login.logoutMessages = ['See you later, ','Thanks for stopping by, ','Check ya later, ','Smell ya later, ','Salutations, ','Peace out, ','Ciao, ','Well it was real, ','You\'ll be back, ','We\'ll miss you, ']
        login.loginMessages = ['Welcome back, ','We have a lot to discuss, ','It\s you again, ', 'Hello,  ','Salutations, ','How you doing, ','You\'re looking good, ','Another great day ahead for, ','Let\'s schedule somethinng, ','I missed you...a little. Welcome back, ']
        
        // local functions
        login.signIn = signIn;
        login.logout = logout;

        function signIn(provider) {
            return logSrv.signIn(provider).then(function(){
                login.isLoggedIn = logSrv.isLoggedIn;
                shiftyService.showToast(login.loginMessages);
            });
        }

        function logout() {
            login.isLoggedIn = false; 
            logSrv.signOut(login.logoutMessages);
        }

    }
})();