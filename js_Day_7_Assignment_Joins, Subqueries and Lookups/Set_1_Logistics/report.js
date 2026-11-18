

const logisticsDB = db.getSiblingDB("Hexaware_Day7_Logistics");


/* ============================================================
   PIPELINE 1: SHIPMENTS WITH DELIVERY EVENTS
   ============================================================ */

print("\n");
print("==================================================");
print("PIPELINE 1: SHIPMENTS WITH DELIVERY EVENTS");
print("==================================================");

const pipeline1 = [
    {
        $lookup: {
            from: "deliveryEvents",
            localField: "ShipmentID",
            foreignField: "ShipmentID",
            as: "DeliveryEvents"
        }
    },
    {
        $project: {
            _id: 0,
            ShipmentID: 1,
            CustomerID: 1,
            CarrierID: 1,
            OriginHubID: 1,
            DestinationHubID: 1,
            ShippingCost: 1,
            DeliveryEvents: 1
        }
    },
    {
        $sort: {
            ShipmentID: 1
        }
    }
];

logisticsDB.shipments.aggregate(pipeline1).forEach(printjson);


/* ============================================================
   PIPELINE 2: CUSTOMERS WITH THEIR SHIPMENTS
   ============================================================ */

print("\n");
print("==================================================");
print("PIPELINE 2: CUSTOMERS WITH THEIR SHIPMENTS");
print("==================================================");

const pipeline2 = [
    {
        $lookup: {
            from: "shipments",
            localField: "CustomerID",
            foreignField: "CustomerID",
            as: "CustomerShipments"
        }
    },
    {
        $addFields: {
            TotalShipments: {
                $size: "$CustomerShipments"
            }
        }
    },
    {
        $project: {
            _id: 0,
            CustomerID: 1,
            CustomerName: 1,
            Email: 1,
            TotalShipments: 1,
            CustomerShipments: 1
        }
    },
    {
        $sort: {
            CustomerID: 1
        }
    }
];

logisticsDB.customers.aggregate(pipeline2).forEach(printjson);


/* ============================================================
   PIPELINE 3: CARRIERS WITH DELAY STATISTICS
   ============================================================ */

print("\n");
print("==================================================");
print("PIPELINE 3: CARRIERS WITH DELAY STATISTICS");
print("==================================================");

const pipeline3 = [
    {
        $lookup: {
            from: "shipments",
            let: {
                carrierID: "$CarrierID"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: [
                                        "$CarrierID",
                                        "$$carrierID"
                                    ]
                                },
                                {
                                    $ne: [
                                        "$ActualDeliveryDate",
                                        null
                                    ]
                                }
                            ]
                        }
                    }
                },
                {
                    $addFields: {
                        DelayDays: {
                            $dateDiff: {
                                startDate: "$ExpectedDeliveryDate",
                                endDate: "$ActualDeliveryDate",
                                unit: "day"
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        TotalDeliveredShipments: {
                            $sum: 1
                        },
                        AverageDelayDays: {
                            $avg: "$DelayDays"
                        },
                        MaximumDelayDays: {
                            $max: "$DelayDays"
                        }
                    }
                }
            ],
            as: "DelayStatistics"
        }
    },
    {
        $unwind: {
            path: "$DelayStatistics",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $project: {
            _id: 0,
            CarrierID: 1,
            CarrierName: 1,
            TotalDeliveredShipments: {
                $ifNull: [
                    "$DelayStatistics.TotalDeliveredShipments",
                    0
                ]
            },
            AverageDelayDays: {
                $round: [
                    {
                        $ifNull: [
                            "$DelayStatistics.AverageDelayDays",
                            0
                        ]
                    },
                    2
                ]
            },
            MaximumDelayDays: {
                $ifNull: [
                    "$DelayStatistics.MaximumDelayDays",
                    0
                ]
            }
        }
    },
    {
        $sort: {
            AverageDelayDays: -1
        }
    }
];

logisticsDB.carriers.aggregate(pipeline3).forEach(printjson);


/* ============================================================
   VERIFICATION
   ============================================================ */

print("\n");
print("==================================================");
print("ALL THREE PIPELINES EXECUTED");
print("==================================================");

print("Shipments: " + logisticsDB.shipments.countDocuments());
print("Delivery Events: " + logisticsDB.deliveryEvents.countDocuments());
print("Customers: " + logisticsDB.customers.countDocuments());
print("Carriers: " + logisticsDB.carriers.countDocuments());

print("\nDAY 7 SET 1 MONGODB REPORTS COMPLETED!");
