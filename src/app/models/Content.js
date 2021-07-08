const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Content = new Schema({
    name: { type: String },
    author: { type: String },
    con: {type: String},
    avatar: { type: String },
    poster: { type: String },
    slug: { type: String, slug:"name", unique: true}
}, {
    timestamps: true,
});

Content.plugin(mongooseDelete, { 
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Content', Content);