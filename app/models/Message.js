var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({

    message: {
        type: String,
        required: true,
    },

    mood: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        required: true,
    },

    anon: {
        type: Schema.Types.ObjectId,
        ref: "Anon"
    },
});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
