// FIXED VERSION - autoTable import issue resolved
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Import like this

export const generateSalarySlipPDF = (employeeData, salaryData, earnings, deductions) => {
  console.log('🚀 Starting PDF generation...');
  
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    let y = 20;
    
    // ============= HEADER =============
    doc.setFillColor(212, 175, 55);
    doc.circle(25, y + 3, 6, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('R', 23, y + 6);
    
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(20);
    doc.text('RISERONE', 35, y + 5);
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Employee Management System', pageWidth - 15, y, { align: 'right' });
    doc.text('Mumbai, Maharashtra, India', pageWidth - 15, y + 5, { align: 'right' });
    
    y += 25;
    
    // ============= TITLE =============
    doc.setFillColor(212, 175, 55);
    doc.rect(15, y, pageWidth - 30, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('SALARY SLIP', pageWidth / 2, y + 7, { align: 'center' });
    
    y += 18;
    
    // ============= EMPLOYEE INFO =============
    doc.setTextColor(33, 37, 41);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Employee Information', 15, y);
    y += 7;
    
    doc.setFontSize(9);
    
    // Left column
    doc.setFont('helvetica', 'bold');
    doc.text('Employee ID:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(employeeData.employeeId || 'N/A', 50, y);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', 15, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(employeeData.name || 'N/A', 50, y + 6);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Designation:', 15, y + 12);
    doc.setFont('helvetica', 'normal');
    doc.text(employeeData.designation || 'N/A', 50, y + 12);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Department:', 15, y + 18);
    doc.setFont('helvetica', 'normal');
    doc.text(employeeData.department || 'N/A', 50, y + 18);
    
    // Right column
    doc.setFont('helvetica', 'bold');
    doc.text('Month/Year:', 110, y);
    doc.setFont('helvetica', 'normal');
    doc.text(salaryData.monthYear || 'N/A', 145, y);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Date:', 110, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(salaryData.paymentDate || 'N/A', 145, y + 6);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Working Days:', 110, y + 12);
    doc.setFont('helvetica', 'normal');
    doc.text(String(salaryData.workingDays || 0), 145, y + 12);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Paid Days:', 110, y + 18);
    doc.setFont('helvetica', 'normal');
    doc.text(String(salaryData.paidDays || 0), 145, y + 18);
    
    y += 30;
    
    // ============= EARNINGS TABLE =============
    console.log('📝 Creating earnings table...');
    
    const earningsRows = earnings.map(e => [
      e.label,
      `₹ ${(e.amount || 0).toLocaleString('en-IN')}`
    ]);
    
    earningsRows.push([
      { content: 'GROSS EARNINGS', styles: { fontStyle: 'bold' } },
      { content: `₹ ${(salaryData.grossSalary || 0).toLocaleString('en-IN')}`, styles: { fontStyle: 'bold' } }
    ]);
    
    // ✅ Use autoTable function directly (imported at top)
    autoTable(doc, {
      startY: y,
      head: [['EARNINGS', 'AMOUNT']],
      body: earningsRows,
      headStyles: {
        fillColor: [212, 175, 55],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 40, halign: 'right' }
      },
      margin: { left: 15 },
      theme: 'striped',
      styles: { fontSize: 9 }
    });
    
    const earningsEnd = doc.lastAutoTable.finalY;
    
    // ============= DEDUCTIONS TABLE =============
    console.log('📝 Creating deductions table...');
    
    const deductionsRows = deductions.map(d => [
      d.label,
      `₹ ${(d.amount || 0).toLocaleString('en-IN')}`
    ]);
    
    deductionsRows.push([
      { content: 'TOTAL DEDUCTIONS', styles: { fontStyle: 'bold' } },
      { content: `₹ ${(salaryData.totalDeductions || 0).toLocaleString('en-IN')}`, styles: { fontStyle: 'bold' } }
    ]);
    
    // ✅ Use autoTable function directly
    autoTable(doc, {
      startY: y,
      head: [['DEDUCTIONS', 'AMOUNT']],
      body: deductionsRows,
      headStyles: {
        fillColor: [239, 68, 68],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 35, halign: 'right' }
      },
      margin: { left: pageWidth / 2 },
      theme: 'striped',
      styles: { fontSize: 9 }
    });
    
    y = Math.max(earningsEnd, doc.lastAutoTable.finalY) + 10;
    
    // ============= NET SALARY BOX =============
    doc.setFillColor(16, 185, 129);
    doc.rect(15, y, pageWidth - 30, 18, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('NET SALARY (Take Home)', 20, y + 7);
    
    doc.setFontSize(16);
    doc.text(
      `₹ ${(salaryData.netSalary || 0).toLocaleString('en-IN')}`,
      pageWidth - 20,
      y + 7,
      { align: 'right' }
    );
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `In Words: ${convertToWords(salaryData.netSalary || 0)} Rupees Only`,
      20,
      y + 14
    );
    
    y += 26;
    
    // ============= BANK DETAILS =============
    doc.setTextColor(33, 37, 41);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Bank Account Details', 15, y);
    y += 7;
    
    doc.setFontSize(9);
    doc.text('Bank Name:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(employeeData.bankName || 'N/A', 50, y);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Account No:', 15, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(employeeData.accountNumber || 'N/A', 50, y + 6);
    
    doc.setFont('helvetica', 'bold');
    doc.text('PF Number:', 15, y + 12);
    doc.setFont('helvetica', 'normal');
    doc.text(employeeData.pfNumber || 'N/A', 50, y + 12);
    
    // ============= FOOTER - SIGNATURES =============
    const footerY = pageHeight - 35;
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    
    // Employee signature
    doc.line(20, footerY, 70, footerY);
    doc.text('Employee Signature', 20, footerY + 5);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 20, footerY + 10);
    
    // Company signature
    doc.line(pageWidth - 70, footerY, pageWidth - 20, footerY);
    doc.text('Authorized Signatory', pageWidth - 70, footerY + 5);
    doc.text('For RiserOne', pageWidth - 70, footerY + 10);
    
    // Disclaimer
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'italic');
    doc.text(
      'This is a computer-generated document and does not require a signature.',
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    
    // ============= BORDER =============
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    
    // ============= SAVE PDF =============
    const filename = `Salary_${(employeeData.name || 'Employee').replace(/\s+/g, '_')}_${(salaryData.monthYear || 'Month').replace('/', '-')}.pdf`;
    
    console.log('💾 Saving PDF:', filename);
    doc.save(filename);
    
    console.log('✅ PDF Generated Successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    throw error;
  }
};

// Convert number to words (Indian system)
function convertToWords(num) {
  if (!num || num === 0) return 'Zero';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
  num = Math.floor(num);
  let words = '';
  
  if (num >= 10000000) {
    words += convertToWords(Math.floor(num / 10000000)) + ' Crore ';
    num %= 10000000;
  }
  
  if (num >= 100000) {
    words += convertToWords(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }
  
  if (num >= 1000) {
    words += convertToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }
  
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  } else if (num >= 10) {
    return words + teens[num - 10];
  }
  
  if (num > 0) {
    words += ones[num];
  }
  
  return words.trim();
}