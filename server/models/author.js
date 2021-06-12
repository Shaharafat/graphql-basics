const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// book schema
const authorSchema = new Schema({
	name: String,
	age: Number,
});

module.exports = mongoose.model("Author", authorSchema);
