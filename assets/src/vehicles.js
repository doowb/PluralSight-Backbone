(function() {

  var Vehicle = Backbone.Model.extend({
    defaults: {
      'color': 'white',
      'type': 'car'
    },
    dump: function () {
      console.log(JSON.stringify(this.toJSON()));
    },
    validate: function (attrs) {
      var validColors = ['white', 'red', 'blue', 'yellow'];
      var colorIsValid = function(attrs) {
        if(!attrs.color) return true;
        return _(validColors).include(attrs.color);
      }
      if(!colorIsValid(attrs)){
        return "color must be one of: " + validColors.join(",");
      }
    }
  });

  var car = new Vehicle();
  car.on('error', function(model, error) {
    console.log(error);
  });

  car.set('foo', 'bar');
  car.dump();

  car.set('color', 'blue');
  car.dump();

  car.set('color', 'mauve');
  car.dump();

  car.set({color: 'turquoise'}, {
    error: function(model, error) {
      alert(error);
    }
  });
  car.dump();

  

})();