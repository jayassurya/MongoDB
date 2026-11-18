use("InsuranceReportingDB");
// =====================================================
// SECTION 2: REPORT 1 - CLAIMS PER STATUS
// =====================================================

print("\nREPORT 1: CLAIMS PER STATUS");

printjson(
    db.getCollection("claims-notes").aggregate([

        {
            $match: {
                claimStatus: { $exists: true, $ne: null }
            }
        },

        {
            $group: {
                _id: "$claimStatus",
                totalClaims: { $sum: 1 },
                totalClaimAmount: { $sum: "$claimAmount" }
            }
        },

        {
            $sort: { totalClaims: -1, _id: 1 }
        }

    ]).toArray()
);


// =====================================================
// SECTION 3: REPORT 2 - AVERAGE SETTLEMENT TIME
// =====================================================

print("\nREPORT 2: AVERAGE SETTLEMENT TIME");

printjson(
    db.getCollection("claims-notes").aggregate([

        {
            $match: {
                claimStatus: "Settled",
                claimDate: { $type: "date" },
                settlementDate: { $type: "date" }
            }
        },

        {
            $group: {
                _id: null,
                averageSettlementDays: {
                    $avg: {
                        $dateDiff: {
                            startDate: "$claimDate",
                            endDate: "$settlementDate",
                            unit: "day"
                        }
                    }
                },
                totalSettledClaims: { $sum: 1 }
            }
        },

        {
            $sort: { averageSettlementDays: -1 }
        }

    ]).toArray()
);


// =====================================================
// SECTION 4: REPORT 3 - TOP 3 DAMAGE CATEGORIES
// =====================================================

print("\nREPORT 3: TOP 3 DAMAGE CATEGORIES");

printjson(
    db.getCollection("claims-notes").aggregate([

        {
            $match: {
                damageCategory: { $exists: true, $ne: null }
            }
        },

        {
            $group: {
                _id: "$damageCategory",
                totalClaims: { $sum: 1 },
                totalClaimAmount: { $sum: "$claimAmount" }
            }
        },

        {
            $sort: {
                totalClaims: -1,
                _id: 1
            }
        },

        {
            $limit: 3
        }

    ]).toArray()
);


// =====================================================
// SECTION 5: DATA VERIFICATION
// =====================================================

print("\nTOTAL CLAIM RECORDS:");

print(
    db.getCollection("claims-notes").countDocuments()
);

