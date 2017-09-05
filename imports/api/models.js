import { Mongo } from 'meteor/mongo';
import { TAPi18n }  from 'meteor/tap:i18n';
import { TAPi18nui} from 'meteor/tap:i18n-ui';

export const FlowerBatchList = new Mongo.Collection('flower_batch_lists');
export const Purchased = new Mongo.Collection('purchased');
export const PricePosition = new Mongo.Collection('price_positions');
export const OldAuctions = new Mongo.Collection('old_auctions');
export const FlowersCatalog = new Mongo.Collection('flowers_catalog');

