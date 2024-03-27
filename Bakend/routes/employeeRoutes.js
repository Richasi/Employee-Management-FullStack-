const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Employee = require('../models/Employee');

// @route   POST /api/employees
// @desc    Add new employee
// @access  Private
router.post('/', authenticate, async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;

  try {
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary
    });

    const employee = await newEmployee.save();

    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/employees
// @desc    Get all employees
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/employees/:id
// @desc    Get employee by ID
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/employees/:id
// @desc    Update employee by ID
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;

  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.department = department;
    employee.salary = salary;

    employee = await employee.save();

    res.json(employee);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/employees/:id
// @desc    Delete employee by ID
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    await employee.remove();

    res.json({ msg: 'Employee removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
