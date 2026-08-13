import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    if (req.method === 'GET') {
      const { page = 1, limit = 20 } = req.query;
      const skip = (page - 1) * limit;
      const take = parseInt(limit);

      const players = await prisma.player.findMany({
        skip,
        take,
        orderBy: { number: 'asc' },
      });

      const total = await prisma.player.count();

      return res.json({
        success: true,
        data: players,
        pagination: { page: parseInt(page), limit: take, total, pages: Math.ceil(total / take) },
      });
    }

    if (req.method === 'POST') {
      const { number, name, height, weight, position } = req.body;
      if (!number || !name) {
        return res.status(400).json({ error: 'Numero e nome sono obbligatori' });
      }

      const newPlayer = await prisma.player.create({
        data: { number, name, height, weight, position }
      });

      return res.status(201).json({ success: true, data: newPlayer });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
