publicApp.factory('publicData', function publicData($resource) {
    var ads = $resource('http://softuni-ads.azurewebsites.net/api/ads:categoryId',{categoryId: '@category'});
    var categories = $resource('http://softuni-ads.azurewebsites.net/api/categories');
    var towns = $resource('http://softuni-ads.azurewebsites.net/api/towns');

    function getAllAds() {
        return ads.get();
    }

    function getAdsByCategory(category) {
        return ads.get({category: category});
    }

    function getAdsByTown(town) {
        return ads.get({filter: town});
    }

    function getCategories() {
        return categories.query();
    }

    function getTowns() {
        return categories.query();
    }

    return {
        getAllAds: getAllAds,
        getAdsByCategory: getAdsByCategory,
        getCategories: getCategories,
        getTowns: getTowns
    }
});
