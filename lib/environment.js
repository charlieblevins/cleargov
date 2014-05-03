if (Meteor.isServer) {
  Meteor.startup(function () {
    Questions.remove({});//ReInit db
    if (Questions.find().count() === 0) {
      var titles = ["Why was the new interchange from 400 South to 85 North built?",
                   "Which Georgia congressman initiated the T-SPLOST vote?",
                   "Is minimum wage decided on the federal, state, or local level?"];
      for (var i = 0; i < titles.length; i++)
        Questions.insert({
          num: i,
          title: titles[i],
          fullQuestion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        });
    }
    console.log('ClearGov started.');
  });

}
