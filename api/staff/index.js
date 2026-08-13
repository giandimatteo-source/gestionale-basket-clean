import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Verify auth token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    if (req.method === 'GET') {
      const { page = 1, limit = 10, position, search } = req.query;
      const skip = (page - 1) * limit;
      const take = parseInt(limit);

      const where = {
        active: true,
        ...(position && { position }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const staff = await prisma.staff.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          position: true,
          photo: true,
          joinDate: true,
          active: true,
        },
        orderBy: { name: 'asc' },
      });

      const total = await prisma.staff.count({ where });

      return res.json({
        success: true,
        data: staff,
        pagination: {
          page: parseInt(page),
          limit: take,
          total,
          pages: Math.ceil(total / take),
        },
      });
    }

    if (req.method === 'POST') {
      const { name, email, phone, position, bio } = req.body;

      if (!name || !position) {
        return res.status(400).json({ error: 'Nome e posizione sono obbligatori' });
      }

      const existingStaff = await prisma.staff.findUnique({ where: { email } });
      if (existingStaff) {
        return res.status(400).json({ error: 'Email già esistente' });
      }

      const newStaff = await prisma.staff.create({
        data: { name, email, phone: phone || null, position, bio: bio || null, photo: null }
      });

      return res.status(201).json({
        success: true,
        message: 'Staff member creato',
        data: newStaff,
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
