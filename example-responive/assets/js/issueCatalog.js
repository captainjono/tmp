/*
the main entry point into the issue catalog app. this 'class' sets up and handles all
the routing requests.
 */
var issueCatalog = angular.module('issueCatalog', ['ngAnimate', 'ngRoute'])
    .config(function($routeProvider)
    {
        $routeProvider.when('/about',
            {
                templateUrl: 'views/about.html',
                controller: 'aboutController'
            })
            .when('/issues',
            {
                templateUrl: 'views/issues.html',
                controller: 'issueController'
            })
            .otherwise({
                redirectTo: '/about'
            });
    })
    .run(function($rootScope, $location, $anchorScroll)
    {
        $rootScope.isActivePage = function(catagory)
        {
            if($location.path().indexOf(catagory) != -1)
                return "active-nav-item";

            return "";
        }

        $rootScope.gotoLink = function(linkId)
        {
            $location.hash(linkId);
            $anchorScroll(linkId);
        }
    });



