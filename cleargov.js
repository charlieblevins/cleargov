Meteor.startup(function(){
	Router.map(function() {//Map pages/routes w/ iron router

    this.route('home', {path: '/'});//Home page
    this.route('about');//About page
    this.route('question', {//Indiv question page
      path: '/question/:_slug',
      template: 'singleQuestion',
      waitOn: function(){
        var result = Questions.findOne({slug: this.params._slug});
        if (result){
          //Set session variable when user visites question
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
    this.route('post-a-question', {//Post Question Page
      template: 'postQuestion'
    });

  });
})

function compare(a,b){
  return -(a.votes - b.votes);
}

