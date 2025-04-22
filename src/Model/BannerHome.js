const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
    bannerHeader: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true, },
            productId: { type: mongoose.Schema.Types.String, ref: 'Product', required: true, }
        }
    ],
    bannerMidle: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true, },
            productId: { type: mongoose.Schema.Types.String, ref: 'Product', required: true, }
        }
    ],
    // bannerFooter: [
    //     {
    //         name: { type: String, required: true },
    //         image: { type: String, required: true, },
    //         productId: { type: mongoose.Schema.Types.String, ref: 'Product', required: true, }
    //     }
    // ]
}, { timestamps: true });

const Banner = mongoose.model("Banner", BannerSchema);
module.exports = Banner;
