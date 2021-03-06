var cid = Number(sessionStorage.getItem('id'));

var IssuedView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#issued-book-details-tmpl').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var IssuedListView = Backbone.View.extend({
    el:'tbody',
    initialize: function () {
        console.log("collection view initialized!");
        this.listenTo(this.collection, 'sync change', this.render);
        this.collection.fetch();
        this.render();
    },

    render: function () {
        this.collection.each(function (issuedBook) {
            console.log('inside the loop of collections');
            var issuedView = new IssuedView({model: issuedBook});
            console.log(issuedBook);
            this.$el.append(issuedView.render().el)
        }, this);
        return this;
    }
});


var issuedList = new IssuedCustomerCollection([],{id:cid});
var issuedListView = new IssuedListView({collection: issuedList});
$(document.getElementById("issued-info-table")).append(issuedListView.render().el);

