const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editorContentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: Object,
        required: true,
    }
});

module.exports = mongoose.model('UserEditorContent', editorContentSchema);