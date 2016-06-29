let UserModel = require('./models/user');
let NewUserView = require('./views/newuser');
let ShowUserView = require('./views/showuser');

// -- Why do we attach views, etc to `this`?
// 2. Reroute to homepage
module.exports = Backbone.Router.extend({
    initialize: function () {
        // Create a model
        let user = new UserModel();

        // Create a view
        this.newUser = new NewUserView({
            model: user,
            el: document.getElementById('user'),
        });

        // this.newUser.on('created', this.showUser, this);
        this.newUser.on('created', function (model) {
            console.log(`New kid on the block: ${model.get('name')}`);

            this.navigate(`show/0`, { trigger: true });   
        }, this);

        this.showUser = new ShowUserView({
            model: user,
            el: document.getElementById('info'),
        });
    },

    routes: {
        'new': 'newUser',
        'show': 'showUser',
        'show/:who': 'showUser',
    },

    newUser: function () {
        console.log('new user route');
        this.newUser.el.classList.remove('hidden');

        this.showUser.el.classList.add('hidden');
    },

    // http://localhost:8000/api/users/3
    showUser: function (who) {
        // General pattern: 'if you're not supposed to be
        // here, get out'.
        if (who === null) {
            this.navigate('new', { trigger: true });
            return;
        }

        let self = this;

        let internetPerson = new UserModel();
        internetPerson.fetch({
            url: `http://localhost:8000/api/users/${who}`,
            success: function () {
                // todo: fix `this`
                self.showUser.model = internetPerson;
                self.showUser.render();
            },
        });

        console.log('show user route for ' + who);
        this.showUser.el.classList.remove('hidden');
        this.newUser.el.classList.add('hidden');
    },
});