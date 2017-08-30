import { IronRouter } from  'meteor/iron:router' ;



Router.configure({
    layoutTemplate: 'ApplicationLayout'
});


//Draw ain template once the root url is visited.
Router.route('/', function(){
    this.render('main');
});



// we want to be sure that the user is logging in
// for all routes but login
Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['login']
});


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


