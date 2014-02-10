/*
    Creates a spinner directive to apply the spinner to DOM elements
    thats binds to a bool attribute

    isBusy: t/f  - actives the spinner

    reference:
    - http://fgnass.github.io/spin.js/
 */
issueCatalog.directive('icBusySpinner', function($timeout)
{
    return function(scope, elements, attr) {

        //nothing to bind to here!
        if(elements.length < 1)
            return;

        var element = elements[0];
        var spinner = createSpinner();

        scope.$watch(attr.icBusySpinner, function(isBusy)
        {
            if(isBusy)
            {
                spinner.spin(element);
            }
            else
            {
                spinner.stop();
            }
        });

        function createSpinner()
        {
            var opts = {
                lines: 13, // The number of lines to draw
                length: 7, // The length of each line
                width: 2, // The line thickness
                radius: 2, // The radius of the inner circle
                corners: 0, // Corner roundness (0..1)
                rotate: 32, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1.1, // Rounds per second
                trail: 29, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };

            return new Spinner(opts);
        }
    }
});