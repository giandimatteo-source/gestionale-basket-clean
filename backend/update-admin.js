import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: { email: 'gian.dimatteo@gmail.com' },
    data: { role: 'ADMIN' },
  });
  console.log('✅ Utente aggiornato:', user.email, 'Ruolo:', user.role);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
