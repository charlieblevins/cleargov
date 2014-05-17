if (Meteor.isServer) {
  Meteor.methods({
  	addQuestion : function(qValue, qContent){
  	  if(Meteor.userId()){
  	  	var qId = Questions.insert({
  	  	  title: qValue,
  	  	  fullQuestion: qContent
  	    });
  	    return qId;
  	  } else {
  	  	console.log('Unauthenticated user tried to post.');
  	  }
  	},
  	enablePostQuestion : function(){
  		Accounts.onLogin(function(){
  			return true;
  		})
  	},
    titleToString : function(string){
      string.replace(/\s+/g, '-').replace(/\?/g, '').toLowerCase();
    },
    addAnswer : function(qId, answerValue){

      //If user is logged in
      if(Meteor.userId()){
        var uId = Meteor.userId();
        var alreadyAnswered = Questions.findOne(
          { _id: qId, answers: 
            { $elemMatch: 
              { uId: Meteor.userId() }
            }
          });
        if( alreadyAnswered ){
          //var overwrite = prompt("You have already answered this question. Click OK to overwrite your old answer with the new one.");
          return Questions.update(
            {_id: qId, "answers.uId" : Meteor.userId() },
            {
              $set: { "answers.$" : 
                { 
                  answer : answerValue,
                  time : new Date(),
                  uId : Meteor.userId(),
                  uname : Meteor.user().profile.name
                }
              }
            }
          )
        } else {
          return Questions.update(
            //Find a question that has id of qId && has an answer by user id
            {_id : qId },
            {
              $push: {
                answers : {
                  uId : Meteor.userId(),
                  uname : Meteor.user().profile.name,
                  answer : answerValue,
                  time : new Date()
                }
              }
            }
          )
        }
      } else {
        console.log('Unauthenticated user tried to post an answer...');
      }
    },
    upVote : function(answer, qId, uId){
      //add a vote to the answer
      if( Meteor.userId() ){
        return Questions.update(
            {_id: qId, "answers.answer" : answer },
            {
              $inc: { "answers.$.votes" : 1},
              $push: { "answers.$.voters" : uId }
            }
          )
      } else {
        console.log('Unauthenticated user tried to upvote.')
      }
      
    }
  })
}