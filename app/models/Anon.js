var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnonSchema = new Schema({
    avatar: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        required: true,
    },
});

var Anon = mongoose.model("Anon", AnonSchema);

module.exports = Anon;