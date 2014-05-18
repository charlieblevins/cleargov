

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
            Session.set('qId', result._id);
          }
        },
        data: function() {
          return Questions.findOne({slug: this.params._slug});//Finds a question matching the url var
		      //Session.set('slug', this.params._slug);
        }
      });
      this.route('post-a-question', {//Post Question Page
        template: 'postQuestion'
      });

    });
  })




