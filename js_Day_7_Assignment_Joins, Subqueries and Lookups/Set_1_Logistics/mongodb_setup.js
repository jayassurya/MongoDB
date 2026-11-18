
/*
============================================================
DAY 7 - SET 1: LOGISTICS SHIPMENT ANALYSIS
MONGODB DATABASE SETUP AND SAMPLE DATA
MongoDB 8.0
============================================================

Database: Hexaware_Day7_Logistics

Collections:
1. customers
2. carriers
3. shipments
4. deliveryEvents

This script creates the collections and inserts sample data.
It skips insertion if a collection already contains documents.
============================================================
*/

const logisticsDB = db.getSiblingDB("Hexaware_Day7_Logistics");

print("\nCreating Logistics MongoDB Database...");

// Create collections if they do not already exist
const collections = [
    "customers",
    "carriers",
    "shipments",
    "deliveryEvents"
];

collections.forEach(collectionName => {
    if (!logisticsDB.getCollectionNames().includes(collectionName)) {
        logisticsDB.createCollection(collectionName);
        print("Created collection: " + collectionName);
    } else {
        print("Collection already exists: " + collectionName);
    }
});


/* ============================================================
   1. CUSTOMERS COLLECTION
   ============================================================ */

const customers = [
    {
        CustomerID: 201,
        CustomerName: "Arun Kumar",
        Email: "arun@gmail.com"
    },
    {
        CustomerID: 202,
        CustomerName: "Priya Sharma",
        Email: "priya@gmail.com"
    },
    {
        CustomerID: 203,
        CustomerName: "Rahul Verma",
        Email: "rahul@gmail.com"
    },
    {
        CustomerID: 204,
        CustomerName: "Sneha Raj",
        Email: "sneha@gmail.com"
    },
    {
        CustomerID: 205,
        CustomerName: "Karthik S",
        Email: "karthik@gmail.com"
    },
    {
        CustomerID: 206,
        CustomerName: "Divya Nair",
        Email: "divya@gmail.com"
    },
    {
        CustomerID: 207,
        CustomerName: "Vikram Singh",
        Email: "vikram@gmail.com"
    },
    {
        CustomerID: 208,
        CustomerName: "Meena Joseph",
        Email: "meena@gmail.com"
    }
];

if (logisticsDB.customers.countDocuments() === 0) {
    logisticsDB.customers.insertMany(customers);
    print("Inserted " + customers.length + " customer documents.");
} else {
    print("Customers collection already has data. Skipping insertion.");
}


/* ============================================================
   2. CARRIERS COLLECTION
   ============================================================ */

const carriers = [
    {
        CarrierID: 101,
        CarrierName: "BlueDart"
    },
    {
        CarrierID: 102,
        CarrierName: "DTDC"
    },
    {
        CarrierID: 103,
        CarrierName: "Delhivery"
    },
    {
        CarrierID: 104,
        CarrierName: "India Post"
    },
    {
        CarrierID: 105,
        CarrierName: "Ecom Express"
    }
];

if (logisticsDB.carriers.countDocuments() === 0) {
    logisticsDB.carriers.insertMany(carriers);
    print("Inserted " + carriers.length + " carrier documents.");
} else {
    print("Carriers collection already has data. Skipping insertion.");
}


/* ============================================================
   3. SHIPMENTS COLLECTION
   ============================================================ */

const shipments = [
    {
        ShipmentID: 1001,
        CustomerID: 201,
        CarrierID: 101,
        OriginHubID: 1,
        DestinationHubID: 2,
        EmployeeID: 304,
        ShippingCost: 450,
        ShipmentDate: ISODate("2026-10-01"),
        ExpectedDeliveryDate: ISODate("2026-10-03"),
        ActualDeliveryDate: ISODate("2026-10-07")
    },
    {
        ShipmentID: 1002,
        CustomerID: 202,
        CarrierID: 102,
        OriginHubID: 2,
        DestinationHubID: 3,
        EmployeeID: 305,
        ShippingCost: 320,
        ShipmentDate: ISODate("2026-10-02"),
        ExpectedDeliveryDate: ISODate("2026-10-05"),
        ActualDeliveryDate: ISODate("2026-10-06")
    },
    {
        ShipmentID: 1003,
        CustomerID: 203,
        CarrierID: 103,
        OriginHubID: 1,
        DestinationHubID: 4,
        EmployeeID: 306,
        ShippingCost: 650,
        ShipmentDate: ISODate("2026-10-03"),
        ExpectedDeliveryDate: ISODate("2026-10-06"),
        ActualDeliveryDate: ISODate("2026-10-10")
    },
    {
        ShipmentID: 1004,
        CustomerID: 204,
        CarrierID: 101,
        OriginHubID: 3,
        DestinationHubID: 5,
        EmployeeID: 307,
        ShippingCost: 800,
        ShipmentDate: ISODate("2026-10-04"),
        ExpectedDeliveryDate: ISODate("2026-10-08"),
        ActualDeliveryDate: ISODate("2026-10-09")
    },
    {
        ShipmentID: 1005,
        CustomerID: 205,
        CarrierID: 104,
        OriginHubID: 2,
        DestinationHubID: 1,
        EmployeeID: 308,
        ShippingCost: 250,
        ShipmentDate: ISODate("2026-10-05"),
        ExpectedDeliveryDate: ISODate("2026-10-08"),
        ActualDeliveryDate: ISODate("2026-10-08")
    },
    {
        ShipmentID: 1006,
        CustomerID: 206,
        CarrierID: 102,
        OriginHubID: 4,
        DestinationHubID: 5,
        EmployeeID: 304,
        ShippingCost: 550,
        ShipmentDate: ISODate("2026-10-06"),
        ExpectedDeliveryDate: ISODate("2026-10-09"),
        ActualDeliveryDate: ISODate("2026-10-14")
    },
    {
        ShipmentID: 1007,
        CustomerID: 201,
        CarrierID: 103,
        OriginHubID: 1,
        DestinationHubID: 3,
        EmployeeID: 305,
        ShippingCost: 400,
        ShipmentDate: ISODate("2026-10-07"),
        ExpectedDeliveryDate: ISODate("2026-10-10"),
        ActualDeliveryDate: ISODate("2026-10-10")
    },
    {
        ShipmentID: 1008,
        CustomerID: 207,
        CarrierID: 105,
        OriginHubID: 3,
        DestinationHubID: 2,
        EmployeeID: 306,
        ShippingCost: 700,
        ShipmentDate: ISODate("2026-10-08"),
        ExpectedDeliveryDate: ISODate("2026-10-12"),
        ActualDeliveryDate: ISODate("2026-10-16")
    },
    {
        ShipmentID: 1009,
        CustomerID: 208,
        CarrierID: 101,
        OriginHubID: 2,
        DestinationHubID: 4,
        EmployeeID: 307,
        ShippingCost: 600,
        ShipmentDate: ISODate("2026-10-09"),
        ExpectedDeliveryDate: ISODate("2026-10-12"),
        ActualDeliveryDate: ISODate("2026-10-13")
    },
    {
        ShipmentID: 1010,
        CustomerID: 202,
        CarrierID: 103,
        OriginHubID: 1,
        DestinationHubID: 5,
        EmployeeID: 308,
        ShippingCost: 900,
        ShipmentDate: ISODate("2026-10-10"),
        ExpectedDeliveryDate: ISODate("2026-10-14"),
        ActualDeliveryDate: ISODate("2026-10-18")
    },
    {
        ShipmentID: 1011,
        CustomerID: 203,
        CarrierID: 104,
        OriginHubID: 4,
        DestinationHubID: 2,
        EmployeeID: 304,
        ShippingCost: 350,
        ShipmentDate: ISODate("2026-10-11"),
        ExpectedDeliveryDate: ISODate("2026-10-15"),
        ActualDeliveryDate: null
    },
    {
        ShipmentID: 1012,
        CustomerID: 204,
        CarrierID: 102,
        OriginHubID: 3,
        DestinationHubID: 1,
        EmployeeID: 305,
        ShippingCost: 500,
        ShipmentDate: ISODate("2026-10-12"),
        ExpectedDeliveryDate: ISODate("2026-10-16"),
        ActualDeliveryDate: null
    },
    {
        ShipmentID: 1013,
        CustomerID: 205,
        CarrierID: 105,
        OriginHubID: 2,
        DestinationHubID: 5,
        EmployeeID: 306,
        ShippingCost: 750,
        ShipmentDate: ISODate("2026-10-13"),
        ExpectedDeliveryDate: ISODate("2026-10-17"),
        ActualDeliveryDate: ISODate("2026-10-17")
    },
    {
        ShipmentID: 1014,
        CustomerID: 206,
        CarrierID: 101,
        OriginHubID: 4,
        DestinationHubID: 3,
        EmployeeID: 307,
        ShippingCost: 420,
        ShipmentDate: ISODate("2026-10-14"),
        ExpectedDeliveryDate: ISODate("2026-10-18"),
        ActualDeliveryDate: ISODate("2026-10-22")
    },
    {
        ShipmentID: 1015,
        CustomerID: 207,
        CarrierID: 103,
        OriginHubID: 1,
        DestinationHubID: 2,
        EmployeeID: 308,
        ShippingCost: 380,
        ShipmentDate: ISODate("2026-10-15"),
        ExpectedDeliveryDate: ISODate("2026-10-19"),
        ActualDeliveryDate: ISODate("2026-10-20")
    }
];

if (logisticsDB.shipments.countDocuments() === 0) {
    logisticsDB.shipments.insertMany(shipments);
    print("Inserted " + shipments.length + " shipment documents.");
} else {
    print("Shipments collection already has data. Skipping insertion.");
}


/* ============================================================
   4. DELIVERY EVENTS COLLECTION
   ============================================================ */

const deliveryEvents = [
    {
        EventID: 1,
        ShipmentID: 1001,
        EventType: "Picked Up",
        EventLocation: "Chennai",
        EventTimestamp: ISODate("2026-10-01T09:00:00Z")
    },
    {
        EventID: 2,
        ShipmentID: 1001,
        EventType: "In Transit",
        EventLocation: "Bangalore",
        EventTimestamp: ISODate("2026-10-04T10:00:00Z")
    },
    {
        EventID: 3,
        ShipmentID: 1001,
        EventType: "Delivered",
        EventLocation: "Bangalore",
        EventTimestamp: ISODate("2026-10-07T15:00:00Z")
    },
    {
        EventID: 4,
        ShipmentID: 1002,
        EventType: "Picked Up",
        EventLocation: "Bangalore",
        EventTimestamp: ISODate("2026-10-02T10:00:00Z")
    },
    {
        EventID: 5,
        ShipmentID: 1002,
        EventType: "Delivered",
        EventLocation: "Hyderabad",
        EventTimestamp: ISODate("2026-10-06T14:00:00Z")
    },
    {
        EventID: 6,
        ShipmentID: 1003,
        EventType: "Picked Up",
        EventLocation: "Chennai",
        EventTimestamp: ISODate("2026-10-03T08:30:00Z")
    },
    {
        EventID: 7,
        ShipmentID: 1003,
        EventType: "In Transit",
        EventLocation: "Mumbai",
        EventTimestamp: ISODate("2026-10-07T12:00:00Z")
    },
    {
        EventID: 8,
        ShipmentID: 1003,
        EventType: "Delivered",
        EventLocation: "Mumbai",
        EventTimestamp: ISODate("2026-10-10T16:00:00Z")
    },
    {
        EventID: 9,
        ShipmentID: 1004,
        EventType: "Picked Up",
        EventLocation: "Hyderabad",
        EventTimestamp: ISODate("2026-10-04T09:00:00Z")
    },
    {
        EventID: 10,
        ShipmentID: 1004,
        EventType: "Delivered",
        EventLocation: "Delhi",
        EventTimestamp: ISODate("2026-10-09T13:00:00Z")
    },
    {
        EventID: 11,
        ShipmentID: 1005,
        EventType: "Picked Up",
        EventLocation: "Bangalore",
        EventTimestamp: ISODate("2026-10-05T11:00:00Z")
    },
    {
        EventID: 12,
        ShipmentID: 1005,
        EventType: "Delivered",
        EventLocation: "Chennai",
        EventTimestamp: ISODate("2026-10-08T17:00:00Z")
    },
    {
        EventID: 13,
        ShipmentID: 1006,
        EventType: "Picked Up",
        EventLocation: "Mumbai",
        EventTimestamp: ISODate("2026-10-06T08:00:00Z")
    },
    {
        EventID: 14,
        ShipmentID: 1006,
        EventType: "In Transit",
        EventLocation: "Delhi",
        EventTimestamp: ISODate("2026-10-11T10:00:00Z")
    },
    {
        EventID: 15,
        ShipmentID: 1006,
        EventType: "Delivered",
        EventLocation: "Delhi",
        EventTimestamp: ISODate("2026-10-14T15:00:00Z")
    },
    {
        EventID: 16,
        ShipmentID: 1007,
        EventType: "Picked Up",
        EventLocation: "Chennai",
        EventTimestamp: ISODate("2026-10-07T09:00:00Z")
    },
    {
        EventID: 17,
        ShipmentID: 1007,
        EventType: "Delivered",
        EventLocation: "Hyderabad",
        EventTimestamp: ISODate("2026-10-10T12:00:00Z")
    },
    {
        EventID: 18,
        ShipmentID: 1008,
        EventType: "Picked Up",
        EventLocation: "Hyderabad",
        EventTimestamp: ISODate("2026-10-08T10:00:00Z")
    }
];

if (logisticsDB.deliveryEvents.countDocuments() === 0) {
    logisticsDB.deliveryEvents.insertMany(deliveryEvents);
    print("Inserted " + deliveryEvents.length + " delivery event documents.");
} else {
    print("DeliveryEvents collection already has data. Skipping insertion.");
}


/* ============================================================
   5. VERIFY DATABASE AND COLLECTIONS
   ============================================================ */

print("\n========================================");
print("DATABASE SETUP COMPLETED");
print("========================================");

print("Database: " + logisticsDB.getName());

print("Customers: " + logisticsDB.customers.countDocuments());
print("Carriers: " + logisticsDB.carriers.countDocuments());
print("Shipments: " + logisticsDB.shipments.countDocuments());
print("Delivery Events: " + logisticsDB.deliveryEvents.countDocuments());

print("\nAll collection counts:");

printjson(
    logisticsDB.getCollectionNames().map(name => ({
        Collection: name,
        Documents: logisticsDB.getCollection(name).countDocuments()
    }))
);

print("\nMongoDB setup completed successfully!");
