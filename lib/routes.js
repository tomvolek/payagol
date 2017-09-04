import { IronRouter } from  'meteor/iron:router' ;

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

//Draw ain template once the root url is visited.
Router.route('/', function(){
    this.render('Main');
    this.render('form_buy_item', {to: 'aside'});

});

Router.route('/home', function(){
    this.render('Main');
},{
    name: 'main'
});

Router.route('/report', function (){
    this.render('Report')
},{
    name: 'report'
});


Router.route('/login',function() {
    this.render('Login');
},{
    name: 'login'
});

Router.route('/about', function () {
    this.render('About');
},{
    name: 'about'
});

Router.route('/admin:origRoute', function () {
    this.render('Admin');
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




Router.route('/auction_list', function () {
    this.render('auction_list');
});

Router.route('/form_edit_user', function () {
    this.render('form_edit_user');
});

Router.route('/form_enter_product', function () {
    this.render('form_enter_product');
});



