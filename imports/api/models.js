import { Mongo } from 'meteor/mongo';
import { TAPi18n }  from 'meteor/tap:i18n';
import { TAPi18nui} from 'meteor/tap:i18n-ui';

export const FlowerBatchList = new Mongo.Collection('flower_batch_lists');
export const Purchased = new Mongo.Collection('purchased');
//CirclePoints = new Meteor.Collection('circle_points_collection');
export const FlowerCatalog = new Meteor.Collection('flower_catalog');
export const PricePosition = new Mongo.Collection('price_positions');

