adminApp.controller('DeleteUserController',function($scope,adminData){
    var username = $location.path().split('/');
    username = username[id.length-1];
    $scope.profile = adminData.getUserByUsername(username);
});
