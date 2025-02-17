require("dotenv").config();
const { sequelize } = require("./config/db.js");
const Story = require("./models/story.model.js");

const storySeedData = [
  {
    user_name: "John",
    title: "Excellent Treatment",
    content: "Dr. was very patient and explained everything in detail. Highly recommend!",
    doctor_id: 113,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_name: "sagar",
    title: "Best Doctor Ever!",
    content: "I had a great experience with Dr. He really listens to his patients.",
    doctor_id: 114,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_name: "raunak",
    title: "Quick and Efficient",
    content: "Dr. diagnosed my issue quickly and provided the right medication.",
    doctor_id: 113,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_name: "rishabh",
    title: "Friendly and Professional",
    content: "Dr. was very professional and made me feel comfortable.",
    doctor_id: 114,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_name: "aryan",
    title: "Solved My Long-Term Issue",
    content: "Dr. helped me with my chronic pain. I feel much better now.",
    doctor_id: 116,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_name: "sumit",
    title: "Highly Skilled",
    content: "Dr. diagnosis was spot on. I appreciate his expertise.",
    doctor_id: 115,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_name: "sharma",
    title: "Compassionate and Caring",
    content: "Dr. was very kind and took time to answer all my questions.",
    doctor_id: 118,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_name: "krish",
    title: "Great Experience",
    content: "Dr. made the whole process smooth and stress-free.",
    doctor_id: 117,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedStories() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Insert stories into the database
    await Story.bulkCreate(storySeedData);
    console.log("Story data inserted successfully!");

  } catch (error) {
    console.error("Error seeding stories:", error);
  } finally {
    await sequelize.close();
  }
}

// Run the seeding function
seedStories();
