import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import BarChart from "./components/BarChart";
import ProfileCard from "./components/ProfileCard";
import { DashboardIcon, InboxIcon, CalendarIcon, UsersIcon } from "./components/Icon";
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "./services/employeeService";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [editEmployee, setEditEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [showAddDrawer, setShowAddDrawer] = useState(false);

  const premiumCount = employees.filter((employee) => employee.isPremium).length;
  const departmentCount = new Set(employees.map((employee) => employee.department).filter(Boolean)).size;

  const loadEmployees = async () => {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      setStatus({ type: "error", message: "Unable to load employees. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const insertEmployee = async (employee) => {
    try {
      await addEmployee(employee);
      await loadEmployees();
      setStatus({ type: "success", message: "Employee added successfully." });
    } catch (error) {
      setStatus({ type: "error", message: "Unable to add employee." });
    }
  };

  const saveEmployee = async (employee) => {
    try {
      await updateEmployee(employee.id, employee);
      setEditEmployee(null);
      await loadEmployees();
      setStatus({ type: "success", message: "Employee updated successfully." });
    } catch (error) {
      setStatus({ type: "error", message: "Unable to update employee." });
    }
  };

  const removeEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) {
      return;
    }

    try {
      await deleteEmployee(id);
      await loadEmployees();
      setStatus({ type: "success", message: "Employee deleted successfully." });
    } catch (error) {
      setStatus({ type: "error", message: "Unable to delete employee." });
    }
  };

  const cancelEdit = () => {
    setEditEmployee(null);
    setStatus({ type: "", message: "" });
  };

  // Derived list: search, filter, sort
  const displayedEmployees = employees
    .filter((e) => {
      if (premiumOnly && !e.isPremium) return false;
      if (roleFilter !== "all" && e.role !== roleFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return [e.name, e.email, e.department, e.role].some((v) => (v || "").toLowerCase().includes(q));
    })
    .sort((a, b) => {
      const aVal = (a[sortBy] || "").toString().toLowerCase();
      const bVal = (b[sortBy] || "").toString().toLowerCase();
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const roles = Array.from(new Set(employees.map((e) => e.role).filter(Boolean)));

  // pagination
  const totalPages = Math.max(1, Math.ceil(displayedEmployees.length / pageSize));
  const paginatedEmployees = displayedEmployees.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelect = (id) => {
    setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedEmployees.length) setSelectedIds([]);
    else setSelectedIds(paginatedEmployees.map((e) => e.id));
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected employees?`)) return;
    try {
      await Promise.all(selectedIds.map((id) => deleteEmployee(id)));
      setStatus({ type: 'success', message: 'Deleted selected employees.' });
      setSelectedIds([]);
      loadEmployees();
    } catch (err) {
      setStatus({ type: 'error', message: 'Unable to delete selected.' });
    }
  };

  const exportCSV = (rows) => {
    const cols = ['id','name','role','department','email','mobileNo','hiredDate','isPremium'];
    const csv = [cols.join(',')].concat(rows.map(r => cols.map(c => `"${(r[c]||'').toString().replace(/"/g,'""')}"`).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'employees.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">Glis-</div>
        <nav>
          <div className="nav-item active"><DashboardIcon /> <span>Dashboard</span></div>
          <div className="nav-item"><InboxIcon /> <span>Inbox</span></div>
          <div className="nav-item"><CalendarIcon /> <span>Calendar</span></div>
          <hr />
          <div style={{ marginTop: 8, marginBottom: 8, color: '#94a3b8', fontWeight: 800 }}>RECRUITMENT</div>
          <div className="nav-item"><UsersIcon /> <span>Jobs</span></div>
          <div className="nav-item"><UsersIcon /> <span>Candidates</span></div>
          <div className="nav-item"><UsersIcon /> <span>My referrals</span></div>
        </nav>
      </aside>

      <main className="app-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">Employee Management</p>
            <h1>Professional team directory</h1>
            <p className="intro">Manage records, maintain accurate employee details, and keep operations organized with a structured HR workflow.</p>
          </div>
          <div className="header-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="header-search">
                <input placeholder="Search people, projects..." value={query} onChange={(e)=>setQuery(e.target.value)} />
              </div>
            </div>
            <ProfileCard employee={employees[0]} />
            <button className="secondary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? 'Light' : 'Dark'}</button>
            <button className="add-btn" onClick={() => setShowAddDrawer(true)}>+ Add Candidate</button>
          </div>
        </header>

        <div className="overview-strip">
          <div className="overview-card">
            <span>{employees.length}</span>
            <p>Total employees</p>
          </div>
          <div className="overview-card">
            <span>{premiumCount}</span>
            <p>Premium members</p>
          </div>
          <div className="overview-card">
            <span>{departmentCount}</span>
            <p>Departments</p>
          </div>
        </div>
        <div className="dashboard-grid" style={{ marginTop: 18 }}>
          <div className="panel calendar-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>March</h3>
              <div style={{ color: 'var(--muted)' }}>Week 10</div>
            </div>

            <div className="calendar-days" style={{ marginTop: 12 }}>
              {['Mo','Tu','We','Th','Fr','Sa','Su'].map((d) => (
                <div key={d} className="calendar-day">{d}</div>
              ))}
              <div className="calendar-grid">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div key={i} className={`calendar-cell ${i===3? 'calendar-today':''}`}>{i+1}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel chart-card">
            <h3 style={{ margin: 0 }}>Hires This Year</h3>
            <p className="panel-subtitle">Monthly hires</p>
            <div style={{ marginTop: 12 }}>
              <BarChart data={(() => {
                const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                const counts = months.map(() => 0);
                (employees || []).forEach((e) => {
                  if (!e.hiredDate) return;
                  const d = new Date(e.hiredDate);
                  if (isNaN(d)) return;
                  counts[d.getMonth()] = (counts[d.getMonth()] || 0) + 1;
                });
                return months.map((m, i) => ({ label: m.slice(0,3), value: counts[i] || 0 }));
              })()} />
            </div>
          </div>
        </div>

        {status.message && (
          <div className={`status-message ${status.type}`}>{status.message}</div>
        )}

        <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="control-bar" style={{ alignItems: 'center' }}>
            <div className="search-input">
              <input placeholder="Search by name, email, role..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={premiumOnly} onChange={(e) => setPremiumOnly(e.target.checked)} /> Premium
            </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort: Name</option>
              <option value="role">Sort: Role</option>
              <option value="department">Sort: Department</option>
            </select>
            <button className="secondary" onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}>Dir: {sortDir}</button>
            <div style={{ marginLeft: 'auto' }}>
              <div className="meta-card">
                <span>{employees.length}</span>
                <p>Employees</p>
              </div>
            </div>
          </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: 24 }}>
                  <EmployeeForm
                    addEmployee={insertEmployee}
                    editEmployee={editEmployee}
                    updateEmployee={saveEmployee}
                    onCancel={cancelEdit}
                    visible={showAddDrawer}
                    onClose={() => setShowAddDrawer(false)}
                  />

                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="checkbox" checked={selectedIds.length === paginatedEmployees.length && paginatedEmployees.length>0} onChange={toggleSelectAll} /> Select page
                      </label>
                      <button className="danger" onClick={bulkDelete} disabled={selectedIds.length===0}>Delete selected</button>
                      <button className="secondary" onClick={() => exportCSV(displayedEmployees)}>Export CSV</button>
                    </div>

                    <EmployeeList
                      employees={paginatedEmployees}
                      isLoading={isLoading}
                      onDelete={removeEmployee}
                      onEdit={setEditEmployee}
                      selectedIds={selectedIds}
                      toggleSelect={toggleSelect}
                    />

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 16 }}>
                      <button className="secondary" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page===1}>Prev</button>
                      <div style={{ padding: '8px 12px', background: 'var(--surface)', borderRadius: 8 }}>{page} / {totalPages}</div>
                      <button className="secondary" onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
                      <select value={pageSize} onChange={(e)=>{ setPageSize(Number(e.target.value)); setPage(1); }}>
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="right-panel">
                <div className="panel">
                  <h3 style={{ margin: 0 }}>Today</h3>
                  <p className="panel-subtitle">Quick actions and notes for the day</p>
                  <ul style={{ marginTop: 12, paddingLeft: 18, color: 'var(--muted)' }}>
                    <li>No birthdays today</li>
                    <li>2 interviews scheduled</li>
                    <li>Onboarding: 1 new hire</li>
                  </ul>
                </div>

                <div className="panel" style={{ marginTop: 12 }}>
                  <h3 style={{ margin: 0 }}>Team Leads</h3>
                  <p className="panel-subtitle">Key contacts</p>
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {employees.slice(0, 6).map((emp) => (
                      <div key={emp.id || emp.email} className="team-item">
                        <div className="avatar" style={{ background: '#6d28d9', width: 44, height: 44, fontSize: '0.9rem' }}>{(emp.name||'').split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{emp.name || '—'}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{emp.role || '—'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
        </section>
      </main>
    </div>
  );
}

export default App;
