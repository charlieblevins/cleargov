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

        return Questions.update(
          qId,
          {$set: {answer: answerValue} }
        )

      } else {

        console.log('Unauthenticated user tried to post an answer.');

      }
    }
  })
}