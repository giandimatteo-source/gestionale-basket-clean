import ExcelJS from 'exceljs';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

// Importare staff da Excel
export const importStaffFromExcel = async (filePath) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Staff') || workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error('Foglio "Staff" non trovato nell\'Excel');
    }

    const staffRecords = [];
    const errors = [];
    let rowNumber = 2; // Inizia da 2 (row 1 è header)

    worksheet.eachRow((row, rowNum) => {
      if (rowNum === 1) return; // Salta header

      try {
        const name = row.getCell(1).value;
        const email = row.getCell(2).value;
        const position = row.getCell(3).value;
        const phone = row.getCell(4).value;
        const bio = row.getCell(5).value;

        // Validazione
        if (!name || !email || !position) {
          errors.push({
            row: rowNum,
            error: 'Nome, Email e Posizione sono obbligatori',
          });
          return;
        }

        // Email validation
        if (!isValidEmail(email)) {
          errors.push({
            row: rowNum,
            error: `Email non valida: ${email}`,
          });
          return;
        }

        staffRecords.push({
          name: String(name).trim(),
          email: String(email).trim(),
          position: String(position).trim(),
          phone: phone ? String(phone).trim() : null,
          bio: bio ? String(bio).trim() : null,
        });
      } catch (error) {
        errors.push({
          row: rowNum,
          error: error.message,
        });
      }
    });

    // Salva nel database
    const created = [];
    const skipped = [];

    for (const staffData of staffRecords) {
      try {
        // Verifica se esiste già
        const existing = await prisma.staff.findUnique({
          where: { email: staffData.email },
        });

        if (existing) {
          skipped.push({
            email: staffData.email,
            reason: 'Già esistente nel database',
          });
          continue;
        }

        const newStaff = await prisma.staff.create({
          data: staffData,
        });

        created.push(newStaff);
      } catch (error) {
        errors.push({
          email: staffData.email,
          error: error.message,
        });
      }
    }

    // Pulisci il file temporaneo
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    return {
      success: true,
      summary: {
        total: staffRecords.length,
        created: created.length,
        skipped: skipped.length,
        errors: errors.length,
      },
      created,
      skipped,
      errors,
    };
  } catch (error) {
    console.error('Error in importStaffFromExcel:', error);
    // Pulisci il file in caso di errore
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });
    }
    throw error;
  }
};

// Importare giocatori (Roster) da Excel
export const importRosterFromExcel = async (filePath) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Roster') || workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error('Foglio "Roster" non trovato nell\'Excel');
    }

    const rosterRecords = [];
    const errors = [];

    worksheet.eachRow((row, rowNum) => {
      if (rowNum === 1) return; // Salta header

      try {
        const name = row.getCell(1).value;
        const number = row.getCell(2).value;
        const position = row.getCell(3).value;
        const height = row.getCell(4).value;
        const weight = row.getCell(5).value;
        const dateOfBirth = row.getCell(6).value;
        const nationality = row.getCell(7).value;

        if (!name || !number || !position) {
          errors.push({
            row: rowNum,
            error: 'Nome, Numero e Posizione sono obbligatori',
          });
          return;
        }

        rosterRecords.push({
          name: String(name).trim(),
          number: parseInt(number),
          position: String(position).trim(),
          height: height ? parseFloat(height) : null,
          weight: weight ? parseFloat(weight) : null,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          nationality: nationality ? String(nationality).trim() : null,
        });
      } catch (error) {
        errors.push({
          row: rowNum,
          error: error.message,
        });
      }
    });

    // Salva nel database
    const created = [];
    const skipped = [];

    for (const rosterData of rosterRecords) {
      try {
        const existing = await prisma.roster.findFirst({
          where: {
            AND: [
              { number: rosterData.number },
              // Aggiungi condizioni aggiuntive se necessario
            ],
          },
        });

        if (existing) {
          skipped.push({
            number: rosterData.number,
            reason: 'Numero giocatrice già esistente',
          });
          continue;
        }

        const newRoster = await prisma.roster.create({
          data: rosterData,
        });

        created.push(newRoster);
      } catch (error) {
        errors.push({
          number: rosterData.number,
          error: error.message,
        });
      }
    }

    // Pulisci il file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    return {
      success: true,
      summary: {
        total: rosterRecords.length,
        created: created.length,
        skipped: skipped.length,
        errors: errors.length,
      },
      created,
      skipped,
      errors,
    };
  } catch (error) {
    console.error('Error in importRosterFromExcel:', error);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });
    }
    throw error;
  }
};

// Esportare staff in Excel
export const exportStaffToExcel = async () => {
  try {
    const staff = await prisma.staff.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff');

    // Header
    worksheet.columns = [
      { header: 'Nome', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Posizione', key: 'position', width: 20 },
      { header: 'Telefono', key: 'phone', width: 15 },
      { header: 'Bio', key: 'bio', width: 40 },
      { header: 'Data Ingresso', key: 'joinDate', width: 15 },
    ];

    // Data rows
    staff.forEach((member) => {
      worksheet.addRow({
        name: member.name,
        email: member.email,
        position: member.position,
        phone: member.phone || '',
        bio: member.bio || '',
        joinDate: member.joinDate.toLocaleDateString('it-IT'),
      });
    });

    // Style header
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E3A8A' },
    };

    return workbook;
  } catch (error) {
    console.error('Error in exportStaffToExcel:', error);
    throw error;
  }
};

// Utilità: Validare email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
