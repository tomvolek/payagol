import { IronRouter } from  'meteor/iron:router' ;

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

Router.route('/about', function () {
    this.render('aboutPage');
});


Router.route('/', {
    template: 'home'
});


// set layout of the page
Router.configure({
    layoutTemplate: 'main'
});
