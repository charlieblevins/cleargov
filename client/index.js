Template.hello.greeting = function () {
  return "Finding the truth.";
};

Template.bulletin.questions = function () {
  return Questions.find({}, { sort: {title: 1} } );
};

Template.hello.events({
  'click a#postQ': function () {
    window.location.href = '/post-a-question';
  }
});