import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TAPi18n }   from 'meteor/tap:i18n';
import { TAPi18nui} from 'meteor/tap:i18n-ui';
import { Moment }  from 'meteor/momentjs:moment';
import { UploadServer } from 'meteor/tomi:upload-server';
import { UploadJquery } from 'meteor/tomi:upload-jquery';
import { IronRouter } from  'meteor/iron:router' ;
import { PricePosition } from '/imports/api/models.js';
import { Purchased } from '/imports/api/models.js';
import { FlowerBatchList } from '/imports/api/models.js';
import { FilesCollection } from 'meteor/ostrio:files';
import { FlowersCatalog } from '/imports/api/models.js';



//import  pdfMake from 'meteor/alexwine:pdfmake';
//import { PdfMake } from 'meteor/alexwine:pdfmake';
// import  pdfMake from 'meteor/nilsdannemann:pdfmake';
//import pdfMake from 'pdfmake';
//const  pdfmake = require('pdfmake');
//var pdfmake = require("/node_modules/pdfmake/build/pdfmake.min.js");

function openPdf() {
    var docDefinition = { content: "This is a sample PDF printed with pdfMake" };
    createPdf(docDefinition).open();
}

//import { Accounts } from 'meteor/accounts-base';

const Collections = {FlowerBatchList};

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

    Meteor.subscribe("flowers_catalog", {
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

   Meteor.subscribe('presences');

    // add support for cordova plugin to read in bar codes.
if (Meteor.isCordova) {

    Template.barcode_scanner.events({
        'click button': function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );

        }
    });
}

    Meteor.startup(function () {
        // this will prevent the application from reloading once a form is submitted.
        Meteor._reload.onMigrate(function () { return [false]; });


        TimeSync.loggingEnabled = false; // turn off loggin for clock Timesync messages
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
            browse: "Browse",
            cancelled: i18n("Cancelled"),
            remove: i18n("Remove"),
            upload: "Upload",
            done: i18n("Done"),
            cancel: i18n("Cancel")
        }
        Uploader.finished = function(index, fileInfo, templateContext) {
            console.log("filename is : ",fileInfo);
            document.getElementById("ProductImage").value = fileInfo.extraData;
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
    const streamer = new Meteor.Streamer('chat');
    messages = new Mongo.Collection(null);
    window.sendMessage = function(text) {
        streamer.emit('message', {
            type: 'user',
            user: Meteor.user() ? Meteor.user().username : 'anonymous',
            text: text
        });
        messages.insert({
            type: 'self',
            text: text
        });
        //$("#messages").animate({ scrollTop: 0 }, "fast");
        var myDiv = document.getElementById('messages');

        myDiv.scrollIntoView(false);

    };

    streamer.on('message', function(message) {
        messages.insert(message);
    });
     //set up templates for chat
    Template.mychat.events({
        'keydown input'(e) {
            if (e.which === 13) {
                window.sendMessage(e.target.value);
                e.target.value = '';
            }
        }
    });

    Template.mychat.helpers({
        messages() {
            return messages.find();
        }
    });




    // draw the clock face
    Template.draw_clock.onRendered (function(){

    var canvas = document.getElementById('myCanvas');
    canvas.style.width = 600;
    canvas.style.height = 630;
    var ctx = canvas.getContext('2d');

    // 425,425 are cx,cy will control distance of circle from left or top
    var pointArray = calcPointsCirc(425, 455, 360);

    var radius = 8;  //RADIUS OF THE DOTS
    var p;

    //diameter  of the clock
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
        ctx.fillText(i18n('hundred'), 640, 151);
        ctx.fillText(i18n('twohundred'), 785, 355);
        ctx.fillText(i18n('threehundred'), 780, 580);
        ctx.fillText(i18n('fourhundred'), 640, 775);
        ctx.fillText(i18n('fivehundred'), 410, 851);
        ctx.fillText(i18n('sixhundred'), 175, 778);
        ctx.fillText(i18n('sevenhundred'), 15, 580);
        ctx.fillText(i18n('eighthundred'), 15, 355);
        ctx.fillText(i18n('ninehundred'), 165, 151);

    } else if (TAPi18n.getLanguage() === 'fa') {
        console.log("inside fa drawClock function");
        i18n.setLanguage('fa');
        ctx.font = "bold 50px Arial";
        ctx.fillText(i18n('zero'), 413, 80);
        ctx.fillText(i18n('hundred'), 640, 161);
        ctx.fillText(i18n('twohundred'), 780, 365);
        ctx.fillText(i18n('threehundred'), 780, 590);
        ctx.fillText(i18n('fourhundred'), 640, 790);
        ctx.fillText(i18n('fivehundred'), 410, 862);
        ctx.fillText(i18n('sixhundred'), 140, 788);
        ctx.fillText(i18n('sevenhundred'), 2, 580);
        ctx.fillText(i18n('eighthundred'), 2, 355);
        ctx.fillText(i18n('ninehundred'), 140, 161);

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
                drawPoint(firstRecord.PreviousRunPosition, 'white');  //white out the previous auction price on the clock.
                drawPoint(0, 'red');  //set the red dot top of the clock at 0

                console.log("Blue the target point ..............",parseInt(String(firstRecord.TargetPrice).split('.').pop(), 10));
                drawPoint(parseInt(String(firstRecord.TargetPrice).split('.').pop(), 10), 'blue');
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
            return FlowerBatchList.find({OnAuction: 1 });
        }
    });


    //Template to display reports of buying activity for all users
    Template.Report.helpers({
        purchased: function () {
            return Purchased.find();
        },
        tableSettings: function () {
            return {
                rowsPerPage: 15,
                showFilter: true,
                showNavigation: 'auto',
                showColumnToggles: true,
                showRowCount: true,
                showNavigationRowsPerPage: true,
                multiColumnSort: true,
                rowClass: 'line-height:10px',
                fields: [
                    {key: 'AuctionDate', label: i18n('AuctionDate')},
                    {key: 'ProductName', label: i18n('Product_Name'), headerClass: 'col-md-4'},
                    {key: 'Buyer_Number', label: i18n('Buyer_Number')},
                    {key: 'NumberOfContainersBought', label: i18n('Items_Bought')},
                    {key: 'Current_Auction_Price', label: i18n('Price_Bought')},
                    {key: 'ProductImage', label:  i18n('Product_Image') , fn: function(ProductImage){ return new Spacebars.SafeString('<div id="report_image"><img  class="hvr-grow"  width="20" height="20" src="/images/flower/'+ ProductImage +'" /></div>'); } }

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
                rowsPerPage: 15,
                showFilter: true,
                showNavigation: 'auto',
                showColumnToggles: true,
                showRowCount: true,
                showNavigationRowsPerPage: true,
                multiColumnSort: true,
                rowClass: 'line-height:10px',
                    fields: [
                    {key: 'AuctionDate', label: i18n('AuctionDate')},
                    {key: 'ProductName', label: i18n('Product_Name'), headerClass: 'col-md-4'},
                    {key: 'Buyer_Number', label: i18n('Buyer_Number')},
                    {key: 'NumberOfContainersBought', label: i18n('Items_Bought')},
                    {key: 'Current_Auction_Price', label: i18n('Price_Bought')},
                    {key: 'ProductImage', label:  i18n('Product_Image') , fn: function(ProductImage){ return new Spacebars.SafeString('<img class="hvr-grow" class="img-thumbnail" width="20" height="20" src="/images/flower/'+ ProductImage +'" />'); } }

                    ],
                useFontAwesome: true,
                group: 'purchase'
            };

        }
    });

    Template.report_user_purchase.events({
        'click #print_button': function() {
            //var customerPurchase = Purchased.find({username: Meteor.userId()});

            /*Define the pdf-document
            var docDefinition = {
                content: [
                    'Some text',
                    customerPurchase,
                    'Some text'
                ]
            }; */
            var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

            // Start the pdf-generation process
            pdfMake.createPdf(docDefinition).open();
            //pdfMake.createPdf(docDefinition).print();

        }
    });

    //Template to display reports of buying activity for all users
    Template.Flowers_Catalog.helpers({
        flowerscatalog : function () {
            return FlowersCatalog.find();
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
                    {key: 'ProductId', label: i18n('Producer_ID')},
                    {key: 'ProductType', label: i18n('Product_Type'), headerClass: 'col-md-4'},
                    {key: 'ProductName', label: i18n('Product_Name')},
                    {key: 'Country', label: i18n('Country')},
                    {key: 'Region', label: i18n('Region')},
                    {key: 'Seasonality', label: i18n('Season')},
                    {key: 'ProductImage', label:  i18n('Product_Image') , fn: function(ProductImage){ return new Spacebars.SafeString('<div id="report_image"><img class="hvr-grow" class="img-thumbnail" width="30" height="30" src="/images/flower/'+ ProductImage +'" /></div>'); } },
                   // {key: 'Barcode', label:  i18n('Barcode') , fn: function(Barcode){ return new Spacebars.SafeString('<div>' + Barcode + '</div>'); }}
                    {key: 'Barcode', label:  i18n('Barcode') , fn: function(Barcode){ return new Spacebars.SafeString('<div><span class="barcode"> *'+Barcode+'* </span></div>'); }}
                ],
                useFontAwesome: true,
                group: 'flowerscatalog'
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
            var color = template.find("input[name=color]").value;
            var s3 = template.find("input[name=s3]").value;
            var s4 = template.find("input[name=s4]").value;
            var formnumber = template.find("input[name=formnumber]").value;
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
                color: color,
                s3: s3,
                s4: s4,
                formnumber: formnumber,
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
            var color = template.find("input[name=color]").value;
            var s3 = template.find("input[name=s3]").value;
            var s4 = template.find("input[name=s4]").value;
            var formnumber = template.find("input[name=formnumber]").value;
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
                color: color,
                s3: s3,
                s4: s4,
                formnumber: formnumber,
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
            Meteor.call('buyItem', userId, numberOfItemsToBuy, function(error, result) {
                if (error) {
                    console.log("no user returned from Meteor.user ...");
                }
                else {
                    console.log(result);
                }
            });
        }
    });

    Template.navigation.events({
        'click #menu-toggle': function (event,template) {
           event.preventDefault();
           console.log("Navigation");
            $('.row-offcanvas').toggleClass('active');


    }
});

    Template.user_keyboard.events({
        'click #keyboard': function (event,template) {
            event.preventDefault();
            var keyBoardValue = event.currentTarget.keyboard.value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_boardall': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_boardall').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board26': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board26').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board24': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board24').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board22': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board22').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board20': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board20').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board18': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board18').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board16': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board16').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board14': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board14').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board12': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board12').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board10': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board10').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board9': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board9').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board8': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board8').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board7': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board7').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board6': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board6').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board5': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board5').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board4': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board4').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board3': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board3').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board2': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board2').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #key_board1': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#key_board1').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        },
        'click #Minimum': function (event,template) {
            event.preventDefault();
            var keyBoardValue = template.find('#Minimum').value;
            console.log("Value of pressed key",keyBoardValue);
            document.getElementById("num_container_field").value  =  keyBoardValue ;
            return false;
        }
    });


    Template.user_balance.helpers ({
        balance: function() {
            //var userId = Meteor.userId();
             var user_record = Meteor.users.findOne({ _id: Meteor.userId() });
            // var user_balance =  Meteor.users.findOne({_id: userId}, {fields: {'profile.balance': 1}});
            console.log("balance",user_record.balance) ;
            return user_record.balance.toFixed(3);
        }
     });

    Template.userbanking.helpers({
        user_banking: function () {
            var data = {};
            //var transactions = {};
            Meteor.call('User_Banking', 'GET', data, Meteor.userId());
            return data;
}
});

    Template.form_set_item_on_auction.events({

        'submit #my_auction_price': function (event, template) {
            //console.log(event.type);
            event.preventDefault();
            var id_on_auction = event.target.on_auction.value;
            console.log("id on auction=", id_on_auction);
            // set the dot on clock pertaining to the auction price to blue

            //white out the red dot on the clock from last run
            //resetLastAuctionRun();
            //resetLastAuctionRun();

            //Meteor.call('movePrice','0');
            Meteor.call('movePrice', id_on_auction);

        }
    });



    Template.registerHelper('Collections', Collections);

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


    Template.myTemplate.helpers({
    topGenresChart: function() {
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: this.username + "'s top genres"
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'genre',
                data: [
                    ['Adventure',   45.0],
                    ['Action',       26.8],
                    ['Ecchi',   12.8],
                    ['Comedy',    8.5],
                    ['Yuri',     6.2]
                ]
            }]
        };
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

    Template.Auction_Audio.events({
    "click #makeCall": function () {
        var user = this;
        var outgoingCall = peer.call(user.profile.peerId, window.localStream);
        window.currentCall = outgoingCall;
        outgoingCall.on('stream', function (remoteStream) {
            window.remoteStream = remoteStream;
            var video = document.getElementById("theirVideo")
            video.src = URL.createObjectURL(remoteStream);
        });
    },
    "click #endCall": function () {
        window.currentCall.close();
    }
    });

    Template.Auction_Audio.helpers({
    users: function () {
        // exclude the currentUser
        var userIds = Presences.find().map(function(presence) {return presence.userId;});
        return Meteor.users.find({_id: {$in: userIds, $ne: Meteor.userId()}});
    }
    });

    Template.Auction_Audio.onCreated(function () {
    Meteor.subscribe("presences");
    Meteor.subscribe("users");

    window.peer = new Peer({
        key: '2p9ffp7ol6p3nmi',  // change this key
        debug: 3,
        config: {'iceServers': [
            { url: 'stun:stun.l.google.com:19302' },
            { url: 'stun:stun1.l.google.com:19302' },
        ]}
    });

    // This event: remote peer receives a call
    peer.on('open', function () {
        $('#myPeerId').text(peer.id);
        // update the current user's profile
        Meteor.users.update({_id: Meteor.userId()}, {
            $set: {
                profile: { peerId: peer.id}
            }
        });
    });

    // This event: remote peer receives a call
    peer.on('call', function (incomingCall) {
        window.currentCall = incomingCall;
        incomingCall.answer(window.localStream);
        incomingCall.on('stream', function (remoteStream) {
            window.remoteStream = remoteStream;
            var video = document.getElementById("theirVideo")
            //video.src = URL.createObjectURL(remoteStream);
            video.srcObject = remoteStream;
        });
    });

    navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia );

    // get audio/video
    navigator.getUserMedia({audio:true, video: true}, function (stream) {
            //display video
            var video = document.getElementById("myVideo");
            //video.src = URL.createObjectURL(stream);
            video.srcObject = stream;
            window.localStream = stream;
        }, function (error) { console.log(error); }
    );

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
    // Display alert on main page
    Bert.alert({
        title: 'پایاگل',
        message: 'مزایده در ساعت 8 صبح آغاز خواهد شد',
        type: 'info',
        style: 'growl-top-right',
        icon: 'fa-life-ring',
        hideDelay: 60000
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
            ctx.fillText(i18n('hundred'), 640, 151);
            ctx.fillText(i18n('twohundred'), 785, 355);
            ctx.fillText(i18n('threehundred'), 780, 580);
            ctx.fillText(i18n('fourhundred'), 640, 775);
            ctx.fillText(i18n('fivehundred'), 410, 851);
            ctx.fillText(i18n('sixhundred'), 165, 778);
            ctx.fillText(i18n('sevenhundred'), 15, 580);
            ctx.fillText(i18n('eighthundred'), 15, 355);
            ctx.fillText(i18n('ninehundred'), 165, 151);

        } else if (TAPi18n.getLanguage() === 'fa') {
            console.log("inside fa drawClock function");
            i18n.setLanguage('fa');
            ctx.font = "bold 50px Arial";
            ctx.fillText(i18n('zero'), 413, 80);
            ctx.fillText(i18n('hundred'), 640, 161);
            ctx.fillText(i18n('twohundred'), 780, 365);
            ctx.fillText(i18n('threehundred'), 780, 590);
            ctx.fillText(i18n('fourhundred'), 640, 790);
            ctx.fillText(i18n('fivehundred'), 410, 862);
            ctx.fillText(i18n('sixhundred'), 140, 788);
            ctx.fillText(i18n('sevenhundred'), 2, 580);
            ctx.fillText(i18n('eighthundred'), 2, 355);
            ctx.fillText(i18n('ninehundred'), 140, 161);

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

        // shahkareh Mack azeez
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

    // Jquery specific functions
    // setup function for side menu




    /*
     * Call the function to built the chart when the template is rendered
     */
    Template.Charts.rendered = function() {
        builtPie();
    }

    Template.annualSales.rendered = function() {
        builtColumn();
    }

    Template.quarterSales.rendered = function() {
        CombinedChart();
    }

    // pie chart
    function builtPie() {

    // 'external' data
    var data = new Array();

    data.push({
        name: 'زباله',
        y: 10,
        color: '#55BF3B'
    });

    data.push({
        name: 'بدهی',
        y: 12,
        color: '#DDDF0D'
    });

    data.push({
        name: 'اخذ شده',
        y: 30,
        color: '#DF5353'
    });

    $('#container-pie').highcharts({

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },

        title: {
            text: ''
        },

        credits: {
            enabled: false
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },

        series: [{
            type: 'pie',
            name: 'Anteil',
            data: data
        }]
    });
}  //end pie chart

    // column chart
    function builtColumn() {

    $('#container-column').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text:  i18n('Monthly_Sales')
        },

        subtitle: {
            text: i18n('Source: Payagol')
        },

        credits: {
            enabled: false
        },

        xAxis: {
            categories: [
                i18n('Jan'),
                i18n('Feb'),
                i18n('Mar'),
                i18n('Apr'),
                i18n('May'),
                i18n('Jun'),
                i18n('Jul'),
                i18n('Aug'),
                i18n('Sep'),
                i18n('Oct'),
                i18n('Nov'),
                i18n('Dec')
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: i18n('Sales (million)')
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} m</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        series: [{
            name: 'Tehran',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'Mazandaran',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'Gilan',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Mahallat',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
    });
    }   // end of column chart


   function CombinedChart() {
       $('#container-combinedcharts').highcharts({
    title: {
        text: 'نمودار ترکیبی'
    },
    xAxis: {
        categories: ['گلایول', 'میخک', 'گل رز', 'آنتوریوم', 'مریم']
    },
    labels: {
        items: [{
            html: 'فروش کل گل',
            style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: 'بهرام',
        data: [3, 2, 1, 3, 4]
    }, {
        type: 'column',
        name: 'خادم',
        data: [2, 3, 5, 7, 6]
    }, {
        type: 'column',
        name: 'گل رز',
        data: [4, 3, 3, 9, 0]
    }, {
        type: 'spline',
        name: 'میانگین',
        data: [3, 2.67, 3, 6.33, 3.33],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'pie',
        name: 'مصرف کل',
        data: [{
            name: 'Jane',
            y: 13,
            color: Highcharts.getOptions().colors[0] // Jane's color
        }, {
            name: 'John',
            y: 23,
            color: Highcharts.getOptions().colors[1] // John's color
        }, {
            name: 'Joe',
            y: 19,
            color: Highcharts.getOptions().colors[2] // Joe's color
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]}
       )
}

 Template.mytable.rendered = function() {

  MyTable();
 }

   function MyTable() {
       export default {
           data () {
               return {
                   columns1: [
                       {
                           title: '姓名',
                           key: 'name'
                       },
                       {
                           title: '年龄',
                           key: 'age'
                       },
                       {
                           title: '地址',
                           key: 'address'
                       }
                   ],
                   data1: [
                       {
                           name: '王小明',
                           age: 18,
                           address: '北京市朝阳区芍药居'
                       },
                       {
                           name: '张小刚',
                           age: 25,
                           address: '北京市海淀区西二旗'
                       },
                       {
                           name: '李小红',
                           age: 30,
                           address: '上海市浦东新区世纪大道'
                       },
                       {
                           name: '周小伟',
                           age: 26,
                           address: '深圳市南山区深南大道'
                       }
                   ]
               }
           }
       }
   }

