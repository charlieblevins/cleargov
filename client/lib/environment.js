Deps.autorun(function(){

if( Meteor.userId() ){//If user is logged in...
    setTimeout(function(){
      $('#overlay').hide();//Hide the 'please sign in' dialog
      $('.intro textarea, .intro button').attr('disabled', false);
      $('.intro').animate({opacity: 1});
    }, 100);
  } else { //if user is not logged in...
    setTimeout(function(){
      $('#overlay').show();//Hide the 'please sign in' dialog
      $('.intro textarea').attr('disabled', true);
      $('.intro').animate({opacity: 0.5});
    }, 100);
  }



  Meteor.subscribe('userData');


});

