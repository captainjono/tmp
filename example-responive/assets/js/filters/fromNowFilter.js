//requires momentJS
//could of used jquery but the version included with angular is lite is is missing
//the function anyway. moment is nicer and might come in handy in other places.
issueCatalog.filter('fromNow', function() {
    return function(date)
    {
        return moment(date).fromNow();
    }
});