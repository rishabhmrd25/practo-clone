require("dotenv").config();
const { sequelize } = require("./config/db.js");
const Slot = require("./models/slot.model.js");
const Doctor = require("./models/doctor.model.js");
const Clinic = require("./models/clinic.model.js");

async function seedSlots() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        // Fetch doctors and clinics (assuming some exist)
        const doctors = await Doctor.findAll();
        const clinics = await Clinic.findAll();

        if (doctors.length === 0 || clinics.length === 0) {
            console.log("No doctors or clinics found. Add data first.");
            return;
        }

        const slots = [];
        const today = new Date();

        // Generate slots for the next 3 days
        for (let day = 0; day < 3; day++) {
            const date = new Date();
            date.setDate(today.getDate() + day);
            const formattedDate = date.toISOString().split("T")[0];

            // Assign slots for each doctor in a random clinic
            doctors.forEach((doctor) => {
                const clinic = clinics[Math.floor(Math.random() * clinics.length)];

                // Create 4 slots per day (morning & afternoon)
                const times = ["09:00:00", "10:00:00", "14:00:00", "15:00:00"];
                times.forEach((time) => {
                    slots.push({
                        doctorId: doctor.id,
                        clinicId: clinic.id,
                        date: formattedDate,
                        time: time,
                        status: "Available",
                    });
                });
            });
        }

        // Bulk insert slots
        await Slot.bulkCreate(slots);
        console.log(`Inserted ${slots.length} slots successfully.`);

    } catch (error) {
        console.error("Error seeding slots:", error);
    } finally {
        await sequelize.close();
    }
}

// Run the seeding function
seedSlots();
