var PAGE_SIZE = 10;
//var BASE_URL = 'http://localhost:1337/api/';
var BASE_URL = 'http://softuni-ads.azurewebsites.net/api/';
adminApp.factory('adminData', function adminData($resource, $cookieStore, $http) {

    function getHeaders() {
        if($cookieStore.get('user')) {
            $http.defaults.headers.common['Authorization']= 'Bearer ' + $cookieStore.get('user').access_token;
        }
    }

    var resource = $resource(
        BASE_URL + 'admin/ads/:id?PageSize=' + PAGE_SIZE,
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var rejectAd = $resource(
        BASE_URL+'admin/ads/reject/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var approveAd = $resource(
        BASE_URL+'admin/ads/Approve/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var users = $resource(
        BASE_URL+'admin/users/:id?PageSize='+ PAGE_SIZE,{id:'@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var profile = $resource(
        BASE_URL+'admin/user/:username',{username: '@username'},
        {
            update: {
                method: 'PUT'
            }
        });


    var password = $resource(
        BASE_URL+'admin/setPassword',{},
        {
            update: {
                method: 'PUT'
            }
        });

    var categories = $resource(
        BASE_URL+'admin/Categories/:id?PageSize='+ PAGE_SIZE,{id:'@id'},
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

    function adminDeleteUser(username) {
        getHeaders();
        return profile.delete({username:username});
    }

    function adminEditUser(username, profileData) {
        getHeaders();
        return profile.update({username:username},profileData);
    }

    function adminSetPassword(data) {
        getHeaders();
        return password.update(data);
    }

    function adminGetCategories(page, sortby){
        getHeaders();
        return categories.get({sortBy:sortby,startPage:page})
    }

    function adminDeleteCategory(id){
        getHeaders();
        return categories.delete({id:id})
    }

    return {
        getAdminAds: getAdminAds,
        getAdminAdById: getAdminAdById,
        adminEditAd: adminEditAd,
        adminDeleteAd: adminDeleteAd,
        adminRejectAd:adminRejectAd,
        adminApproveAd: adminApproveAd,
        getUsersList: getUsersList,
        adminDeleteUser: adminDeleteUser,
        adminEditUser: adminEditUser,
        adminSetPassword: adminSetPassword,
        adminGetCategories: adminGetCategories,
        adminDeleteCategory:adminDeleteCategory
    }


});