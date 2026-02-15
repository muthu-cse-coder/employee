// Simple test file to check if jsPDF works
import jsPDF from 'jspdf';

export const testBasicPDF = () => {
  console.log('Starting basic PDF test...');
  
  try {
    const doc = new jsPDF();
    doc.text('Hello from RiserOne!', 10, 10);
    doc.save('test.pdf');
    console.log('✓ Basic PDF works!');
    alert('Success! Basic PDF downloaded. jsPDF is working.');
    return true;
  } catch (error) {
    console.error('✗ Basic PDF failed:', error);
    alert(`Failed: ${error.message}`);
    return false;
  }
};

// Test with autoTable
export const testTablePDF = () => {
  console.log('Starting table PDF test...');
  
  try {
    // Check if jspdf-autotable is loaded
    const jsPDF = require('jspdf').default || require('jspdf');
    require('jspdf-autotable');
    
    const doc = new jsPDF();
    
    doc.text('Table Test', 10, 10);
    
    doc.autoTable({
      head: [['Name', 'Salary']],
      body: [
        ['John', '₹50,000'],
        ['Jane', '₹60,000']
      ],
      startY: 20
    });
    
    doc.save('table-test.pdf');
    console.log('✓ Table PDF works!');
    alert('Success! Table PDF downloaded. Everything is working.');
    return true;
  } catch (error) {
    console.error('✗ Table PDF failed:', error);
    alert(`Table Failed: ${error.message}`);
    return false;
  }
};