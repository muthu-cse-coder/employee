import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaMoneyBillWave,
  FaDownload,
  FaCalendar,
  FaFileInvoice,
  FaChartLine,
  FaCheckCircle
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SalarySlip.css';

function SalarySlip() {
  const [selectedMonth, setSelectedMonth] = useState('2024-02');

  // Mock salary data
  const currentSalary = {
    month: 'February 2024',
    basicSalary: 50000,
    hra: 15000,
    conveyance: 2000,
    medicalAllowance: 3000,
    specialAllowance: 15000,
    grossSalary: 85000,
    providentFund: 6000,
    professionalTax: 200,
    incomeTax: 8800,
    totalDeductions: 15000,
    netSalary: 70000,
    paymentDate: '2024-02-28',
    paymentStatus: 'Paid'
  };

  const earnings = [
    { label: 'Basic Salary', amount: currentSalary.basicSalary },
    { label: 'HRA', amount: currentSalary.hra },
    { label: 'Conveyance', amount: currentSalary.conveyance },
    { label: 'Medical Allowance', amount: currentSalary.medicalAllowance },
    { label: 'Special Allowance', amount: currentSalary.specialAllowance }
  ];

  const deductions = [
    { label: 'Provident Fund', amount: currentSalary.providentFund },
    { label: 'Professional Tax', amount: currentSalary.professionalTax },
    { label: 'Income Tax', amount: currentSalary.incomeTax }
  ];

  const salaryHistory = [
    { month: 'Feb', amount: 70000 },
    { month: 'Jan', amount: 70000 },
    { month: 'Dec', amount: 72000 },
    { month: 'Nov', amount: 70000 },
    { month: 'Oct', amount: 70000 },
    { month: 'Sep', amount: 70000 }
  ];

  const paymentHistory = [
    { month: 'February 2024', gross: 85000, net: 70000, date: '2024-02-28', status: 'Paid' },
    { month: 'January 2024', gross: 85000, net: 70000, date: '2024-01-31', status: 'Paid' },
    { month: 'December 2023', gross: 87000, net: 72000, date: '2023-12-31', status: 'Paid' },
    { month: 'November 2023', gross: 85000, net: 70000, date: '2023-11-30', status: 'Paid' },
    { month: 'October 2023', gross: 85000, net: 70000, date: '2023-10-31', status: 'Paid' }
  ];

  const handleDownloadPDF = () => {
    // Simulate PDF download
    alert('Salary slip PDF downloaded! (Feature to be implemented)');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      <div className="salary-slip-page">
        <div className="page-header">
          <div>
            <h1>Salary Slip</h1>
            <p>View and download your monthly salary details</p>
          </div>
          <button className="btn btn-primary" onClick={handleDownloadPDF}>
            <FaDownload /> Download PDF
          </button>
        </div>

        {/* Summary Cards */}
        <div className="salary-summary-grid">
          <Card className="summary-card gross">
            <div className="summary-icon">
              <FaMoneyBillWave />
            </div>
            <div className="summary-details">
              <p className="summary-label">Gross Salary</p>
              <h2 className="summary-amount">{formatCurrency(currentSalary.grossSalary)}</h2>
              <span className="summary-period">{currentSalary.month}</span>
            </div>
          </Card>

          <Card className="summary-card deductions">
            <div className="summary-icon">
              <FaFileInvoice />
            </div>
            <div className="summary-details">
              <p className="summary-label">Total Deductions</p>
              <h2 className="summary-amount">{formatCurrency(currentSalary.totalDeductions)}</h2>
              <span className="summary-period">This Month</span>
            </div>
          </Card>

          <Card className="summary-card net" variant="gradient">
            <div className="summary-icon">
              <FaCheckCircle />
            </div>
            <div className="summary-details">
              <p className="summary-label">Net Salary</p>
              <h2 className="summary-amount">{formatCurrency(currentSalary.netSalary)}</h2>
              <span className="summary-period">Take Home</span>
            </div>
          </Card>
        </div>

        <div className="salary-content-grid">
          {/* Salary Breakdown */}
          <Card title="Salary Breakdown" subtitle={currentSalary.month} icon={<FaFileInvoice />}>
            <div className="breakdown-section">
              <h3 className="breakdown-title earnings-title">
                <span>Earnings</span>
                <span className="breakdown-total">{formatCurrency(currentSalary.grossSalary)}</span>
              </h3>
              <div className="breakdown-list">
                {earnings.map((item, index) => (
                  <div key={index} className="breakdown-item">
                    <span className="breakdown-label">{item.label}</span>
                    <span className="breakdown-amount">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="breakdown-divider"></div>

            <div className="breakdown-section">
              <h3 className="breakdown-title deductions-title">
                <span>Deductions</span>
                <span className="breakdown-total">{formatCurrency(currentSalary.totalDeductions)}</span>
              </h3>
              <div className="breakdown-list">
                {deductions.map((item, index) => (
                  <div key={index} className="breakdown-item">
                    <span className="breakdown-label">{item.label}</span>
                    <span className="breakdown-amount deduction">-{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="breakdown-divider"></div>

            <div className="breakdown-total-section">
              <h3 className="breakdown-title net-title">
                <span>Net Salary</span>
                <span className="breakdown-total-amount">{formatCurrency(currentSalary.netSalary)}</span>
              </h3>
              <div className="payment-info">
                <div className="payment-badge">
                  <FaCheckCircle /> {currentSalary.paymentStatus}
                </div>
                <span className="payment-date">
                  <FaCalendar /> Paid on {new Date(currentSalary.paymentDate).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </Card>

          {/* Salary Trend Chart */}
          <Card title="Salary Trend" subtitle="Last 6 months" icon={<FaChartLine />}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-tertiary)" />
                <YAxis stroke="var(--text-tertiary)" />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Bar dataKey="amount" fill="#D4AF37" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Payment History */}
        <Card title="Payment History" subtitle="All salary payments" icon={<FaMoneyBillWave />}>
          <div className="payment-history-table-wrapper">
            <table className="payment-history-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Gross Salary</th>
                  <th>Net Salary</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{payment.month}</strong>
                    </td>
                    <td>{formatCurrency(payment.gross)}</td>
                    <td>
                      <strong className="net-amount">{formatCurrency(payment.net)}</strong>
                    </td>
                    <td>{new Date(payment.date).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className="status-badge paid">
                        <FaCheckCircle /> {payment.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-download-small" onClick={handleDownloadPDF}>
                        <FaDownload />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default SalarySlip;