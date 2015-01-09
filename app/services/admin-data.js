var PAGE_SIZE = 10;
adminApp.factory('adminData', function adminData($resource, $cookieStore, $http) {

    function getHeaders() {
        if($cookieStore.get('user')) {
            $http.defaults.headers.common['Authorization']= 'Bearer ' + $cookieStore.get('user').access_token;
        }
    }

    var resource = $resource(
        'http://softuni-ads.azurewebsites.net/api/admin/ads/:id?PageSize=' + PAGE_SIZE,
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var deactivateAdRes = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var publishAgainRes = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/PublishAgain/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var profile = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/profile',{},
        {
            update: {
                method: 'PUT'
            }
        });

    var password = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/changePassword',{},
        {
            update: {
                method: 'PUT'
            }
        });

    function getAdminAds(status,page,townId,categoryId) {
        getHeaders();
        return resource.get({status: status, startPage: page,categoryId: categoryId,townId: townId});
    }

    function createNewAd(ad) {
        getHeaders();
        return resource.save(ad);
    }

    function getAdById(id) {
        getHeaders();
        return resource.get({id: id});
    }

    function editAd(id, ad) {
        getHeaders();
        return resource.update({id: id}, ad);
    }

    function deleteAd(id) {
        getHeaders();
        return resource.delete({id: id});
    }

    function publishAgainAd(id) {
        getHeaders();
        return publishAgainRes.update({id: id});
    }

    function deactivateAd(id) {
        getHeaders();
        return deactivateAdRes.update({id: id});
    }

    function getProfile() {
        getHeaders();
        return profile.get();
    }

    function editProfile(profileData) {
        getHeaders();
        return profile.update(profileData);
    }

    function changePassword(data) {
        getHeaders();
        return password.update(data);
    }

    return {
        getAdminAds: getAdminAds,
        createAd: createNewAd,
        getAdById: getAdById,
        editAd: editAd,
        deleteAd: deleteAd,
        deactivateAd:deactivateAd,
        publishAgainAd: publishAgainAd,
        getProfile: getProfile,
        editProfile: editProfile,
        changePassword: changePassword
    }
});