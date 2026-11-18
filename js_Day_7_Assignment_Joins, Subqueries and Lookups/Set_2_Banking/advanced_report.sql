
/*
============================================================
HEXaware DAY 7 - SET 2
BANK LOAN PORTFOLIO
SQL SERVER 2025
============================================================

Complete script:
1. Database creation
2. Table creation
3. Sample data insertion
4. Ten JOIN queries
5. Correlated and uncorrelated subqueries
6. EXISTS and NOT EXISTS
7. Nested subquery

Database: Hexaware_Day7_Banking

IMPORTANT:
This script drops and recreates the five assignment tables
if they already exist. Running it again resets their data.
============================================================
*/


/* ============================================================
   PART 1: DATABASE CREATION
   ============================================================ */

IF DB_ID('Hexaware_Day7_Banking') IS NULL
BEGIN
    CREATE DATABASE Hexaware_Day7_Banking;
END;
GO

USE Hexaware_Day7_Banking;
GO


/* ============================================================
   PART 2: DROP EXISTING TABLES
   ============================================================ */

DROP TABLE IF EXISTS Guarantors;
DROP TABLE IF EXISTS Repayments;
DROP TABLE IF EXISTS Loans;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Branches;
GO


/* ============================================================
   PART 3: CREATE TABLES
   ============================================================ */


/* TABLE 1: BRANCHES */

CREATE TABLE Branches
(
    BranchID INT PRIMARY KEY,
    BranchName VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL
);


/* TABLE 2: CUSTOMERS */

CREATE TABLE Customers
(
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Phone VARCHAR(15)
);


/* TABLE 3: LOANS */

CREATE TABLE Loans
(
    LoanID INT PRIMARY KEY,
    CustomerID INT NOT NULL,
    BranchID INT NOT NULL,
    LoanType VARCHAR(50),
    LoanAmount DECIMAL(12,2),
    OutstandingAmount DECIMAL(12,2),
    LoanDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (BranchID) REFERENCES Branches(BranchID)
);


/* TABLE 4: REPAYMENTS */

CREATE TABLE Repayments
(
    RepaymentID INT PRIMARY KEY,
    LoanID INT NOT NULL,
    InstallmentNumber INT NOT NULL,
    DueDate DATE NOT NULL,
    PaymentDate DATE NULL,
    AmountPaid DECIMAL(12,2) DEFAULT 0,
    FOREIGN KEY (LoanID) REFERENCES Loans(LoanID)
);


/* TABLE 5: GUARANTORS */

CREATE TABLE Guarantors
(
    GuarantorID INT PRIMARY KEY,
    LoanID INT NOT NULL,
    GuarantorCustomerID INT NOT NULL,
    FOREIGN KEY (LoanID) REFERENCES Loans(LoanID),
    FOREIGN KEY (GuarantorCustomerID) REFERENCES Customers(CustomerID)
);
GO


/* ============================================================
   PART 4: INSERT SAMPLE DATA
   ============================================================ */


/* BRANCH DATA */

INSERT INTO Branches VALUES
(1, 'Chennai Main Branch', 'Chennai'),
(2, 'Bangalore Branch', 'Bangalore'),
(3, 'Hyderabad Branch', 'Hyderabad'),
(4, 'Mumbai Branch', 'Mumbai'),
(5, 'Delhi Branch', 'Delhi');


/* CUSTOMER DATA */

INSERT INTO Customers VALUES
(101, 'Arun Kumar', 'arun@gmail.com', '9876543210'),
(102, 'Priya Sharma', 'priya@gmail.com', '9876543211'),
(103, 'Rahul Verma', 'rahul@gmail.com', '9876543212'),
(104, 'Sneha Raj', 'sneha@gmail.com', '9876543213'),
(105, 'Karthik S', 'karthik@gmail.com', '9876543214'),
(106, 'Divya Nair', 'divya@gmail.com', '9876543215'),
(107, 'Vikram Singh', 'vikram@gmail.com', '9876543216'),
(108, 'Meena Joseph', 'meena@gmail.com', '9876543217');


/* LOAN DATA */

INSERT INTO Loans VALUES
(1001, 101, 1, 'Home Loan', 2500000, 2000000, '2025-01-10'),
(1002, 102, 1, 'Personal Loan', 500000, 300000, '2025-02-15'),
(1003, 103, 2, 'Car Loan', 900000, 600000, '2025-03-20'),
(1004, 104, 2, 'Home Loan', 3000000, 2500000, '2025-04-10'),
(1005, 105, 3, 'Education Loan', 800000, 500000, '2025-05-05'),
(1006, 106, 3, 'Personal Loan', 400000, 250000, '2025-06-12'),
(1007, 101, 2, 'Business Loan', 1500000, 1000000, '2025-07-01'),
(1008, 102, 4, 'Car Loan', 700000, 400000, '2025-07-15'),
(1009, 107, 4, 'Home Loan', 2200000, 1800000, '2025-08-10'),
(1010, 108, 1, 'Education Loan', 600000, 350000, '2025-09-01'),
(1011, 103, 3, 'Personal Loan', 300000, 150000, '2025-09-15'),
(1012, 105, 2, 'Business Loan', 1200000, 900000, '2025-10-01');


/* REPAYMENT DATA */

INSERT INTO Repayments VALUES
(1, 1001, 1, '2026-07-10', '2026-07-10', 25000),
(2, 1001, 2, '2026-08-10', '2026-08-12', 25000),
(3, 1001, 3, '2026-09-10', NULL, 0),
(4, 1001, 4, '2026-10-10', NULL, 0),
(5, 1001, 5, '2026-11-10', NULL, 0),

(6, 1002, 1, '2026-08-15', '2026-08-15', 15000),
(7, 1002, 2, '2026-09-15', '2026-09-16', 15000),
(8, 1002, 3, '2026-10-15', NULL, 0),

(9, 1003, 1, '2026-09-20', '2026-09-20', 20000),
(10, 1003, 2, '2026-10-20', '2026-10-22', 20000),

(11, 1004, 1, '2026-07-10', NULL, 0),
(12, 1004, 2, '2026-08-10', NULL, 0),
(13, 1004, 3, '2026-09-10', NULL, 0),
(14, 1004, 4, '2026-10-10', NULL, 0),

(15, 1005, 1, '2026-09-05', '2026-09-05', 12000),
(16, 1005, 2, '2026-10-05', '2026-10-05', 12000),

(17, 1006, 1, '2026-10-12', NULL, 0),
(18, 1007, 1, '2026-10-01', '2026-10-01', 30000),
(19, 1008, 1, '2026-10-15', '2026-10-18', 18000),
(20, 1009, 1, '2026-09-10', NULL, 0),
(21, 1010, 1, '2026-10-01', '2026-10-02', 10000),
(22, 1011, 1, '2026-10-15', NULL, 0);


/* GUARANTOR DATA */

INSERT INTO Guarantors VALUES
(1, 1001, 103),
(2, 1002, 104),
(3, 1003, 101),
(4, 1004, 105),
(5, 1005, 106),
(6, 1006, 102),
(7, 1007, 107),
(8, 1008, 108);
GO


/* ============================================================
   PART 5: VERIFY SAMPLE DATA
   ============================================================ */

SELECT 'Branches' AS TableName, COUNT(*) AS TotalRecords FROM Branches
UNION ALL
SELECT 'Customers', COUNT(*) FROM Customers
UNION ALL
SELECT 'Loans', COUNT(*) FROM Loans
UNION ALL
SELECT 'Repayments', COUNT(*) FROM Repayments
UNION ALL
SELECT 'Guarantors', COUNT(*) FROM Guarantors;
GO


/* ============================================================
   TASK 1: TEN BUSINESS QUESTIONS USING JOINS
   ============================================================ */


/* Q1. Find loans overdue by more than three instalments.
       INNER JOIN + GROUP BY
*/

SELECT
    l.LoanID,
    c.CustomerName,
    b.BranchName,
    COUNT(r.RepaymentID) AS OverdueInstallments
FROM Loans l
INNER JOIN Customers c
    ON l.CustomerID = c.CustomerID
INNER JOIN Branches b
    ON l.BranchID = b.BranchID
INNER JOIN Repayments r
    ON l.LoanID = r.LoanID
WHERE r.DueDate < CAST(GETDATE() AS DATE)
  AND r.PaymentDate IS NULL
GROUP BY l.LoanID, c.CustomerName, b.BranchName
HAVING COUNT(r.RepaymentID) > 3;


/* Q2. Find customers who have loans in more than one branch.
       INNER JOIN + GROUP BY
*/

SELECT
    c.CustomerID,
    c.CustomerName,
    COUNT(DISTINCT l.BranchID) AS TotalBranches
FROM Customers c
INNER JOIN Loans l
    ON c.CustomerID = l.CustomerID
GROUP BY c.CustomerID, c.CustomerName
HAVING COUNT(DISTINCT l.BranchID) > 1;


/* Q3. Find guarantors who are also borrowers.
       SELF JOIN through Customers and Loans
*/

SELECT
    borrower.CustomerName AS BorrowerName,
    l.LoanID,
    guarantor.CustomerName AS GuarantorName,
    borrowerLoan.LoanID AS GuarantorOwnLoanID
FROM Guarantors g
INNER JOIN Loans l
    ON g.LoanID = l.LoanID
INNER JOIN Customers borrower
    ON l.CustomerID = borrower.CustomerID
INNER JOIN Customers guarantor
    ON g.GuarantorCustomerID = guarantor.CustomerID
INNER JOIN Loans borrowerLoan
    ON guarantor.CustomerID = borrowerLoan.CustomerID;


/* Q4. Find branches that do not have any loans.
       LEFT JOIN
*/

SELECT
    b.BranchID,
    b.BranchName,
    b.City
FROM Branches b
LEFT JOIN Loans l
    ON b.BranchID = l.BranchID
WHERE l.LoanID IS NULL;


/* Q5. Display loan details with customer and branch information.
       INNER JOIN
*/

SELECT
    l.LoanID,
    c.CustomerName,
    b.BranchName,
    l.LoanType,
    l.LoanAmount,
    l.OutstandingAmount,
    l.LoanDate
FROM Loans l
INNER JOIN Customers c
    ON l.CustomerID = c.CustomerID
INNER JOIN Branches b
    ON l.BranchID = b.BranchID
ORDER BY l.LoanID;


/* Q6. Display repayment details with loan and customer information.
       INNER JOIN
*/

SELECT
    r.RepaymentID,
    l.LoanID,
    c.CustomerName,
    r.InstallmentNumber,
    r.DueDate,
    r.PaymentDate,
    r.AmountPaid
FROM Repayments r
INNER JOIN Loans l
    ON r.LoanID = l.LoanID
INNER JOIN Customers c
    ON l.CustomerID = c.CustomerID
ORDER BY l.LoanID, r.InstallmentNumber;


/* Q7. Calculate total loans and loan amount for every branch,
       including branches without loans.
       LEFT JOIN
*/

SELECT
    b.BranchID,
    b.BranchName,
    COUNT(l.LoanID) AS TotalLoans,
    COALESCE(SUM(l.LoanAmount), 0) AS TotalLoanAmount
FROM Branches b
LEFT JOIN Loans l
    ON b.BranchID = l.BranchID
GROUP BY b.BranchID, b.BranchName
ORDER BY TotalLoanAmount DESC;


/* Q8. Find loans that do not have any repayment records.
       LEFT JOIN
*/

SELECT
    l.LoanID,
    c.CustomerName,
    l.LoanAmount
FROM Loans l
INNER JOIN Customers c
    ON l.CustomerID = c.CustomerID
LEFT JOIN Repayments r
    ON l.LoanID = r.LoanID
WHERE r.RepaymentID IS NULL;


/* Q9. Find total amount repaid by each customer.
       LEFT JOIN
*/

SELECT
    c.CustomerID,
    c.CustomerName,
    COUNT(DISTINCT l.LoanID) AS TotalLoans,
    COALESCE(SUM(r.AmountPaid), 0) AS TotalAmountRepaid
FROM Customers c
LEFT JOIN Loans l
    ON c.CustomerID = l.CustomerID
LEFT JOIN Repayments r
    ON l.LoanID = r.LoanID
GROUP BY c.CustomerID, c.CustomerName
ORDER BY TotalAmountRepaid DESC;


/* Q10. Display all branches and their loan records.
        FULL OUTER JOIN
*/

SELECT
    b.BranchID,
    b.BranchName,
    l.LoanID,
    l.LoanAmount,
    l.OutstandingAmount
FROM Branches b
FULL OUTER JOIN Loans l
    ON b.BranchID = l.BranchID
ORDER BY b.BranchID, l.LoanID;


/* ============================================================
   TASK 2: CORRELATED AND UNCORRELATED SUBQUERIES

   Find customers whose total loan exposure exceeds
   the average customer loan exposure in their branch.

   Exposure = SUM(OutstandingAmount)
   ============================================================ */


/* Q1. CORRELATED SUBQUERY */

WITH CustomerBranchExposure AS
(
    SELECT
        l.CustomerID,
        l.BranchID,
        SUM(l.OutstandingAmount) AS CustomerExposure
    FROM Loans l
    GROUP BY l.CustomerID, l.BranchID
)
SELECT
    c.CustomerID,
    c.CustomerName,
    b.BranchName,
    e.CustomerExposure
FROM CustomerBranchExposure e
INNER JOIN Customers c
    ON e.CustomerID = c.CustomerID
INNER JOIN Branches b
    ON e.BranchID = b.BranchID
WHERE e.CustomerExposure >
(
    SELECT AVG(e2.CustomerExposure)
    FROM CustomerBranchExposure e2
    WHERE e2.BranchID = e.BranchID
);


/* Q2. UNCORRELATED SUBQUERY

   The inner derived query calculates average customer
   exposure for each branch independently.
*/

WITH CustomerBranchExposure AS
(
    SELECT
        CustomerID,
        BranchID,
        SUM(OutstandingAmount) AS CustomerExposure
    FROM Loans
    GROUP BY CustomerID, BranchID
)
SELECT
    c.CustomerID,
    c.CustomerName,
    b.BranchName,
    e.CustomerExposure,
    branchAverage.BranchAverageExposure
FROM CustomerBranchExposure e
INNER JOIN Customers c
    ON e.CustomerID = c.CustomerID
INNER JOIN Branches b
    ON e.BranchID = b.BranchID
INNER JOIN
(
    SELECT
        BranchID,
        AVG(CustomerExposure) AS BranchAverageExposure
    FROM CustomerBranchExposure
    GROUP BY BranchID
) branchAverage
    ON e.BranchID = branchAverage.BranchID
WHERE e.CustomerExposure > branchAverage.BranchAverageExposure;


/* ============================================================
   TASK 3: EXISTS AND NOT EXISTS

   Find customers with a loan but no repayment
   during the last 60 days.
   ============================================================ */


/* Q1. EXISTS + NOT EXISTS */

SELECT
    c.CustomerID,
    c.CustomerName
FROM Customers c
WHERE EXISTS
(
    SELECT 1
    FROM Loans l
    WHERE l.CustomerID = c.CustomerID
)
AND NOT EXISTS
(
    SELECT 1
    FROM Loans l
    INNER JOIN Repayments r
        ON l.LoanID = r.LoanID
    WHERE l.CustomerID = c.CustomerID
      AND r.PaymentDate >= DATEADD(
          DAY, -60, CAST(GETDATE() AS DATE)
      )
      AND r.PaymentDate <= CAST(GETDATE() AS DATE)
);


/* ============================================================
   TASK 4: NESTED SUBQUERY

   Find branches whose highest loan is greater than
   the bank-wide average of branch maximum loan amounts.
   ============================================================ */

SELECT
    b.BranchID,
    b.BranchName,
    (
        SELECT MAX(l.LoanAmount)
        FROM Loans l
        WHERE l.BranchID = b.BranchID
    ) AS HighestBranchLoan
FROM Branches b
WHERE
(
    SELECT MAX(l.LoanAmount)
    FROM Loans l
    WHERE l.BranchID = b.BranchID
)
>
(
    SELECT AVG(BranchMaximum)
    FROM
    (
        SELECT
            MAX(LoanAmount) AS BranchMaximum
        FROM Loans
        GROUP BY BranchID
    ) BranchMaximums
);


/* ============================================================
   FINAL VERIFICATION
   ============================================================ */

PRINT 'DAY 7 SET 2 - BANK LOAN PORTFOLIO COMPLETED';

SELECT
    'Total Branches' AS Description,
    COUNT(*) AS Total
FROM Branches

UNION ALL

SELECT 'Total Customers', COUNT(*) FROM Customers

UNION ALL

SELECT 'Total Loans', COUNT(*) FROM Loans

UNION ALL

SELECT 'Total Repayments', COUNT(*) FROM Repayments

UNION ALL

SELECT 'Total Guarantors', COUNT(*) FROM Guarantors;

GO

/* ============================================================
   END OF DAY 7 - SET 2 SQL ASSIGNMENT
   ============================================================ */
