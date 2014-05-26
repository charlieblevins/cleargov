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
                  uname : Meteor.user().profile.name,
                  votes : 0
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
                  time : new Date(),
                  votes : 0
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

        //Check if users name is stored in voters array
        var alreadyVoted = Questions.findOne({
            _id: qId, 'answers.voters' : { $elemMatch : { userId : Meteor.userId() } }
          });

        var ownQuestion = Questions.findOne({
          _id     : qId,
          answers : { $elemMatch: { uId: Meteor.userId() } }
        });

        if(alreadyVoted){
          throw new Meteor.Error(405, 'This user has already voted on this answer. Vote will not be saved');
        } else if (ownQuestion) {
          throw new Meteor.Error(405, 'Users are not allowed to vote on their own answers. Vote will not be saved.');
        } else {
          //Setup a return object for use in the template
          var voteData = {};

          //Updates and returns the number of rows effected
          voteData.rowsEffected = Questions.update(
            {_id: qId, "answers.answer" : answer },
            {
              $inc: { "answers.$.votes" : 1},
              $push: { "answers.$.voters" : { userId : uId, voteTime : new Date() } }
            }
          )

          //
          // Update answerer's points and return user id
          //

          var q = Questions.findOne({
          	_id: qId
          })

          //Find the answer that was voted on and save the user's id
          q.answers.forEach(function(entry){
          	if(entry.answer == answer){
          		voteData.answerer = entry.uId;
          		return;
          	}
          })

          Meteor.users.update({
          	_id: voteData.answerer, 
          }, {
          	$inc: {points : 1}
          });

          voteData.answererdata = Meteor.users.findOne({
          	_id: voteData.answerer
          })

          return voteData;
        }
      } else {
        console.log('Unauthenticated user tried to upvote.');

      }
      
    },
    removeUser : function(uId){
      
    }
  })
}