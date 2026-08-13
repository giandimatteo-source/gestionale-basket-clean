import { importStaffFromExcel, importRosterFromExcel, exportStaffToExcel } from '../services/excelService.js';

// Import staff da Excel
export const importStaff = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file Excel fornito' });
    }

    if (!req.file.originalname.match(/\.(xlsx|xls|csv)$/)) {
      return res.status(400).json({ error: 'File deve essere Excel (.xlsx, .xls) o CSV' });
    }

    const result = await importStaffFromExcel(req.file.path);

    res.json({
      success: true,
      message: 'Import completato',
      ...result,
    });
  } catch (error) {
    console.error('Error in importStaff:', error);
    res.status(500).json({
      error: 'Errore nell\'import del file Excel',
      details: error.message,
    });
  }
};

// Import Roster da Excel
export const importRoster = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file Excel fornito' });
    }

    if (!req.file.originalname.match(/\.(xlsx|xls|csv)$/)) {
      return res.status(400).json({ error: 'File deve essere Excel (.xlsx, .xls) o CSV' });
    }

    const result = await importRosterFromExcel(req.file.path);

    res.json({
      success: true,
      message: 'Import completato',
      ...result,
    });
  } catch (error) {
    console.error('Error in importRoster:', error);
    res.status(500).json({
      error: 'Errore nell\'import del file Excel',
      details: error.message,
    });
  }
};

// Export staff a Excel
export const exportStaff = async (req, res) => {
  try {
    const workbook = await exportStaffToExcel();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename="staff_export.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error in exportStaff:', error);
    res.status(500).json({
      error: 'Errore nell\'export del file Excel',
      details: error.message,
    });
  }
};
