import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "geo-intelligence",
    title: "Inzhgidroproekt AI Platform",
    description: {
      ru: "Вертикальная AI-платформа для гидрогеологов, покрывающая полный цикл работы с геологической документацией. Автоматический парсинг сотен PDF-отчетов и паспортов скважин, включая сканы — извлечение структурированных данных в БД через OCR-пайплайн. RAG-чат с семантическим поиском по отчетам: inline-цитаты со ссылками на конкретные страницы источников, гибридный поиск (vector + keyword) с cross-encoder reranking. Интерактивная карта скважин на Mapbox с фильтрацией и карточками параметров. Конструктор паспорта скважины с визуализацией геологического разреза. AI-модуль проверки отчетов на соответствие нормативным чеклистам. Монорепо-архитектура: 3 сервиса (web, api, ml), provider-абстракции для LLM/embedding/storage, SSE-стриминг. Заменила часы ручного поиска по PDF на минуты — развернуто для реальной инженерной компании.",
      en: "Vertical AI platform for hydrogeologists covering the full cycle of geological documentation work. Automated parsing of hundreds of PDF reports and borehole passports including scans — structured data extraction to DB via OCR pipeline. RAG-powered chat with semantic search across reports: inline citations with links to specific source pages, hybrid search (vector + keyword) with cross-encoder reranking. Interactive borehole map on Mapbox with filtering and parameter cards. Borehole passport builder with geological cross-section visualization. AI-powered report compliance checker against configurable regulatory checklists. Monorepo architecture: 3 services (web, api, ml), provider abstractions for LLM/embedding/storage, SSE streaming. Replaced hours of manual PDF lookup with minutes — deployed for a real geological engineering company."
    },
    domains: ["Geo-tech", "AI", "RAG"],
    tags: ["Next.js", "Nest.js", "FastAPI", "pgvector", "Claude API", "Mapbox", "SSE", "OCR", "RAG", "Docker"],
    accent: "#00d4ff",
    initials: "IGP",
    logoColor: "#00d4ff",
    logo: "/logos/inzhgidroproekt-logo.svg",
    screens: [
      {
        label: { ru: "RAG-чат", en: "RAG Chat" },
        icon: "💬",
        src: "https://storage.yandexcloud.net/katyaka/bitkovnet1.png"
      },
      {
        label: { ru: "Карта скважин", en: "Borehole Map" },
        icon: "🗺️",
        src: "https://storage.yandexcloud.net/katyaka/bitkovnet1.png"
      },
      {
        label: { ru: "Конструктор паспортов", en: "Passport Builder" },
        icon: "📐",
        src: "https://storage.yandexcloud.net/katyaka/bitkovnet1.png"
      },
    ]
  },
  {
    id: "evm-hr-platform",
    title: "EVM — AI HR Platform",
    description: {
      ru: "AI-powered B2B платформа для оценки и развития команд, построенная с нуля до 12 платящих клиентов (3 enterprise, 9 SMB). Полный ownership фронтенда — от архитектуры до деплоя. Монорепо из 8 Next.js приложений, каждое с выделенным NestJS BFF. Дизайн-система из 57 компонентов с единым API, дизайн-токенами и синхронизацией с Figma — сократила время разработки страниц с 6–7 до 2–3 часов. Конструктор опросников с 18 типами шкал (выбор, ранжирование, матрицы), модуль оценки 360° с автосохранением и таймерами, многошаговые формы с валидацией (React Hook Form + Zod). Real-time дашборды на D3.js и Highcharts с обновлением через WebSocket и экспортом в PDF. Инициировала RAG-интеграцию: оцифровали проприетарную методологию оценки талантов как базу знаний для LLM — подготовка отчета сократилась с 3–4 часов до минут. Тестирование с нуля: Jest + Playwright, покрытие с 30% до 80% за 2 месяца. Scrum Master (ICP), менторинг fullstack-разработчика. Два параллельных трека: автоматизация внутреннего HR-процесса материнской компании + запуск внешнего B2B-продукта.",
      en: "AI-powered B2B platform for team assessment and talent development, built from zero to 12 paying clients (3 enterprise, 9 SMB). Full frontend ownership — architecture, development, deployment, code review. Monorepo of 8 Next.js apps, each with a dedicated NestJS BFF layer. Design system of 57 components with unified API, design tokens, and Figma sync — cut page development time from 6–7 to 2–3 hours. Survey constructor with 18 scale types (selection, ranking, matrices), 360° assessment module with auto-save and timers, multi-step forms with validation (React Hook Form + Zod). Real-time dashboards built with D3.js and Highcharts, WebSocket updates, PDF export. Initiated RAG integration: digitized proprietary talent assessment methodology as LLM knowledge base — report preparation dropped from 3–4 hours to minutes. Built testing from scratch: Jest + Playwright, scaled coverage from 30% to 80% in 2 months. Acted as Scrum Master (ICP certified), mentored a fullstack developer. Two parallel tracks: internal HR process automation for parent company + external B2B product launch."
    },
    domains: [
      "AI",
      "HR-tech",
      "B2B SaaS"
    ],
    tags: ["Next.js", "Nest.js", "TypeScript", "D3.js", "Highcharts", "RAG", "OpenAI API", "Zustand", "Playwright", "WebSocket"],
    accent: "#ec4899",
    initials: "EVM",
    logoColor: "#f472b6",
    logo: "/logos/evm-logo.svg",
    screens: [
      {
        label: { ru: "Оценка 360°", en: "Assessment 360°" },
        icon: "🎯",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet1.png"
      },
      {
        label: { ru: "Конструктор опросов", en: "Survey Builder" },
        icon: "📋",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet1.png"
      },
      {
        label: { ru: "AI-отчеты", en: "AI Reports" },
        icon: "🤖",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet1.png"
      }
    ]
  },
  {
    id: "onetwtrip-whitelabel",
    title: "OneTwoTrip White-Label",
    description: {
      ru: "B2B white-label движок для одной из ведущих travel-платформ России. Запустила 11 white-label решений и поддерживала 20+ активных интеграций для крупнейших банков и авиакомпаний — Raiffeisen, Тинькофф, ВТБ, Газпромбанк, Сбер, Альфабанк, Аэрофлот, S7, Red Wings. Встраивание поиска, бронирования и оплаты на домены клиентов с полной кастомизацией под бренд. Разработала и поддерживала UI-kit из 11 переиспользуемых компонентов: документация в Storybook, версионирование, кросс-браузерная и кросс-брендовая консистентность. Реализовала 6 крупных интеграций бонусных программ лояльности во флоу бронирования и оплаты с real-time синхронизацией через Socket.io. Миграция legacy JavaScript на TypeScript с полным покрытием тестами. Десятки тысяч пользователей ежемесячно через white-label флоу.",
      en: "B2B white-label engine for one of Russia's leading travel platforms. Shipped 11 white-label solutions and maintained 20+ active integrations for major banks and airlines — Raiffeisen, Tinkoff, VTB, Gazprombank, Sber, Alfabank, Aeroflot, S7, Red Wings. Embedded search, booking, and payment flows into client domains with full brand customization. Built and maintained a shared UI kit of 11 reusable components: Storybook documentation, versioning, cross-browser and cross-brand consistency. Implemented 6 major loyalty program integrations into booking and payment flows with real-time sync via Socket.io. Led legacy JavaScript to TypeScript migration with full test coverage. Tens of thousands of monthly users through white-label flows."
    },
    domains: [
      "Travel-tech",
      "B2B",
      "Enterprise"
    ],
    tags: ["React", "TypeScript", "Redux", "Storybook", "Socket.io", "Webpack", "Jest", "Playwright", "FSD"],
    accent: "#f59e0b",
    initials: "OTT",
    logoColor: "#fbbf24",
    logo: "/logos/ott-logo.svg",
    screens: [
      {
        label: { ru: "Флоу бронирования", en: "Booking Flow" },
        icon: "✈️",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet1.png"
      },
      {
        label: { ru: "Брендирование", en: "Brand Themes" },
        icon: "🎨",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet1.png"
      },
      {
        label: { ru: "Программы лояльности", en: "Loyalty Integration" },
        icon: "💳",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet1.png"
      }
    ]
  },
  {
    id: "bitkov-exchange",
    title: "Bitkov Exchange",
    description: {
      ru: "Централизованная платформа для обмена криптовалют с офлайн-сделками Bitcoin. Fullstack-разработка: клиентский интерфейс (React + TypeScript) и бэкенд-сервисы (Node.js, Express, PostgreSQL). Личный кабинет с бронированием ордеров, отслеживанием сделок и курсов, реферальная программа. Интеграция внешнего биржевого API (Garantex) для актуальных курсов. Telegram-бот на Node.js + Telegraf для управления ордерами. 90–95% покрытие тестами критичных пользовательских флоу на Jest.",
      en: "Centralized cryptocurrency exchange platform for offline Bitcoin transactions. Full-stack development: client interface (React + TypeScript) and backend services (Node.js, Express, PostgreSQL). User dashboard with order booking, deal and rate tracking, referral program. Integrated external exchange API (Garantex) for real-time rate data. Built a Telegram bot (Node.js + Telegraf) for order management. Achieved 90–95% test coverage on critical user flows with Jest."
    },
    domains: ["Fin-tech", "Crypto"],
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Sequelize", "Telegraf", "Jest"],
    accent: "#7c3aed",
    initials: "BTE",
    logoColor: "#a78bfa",
    screens: [
      {
        label: { ru: "Обмен", en: "Exchange" },
        icon: "📈",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet1.png"
      },
      {
        label: { ru: "Отзывы", en: "Reviews" },
        icon: "🔄",
        src: "https://storage.yandexcloud.net/katyaka/portfolio/bitkovnet2.png"
      },
    ]
  }
];
