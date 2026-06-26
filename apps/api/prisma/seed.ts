import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Define uma senha padrão segura para o Admin
  const senhaHash = await bcrypt.hash('Admin@2026', 10);

  // Injeta ou atualiza o usuário Admin no banco
const admin = await prisma.user.upsert({
    where: { email: 'admin@arena.com' },
    update: {},
    create: {
      email: 'admin@arena.com',
      name: 'Administrador do Sistema',
      password: senhaHash, // 🌟 Alterado de 'senha' para 'password'
      role: 'ADMIN', 
    },
  });

  console.log('✅ Banco de dados populado com sucesso!');
  console.log(`👤 Admin criado: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });