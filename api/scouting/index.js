import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });

    if (req.method === 'GET') {
      const reports = await prisma.scoutingReport.findMany({ orderBy: { matchDate: 'desc' } });
      return res.json({ success: true, data: reports });
    }

    if (req.method === 'POST') {
      const { opponent, matchDate, notes } = req.body;
      if (!opponent) return res.status(400).json({ error: 'Avversario è obbligatorio' });

      const report = await prisma.scoutingReport.create({
        data: { opponent, matchDate: new Date(matchDate), notes }
      });
      return res.status(201).json({ success: true, data: report });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
