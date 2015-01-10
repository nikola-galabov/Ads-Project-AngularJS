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

    var rejectAd = $resource(
        'http://softuni-ads.azurewebsites.net/api/admin/ads/reject/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var approveAd = $resource(
        'http://softuni-ads.azurewebsites.net/api/admin/ads/Approve/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var users = $resource(
        'http://softuni-ads.azurewebsites.net/api/admin/users/:id?PageSize='+ PAGE_SIZE,{id:'@id'},
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

    function getAdminAdById(id) {
        getHeaders();
        return resource.get({id: id});
    }

    function adminEditAd(id, ad) {
        getHeaders();
        return resource.update({id: id}, ad);
    }

    function adminDeleteAd(id) {
        getHeaders();
        return resource.delete({id: id});
    }

    function adminApproveAd(id) {
        getHeaders();
        return approveAd.update({id: id});
    }

    function adminRejectAd(id) {
        getHeaders();
        return rejectAd.update({id: id});
    }

    function getUsersList(page,sortby) {
        getHeaders();
        return users.get({sortBy:sortby,startPage:page});
    }

    function getUserByUsername(id) {
        getHeaders();
        return users.get({id:id});
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
        getAdminAdById: getAdminAdById,
        adminEditAd: adminEditAd,
        adminDeleteAd: adminDeleteAd,
        adminRejectAd:adminRejectAd,
        adminApproveAd: adminApproveAd,
        getUsersList: getUsersList,
        getUserByUsername:getUserByUsername,
        getProfile: getProfile,
        editProfile: editProfile,
        changePassword: changePassword
    }
});