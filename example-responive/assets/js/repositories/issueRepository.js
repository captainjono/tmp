/*

 :: version history ::
 1.0 - inital release - jonathan captanis - 15/11/13

 */
issueCatalog.factory('issueRepository', function ($q, $http)
{
    //todo: should load from config somewhere (xml, datastore etc)
    var ISSUE_URL = "http://status.campaignmonitor.com/api/issues/current?callback=JSON_CALLBACK";

    return function()
    {
        //i choose not to return the $http promise to ensure SoC / encapsulation
        var issuesPipe = $q.defer();

        $http.jsonp(ISSUE_URL)
            .success(function(data)
            {
                issuesPipe.resolve(data);
            })
            .error(function(data)
            {
                issuesPipe.reject(data);
            });

        return issuesPipe.promise;
    }
});
