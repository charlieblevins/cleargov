Template.answer.events({//Create even listeners for the answer template
  'click button.post': function(){
    if(Meteor.userId()){
    	  Meteor.call('addQuestion', questionT.value, fullQ.value, function(error, qId){
        Router.go('home');
        console.log('User ' + Meteor.userId() + ' added question with ID: ' + qId);
      });
    } else {
    	  console.log('You must be logged in to answer a question.');
    }
  }
})
