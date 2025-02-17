require("dotenv").config();
const { sequelize } = require("./config/db.js");
const Clinic = require("./models/clinic.model.js");

const clinicSeedData = [
    {
      name: "all care dental centre",
      location: "indiranagar, bangalore",
      workingDays: "Mon-Fri",
      openingTime: "09:00:00",
      closingTime: "17:00:00",
      fee: 300,
      rating: 4.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Dental de care",
      location: "Domlur , Bangalore",
      workingDays: "Mon,Wed,Fri",
      openingTime: "08:30:00",
      closingTime: "18:30:00",
      fee: 500,
      rating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "excel dental care",
      location: "Jayanagar, Bangalore",
      workingDays: "Mon-Sat",
      openingTime: "10:00:00",
      closingTime: "19:00:00",
      fee: 300,
      rating: 4.3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "chisel dental ",
      location: "Koramangala , Bangalore",
      workingDays: "Tue-Sat",
      openingTime: "08:00:00",
      closingTime: "16:00:00",
      fee: 350,
      rating: 4.6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Impression dental",
      location: "Sahakarnagar",
      workingDays: "Mon,Tue,Thu,Fri",
      openingTime: "09:30:00",
      closingTime: "17:30:00",
      fee: 400,
      rating: 4.7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Smile n more",
      location: "HSR layout",
      workingDays: "Mon,Tue,Thu,Fri",
      openingTime: "09:30:00",
      closingTime: "17:30:00",
      fee: 400,
      rating: 4.7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "American dental",
      location: "Indiranagar",
      workingDays: "Mon,Tue,Thu,Fri",
      openingTime: "09:30:00",
      closingTime: "17:30:00",
      fee: 500,
      rating: 4.7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "elite esthetics",
      location: "HSR layout",
      workingDays: "Mon,Tue,Thu,Fri",
      openingTime: "09:30:00",
      closingTime: "17:30:00",
      fee: 350,
      rating: 4.7,
      createdAt: new Date(),
      updatedAt: new Date()
    }
];

async function seedClinics() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        // Insert clinics into the database
        await Clinic.bulkCreate(clinicSeedData);
        console.log("Clinic data inserted successfully!");

    } catch (error) {
        console.error("Error seeding clinics:", error);
    } finally {
        await sequelize.close();
    }
}

// Run the seeding function
seedClinics();
