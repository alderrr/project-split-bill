const { ObjectId } = require("mongodb");

class BillController {
  static async addBill(req, res, next) {
    try {
      const { _id } = req.user;
      const { billName } = req.body;
      let finalBillName = "";
      let maxBillNumber = 0;
      if (!billName) {
        const bills = await req.db.collection("bills").find().toArray();
        for (const bill of bills) {
          const billName = bill.billName;
          if (billName.startsWith("Bill ")) {
            const billNumber = parseInt(billName.split(" ")[1], 10); // Explicitly specify base-10
            if (!isNaN(billNumber)) {
              maxBillNumber = Math.max(maxBillNumber, billNumber);
            }
          }
        }
        finalBillName = `Bill ${maxBillNumber + 1}`;
      } else {
        const existingBill = await req.db
          .collection("bills")
          .find({ billName: billName })
          .limit(1)
          .toArray();
        if (existingBill.length === 0) {
          finalBillName = billName;
        } else {
          finalBillName = `${billName} ${existingBill.length + 1}`;
        }
      }
      const newBill = {
        billOwnerId: _id,
        billName: finalBillName,
        eventName: null,
        eventDate: null,
        splitee: [],
        items: [],
        tax: null,
        service: null,
        total: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createdBill = await req.db.collection("bills").insertOne(newBill);
      res.status(201).json({
        message: "Bill created successfully",
        billId: createdBill.insertedId,
        billName: finalBillName,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllBill(req, res, next) {
    try {
      const { _id } = req.user;
      const bills = await req.db
        .collection("bills")
        .find({ billOwnerId: _id })
        .toArray();
      res.status(200).json({ bills: bills });
    } catch (error) {
      next(error);
    }
  }
  static async getOneBill(req, res, next) {
    try {
      const billId = req.params.id;
      const { _id } = req.user;
      const bill = await req.db
        .collection("bills")
        .findOne({ _id: new ObjectId(billId), billOwnerId: _id });
      if (!bill) {
        throw new Error("Bill not found");
      }
      res.status(200).json({ bill });
    } catch (error) {
      next(error);
    }
  }
  static async editBill(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  static async deleteBill(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BillController;
