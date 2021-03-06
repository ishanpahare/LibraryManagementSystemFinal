var OrderBookView = Backbone.View.extend({
    template: _.template($('#order-book-tmpl').html()),

    events: {
        submit: 'save'
    },
    save: function (e) {
        e.preventDefault();
        var vendorId = Number(this.$('input[name="vid"]').val());
        var isbn = Number(this.$('input[name="isbn"]').val());
        var quantity = Number(this.$('input[name="quantity"]').val());
        console.log("The id is " + vendorId);
        console.log("The isbn is " + isbn);
        console.log("The quantity is " + quantity);
        this.model.save({id: vendorId, isbn: isbn, quantity: quantity}, {
            success: function (model, response, options) {
                console.log('Save successful');
                document.getElementById('status').innerHTML = "Books ordered successfully!"

            },
            error: function (model, xhr, options) {
                console.log('Save error');
                document.getElementById('status').innerHTML = "Books could not be ordered as either the vendor doesn't exist or Book not available with vendor"

            }
        });
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

var orderBook = new OrderBook();
var orderBookView = new OrderBookView({model: orderBook});
$(document.body).append(orderBookView.render().el);
