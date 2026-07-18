function EmployeeList({ employees, isLoading, onDelete, onEdit, selectedIds = [], toggleSelect }) {
  const initials = (name) =>
    (name || "").split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();

  const colorFor = (name) => {
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#f97316"];
    const sum = (name || "").split("").reduce((s, c) => s + c.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  return (
    <section className="panel list-panel">
      <div className="panel-header">
        <div>
          <h2>Employee Directory</h2>
          <p className="panel-subtitle">View and manage detailed team records in a structured, professional layout.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="secondary">Filter</button>
        </div>
      </div>

      {isLoading && (
        <div className="empty-state">Loading employees...</div>
      )}

      {!isLoading && employees.length === 0 && (
        <div className="empty-state">No employees found.</div>
      )}

      <div className="card-grid" style={{ marginTop: 12 }}>
        {employees.map((employee) => (
          <article key={employee.id} className="employee-card">
            <div className="top-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input type="checkbox" checked={selectedIds.includes(employee.id)} onChange={() => toggleSelect && toggleSelect(employee.id)} />
                      <div className="avatar" style={{ background: colorFor(employee.name), width: 54, height: 54, fontSize: '0.9rem' }}>{initials(employee.name)}</div>
                      <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <strong>{employee.name}</strong>
                    {employee.isPremium && <span className="premium-badge">Premium</span>}
                  </div>
                  <div className="info">{employee.role || '—'}</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button className="secondary" onClick={() => onEdit && onEdit(employee)}>Edit</button>
                <button className="danger" onClick={() => onDelete && onDelete(employee.id)} style={{ marginLeft: 8 }}>Delete</button>
              </div>
            </div>

            <div className="employee-contact">
              <div>{employee.department || 'Department'}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8V7a2 2 0 0 0-2-2h-1" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div style={{ color: '#334155' }}>{employee.email || 'no-email@example.com'}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 3 2h4.09a2 2 0 0 1 2 1.72c.12 1.21.36 2.39.7 3.53a2 2 0 0 1-.45 2.11L8.91 11.09a16 16 0 0 0 6 6l1.73-1.73a2 2 0 0 1 2.11-.45c1.14.34 2.32.58 3.53.7a2 2 0 0 1 1.72 2z" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div style={{ color: '#334155' }}>{employee.mobileNo || '—'}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default EmployeeList;