import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ADMIN User
  const adminPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'gian.dimatteo@gmail.com' },
    update: {},
    create: {
      email: 'gian.dimatteo@gmail.com',
      password: adminPassword,
      name: 'Gianmarco Di Matteo',
      role: 'ADMIN',
    },
  });
  console.log('✅ ADMIN created:', admin.email, admin.role);

  // EDITOR Users
  const editorEmails = [
    { email: 'marti.gargantini@gmail.com', name: 'Marti Gargantini' },
    { email: 'giacomo.strozzi@hotmail.com', name: 'Giacomo Strozzi' },
  ];

  for (const editorData of editorEmails) {
    const editorPassword = await bcrypt.hash('password123', 10);
    const editor = await prisma.user.upsert({
      where: { email: editorData.email },
      update: {},
      create: {
        email: editorData.email,
        password: editorPassword,
        name: editorData.name,
        role: 'EDITOR',
      },
    });
    console.log('✅ EDITOR created:', editor.email, editor.role);
  }

  console.log('✅ Database seeded successfully!');
  console.log('\n📋 Credenziali di accesso:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('ADMIN:');
  console.log('  Email: gian.dimatteo@gmail.com');
  console.log('  Password: password123');
  console.log('\nEDITOR:');
  console.log('  Email: marti.gargantini@gmail.com');
  console.log('  Password: password123');
  console.log('  Email: giacomo.strozzi@hotmail.com');
  console.log('  Password: password123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
