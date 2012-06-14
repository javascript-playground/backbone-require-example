/**

How do I add to a collection after initialising it?
How can I show a filtered set of my objects?
How do I let a user add a new item?

**/
var Item = Backbone.Model.extend({
  defaults: {
    price: 35,
    photo: "http://www.placedog.com/100/100"
  }
});

var Cart = Backbone.Collection.extend({
  model: Item
});

var items = [
  { title: "Macbook Air", price: 799 },
  { title: "Macbook Pro", price: 999 },
  { title: "The new iPad", price: 399 },
  { title: "Magic Mouse", price: 50 },
  { title: "Cinema Display", price: 799 }
];

var cartCollection = new Cart(items);

var ItemView = Backbone.View.extend({
  tagName: "div",
  className: "item-wrap",
  template: _.template($("#itemTemplate").html()),

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var CartCollectionView = Backbone.View.extend({
  el: "body",
  $item_wrap: $("#yourcart"),
  events: {
    "submit #add": "addItem"
  },
  initialize: function() {
    this.collection = cartCollection;
    this.render();
  },
  render: function() {
    this.$item_wrap.html("");
    this.collection.each(function(item) {
      this.renderItem(item);
    }, this);
  },
  renderItem: function(item) {
    var itemView = new ItemView({ model: item });
    this.$item_wrap.append(itemView.render().el);
  },

  addItem: function(e) {
    e.preventDefault();

    var data = {};
    $("#add").children("input[type='text']").each(function(i, el) {
      data[el.id] = $(el).val();
    });

    var newItem = new Item(data);

    this.collection.add(newItem);
    this.renderItem(newItem);
  }
});


$(function() {
  var app = new CartCollectionView();

});
