import AdminRoute from './AdminRoute';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  return (
    <AdminRoute>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </AdminRoute>
  );
}
