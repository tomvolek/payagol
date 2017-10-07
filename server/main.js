import { Meteor } from 'meteor/meteor';
import { PricePosition } from '/imports/api/models.js';
import { Purchased } from '/imports/api/models.js';
import { FlowerBatchList } from '/imports/api/models.js';
import { FlowersCatalog } from '/imports/api/models.js';
import { Accounts } from 'meteor/accounts-base';
import { OldAuctions } from '/imports/api/models.js';


if (Meteor.isServer) {
    Meteor.startup(() => {
        const streamer = new Meteor.Streamer('chat');
        // code to run on server at startup
        streamer.allowRead('all');
       // streamer.allowWrite('all');
        streamer.allowWrite('notifications', function(eventName, type) { // Only admin users can write notificaiton events
            if (this.userId && type === 'new-message') {                   // and only if the first param is 'new-message'
                const user = Meteor.users.findOne(this.userId);
                if (user && user.admin === true) {
                    return true;
                }
            }

            return false;
        });

        // setup the upload directory for images, etc.
        UploadServer.init({
            tmpDir: process.env.PWD + '/.uploads/tmp',
            uploadDir: process.env.PWD + '/.uploads/',
            checkCreateDirectories: true,//create the directories for you
            getDirectory: function(fileInfo, formData) {
                // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
                return formData.contentType;
            },
            finished: function(fileInfo, formFields) {
                // perform a disk operation
            },
            cacheTime: 100,
            mimeTypes: {
                "xml": "application/xml",
                "vcf": "text/x-vcard"
            }
        });

        Avatar.setOptions({
            defaultImageUrl: "/default.png"
        });

        // Add user and Houston admin page collections to the list of collections to be shown by Admin page
        //Houston.add_collection(Meteor.users);
        //Houston.add_collection(Houston._admins);


        // disable updates by any user except Admin
        /* Meteor.users.deny({
         update: function() {
         return true;
         }
         });
         */
        // On Startup, reset the auction clock position to 0 in Mongo for both Current Position and previous run
       // const last_run_position = PricePosition.find().fetch().forEach(function(item) { return} );


         var last_run_position = PricePosition.find().fetch();
         console.log(last_run_position[0]._id); 


        PricePosition.update({_id: last_run_position[0]._id}, {$set: {current_position: 0, PreviousRunPosition: 0}});
        console.log("last run position server=", PricePosition.find().fetch()[0].current_position);
        console.log("last run position server=", PricePosition.find().fetch()[0].PreviousRunPosition);

        //console.log("socketis =",Streamy.sockets());


        // createRole(role) { };
        // Whitespace will be trimmed.
        //Roles.createRole('staff');
        //Roles.createRole('buyer');


        // check to see if tomtom admin user exists , if not create it.
        //var foundUser = Meteor.users.findOne({"profile.name": "tomtom"});
        // console.log("username=",foundUser);

         var foundUser = "";
         if (!Meteor.users.findOne({"username": "ajayebi"})) {
             var myusers = [
                 {name: "ajayebi", email: "ajayebi@payagol.com", roles: ['admin'],user_number:100},
                 {name: "tom", email: "tomtom@payagol.com", roles: ['admin'],user_number:101},
                 {name: "essi", email: "essi@payagol.com",  roles: ['buyer'],user_number:102},
                // {name: "tomvolek1", email: "tomvolek@payagol.com", roles: ['buyer']},
                 {name: "feri", email: "feri@payagol.com", roles: ['staff'],user_number:103},
                 {name: "Jalal", email: "jalal@payagol.com", roles: ['management'],user_number:104}
             ];

             _.each(myusers, function (user) {
                 var id;
                 id = Accounts.createUser({
                     email: user.email,
                     username: user.name,
                     password: "apple1",
                     user_number: user.usernumber,
                     balance: 1000000,
                     profile: {name: user.name},
                     profile: {balance: 1000000}
                 });

                 if (user.roles.length > 0 ) {
                     Roles.addUsersToRoles(id, user.roles, 'default-group')
                 }

                 if (user.username === "feri"){
                     //console.log("adding roles.......");
                     Roles.addUsersToRoles(id, 'staff', Roles.GLOBAL_GROUP)
                 }

                 if (user.name === "ajayebi" ){
                     console.log("adding roles for user ajayebi as admin");
                     Roles.addUsersToRoles(id, 'admin', 'default-group')
                     Roles.addUsersToRoles(id, 'super-admin', Roles.GLOBAL_GROUP)
                 }
                 //console.log("username=", user.username);
                 foundUser = Meteor.users.findOne({username: user.name});
                 console.log("username=",foundUser);

                 // Meteor.users.update(foundUser._id ,{ $set: {'emails.0.address': myuser.email }} );
                 //console.log(JSON.stringify(foundUser));
                // if (foundUser) {
                //     Roles.addUsersToRoles(foundUser._id, myuser.roles);
                // }
             });
         }
         else {}

        //Setup mail :  In  server code: define a method that the client can call
        Meteor.methods({
            sendEmail: function (to, from, subject, text) {
                check([to, from, subject, text], [String]);

                // Let other method calls from the same client start running,
                // without waiting for the email sending to complete.
                this.unblock();

                Email.send({
                    to: to,
                    from: from,
                    subject: subject,
                    text: text
                });
            }
        });

        // setup smtp crudentials
        smtp = {
            username: 'ajayebi',   // eg: server@gentlenode.com
            password: '1Man1Man',   // eg: 3eeP1gtizk5eziohfervU
            server: 'smtp.gmail.com',  // eg: mail.gandi.net
            port: 25
        }

        process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
        // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
        Accounts.emailTemplates.from = 'Gentlenode <no-reply@gentlenode.com>';

        // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
        Accounts.emailTemplates.siteName = 'Gentlenode Studio';

        // A Function that takes a user object and returns a String for the subject line of the email.
        Accounts.emailTemplates.verifyEmail.subject = function (user) {
            return 'Confirm Your Email Address';
        };

        // A Function that takes a user object and a url, and returns the body text for the email.
        // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
        Accounts.emailTemplates.verifyEmail.text = function (user, url) {
            return 'click on the following link to verify your email address: ' + url;
        };

        // Now that everything is properly configured, calling Accounts.sendVerificationEmail()
        // should send an email with a link the user can use to verify his or her email address
        /*Accounts.onCreateUser(function(options, user) {
         user.profile = {};

         // we wait for Meteor to create the user before sending an email
         Meteor.setTimeout(function() {
         Accounts.sendVerificationEmail(user._id);
         }, 2 * 1000);

         return user;
         });
         */


        // on the server
        Meteor.publish("flower_batch_lists", function () {
            return FlowerBatchList.find();
        }, {is_auto: true});

        Meteor.publish("price_positions", function () {
            //this.unblock();
            return PricePosition.find({});
        }, {is_auto: true});


        Meteor.publish("purchased", function () {
            //this.unblock();
            return Purchased.find({});
        }, {is_auto: true});

        Meteor.publish("old_auctions", function () {
            //this.unblock();
            return OldAuctions.find({});
        }, {is_auto: true});

        Meteor.publish("flowers_catalog", function () {
            return FlowersCatalog.find({});
        }, {is_auto: true});

        //publish users collection but only selected fields
        Meteor.publish("userlist", function () {
            //return Meteor.users.find({}, {fields: {'profile.specificData': 1}});
            //return Meteor.users.find({}, {fields: {username: 1}});
            return Meteor.users.find({});
            //return UsersList.find({});
        }, {is_auto: true});

        // publish collection for online users
        Meteor.publish("userStatus", function () {
            return Meteor.users.find({"status.online": true});
        }, {is_auto: true});

        // in server/publish.js
        Meteor.publish(null, function (){
            return Meteor.roles.find({})
        });

        Meteor.publish(null, function () {
            if (!this.userId) {
                return;
            }
            return Meteor.users.find({_id: this.userId}, {
                fields: {
                    "profile": 1,
                    "emailHash": 1,
                    "roles":1,
                    "services.twitter.profile_image_url_https": 1,
                    "services.twitter.profile_image_url": 1,
                    "services.facebook.id": 1,
                    "services.google.picture": 1,
                    "services.github.username": 1,
                    "services.instagram.profile_picture": 1,
                    "services.linkedin.pictureUrl": 1,
                    "services.strava.profile_medium": 1,
                    "services.runkeeper.small_picture": 1,
                }
            });
        }, {is_auto: true});

        Meteor.publish('presences', function() {
            return Presences.find({}, { userId: true });
        });

        Meteor.publish("users", function () {
            //return Meteor.users.find({}, {fields: {"profile.peerId": true, "emails.address": true} });
            return Meteor.users.find({} );
        });
    });   // End Meteor.Startup


    //Server side methods,  Call moveClock function after this time to move he price position
    Meteor.methods({
        // function to increase pr decrease price of an item on auction at will
        'movePriceUp': function (id_on_auction) {
        },
        'movePrice': function (id_on_auction) {
            var ClockCurrentPosition = 100;
            var Maximum_Price_Position = 0;  //price to stop clock at
            var firstRecord_id;
            Streamy.broadcast('hello', {data: 0});

            var last_run_position = PricePosition.find().fetch();

            console.log("last run position start movePrice=", PricePosition.find().fetch()[0].PreviousRunPosition);
            console.log("current  position start movePrice=", PricePosition.find().fetch()[0].current_position);

            //PricePosition.update({_id: last_run_position[0]._id}, {$set: { PreviousRunPrice: last_run_position[0].current_position }});
            PricePosition.update({_id: last_run_position[0]._id}, {$set: {current_position: 100}});

            //PricePosition.update({_id: last_run_position[0]._id}, {$set: { current_position: last_run_position[0].current_position }});
            console.log("current position=", PricePosition.find().fetch()[0].current_position);

            // reset the item OnAuction flag to 0 from last run.
            FlowerBatchList.update({OnAuction: 1}, {$set: {OnAuction: 0}});

            //look for the record which admin has passed in to set it to auction
            var onAuctionItem = FlowerBatchList.findOne({Product_id: id_on_auction});
            PricePosition.update({_id: last_run_position[0]._id}, {$set: {TargetPrice: onAuctionItem.PricePerFlower}});

            FlowerBatchList.update({_id: onAuctionItem._id}, {
                $set: {
                    OnAuction: 1,
                    Current_Auction_Price: Math.floor(onAuctionItem.PricePerFlower)
                }
            });

            // find the record which its auction flag is set to true
            //var onAuctionItem =  FlowerBatchList.findOne({ OnAuction: 1});
            // Grab the precision numbers after decimal, that is what the clock will move to
            Maximum_Price_Position = parseInt(String(onAuctionItem.PricePerFlower).split('.').pop(), 10);

            console.log("Maximum_price=", Maximum_Price_Position);

            // Move the clock pointer every xxx millisecond
            firstRecord_id = PricePosition.find().fetch()[0]._id;
            console.log("previous position outside  Max price  =", PricePosition.find().fetch()[0].PreviousRunPosition);
            var refreshClockPosition = Meteor.setInterval(function () {

                console.log("previous position outside  Max price  =", PricePosition.find().fetch()[0].PreviousRunPosition);
                /*
                 // When a client has connected
                 Streamy.onConnect(function() {
                 Streamy.broadcast('hello', { data: 'world!' });
                 });   */


                if (Maximum_Price_Position === 0) {

                    console.log("current position inside Max price  =", PricePosition.find().fetch()[0].current_position);
                    console.log("previous position inside Max price  =", PricePosition.find().fetch()[0].PreviousRunPosition);
                    PricePosition.update({_id: firstRecord_id}, {$set: {current_position: 0}});

                    Streamy.broadcast('hello', {data: 0});

                    clearInterval(refreshClockPosition);
                }
                else {

                    --ClockCurrentPosition; // decrement position of clock
                    Streamy.broadcast('hello', {data: ClockCurrentPosition});

                    PricePosition.update({_id: firstRecord_id}, {$inc: {current_position: -1}});
                    FlowerBatchList.update({_id: onAuctionItem._id}, {$inc: {Current_Auction_Price: -0.01}});
                    // console.log (FlowerBatchList.find.fetch().Current_Auction_Price) ;
                }


                if (ClockCurrentPosition <= Maximum_Price_Position) {
                    // reset the current_position in PricePosition collection
                    //PricePosition.update ({_id: firstRecord_id},{$set: {current_position:0} });
                    clearInterval(refreshClockPosition);
                    console.log("ClockCurrentPosition", ClockCurrentPosition);
                }

                //console.log("Server price position:", ClockCurrentPosition);
            }, 120); //speed of red dot movement

            // reset current position to zero

            PricePosition.update({_id: firstRecord_id}, {$set: {PreviousRunPosition: Maximum_Price_Position}});
        },

        'newAuction': function (id_on_auction) {
            if (id_on_auction == undefined || id_on_auction.length <= 0) {
                throw new Meteor.Error(404, " Please enter valid product id ")
                return
            }
            var found_item_on_auction = FlowerBatchList.find({Product_id: id_on_auction});
            return found_item_on_auction;
        },

        // method to update a record in FlowerBatchList collection with user input.
        'UpdateItem': function (data) {
            var found_record = FlowerBatchList.findOne({Product_id: data.Product_id});

            FlowerBatchList.update({_id: found_record._id}, {
                $set: {
                    Producer_name: data.Producer_name,
                    Producer_id: data.Producer_id,
                    Logo: data.Logo,
                    ProductName: data.ProductName,
                    Product_id: data.Product_id,
                    ProductImage: data.ProductImage,
                    Buyer_Number: data.Buyer_Number,
                    NumberOfItems: data.NumberOfItems,
                    PricePerFlower: data.PricePerFlower,
                    Trolleys: data.Trolleys,
                    ContainersPerTrolly: data.ContainersPerTrolly,
                    TotalContainers: data.TotalContainers,
                    FlowerPerContainer: data.FlowerPerContainer,
                    MinContainerToBuy: data.MinContainerToBuy,
                    Quality: data.quality,
                    Storage: data.storage,
                    s1: data.s1,
                    color: data.color,
                    s3: data.s3,
                    s4: data.s4,
                    formnumber: data.formnumber,
                    MoneteraryUnit: data.MoneteraryUnit,
                    Country: data.Country,
                    Product_grade: data.Product_grade,
                    createdAt: data.createdAt,
                    CreatorId: data.CreatorId,
                    username: Meteor.userId(),
                    AuctionDate: data.AuctionDate


                }
            });

        },
        'UpdateUser': function (data) {
            var found_record = Users.findOne({_id: data.User_id});

            Users.update({_id: found_record._id}, {
                $set: {
                    username: data.User_name
                    //emails[0].address: data.User_email,
                    //roles[0]: data.User_role

                }
            });

        },

        'Add_User': function (data) {
            console.log("inside Add_user");
            FlowerBatchList.insert(data, function (err) {
                if (err) throw err;
            });
        },

        'Add_Item': function (data) {
            console.log("inside Add_item");

            FlowerBatchList.insert(data, function (err) {
                if (err) throw err;
            });

        },

        'buyItem': function (userId, numberOfItemsToBuy) {
           console.log("Buyer id= ",userId);



            if (userId == undefined || userId.length <= 0) {
                throw new Meteor.Error(404, " Not a valid user id to buy items")
                return
            }
            if (numberOfItemsToBuy == undefined || numberOfItemsToBuy.length <= 0) {
                throw new Meteor.Error(405, " Please enter valid number of items to buy ")
                return
            }

            // look for item on sale  TotalContainers
            var found_item_on_auction = FlowerBatchList.findOne({OnAuction: 1});
            if (found_item_on_auction == undefined) {
                throw new Meteor.Error(406, " No item for auction ");
                return
            }

            // check to see if the pressed button to buy is Minimum or All of the containers
            if (numberOfItemsToBuy === "Minimum") { numberOfItemsToBuy = found_item_on_auction.MinContainerToBuy}
            else if (numberOfItemsToBuy === "All") { numberOfItemsToBuy = found_item_on_auction.TotalContainers}

            var purchased_amount = 0.0 ;
            var return_result;
            // test to see if the bidder has bid more than whats available
            if (numberOfItemsToBuy >= found_item_on_auction.TotalContainers) {
                found_item_on_auction.TotalContainers = 0;
                FlowerBatchList.update({OnAuction: 1}, {$set: {OnAuction: 0}});
                purchased_amount = numberOfItemsToBuy * found_item_on_auction.PricePerFlower * found_item_on_auction.FlowerPerContainer ;
                return_result = "Ran out of items to sell";
                // subtract the purchased items from users account balance
               // Meteor.users.update({_id: userId}, {$set: {balance: { $subtract : ["$balance",purchased_amount] }}});

               // PricePosition.update({_id: last_run_position[0]._id}, {$set: {current_position: 0, PreviousRunPosition: 0}});
               // add the sold out item to the auction history collection for further reporting
                OldAuctions.insert ({found_item_on_auction});
                return_result = "Bought less items than available."
                // Move this block of code to a nightly job as it blocks the collection till remove is done.
                // Remove the sold out item from today's list of items to sell in collection
                try {
                    FlowerBatchList.remove ({"_id" :found_item_on_auction._id});
                }
                catch (e){
                    console.log("not able to delete record with id: ",found_item_on_auction._id);
                }
            }
            else {// Subtract number numberOfItemsToBuy from Totalnumber of trolley
                found_item_on_auction.TotalContainers = found_item_on_auction.TotalContainers - numberOfItemsToBuy;
                //found_item_on_auction.Buyer_Number = userId ;
                purchased_amount = numberOfItemsToBuy * found_item_on_auction.PricePerFlower * found_item_on_auction.FlowerPerContainer ;

                FlowerBatchList.update({OnAuction: 1}, {$set: {
                    TotalContainers: found_item_on_auction.TotalContainers,
                    Buyer_Number: userId
                }});


                var user_balance = Meteor.users.findOne({ _id: Meteor.userId() }).profile.balance  - purchased_amount ;
                console.log("user_balance: ",user_balance);


                // Subtract the purchased items from users account balance
                Meteor.users.update({_id: Meteor.userId()},
                     {$set : {
                           'profile.balance':user_balance
                             }
                     });
                return_result = "Bought items."
            }

            // move the purchased items to purchased collection
            Purchased.insert({
                Producer_name: found_item_on_auction.Producer_name,
                Producer_id: found_item_on_auction.Producer_id,
                Logo: found_item_on_auction.Logo,
                ProductName: found_item_on_auction.ProductName,
                Product_id:  found_item_on_auction.Product_id,
                ProductImage: found_item_on_auction.ProductImage,
                Buyer_Number: found_item_on_auction.Buyer_Number,
                NumberOfItems: found_item_on_auction.NumberOfItems,
                PricePerFlower: found_item_on_auction.PricePerFlower,
                Trolleys: found_item_on_auction.Trolleys,
                ContainersPerTrolly: found_item_on_auction.ContainersPerTrolly,
                TotalContainers: found_item_on_auction.TotalContainers,
                FlowerPerContainer: found_item_on_auction.FlowerPerContainer,
                MinContainerToBuy: found_item_on_auction.MinContainerToBuy,
                Quality: found_item_on_auction.quality,
                Storage: found_item_on_auction.storage,
                s1: found_item_on_auction.s1,
                color: found_item_on_auction.color,
                s3: found_item_on_auction.s3,
                s4: found_item_on_auction.s4,
                formnumber: found_item_on_auction.formnumber,
                OnAuction: found_item_on_auction.OnAuction,
                Current_Auction_Price: found_item_on_auction.Current_Auction_Price,
                MoneteraryUnit: found_item_on_auction.MoneteraryUnit,
                Country: found_item_on_auction.Country,
                Product_grade: found_item_on_auction.Product_grade,
                createdAt: found_item_on_auction.createdAt,
                CreatorId: found_item_on_auction.CreatorId,
                username: userId,
                AuctionDate: found_item_on_auction.AuctionDate,
                NumberOfContainersBought: numberOfItemsToBuy
            });
         // return Meteor.users.findOne({_id: userId}, {fields: { balance: 1}});
            return return_result ;
        },
        'User_Banking': function (METHOD, data, userId ){
            HTTP.call( METHOD, 'http://google.com',  function( error, response ) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response);
                }
            });
        }

    });


    // Set which users can see server metrics
    Facts.setUserIdFilter(function () {
        return true;
    });


    Streamy.BroadCasts.allow = function (data, from) {
        // from is the socket object <= where do I get this socket from ?

        // data contains raw data you can access:
        // - the message via data.__msg
        // - the message data via data.__data
        return true;
    };

}  // Meteor.isServer
