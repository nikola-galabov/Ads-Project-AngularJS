publicApp.controller('PublicController', function PublicController($scope, publicData) {
    $scope.ads = publicData.getAds();
    $scope.categories = publicData.getCategories();
    $scope.towns = publicData.getTowns();
    $scope.townsId = null;
    $scope.categoryId = null;
    $scope.startPage = 1;
    $scope.pages = function (pages) {
        var result = [];
        for (var i = 0; i < pages; i++) {
            result.push(i + 1);
        }

        return result;
    }

    $scope.reloadAds = function(townid,categoryid,startPage) {

        $scope.ads = publicData.getAds(townid,categoryid,startPage);
    }


});