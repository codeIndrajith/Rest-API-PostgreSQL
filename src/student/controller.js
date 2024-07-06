const pool = require('../../db');
const queries = require('./queries');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const addStudent = async (req, res) => {
  const { name, email, age, dob } = req.body;

  try {
    // create a new student
    const student = await prisma.students.create({
      data: {
        name,
        email,
        age,
        dob: new Date(dob),
      },
    });

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Student not created', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send('Student does not exist in the database.');
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send('Student removed successfully');
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send('Student does not exist in the database.');
    }

    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send('Student updated successfully');
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
