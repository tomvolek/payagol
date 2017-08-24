import '/imports/ui/body.js'


getUserLanguage = function () {
    // Put here the logic for determining the user language

    return "fa";
};

// Houston.add_collection(Meteor.users);


Router.route('/register');
Router.route('/login');

Router.route('/report', function () {
    this.render('report');
});

Router.route('/auction_list', function () {
    this.render('auction_list');
});

Router.route('/form_edit_user', function () {
    this.render('form_edit_user');
});

Router.route('/form_enter_product', function () {
    this.render('form_enter_product');
});

Router.route('/', {
    template: 'home'
});

