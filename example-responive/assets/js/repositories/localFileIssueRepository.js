/*
fetches a static list of issues from the local webserver in order to mock a request for live data to
facilite dev/testing of the issueController

:: note ::
i updated the test.jsonp to with an unresolved issue to enhance UI list. no offense indented :)

:: version history ::
1.0 - inital release - jonathan captanis - 15/11/13

 */
issueCatalog.factory('localFileIssueRepository', function ($q, $timeout, $http)
{
    var issuesPipe = $q.defer();

    return function()
    {
        var STATIC_URL = "test.jsonp";

        $http.get(STATIC_URL)
            .success(function(data)
            {
                //i understand this is a violation of SoC, should of made this a mixin
                //but its a simple mechanism to provide a delayed return to allow the
                //spinner some time to show
                setTimeout(function(){issuesPipe.resolve(data)}, 3000);
            })
            .error(function(data)
            {
                issuesPipe.reject(data);
            });

        return issuesPipe.promise;
    }
});
