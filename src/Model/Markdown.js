const mongoose = require('mongoose');
const MarkdownSchema = new mongoose.Schema({

    contentMarkdown: { type: String, },
    contentHTML: { type: String },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, }

}, { timestamps: true });

const Markdown = mongoose.model('Markdown', MarkdownSchema);

module.exports = Markdown 