publicApp.factory('publicData', function publicData($resource) {
    var ads = $resource('http://softuni-ads.azurewebsites.net/api/ads?PageSize=3');
    var categories = $resource('http://softuni-ads.azurewebsites.net/api/categories');
    var towns = $resource('http://softuni-ads.azurewebsites.net/api/towns');

    function getAds(categoryId,townId,page) {
        if(page == null) {
            page = 1;
        }
        return ads.get({categoryId: categoryId,townId: townId, startPage: page});
    }

    function getCategories() {
        return categories.query();
    }

    function getTowns() {
        return towns.query();
    }

    return {
        getAds: getAds,
        getCategories: getCategories,
        getTowns: getTowns
    }
});
