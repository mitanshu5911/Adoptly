const mongoose = require('mongoose');

const postPetschema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
 },
 petname: {
    type:String,
    
 },
 ownername: {
    type:String,
    require:true
 },
 species: {
    type:String,
    require:true
 },
 age: {
    type:String,
    require:true,

 },
 breed: {
    type:String,
 },
 image: {
    type:String,
    require:true,
 },
 description:{
    type:String,
 },
 contactNumber: {
    type:String,
    require:true,
 },
 colour :{
    type:String,
    require:true,
 },
 medicalIssue :{
    type:String,
    require:true,
 },
 address :{
    type:String,
    require:true,
 }
 },{timestamps:true});
module.exports = mongoose.model('PostPet', postPetschema);
