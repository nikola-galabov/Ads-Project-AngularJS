publicApp.controller('PublicController', function PublicController($scope, publicData) {
    $scope.ads = publicData.getAllAds();
    $scope.categories = publicData.getCategories();
    $scope.towns = publicData.getTowns();
    //$scope.hasFilter = false;
    //$scope.adsByCategory = publicData.getAdsByCategory('1');


    $scope.pages = function (pages) {
        var result = [];

        for (var i = 0; i < pages; i++) {
            result.push(i + 1);
        }
        ;
        return result;
    }

});