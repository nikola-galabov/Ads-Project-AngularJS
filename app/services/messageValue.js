publicApp.factory('messageValue', function () {
    var message = 'opop';

    return {
        getMessage: function () {
            return message;
        },
        setMessage: function (msg) {
            message = msg;
        }
    };
});
