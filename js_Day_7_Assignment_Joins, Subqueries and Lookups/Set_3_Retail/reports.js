
// =======================================================
// HEXAWARE DAY 7 - SET 3
// RETAIL RETURNS AND REFUNDS
// THREE MONGODB $LOOKUP PIPELINES
// =======================================================

use("Hexaware_Day7_Retail");

// =======================================================
// PIPELINE 1:
// RETURNS WITH CUSTOMER, PRODUCT AND FEEDBACK DETAILS
// =======================================================

print("\n========== PIPELINE 1: RETURNS WITH FEEDBACK ==========");

db.returns.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "CustomerID",
      foreignField: "CustomerID",
      as: "customerDetails"
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "ProductID",
      foreignField: "ProductID",
      as: "productDetails"
    }
  },
  {
    $lookup: {
      from: "returnsFeedback",
      localField: "ReturnID",
      foreignField: "ReturnID",
      as: "feedbackDetails"
    }
  },
  {
    $unwind: {
      path: "$customerDetails",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unwind: {
      path: "$productDetails",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      _id: 0,
      ReturnID: 1,
      CustomerName: "$customerDetails.CustomerName",
      ProductName: "$productDetails.ProductName",
      ReturnQuantity: 1,
      ReturnReason: 1,
      ReturnStatus: 1,
      Feedback: "$feedbackDetails"
    }
  },
  {
    $sort: {
      ReturnID: 1
    }
  }
]).forEach(printjson);


// =======================================================
// PIPELINE 2:
// STORES WITH RETURN AND CUSTOMER FEEDBACK STATISTICS
// =======================================================

print("\n========== PIPELINE 2: STORE FEEDBACK ANALYSIS ==========");

db.stores.aggregate([
  {
    $lookup: {
      from: "returns",
      localField: "StoreID",
      foreignField: "StoreID",
      as: "returnDetails"
    }
  },
  {
    $lookup: {
      from: "returnsFeedback",
      localField: "StoreID",
      foreignField: "StoreID",
      as: "feedbackDetails"
    }
  },
  {
    $addFields: {
      TotalReturns: {
        $size: "$returnDetails"
      },
      TotalFeedback: {
        $size: "$feedbackDetails"
      },
      AverageRating: {
        $cond: [
          { $gt: [{ $size: "$feedbackDetails" }, 0] },
          { $avg: "$feedbackDetails.Rating" },
          null
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      StoreID: 1,
      StoreName: 1,
      Region: 1,
      TotalReturns: 1,
      TotalFeedback: 1,
      AverageRating: {
        $round: ["$AverageRating", 2]
      }
    }
  },
  {
    $sort: {
      AverageRating: -1
    }
  }
]).forEach(printjson);


// =======================================================
// PIPELINE 3:
// CUSTOMERS WITH RETURN HISTORY AND FEEDBACK
// =======================================================

print("\n========== PIPELINE 3: CUSTOMER RETURN EXPERIENCE ==========");

db.customers.aggregate([
  {
    $lookup: {
      from: "returns",
      localField: "CustomerID",
      foreignField: "CustomerID",
      as: "returnDetails"
    }
  },
  {
    $lookup: {
      from: "returnsFeedback",
      localField: "CustomerID",
      foreignField: "CustomerID",
      as: "feedbackDetails"
    }
  },
  {
    $addFields: {
      TotalReturns: {
        $size: "$returnDetails"
      },
      TotalFeedback: {
        $size: "$feedbackDetails"
      },
      AverageRating: {
        $cond: [
          { $gt: [{ $size: "$feedbackDetails" }, 0] },
          { $avg: "$feedbackDetails.Rating" },
          null
        ]
      },
      ReturnReasons: {
        $map: {
          input: "$returnDetails",
          as: "item",
          in: "$$item.ReturnReason"
        }
      },
      FeedbackComments: {
        $map: {
          input: "$feedbackDetails",
          as: "item",
          in: "$$item.FeedbackComment"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      CustomerID: 1,
      CustomerName: 1,
      TotalReturns: 1,
      TotalFeedback: 1,
      AverageRating: {
        $round: ["$AverageRating", 2]
      },
      ReturnReasons: 1,
      FeedbackComments: 1
    }
  },
  {
    $sort: {
      TotalReturns: -1
    }
  }
]).forEach(printjson);


// =======================================================
// END OF REPORTS
// =======================================================

print("\nALL THREE MONGODB $LOOKUP PIPELINES EXECUTED.");
