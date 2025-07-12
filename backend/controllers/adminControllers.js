const Banner = require("../models/Banner")
const mongoose = require("mongoose")

const addBanner = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "image not found" })
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

        const newBanner = await Banner.create({ title, description, imageUrl })
        return res.status(200).json({ message: "banner successfully updated", newBanner })
    }
    catch (e) {
        return res.status(500).json({ error: e })

    }
}
module.exports = { addBanner }