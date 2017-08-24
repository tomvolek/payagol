import { PricePosition } from '/imports/api/models.js';
import { Purchased } from '/imports/api/models.js';
import { FlowerBatchList } from '/imports/api/models.js';



AdminConfig = {
    name: 'tomtom',
    adminEmails: ['tomtom@payaneh.com'],
    collections: {
        FlowerBatchList: {collectionObject: FlowerBatchList},
        Purchased: {collectionObject: Purchased}

    },
};
