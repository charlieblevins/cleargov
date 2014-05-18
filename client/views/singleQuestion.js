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
      if(alreadyAnswered){
        overwrite = confirm("You have already answered this question. Click OK to overwrite your old answer with the new one.");
      }
      if(overwrite){
        Meteor.call('addAnswer', Session.get('qId'), fullA.value, function(error, ed){
          if(error){
            console.log(error);
          } else {
            console.log('User ' + Meteor.userId() + ' added an answer to question: ' + Session.get('qId') + ' and effected ' + ed + ' documents.' );
            
          }
        });
      }
    } else {
    	  console.log('You must be logged in to answer a question.');
    }
  }//end button.post click
})

Template.singleQuestion.events({
  'click a.upvote': function(){
    if(Meteor.userId()){
      Meteor.call('upVote', this.answer, Session.get('qId'), Meteor.userId(), function(error, ed){
        if(error){
          console.log(error);
        } else {//Vote was successfull...
          $('.upvote').hide();
          console.log('User ' + Meteor.userId() + ' added a vote to question: ' + Session.get('qId') + ' and effected ' + ed + ' documents.' );
        }
      });
    }

    //hideVoting();
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

  //hideVoting();
}

Template.ansr.rendered = function(){
  //hideVoting();
}

