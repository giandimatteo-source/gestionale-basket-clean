import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'gian.dimatteo@gmail.com' },
    update: {},
    create: {
      email: 'gian.dimatteo@gmail.com',
      password: hashedPassword,
      name: 'Gianmarco Di Matteo',
      role: 'ADMIN',
    },
  });
  
  console.log('✅ User created:', user.email, '| Role:', user.role);
}

main()
  .catch(e => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
