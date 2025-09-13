import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const getAllEmployees = async () => {
        try {
            const response = await listEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllEmployees();
    }, []);

    const addNewEmployee = () => navigate('/add-employee');
    const editEmployee = (id) => navigate(`/edit-employee/${id}`);
    const removeEmployee = async (id) => {
        try {
            await deleteEmployee(id);
            getAllEmployees(); // refresh table after deletion
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn mb-2" style={{ backgroundColor: 'black', color: 'white' }} onClick={addNewEmployee}>
                Add Employee
            </button>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.email}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: 'darkorange', color: 'white' }}
                                    onClick={() => editEmployee(emp.id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }}
                                    onClick={() => removeEmployee(emp.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
