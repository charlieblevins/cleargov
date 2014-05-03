
if (Meteor.isClient) {

  Router.map(function() {//Map pages/routes w/ iron router

    this.route('home', {path: '/'});//Home page
    this.route('about');//About page
    this.route('question', {//Indiv question page
      path: '/question/:_id',
      data: function() {
        return Questions.findOne({num: Number(this.params._id)});//Finds a question matching the url var
      }
    });
    this.route('post-a-question', {
      template: 'postQuestion'
    });

  });

  Meteor.startup(function(){
  	
  })
}//End isClient



