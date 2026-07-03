import { useEffect, useMemo, useState } from "react";
import "./App.css";

const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Business",
];

const initialStudents = [
  {
    id: crypto.randomUUID(),
    name: "Aarav Kumar",
    roll: "CS101",
    dept: "Computer Science",
    year: "3rd Year",
    status: "Active",
    attendance: "Present",
  },
  {
    id: crypto.randomUUID(),
    name: "Diya Sharma",
    roll: "IT214",
    dept: "Information Technology",
    year: "2nd Year",
    status: "Active",
    attendance: "Present",
  },
  {
    id: crypto.randomUUID(),
    name: "Rohan Mehta",
    roll: "ME087",
    dept: "Mechanical",
    year: "4th Year",
    status: "Review",
    attendance: "Absent",
  },
];

const emptyForm = {
  name: "",
  roll: "",
  dept: departments[0],
  year: "1st Year",
  status: "Active",
  attendance: "Absent",
};

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("feast-students");
    const loadedStudents = savedStudents ? JSON.parse(savedStudents) : initialStudents;
    return loadedStudents.map((student) => ({
      attendance: "Absent",
      ...student,
    }));
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("feast-theme") || "light";
  });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("feast-students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("feast-theme", theme);
  }, [theme]);

  const stats = useMemo(() => {
    const active = students.filter((student) => student.status === "Active").length;
    const present = students.filter(
      (student) => student.attendance === "Present",
    ).length;
    const absent = students.filter((student) => student.attendance === "Absent").length;
    const departmentsCount = new Set(students.map((student) => student.dept)).size;
    const review = students.filter((student) => student.status === "Review").length;

    return [
      { label: "Total Students", value: students.length },
      { label: "Present Today", value: present },
      { label: "Absent Today", value: absent },
      { label: "Active", value: active },
      { label: "Departments", value: departmentsCount },
      { label: "Review Queue", value: review },
    ];
  }, [students]);

  const filteredStudents = useMemo(() => {
    const search = query.trim().toLowerCase();

    return students
      .filter((student) => {
        const matchesSearch =
          student.name.toLowerCase().includes(search) ||
          student.roll.toLowerCase().includes(search) ||
          student.dept.toLowerCase().includes(search);
        const matchesDepartment =
          departmentFilter === "All" || student.dept === departmentFilter;

        return matchesSearch && matchesDepartment;
      })
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [departmentFilter, query, sortBy, students]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      roll: form.roll.trim().toUpperCase(),
    };

    if (!cleanedForm.name || !cleanedForm.roll) {
      setError("Student name and roll number are required.");
      return;
    }

    const rollExists = students.some(
      (student) =>
        student.roll.toLowerCase() === cleanedForm.roll.toLowerCase() &&
        student.id !== editingId,
    );

    if (rollExists) {
      setError("This roll number is already registered.");
      return;
    }

    if (editingId) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingId ? { ...student, ...cleanedForm } : student,
        ),
      );
    } else {
      setStudents((current) => [
        { id: crypto.randomUUID(), ...cleanedForm },
        ...current,
      ]);
    }

    resetForm();
  };

  const editStudent = (student) => {
    setForm({
      name: student.name,
      roll: student.roll,
      dept: student.dept,
      year: student.year,
      status: student.status,
    });
    setEditingId(student.id);
    setError("");
  };

  const deleteStudent = (id) => {
    setStudents((current) => current.filter((student) => student.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const markAttendance = (id, attendance) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, attendance } : student,
      ),
    );
  };

  return (
    <main className="app-shell" data-theme={theme}>
      <nav className="topbar" aria-label="Feast dashboard">
        <div className="brand-mark">
          <span>F</span>
          <div>
            <strong>Feast</strong>
            <small>Student Operations</small>
          </div>
        </div>
        <button
          className="theme-toggle"
          type="button"
          aria-pressed={theme === "dark"}
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        >
          <span className="toggle-track">
            <span className="toggle-dot" />
          </span>
          {theme === "dark" ? "Dark" : "Light"}
        </button>
      </nav>

      <section className="command-grid">
        <div className="spotlight">
          <span className="eyebrow">Feast Student Desk</span>
          <h1>Manage students from a live campus command board.</h1>
          <p>
            Add records, keep roll numbers clean, switch status quickly, and
            search the directory without leaving the dashboard.
          </p>
        </div>

        <form className="student-form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">Record Editor</span>
              <h2>{editingId ? "Update student" : "Add student"}</h2>
            </div>
            {editingId && (
              <button className="ghost-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          <div className="form-grid">
            <label>
              Student Name
              <input
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </label>

            <label>
              Roll Number
              <input
                type="text"
                placeholder="Example: CS101"
                value={form.roll}
                onChange={(event) => updateField("roll", event.target.value)}
              />
            </label>

            <label>
              Department
              <select
                value={form.dept}
                onChange={(event) => updateField("dept", event.target.value)}
              >
                {departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </label>

            <label>
              Year
              <select
                value={form.year}
                onChange={(event) => updateField("year", event.target.value)}
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
              >
                <option>Active</option>
                <option>Review</option>
                <option>Alumni</option>
              </select>
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button" type="submit">
            {editingId ? "Save Changes" : "Add Student"}
          </button>
        </form>
      </section>

      <section className="metrics-strip" aria-label="Student record summary">
        {stats.map((item) => (
          <div className="stat" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="records">
        <div className="records-header">
          <div>
            <span className="eyebrow">Directory</span>
            <h2>Student Records</h2>
          </div>
          <span className="result-count">{filteredStudents.length} shown</span>
        </div>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Search name, roll, or department"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            value={departmentFilter}
            onChange={(event) => setDepartmentFilter(event.target.value)}
          >
            <option>All</option>
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="name">Sort by name</option>
            <option value="roll">Sort by roll</option>
            <option value="dept">Sort by department</option>
            <option value="year">Sort by year</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <strong>{student.name}</strong>
                  </td>
                  <td>{student.roll}</td>
                  <td>{student.dept}</td>
                  <td>{student.year}</td>
                  <td>
                    <span className={`status ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="attendance-actions" aria-label="Attendance">
                      <button
                        className={student.attendance === "Present" ? "selected" : ""}
                        type="button"
                        onClick={() => markAttendance(student.id, "Present")}
                      >
                        Present
                      </button>
                      <button
                        className={student.attendance === "Absent" ? "selected absent" : "absent"}
                        type="button"
                        onClick={() => markAttendance(student.id, "Absent")}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <button type="button" onClick={() => editStudent(student)}>
                        Edit
                      </button>
                      <button
                        className="danger"
                        type="button"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="empty-state">
              No matching students found. Try a different search or filter.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
