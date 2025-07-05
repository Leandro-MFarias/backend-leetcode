import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.language.createMany({
    data: [
      { name: 'JavaScript', code: 63 },
      { name: 'Python', code: 71 },
      { name: 'Java', code: 62 },
    ],
  })

  console.log('Linguagens adicionadas com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
