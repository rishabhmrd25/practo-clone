require("dotenv").config();
const { sequelize } = require("./config/db.js");
const Slot = require("./models/slot.model.js");

const slotSeedData = [
  {
    doctorId: 113,  
    clinicId: 7,    
    date: "2025-02-19",
    time: "10:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 113,
    clinicId: 7,
    date: "2025-02-19",
    time: "10:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 113,  
    clinicId: 7,    
    date: "2025-02-19",
    time: "11:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 113,  
    clinicId: 17,    
    date: "2025-02-19",
    time: "12:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 113,  
    clinicId: 17,    
    date: "2025-02-19",
    time: "11:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 113,  
    clinicId: 17,    
    date: "2025-02-19",
    time: "12:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  







];

async function seedSlots() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        // Insert slots into the database
        await Slot.bulkCreate(slotSeedData);
        console.log("Slot data inserted successfully!");

    } catch (error) {
        console.error("Error seeding slots:", error);
    } finally {
        await sequelize.close();
    }
}

// Run the seeding function
seedSlots();
