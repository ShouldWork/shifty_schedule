
(function(){
    angular.module("shiftyApp",
            [
                "ui.router",
                "ngAnimate",
                "ngStorage",
                "ngMaterial",
                "firebase"
            ])
        .config(function($urlRouterProvider,$stateProvider){
            $urlRouterProvider.otherwise(function($injector){
                var $state = $injector.get('$state');
            })
            $stateProvider.state('home', {
                url: '/home',
                templateURL: 'src/html/groups.component.html'
            })
        })
}());