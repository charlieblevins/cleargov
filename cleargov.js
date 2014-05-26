Meteor.startup(function(){
	Router.map(function() {//Map pages/routes w/ iron router

    //HOME PAGE
    this.route('home', {path: '/'});//Home page

    // ABOUT PAGE
    this.route('about');//About page

    // SINGLE QUESTION PAGE
    this.route('question', {//Indiv question page
      path: '/question/:_slug',
      template: 'singleQuestion',
      waitOn: function(){
        var result = Questions.findOne({slug: this.params._slug});
        if (result){
          //Set session variable when user visits question
          Session.set('qId', result._id);
        }
      },
      data: function() {
        //Finds a question matching the url var
        var result = Questions.findOne({slug: this.params._slug});

        if(result){
          //Sort answers descending by vote
          result.answers = result.answers.sort(compare);
          return result;
        }        
      }
    });

    // POST QUESTION PAGE
    this.route('post-a-question', {//Post Question Page
      template: 'postQuestion'
    });

    // PROFILE PAGE
    this.route('profile', {
      path: '/:_username',
      template: 'profile',
      waitOn: function(){
        var profile = Meteor.users.findOne({username_slug: this.params._username});
        if (profile){
          //Send profile data to user when url matches existing user
          console.log(profile);
          return profile;
        }
      },
      data: function(){
        var profile = Meteor.users.findOne({username_slug: this.params._username});
        if (profile){
          //Send profile data to user when url matches existing user
          console.log(profile);
          return profile;
        }
      }
    })

  });
})

//Comparison function for use with sorging on singleQuestion route
function compare(a,b){
  return -(a.votes - b.votes);
}

