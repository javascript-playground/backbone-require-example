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

var ItemCollectionView = Backbone.View.extend({
  el: '#yourcart',
  initialize: function() {
    this.collection = cartCollection;
    this.render();
  },
  render: function() {
    this.$el.html("");
    this.collection.each(function(item) {
      this.renderItem(item);
    }, this);
    this.collection.on("reset", this.render, this);
  },
  renderItem: function(item) {
    var itemView = new ItemView({model: item});
    this.$el.append(itemView.render().el);
  },
  addItem: function() {
    var data = {};
    $("#add").children("input[type='text']").each(function(i, el) {
      data[el.id] = $(el).val();
    });
    var newItem = new Item(data);
    this.collection.add(newItem);
    this.renderItem(newItem);
  },
  filterByPrice: function() {
    // first reset the collection
    // but do it silently so the event doesn't trigger
    this.collection.reset(items, { silent: true });
    var max = parseFloat($("#less-than").val(), 10);
    var filtered = _.filter(this.collection.models, function(item) {
      return item.get("price") < max;
    });
    // trigger reset again
    // but this time trigger the event so the collection view is rerendered
    this.collection.reset(filtered);
  },
  clearFilter: function() {
    $("#less-than").val("");
    this.collection.reset(items);
  }
});

var CartCollectionView = Backbone.View.extend({
  el: "body",
  events: {
    "submit #add": "addItem",
    "submit #filter": "filterItems",
    "click #clear-filter": "clearFilter"
  },
  initialize: function() {
    this.itemView = new ItemCollectionView();
  },
  addItem: function(e) {
    e.preventDefault();
    this.itemView.addItem();
  },
  filterItems: function(e) {
    e.preventDefault();
    this.itemView.filterByPrice();
  },
  clearFilter: function(e) {
    e.preventDefault();
    this.itemView.clearFilter();
  }

});


$(function() {
  var app = new CartCollectionView();
});
