const { ObjectId } = require("mongodb");

class SplitteeController {
  static async addSplittee(req, res, next) {
    try {
      const billId = req.params.id;
      const { _id } = req.user;
      let finalSplitteeName = "";
      let maxSplitteeNumber = 0;
      const splittees = await req.db.collection("splittees").find().toArray();
      for (const splittee of splittees) {
        const splitteeName = splittee.splitteeName;
        if (splitteeName.startsWith("Splittee ")) {
          const splitteeNumber = parseInt(splitteeName.split(" ")[1], 10); // Explicitly specify base-10
          if (!isNaN(splitteeNumber)) {
            maxSplitteeNumber = Math.max(maxSplitteeNumber, splitteeNumber);
          }
        }
      }
      finalSplitteeName = `Splittee ${maxSplitteeNumber + 1}`;
      const newSplittee = {
        splitteeBillId: new ObjectId(billId),
        splitteeUserId: _id,
        splitteeName: finalSplitteeName,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createdSplittee = await req.db
        .collection("splittees")
        .insertOne(newSplittee);
      res.status(201).json({
        message: "Splittee created successfully",
        splitteeId: createdSplittee.insertedId,
        splitteeName: finalSplitteeName,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSplittee(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async editSplittee(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async deleteSplittee(req, res, next) {
    try {
      const splitteeId = req.params.sid;
      const billId = req.params.id;
      const { _id } = req.user;
      const splittee = await req.db.collection("splittees").findOne({
        _id: new ObjectId(splitteeId),
        splitteeBillId: billId,
        splitteeUserId: _id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SplitteeController;
