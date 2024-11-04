'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { format } from 'date-fns';
import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
interface SOSReport {
  _id: string;
  description: string;
  location: string;
  phoneNumber: string;
  imageUrl?: string;
  status: 'Pending' | 'In-progress' | 'Saved';
  createdAt: string;
  updatedAt: string;
}

export default function SOSDashboard() {
  const [reports, setReports] = useState<SOSReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/sos/reports`);
      const reportsData = response.data.reports || response.data;
      setReports(reportsData);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    newStatus: SOSReport['status']
  ) => {
    try {
      await axios.patch(`${apiUrl}/api/v1/sos/reports/${id}/status`, {
        status: newStatus
      });
      fetchReports(); // Refresh
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'SOS Reports', link: '/dashboard/sos' }
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/sos/reports/${id}`);
      fetchReports(); // Refresh
    } catch (error) {
      console.error('Failed to delete report:', error);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`SOS Reports (${reports.length})`}
            description="Manage SOS reports (Server side table functionalities.)"
          />
        </div>

        <div className="grid gap-6">
          {reports.map((report) => (
            <div key={report._id} className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 flex items-start justify-between gap-2">
                <div>
                  <p className="text-lg font-semibold">{report.location}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(report.createdAt), 'PPpp')}
                  </p>
                </div>
                <select
                  value={report.status}
                  onChange={(e) =>
                    handleStatusUpdate(
                      report._id,
                      e.target.value as SOSReport['status']
                    )
                  }
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    report.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : report.status === 'In-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In-progress">In Progress</option>
                  <option value="Saved">Saved</option>
                </select>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(report._id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>

              <p className="mb-4">{report.description}</p>

              {report.imageUrl && (
                <div className="mb-4">
                  <img
                    src={report.imageUrl}
                    alt="SOS Report"
                    className="h-48 w-48 rounded-lg object-cover"
                  />
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600">
                <span>Contact: {report.phoneNumber}</span>
              </div>
            </div>
          ))}
        </div>
        <Separator />
      </div>
    </PageContainer>
  );
}
