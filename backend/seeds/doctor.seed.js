const Doctor = require('../models/doctor.model.js');
const { sequelize } = require('../config/db.js');

const dentists = [
  {
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
    name: "Dr. K.A. Mohan",
    specialization: "Dentist",
    post: "Senior Dental Surgeon",
    experience: 56,
    gender: "Male",
    description: "Practicing at Dental De Care. Extensive experience in dental procedures with over five decades of practice.",
    image: "https://imagesx.practo.com/providers/dr-k-a-mohan-orthodontist-bangalore-5021e4f3-7a64-4825-8958-c323fdd45b69.jpg?i_type=t_70x70-2x-webp",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Jnanesha H.C",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 23,
    gender: "Male",
    description: "Practicing at Excel Dental Care. Specialized in comprehensive dental treatments.",
    image: "https://imagesx.practo.com/providers/dr-jnanesha-h-c-orthodontist-bangalore-3b18fc34-d140-4fe1-99b7-fc1dc0c04b9a.jpg?i_type=t_70x70-2x-webp",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Baswaraj Biradar",
    specialization: "Dentist",
    post: "Dental Specialist",
    experience: 28,
    gender: "Male",
    description: "Practicing at Impressions Dental Specialities. Expert in advanced dental procedures.",
    image: "https://imagesx.practo.com/providers/dr-baswaraj-biradar-implantologist-bangalore-80eb5bcb-3960-4f8f-83b3-cb17cc4ea51e.jpg?i_type=t_70x70-2x-webp",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Raju Srinivas",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 29,
    gender: "Male",
    description: "Practicing at Dental Health Care Clinic. Experienced in various dental procedures.",
    image: "https://imagesx.practo.com/providers/dr-raju-srinivas-dentist-bangalore-6204cb41-c91f-4d60-a19f-8fef6cdcb060.jpg?i_type=t_70x70-2x-webp",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Sunil Rao",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 29,
    gender: "Male",
    description: "Practicing at Smile Dental Care. Specialized in comprehensive dental care.",
    image: "https://imagesx.practo.com/providers/dr-sunil-rao-endodontist-bangalore-c6bec4b0-44d9-4992-8a30-0e933ebed75e.jpg?i_type=t_70x70",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Abhilash Ravindranath",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 22,
    gender: "Male",
    description: "Practicing at Smiles N More Invisalign and Dental Implant Centre",
    image: "https://imagesx.practo.com/providers/dr-abhilash-ravindranath-cosmetic-aesthetic-dentist-bangalore-55405f44-0643-4275-bee2-cd14db10f81b.jpg?i_type=t_70x70",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Sumanth Shetty",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 26,
    gender: "Male",
    description: "Practicing at Chisel Dental",
    image: "https://imagesx.practo.com/providers/dr-sumanth-shetty-dentist-bangalore-89d282eb-19a9-464b-b888-87a17e746559.jpg?i_type=t_70x70",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Pramod",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 21,
    gender: "Male",
    description: "Practicing at Dental de Care",
    image: "https://imagesx.practo.com/providers/dr-pramod-orthodontist-bangalore-a07efee4-b1d5-4e84-8c62-c78d0af9ef47.jpg?i_type=t_70x70",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Sharada P Gowda",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 16,
    gender: "Female",
    description: "Practicing at American Dental Practices",
    image: "https://imagesx.practo.com/providers/dr-sharada-p-gowda-prosthodontist-mumbai-fae04db0-17bd-4809-9648-db823c66e2c9.jpg?i_type=t_70x70",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Aditi Garg",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 18,
    gender: "Female",
    description: "Practicing at Elite Esthetics and Dental Clinic",
    image: "https://imagesx.practo.com/providers/dr-aditi-garg-oral-and-maxillofacial-surgeon-bangalore-f928245f-8439-45d9-8fb2-9af49eca6855.jpg?i_type=t_70x70",
    doctor_index:"dentist"
  },
  {
    name: "Dr. Jayanthi.N",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 19,
    gender: "Female",
    description: "Practicing at The Dental Square Multispeciality Dental Clinic",
    image: "https://imagesx.practo.com/providers/dr-jayanthi-n-dentist-bangalore-22533f06-2b93-4efc-b786-34f995c987c0.jpg?i_type=t_70x70",
    doctor_index: "dentist"
  },
  {
    name: "Dr. Bhavin Shah",
    specialization: "Dentist",
    post: "Dental Surgeon",
    experience: 16,
    gender: "Male",
    description: "Practicing at American Dental Practices",
    image: "https://imagesx.practo.com/providers/dr-bhavin-shah-implantologist-mumbai-150f67c9-3b42-4183-80b8-5298a094ea8b.jpg?i_type=t_70x70",
    doctor_index: "dentist"
  }
  ,
  {
    "name": "Dr. Karishma",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 17,
    "gender": "Female",
    "description": "Practicing at Apollo Spectra Hospitals, Koramangala 5 Block,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-karishma-ent-otorhinolaryngologist-bangalore-345b72e1-14b8-473d-93a1-8af24905a361.jpg?i_type=t_70x70-2x-webp",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Veena Yagna",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 17,
    "gender": "Female",
    "description": "Practicing at Cavalier Hospital, Kalyan Nagar,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-veena-yagna-ent-otorhinolaryngologist-bangalore-86598294-beb2-49c5-ac25-05607c2205e9.jpg?i_type=t_70x70-2x-webp",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. P Harihara Murthy",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 34,
    "gender": "Male",
    "description": "Practicing at Apollo Spectra Hospitals, Koramangala 5 Block,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-p-harihara-murthy-ent-otorhinolaryngologist-bangalore-b8e8e2a9-1cd5-4c03-8f16-2c1537ed6fcd.jpg?i_type=t_70x70-2x-webp",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Prashanth R Reddy",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 18,
    "gender": "Male",
    "description": "Practicing at Marvel Multispeciality Hospital, Koramangala 1 Block,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-prashanth-r-reddy-ent-otorhinolaryngologist-bangalore-565c695d-62b4-4597-8729-0f220d5a068e.jpg?i_type=t_70x70-2x-webp",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Srinivas Kunku",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 22,
    "gender": "Male",
    "description": "Practicing at Cavalier Hospital, Kalyan Nagar,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-srinivas-kunku-ent-otorhinolaryngologist-bangalore-2325d143-eca8-4813-b09f-988e24efc6c8.jpg?i_type=t_70x70-2x-webp",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Manaswini Ramachandra",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 17,
    "gender": "Female",
    "description": "Practicing at Apollo Spectra Hospitals, Koramangala 5 Block,Bangalore",
    "image":"http://imagesx.practo.com/providers/dr-manaswini-ramachandra-ent-otorhinolaryngologist-bangalore-24c2fc30-b0ac-4711-8342-22003d4eb3c6.jpg?i_type=t_70x70",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Sanjay Kumar",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 30,
    "gender": "Male",
    "description": "Practicing at Apollo Spectra Hospitals, Koramangala 5 Block,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-sanjay-kumar-ent-otorhinolaryngologist-bangalore-f2c638b6-0e12-40ee-b413-82c1f009bf12.jpg?i_type=t_70x70",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Divya B",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 16,
    "gender": "Female",
    "description": "Practicing at Vydehi Super Speciality Hospital(Mallya Hospital), Ashoknagar,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-divya-b-ent-otorhinolaryngologist-bangalore-0d7aa49a-0f65-4df7-b4b1-8f4b9e2bc6f4.jpg?i_type=t_70x70",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. P.S Pradeep Kumar",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 38,
    "gender": "Male",
    "description": "Practicing at Meenakshi ENT Speciality Hospital (MENTS), Banashankari 2nd Stage,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-p-s-pradeep-kumar-ent-otorhinolaryngologist-bangalore-19a829b3-cc57-4aac-a538-7b0b555d88da.jpg?i_type=t_70x70",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Akshay Shivappa Kudpaje",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 20,
    "gender": "Male",
    "description": "Practicing at Cytecare Hospitals, Yelahanka,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-akshay-shivappa-kudpaje-head-and-neck-surgeon-bangalore-d9ec717c-754a-47c7-85da-8d7e0af03660.jpg?i_type=t_70x70",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Rajendran Dinesh Kumar",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 17,
    "gender": "Male",
    "description": "Practicing at Trustwell Hospitals, Sampangiramagar,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-rajendran-dinesh-kumar-ent-otorhinolaryngologist-bangalore-31ce77aa-51f3-4575-8cad-a06bacd8611a.jpg?i_type=t_70x70",
    "doctor_index": "Cough"
  },
  {
    "name": "Dr. Dhanraj G A",
    "specialization": "ENT",
    "post": "Ear-Nose-Throat (ENT) Specialist",
    "experience": 19,
    "gender": "Male",
    "description": "Practicing at Trustwell Hospitals, Sampangiramagar,Bangalore",
    "image":"https://imagesx.practo.com/providers/dr-dhanraj-g-a-ent-otorhinolaryngologist-bangalore-1ba5bd3f-5e3d-45b8-be3d-e5df4f929d8f.jpg?i_type=t_70x70",
    "doctor_index": "Cough"
  }
];

async function seedDentists() {
  try {
    // Sync the database
    await sequelize.sync({ alter: true });

    // Insert all dentists
    const createdDentists = await Doctor.bulkCreate(dentists);
    
    console.log('Successfully seeded dentist data!');
    console.log(`Created ${createdDentists.length} dentist records`);
    
    // Close the database connection
    await sequelize.close();
    
  } catch (error) {
    console.error('Error seeding dentist data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDentists(); 