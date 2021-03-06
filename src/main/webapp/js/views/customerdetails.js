var CustomerView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#customer-details').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()))
        return this;
    }
});

var CustomerListView = Backbone.View.extend({
    el:'tbody',
    initialize: function () {
        this.listenTo(this.collection, 'sync change', this.render);
        this.collection.fetch();
        this.render();
    },

    render: function () {
        this.collection.each(function (customer) {
            var customerView = new CustomerView({model: customer});
            console.log(customer);
            this.$el.append(customerView.render().el)
        },this);
        return this;
    }
});

var customers = new CustomerCollection();
var customersView = new CustomerListView({collection: customers});
$(document.getElementById("customer-table")).append(customersView.render().el);
