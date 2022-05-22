const Memory = require("../models/memory.model");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

async function payForPrivateMemory(req, res) {
    const { 
        userID,
        body: { id },
        params: { memoryID }
    } = req
    
    try {
        await stripe.paymentIntents.create({
            amount: 2000,
            currency: "USD",
            description: "Travel Memories",
            payment_method: id,
            confirm: true,
        });

        const memory = await Memory.findOne({ _id: memoryID.toString() })
        if (!memory) return res.status(404).json({ message: "Memory not found" })
        await Memory.findOneAndUpdate({ _id: memoryID.toString() }, { $push: { authorized: userID } })

        res.status(200).json({ message: "Payment Successful, access granted" });

    } catch (error) {
        res.status(400).json({ message: "Payment Failed" });
        console.log(error);
    }
}

module.exports = {
    payForPrivateMemory
}