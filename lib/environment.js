if(Meteor.isClient){
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
})
      

}


if (Meteor.isServer) {
  Meteor.startup(function () {

    //DUMMY DATA SETUP
    //Meteor.users.remove({});

    Questions.remove({});//ReInit db
    if (Questions.find().count() === 0) {

      var titles = ["Why was the new interchange from 400 South to 85 North built?",
                   "Which Georgia congressman initiated the T-SPLOST vote?",
                   "Is minimum wage decided on the federal, state, or local level?"];
      for (var i = 0; i < titles.length; i++)
        Questions.insert({
          num: i,
          title: titles[i],
          slug: titles[i].replace(/\s+/g, '-').replace(/\?/g, '').replace(/\,/g, '').toLowerCase(),
          fullQuestion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          answers: [{
            uId : '7dFNpaBAwfXeMQkii',
            uname : 'test girl',
            answer : 'This is a test answer. This answer was loaded on startup.',
            time : new Date(),
            votes : 0
          },
          {
            uId : 'madeUpId3',
            uname : 'Fake Person 3',
            answer : 'This is another answer. This answer was loaded on startup.',
            time : new Date(),
            votes : 0
          }]
        });
    }//END DUMMY DATA

    console.log('ClearGov started.');
  });

  // Create username slug for profile urls
  Accounts.onCreateUser(function(options, user) {

    //Convert varioius characters for use in username_slug
    user.username_slug = options.username.replace(/\s+/g, '-').replace(/\?/g, '').replace(/\,/g, '').toLowerCase();
    user.points = 0;

    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;

    return user;
  });


}
