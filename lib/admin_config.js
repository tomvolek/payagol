import SimpleSchema from 'simpl-schema';  // simpl-schema was installed via npm, hence imported as such.
import { PricePosition } from '/imports/api/models.js';
import { Purchased } from '/imports/api/models.js';
import { FlowerBatchList } from '/imports/api/models.js';
import { OldAuctions }  from '/imports/api/models.js' ;
import { FlowersCatalog} from  '/imports/api/models.js' ;



AdminConfig = {
    skin: 'green-light',   // set admin navbar color
    name: 'tomtom',
    adminEmails: ['tomtom@payagol.com'],
    collections: {
      //  FlowerBatchList: {collectionObject: FlowerBatchList},
      //  Purchased: {collectionObject: Purchased},
      //  OldAuctions: {collectionObject: OldAuctions},
      //  PricePosition: {collectionObject: PricePosition},
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


//SimpleSchema.extendOptions(['autoform']);

Schemas = {};

//FlowersCatalog = new Meteor.Collection('flowers_catalog');

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
});

FlowersCatalog.attachSchema(Schemas.FlowersCatalog);