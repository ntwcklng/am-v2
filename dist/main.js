(function() {
  var name;

  name = 'Marvin';

  returnName(function() {
    return name;
  });

}).call(this);
