//Publish all user data - remove from production!
Meteor.publish('userData', function() {
  return Meteor.users.find({});
});