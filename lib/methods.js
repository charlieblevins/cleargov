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
  	}
  })
}