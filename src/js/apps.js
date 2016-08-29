
(function(){
    angular.module("shiftyApp",
            [
                "ui.router",
                "ngAnimate",
                "ngStorage",
                "ngMaterial",
                "firebase",
                "ngRoute"
            ])
        .config(function($urlRouterProvider){
            $urlRouterProvider.otherwise(function($injector){
                var $state = $injector.get('$state');
            })
        })
}());