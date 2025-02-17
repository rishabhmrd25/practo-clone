require("dotenv").config();
const { sequelize } = require("./config/db.js");
const Slot = require("./models/slot.model.js");

const slotSeedData = [
  {
    doctorId: 113,  
    clinicId: 7,    
    date: "2025-02-18",
    time: "09:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 113,
    clinicId: 8,
    date: "2025-02-18",
    time: "10:00:00",
    status: "Booked",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 114,  
    clinicId: 17,    
    date: "2025-02-18",
    time: "14:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 116,  
    clinicId: 19,    
    date: "2025-02-19",
    time: "11:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 118,  
    clinicId: 16,
    date: "2025-02-19",
    time: "16:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 115,  
    clinicId: 4,    
    date: "2025-02-20",
    time: "09:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 123,  
    clinicId: 18,    
    date: "2025-02-20",
    time: "15:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 124,
    clinicId: 19,
    date: "2025-02-20",
    time: "16:00:00",
    status: "Booked",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 122,  
    clinicId: 15,
    date: "2025-02-21",
    time: "10:00:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 129,  
    clinicId: 4,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 120,  
    clinicId: 15,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 121,  
    clinicId: 14,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 121,  
    clinicId: 11,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 125,  
    clinicId: 9,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 122,  
    clinicId: 4,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 115,  
    clinicId: 5,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 115,  
    clinicId: 11,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 122,  
    clinicId: 9,
    date: "2025-02-21",
    time: "14:30:00",
    status: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    doctorId: 117,  
    clinicId: 13,
    date: "2025-02-21",
    time: "14:30:00",
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
