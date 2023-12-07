const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    gender: { type: String, required: true },
    ethnicity: { type: String, required: true },
    parentEducation: { type: String, required: true },
    lunch: { type: String, required: true },
    testScores: {
        math: { type: Number, required: true },
        reading: { type: Number, required: true },
        writing: { type: Number, required: true },
    },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
