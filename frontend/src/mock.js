// Mock data for the landing page

export const mockData = {
  // Company information
  company: {
    name: "IT 911",
    tagline: "Превращаем идеи в цифровые решения",
    description: "Мы специализируемся на создании веб-сайтов, разработке CRM-систем и телеграм-ботов, которые помогают бизнесу автоматизировать процессы и увеличивать прибыль."
  },

  // Services data
  services: [
    {
      id: 1,
      title: "Создание веб-сайтов",
      description: "Разрабатываем современные, адаптивные сайты с уникальным дизайном и высокой конверсией",
      features: [
        "Уникальный дизайн",
        "SEO-оптимизация", 
        "Мобильная адаптация",
        "Высокая скорость загрузки"
      ],
    },
    {
      id: 2,
      title: "CRM-системы",
      description: "Внедряем и настраиваем CRM для эффективного управления клиентами и увеличения продаж",
      features: [
        "Автоматизация продаж",
        "Учёт клиентов",
        "Аналитика и отчёты",
        "Интеграции с сервисами"
      ],
    },
    {
      id: 3,
      title: "Телеграм-боты",
      description: "Создаём умных ботов для автоматизации общения с клиентами и внутренних процессов",
      features: [
        "Приём заявок 24/7",
        "Интеграция с CRM",
        "Автоответчик",
        "Приём платежей"
      ],
    }
  ],

  // Advantages
  advantages: [
    {
      id: 1,
      title: "Индивидуальный подход",
      description: "Каждый проект уникален - мы изучаем ваш бизнес и создаём решение под ваши цели",
      icon: "target"
    },
    {
      id: 2,
      title: "Быстрая разработка", 
      description: "Соблюдаем сроки и запускаем проекты в кратчайшие сроки без потери качества",
      icon: "zap"
    },
    {
      id: 3,
      title: "Техподдержка",
      description: "Обеспечиваем полную поддержку после запуска - обновления, исправления, консультации",
      icon: "headphones"
    },
    {
      id: 4,
      title: "Результат и ROI",
      description: "Фокусируемся на бизнес-результате - каждое решение должно приносить прибыль",
      icon: "trending-up"
    }
  ],

  // Testimonials
  testimonials: [
    {
      id: 1,
      name: "",
      company: "",
      text: "",
      rating: 5,
      avatar: ""
    },
    {
      id: 2,
      name: "", 
      company: "",
      text: "",
      rating: 5,
      avatar: ""
    },
    {
      id: 3,
      name: "",
      company: "", 
      text: "",
      rating: 5,
      avatar: ""
    }
  ],

  // Contact information
  contact: {
    phone: "+998 90 329 70 00",
    email: "911.it@bk.ru",
    address: "Chorsu MFY, 4 дом, 135 квартира",
    workingHours: "Пн-Пт: 9:00-18:00",
    social: {
      telegram: "@it911_uz_bot",
      whatsapp: ""
    }
  },

  // Game data
  game: {
    title: "Развлекись пока изучаешь наши услуги!",
    description: "Кликай и собирай бонусы - каждый клик приближает тебя к пониманию того, как мы работаем!",
    bonuses: [
      { type: "website", name: "Сайт", points: 10, color: "#3B82F6" },
      { type: "crm", name: "CRM", points: 15, color: "#F59E0B" }, 
      { type: "bot", name: "Бот", points: 20, color: "#10B981" }
    ]
  }
};

// Mock form submission
export const mockSubmitForm = async (formData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Form submitted:', formData);
  return {
    success: true,
    message: "Спасибо за заявку! Мы свяжемся с вами в течение часа."
  };
};