const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    // Validate input
    if (!studentId || !date || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if attendance record already exists for this date
    let attendance = await Attendance.findOne({ student: studentId, date });

    if (attendance) {
      // Update existing record
      attendance.status = status;
    } else {
      // Create new attendance record
      attendance = new Attendance({
        student: studentId,
        date,
        status,
      });
    }

    await attendance.save();

    res.status(200).json({ message: 'Attendance marked successfully', attendance });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Error marking attendance' });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const { studentId, startDate, endDate } = req.query;

    // Validate input
    if (!studentId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const attendanceRecords = await Attendance.find({
      student: studentId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ date: 1 });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    res.status(500).json({ message: 'Error fetching student attendance' });
  }
};

exports.getClassAttendance = async (req, res) => {
  try {
    const { instructorId, date } = req.query;

    // Validate input
    if (!instructorId || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get all students for this instructor
    const students = await Student.find({ instructor: instructorId });

    // Get attendance for all these students on the specified date
    const attendanceRecords = await Attendance.find({
      student: { $in: students.map(s => s._id) },
      date: new Date(date),
    }).populate('student', 'firstName lastName');

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching class attendance:', error);
    res.status(500).json({ message: 'Error fetching class attendance' });
  }
};