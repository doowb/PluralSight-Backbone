(function() {

	var template = '<p>Latitude: {{lat}}</p><p>Longitude: {{lon}}</p>{{#each numbers}}<p>{{.}}</p>{{/each}}'
	var compiled = Handlebars.compile(template);

	console.log(compiled);

	var V = Backbone.View.extend( {
		render: function() {
			var data = {
				lat: -27,
				lon: 153,
				numbers: [1,2,3]
			};
			var rendered = compiled(data);
			this.$el.html(rendered);
			return this;
		}
	});


	var v = new V({el: 'body'});
	v.render();
})();