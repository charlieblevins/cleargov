Template.submitAnswer.events({//Create even listeners for the answer template
  'click button.post': function(){
    var overwrite = true;
    if(Meteor.userId()){
      var alreadyAnswered = Questions.findOne(
        { _id: Session.get('qId'), answers: 
          { $elemMatch: 
            { uId: Meteor.userId() }
          }
        });
      console.log(alreadyAnswered);
      if(alreadyAnswered){
        overwrite = confirm("You have already answered this question. Click OK to overwrite your old answer with the new one.");
      }
      if(overwrite){
        Meteor.call('addAnswer', Session.get('qId'), fullA.value, function(error, ed){
          if(error){
            console.log(error);
          } else {
            console.log(ed);
            console.log('User ' + Meteor.userId() + ' added an answer to question: ' + Session.get('qId') + ' and effected ' + ed + ' documents.' );
          }
        });
      }
    } else {
    	  console.log('You must be logged in to answer a question.');
    }
  }
})

Template.submitAnswer.rendered = function(){
  console.log('answer template rendered');
  if( Meteor.userId() ){//If user is logged in...
    setTimeout(function(){
      $('#overlay').hide();//Hide the 'please sign in' dialog
      $('.intro textarea').attr('disabled', false);
      $('.intro').animate({opacity: 1});
    }, 100);
  } else { //if user is not logged in...
    setTimeout(function(){
      $('#overlay').show();//Hide the 'please sign in' dialog
      $('.intro textarea').attr('disabled', true);
      $('.intro').animate({opacity: 0.5});
    }, 100);
  }
}