
import SimpleSchema from 'simpl-schema';  // simpl-schema was installed via npm, hence imported as such.
import { PricePosition } from '/imports/api/models.js';
import { Purchased } from '/imports/api/models.js';
import { FlowerBatchList } from '/imports/api/models.js';
import { OldAuctions }  from '/imports/api/models.js' ;
import { FlowersCatalog} from  '/imports/api/models.js' ;
import { Events} from  '/imports/api/models.js' ;



AdminConfig = {
    skin: 'green-light',   // set admin navbar color
    name: 'ajayebi',
    adminEmails: ['ajayebi@payagol.com'],
    collections: {
        FlowerBatchList: {collectionObject: FlowerBatchList},
        Purchased: {collectionObject: Purchased},
        OldAuctions: {collectionObject: OldAuctions},
        PricePosition: {collectionObject: PricePosition},
        FlowersCatalog : {collectionObject: FlowersCatalog}
    }
};

AdminDashboard.addSidebarItem('Analytics', {
    icon: 'line-chart',
    urls: [
        { title: 'Statistics', url: AdminDashboard.path('/analytics/statistics') },
        { title: 'Settings', url: AdminDashboard.path('/analytics/settings') }
    ]
});


SimpleSchema.extendOptions(['autoform']);

Schemas = {};


// define schemas for each collection
Schemas.FlowersCatalog = new SimpleSchema({
    ProductId: {
        type: String,
        max: 15
    },
    ProductType: {
        type: String,
        max: 20
    },
    ProductName: {
        type: String,
        max: 35
    },
    ProductImage: {
        type: String,
        max: 30
    },
    PricePerFlower: {
        type: String,
        max: 30
    },
    Quality: {
        type: String,
        max: 3
    },
    StemLength: {
        type: String,
        max: 10
    },
    ProducerName: {
        type: String,
        max: 30
    },
    ProducerId: {
        type: String,
        max: 10
    },
    Logo: {
        type: String,
        max: 30
    },
    Country: {
        type: String,
        max: 20
    },
    Region: {
        type: String,
        max: 20
    },
    Seasonality: {
        type: String,
        max: 10
    },
    PlantingMonth: {
        type: String,
        max: 10
    },
    WateringCycles: {
        type: String,
        max: 10
    },
    GrowingNotes: {
        type: String,
        max: 35
    },
    createdAt: {
        type: String,
        max: 20
    },
    CreatorId: {
        type: String,
        max: 35
    },
    Barcode: {
        type: String,
        max: 30
    }
},{ tracker: Tracker });

Schemas.FlowerBatchList = new SimpleSchema ({
    Producer_name: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }

    },
    Producer_id: {
        type: String,
        label: "Producer_id",
        max: 10,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Logo: {
        type: String,
        label: "Logo",
        max: 40,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    ProductName: {
        type: String,
        label: "ProductName",
        max: 40,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Product_id: {
        type: String,
        label: "Product_id",
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }

    },
    ProductImage: {
        type: String,
        label: "ProductImage",
        max: 30,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Buyer_Number: {
        type: String,
        label: "Buyer_Number",
        max: 30,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    NumberOfItems: {
        type: Number,
        label: "NumberOfItems",
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    PricePerFlower: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Trolleys: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    ContainersPerTrolly: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    TotalContainers: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    FlowerPerContainer: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    MinContainerToBuy: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Quality: {
        type: String,
        max: 5,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Storage: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    s1: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    color: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    s3: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    s4: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    formnumber: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    MoneteraryUnit: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Country: {
        type: String,
        max: 15,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Product_grade: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    createdAt: {
        type: Date,
        max: 15,
        autoValue: function() {
            if (this.isInsert)
                return new Date()
        },
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    CreatorId: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    AuctionDate: {
        type: Date,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    OnAuction: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    Current_Auction_Price: {
        type: Number,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    StemLength: {
        type: String,
        max: 5,
        autoform: {
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    }
});

Schemas.Purchased = new SimpleSchema ({
    Producer_name: {
        type: String,
        max: 15
    },
    Producer_id: {
        type: String,
        max: 15
    },
    Logo: {
        type: String,
        max: 15
    },
    ProductName: {
        type: String,
        max: 35
    },
    Product_id: {
        type: Number
    },
    ProductImage: {
        type: String,
        max: 30
    },
    Buyer_Number: {
        type: String,
        max: 15
    },
    NumberOfItems: {
        type: String,
        max: 15
    },
    PricePerFlower: {
        type: Number ,
        max: 30
    },
    Trolleys: {
        type: Number,
        max: 15
    },
    ContainersPerTrolly: {
        type: Number,
        max: 15
    },
    TotalContainers: {
        type: Number,
        max: 15
    },
    FlowerPerContainer: {
        type: String,
        max: 15
    },
    MinContainerToBuy: {
        type: Number,
        max: 15
    },
    Quality: {
        type: String,
        max: 3
    },
    Storage: {
        type: String,
        max: 15
    },
    s1: {
        type: String,
        max: 15
    },
    color: {
        type: String,
        max: 15
    },
    s3: {
        type: String,
        max: 15
    },
    s4: {
        type: String,
        max: 15
    },
    formnumber: {
        type: Number,
        max: 10
    },
    OnAuction: {
        type: String,
        max: 15
    },
    Current_Auction_Price: {
        type: Number,
        max: 10
    },
    MoneteraryUnit: {
        type: String,
        max: 15
    },
    Country: {
        type: String,
        max: 15
    },
    Product_grade: {
        type: Number,
        max: 15
    },
    createdAt: {
        type: Date,
        max: 15
    },
    CreatorId: {
        type: Number,
        max: 15
    },
    username: {
        type: String,
        max: 15
    },
    AuctionDate: {
        type: Date,
        max: 15
    },
    Producer_id: {
        type: String,
        max: 15
    },
    NumberOfContainersBought: {
        type: Number,
        max: 15
    },
    StemLength: {
        type: String,
        max: 10
    }
});
Schemas.OldAuctions = new SimpleSchema ({
    Producer_name: {
        type: String,
        max: 15
    },
    Producer_id: {
        type: String,
        max: 15
    },
    Logo: {
        type: String,
        max: 15
    },
    ProductName: {
        type: String,
        max: 35
    },
    Product_id: {
        type: Number
    },
    ProductImage: {
        type: String,
        max: 30
    },
    Buyer_Number: {
        type: String,
        max: 15
    },
    NumberOfItems: {
        type: String,
        max: 15
    },
    PricePerFlower: {
        type: Number ,
        max: 30
    },
    Trolleys: {
        type: Number,
        max: 15
    },
    ContainersPerTrolly: {
        type: Number,
        max: 15
    },
    TotalContainers: {
        type: Number,
        max: 15
    },
    FlowerPerContainer: {
        type: String,
        max: 15
    },
    MinContainerToBuy: {
        type: Number,
        max: 15
    },
    Quality: {
        type: String,
        max: 3
    },
    Storage: {
        type: String,
        max: 15
    },
    s1: {
        type: String,
        max: 15
    },
    color: {
        type: String,
        max: 15
    },
    s3: {
        type: String,
        max: 15
    },
    s4: {
        type: String,
        max: 15
    },
    formnumber: {
        type: Number,
        max: 10
    },
    OnAuction: {
        type: String,
        max: 15
    },
    Current_Auction_Price: {
        type: Number,
        max: 10
    },
    MoneteraryUnit: {
        type: String,
        max: 15
    },
    Country: {
        type: String,
        max: 15
    },
    Product_grade: {
        type: Number,
        max: 15
    },
    createdAt: {
        type: Date,
        max: 15
    },
    CreatorId: {
        type: Number,
        max: 15
    },
    username: {
        type: String,
        max: 15
    },
    AuctionDate: {
        type: Date,
        max: 15
    },
    Producer_id: {
        type: Number
    },
    NumberOfContainersBought: {
        type: Number
    },
    StemLength: {
        type: String,
        max: 10
    }
});
Schemas.PricePosition = new SimpleSchema ({
    current_position: {
        type: String,
        max: 15
    },
    TargetPrice: {
        type: Number,
        max: 15
    },
    PreviousRunPosition: {
        type: Number,
        max: 15
    }
});

let EventsSchema = new SimpleSchema({
    'title': {
        type: String,
        label: 'The title of this event.'
    },
    'start': {
        type: String,
        label: 'When this event will start.'
    },
    'end': {
        type: String,
        label: 'When this event will end.'
    },
    'type': {
        type: String,
        label: 'What type of event is this?',
        allowedValues: [ 'Birthday', 'Corporate', 'Wedding', 'Miscellaneous' ]
    },
    'guests': {
        type: Number,
        label: 'The number of guests expected at this event.'
    }
});

// make sure you attach schema to teh collection after the schema is defined in earlier stage in this file.
FlowersCatalog.attachSchema(Schemas.FlowersCatalog);
FlowerBatchList.attachSchema(Schemas.FlowerBatchList);
Events.attachSchema( EventsSchema );