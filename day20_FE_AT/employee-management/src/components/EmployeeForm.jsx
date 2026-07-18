import { useEffect, useState } from "react";

const emptyEmployee = {
  name: "",
  department: "",
  email: "",
  role: "",
  mobileNo: "",
  hiredDate: "",
  isPremium: false,
};

function EmployeeForm({ addEmployee, editEmployee, updateEmployee, onCancel, visible, onClose }) {
  const [employee, setEmployee] = useState(emptyEmployee);

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
    } else {
      setEmployee(emptyEmployee);
    }
  }, [editEmployee]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEmployee({
      ...employee,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setEmployee(emptyEmployee);
    if (onClose) onClose();
  };
  return (
    <>
      {visible ? (
        <div className="drawer-backdrop">
          <section className="panel form-panel drawer-panel">
            <div className="panel-header">
              <div>
                <h2>{editEmployee ? "Update Employee" : "Add Employee"}</h2>
                <p className="panel-subtitle">{editEmployee ? "Adjust employee details with a clear and professional record update." : "Create a polished employee profile for the team directory."}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="employee-form">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Department
                <input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Mobile
                <input
                  type="tel"
                  name="mobileNo"
                  placeholder="e.g. (555) 555-0100"
                  value={employee.mobileNo}
                  onChange={handleChange}
                />
              </label>

              <label>
                Hired date
                <input
                  type="date"
                  name="hiredDate"
                  value={employee.hiredDate}
                  onChange={handleChange}
                />
              </label>

              <label>
                Role
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Product Designer"
                  value={employee.role}
                  onChange={handleChange}
                />
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  name="isPremium"
                  checked={employee.isPremium}
                  onChange={handleChange}
                />
                <span>Premium employee</span>
              </label>

              <div className="form-actions">
                <button type="submit">{editEmployee ? "Update" : "Add"}</button>
                {editEmployee && (
                  <button type="button" className="secondary" onClick={onCancel}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div style={{ marginTop: 12 }}>
              <button type="button" className="secondary" onClick={() => { if (onClose) onClose(); }}>{editEmployee ? 'Close' : 'Cancel'}</button>
            </div>
          </section>
        </div>
      ) : (
        <section className="panel form-panel">
          <div className="panel-header">
            <div>
              <h2>{editEmployee ? "Update Employee" : "Add Employee"}</h2>
              <p className="panel-subtitle">{editEmployee ? "Adjust employee details with a clear and professional record update." : "Create a polished employee profile for the team directory."}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="employee-form">
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={employee.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Department
              <input
                type="text"
                name="department"
                placeholder="Enter department"
                value={employee.department}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Mobile
              <input
                type="tel"
                name="mobileNo"
                placeholder="e.g. (555) 555-0100"
                value={employee.mobileNo}
                onChange={handleChange}
              />
            </label>

            <label>
              Hired date
              <input
                type="date"
                name="hiredDate"
                value={employee.hiredDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Role
              <input
                type="text"
                name="role"
                placeholder="e.g. Product Designer"
                value={employee.role}
                onChange={handleChange}
              />
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                name="isPremium"
                checked={employee.isPremium}
                onChange={handleChange}
              />
              <span>Premium employee</span>
            </label>

            <div className="form-actions">
              <button type="submit">{editEmployee ? "Update" : "Add"}</button>
              {editEmployee && (
                <button type="button" className="secondary" onClick={onCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default EmployeeForm;