
/*
============================================================
DAY 7 - SET 2: BANK LOAN PORTFOLIO
MONGODB DATABASE SETUP
MongoDB 8.0
============================================================

Database: Hexaware_Day7_Banking

Collections:
1. customers
2. loans
3. repayments

Sample data matches the SQL Server assignment.
============================================================
*/

const bankDB = db.getSiblingDB("Hexaware_Day7_Banking");

print("\n========== BANK DATABASE SETUP ==========");


/* ============================================================
   1. CREATE COLLECTIONS
   ============================================================ */

const collectionNames = [
    "customers",
    "loans",
    "repayments"
];

collectionNames.forEach(name => {
    if (!bankDB.getCollectionNames().includes(name)) {
        bankDB.createCollection(name);
        print("Created collection: " + name);
    } else {
        print("Collection already exists: " + name);
    }
});


/* ============================================================
   2. CUSTOMERS COLLECTION
   ============================================================ */

const customers = [
    { CustomerID: 101, CustomerName: "Arun Kumar", Email: "arun@gmail.com", Phone: "9876543210" },
    { CustomerID: 102, CustomerName: "Priya Sharma", Email: "priya@gmail.com", Phone: "9876543211" },
    { CustomerID: 103, CustomerName: "Rahul Verma", Email: "rahul@gmail.com", Phone: "9876543212" },
    { CustomerID: 104, CustomerName: "Sneha Raj", Email: "sneha@gmail.com", Phone: "9876543213" },
    { CustomerID: 105, CustomerName: "Karthik S", Email: "karthik@gmail.com", Phone: "9876543214" },
    { CustomerID: 106, CustomerName: "Divya Nair", Email: "divya@gmail.com", Phone: "9876543215" },
    { CustomerID: 107, CustomerName: "Vikram Singh", Email: "vikram@gmail.com", Phone: "9876543216" },
    { CustomerID: 108, CustomerName: "Meena Joseph", Email: "meena@gmail.com", Phone: "9876543217" }
];

if (bankDB.customers.countDocuments() === 0) {
    bankDB.customers.insertMany(customers);
    print("Inserted 8 customer documents.");
} else {
    print("Customers already contain data. Skipping insertion.");
}


/* ============================================================
   3. LOANS COLLECTION
   ============================================================ */

const loans = [
    {
        LoanID: 1001,
        CustomerID: 101,
        BranchID: 1,
        LoanType: "Home Loan",
        LoanAmount: 2500000,
        OutstandingAmount: 2000000,
        LoanDate: ISODate("2025-01-10")
    },
    {
        LoanID: 1002,
        CustomerID: 102,
        BranchID: 1,
        LoanType: "Personal Loan",
        LoanAmount: 500000,
        OutstandingAmount: 300000,
        LoanDate: ISODate("2025-02-15")
    },
    {
        LoanID: 1003,
        CustomerID: 103,
        BranchID: 2,
        LoanType: "Car Loan",
        LoanAmount: 900000,
        OutstandingAmount: 600000,
        LoanDate: ISODate("2025-03-20")
    },
    {
        LoanID: 1004,
        CustomerID: 104,
        BranchID: 2,
        LoanType: "Home Loan",
        LoanAmount: 3000000,
        OutstandingAmount: 2500000,
        LoanDate: ISODate("2025-04-10")
    },
    {
        LoanID: 1005,
        CustomerID: 105,
        BranchID: 3,
        LoanType: "Education Loan",
        LoanAmount: 800000,
        OutstandingAmount: 500000,
        LoanDate: ISODate("2025-05-05")
    },
    {
        LoanID: 1006,
        CustomerID: 106,
        BranchID: 3,
        LoanType: "Personal Loan",
        LoanAmount: 400000,
        OutstandingAmount: 250000,
        LoanDate: ISODate("2025-06-12")
    },
    {
        LoanID: 1007,
        CustomerID: 101,
        BranchID: 2,
        LoanType: "Business Loan",
        LoanAmount: 1500000,
        OutstandingAmount: 1000000,
        LoanDate: ISODate("2025-07-01")
    },
    {
        LoanID: 1008,
        CustomerID: 102,
        BranchID: 4,
        LoanType: "Car Loan",
        LoanAmount: 700000,
        OutstandingAmount: 400000,
        LoanDate: ISODate("2025-07-15")
    },
    {
        LoanID: 1009,
        CustomerID: 107,
        BranchID: 4,
        LoanType: "Home Loan",
        LoanAmount: 2200000,
        OutstandingAmount: 1800000,
        LoanDate: ISODate("2025-08-10")
    },
    {
        LoanID: 1010,
        CustomerID: 108,
        BranchID: 1,
        LoanType: "Education Loan",
        LoanAmount: 600000,
        OutstandingAmount: 350000,
        LoanDate: ISODate("2025-09-01")
    },
    {
        LoanID: 1011,
        CustomerID: 103,
        BranchID: 3,
        LoanType: "Personal Loan",
        LoanAmount: 300000,
        OutstandingAmount: 150000,
        LoanDate: ISODate("2025-09-15")
    },
    {
        LoanID: 1012,
        CustomerID: 105,
        BranchID: 2,
        LoanType: "Business Loan",
        LoanAmount: 1200000,
        OutstandingAmount: 900000,
        LoanDate: ISODate("2025-10-01")
    }
];

if (bankDB.loans.countDocuments() === 0) {
    bankDB.loans.insertMany(loans);
    print("Inserted 12 loan documents.");
} else {
    print("Loans already contain data. Skipping insertion.");
}


/* ============================================================
   4. REPAYMENTS COLLECTION
   ============================================================ */

const repayments = [
    { RepaymentID: 1, LoanID: 1001, InstallmentNumber: 1, DueDate: ISODate("2026-07-10"), PaymentDate: ISODate("2026-07-10"), AmountPaid: 25000 },
    { RepaymentID: 2, LoanID: 1001, InstallmentNumber: 2, DueDate: ISODate("2026-08-10"), PaymentDate: ISODate("2026-08-12"), AmountPaid: 25000 },
    { RepaymentID: 3, LoanID: 1001, InstallmentNumber: 3, DueDate: ISODate("2026-09-10"), PaymentDate: null, AmountPaid: 0 },
    { RepaymentID: 4, LoanID: 1001, InstallmentNumber: 4, DueDate: ISODate("2026-10-10"), PaymentDate: null, AmountPaid: 0 },
    { RepaymentID: 5, LoanID: 1001, InstallmentNumber: 5, DueDate: ISODate("2026-11-10"), PaymentDate: null, AmountPaid: 0 },

    { RepaymentID: 6, LoanID: 1002, InstallmentNumber: 1, DueDate: ISODate("2026-08-15"), PaymentDate: ISODate("2026-08-15"), AmountPaid: 15000 },
    { RepaymentID: 7, LoanID: 1002, InstallmentNumber: 2, DueDate: ISODate("2026-09-15"), PaymentDate: ISODate("2026-09-16"), AmountPaid: 15000 },
    { RepaymentID: 8, LoanID: 1002, InstallmentNumber: 3, DueDate: ISODate("2026-10-15"), PaymentDate: null, AmountPaid: 0 },

    { RepaymentID: 9, LoanID: 1003, InstallmentNumber: 1, DueDate: ISODate("2026-09-20"), PaymentDate: ISODate("2026-09-20"), AmountPaid: 20000 },
    { RepaymentID: 10, LoanID: 1003, InstallmentNumber: 2, DueDate: ISODate("2026-10-20"), PaymentDate: ISODate("2026-10-22"), AmountPaid: 20000 },

    { RepaymentID: 11, LoanID: 1004, InstallmentNumber: 1, DueDate: ISODate("2026-07-10"), PaymentDate: null, AmountPaid: 0 },
    { RepaymentID: 12, LoanID: 1004, InstallmentNumber: 2, DueDate: ISODate("2026-08-10"), PaymentDate: null, AmountPaid: 0 },
    { RepaymentID: 13, LoanID: 1004, InstallmentNumber: 3, DueDate: ISODate("2026-09-10"), PaymentDate: null, AmountPaid: 0 },
    { RepaymentID: 14, LoanID: 1004, InstallmentNumber: 4, DueDate: ISODate("2026-10-10"), PaymentDate: null, AmountPaid: 0 },

    { RepaymentID: 15, LoanID: 1005, InstallmentNumber: 1, DueDate: ISODate("2026-09-05"), PaymentDate: ISODate("2026-09-05"), AmountPaid: 12000 },
    { RepaymentID: 16, LoanID: 1005, InstallmentNumber: 2, DueDate: ISODate("2026-10-05"), PaymentDate: ISODate("2026-10-05"), AmountPaid: 12000 },

    { RepaymentID: 17, LoanID: 1006, InstallmentNumber: 1, DueDate: ISODate("2026-10-12"), PaymentDate: null, AmountPaid: 0 },
    { RepaymentID: 18, LoanID: 1007, InstallmentNumber: 1, DueDate: ISODate("2026-10-01"), PaymentDate: ISODate("2026-10-01"), AmountPaid: 30000 },
    { RepaymentID: 19, LoanID: 1008, InstallmentNumber: 1, DueDate: ISODate("2026-10-15"), PaymentDate: ISODate("2026-10-18"), AmountPaid: 18000 },
    { RepaymentID: 20, LoanID: 1009, InstallmentNumber: 1, DueDate: ISODate("2026-09-10"), PaymentDate: null, AmountPaid: 0 },
    { RepaymentID: 21, LoanID: 1010, InstallmentNumber: 1, DueDate: ISODate("2026-10-01"), PaymentDate: ISODate("2026-10-02"), AmountPaid: 10000 },
    { RepaymentID: 22, LoanID: 1011, InstallmentNumber: 1, DueDate: ISODate("2026-10-15"), PaymentDate: null, AmountPaid: 0 }
];

if (bankDB.repayments.countDocuments() === 0) {
    bankDB.repayments.insertMany(repayments);
    print("Inserted 22 repayment documents.");
} else {
    print("Repayments already contain data. Skipping insertion.");
}


/* ============================================================
   5. VERIFY COLLECTIONS
   ============================================================ */

print("\n========== DATABASE VERIFICATION ==========");

print("Database: " + bankDB.getName());

print("Customers: " + bankDB.customers.countDocuments());
print("Loans: " + bankDB.loans.countDocuments());
print("Repayments: " + bankDB.repayments.countDocuments());

print("\nCollection summary:");

printjson(
    bankDB.getCollectionNames().map(name => ({
        Collection: name,
        Documents: bankDB.getCollection(name).countDocuments()
    }))
);

print("\nBANK LOAN PORTFOLIO MONGODB SETUP COMPLETED!");
