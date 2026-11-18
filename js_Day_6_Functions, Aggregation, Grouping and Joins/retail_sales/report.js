
use("RetailSalesDB");

db.sales.insertMany([
  {orderId:1, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-07-05"), product:"Wireless Mouse", quantity:2, unitPrice:500},
  {orderId:1, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-07-05"), product:"Bluetooth Headphones", quantity:1, unitPrice:1500},

  {orderId:2, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-07-15"), product:"Smartphone X", quantity:1, unitPrice:25000},
  {orderId:2, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-07-15"), product:"Wireless Mouse", quantity:1, unitPrice:500},

  {orderId:3, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-08-10"), product:"Laptop Pro", quantity:1, unitPrice:65000},
  {orderId:3, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-08-10"), product:"Bluetooth Headphones", quantity:2, unitPrice:1500},

  {orderId:4, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-09-20"), product:"Smartphone X", quantity:2, unitPrice:25000},
  {orderId:4, customer:"Arun Kumar", city:"Chennai", orderDate:ISODate("2026-09-20"), product:"Running Shoes", quantity:1, unitPrice:3000},

  {orderId:5, customer:"Priya Sharma", city:"Bangalore", orderDate:ISODate("2026-07-08"), product:"Office Chair", quantity:1, unitPrice:8000},
  {orderId:5, customer:"Priya Sharma", city:"Bangalore", orderDate:ISODate("2026-07-08"), product:"Cotton T-Shirt", quantity:2, unitPrice:700},

  {orderId:6, customer:"Priya Sharma", city:"Bangalore", orderDate:ISODate("2026-08-18"), product:"Laptop Pro", quantity:1, unitPrice:65000},
  {orderId:6, customer:"Priya Sharma", city:"Bangalore", orderDate:ISODate("2026-08-18"), product:"Wireless Mouse", quantity:2, unitPrice:500},

  {orderId:7, customer:"Rahul Verma", city:"Chennai", orderDate:ISODate("2026-08-05"), product:"Bluetooth Headphones", quantity:3, unitPrice:1500},
  {orderId:7, customer:"Rahul Verma", city:"Chennai", orderDate:ISODate("2026-08-05"), product:"Database Book", quantity:2, unitPrice:600},

  {orderId:8, customer:"Rahul Verma", city:"Chennai", orderDate:ISODate("2026-09-12"), product:"Smartphone X", quantity:1, unitPrice:25000},
  {orderId:8, customer:"Rahul Verma", city:"Chennai", orderDate:ISODate("2026-09-12"), product:"Football", quantity:2, unitPrice:900},

  {orderId:9, customer:"Sneha Raj", city:"Hyderabad", orderDate:ISODate("2026-09-15"), product:"Smart Television", quantity:1, unitPrice:40000},
  {orderId:9, customer:"Sneha Raj", city:"Hyderabad", orderDate:ISODate("2026-09-15"), product:"Bluetooth Headphones", quantity:1, unitPrice:1500},

  {orderId:10, customer:"Sneha Raj", city:"Hyderabad", orderDate:ISODate("2026-10-03"), product:"Running Shoes", quantity:2, unitPrice:3000},
  {orderId:10, customer:"Sneha Raj", city:"Hyderabad", orderDate:ISODate("2026-10-03"), product:"Cotton T-Shirt", quantity:3, unitPrice:700},

  {orderId:11, customer:"Karthik S", city:"Bangalore", orderDate:ISODate("2026-10-10"), product:"Laptop Pro", quantity:1, unitPrice:65000},
  {orderId:11, customer:"Karthik S", city:"Bangalore", orderDate:ISODate("2026-10-10"), product:"Wireless Mouse", quantity:3, unitPrice:500},

  {orderId:12, customer:"Divya Nair", city:"Kochi", orderDate:ISODate("2026-10-15"), product:"Office Chair", quantity:2, unitPrice:8000},
  {orderId:12, customer:"Divya Nair", city:"Kochi", orderDate:ISODate("2026-10-15"), product:"Database Book", quantity:1, unitPrice:600},

  {orderId:13, customer:"Vijay Anand", city:"Chennai", orderDate:ISODate("2026-11-01"), product:"Smartphone X", quantity:1, unitPrice:25000},
  {orderId:13, customer:"Vijay Anand", city:"Chennai", orderDate:ISODate("2026-11-01"), product:"Bluetooth Headphones", quantity:2, unitPrice:1500},

  {orderId:14, customer:"Meena Das", city:"Mumbai", orderDate:ISODate("2026-11-05"), product:"Smart Television", quantity:1, unitPrice:40000},
  {orderId:14, customer:"Meena Das", city:"Mumbai", orderDate:ISODate("2026-11-05"), product:"Football", quantity:1, unitPrice:900},

  {orderId:15, customer:"Sanjay Rao", city:"Hyderabad", orderDate:ISODate("2026-11-10"), product:"Laptop Pro", quantity:1, unitPrice:65000},
  {orderId:15, customer:"Sanjay Rao", city:"Hyderabad", orderDate:ISODate("2026-11-10"), product:"Running Shoes", quantity:1, unitPrice:3000}
]);


// ==========================================
// DAY 6 - SET 1: RETAIL SALES REPORTING
// MongoDB - reports.js
// ==========================================

use("RetailSalesDB");

// ==========================================
// REPORT 1: MONTH-WISE SALES
// ==========================================

print("\nREPORT 1: MONTH-WISE SALES");

printjson(
    db.sales.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$orderDate"
                    }
                },
                monthlyRevenue: {
                    $sum: {
                        $multiply: ["$quantity", "$unitPrice"]
                    }
                }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]).toArray()
);


// ==========================================
// REPORT 2: TOP 5 PRODUCTS BY REVENUE
// ==========================================

print("\nREPORT 2: TOP 5 PRODUCTS");

printjson(
    db.sales.aggregate([
        {
            $group: {
                _id: "$product",
                totalRevenue: {
                    $sum: {
                        $multiply: ["$quantity", "$unitPrice"]
                    }
                }
            }
        },
        {
            $sort: { totalRevenue: -1 }
        },
        {
            $limit: 5
        }
    ]).toArray()
);


// ==========================================
// REPORT 3: AVERAGE BASKET VALUE BY CITY
// ==========================================

print("\nREPORT 3: AVERAGE BASKET VALUE BY CITY");

printjson(
    db.sales.aggregate([
        {
            $group: {
                _id: {
                    orderId: "$orderId",
                    city: "$city"
                },
                orderTotal: {
                    $sum: {
                        $multiply: ["$quantity", "$unitPrice"]
                    }
                }
            }
        },
        {
            $group: {
                _id: "$_id.city",
                averageBasketValue: {
                    $avg: "$orderTotal"
                }
            }
        },
        {
            $sort: { averageBasketValue: -1 }
        }
    ]).toArray()
);


// ==========================================
// VERIFICATION
// ==========================================

print("\nTOTAL SALES RECORDS:");

print(db.sales.countDocuments());
