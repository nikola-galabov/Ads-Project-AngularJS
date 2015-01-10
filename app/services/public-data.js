//var BASE_URL = 'http://softuni-ads.azurewebsites.net/api';
var BASE_URL = 'http://localhost:1337/api';
var PAGE_SIZE = 10;

publicApp.factory('publicData', function publicData($resource) {
    var ads = $resource(BASE_URL + '/ads?PageSize=' + PAGE_SIZE);
    var categories = $resource(BASE_URL + '/categories');
    var towns = $resource(BASE_URL + '/towns');
    var register = $resource(BASE_URL + '/user/register');
    var login = $resource(BASE_URL + '/user/login');

    function getAds(categoryId,townId,page) {
        return ads.get({categoryId: categoryId,townId: townId, startPage: page});
    }

    function getCategories() {
        return categories.query();
    }

    function getTowns() {
        return towns.query();
    }

    function registerUser(user) {
        return register.save(user);
    }

    function loginUser(user) {
        return login.save(user);
    }

    return {
        getAds: getAds,
        getCategories: getCategories,
        getTowns: getTowns,
        registerUser: registerUser,
        loginUser:loginUser
    }
});
