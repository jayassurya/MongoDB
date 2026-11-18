
// ======================================================
// HEXAWARE DAY 5 - SET 1
// RETAIL INVENTORY AND PRODUCT REVIEWS
// MONGODB OPERATIONS
// ======================================================

// 1. SELECT DATABASE
use("Hexaware_Day5_Retail");

// 2. DROP EXISTING COLLECTION
db.reviews.drop();

// 3. CREATE REVIEWS COLLECTION WITH JSON SCHEMA VALIDATOR

db.createCollection("reviews", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "ReviewID",
                "ProductSKU",
                "CustomerName",
                "Rating",
                "ReviewText",
                "ReviewDate"
            ],
            properties: {
                ReviewID: {
                    bsonType: "int",
                    description: "Review ID must be an integer"
                },
                ProductSKU: {
                    bsonType: "string",
                    description: "Product SKU must be a string"
                },
                CustomerName: {
                    bsonType: "string",
                    description: "Customer name is required"
                },
                Rating: {
                    bsonType: "int",
                    minimum: 1,
                    maximum: 5,
                    description: "Rating must be between 1 and 5"
                },
                ReviewText: {
                    bsonType: "string",
                    description: "Review text must be a string"
                },
                ReviewDate: {
                    bsonType: "date",
                    description: "Review date must be a date"
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});

print("Reviews collection created with JSON Schema validation.");

// 4. INSERT MULTIPLE REVIEWS

db.reviews.insertMany([
    {
        ReviewID: 1,
        ProductSKU: "SKU101",
        CustomerName: "Arun Kumar",
        Rating: 5,
        ReviewText: "Excellent product quality and fast delivery.",
        ReviewDate: ISODate("2026-10-01")
    },
    {
        ReviewID: 2,
        ProductSKU: "SKU102",
        CustomerName: "Priya Sharma",
        Rating: 4,
        ReviewText: "Good product, but packaging could be better.",
        ReviewDate: ISODate("2026-10-02")
    },
    {
        ReviewID: 3,
        ProductSKU: "SKU103",
        CustomerName: "Rahul Raj",
        Rating: 3,
        ReviewText: "Average quality for the price.",
        ReviewDate: ISODate("2026-10-03")
    },
    {
        ReviewID: 4,
        ProductSKU: "SKU101",
        CustomerName: "Divya S",
        Rating: 5,
        ReviewText: "Very useful and worth purchasing.",
        ReviewDate: ISODate("2026-10-04")
    },
    {
        ReviewID: 5,
        ProductSKU: "SKU104",
        CustomerName: "Karthik M",
        Rating: 2,
        ReviewText: "Product stopped working after a few days.",
        ReviewDate: ISODate("2026-10-05")
    },
    {
        ReviewID: 6,
        ProductSKU: "SKU105",
        CustomerName: "Sneha R",
        Rating: 4,
        ReviewText: "Satisfied with the product.",
        ReviewDate: ISODate("2026-10-06")
    },
    {
        ReviewID: 7,
        ProductSKU: "SKU102",
        CustomerName: "Vijay Kumar",
        Rating: 5,
        ReviewText: "Amazing experience and good quality.",
        ReviewDate: ISODate("2026-10-07")
    },
    {
        ReviewID: 8,
        ProductSKU: "SKU103",
        CustomerName: "Meena R",
        Rating: 3,
        ReviewText: "The product is decent.",
        ReviewDate: ISODate("2026-10-08")
    },
    {
        ReviewID: 9,
        ProductSKU: "SKU104",
        CustomerName: "Suresh K",
        Rating: 1,
        ReviewText: "Not satisfied with the product.",
        ReviewDate: ISODate("2026-10-09")
    },
    {
        ReviewID: 10,
        ProductSKU: "SKU105",
        CustomerName: "Anitha P",
        Rating: 4,
        ReviewText: "Good value for money.",
        ReviewDate: ISODate("2026-10-10")
    }
]);

print("10 product reviews inserted successfully.");

// 5. FIND OPERATIONS

// Display all reviews
db.reviews.find();

// Find reviews for a particular product
db.reviews.find({
    ProductSKU: "SKU101"
});

// Find reviews with ratings greater than or equal to 4
db.reviews.find({
    Rating: { $gte: 4 }
});

// Display only customer name, rating and review text
db.reviews.find(
    {},
    {
        _id: 0,
        CustomerName: 1,
        Rating: 1,
        ReviewText: 1
    }
);

// 6. UPDATE ONE OPERATION

db.reviews.updateOne(
    { ReviewID: 3 },
    {
        $set: {
            Rating: 4,
            ReviewText: "Updated review: Product quality is better than expected."
        }
    }
);

print("One review updated successfully.");

// Verify updated review
db.reviews.find({
    ReviewID: 3
});

// 7. DELETE ONE OPERATION

db.reviews.deleteOne({
    ReviewID: 5
});

print("One review deleted successfully.");

// Verify remaining reviews
db.reviews.find();

// 8. FINAL VERIFICATION

print("Total reviews remaining:", db.reviews.countDocuments());

print("DAY 5 SET 1 MONGODB OPERATIONS COMPLETED.");
