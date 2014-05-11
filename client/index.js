Template.hello.greeting = function () {
  return "Finding the truth.";
};

Template.bulletin.questions = function () {
  if( Session.get('prefix') ){
    return Questions.find(
  			{title: 
  				{ $regex: Session.get('prefix') + '.*', $options: 'i' }
  			}
  		)
  } else {
  	return Questions.find(
  			{title: 
  				{ $regex: '.*', $options: 'i' }
  			}
  		)
  }
  
};

Template.hello.events({
  'click a#postQ': function () {
    window.location.href = '/post-a-question';
  }
});

Template.bulletin.events({
  'keyup .search input': function(){
  	console.log('changing prefix to: ' + Session.get('prefix'));
  	Session.set('prefix', $('.search input').val() );
  }
})