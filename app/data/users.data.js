const users = (() => {
    class UsersController {
        works() {
            console.log('works');
        }
    }

    return new UsersController();
})();

module.exports = users;
