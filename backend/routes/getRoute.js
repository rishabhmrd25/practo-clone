const express=require("express");
const {fetchDoctors,fetchDoctorsByGender,fetchDoctorsByExperience,fetchDoctorById}=require("../controllers/fetch.controller.js")

const router=express.Router();

router.get("/doctors/:post",fetchDoctors);
router.get("/doctors/:post/:gender",fetchDoctorsByGender);
router.get("/doctors/:post/experience/:exp", fetchDoctorsByExperience);
router.get("/doctor/:id", fetchDoctorById);

module.exports=router;