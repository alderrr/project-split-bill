const { ObjectId } = require("mongodb");

class SplitteeController {
  static async addSplittee(req, res, next) {
    try {
      const billId = req.params.id;
      const { _id } = req.user;
      const bill = await req.db
        .collection("bills")
        .findOne({ _id: new ObjectId(billId), billUserId: _id });
      if (!bill) {
        throw new Error("Bill not found");
      }
      let finalSplitteeName = "";
      let maxSplitteeNumber = 0;
      if (bill.splittee && bill.splittee.length > 0) {
        for (const splittee of bill.splittee) {
          const splitteeName = splittee.splitteeName;
          if (splitteeName.startsWith("Splittee ")) {
            const splitteeNumber = parseInt(splitteeName.split(" ")[1], 10); // Explicitly specify base-10
            if (!isNaN(splitteeNumber)) {
              maxSplitteeNumber = Math.max(maxSplitteeNumber, splitteeNumber);
            }
          }
        }
      }
      finalSplitteeName = `Splittee ${maxSplitteeNumber + 1}`;
      const newSplittee = {
        splitteeId: new ObjectId(),
        splitteeName: finalSplitteeName,
        splitteeItems: [],
      };
      const createdSplittee = await req.db.collection("bills").updateOne(
        { _id: new ObjectId(billId) },
        {
          $push: { splittee: newSplittee },
          $set: { createdAt: new Date(), updatedAt: new Date() },
        }
      );
      if (createdSplittee.modifiedCount === 0) {
        throw new Error("Failed to add Splittee to Bill");
      }
      res.status(201).json({
        message: "Splittee added successfully",
        splittee: newSplittee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllSplittee(req, res, next) {
    try {
      const billId = req.params.id;
      const { _id } = req.user;
      const bill = await req.db.collection("bills").findOne({
        _id: new ObjectId(billId),
        billUserId: _id,
      });
      if (!bill) {
        throw new Error("Bill not found");
      }
      const splittees = bill.splittee;
      res.status(200).json({ splittees });
    } catch (error) {
      next(error);
    }
  }

  static async getOneSplittee(req, res, next) {
    try {
      const splitteeId = req.params.sid;
      const billId = req.params.id;
      const { _id } = req.user;
      const bill = await req.db
        .collection("bills")
        .findOne({ _id: new ObjectId(billId), billUserId: _id });
      if (!bill) {
        throw new Error("Bill not found");
      }
      const splittee = bill.splittee.find((splittee) => {
        return splittee.splitteeId.toString() == splitteeId;
      });
      if (!splittee) {
        throw new Error("Splittee not found");
      }
      res.status(200).json({ splittee });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SplitteeController;
