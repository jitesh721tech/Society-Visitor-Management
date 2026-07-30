function ResidentDashboard({ user }) {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <h2>Resident Portal</h2>
        <p>{user?.full_name || 'Resident'}</p>
        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Today's Visitors</a>
          <a href="#">Approve Visitor</a>
          <a href="#">Reject Visitor</a>
          <a href="#">Visitor History</a>
          <a href="#">Profile</a>
        </nav>
      </aside>

      <main className="content-area">
        <header className="topbar">
          <h1>Resident Dashboard</h1>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/';
          }}>
            Logout
          </button>
        </header>

        <section className="cards-grid">
          <div className="card">
            <h3>Today's Visitors</h3>
            <p>View visits scheduled for today.</p>
          </div>
          <div className="card">
            <h3>Approve Visitor</h3>
            <p>Approve pending visit requests.</p>
          </div>
          <div className="card">
            <h3>Reject Visitor</h3>
            <p>Reject requests that are not valid.</p>
          </div>
          <div className="card">
            <h3>Visitor History</h3>
            <p>Review previous visitor activity.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ResidentDashboard;
