/*
 Creates a spinner directive to apply the spinner to DOM elements
 thats binds to a bool attribute

 */
issueCatalog.directive('icScrollTo', function($timeout)
{
    return function link(scope, elements, attr)
    {
        restrict: 'A'

        //nothing to bind to here!
        if(elements.length < 1)
            return;

        var element = elements[0];

        scope.$watch(attr.icScrollTo, function()
        {
            element.onclick(function()
            {
            })
        });
    }
});