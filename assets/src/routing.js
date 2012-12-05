(function() {

	var documents = [
		new Backbone.Model(
		{
			title: 'Javascript Modules',
			content: 'why do we need modules?'
		}),
		new Backbone.Model(
		{
			title: 'Module Systems',
			content: '3 competing module systems'
		})
	];

	var eventAggregator = _.extend({}, Backbone.Events);

	var ContentsView = Backbone.View.extend({
		tagName: 'ul',
		render: function() {
			_(this.collection).each(function(document) {
				this.$el.append(new DocumentListView({model: document}).render().el);
			}, this);
			return this;
		}
	});

	var DocumentListView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click': function() {
				eventAggregator.trigger('document:selected', this.model);
			}
		},
		render: function(){
			this.$el.html(this.model.get('title'));
			return this;
		}
	});

	var DocumentView = Backbone.View.extend({
		render: function() {
			this.$el.append(this.make('h1', null, this.model.get('title')));
			this.$el.append(this.make('div', null, this.model.get('content')));
			return this;
		}
	});

	var DocumentRouter = Backbone.Router.extend({
		routes: {
			'contents': 'contents',
			'view/:title': 'viewDocument'
		},
		contents: function() {
			$('body').html(new ContentsView({collection: documents}).render().el);
		},
		viewDocument: function(title) {
			console.log(title);
			var selectedDocument = _(documents).find(function(document){
				return document.get('title') === title;
			});
			$('body').empty().append(new DocumentView({model: selectedDocument}).render().el);
		}
	});

	eventAggregator.on('document:selected', function(document){
		var urlPath = 'view/' + document.get('title');
		router.navigate(urlPath, {trigger:true});
	});

	var router = new DocumentRouter();
	Backbone.history.start();

	router.navigate('contents', {trigger: true});

})();