
// =======================================================
// HEXAWARE DAY 7 - SET 3
// RETAIL RETURNS AND REFUNDS
// MONGODB DATABASE SETUP
// =======================================================

use("Hexaware_Day7_Retail");

// Clear existing collections for a clean setup
db.stores.drop();
db.customers.drop();
db.products.drop();
db.employees.drop();
db.sales.drop();
db.returns.drop();
db.refunds.drop();
db.returnsFeedback.drop();

// =======================================================
// 1. STORES
// =======================================================

db.stores.insertMany([
  { StoreID: 1, StoreName: "Chennai Central", City: "Chennai", Region: "South" },
  { StoreID: 2, StoreName: "Chennai North", City: "Chennai", Region: "South" },
  { StoreID: 3, StoreName: "Bangalore Store", City: "Bangalore", Region: "South" },
  { StoreID: 4, StoreName: "Mumbai Central", City: "Mumbai", Region: "West" },
  { StoreID: 5, StoreName: "Pune Store", City: "Pune", Region: "West" }
]);

// =======================================================
// 2. CUSTOMERS
// =======================================================

db.customers.insertMany([
  { CustomerID: 201, CustomerName: "Arun Kumar", Email: "arun@gmail.com" },
  { CustomerID: 202, CustomerName: "Priya Sharma", Email: "priya@gmail.com" },
  { CustomerID: 203, CustomerName: "Rahul Raj", Email: "rahul@gmail.com" },
  { CustomerID: 204, CustomerName: "Divya S", Email: "divya@gmail.com" },
  { CustomerID: 205, CustomerName: "Karthik M", Email: "karthik@gmail.com" },
  { CustomerID: 206, CustomerName: "Sneha R", Email: "sneha@gmail.com" }
]);

// =======================================================
// 3. PRODUCTS
// =======================================================

db.products.insertMany([
  { ProductID: 101, ProductName: "Laptop", Category: "Electronics", UnitPrice: 55000 },
  { ProductID: 102, ProductName: "Smartphone", Category: "Electronics", UnitPrice: 25000 },
  { ProductID: 103, ProductName: "Headphones", Category: "Accessories", UnitPrice: 3000 },
  { ProductID: 104, ProductName: "Monitor", Category: "Electronics", UnitPrice: 12000 },
  { ProductID: 105, ProductName: "Keyboard", Category: "Accessories", UnitPrice: 1500 }
]);

// =======================================================
// 4. EMPLOYEES
// =======================================================

db.employees.insertMany([
  { EmployeeID: 301, EmployeeName: "Ramesh", ManagerID: null },
  { EmployeeID: 302, EmployeeName: "Suresh", ManagerID: 301 },
  { EmployeeID: 303, EmployeeName: "Meena", ManagerID: 301 },
  { EmployeeID: 304, EmployeeName: "Vijay", ManagerID: 301 },
  { EmployeeID: 305, EmployeeName: "Anitha", ManagerID: 302 },
  { EmployeeID: 306, EmployeeName: "Prakash", ManagerID: 302 }
]);

// =======================================================
// 5. SALES
// =======================================================

db.sales.insertMany([
  { SaleID: 1, StoreID: 1, CustomerID: 201, ProductID: 101, QuantitySold: 60, SaleDate: ISODate("2026-09-01") },
  { SaleID: 2, StoreID: 2, CustomerID: 202, ProductID: 101, QuantitySold: 40, SaleDate: ISODate("2026-09-02") },
  { SaleID: 3, StoreID: 1, CustomerID: 203, ProductID: 101, QuantitySold: 0, SaleDate: ISODate("2026-09-03") },
  { SaleID: 4, StoreID: 3, CustomerID: 204, ProductID: 102, QuantitySold: 40, SaleDate: ISODate("2026-09-04") },
  { SaleID: 5, StoreID: 2, CustomerID: 205, ProductID: 102, QuantitySold: 40, SaleDate: ISODate("2026-09-05") },
  { SaleID: 6, StoreID: 1, CustomerID: 201, ProductID: 103, QuantitySold: 25, SaleDate: ISODate("2026-09-06") },
  { SaleID: 7, StoreID: 3, CustomerID: 206, ProductID: 103, QuantitySold: 25, SaleDate: ISODate("2026-09-07") },
  { SaleID: 8, StoreID: 4, CustomerID: 202, ProductID: 104, QuantitySold: 60, SaleDate: ISODate("2026-09-08") },
  { SaleID: 9, StoreID: 5, CustomerID: 203, ProductID: 105, QuantitySold: 20, SaleDate: ISODate("2026-09-09") },
  { SaleID: 10, StoreID: 5, CustomerID: 206, ProductID: 105, QuantitySold: 20, SaleDate: ISODate("2026-09-10") },
  { SaleID: 11, StoreID: 4, CustomerID: 204, ProductID: 102, QuantitySold: 0, SaleDate: ISODate("2026-09-11") },
  { SaleID: 12, StoreID: 3, CustomerID: 205, ProductID: 104, QuantitySold: 0, SaleDate: ISODate("2026-09-12") }
]);

// =======================================================
// 6. RETURNS
// =======================================================

db.returns.insertMany([
  { ReturnID: 1001, SaleID: 1, StoreID: 1, CustomerID: 201, ProductID: 101, EmployeeID: 302, ReturnQuantity: 5, ReturnDate: ISODate("2026-10-01"), ReturnReason: "Damaged item", ReturnStatus: "Approved" },
  { ReturnID: 1002, SaleID: 2, StoreID: 2, CustomerID: 202, ProductID: 101, EmployeeID: 303, ReturnQuantity: 4, ReturnDate: ISODate("2026-10-02"), ReturnReason: "Defective item", ReturnStatus: "Approved" },
  { ReturnID: 1003, SaleID: 3, StoreID: 1, CustomerID: 203, ProductID: 101, EmployeeID: 302, ReturnQuantity: 6, ReturnDate: ISODate("2026-10-03"), ReturnReason: "Wrong product", ReturnStatus: "Approved" },
  { ReturnID: 1004, SaleID: 4, StoreID: 3, CustomerID: 204, ProductID: 102, EmployeeID: 304, ReturnQuantity: 2, ReturnDate: ISODate("2026-10-04"), ReturnReason: "Battery issue", ReturnStatus: "Approved" },
  { ReturnID: 1005, SaleID: 5, StoreID: 2, CustomerID: 205, ProductID: 102, EmployeeID: 303, ReturnQuantity: 2, ReturnDate: ISODate("2026-10-05"), ReturnReason: "Not satisfied", ReturnStatus: "Approved" },
  { ReturnID: 1006, SaleID: 6, StoreID: 1, CustomerID: 201, ProductID: 103, EmployeeID: 302, ReturnQuantity: 4, ReturnDate: ISODate("2026-10-06"), ReturnReason: "Sound issue", ReturnStatus: "Approved" },
  { ReturnID: 1007, SaleID: 7, StoreID: 3, CustomerID: 206, ProductID: 103, EmployeeID: 304, ReturnQuantity: 4, ReturnDate: ISODate("2026-10-07"), ReturnReason: "Damaged item", ReturnStatus: "Approved" },
  { ReturnID: 1008, SaleID: 8, StoreID: 4, CustomerID: 202, ProductID: 104, EmployeeID: 305, ReturnQuantity: 3, ReturnDate: ISODate("2026-10-08"), ReturnReason: "Display issue", ReturnStatus: "Approved" },
  { ReturnID: 1009, SaleID: 9, StoreID: 5, CustomerID: 203, ProductID: 105, EmployeeID: 306, ReturnQuantity: 3, ReturnDate: ISODate("2026-10-09"), ReturnReason: "Wrong item", ReturnStatus: "Approved" },
  { ReturnID: 1010, SaleID: 10, StoreID: 5, CustomerID: 206, ProductID: 105, EmployeeID: 306, ReturnQuantity: 3, ReturnDate: ISODate("2026-10-10"), ReturnReason: "Key issue", ReturnStatus: "Approved" }
]);

// =======================================================
// 7. REFUNDS
// =======================================================

db.refunds.insertMany([
  { RefundID: 5001, ReturnID: 1001, RefundAmount: 250, RefundDate: ISODate("2026-10-03"), RefundStatus: "Completed" },
  { RefundID: 5002, ReturnID: 1002, RefundAmount: 300, RefundDate: ISODate("2026-10-04"), RefundStatus: "Completed" },
  { RefundID: 5003, ReturnID: 1004, RefundAmount: 100, RefundDate: ISODate("2026-10-06"), RefundStatus: "Completed" },
  { RefundID: 5004, ReturnID: 1005, RefundAmount: 150, RefundDate: ISODate("2026-10-07"), RefundStatus: "Completed" },
  { RefundID: 5005, ReturnID: 1007, RefundAmount: 200, RefundDate: ISODate("2026-10-09"), RefundStatus: "Completed" },
  { RefundID: 5006, ReturnID: 1008, RefundAmount: 350, RefundDate: ISODate("2026-10-10"), RefundStatus: "Completed" },
  { RefundID: 5007, ReturnID: 1009, RefundAmount: 120, RefundDate: ISODate("2026-10-11"), RefundStatus: "Completed" },
  { RefundID: 5008, ReturnID: 1010, RefundAmount: 180, RefundDate: ISODate("2026-10-12"), RefundStatus: "Completed" }
]);

// =======================================================
// 8. RETURNS FEEDBACK
// =======================================================

db.returnsFeedback.insertMany([
  {
    FeedbackID: 9001,
    ReturnID: 1001,
    CustomerID: 201,
    StoreID: 1,
    Rating: 2,
    FeedbackComment: "Product arrived damaged",
    FeedbackDate: ISODate("2026-10-04")
  },
  {
    FeedbackID: 9002,
    ReturnID: 1002,
    CustomerID: 202,
    StoreID: 2,
    Rating: 3,
    FeedbackComment: "Replacement process was slow",
    FeedbackDate: ISODate("2026-10-05")
  },
  {
    FeedbackID: 9003,
    ReturnID: 1003,
    CustomerID: 203,
    StoreID: 1,
    Rating: 4,
    FeedbackComment: "Return process was simple",
    FeedbackDate: ISODate("2026-10-06")
  },
  {
    FeedbackID: 9004,
    ReturnID: 1004,
    CustomerID: 204,
    StoreID: 3,
    Rating: 5,
    FeedbackComment: "Quick refund experience",
    FeedbackDate: ISODate("2026-10-07")
  },
  {
    FeedbackID: 9005,
    ReturnID: 1005,
    CustomerID: 205,
    StoreID: 2,
    Rating: 3,
    FeedbackComment: "Support was helpful",
    FeedbackDate: ISODate("2026-10-08")
  },
  {
    FeedbackID: 9006,
    ReturnID: 1006,
    CustomerID: 201,
    StoreID: 1,
    Rating: 2,
    FeedbackComment: "Product quality needs improvement",
    FeedbackDate: ISODate("2026-10-09")
  },
  {
    FeedbackID: 9007,
    ReturnID: 1007,
    CustomerID: 206,
    StoreID: 3,
    Rating: 4,
    FeedbackComment: "Good customer service",
    FeedbackDate: ISODate("2026-10-10")
  },
  {
    FeedbackID: 9008,
    ReturnID: 1008,
    CustomerID: 202,
    StoreID: 4,
    Rating: 5,
    FeedbackComment: "Refund was processed quickly",
    FeedbackDate: ISODate("2026-10-11")
  },
  {
    FeedbackID: 9009,
    ReturnID: 1009,
    CustomerID: 203,
    StoreID: 5,
    Rating: 3,
    FeedbackComment: "Average return experience",
    FeedbackDate: ISODate("2026-10-12")
  },
  {
    FeedbackID: 9010,
    ReturnID: 1010,
    CustomerID: 206,
    StoreID: 5,
    Rating: 4,
    FeedbackComment: "Staff handled the return well",
    FeedbackDate: ISODate("2026-10-13")
  }
]);

// =======================================================
// 9. VERIFICATION
// =======================================================

print("DATABASE: Hexaware_Day7_Retail");
print("STORES:", db.stores.countDocuments());
print("CUSTOMERS:", db.customers.countDocuments());
print("PRODUCTS:", db.products.countDocuments());
print("EMPLOYEES:", db.employees.countDocuments());
print("SALES:", db.sales.countDocuments());
print("RETURNS:", db.returns.countDocuments());
print("REFUNDS:", db.refunds.countDocuments());
print("RETURNS FEEDBACK:", db.returnsFeedback.countDocuments());

print("MONGODB SETUP COMPLETED SUCCESSFULLY");
