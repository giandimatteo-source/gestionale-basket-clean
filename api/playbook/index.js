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
      const plays = await prisma.playbookPlay.findMany({ orderBy: { createdAt: 'desc' } });
      return res.json({ success: true, data: plays });
    }

    if (req.method === 'POST') {
      const { name, description, formation, file } = req.body;
      if (!name) return res.status(400).json({ error: 'Nome è obbligatorio' });

      const play = await prisma.playbookPlay.create({
        data: { name, description, formation, file }
      });
      return res.status(201).json({ success: true, data: play });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
