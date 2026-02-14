import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <p>This is a placeholder for the admin dashboard. Full implementation coming in Phase 2.</p>
    </div>
  );
}

export default AdminDashboard;