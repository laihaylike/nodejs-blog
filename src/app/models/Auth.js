const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Auth = new Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    slug: { type: String, slug:"name", unique: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Auth', Auth);