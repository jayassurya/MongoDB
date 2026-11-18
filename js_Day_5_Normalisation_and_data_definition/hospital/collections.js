
// ======================================================
// HEXAWARE DAY 5 - SET 3
// HOSPITAL PATIENT RECORDS AND CLINICAL NOTES
// MONGODB OPERATIONS
// ======================================================

// 1. SELECT DATABASE
use("Hexaware_Day5_Hospital");

// 2. DROP EXISTING COLLECTION
db.clinicalNotes.drop();

// 3. CREATE COLLECTION WITH JSON SCHEMA VALIDATION

db.createCollection("clinicalNotes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",

            required: [
                "NoteID",
                "PatientID",
                "DoctorName",
                "VisitDate",
                "Diagnosis",
                "NoteType"
            ],

            properties: {
                NoteID: {
                    bsonType: "int",
                    description: "Note ID must be an integer"
                },

                PatientID: {
                    bsonType: "int",
                    description: "Patient ID is required"
                },

                DoctorName: {
                    bsonType: "string",
                    description: "Doctor name must be a string"
                },

                VisitDate: {
                    bsonType: "date",
                    description: "Visit date must be a date"
                },

                Diagnosis: {
                    bsonType: "string",
                    description: "Diagnosis is required"
                },

                NoteType: {
                    enum: ["Consultation", "Laboratory"],
                    description: "Note type must be Consultation or Laboratory"
                },

                Symptoms: {
                    bsonType: "array",
                    items: {
                        bsonType: "string"
                    }
                },

                Observations: {
                    bsonType: "string"
                },

                Treatment: {
                    bsonType: "string"
                },

                TestName: {
                    bsonType: "string"
                },

                TestResult: {
                    bsonType: "string"
                },

                Interpretation: {
                    bsonType: "string"
                }
            },

            oneOf: [
                {
                    required: [
                        "Symptoms",
                        "Observations",
                        "Treatment"
                    ],
                    properties: {
                        NoteType: {
                            enum: ["Consultation"]
                        }
                    }
                },
                {
                    required: [
                        "TestName",
                        "TestResult",
                        "Interpretation"
                    ],
                    properties: {
                        NoteType: {
                            enum: ["Laboratory"]
                        }
                    }
                }
            ]
        }
    },

    validationLevel: "strict",
    validationAction: "error"
});

print("Clinical notes collection created with JSON Schema validation.");

// ======================================================
// 4. INSERT DOCUMENTS WITH TWO DIFFERENT STRUCTURES
// ======================================================

// SHAPE 1: CONSULTATION NOTES

db.clinicalNotes.insertMany([
    {
        NoteID: 1,
        PatientID: 701,
        DoctorName: "Dr. Rajesh",
        VisitDate: ISODate("2026-10-10"),
        Diagnosis: "Fever",
        NoteType: "Consultation",
        Symptoms: ["High temperature", "Headache", "Fatigue"],
        Observations: "Patient has mild fever and body pain.",
        Treatment: "Paracetamol and adequate rest."
    },

    {
        NoteID: 2,
        PatientID: 702,
        DoctorName: "Dr. Priya",
        VisitDate: ISODate("2026-10-11"),
        Diagnosis: "Diabetes",
        NoteType: "Consultation",
        Symptoms: ["Increased thirst", "Frequent urination"],
        Observations: "Blood sugar level requires monitoring.",
        Treatment: "Medication and dietary control."
    },

    {
        NoteID: 3,
        PatientID: 703,
        DoctorName: "Dr. Kumar",
        VisitDate: ISODate("2026-10-12"),
        Diagnosis: "Migraine",
        NoteType: "Consultation",
        Symptoms: ["Severe headache", "Sensitivity to light"],
        Observations: "Patient reports recurring headaches.",
        Treatment: "Prescribed migraine medication."
    }
]);

// SHAPE 2: LABORATORY NOTES

db.clinicalNotes.insertMany([
    {
        NoteID: 4,
        PatientID: 701,
        DoctorName: "Dr. Rajesh",
        VisitDate: ISODate("2026-10-13"),
        Diagnosis: "Fever",
        NoteType: "Laboratory",
        TestName: "Complete Blood Count",
        TestResult: "WBC count: 12000 cells/mcL",
        Interpretation: "Elevated WBC count observed."
    },

    {
        NoteID: 5,
        PatientID: 702,
        DoctorName: "Dr. Priya",
        VisitDate: ISODate("2026-10-14"),
        Diagnosis: "Diabetes",
        NoteType: "Laboratory",
        TestName: "Blood Glucose Test",
        TestResult: "Fasting glucose: 160 mg/dL",
        Interpretation: "Blood glucose level is elevated."
    },

    {
        NoteID: 6,
        PatientID: 704,
        DoctorName: "Dr. Meena",
        VisitDate: ISODate("2026-10-15"),
        Diagnosis: "Anaemia",
        NoteType: "Laboratory",
        TestName: "Haemoglobin Test",
        TestResult: "Haemoglobin: 9.5 g/dL",
        Interpretation: "Haemoglobin level is below the usual adult range."
    }
]);

print("Six clinical notes inserted successfully.");

// ======================================================
// 5. FIND ALL CLINICAL NOTES
// ======================================================

print("\nALL CLINICAL NOTES:");

db.clinicalNotes.find().forEach(printjson);

// ======================================================
// 6. QUERY NOTES BY DIAGNOSIS
// ======================================================

print("\nCLINICAL NOTES FOR FEVER:");

db.clinicalNotes.find({
    Diagnosis: "Fever"
}).forEach(printjson);

// ======================================================
// 7. QUERY CONSULTATION NOTES ONLY
// ======================================================

print("\nCONSULTATION NOTES:");

db.clinicalNotes.find({
    NoteType: "Consultation"
}).forEach(printjson);

// ======================================================
// 8. QUERY LABORATORY NOTES ONLY
// ======================================================

print("\nLABORATORY NOTES:");

db.clinicalNotes.find({
    NoteType: "Laboratory"
}).forEach(printjson);

// ======================================================
// 9. FINAL VERIFICATION
// ======================================================

print("\nTOTAL CLINICAL NOTES:");

print(db.clinicalNotes.countDocuments());

print("\nCOLLECTION VALIDATION DETAILS:");

printjson(
    db.getCollectionInfos({
        name: "clinicalNotes"
    })
);

print("\nDAY 5 SET 3 MONGODB OPERATIONS COMPLETED.");
