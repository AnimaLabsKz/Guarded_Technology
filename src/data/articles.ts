export type Lang = "en" | "ar" | "ru" | "kk";
export type I18n = Record<Lang, string>;

export type Article = {
  id: string;
  image: string;
  filterTag: string; // "cat_security" | "cat_energy" | "cat_cyber" | "cat_smart_home"
  category: I18n;
  title: I18n;
  date: I18n;
  readTime: I18n;
  excerpt: I18n;
  body: I18n;
};

// ─── Add new articles here — one object per article ───────────────────────────
export const articles: Article[] = [
  {
    id: "ai-urban-surveillance",
    image: "/assets/news/ai-surveillance.jpg",
    filterTag: "cat_security",
    category: {
      en: "AI & Surveillance",
      ru: "ИИ и наблюдение",
      kk: "AI және бақылау",
      ar: "الذكاء الاصطناعي والمراقبة",
    },
    title: {
      en: "The Future of AI in Urban Surveillance",
      ru: "Будущее ИИ в городском видеонаблюдении",
      kk: "Қалалық бақылаудағы ИИ болашағы",
      ar: "مستقبل الذكاء الاصطناعي في المراقبة الحضرية",
    },
    date: {
      en: "March 15, 2026",
      ru: "15 марта 2026",
      kk: "15 наурыз 2026",
      ar: "15 مارس 2026",
    },
    readTime: {
      en: "5 min read",
      ru: "5 мин",
      kk: "5 мин",
      ar: "5 دقائق",
    },
    excerpt: {
      en: "How Guarded Vision is integrating edge-AI to reduce emergency response times in smart cities.",
      ru: "Как Guarded Vision интегрирует периферийный ИИ для сокращения времени реагирования на чрезвычайные ситуации в умных городах.",
      kk: "Guarded Vision ақылды қалаларда төтенше жағдайларға жауап беру уақытын қысқарту үшін шеткі AI-ды қалай біріктіреді.",
      ar: "كيف تدمج Guarded Vision تقنيات AI الطرفية لتقليل أوقات الاستجابة للطوارئ في المدن الذكية.",
    },
    body: {
      en: "The integration of edge-AI into urban surveillance represents a paradigm shift in how smart cities approach public safety. Guarded Vision's latest deployment across multiple metropolitan areas demonstrates that edge computing can reduce emergency response times by up to 40%. By processing video feeds locally rather than streaming to centralized data centers, our AI models identify threats in real-time — from unauthorized perimeter breaches to traffic anomalies — and automatically alert response teams. This article explores the architecture behind our distributed AI nodes, the privacy-preserving techniques we employ, and the measurable impact on urban safety metrics across three continents.",
      ru: "Интеграция периферийного ИИ в городское видеонаблюдение представляет собой смену парадигмы в подходе умных городов к общественной безопасности. Последнее развёртывание Guarded Vision в нескольких мегаполисах демонстрирует, что периферийные вычисления могут сократить время реагирования на чрезвычайные ситуации до 40%. Обрабатывая видеопотоки локально, а не передавая их в централизованные центры обработки данных, наши модели ИИ выявляют угрозы в режиме реального времени — от несанкционированных нарушений периметра до аномалий трафика — и автоматически оповещают группы реагирования.",
      kk: "Шеткі ИИ-ді қалалық бақылауға біріктіру ақылды қалалардың қоғамдық қауіпсіздікке деген көзқарасында парадигмалық өзгерісті білдіреді. Guarded Vision-ның бірнеше метрополиялық аймақтарда соңғы орналастыруы шеткі есептеулер төтенше жағдайларға жауап беру уақытын 40%-ға дейін қысқарта алатынын көрсетеді. Бейне ағындарды жергілікті деңгейде өңдей отырып, ИИ модельдері нақты уақытта қауіптерді анықтайды және жауап беру топтарына автоматты түрде хабарлайды.",
      ar: "يمثل دمج الذكاء الاصطناعي الطرفي في المراقبة الحضرية تحولاً جذرياً في نهج المدن الذكية تجاه السلامة العامة. يُظهر أحدث نشر لـ Guarded Vision عبر مناطق حضرية متعددة أن الحوسبة الطرفية يمكن أن تقلل أوقات الاستجابة للطوارئ بنسبة تصل إلى 40٪. من خلال معالجة مقاطع الفيديو محلياً بدلاً من البث إلى مراكز البيانات المركزية، تحدد نماذج الذكاء الاصطناعي لدينا التهديدات في الوقت الفعلي وتنبه فرق الاستجابة تلقائياً.",
    },
  },

  {
    id: "solar-cctv-standard-2026",
    image: "/assets/news/smart-home.jpg",
    filterTag: "cat_energy",
    category: {
      en: "Sustainability",
      ru: "Устойчивость",
      kk: "Тұрақтылық",
      ar: "الاستدامة",
    },
    title: {
      en: "Sustainable Security: Why Solar CCTV is the Standard for 2026",
      ru: "Устойчивая безопасность: почему солнечное CCTV — стандарт 2026 года",
      kk: "Тұрақты қауіпсіздік: неліктен күн CCTV 2026 жылдың стандарты",
      ar: "الأمن المستدام: لماذا CCTV الشمسي هو المعيار لعام 2026",
    },
    date: {
      en: "February 28, 2026",
      ru: "28 февраля 2026",
      kk: "28 ақпан 2026",
      ar: "28 فبراير 2026",
    },
    readTime: {
      en: "4 min read",
      ru: "4 мин",
      kk: "4 мин",
      ar: "4 دقائق",
    },
    excerpt: {
      en: "Analyzing the shift toward off-grid security infrastructure in remote industrial sectors.",
      ru: "Анализ перехода к автономной инфраструктуре безопасности в удалённых промышленных секторах.",
      kk: "Қашықтағы өнеркәсіптік секторлардағы автономды қауіпсіздік инфрақұрылымына көшуді талдау.",
      ar: "تحليل التحول نحو البنية التحتية الأمنية خارج الشبكة في القطاعات الصناعية النائية.",
    },
    body: {
      en: "As global enterprises expand into increasingly remote territories — from mining operations in sub-Saharan Africa to pipeline monitoring across Central Asia — the demand for off-grid security infrastructure has surged. Guarded Energy's solar-powered CCTV stations have emerged as the industry standard, combining high-efficiency photovoltaic panels with advanced battery storage to deliver uninterrupted 24/7 surveillance without external power sources. This deep-dive examines the total cost of ownership, reliability benchmarks across extreme weather conditions, and how our latest generation systems achieve 99.7% uptime in the field.",
      ru: "По мере расширения глобальных предприятий в отдалённые территории — от горнодобывающих операций в Африке к югу от Сахары до мониторинга трубопроводов в Центральной Азии — спрос на автономную инфраструктуру безопасности резко вырос. Солнечные станции CCTV от Guarded Energy стали отраслевым стандартом, сочетая высокоэффективные фотоэлектрические панели с передовыми системами хранения энергии для обеспечения непрерывного круглосуточного наблюдения без внешних источников питания.",
      kk: "Жаһандық кәсіпорындар барған сайын қашық аумақтарға кеңейген сайын — Сахара астындағы Африкадағы тау-кен операцияларынан Орталық Азиядағы құбыр мониторингіне дейін — автономды қауіпсіздік инфрақұрылымына сұраныс күрт өсті. Guarded Energy-дің күн энергиясымен жұмыс істейтін CCTV станциялары жоғары тиімді фотоэлектрлік панельдерді озық батарея сақтауымен біріктіріп, сыртқы қуат көздерінсіз үздіксіз тәулік бойы бақылауды қамтамасыз ете отырып, салалық стандартқа айналды.",
      ar: "مع توسع المؤسسات العالمية في مناطق نائية بشكل متزايد — من عمليات التعدين في أفريقيا جنوب الصحراء إلى مراقبة خطوط الأنابيب في آسيا الوسطى — ارتفع الطلب على البنية التحتية الأمنية المستقلة عن الشبكة. برزت محطات CCTV العاملة بالطاقة الشمسية من Guarded Energy كمعيار صناعي، يجمع بين الألواح الكهروضوئية عالية الكفاءة وتخزين البطاريات المتقدم لتوفير مراقبة مستمرة على مدار الساعة دون مصادر طاقة خارجية.",
    },
  },

  {
    id: "biometric-access-gcc",
    image: "/assets/news/biometric-access.jpg",
    filterTag: "cat_smart_home",
    category: {
      en: "Smart Access",
      ru: "Умный доступ",
      kk: "Ақылды кіру",
      ar: "الوصول الذكي",
    },
    title: {
      en: "Biometric Locks Are Replacing Traditional Keys Across the GCC",
      ru: "Биометрические замки вытесняют традиционные ключи в странах Персидского залива",
      kk: "Биометриялық құлыптар Парсы шығанағы елдерінде дәстүрлі кілттерді алмастыруда",
      ar: "الأقفال البيومترية تحل محل المفاتيح التقليدية في دول مجلس التعاون الخليجي",
    },
    date: {
      en: "April 2, 2026",
      ru: "2 апреля 2026",
      kk: "2 сәуір 2026",
      ar: "2 أبريل 2026",
    },
    readTime: {
      en: "5 min read",
      ru: "5 мин",
      kk: "5 мин",
      ar: "5 دقائق",
    },
    excerpt: {
      en: "How 3D facial recognition and fingerprint smart locks are transforming access control across luxury residential and commercial developments in Dubai, Abu Dhabi, and Riyadh.",
      ru: "Как 3D-распознавание лиц и биометрические замки меняют контроль доступа в элитной жилой и коммерческой недвижимости Дубая, Абу-Даби и Эр-Рияда.",
      kk: "3D бет-әлпетті тану және саусақ ізін сканерлейтін ақылды құлыптар Дубай, Абу-Даби және Эр-Рияд элиталық тұрғын және коммерциялық жылжымайтын мүліктерінде қолжетімділікті бақылауды қалай өзгертуде.",
      ar: "كيف تُحوّل تقنية التعرف على الوجه ثلاثية الأبعاد والأقفال الذكية ببصمة الإصبع التحكم في الوصول عبر التطوير السكني والتجاري الفاخر في دبي وأبوظبي والرياض.",
    },
    body: {
      en: "The GCC real estate market is undergoing a quiet revolution in access control. Developers and facility managers across Dubai, Abu Dhabi, and Riyadh are systematically phasing out mechanical key systems in favor of biometric smart locks — a shift driven by three converging factors: rising security expectations from high-net-worth residents, the proliferation of short-term rental platforms requiring remote access management, and significant drops in biometric hardware costs over the past 24 months.\n\nGuarded Technology has been at the center of this transition, deploying its Biometric Smart Lock (GT-SL Series) across luxury villa compounds, premium apartment towers, and corporate campuses throughout the region. The GT-SL uses a three-factor authentication stack: 3D structured-light facial recognition (resistant to photo or video spoofing), capacitive fingerprint scanning, and PIN backup — all managed through the Guarded Living mobile app.\n\nThe operational benefits extend beyond security. Property managers report a 73% reduction in lockout incidents, elimination of key duplication risks, and the ability to grant time-limited access to contractors and housekeeping staff remotely — a feature particularly valued in the short-stay villa market. Integration with Leelen video intercom systems adds an additional verification layer at perimeter gates.\n\nIndustry analysts project biometric access control adoption in GCC commercial real estate to reach 68% by 2028, up from an estimated 19% in 2024. The residential segment is moving even faster, driven by smart home platform integrations and tenant demand for keyless living.",
      ru: "Рынок недвижимости стран Персидского залива переживает тихую революцию в сфере контроля доступа. Застройщики и управляющие объектами в Дубае, Абу-Даби и Эр-Рияде систематически отказываются от механических ключей в пользу биометрических умных замков. Этот сдвиг обусловлен тремя факторами: растущими требованиями к безопасности со стороны состоятельных жильцов, распространением платформ краткосрочной аренды и значительным снижением стоимости биометрического оборудования за последние два года.\n\nGuarded Technology занимает центральное место в этом переходе, развертывая биометрические умные замки серии GT-SL в элитных виллах, премиальных апартаментах и корпоративных кампусах по всему региону. GT-SL использует трёхфакторную аутентификацию: 3D-распознавание лиц, сканирование отпечатков пальцев и PIN-код — всё управляется через приложение Guarded Living.\n\nОперационные преимущества выходят за рамки безопасности: управляющие фиксируют снижение числа случаев блокировки на 73%, устранение рисков дублирования ключей и возможность дистанционно предоставлять ограниченный по времени доступ подрядчикам и персоналу.\n\nАналитики прогнозируют, что к 2028 году биометрический контроль доступа охватит 68% коммерческой недвижимости в странах Персидского залива, по сравнению с 19% в 2024 году.",
      kk: "Парсы шығанағы елдері жылжымайтын мүлік нарығы қолжетімділікті бақылауда тыныш революцияны бастан кешіруде. Дубай, Абу-Даби және Эр-Рияддағы девелоперлер мен нысан менеджерлері механикалық кілт жүйелерінен биометриялық ақылды құлыптарға жүйелі түрде көшуде. Бұл ауысуды үш фактор қозғайды: жоғары табысты тұрғындардың қауіпсіздікке деген талаптарының өсуі, қысқа мерзімді жалдау платформаларының таралуы және биометриялық жабдық шығынының соңғы екі жылда айтарлықтай төмендеуі.\n\nGuarded Technology бұл өтпелі кезеңнің орталығында болып, GT-SL сериялы биометриялық ақылды құлыптарды аймақтың бүкіл элиталық вилла кешендерінде, премиум пәтер мұнараларында және корпоративтік кампустарда орналастырды. GT-SL үш факторлы аутентификацияны пайдаланады: 3D бет-әлпетті тану, саусақ ізін сканерлеу және PIN — барлығы Guarded Living мобильді қосымшасы арқылы басқарылады.\n\nСалалық аналитиктер Парсы шығанағы елдерінің коммерциялық жылжымайтын мүлкіндегі биометриялық қолжетімділікті бақылаудың 2028 жылға қарай 68%-ға жетуін болжайды.",
      ar: "يشهد سوق العقارات في منطقة الخليج العربي ثورة هادئة في مجال التحكم في الوصول. يتخلى المطورون ومديرو المرافق في دبي وأبوظبي والرياض بشكل منهجي عن أنظمة المفاتيح الميكانيكية لصالح الأقفال الذكية البيومترية، مدفوعين بثلاثة عوامل متقاطعة: ارتفاع توقعات الأمن من السكان ذوي الثروات العالية، وانتشار منصات التأجير قصير الأجل، وانخفاض ملحوظ في تكاليف الأجهزة البيومترية خلال الأربعة والعشرين شهرًا الماضية.\n\nكانت Guarded Technology في صميم هذا التحول، إذ نشرت قفلها الذكي البيومتري (سلسلة GT-SL) عبر مجمعات الفيلات الفاخرة وأبراج الشقق المتميزة والحرم الجامعية للشركات في جميع أنحاء المنطقة. يستخدم GT-SL مجموعة مصادقة ثلاثية العوامل: التعرف على الوجه بالضوء المنظم ثلاثي الأبعاد، ومسح بصمة الإصبع، وNPIN احتياطي — كل ذلك مُدار عبر تطبيق Guarded Living.\n\nيتوقع المحللون أن يصل اعتماد التحكم في الوصول البيومتري في العقارات التجارية بدول مجلس التعاون الخليجي إلى 68٪ بحلول عام 2028، ارتفاعًا من نسبة تقديرية تبلغ 19٪ في عام 2024.",
    },
  },

  {
    id: "ai-surveillance-central-asia",
    image: "/assets/news/ai-surveillance-central-asia.jpg",
    filterTag: "cat_security",
    category: {
      en: "AI & Surveillance",
      ru: "ИИ и наблюдение",
      kk: "AI және бақылау",
      ar: "الذكاء الاصطناعي والمراقبة",
    },
    title: {
      en: "Central Asia's Safe City Race: How AI Surveillance Is Reshaping Urban Security",
      ru: "Гонка умных городов в Центральной Азии: как ИИ-наблюдение меняет городскую безопасность",
      kk: "Орталық Азияның қауіпсіз қала жарысы: AI бақылауы қалалық қауіпсіздікті қалай өзгертуде",
      ar: "سباق المدن الآمنة في آسيا الوسطى: كيف تُعيد مراقبة الذكاء الاصطناعي تشكيل الأمن الحضري",
    },
    date: {
      en: "March 28, 2026",
      ru: "28 марта 2026",
      kk: "28 наурыз 2026",
      ar: "28 مارس 2026",
    },
    readTime: {
      en: "6 min read",
      ru: "6 мин",
      kk: "6 мин",
      ar: "6 دقائق",
    },
    excerpt: {
      en: "Kazakhstan, Uzbekistan, and Kyrgyzstan are investing heavily in AI-driven public safety infrastructure. Inside the technology choices, data sovereignty requirements, and deployment challenges shaping the region.",
      ru: "Казахстан, Узбекистан и Кыргызстан активно инвестируют в ИИ-инфраструктуру общественной безопасности. Обзор технологических решений, требований суверенитета данных и вызовов развертывания в регионе.",
      kk: "Қазақстан, Өзбекстан және Қырғызстан AI-ға негізделген қоғамдық қауіпсіздік инфрақұрылымына белсенді инвестиция салуда. Аймақтағы технологиялық таңдаулар, деректер егемендігі талаптары мен орналастыру қиындықтарына шолу.",
      ar: "تستثمر كازاخستان وأوزبكستان وقيرغيزستان بشكل مكثف في البنية التحتية للسلامة العامة المدعومة بالذكاء الاصطناعي. نظرة داخلية على الخيارات التكنولوجية ومتطلبات سيادة البيانات وتحديات النشر التي تشكل المنطقة.",
    },
    body: {
      en: "Across Central Asia, governments are accelerating investment in AI-powered public safety infrastructure at a pace that has few parallels globally. Kazakhstan alone has allocated over $380 million to its national Safe City program through 2027, with Uzbekistan and Kyrgyzstan launching parallel initiatives covering urban surveillance, traffic management, and emergency response systems.\n\nThe technology requirements in this region differ meaningfully from Western deployments. Data sovereignty is non-negotiable: national legislation in Kazakhstan mandates that all video surveillance footage from public infrastructure must be stored on domestic servers, with zero transmission to foreign cloud platforms. This regulatory environment has made vendors with genuine on-premise and local cloud capabilities — rather than those relying on hyperscaler backends — the only viable partners for government contracts.\n\nGuarded Technology's position in this market stems directly from its partnership with QAX, whose SOCaaS infrastructure is purpose-built for strict data localization. The combination of Guarded Vision IPC cameras with edge-AI processing and QAX's on-premise security operations platform eliminates the data sovereignty risk entirely — footage is processed at the camera level and stored locally, with no cross-border transfer at any point in the pipeline.\n\nDeployment at scale has surfaced practical challenges: extreme temperature ranges (-40°C winters, +40°C summers), dust and humidity variance across urban and steppe environments, and connectivity gaps outside major cities. Guarded Energy's solar-powered camera stations have emerged as the answer for remote municipal locations where grid power is unavailable or unreliable.\n\nThe region's Safe City buildout is expected to generate $1.2 billion in security technology procurement across Central Asia between 2025 and 2028 — making it one of the highest-growth markets globally for enterprise surveillance infrastructure.",
      ru: "По всей Центральной Азии правительства ускоряют инвестиции в ИИ-инфраструктуру общественной безопасности темпами, которым мало аналогов в мире. Только Казахстан выделил более $380 млн на национальную программу «Безопасный город» до 2027 года, а Узбекистан и Кыргызстан запустили параллельные инициативы в области городского наблюдения, управления трафиком и экстренного реагирования.\n\nТребования к технологиям в этом регионе существенно отличаются от западных. Суверенитет данных — не предмет переговоров: законодательство Казахстана обязывает хранить записи всех публичных камер на национальных серверах без передачи в зарубежные облака. Это делает единственными подходящими партнёрами тех вендоров, которые обеспечивают реальное локальное развёртывание без зависимости от зарубежных облачных платформ.\n\nПозиции Guarded Technology на этом рынке обусловлены партнёрством с QAX, чья инфраструктура SOCaaS создана с учётом строгих требований локализации данных. Сочетание IP-камер Guarded Vision с периферийным ИИ и локальной платформой безопасности QAX полностью устраняет риски суверенитета данных.\n\nМасштабное развёртывание выявило практические трудности: экстремальные перепады температур, пыль и влажность, а также пробелы в покрытии связью за пределами крупных городов. Солнечные камерные станции Guarded Energy стали решением для удалённых муниципальных объектов, где сетевое электроснабжение недоступно.",
      kk: "Бүкіл Орталық Азия бойынша үкіметтер AI-ға негізделген қоғамдық қауіпсіздік инфрақұрылымына инвестицияны жеделдетуде. Жалғыз Қазақстан 2027 жылға дейін ұлттық «Қауіпсіз қала» бағдарламасына $380 млн-нан астам қаражат бөлді, ал Өзбекстан мен Қырғызстан қалалық бақылау, трафикті басқару және төтенше жауап беру жүйелерін қамтитын параллель бастамаларды іске қосты.\n\nОсы аймақтағы технологиялық талаптар батыстың орналастырулардан айтарлықтай ерекшеленеді. Деректер егемендігі — бұл келіссөздер тақырыбы емес: Қазақстан заңнамасы қоғамдық инфрақұрылымдардың барлық бейнебақылау жазбаларын шет елдік бұлт платформаларына тасымалдамастан ұлттық серверлерде сақтауды міндеттейді.\n\nGuarded Technology-дің осы нарықтағы позициясы QAX-пен серіктестіктен туындайды, оның SOCaaS инфрақұрылымы деректерді қатаң оқшаулауға арналған. Шеткі AI-мен Guarded Vision IPC камераларын QAX-тың жергілікті платформасымен біріктіру деректер егемендігі тәуекелін толығымен жояды.",
      ar: "تعمل الحكومات عبر آسيا الوسطى على تسريع الاستثمار في البنية التحتية للسلامة العامة المدعومة بالذكاء الاصطناعي بوتيرة لا مثيل لها على مستوى العالم. خصصت كازاخستان وحدها أكثر من 380 مليون دولار لبرنامج المدينة الآمنة الوطني حتى عام 2027، فيما أطلقت أوزبكستان وقيرغيزستان مبادرات موازية تشمل المراقبة الحضرية وإدارة حركة المرور وأنظمة الاستجابة للطوارئ.\n\nتختلف المتطلبات التكنولوجية في هذه المنطقة اختلافًا جوهريًا عن نظيراتها الغربية. سيادة البيانات غير قابلة للتفاوض: تُلزم التشريعات الكازاخستانية بتخزين جميع لقطات المراقبة من البنية التحتية العامة على خوادم محلية، دون نقل إلى منصات سحابية أجنبية. هذا البيئة التنظيمية جعلت الموردين القادرين على النشر المحلي الحقيقي الشركاء الوحيدين الممكنين لعقود الحكومة.\n\nيُتوقع أن يُولّد بناء المدن الآمنة في المنطقة 1.2 مليار دولار من مشتريات تقنيات الأمن عبر آسيا الوسطى بين عامَي 2025 و2028.",
    },
  },

  {
    id: "solar-extreme-climate",
    image: "/assets/news/solar-cctv.jpg",
    filterTag: "cat_energy",
    category: {
      en: "Energy & Infrastructure",
      ru: "Энергетика и инфраструктура",
      kk: "Энергетика және инфрақұрылым",
      ar: "الطاقة والبنية التحتية",
    },
    title: {
      en: "Next-Generation Battery Storage Is Making Off-Grid Security Viable in Extreme Climates",
      ru: "Аккумуляторные системы нового поколения делают автономную безопасность реальной в экстремальных климатических условиях",
      kk: "Жаңа буын батарея сақтауы экстремалды климатта автономды қауіпсіздікті мүмкін етуде",
      ar: "تخزين البطاريات من الجيل التالي يجعل الأمن المستقل عن الشبكة ممكنًا في المناخات القاسية",
    },
    date: {
      en: "March 10, 2026",
      ru: "10 марта 2026",
      kk: "10 наурыз 2026",
      ar: "10 مارس 2026",
    },
    readTime: {
      en: "5 min read",
      ru: "5 мин",
      kk: "5 мин",
      ar: "5 دقائق",
    },
    excerpt: {
      en: "From sub-Saharan heat to Central Asian winters, advances in lithium iron phosphate battery technology are unlocking 24/7 surveillance in locations where grid power has never been an option.",
      ru: "От жары Сахары до центральноазиатских зим: прогресс в технологии литий-железо-фосфатных аккумуляторов открывает круглосуточное наблюдение в местах, где сетевое электроснабжение никогда не было доступным.",
      kk: "Сахара астындағы ыстықтан Орталық Азия қысына дейін: литий-темір-фосфат батарея технологиясындағы жетістіктер электр желісі ешқашан болмаған жерлерде тәулік бойы бақылауды ашуда.",
      ar: "من حرارة أفريقيا جنوب الصحراء إلى شتاء آسيا الوسطى، تفتح التطورات في تقنية بطاريات ليثيوم حديد الفوسفات إمكانية المراقبة على مدار الساعة في مواقع لم تكن فيها الطاقة الشبكية خيارًا متاحًا.",
    },
    body: {
      en: "For decades, the hardest problem in remote security was not the camera — it was the power. Running grid electricity to a mining checkpoint in the Kazakh steppe, a pipeline monitoring station in sub-Saharan Africa, or a border crossing in the Kyzylkum desert has never been economically viable. The only alternative was diesel generation, with its logistics burden, fuel theft risk, and maintenance overhead.\n\nLithium iron phosphate (LFP) battery technology has changed the equation. Unlike the lithium-ion cells used in consumer electronics, LFP chemistry offers stable performance across a temperature range of -30°C to +60°C, a cycle life exceeding 3,000 full charge-discharge cycles, and significantly lower fire risk — critical factors for unattended deployments in remote environments.\n\nGuarded Energy's second-generation solar surveillance stations pair high-efficiency monocrystalline photovoltaic panels with LFP battery banks sized for 96-hour autonomy under zero-sun conditions. The system's power management controller actively adjusts camera operating modes and transmission frequency based on battery state, ensuring uninterrupted recording even through extended overcast periods common in Central Asian winters.\n\nField data from deployments across 14 countries shows an average system uptime of 99.4% over 18-month tracking periods. In the most demanding environment tested — a gold mining operation in northern Kazakhstan with winter temperatures reaching -38°C — the stations maintained full operational status throughout two consecutive winters without any intervention.\n\nThe economics have shifted decisively. With installation costs recovered within an average of 11 months through eliminated diesel expenditure and reduced guard requirements, off-grid solar surveillance is now the default specification for greenfield industrial security projects across Africa and Central Asia.",
      ru: "На протяжении десятилетий главной проблемой удалённой безопасности была не камера, а электроснабжение. Прокладка сетевого кабеля к горнодобывающему контрольно-пропускному пункту в казахстанской степи или мониторинговой станции трубопровода в Африке никогда не была экономически целесообразной.\n\nТехнология литий-железо-фосфатных аккумуляторов изменила расчёты. В отличие от литий-ионных элементов, LFP-химия обеспечивает стабильную работу в диапазоне от -30°C до +60°C, ресурс более 3000 циклов заряда-разряда и значительно меньший риск возгорания — критически важные факторы для необслуживаемых объектов.\n\nСолнечные станции наблюдения второго поколения Guarded Energy объединяют высокоэффективные монокристаллические фотоэлектрические панели с LFP-аккумуляторами, рассчитанными на 96-часовую автономность в условиях нулевого солнца.\n\nПолевые данные по 14 странам показывают среднее время бесперебойной работы системы 99,4% за 18-месячные периоды наблюдения. В наиболее суровых условиях — на золотодобывающем предприятии на севере Казахстана при зимних температурах до -38°C — станции сохраняли полную работоспособность в течение двух последовательных зим без какого-либо вмешательства.",
      kk: "Ондаған жыл бойы қашықтағы қауіпсіздіктің ең қиын мәселесі камера емес, қуат болды. Қазақстан даласындағы тау-кен бекетіне немесе Африкадағы құбыр мониторингі станциясына желілік электр тарту ешқашан экономикалық тұрғыдан тиімді болмады.\n\nЛитий-темір-фосфат (LFP) батарея технологиясы есептеуді өзгертті. Тұтынушылық электроникада қолданылатын литий-ионды элементтерден айырмашылығы, LFP химиясы -30°C-тан +60°C-қа дейінгі температура диапазонында тұрақты жұмысты, 3000-нан астам толық зарядтау-разрядтау циклінің мерзімін және айтарлықтай төмен өрт қаупін ұсынады.\n\nGuarded Energy-дің екінші буын күн бақылау станциялары жоғары тиімді монокристалды фотоэлектрлік панельдерді нөл-күн жағдайында 96 сағаттық автономия үшін есептелген LFP батарея жинақтарымен жұптайды.\n\n14 елдегі орналастырулардан алынған далалық деректер 18 айлық бақылау кезеңдері бойынша орташа жүйе жұмыс уақытының 99,4% екенін көрсетеді.",
      ar: "على مدى عقود، لم تكن المشكلة الأصعب في الأمن عن بُعد هي الكاميرا، بل كانت الطاقة. لم يكن من المجدي اقتصاديًا توصيل الكهرباء الشبكية إلى نقطة تفتيش منجم في سهوب كازاخستان أو محطة مراقبة خطوط أنابيب في أفريقيا جنوب الصحراء.\n\nغيّرت تقنية بطاريات ليثيوم حديد الفوسفات (LFP) المعادلة. توفر كيمياء LFP أداءً مستقرًا عبر نطاق درجة حرارة من -30°C إلى +60°C، وعمرًا للدورة يتجاوز 3000 دورة شحن وتفريغ كاملة، ومخاطر حريق أقل بكثير — وهي عوامل حاسمة للنشر غير المراقب في البيئات النائية.\n\nتجمع محطات المراقبة الشمسية من الجيل الثاني من Guarded Energy بين الألواح الكهروضوئية أحادية البلورة عالية الكفاءة وبنوك بطاريات LFP المصممة لاستقلالية 96 ساعة في ظروف الصفر شمسي. تُظهر بيانات الميدان من عمليات النشر عبر 14 دولة متوسط وقت تشغيل للنظام يبلغ 99.4٪.",
    },
  },

  {
    id: "socaas-enterprise-shift",
    image: "/assets/news/socaas-enterprise.jpg",
    filterTag: "cat_cyber",
    category: {
      en: "Cybersecurity",
      ru: "Кибербезопасность",
      kk: "Киберқауіпсіздік",
      ar: "الأمن السيبراني",
    },
    title: {
      en: "Why Enterprises Are Moving Security Operations In-House — and Why Most Fail Without the Right Partner",
      ru: "Почему предприятия переводят операции безопасности внутрь и почему большинство терпит неудачу без правильного партнёра",
      kk: "Неліктен кәсіпорындар қауіпсіздік операцияларын ішке ауыстыруда — және неліктен дұрыс серіктессіз көпшілігі сәтсіздікке ұшырайды",
      ar: "لماذا تنقل الشركات عمليات الأمن إلى الداخل — ولماذا يفشل معظمها بدون الشريك المناسب",
    },
    date: {
      en: "January 22, 2026",
      ru: "22 января 2026",
      kk: "22 қаңтар 2026",
      ar: "22 يناير 2026",
    },
    readTime: {
      en: "7 min read",
      ru: "7 мин",
      kk: "7 мин",
      ar: "7 دقائق",
    },
    excerpt: {
      en: "The post-pandemic surge in cyberattacks has pushed enterprise boards to demand dedicated Security Operations Centers. But building a real SOC is harder than it looks — and the gap between a genuine capability and a compliance checkbox is wider than most realize.",
      ru: "Постпандемический рост кибератак вынудил корпоративные советы требовать создания выделенных центров операций безопасности. Но построить настоящий SOC сложнее, чем кажется.",
      kk: "Пандемиядан кейінгі кибершабуылдардың өсуі корпоративтік кеңестерді арнайы Қауіпсіздік операциялары орталықтарын талап етуге мәжбүр етті. Бірақ нақты SOC құру ойлағаннан қиынырақ.",
      ar: "دفعت موجة الهجمات الإلكترونية التي أعقبت الجائحة مجالس الشركات إلى المطالبة بمراكز عمليات أمنية مخصصة. لكن بناء مركز عمليات أمني حقيقي أصعب مما يبدو.",
    },
    body: {
      en: "The numbers are stark. Global cybersecurity incidents increased 38% in 2024 compared to the prior year, with the Middle East and Central Asia emerging as two of the fastest-growing attack surfaces globally. Ransomware groups have become increasingly sophisticated in targeting regional energy, logistics, and government sectors — industries where operational disruption carries existential risk.\n\nIn response, enterprise boards across the region have placed Security Operations Centers at the top of their technology investment priorities. The logic is sound: a dedicated SOC provides continuous threat monitoring, rapid incident response, and the institutional memory that reactive security postures lack. The execution, however, is where the gap between intention and capability becomes dangerous.\n\nBuilding a genuine SOC requires more than purchasing a SIEM platform and hiring a team of analysts. It demands a mature threat intelligence ecosystem, continuously updated detection rules, an incident response playbook tested against real attack scenarios, and — critically in markets like Kazakhstan and the UAE — the ability to operate entirely on-premise with no foreign data exposure.\n\nGuarded Cyber's SOCaaS model addresses this gap directly. Rather than selling a software license and leaving the client to build capability around it, the service delivers a fully operational security function: QAX's AI-driven behavioral analysis platform, a proprietary threat intelligence feed covering regional attack patterns, and a response team with direct experience in the attack methodologies targeting Middle Eastern and Central Asian enterprises.\n\nThe on-premise deployment model is a structural advantage, not merely a feature. For clients operating under KNB, NIST, or national data residency frameworks, the ability to localize the entire SOC stack — from log ingestion to threat response — within national borders is the difference between regulatory compliance and exposure.\n\nIndustry data suggests that 67% of enterprise SOC programs fail to achieve meaningful capability within their first two years, primarily due to talent shortages and the difficulty of maintaining current threat intelligence internally. The managed SOCaaS model shifts this risk to the service provider, allowing enterprises to access genuine security operations capability without the organizational overhead of building it from scratch.",
      ru: "Цифры неумолимы. Число киберинцидентов в мире выросло на 38% в 2024 году по сравнению с предыдущим годом, причём Ближний Восток и Центральная Азия стали одними из наиболее быстро растущих полей атак.\n\nВ ответ на это корпоративные советы по всему региону поставили SOC во главу угла технологических инвестиций. Логика понятна: выделенный SOC обеспечивает непрерывный мониторинг угроз, быстрое реагирование на инциденты и институциональную память, которой лишены реактивные подходы к безопасности.\n\nПостроить настоящий SOC — значит нечто большее, чем купить SIEM-платформу и нанять аналитиков. Это требует зрелой экосистемы разведки угроз, постоянно обновляемых правил детекции и способности работать полностью локально без иностранного доступа к данным.\n\nМодель SOCaaS от Guarded Cyber устраняет этот разрыв. Вместо продажи лицензии на ПО сервис предоставляет полноценную функцию безопасности: AI-платформу поведенческого анализа QAX, собственную систему разведки угроз и команду реагирования с опытом работы со схемами атак, направленными против ближневосточных и центральноазиатских предприятий.\n\nОтраслевые данные показывают, что 67% корпоративных программ SOC не достигают реальных возможностей в течение первых двух лет — в первую очередь из-за дефицита кадров и трудности поддержания актуальной разведки угроз.",
      kk: "Сандар қатаң. 2024 жылы жаһандық киберқауіпсіздік инциденттері алдыңғы жылмен салыстырғанда 38%-ға өсті, ал Таяу Шығыс пен Орталық Азия ең жылдам өсіп жатқан шабуыл беттерінің біріне айналды.\n\nЖауап ретінде аймақтың корпоративтік кеңестері Қауіпсіздік операциялары орталықтарын технологиялық инвестициялар басымдықтарының жоғарғы жағына қойды. Логика дұрыс: арнайы SOC үздіксіз қауіп мониторингін, жылдам инцидентке жауап беруді және реактивті қауіпсіздік позицияларында жетіспейтін институционалдық жадыны қамтамасыз етеді.\n\nGuarded Cyber-дің SOCaaS моделі бұл алшақтықты тікелей шешеді. Бағдарламалық қамтамасыз етуге лицензия сатудың орнына, қызмет толыққанды қауіпсіздік функциясын жеткізеді: QAX-тың AI-ға негізделген мінез-құлық талдауы платформасы, аймақтық шабуыл үлгілерін қамтитын меншікті қауіп барлауы және Таяу Шығыс пен Орталық Азия кәсіпорындарын нысанаға алатын шабуыл әдістемелері бойынша тікелей тәжірибесі бар жауап беру тобы.",
      ar: "الأرقام صارخة. ارتفعت الحوادث الإلكترونية العالمية بنسبة 38٪ في عام 2024 مقارنةً بالعام السابق، مع بروز الشرق الأوسط وآسيا الوسطى بوصفهما من أسرع الأسطح البرمجية نموًا على مستوى العالم.\n\nاستجابةً لذلك، وضعت مجالس المؤسسات عبر المنطقة مراكز عمليات الأمن في صدارة أولويات الاستثمار التكنولوجي. المنطق سليم: يوفر مركز عمليات أمني مخصص مراقبة مستمرة للتهديدات، واستجابة سريعة للحوادث، والذاكرة المؤسسية التي تفتقر إليها المواقف الأمنية التفاعلية.\n\nيعالج نموذج SOCaaS من Guarded Cyber هذه الفجوة مباشرةً. بدلاً من بيع ترخيص برمجي وترك العميل لبناء القدرة حوله، تُقدّم الخدمة وظيفة أمنية تشغيلية بالكامل: منصة التحليل السلوكي المدفوعة بالذكاء الاصطناعي من QAX، وخلاصة استخبارات التهديدات الخاصة التي تغطي أنماط الهجوم الإقليمية، وفريق استجابة يتمتع بخبرة مباشرة في منهجيات الهجوم التي تستهدف مؤسسات الشرق الأوسط وآسيا الوسطى.\n\nتشير بيانات الصناعة إلى أن 67٪ من برامج مراكز عمليات الأمن المؤسسية تفشل في تحقيق قدرة حقيقية خلال السنتين الأوليين.",
    },
  },

  {
    id: "zero-day-saas-defense",
    image: "/assets/news/cybersecurity.jpg",
    filterTag: "cat_cyber",
    category: {
      en: "Cybersecurity",
      ru: "Кибербезопасность",
      kk: "Киберқауіпсіздік",
      ar: "الأمن السيبراني",
    },
    title: {
      en: "Defending Against Zero-Day Threats in SaaS Ecosystems",
      ru: "Защита от угроз нулевого дня в SaaS-экосистемах",
      kk: "SaaS экожүйелеріндегі нөлдік күн қауіптерінен қорғау",
      ar: "الدفاع ضد تهديدات اليوم صفر في أنظمة SaaS",
    },
    date: {
      en: "February 10, 2026",
      ru: "10 февраля 2026",
      kk: "10 ақпан 2026",
      ar: "10 فبراير 2026",
    },
    readTime: {
      en: "6 min read",
      ru: "6 мин",
      kk: "6 мин",
      ar: "6 دقائق",
    },
    excerpt: {
      en: "A deep dive into Guarded Cyber's latest SOCaaS protocols for enterprise cloud protection.",
      ru: "Глубокий анализ новейших протоколов SOCaaS от Guarded Cyber для корпоративной облачной защиты.",
      kk: "Guarded Cyber компаниясының кәсіпорын бұлттық қорғанысына арналған соңғы SOCaaS хаттамаларына терең шолу.",
      ar: "نظرة عميقة على أحدث بروتوكولات SOCaaS من Guarded Cyber لحماية السحابة المؤسسية.",
    },
    body: {
      en: "Zero-day vulnerabilities in SaaS platforms pose one of the most critical threats to enterprise security in 2026. Guarded Cyber's Security Operations Center as a Service (SOCaaS) has developed a multi-layered defense strategy combining AI-driven behavioral analysis, real-time threat intelligence feeds, and automated incident response playbooks. In this comprehensive analysis, we break down three recent zero-day attacks that targeted enterprise cloud infrastructure, how our NDR systems detected anomalous network patterns before traditional signature-based tools, and the rapid containment protocols that prevented data exfiltration across our client portfolio.",
      ru: "Уязвимости нулевого дня в SaaS-платформах представляют одну из наиболее критических угроз для корпоративной безопасности в 2026 году. Центр операций безопасности как услуга (SOCaaS) от Guarded Cyber разработал многоуровневую стратегию защиты, сочетающую поведенческий анализ на основе ИИ, потоки разведки угроз в режиме реального времени и автоматизированные сценарии реагирования на инциденты. В этом анализе мы разбираем три недавние атаки нулевого дня, направленные на корпоративную облачную инфраструктуру.",
      kk: "SaaS платформаларындағы нөлдік күн осалдықтары 2026 жылы кәсіпорын қауіпсіздігіне ең маңызды қауіптердің бірін тудырады. Guarded Cyber-дің SOCaaS қызметі ИИ-ге негізделген мінез-құлық талдауы, нақты уақыттағы қауіп барлауы және автоматтандырылған инцидентке жауап беру сценарийлерін біріктіретін көп деңгейлі қорғаныс стратегиясын жасады.",
      ar: "تشكل ثغرات اليوم صفر في منصات SaaS أحد أخطر التهديدات لأمن المؤسسات في عام 2026. طور مركز عمليات الأمن كخدمة (SOCaaS) من Guarded Cyber استراتيجية دفاع متعددة الطبقات تجمع بين التحليل السلوكي المدعوم بالذكاء الاصطناعي، وخلاصات استخبارات التهديدات في الوقت الفعلي، وبروتوكولات الاستجابة للحوادث الآلية. في هذا التحليل الشامل، نستعرض ثلاث هجمات حديثة استهدفت البنية التحتية السحابية للمؤسسات.",
    },
  },
];
