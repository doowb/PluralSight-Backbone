(function() {

  var FormView = Backbone.View.extend({
    events: {
      'click .clickable': 'handleClick',
      'change': function() {
        console.log('handleChange');
      }
    },
    render: function() {
      this.$el.html(
        '<input type="text" class="clickable" placeholder="clickable"/><input type="text"/>'
        );
      return this;
    },
    handleClick: function() {
      console.log('handleClick');
    }
  });

  var fv = new FormView();
  $('body').append(fv.render().el);


})();