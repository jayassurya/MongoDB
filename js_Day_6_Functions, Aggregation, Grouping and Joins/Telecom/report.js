
use("TelecomReportingDB");

const usageEvents = db.getCollection("usage-events");

// ================================================
// PIPELINE 1: HOURLY USAGE
// Purpose: Calculate total data usage for each hour.
// ================================================

console.log("\n================================");
console.log("PIPELINE 1 - HOURLY USAGE");
console.log("================================");

const hourlyResults = usageEvents.aggregate([
    {
        $group: {
            _id: {
                $dateTrunc: {
                    date: "$eventTimestamp",
                    unit: "hour"
                }
            },
            totalEvents: { $sum: 1 },
            totalDataUsedMB: { $sum: "$dataUsedMB" }
        }
    },
    {
        $sort: { _id: 1 }
    },
    {
        $project: {
            _id: 0,
            hour: "$_id",
            totalEvents: 1,
            totalDataUsedMB: 1
        }
    }
]).toArray();

console.log(hourlyResults);


// ================================================
// PIPELINE 2: AVERAGE SESSION LENGTH
// Purpose: Calculate average, longest and shortest
// session duration across all usage events.
// ================================================

console.log("\n================================");
console.log("PIPELINE 2 - AVERAGE SESSION LENGTH");
console.log("================================");

const sessionResults = usageEvents.aggregate([
    {
        $group: {
            _id: null,
            totalSessions: { $sum: 1 },
            averageSessionMinutes: {
                $avg: "$sessionDurationMinutes"
            },
            longestSessionMinutes: {
                $max: "$sessionDurationMinutes"
            },
            shortestSessionMinutes: {
                $min: "$sessionDurationMinutes"
            }
        }
    },
    {
        $project: {
            _id: 0,
            totalSessions: 1,
            averageSessionMinutes: {
                $round: ["$averageSessionMinutes", 2]
            },
            longestSessionMinutes: 1,
            shortestSessionMinutes: 1
        }
    }
]).toArray();

console.log(sessionResults);


// ================================================
// PIPELINE 3: BUSIEST CELL TOWER
// Purpose: Find cell towers with the highest
// number of usage events.
// ================================================

console.log("\n================================");
console.log("PIPELINE 3 - BUSIEST CELL TOWER");
console.log("================================");

const towerResults = usageEvents.aggregate([
    {
        $group: {
            _id: "$cellTowerId",
            totalEvents: { $sum: 1 },
            totalDataUsedMB: { $sum: "$dataUsedMB" },
            averageSessionMinutes: {
                $avg: "$sessionDurationMinutes"
            }
        }
    },
    {
        $sort: {
            totalEvents: -1,
            totalDataUsedMB: -1
        }
    },
    {
        $project: {
            _id: 0,
            cellTowerId: "$_id",
            totalEvents: 1,
            totalDataUsedMB: 1,
            averageSessionMinutes: {
                $round: ["$averageSessionMinutes", 2]
            }
        }
    }
]).toArray();

console.log(towerResults);


// ================================================
// END OF MONGODB REPORTS
// ================================================

console.log("\nAll 3 aggregation pipelines executed successfully!");
