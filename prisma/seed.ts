import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleProducts = [
  {
    name: "iPhone 15 Pro Max",
    description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y titanio de grado aeroespacial.",
    price: 1199.99,
    category: "Electrónicos",
    imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop"
  },
  {
    name: "MacBook Air M2",
    description: "Ultraligero y potente con chip M2, pantalla Liquid Retina de 13.6 pulgadas.",
    price: 1099.99,
    category: "Electrónicos",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Smartphone premium con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X.",
    price: 1299.99,
    category: "Electrónicos",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop"
  },
  {
    name: "Nike Air Jordan 1 Retro",
    description: "Zapatillas icónicas de basketball con diseño clásico y comodidad superior.",
    price: 170.99,
    category: "Moda",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
  },
  {
    name: "Sony WH-1000XM5",
    description: "Audífonos inalámbricos con cancelación de ruido líder en la industria.",
    price: 399.99,
    category: "Electrónicos",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Zapatillas para running con tecnología Boost y máxima comodidad.",
    price: 180.99,
    category: "Deportes",
    imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop"
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Olla multifuncional eléctrica: olla a presión, arrocera, vaporera y más.",
    price: 99.99,
    category: "Hogar",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
  },
  {
    name: "Dyson V15 Detect",
    description: "Aspiradora inalámbrica con tecnología láser para detectar polvo microscópico.",
    price: 749.99,
    category: "Hogar",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "Batidora de pie profesional con múltiples accesorios incluidos.",
    price: 379.99,
    category: "Hogar",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    name: "Chanel No. 5 Parfum",
    description: "Fragancia icónica y atemporal, símbolo de elegancia y sofisticación.",
    price: 150.99,
    category: "Belleza",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop"
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Los jeans clásicos que definieron el denim, con corte relajado y cómodo.",
    price: 69.99,
    category: "Moda",
    imageUrl: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=300&fit=crop"
  },
  {
    name: "PlayStation 5 Console",
    description: "Consola de videojuegos de nueva generación con gráficos 4K y SSD ultra rápido.",
    price: 499.99,
    category: "Electrónicos",
    imageUrl: "https://images.unsplash.com/photo-1607015403900-927f4fe08cbb?w=400&h=300&fit=crop"
  },
  {
    name: "LEGO Architecture Statue of Liberty",
    description: "Set de construcción detallado de la Estatua de la Libertad para adultos.",
    price: 119.99,
    category: "Juguetes",
    imageUrl: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop"
  },
  {
    name: "The Art of War - Sun Tzu",
    description: "Clásico tratado de estrategia militar aplicable a los negocios y la vida.",
    price: 12.99,
    category: "Libros",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  },
  {
    name: "Yoga Mat Premium",
    description: "Esterilla de yoga antideslizante de alta calidad para práctica profesional.",
    price: 79.99,
    category: "Deportes",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
  },
  {
    name: "Skincare Set Premium",
    description: "Set completo de cuidado facial con suero, crema hidratante y limpiador.",
    price: 129.99,
    category: "Belleza",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop"
  }
]

const discountCodes = [
  {
    code: "WELCOME10",
    discount: 10,
    isPercentage: true,
    isActive: true,
    usageLimit: 1000,
  },
  {
    code: "AFFILIATE5",
    discount: 5,
    isPercentage: true,
    isActive: true,
    usageLimit: null,
  },
  {
    code: "FIRSTBUY",
    discount: 15,
    isPercentage: true,
    isActive: true,
    usageLimit: 500,
  }
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.discountCode.deleteMany()
  await prisma.product.deleteMany()

  // Create products
  console.log('📦 Creating products...')
  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product
    })
  }

  // Create discount codes
  console.log('🎫 Creating discount codes...')
  for (const code of discountCodes) {
    await prisma.discountCode.create({
      data: code
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📦 Created ${sampleProducts.length} products`)
  console.log(`🎫 Created ${discountCodes.length} discount codes`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })