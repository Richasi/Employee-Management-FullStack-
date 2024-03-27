const Employee = require('../models/Employee');

// @route   POST /api/employees
// @desc    Add new employee
// @access  Private
exports.addEmployee = async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;

  try {
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Other CRUD operations for employees can be implemented similarly
