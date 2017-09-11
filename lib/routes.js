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



Router.route('/flowers_catalog', function () {
    this.render('Flowers_Catalog');
},{
    name: 'flowers_catalog'
});


Router.route('/admin:origRoute', function () {
    this.render('Admin');
});


// we want to be sure that the user is logging in
// for all routes but login
Router.onBeforeAction(function () {
    if  (!Meteor.userId() && !Meteor.loggingIn()) {
        this.redirect('login');
        this.stop();
    } else {
        this.next();
    }
},{except: ['login'] });

Accounts.onLogin(function () {
    if(Meteor.isClient) { // only works on client
        Router.go('/home');
    }
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



