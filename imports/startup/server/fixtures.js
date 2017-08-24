import { Meteor }   from 'meteor/meteor';
import { Roles }    from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
//import { FlowerBatchList } from '/imports/api/models' ;
import { UploadServer } from 'meteor/tomi:upload-server'

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: { first: 'Hamid', last: 'Ajayebi' },
    },
    roles: ['admin'],
  }];

  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      Roles.addUsersToRoles(userId, roles);
    }
  });
}

Meteor.startup(() => { 
	if (FlowerBatchList.find().count() === 0 ) {
          const data = [
              {
		        Producer_name: 'Hamid Ajayebi',
                Logo: ' ' ,
                ProductName: 'Red Rose',
                Product_id: 1111 , 
              }
        ];
        }
}




