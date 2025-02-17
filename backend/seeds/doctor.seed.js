const Doctor = require('../models/doctor.model.js');
const { sequelize } = require('../config/db.js');

// Modify first two dentists to have specific IDs matching slots table
const dentists = [
  {
    id: 113,  // Explicitly set ID to match slots table
    name: "Dr. Venkatesh M J",
    specialization: "Dentist",
    post: "Senior Dentist",
    experience: 30,
    gender: "Male",
    description: "Practicing at All Care Dental Centre since 1969. Provides comprehensive dental care with 30 years of experience.",
    image: "https://imagesx.practo.com/providers/dr-venkatesh-m-j-orthodontist-bangalore-ee5cbcc5-c408-4b69-99ef-abeae7307239.jpg?i_type=t_70x70-2x-webp",
    doctor_index: "dentist"
  },
  {
    id: 114,  // Explicitly set ID to match slots table
    name: "Dr. K.A. Mohan",
    specialization: "Dentist",
    post: "Senior Dental Surgeon",
    experience: 56,
    gender: "Male",
    description: "Practicing at Dental De Care. Extensive experience in dental procedures with over five decades of practice.",
    image: "https://imagesx.practo.com/providers/dr-k-a-mohan-orthodontist-bangalore-5021e4f3-7a64-4825-8958-c323fdd45b69.jpg?i_type=t_70x70-2x-webp",
    doctor_index: "dentist"
  },
  // ... rest of the dentists array remains the same
];

async function seedDentists() {
  try {
    // Sync the database
    await sequelize.sync({ alter: true });

    // First, delete existing doctors with IDs 113 and 114 to avoid conflicts
    await Doctor.destroy({
      where: {
        id: [113, 114]
      }
    });

    // Insert all dentists with force: true to allow explicit IDs
    const createdDentists = await Doctor.bulkCreate(dentists, {
      force: true,  // This allows setting explicit IDs
    });
    
    console.log('Successfully seeded dentist data!');
    console.log(`Created ${createdDentists.length} dentist records`);
    
    // Verify the specific IDs were created
    const doctor113 = await Doctor.findByPk(113);
    const doctor114 = await Doctor.findByPk(114);
    
    if (doctor113 && doctor114) {
      console.log('Successfully created doctors with IDs 113 and 114');
    } else {
      console.error('Failed to create doctors with specific IDs');
    }
    
    // Close the database connection
    await sequelize.close();
    
  } catch (error) {
    console.error('Error seeding dentist data:', error);
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      console.error('Foreign key constraint error - check that related tables (slots, clinics) are properly set up');
    }
    process.exit(1);
  }
}

// Run the seed function
seedDentists();