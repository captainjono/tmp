/**
 * This control prints a circle on the screen with a specified radius
 * and when clicked, it will display a popup at a specific orientation
 * to its self
 *
 * usage:
 * possible orientations are defined in the [orientations] array
 *
 * todo:
 * -create dynamically position popup based on the dimensions of the control
 *  instead of relying on static css
 * -add bounds detection to ensure popup is always orientated in viewport
 * -refactor popup out into seperate directive
 * -add watchers to resize the control as attribs are updated
 * -add mechanism to display content inside popup
 *
 * @author Jonathan Captanis
 *
 * ------------
 * @version 0.1
 * ------------
 * -initial prototype developed as per spec - Jonathan Captanis - 9/4/14
 *
 */
$popupModule.directive('popupCircle' , [function() {

    //the possible permetations that the popup can have
    var orientations = [{position: 'north', arrow: 'south'},
                        {position: 'northeast', arrow: null},
                        {position: 'east', arrow: 'west'},
                        {position: 'southeast', arrow: null},
                        {position: 'south', arrow: 'north'},
                        {position: 'southwest', arrow: null},
                        {position: 'west', arrow: 'east'},
                        {position: 'northwest', arrow: null}];
    return {
        scope: {
            //the width of the popup window
            popupwidth: '@',
            //the height of the popup window
            popupheight: '@',
            //the radius of the circle
            radius: '@',
            //boolean to enable of disable the reorientate point
            reorientate: '@',
            //the orientation of the popup
            orientation: '@'
        },

        restrict: 'E',

        templateUrl: 'directives/templates/popupCircle.html',

        link: function(scope, element, attr) {

            var currentOrientation;
            var $circle = element.find(".circle");
            var $popupClip = element.find(".popup-clip");
            var $popup = $popupClip.find(".popup");
            var $orientation = element.find(".orientation-clip");

            //setup the control
            createCircle($circle, $popupClip, attr.radius);
            createPopup($popupClip, $popup, attr.popupwidth, attr.popupheight, attr.radius);
            if(!!attr.reorientate && attr.reorientate === 'true')
                createOrientationToggle($orientation, $circle, $popupClip, getOrientation(attr.orientation));

            //set initial orientation
            applyOrientation($popupClip, getOrientation(attr.orientation));

            /**
             * Returns the orienationMeta for a given position
             *
             * @param position the position to lookup
             * @returns {orientation} the orientationMeta associated with the position
             */
            function getOrientation(position)
            {
                return $.grep(orientations, function(ele) { return ele.position === position; }).pop()
            }

            /**
             * Adds the orientation arrow to the bottom of the circle
             * and binds event handlers to display it on demand
             *
             * @param orientation is a DOM element to represent the arrow
             * @param circle  is a DOM element to toggle its visiblity
             * @param popupClip the popup that will be reorientated around the circle
             * @param orientationMeta is the initial orientation of the popup. null if none specified
             */
            function createOrientationToggle(orientation, circle, popupClip, orientationMeta) {

                orientation.click({rotateAngle: !!orientationMeta ?  orientations.indexOf(orientationMeta) + 1 : 0}, function(event) {

                    if(event.data.rotateAngle === orientations.length)
                    {
                        event.data.rotateAngle = 0;
                    }

                    applyOrientation(popupClip, orientations[event.data.rotateAngle++]);

                    event.stopPropagation();
                });

                circle.click(function()
                {
                    if(event.target == this)
                    {
                        orientation.fadeToggle("slow");
                    }
                });
            }

            /**
             * Creates and sizes the popup window
             *
             * note:
             * this method is incomplete, its a stub for a forumula i was creating
             * for dynamically positioning the popup window but decided it was out of
             * the scope of the task - instead i apply css classes as requested
             *
             * @param popupClip is the clipping frame for the popup surface
             * @param popup is the popup surface
             * @param width is the total width of the popup
             * @param height is the total height of the popup
             * @param radius is the radius of the circle the popup will orientate around
             */
            function createPopup(popupClip, popup, width, height, radius) {

                var cw = radius * 2;
                var arrowHeight = 4; //magic value need to fix
                var totalHeight = parseInt(height, 10) + arrowHeight;
                var totalWidth = parseInt(width, 10);
                var popupCenter = (totalWidth - cw) / 2;
                var borderTotal = 2 * 2; //magic value  need to fix

                //set the dimensions of the popup clipping area
                popupClip.width(totalWidth);
                popupClip.height(totalHeight);

                //set the dimensions of the popup
                popup.width(width - borderTotal + "px");
                popup.height(height - borderTotal + "px");

                //$popupArrow.css("left", (totalWidth + parseInt(border) + (arrowHeight / 2)  - radius) / 2 + "px");
            }

            /**
             * Create the circle that defines the behaviour of this control
             * When the circle is clicked, it will display a popup
             *
             * @param circle is the DOM element to act as the circle
             * @param popupClip is the popup to display when clicked
             * @param radius is the radius of the circle
             */
            function createCircle(circle, popupClip, radius){

                var circleSize = radius * 2;

                circle.width((circleSize) + 'px');
                circle.height((circleSize) + 'px');
                circle.css("border-radius", (circleSize) + 'px');

                circle.bind('click', function(event){
                    if(event.target == this)
                    {
                        popupClip.fadeToggle();
                    }
                 });
            }

            /**
             * Orientates the popup at a specific angle around the circle
             *
             * @param popupClip is the popup to orientate
             * @param orienationMeta is the direction to orientate
             */
            function applyOrientation(popupClip, orienationMeta) {

                orienationMeta = orienationMeta || orientations[0];

                //toggle current orientation
                if(!!currentOrientation)
                {
                    popupClip.find('.popup-arrow-' + currentOrientation.arrow).hide();
                    popupClip.removeClass(currentOrientation.position);
                }

                //toggle new orientation
                popupClip.addClass(orienationMeta.position);
                if(orienationMeta.arrow)
                    popupClip.find('.popup-arrow-' + orienationMeta.arrow).show();

                //set state
                currentOrientation = orienationMeta;
            }
        }
    };
}]);