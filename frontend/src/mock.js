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
      price: "от 50 000 ₽",
      duration: "от 2 недель"
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
      price: "от 80 000 ₽", 
      duration: "от 3 недель"
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
      price: "от 25 000 ₽",
      duration: "от 1 недели"
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
      name: "Андрей Петров",
      company: "Строительная компания 'СтройМастер'",
      text: "IT991 создала нам сайт и CRM-систему. За полгода количество заявок выросло в 3 раза, а менеджеры стали работать в 2 раза эффективнее.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Мария Иванова", 
      company: "Интернет-магазин 'Модный стиль'",
      text: "Телеграм-бот полностью автоматизировал приём заказов. Теперь клиенты могут оформить покупку в любое время, а мы не теряем ни одной заявки.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Дмитрий Козлов",
      company: "Консалтинговое агентство 'БизнесРост'", 
      text: "Профессиональная команда, которая понимает бизнес-процессы. Сайт получился именно таким, как мы хотели - стильный и продающий.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ],

  // Contact information
  contact: {
    phone: "+7 (999) 123-45-67",
    email: "info@IT991.ru",
    address: "Москва, ул. Тверская, д. 1, оф. 100",
    workingHours: "Пн-Пт: 9:00-18:00",
    social: {
      telegram: "@IT991_team",
      whatsapp: "+79991234567"
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