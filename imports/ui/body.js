import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TAPi18n }   from 'meteor/tap:i18n';
import { TAPi18nui} from 'meteor/tap:i18n-ui';
import  { Moment }  from 'meteor/momentjs:moment';
//import { FlowRouter}  from 'meteor/kadira:flow-router';
import { IronRouter } from  'meteor/iron:router' ;
import { PricePosition } from '/imports/api/models.js';
import { Purchased } from '/imports/api/models.js';
import { FlowerBatchList } from '/imports/api/models.js';
import { FlowerCatalog } from '/imports/api/models.js';
import { FilesCollection } from 'meteor/ostrio:files';
import { UploadServer } from 'meteor/tomi:upload-server';
import { UploadJquery } from 'meteor/tomi:upload-jquery';
import { Accounts } from 'meteor/accounts-base';



import "./body.html";

Uploader.localisation.dropFiles = "رها کردن فایل ها در اینجا";


    TAPi18n.setLanguage('fa');
    i18n.setLanguage('fa');
    var language = TAPi18next.detectLanguage();
    console.log("our language===============",language);


    var default_lang = TAPi18n.getLanguage();
    //default_lang = 'fa'; // due to a bug in TAPi18n.setLanguage, we cheat here and set default lang to fa


    if (default_lang == 'en') {
        i18n.setLanguage('en');
        TAPi18n.setLanguageAmplify('en');
        Uploader.localisation.dropFiles = "Drop Files Here";

     } else if (default_lang == 'fa') {
        i18n.setLanguage('fa');
        TAPi18n.setLanguageAmplify('fa');
        Uploader.localisation.dropFiles = "رها کردن فایل ها در اینجا";
        accountsUIBootstrap3.setLanguage('fa');

    }

   // templete to return role which user is in
   Template.registerHelper('isUserInRole', function(userId, role) {
    return Roles.userIsInRole(userId, role, 'default-group');
    // return Roles.userIsInRole(userId,role);
     //  Roles.getRolesForUser( Meteor.userId() );  return roles user belongs to
    });


    Template.i18n_dropdown_bootstrap3_component.events({
        'click a.language-selector': function (event) {
            event.preventDefault();
            //TAPi18n.setLanguageAmplify(this.tag);

            var default_lang = TAPi18n.getLanguage();
            //default_lang = 'fa'; // due to a bug in TAPi18n.setLanguage, we cheat here and set default lang to fa

            if (default_lang == 'en') {
                console.log("i was here with en");

                $('#myform #created-datepicker').datepicker({todayHighlight: true});
                $('#myform #auctiondate-datepicker').datepicker({todayHighlight: true});

                i18n.setLanguage('en');
                TAPi18n.setLanguage('en');
                Uploader.localisation = {
                    dropFiles : "Drop Files Here ",
                    browse: "Browse",
                    cancelled: "Cancelled",
                    remove: "Remove",
                    upload: "Upload",
                    done: "Done",
                    cancel: "Cancel"}

                drawClock() ;  // redraw the numbers around the clock if language is changed

            } else if (default_lang == 'fa') {
                console.log("i was here with fa");
                $('#myform #created-datepicker').datepicker({language: 'fa',todayHighlight: true } );
                $('#myform #auctiondate-datepicker').datepicker({language: 'fa',todayHighlight: true});
                Uploader.localisation.dropFiles = "رها کردن فایل ها در اینجا";

                i18n.setLanguage('fa');
                TAPi18n.setLanguage('fa');
                Uploader.localisation = {
                    //dropFiles : "رها کردن فایل ها در اینجا",
                    browse: "فهرست",
                    cancelled: "لغو شد",
                    remove: "برداشتن",
                    upload: "آپلود",
                    done: "انجام شده",
                    cancel: "لغو"
                    }
                drawClock()  ; // redraw the numbers around the clock if language is changed
            }
        }
    });


    var date = new Date();

    // on the client
    //subscribe  to userStatus to get online users.
    Meteor.subscribe('userStatus');


    Meteor.subscribe("flower_batch_lists", {
        onReady: function () {
            console.log("onReady Flower_Batch_Batch actually Arrive", arguments);
        },
        onError: function () {
            console.log("onError", arguments);
        }
    });

    Meteor.subscribe("price_positions", {
        onReady: function () {
            console.log("onReady Price Position actually Arrive", arguments);
        },
        onError: function () {
            console.log("onError", arguments);
        }
    });

    Meteor.subscribe("purchased", {
        onReady: function () {
            console.log("onReady Purchased actually Arrive", arguments);
        },
        onError: function () {
            console.log("onError", arguments);
        }
    });

    Meteor.subscribe("flower_catalog", {
       onReady: function () {
           console.log("onReady flower_catalog actually Arrive", arguments);
          },
         onError: function () {
         console.log("onError", arguments);
       }
     });

    Meteor.subscribe("userlist", {
        onReady: function () {
            console.log("onReady Users actaully arrive", arguments);
        },
        onError: function () {
            console.log("onError", arguments);
        }
    });


    Meteor.startup(function () {


        TAPi18n.setLanguage('fa');
        i18n.setLanguage('fa');
        var language = TAPi18next.detectLanguage();
        console.log("our language===============",language);

        // check to  see if we have any item
         function  hasFlowersToSell() {

            return FlowerBatchList.find({OnAuction: 1}).count;
        }

       // moment.loadPersian();
        // moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");  // "Wednesday, June 4th 2014, 3:12:36 pm"

        //setup image upload directory on the client side
        Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
        Uploader.localisation.dropFiles = "I was رها کردن فایل ها در اینجا";

        Uploader.localisation = {
            browse: "فهرست",
            cancelled: i18n("Cancelled"),
            remove: i18n("Remove"),
            upload: "Upload",
            done: i18n("Done"),
            cancel: i18n("Cancel")
        }


        Meteor.setTimeout(function () {
            TAPi18n.setLanguage('fa');
        }, 10);
        i18n.setLanguage('fa');
        var default_lang = TAPi18n.getLanguage();
        default_lang = 'fa'; // due to a bug in TAPi18n.setLanguage, we cheat here and set default lang to fa on startup
        i18n.setDefaultLanguage('fa');
        TAPi18n.setLanguage("fa");
        console.log("inside after language", TAPi18n.getLanguage());
       // i18n.setDefaultLanguage(TAPi18n.getLanguage());


    }); //Meteor.startup()

    // draw the clock face 
    Template.draw_circle.onRendered (function(){

    var canvas = document.getElementById('myCanvas');
    canvas.style.width = 600;
    canvas.style.height = 630;
    var ctx = canvas.getContext('2d');

    // 425,425 are cx,cy will control distance of circle from left or top
    var pointArray = calcPointsCirc(425, 455, 360);

    var radius = 8;  //RADIUS OF THE DOTS
    var p;

    //diamater of the clock
    ctx.scale(0.7, 0.7);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 7;

    //for (p = pointArray.length - 1; p > 0; p--) {
    for (p = 0; p < pointArray.length; p++) {
        drawPoint(p, 'white');
    }

    // draw  blue clock marks on the circle
    ctx.fillStyle = "blue";
    ctx.font = "bold 45px Arial";


    if (TAPi18n.getLanguage() === 'en') {
        console.log("inside en  drawClock function");
        i18n.setLanguage('en');

        ctx.font = "bold 15px Arial";
        ctx.fillText(i18n('one'), 444, 85);
        ctx.fillText(i18n('two'), 466, 88);
        ctx.fillText(i18n('three'), 490, 93);
        ctx.fillText(i18n('four'), 512, 97);
        ctx.fillText(i18n('five'), 537, 103);
        ctx.fillText(i18n('six'), 560, 110);
        ctx.fillText(i18n('seven'), 582, 120);
        ctx.fillText(i18n('eight'), 602, 131);
        ctx.fillText(i18n('nine'), 622, 142);

        ctx.font = "bold 30px Arial";
        ctx.fillText(i18n('zero'), 418, 80);
        ctx.fillText(i18n('ten'), 640, 151);
        ctx.fillText(i18n('twenty'), 785, 355);
        ctx.fillText(i18n('thirty'), 780, 580);
        ctx.fillText(i18n('forty'), 640, 775);
        ctx.fillText(i18n('fifty'), 410, 851);
        ctx.fillText(i18n('sixty'), 175, 778);
        ctx.fillText(i18n('seventy'), 35, 580);
        ctx.fillText(i18n('eighty'), 35, 355);
        ctx.fillText(i18n('ninety'), 175, 151);

    } else if (TAPi18n.getLanguage() === 'fa') {
        console.log("inside fa drawClock function");
        i18n.setLanguage('fa');
        ctx.font = "bold 50px Arial";
        ctx.fillText(i18n('zero'), 413, 80);
        ctx.fillText(i18n('ten'), 640, 161);
        ctx.fillText(i18n('twenty'), 780, 365);
        ctx.fillText(i18n('thirty'), 780, 590);
        ctx.fillText(i18n('forty'), 640, 790);
        ctx.fillText(i18n('fifty'), 410, 862);
        ctx.fillText(i18n('sixty'), 175, 788);
        ctx.fillText(i18n('seventy'), 25, 580);
        ctx.fillText(i18n('eighty'), 25, 355);
        ctx.fillText(i18n('ninety'), 170, 161);

        ctx.font = "bold 20px Arial";
        ctx.fillText(i18n('one'), 441, 87);
        ctx.fillText(i18n('two'), 465, 91);
        ctx.fillText(i18n('three'), 488, 94);
        ctx.fillText(i18n('four'), 514, 102);
        ctx.fillText(i18n('five'), 530, 107);
        ctx.fillText(i18n('six'), 555, 114);
        ctx.fillText(i18n('seven'), 580, 123);
        ctx.fillText(i18n('eight'), 604, 134);
        ctx.fillText(i18n('nine'), 623, 147);
    }

    //draw the black markers
    ctx.fillStyle = "black";
    ctx.font = "bold 45px Arial";
    ctx.fillText('.', 419, 115);
    ctx.fillText('.', 618, 180);
    ctx.fillText('.', 745, 350);
    ctx.fillText('.', 745, 565);
    ctx.fillText('.', 620, 737);
    ctx.fillText('.', 421, 803);
    ctx.fillText('.', 220, 737);
    ctx.fillText('.', 93, 568);
    ctx.fillText('.', 93, 350);
    ctx.fillText('.', 220, 180);
    ctx.closePath();

    function drawPoint(p, color) {

        var circle = new Path2D();
        circle.moveTo(pointArray[p].x, pointArray[p].y);
        circle.arc(pointArray[p].x, pointArray[p].y, radius, 0, 2 * Math.PI, false);
        circle.closePath();
        ctx.fillStyle = color;
        ctx.fill(circle);
        ctx.stroke();
    }

    function calcPointsCirc(cx, cy, rad) {
        var numPoints = 100;  // number of dots in the circle
        var points = [];
        var angle;
        var i = 0;

        for (i = 0; i <= numPoints; i++) {

            angle = 2 * Math.PI * i / numPoints;
            points.push({
                x: cx + rad * Math.sin(angle),
                y: cy - rad * Math.cos(angle)
            });
        }

        return points;
    }
    // Using Tracker mechanism, watch any changes to PricePosition collection on server side
    var oldValue = 0;
    var newValue = 0;

    Tracker.autorun(function () {

        // Attach an handler for a specific message
        Streamy.on('hello', function (d) {
            console.log("doing streamy stuff:", d.data); // Will print 'world!'
            newValue = d.data;
            if (newValue == 0) {

                var firstRecord;
                firstRecord = PricePosition.find().fetch()[0];
                console.log("value zero: PreviousRunPosition:", firstRecord.PreviousRunPosition);
                drawPoint(firstRecord.PreviousRunPosition, 'white');  //white out the previous auction price on the clocl.
                drawPoint(0, 'red');  //set the red dot top of the clock at 0
            }
            else drawPoint(newValue, 'red');

            if (oldValue != newValue) {
                oldValue = newValue;
                // report that we have a new value
                // code here will run when we get an update
                if (newValue != 0) {
                    drawPoint(newValue + 1, 'white');
                    // drawPoint(newValue,'red');
                    console.log("NewValue:", newValue);
                }

            }

        });


    });

})
    Template.registerHelper("localizedDateAndTime", function (timestamp) {

        // return moment(new Date(timestamp));
        // return moment(new Date()).format('l LT');
        console.log("before localzationget", TAPi18n.getLanguage() );
        if (TAPi18n.getLanguage() == 'en') {
            moment.locale('en');
            return moment(new Date()).format("MMMM Do YYYY");
        }
        else if (TAPi18n.getLanguage() == 'fa') {
            moment.locale('fa');

            //moment.loadPersian();
            return moment(new Date()).format('YYYY/MMM/DD');
        }

    });


    Template.clock.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.clock.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);

        }
    });

    //define template to grab flower products from Mongo for sale on each day
    Template.flower_batch_lists.helpers({
        OneBatch: function () {
            //Grab the first three record  FlowerBatchList collection
            return FlowerBatchList.find({}, {limit: 3});
        }
    });

    //Template to pull three records from list of items for sale to be displayed on auction table
    Template.flower_auction_lists.helpers({
        OnAuction: function () {
            return FlowerBatchList.find({OnAuction: 1});
        }
    });


    //Template to display reports of buying activity for all users
    Template.report.helpers({
        purchased: function () {
            return Purchased.find();
        },
        tableSettings: function () {
            return {
                rowsPerPage: 10,
                showFilter: true,
                showNavigation: 'auto',
                showColumnToggles: true,
                showRowCount: true,
                showNavigationRowsPerPage: true,
                multiColumnSort: true,
                fields: [
                    {key: 'AuctionDate', label: i18n('AuctionDate')},
                    {key: 'ProductName', label: i18n('Product_Name'), headerClass: 'col-md-4'},
                    {key: 'Buyer_Number', label: i18n('Buyer_Number')},
                    {key: 'NumberOfContainersBought', label: i18n('Items_Bought')},
                    {key: 'Current_Auction_Price', label: i18n('Price_Bought')},
                    {key: 'ProductImage', label:  i18n('Product_Image') , fn: function(ProductImage){ return new Spacebars.SafeString('<div id="report_image"><img class="img-thumbnail" width="60" height="60" src="/images/flower/'+ ProductImage +'" /></div>'); } }

                ],
                useFontAwesome: true,
                group: 'purchase'
            };
        }
    });


//Template to display reports of buying activity for buyer
Template.report_user_purchase.helpers({
    purchased: function () {
        return Purchased.find({username: Meteor.userId()});
    },
    tableSettings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            showNavigation: 'auto',
            showColumnToggles: true,
            showRowCount: true,
            showNavigationRowsPerPage: true,
            multiColumnSort: true,
            fields: [
                {key: 'AuctionDate', label: i18n('AuctionDate')},
                {key: 'ProductName', label: i18n('Product_Name'), headerClass: 'col-md-4'},
                {key: 'Buyer_Number', label: i18n('Buyer_Number')},
                {key: 'NumberOfContainersBought', label: i18n('Items_Bought')},
                {key: 'Current_Auction_Price', label: i18n('Price_Bought')},
                {key: 'ProductImage', label:  i18n('Product_Image') , fn: function(ProductImage){ return new Spacebars.SafeString('<img class="img-thumbnail" width="60" height="60" src="/images/flower/'+ ProductImage +'" />'); } }

            ],
            useFontAwesome: true,
            group: 'purchase'
        };

    }
});


    Template.form_edit_user.created = function () {
        // Search_Product_Id starts at 222
        this.Search_User_Id = new ReactiveVar("000");

    };

     //attach datepicker to date fields in the forms
    Template.form_enter_product.onrendered=function() {

       // console.log("before date field===> ", TAPi18n.getLanguage() );
        var input = this.find('.created-datepicker')

        if(input){
            input.focus()
        }

        if (TAPi18n.getLanguage() == 'en') {
            //console.log("Date Feild was rendered date field was rendered.......");
            $('#created-datepicker').datepicker();
            $('#auctiondate-datepicker').datepicker();
        }
        else if (TAPi18n.getLanguage() == 'fa') {
           // console.log("Farsi date field was rendered.......");
            $('#created-datepicker').datepicker({language: 'fa' } );
            $('#auctiondate-datepicker').datepicker({language: 'fa'});
        }

    };

    Template.form_enter_product.created = function () {
        // Search_Product_Id starts at 222
        this.Search_Product_Id = new ReactiveVar("000");
        console.log ("reacctive  var cretaed = 000");
    };


    // Grab user input fields
    Template.form_enter_product.events({
        'click #Add_Item': function (event, template) {
            event.preventDefault();
            console.log("Add");
            var Producer_name = template.find("input[name=Producer_name]").value;
            var Producer_id = template.find("input[name=Producer_id]").value;
            var Logo = template.find("input[name=Logo]").value;
            var ProductName = template.find("input[name=ProductName]").value;
            var Product_id = template.find("input[name=Product_id]").value;
            var ProductImage = template.find("input[name=ProductImage]").value;
            var Buyer_Number = template.find("input[name=Buyer_Number]").value;
            var NumberOfItems = template.find("input[name=NumberOfItems]").value;
            var PricePerFlower = template.find("input[name=PricePerFlower]").value;
            var Trolleys = template.find("input[name=Trolleys]").value;
            var ContainersPerTrolly = template.find("input[name=ContainersPerTrolly]").value;
            var TotalContainers = template.find("input[name=TotalContainers]").value;
            var FlowerPerContainer = template.find("input[name=FlowerPerContainer]").value;
            var MinContainerToBuy = template.find("input[name=MinContainerToBuy]").value;
            var eenh = template.find("input[name=eenh]").value;
            var aps = template.find("input[name=aps]").value;
            var s1 = template.find("input[name=s1]").value;
            var s2 = template.find("input[name=s2]").value;
            var s3 = template.find("input[name=s3]").value;
            var s4 = template.find("input[name=s4]").value;
            var fuet = template.find("input[name=fuet]").value;
            var MoneteraryUnit = template.find("input[name=MoneteraryUnit]").value;
            var Country = template.find("input[name=Country]").value;
            var Product_grade = template.find("input[name=Product_grade]").value;
            var createdAt = template.find("input[name=createdAt]").value;
            var CreatorId = template.find("input[name=CreatorId]").value;
            var AuctionDate = template.find("input[name=AuctionDate]").value;

            // Do input validation

            // Insert into database
            var data = {
                Producer_name: Producer_name,
                Producer_id: Producer_id,
                Logo: Logo,
                ProductName: ProductName,
                Product_id: Product_id,
                ProductImage: ProductImage,
                Buyer_Number: Buyer_Number,
                NumberOfItems: NumberOfItems,
                PricePerFlower: PricePerFlower,
                Trolleys: Trolleys,
                ContainersPerTrolly: ContainersPerTrolly,
                TotalContainers: TotalContainers,
                FlowerPerContainer: FlowerPerContainer,
                MinContainerToBuy: MinContainerToBuy,
                eenh: eenh,
                aps: aps,
                s1: s1,
                s2: s2,
                s3: s3,
                s4: s4,
                fuet: fuet,
                MoneteraryUnit: MoneteraryUnit,
                Country: Country,
                Product_grade: Product_grade,
                createdAt: createdAt,
                CreatorId:CreatorId,
                AuctionDate:AuctionDate
            };

            var found_record = FlowerBatchList.findOne({Product_id: data.Product_id});
            if (found_record == null) {
                console.log("inside add_item client")
                Meteor.call('Add_Item', data);
            }

        },
        'click #Edit_Item': function (event, template) {
            event.preventDefault();
            console.log("Edit");

            var Producer_name = template.find("input[name=Producer_name]").value;
            var Producer_id = template.find("input[name=Producer_id]").value;
            var Logo = template.find("input[name=Logo]").value;
            var ProductName = template.find("input[name=ProductName]").value;
            var Product_id = template.find("input[name=Product_id]").value;
            var ProductImage = template.find("input[name=ProductImage]").value;
            var Buyer_Number = template.find("input[name=Buyer_Number]").value;
            var NumberOfItems = template.find("input[name=NumberOfItems]").value;
            var PricePerFlower = template.find("input[name=PricePerFlower]").value;
            var Trolleys = template.find("input[name=Trolleys]").value;
            var ContainersPerTrolly = template.find("input[name=ContainersPerTrolly]").value;
            var TotalContainers = template.find("input[name=TotalContainers]").value;
            var FlowerPerContainer = template.find("input[name=FlowerPerContainer]").value;
            var MinContainerToBuy = template.find("input[name=MinContainerToBuy]").value;
            var eenh = template.find("input[name=eenh]").value;
            var aps = template.find("input[name=aps]").value;
            var s1 = template.find("input[name=s1]").value;
            var s2 = template.find("input[name=s2]").value;
            var s3 = template.find("input[name=s3]").value;
            var s4 = template.find("input[name=s4]").value;
            var fuet = template.find("input[name=fuet]").value;
            var MoneteraryUnit = template.find("input[name=MoneteraryUnit]").value;
            var Country = template.find("input[name=Country]").value;
            var Product_grade = template.find("input[name=Product_grade]").value;
            var createdAt = template.find("input[name=createdAt]").value;
            var CreatorId = template.find("input[name=CreatorId]").value;
            var AuctionDate = template.find("input[name=AuctionDate]").value;

            // Do input validation

            // Update  into database
            var data = {
                Producer_name: Producer_name,
                Producer_id: Producer_id,
                Logo: Logo,
                ProductName: ProductName,
                Product_id: Product_id,
                ProductImage: ProductImage,
                Buyer_Number: Buyer_Number,
                NumberOfItems: NumberOfItems,
                PricePerFlower: PricePerFlower,
                Trolleys: Trolleys,
                ContainersPerTrolly: ContainersPerTrolly,
                TotalContainers: TotalContainers,
                FlowerPerContainer: FlowerPerContainer,
                MinContainerToBuy: MinContainerToBuy,
                eenh: eenh,
                aps: aps,
                s1: s1,
                s2: s2,
                s3: s3,
                s4: s4,
                fuet: fuet,
                MoneteraryUnit: MoneteraryUnit,
                Country: Country,
                Product_grade: Product_grade,
                createdAt: createdAt,
                CreatorId:CreatorId,
                AuctionDate:AuctionDate
            };


            Meteor.call('UpdateItem', data);

        },

        'click #Search_Item': function (event, template) {
            event.preventDefault();
            var Form_Product_id = template.find("input[name=Product_id]").value;
            template.Search_Product_Id.set(Form_Product_id); //set Product_id to reactiveVar
            console.log("search product_is ; ",Form_Product_id);
            return FlowerBatchList.findOne({Product_id:Form_Product_id });

        },
        'click #created-datepicker': function (event, template) {
            event.preventDefault();
            if (TAPi18n.getLanguage() == 'en') {
                console.log("Date Feild was rendered date field was rendered.......");
                $('#created-datepicker').datepicker({todayHighlight: true});
                $('#auctiondate-datepicker').datepicker({todayHighlight: true});
            }
            else if (TAPi18n.getLanguage() == 'fa') {
                console.log("Farsi date field was rendered.......");
                i18n.setLanguage('fa');
                $('#created-datepicker').datepicker({language: 'fa',todayHighlight: true } );
                $('#auctiondate-datepicker').datepicker({language: 'fa',todayHighlight: true});
            }


        },
        'click #auctiondate-datepicker': function (event, template) {
            event.preventDefault();
            if (TAPi18n.getLanguage() == 'en') {
                console.log("Date Feild was rendered date field was rendered.......");
                $('#created-datepicker').datepicker({todayHighlight: true});
                $('#auctiondate-datepicker').datepicker({todayHighlight: true});
            }
            else if (TAPi18n.getLanguage() == 'fa') {
                console.log("Farsi date field was rendered.......");
                i18n.setLanguage('fa');
                $('#created-datepicker').datepicker({language: 'fa',todayHighlight: true } );
                $('#auctiondate-datepicker').datepicker({language: 'fa',todayHighlight: true});
            }
        }

    });



    Template.form_buy_item.events({
        'submit #buyitem': function (event, template) {
            event.preventDefault();
            var numberOfItemsToBuy = event.target.buyitem.value;
            var userId = Meteor.userId();
            console.log("Buyer ID=",userId);
            Meteor.call('buyItem', userId, numberOfItemsToBuy);
        }
    });



    Template.form_set_item_on_auction.events({

        'submit #my_auction_price': function (event, template) {
            //console.log(event.type);
            event.preventDefault();
            var id_on_auction = event.target.on_auction.value;
            console.log("id on auction=", id_on_auction);

            //white out the red dot on the clock from last run
            //resetLastAuctionRun();
            //resetLastAuctionRun();

            //Meteor.call('movePrice','0');
            Meteor.call('movePrice', id_on_auction);

        }
    });


    Template.online_users.helpers({
        usersOnline:function(){
            return Meteor.users.find({ "status.online": true })
        },
        usersOnlineCount:function(){
            //event a count of users online too.
            return Meteor.users.find({ "status.online": true }).count();
        }
    })

    Template.form_enter_product.helpers({
        Search_Item_found: function () {
            var Form_Product_id;
            Form_Product_id = Template.instance().Search_Product_Id.get();
            console.log("form_product_id", Form_Product_id);
            return FlowerBatchList.find({Product_id: Form_Product_id});
           // return FlowerBatchList.find({});
        }
    });

    Template.form_edit_user.helpers({
        Search_User_found: function () {
            var Form_User_id;
            Form_User_id = Template.instance().Search_User_Id.get();
            console.log("form_user-id", Form_User_id);

            console.log("usersList: ", Meteor.users.find().fetch());

            return Meteor.users.find({});
        }
    });

    Template.form_edit_user.events({
        'click #Add_Item': function (event, template) {
            event.preventDefault();
            console.log("Add user");
            var User_id = template.find("input[name=User_id]").value;
            var User_name = template.find("input[name=User_name]").value;
            var User_email = template.find("input[name=User_email]").value;
            var User_role = template.find("input[name=User_role]").value;
            var User_created = template.find("input[name=User_created]").value;

            // Do input validation

            // Insert into database
            var data = {
                User_id: User_id,
                User_name: User_name,
                User_email: User_email,
                ProductName: ProductName,
                User_role: User_role,
                User_created: User_created
            };

            var found_record = Users.findOne({_id: data.User_id});
            if (found_record == null) {
                console.log("inside add_User_item client")
                Meteor.call('Add_User', data);

            }


        },
        'click #Edit_Item': function (event, template) {
            event.preventDefault();
            console.log("Edit");

            var User_id = template.find("input[name=User_id]").value;
            var User_name = template.find("input[name=User_name]").value;
            var User_email = template.find("input[name=User_email]").value;
            var User_role = template.find("input[name=User_role]").value;
            var User_created = template.find("input[name=User_created]").value;

            // Do input validation

            // Update  into database
            var data = {
                User_id: User_id,
                User_name: User_name,
                User_email: User_email,
                User_role: User_role,
                User_created: User_created
            };

            Meteor.call('UpdateUser', data);

        },

        'click #Search_Item': function (event, template) {
            event.preventDefault();
            var Form_User_id = template.find("input[name=User_id]").value;
            //data = FlowerBatchList.findOne({Product_id:Form_Product_id });

            template.Search_User_Id.set(Form_User_id); //set Product_id to reactiveVar

        }
    });


 //console.log(Router.current().route.getName());

// show stack trace
    function logRenders() {
        _.each(Template, function (template, name) {
            var oldRender = template.rendered;
            var counter = 0;

            template.rendered = function () {
                console.log(name, "render count: ", ++counter);
                oldRender && oldRender.apply(this, arguments);
            };
        });
    }


// At the bottom of the client code
//Accounts.ui.config({
//  passwordSignupFields: "USERNAME_ONLY"
//});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        Router.go('profileEdit');
    }
});

Template._loginButtonsAdditionalLoggedInDropdownActions.events({
    'click #login-buttons-edit-profile': function(event) {
        console.log('edit');
        Router.go('settings');
    }
});




    accountsUIBootstrap3.map('fa', {
        resetPasswordDialog: {
            title: "رمز عبور خود را تنظیم مجدد",
            newPassword: "رمز عبور جدید",
            newPasswordAgain: "رمز عبور (دوباره)",
            cancel: "لغو",
            submit: "تنظیم رمز عبور"
        },
        enrollAccountDialog: {
            title: "یک رمز عبور انتخاب کنید",
            newPassword: "رمز عبور جدید",
            newPasswordAgain: "رمز عبور (دوباره)",
            cancel: "نزدیک",
            submit: "تنظیم رمز عبور"
        },
        justVerifiedEmailDialog: {
            verified: "آدرس ایمیل تایید",
            dismiss: "پنهان کن"
        },
        loginButtonsMessagesDialog: {
            dismiss: "پنهان کن",
        },
        loginButtonsLoggedInDropdownActions: {
            password: "تغییر رمز عبور",
            signOut: "خروج"
        },
        loginButtonsLoggedOutDropdown: {
            signIn: "ورود",
            up: "بپیوندید"
        },
        loginButtonsLoggedOutPasswordServiceSeparator: {
            or: "یا"
        },
        loginButtonsLoggedOutPasswordService: {
            create: "ايجاد كردن",
            signIn: "ورود",
            forgot: "رمز عبور را فراموش کرده اید؟",
            createAcc: "ایجاد حساب کاربری"
        },
        forgotPasswordForm: {
            email: "ایمیل",
            reset: "تنظیم مجدد رمز ورود",
            invalidEmail: "ایمیل نامعتبر"
        },
        loginButtonsBackToLoginLink: {
            back: "لغو"
        },
        loginButtonsChangePassword: {
            submit: "تغییر رمز عبور",
            cancel: "لغو"
        },
        loginButtonsLoggedOutSingleLoginButton: {
            signInWith: "ورود به سیستم با",
            configure: "پیکربندی",
        },
        loginButtonsLoggedInSingleLogoutButton: {
            signOut: "خروج"
        },
        loginButtonsLoggedOut: {
            noLoginServices: "بدون خدمات پیکربندی ورود"
        },
        loginFields: {
            usernameOrEmail: "نام کاربری یا پست الکترونیک",
            username: "نام کاربری",
            email: "ایمیل",
            password: "رمز عبور"
        },
        signupFields: {
            username: "نام کاربری",
            email: "ایمیل",
            emailOpt: "ایمیل اختیاری ",
            password: "رمز عبور",
                passwordAgain: "رمز عبور دوباره "
        },
            changePasswordFields: {
            currentPassword: "رمز عبور فعلی",
            newPassword: "رمز عبور جدید",
            newPasswordAgain:  "رمز عبر (دوباره"
        },
            infoMessages : {
            emailSent: "ایمیل ارسال",
            passwordChanged: "رمز عبور تغییر کرد"
        },
            errorMessages: {
            genericTitle: "یک خطای وجود دارد",
        userNotFound: "کاربر پیدا نشد",
        invalidEmail: "ایمیل نامعتبر",
        incorrectPassword: "رمز عبور اشتباه",
        usernameTooShort: "نام کاربری حداقل باید 3 کاراکتر باشد",
        passwordTooShort: "رمز عبور باید حداقل 6 کاراکتر باشد",
        passwordsDontMatch: "کلمه عبور هماهنگ نیست",
        newPasswordSameAsOld: "کلمه عبور جدید و قدیمی باید متفاوت باشد",
        signupsForbidden: "ثبت نام ممنوع"
        }

    });



    console.log("user------------------");
    console.log("current user Role:", Roles.getRolesForUser(Meteor.user()));

    //TAPi18n._afterUILanguageChange = function () {
    function drawClock () {
        console.log("inside after language", TAPi18n.getLanguage());
        i18n.setDefaultLanguage(TAPi18n.getLanguage());

        var canvas = document.getElementById('myCanvas');
        canvas.width = 600;
        canvas.height = 630;
        var ctx = canvas.getContext('2d');

        // 425,425 are cx,cy will control distance of circle from left or top
        var pointArray = calcPointsCirc(425, 455, 360);

        var radius = 8;  //RADIUS OF THE DOTS
        var p;

        //diamater of the clock
        ctx.scale(0.7, 0.7);
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 7;

        //for (p = pointArray.length - 1; p > 0; p--) {
        for (p = 0; p < pointArray.length; p++) {
            drawPoint(p, 'white');
        }

        // draw  blue clock marks on the circle
        ctx.fillStyle = "blue";
        ctx.font = "bold 45px Arial";


        if (TAPi18n.getLanguage() === 'en') {
            console.log("inside en  drawClock function");
            i18n.setLanguage('en');

            ctx.font = "bold 15px Arial";
            ctx.fillText(i18n('one'), 444, 85);
            ctx.fillText(i18n('two'), 466, 88);
            ctx.fillText(i18n('three'), 490, 93);
            ctx.fillText(i18n('four'), 512, 97);
            ctx.fillText(i18n('five'), 537, 103);
            ctx.fillText(i18n('six'), 560, 110);
            ctx.fillText(i18n('seven'), 582, 120);
            ctx.fillText(i18n('eight'), 602, 131);
            ctx.fillText(i18n('nine'), 622, 142);

            ctx.font = "bold 30px Arial";
            ctx.fillText(i18n('zero'), 418, 80);
            ctx.fillText(i18n('ten'), 640, 151);
            ctx.fillText(i18n('twenty'), 785, 355);
            ctx.fillText(i18n('thirty'), 780, 580);
            ctx.fillText(i18n('forty'), 640, 775);
            ctx.fillText(i18n('fifty'), 410, 851);
            ctx.fillText(i18n('sixty'), 175, 778);
            ctx.fillText(i18n('seventy'), 35, 580);
            ctx.fillText(i18n('eighty'), 35, 355);
            ctx.fillText(i18n('ninety'), 175, 151);



        } else if (TAPi18n.getLanguage() === 'fa') {
            console.log("inside fa drawClock function");
            i18n.setLanguage('fa');
            ctx.font = "bold 50px Arial";
            ctx.fillText(i18n('zero'), 413, 80);
            ctx.fillText(i18n('ten'), 640, 161);
            ctx.fillText(i18n('twenty'), 780, 365);
            ctx.fillText(i18n('thirty'), 780, 590);
            ctx.fillText(i18n('forty'), 640, 790);
            ctx.fillText(i18n('fifty'), 410, 862);
            ctx.fillText(i18n('sixty'), 175, 788);
            ctx.fillText(i18n('seventy'), 25, 580);
            ctx.fillText(i18n('eighty'), 25, 355);
            ctx.fillText(i18n('ninety'), 170, 161);

            ctx.font = "bold 20px Arial";
            ctx.fillText(i18n('one'), 441, 87);
            ctx.fillText(i18n('two'), 465, 91);
            ctx.fillText(i18n('three'), 488, 94);
            ctx.fillText(i18n('four'), 514, 102);
            ctx.fillText(i18n('five'), 530, 107);
            ctx.fillText(i18n('six'), 555, 114);
            ctx.fillText(i18n('seven'), 580, 123);
            ctx.fillText(i18n('eight'), 604, 134);
            ctx.fillText(i18n('nine'), 623, 147);

        }

        //draw the black markers
        ctx.fillStyle = "black";
        ctx.font = "bold 45px Arial";
        ctx.fillText('.', 419, 115);
        ctx.fillText('.', 618, 180);
        ctx.fillText('.', 745, 350);
        ctx.fillText('.', 745, 565);
        ctx.fillText('.', 620, 737);
        ctx.fillText('.', 421, 803);
        ctx.fillText('.', 220, 737);
        ctx.fillText('.', 93, 568);
        ctx.fillText('.', 93, 350);
        ctx.fillText('.', 220, 180);
        ctx.closePath();

        function drawPoint(p, color) {

            var circle = new Path2D();
            circle.moveTo(pointArray[p].x, pointArray[p].y);
            circle.arc(pointArray[p].x, pointArray[p].y, radius, 0, 2 * Math.PI, false);
            circle.closePath();
            ctx.fillStyle = color;
            ctx.fill(circle);
            ctx.stroke();
        }

        function calcPointsCirc(cx, cy, rad) {

            var numPoints = 100;  // number of dots in the circle
            var points = [];
            var angle;
            var i = 0;

            for (i = 0; i <= numPoints; i++) {

                angle = 2 * Math.PI * i / numPoints;
                points.push({
                    x: cx + rad * Math.sin(angle),
                    y: cy - rad * Math.cos(angle)
                });
            }

            return points;
        }

    }
