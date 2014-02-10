/*
 provides a mechanism to retrieve the outstanding issues from the issue service. the controller also
 modifies the state of the vm $scope to provide presentation logic to the UI

 :: version history ::
 1.0 - inital release - jonathan captanis - 15/11/13

 */
issueCatalog.factory('issueService', function ($q, issueRepository, localFileIssueRepository)
{
    //would like a default param here... useLocalFile
    return function(useMockDataSource)
    {
        if(useMockDataSource)
        {
            return localFileIssueRepository();
        }
        else
        {
            return issueRepository();
        }

    }
});
