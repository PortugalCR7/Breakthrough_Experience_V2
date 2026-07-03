import { useState } from 'react';
import AdminRoute from './AdminRoute';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import SectionEditor from './SectionEditor';

export default function AdminApp() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <AdminRoute>
      <AdminLayout>
        {activeSection === null ? (
          <AdminDashboard onSelect={setActiveSection} />
        ) : (
          <SectionEditor
            sectionKey={activeSection}
            onBack={() => setActiveSection(null)}
          />
        )}
      </AdminLayout>
    </AdminRoute>
  );
}
