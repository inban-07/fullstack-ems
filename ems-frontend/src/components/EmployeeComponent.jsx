import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [designation, setDesignation] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        salary: '',
        designation: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const response = await getEmployee(id);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    setSalary(response.data.salary);
                    setDesignation(response.data.designation);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [id]);

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { firstName: '', lastName: '', email: '', salary: '', designation: '' };

        if (!firstName.trim()) { errorsCopy.firstName = 'First name is required'; valid = false; }
        if (!lastName.trim()) { errorsCopy.lastName = 'Last name is required'; valid = false; }
        if (!email.trim()) { errorsCopy.email = 'Email is required'; valid = false; }
        if (!salary.toString().trim()) { errorsCopy.salary = 'Salary is required'; valid = false; }
        if (!designation.trim()) { errorsCopy.designation = 'Designation is required'; valid = false; }

        setErrors(errorsCopy);
        return valid;
    };

    const saveOrUpdateEmployee = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const employee = { firstName, lastName, email, salary, designation };
        console.log('Submitting:', employee);

        try {
            if (id) {
                await updateEmployee(id, employee);
            } else {
                await createEmployee(employee);
            }
            navigate('/employees', { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    const pageTitle = id ? 'Update Employee' : 'Add Employee';

    return (
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">{pageTitle}</h2>
                    <div className="card-body">
                        <form onSubmit={saveOrUpdateEmployee}>
                            {/* First Name */}
                            <div className="form-group mb-2">
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            {/* Last Name */}
                            <div className="form-group mb-2">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            {/* Email */}
                            <div className="form-group mb-2">
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* Salary */}
                            <div className="form-group mb-2">
                                <label htmlFor="salary">Salary:</label>
                                <input
                                    id="salary"
                                    type="number"
                                    placeholder="Enter Salary"
                                    value={salary}
                                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
                            </div>

                            {/* Designation */}
                            <div className="form-group mb-2">
                                <label htmlFor="designation">Designation:</label>
                                <input
                                    id="designation"
                                    type="text"
                                    placeholder="Enter Designation"
                                    value={designation}
                                    className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDesignation(e.target.value)}
                                />
                                {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
                            </div>

                            <button type="submit" className="btn" style={{ backgroundColor: 'black', color: 'white' }}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
