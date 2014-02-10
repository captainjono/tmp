/*
provides a mechanism to retieve the outstanding issues from the issue service. the controller also
modifies the state of the vm $scope to provide presensation logic to the UI

:: version history ::
1.0 - inital release - jonathan captanis - 15/11/13

*/
issueCatalog.controller('issueController', function($scope, $q, issueService)
{
    <!-- viewmodel state variables -->
    $scope.hasError = false;
    $scope.dataLoaded = false;
    $scope.useMockDataSource = true;
    $scope.isBusy = false;

    <!-- viewmodel issues -->
    $scope.issues = [];

    <!-- loads issues on demand, switching, between models as depending on the useMockDataSource variable-->
    $scope.getIssues = function()
        {
            $scope.isBusy = true;

            issueService($scope.useMockDataSource)
                .then(function(data)
                {
                    $scope.hasError = false;
                    $scope.dataLoaded = true;
                    $scope.issues = data;
                })
                .catch(function(error)
                {
                    $scope.issues = [];
                    $scope.dataLoaded = false;
                    $scope.hasError = true;
                })
                .finally(function()
                {
                    $scope.isBusy = false;
                });
        }
})
;

