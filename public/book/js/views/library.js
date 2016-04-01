/*global Backbone, $ */
var app = app || {};
(function () {
    'use strict';
    app.LibraryView = Backbone.View.extend({
        el: '.books-list',
        events: {
            'click #add': 'addBook'
        },
        initialize: function () {
            this.collection = new app.Library();
            this.collection.fetch({
                reset: true
            });
            this.render();

            this.listenTo(this.collection, 'add', this.renderBook);
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.collection.each(function (item) {
                this.renderBook(item);
            }, this);
        },
        renderBook: function (item) {
            var bookView = new app.BookView({
                model: item
            });
            this.$el.append(bookView.render().el);
        },
        addBook: function (e) {
            e.preventDefault();
            var formData = {};
            $('#addBook div').children('input').each(function (i, el) {
                if ($(el).val() !== '') {
                    formData[el.id] = $(el).val();
                }
            });
            this.collection.create(formData);

        }
    });
}());