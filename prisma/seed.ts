import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const testUser = await prisma.user.upsert({
    where: {
      email: "test@example.com",
    },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    }
  });


  const categories = [
    { id: 'technology', name: 'Technology' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'programming', name: 'Programming' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'devops', name: 'DevOps' },
    { id: 'ai', name: 'AI' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    });
  }


  await prisma.post.deleteMany({
    where: {
      authorId: testUser.id
    }
  });

  const posts = [
    {
      title: "The Impact of Technology on the Workplace",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Travelling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, travelling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels."
          },
          {
            type: "paragraph",
            content: "One of the most rewarding aspects of travelling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect."
          },
          {
            type: "heading",
            content: "Research Your Destination"
          },
          {
            type: "paragraph",
            content: "Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas."
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula vitae ligula sit amet maximus. Nunc auctor neque nec dictum ultrices. Duis eleifend mi id tellus pellentesque, id vehicula orci ultricies."
          },
          {
            type: "heading",
            content: "Plan Your Itinerary"
          },
          {
            type: "paragraph",
            content: "While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Consider your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey."
          },
          {
            type: "image",
            content: "A traveler looking at the sunset",
            imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
          }
        ]
      },
      categoryId: "technology",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
    },
    {
      title: "Understanding Modern Web Architecture",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Modern web architecture has evolved significantly over the past decade. With the rise of cloud computing, microservices, and serverless technologies, the way we build and deploy web applications has fundamentally changed."
          },
          {
            type: "paragraph",
            content: "In this comprehensive guide, we'll explore the key concepts and patterns that define modern web architecture, and how they can help you build more scalable and maintainable applications."
          },
          {
            type: "heading",
            content: "The Rise of Microservices"
          },
          {
            type: "paragraph",
            content: "Microservices architecture has become increasingly popular, offering improved scalability and maintainability. By breaking down applications into smaller, independent services, teams can work more efficiently and deploy updates with less risk."
          },
          {
            type: "image",
            content: "Microservices Architecture Diagram",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
          },
          {
            type: "heading",
            content: "Serverless Computing"
          },
          {
            type: "paragraph",
            content: "Serverless architecture represents the next evolution in cloud computing. It allows developers to focus purely on writing code, while cloud providers handle all server management and scaling concerns."
          }
        ]
      },
      categoryId: "development",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    {
      title: "The Rise of Web3 Technologies",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Web3 represents a fundamental shift in how we think about and interact with the internet. Built on blockchain technology, it promises a more decentralized, user-centric web experience."
          },
          {
            type: "heading",
            content: "Understanding Blockchain"
          },
          {
            type: "paragraph",
            content: "At its core, blockchain technology provides a decentralized, immutable ledger that enables trustless transactions and interactions. This foundation is crucial for Web3 applications."
          },
          {
            type: "paragraph",
            content: "Smart contracts, self-executing contracts with the terms directly written into code, form the backbone of many Web3 applications. They enable automated, trustless transactions without intermediaries."
          },
          {
            type: "heading",
            content: "The NFT Revolution"
          },
          {
            type: "paragraph",
            content: "Non-fungible tokens (NFTs) have opened up new possibilities for digital ownership and creativity. They're transforming how we think about digital assets and content creation."
          },
          {
            type: "image",
            content: "Web3 Ecosystem",
            imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"
          }
        ]
      },
      categoryId: "blockchain",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"
    },
    {
      title: "Mastering TypeScript in 2024",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "TypeScript has become the de facto standard for large-scale JavaScript applications. Its powerful type system and modern features enable developers to write more maintainable and error-free code."
          },
          {
            type: "heading",
            content: "Advanced Type System Features"
          },
          {
            type: "paragraph",
            content: "TypeScript's type system goes far beyond simple type annotations. Understanding advanced features like conditional types, mapped types, and template literal types can significantly improve your code's type safety."
          },
          {
            type: "paragraph",
            content: "Let's explore some practical examples of these advanced type features and how they can be applied in real-world scenarios."
          },
          {
            type: "heading",
            content: "Performance Optimization"
          },
          {
            type: "paragraph",
            content: "While TypeScript adds a compilation step to your development process, there are various techniques to optimize both compilation and runtime performance."
          },
          {
            type: "image",
            content: "TypeScript Code Example",
            imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea"
          }
        ]
      },
      categoryId: "programming",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea"
    },
    {
      title: "Building Scalable NextJS Applications",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Architecture patterns and best practices for large Next.js apps. Explore proven patterns, optimization techniques, and architectural decisions that will help you build production-ready Next.js applications."
          },
          {
            type: "heading",
            content: "Application Structure"
          },
          {
            type: "paragraph",
            content: "A well-organized project structure is crucial for scalability. Learn how to organize your components, pages, and utilities in a way that promotes maintainability and reusability."
          },
          {
            type: "heading",
            content: "State Management"
          },
          {
            type: "paragraph",
            content: "Choosing the right state management solution is critical for large applications. We'll explore different options and their trade-offs."
          },
          {
            type: "image",
            content: "Next.js Architecture Diagram",
            imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356"
          }
        ]
      },
      categoryId: "development",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356"
    },
    {
      title: "The Impact of AI on UX Design",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "How artificial intelligence is changing user experience design. Discover how AI tools and technologies are revolutionizing the way we approach UX design, from personalization to automated testing."
          },
          {
            type: "heading",
            content: "AI-Powered Personalization"
          },
          {
            type: "paragraph",
            content: "Learn how AI algorithms can create personalized user experiences by analyzing user behavior and preferences."
          },
          {
            type: "image",
            content: "AI UX Design Process",
            imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94"
          }
        ]
      },
      categoryId: "design",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94"
    },
    {
      title: "Optimizing React Performance",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Advanced techniques for building faster React applications. Learn practical strategies and optimization techniques to improve the performance of your React applications, from code splitting to memoization."
          },
          {
            type: "heading",
            content: "Code Splitting Strategies"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
          },
          {
            type: "heading",
            content: "Performance Monitoring"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit."
          },
          {
            type: "image",
            content: "React Performance Monitoring Dashboard",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          }
        ]
      },
      categoryId: "programming",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      title: "The Evolution of CSS Architecture",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Modern CSS practices, from BEM to Tailwind and beyond. Explore the evolution of CSS methodologies and how modern tools like Tailwind are changing the way we style web applications."
          },
          {
            type: "heading",
            content: "The Rise of Utility-First CSS"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Nulla quis lorem ut libero malesuada feugiat."
          },
          {
            type: "heading",
            content: "Modern CSS Features"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit."
          },
          {
            type: "image",
            content: "Modern CSS Architecture",
            imageUrl: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19"
          }
        ]
      },
      categoryId: "design",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19"
    },
    {
      title: "Serverless Computing: The Future of Backend Development",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Serverless mimarinin modern web uygulamalarındaki rolünü ve önemini keşfedin. AWS Lambda, Azure Functions ve diğer serverless platformların karşılaştırmalı analizi ile birlikte, bu teknolojilerin maliyet optimizasyonu ve ölçeklenebilirlik avantajlarını öğrenin."
          },
          {
            type: "heading",
            content: "Serverless Platforms"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui."
          },
          {
            type: "heading",
            content: "Cost Optimization"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Nulla quis lorem ut libero malesuada feugiat."
          },
          {
            type: "image",
            content: "Serverless Architecture Diagram",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
          }
        ]
      },
      categoryId: "cloud",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    },
    {
      title: "GraphQL vs REST: Modern API Design",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Modern API tasarımında GraphQL ve REST yaklaşımlarının detaylı karşılaştırması. Her iki yaklaşımın güçlü yanları, kullanım senaryoları ve performans etkileri hakkında derinlemesine bir analiz."
          },
          {
            type: "heading",
            content: "Understanding GraphQL"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui."
          },
          {
            type: "heading",
            content: "REST Architecture"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat."
          },
          {
            type: "image",
            content: "API Architecture Comparison",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
          }
        ]
      },
      categoryId: "development",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
    },
    {
      title: "DevOps Pratikleri ve Sürekli Entegrasyon",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Modern yazılım geliştirme süreçlerinde DevOps uygulamaları ve CI/CD pipeline'larının önemi. Docker, Kubernetes ve modern konteynerizasyon teknolojilerinin yazılım dağıtımındaki rolü ve en iyi uygulamalar."
          },
          {
            type: "heading",
            content: "CI/CD Pipeline'ları"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui."
          },
          {
            type: "heading",
            content: "Konteynerizasyon"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat."
          },
          {
            type: "image",
            content: "DevOps Pipeline",
            imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb"
          }
        ]
      },
      categoryId: "devops",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb"
    },
    {
      title: "Yapay Zeka ile Kod İncelemesi",
      content: {
        sections: [
          {
            type: "paragraph",
            content: "Yapay zeka destekli kod inceleme araçlarının modern yazılım geliştirme süreçlerine etkisi. GitHub Copilot, Amazon CodeGuru ve benzer AI araçlarının kod kalitesi, güvenlik analizi ve geliştirici verimliliği üzerindeki etkileri."
          },
          {
            type: "heading",
            content: "AI Code Review Araçları"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui."
          },
          {
            type: "heading",
            content: "Güvenlik Analizi"
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat."
          },
          {
            type: "image",
            content: "AI Code Analysis",
            imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
          }
        ]
      },
      categoryId: "ai",
      authorId: testUser.id,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
    }
  ].map(post => ({
    ...post,
    content: JSON.stringify(post.content)
  }));

  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        categoryId: post.categoryId,
        authorId: post.authorId,
        image: post.image
      }
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 