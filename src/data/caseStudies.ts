export type Lang = "en" | "ar" | "ru" | "kk";
export type I18n = Record<Lang, string>;

export type CaseStat = {
  value: string;
  label: I18n;
};

export type CaseStudy = {
  id: string;
  image: string;
  filter: "uae" | "kz" | "africa";
  tagKey: string;    // key in LanguageContext projects section
  titleKey: string;
  locKey: string;
  descKey: string;
  challenge: I18n;
  solution: I18n;
  results: I18n;
  products: I18n[];
  stats: CaseStat[];
};

// ─── Add new case studies here ────────────────────────────────────────────────
export const caseStudies: CaseStudy[] = [
  {
    id: "emirates-hills-villa",
    image: "/assets/projects/uae.jpg",
    filter: "uae",
    tagKey: "tag1",
    titleKey: "title1",
    locKey: "loc1",
    descKey: "desc1",
    challenge: {
      en: "A private client in Emirates Hills required a fully integrated smart home and security ecosystem for an 8,000 m² residential estate. The existing infrastructure had no automation, multiple disconnected security cameras with no AI capability, and physical key-based access across 14 entry points. The client demanded seamless mobile control, visitor management, and enterprise-grade surveillance — all unified on a single platform.",
      ru: "Частный клиент в Emirates Hills запросил полностью интегрированную экосистему умного дома и безопасности для жилого поместья площадью 8 000 м². Существующая инфраструктура не имела автоматизации, несвязанных камер безопасности без возможностей ИИ и доступа по физическому ключу через 14 точек входа. Клиент требовал бесперебойного мобильного управления, системы управления посетителями и наблюдения корпоративного уровня — всё на единой платформе.",
      kk: "Emirates Hills-тегі жеке клиент 8 000 м² тұрғын кеңістігі үшін толық интеграцияланған ақылды үй және қауіпсіздік экожүйесін талап етті. Бар инфрақұрылымда автоматика болмаған, 14 кіру нүктесінде AI мүмкіндігі жоқ байланыссыз қауіпсіздік камералары мен физикалық кілт негізіндегі кіру болды. Клиент бірыңғай платформада мобильді басқаруды, келушілерді басқаруды және кәсіпорындық бақылауды талап етті.",
      ar: "طلب عميل خاص في إمارات هيلز نظام بيئي متكامل للمنزل الذكي والأمن لعقار سكني بمساحة 8000 متر مربع. كانت البنية التحتية الحالية تفتقر إلى أي أتمتة، مع كاميرات أمنية منفصلة بدون قدرات ذكاء اصطناعي ونظام دخول بالمفاتيح التقليدية عبر 14 نقطة دخول. طالب العميل بالتحكم عبر الهاتف المحمول وإدارة الزوار والمراقبة بمستوى مؤسسي — كل ذلك على منصة موحدة.",
    },
    solution: {
      en: "Guarded Technology deployed a fully integrated ecosystem across three layers. Access control: 14 Guarded Biometric Smart Lock units with 3D facial recognition replaced all physical keys, integrated with the Guarded Living mobile app for remote management. Surveillance: 32 Guarded Enterprise IPC cameras with edge-AI covering all perimeter zones, poolside, underground garage, and interior corridors — all feeding into a centralized Guarded NVR with AI-event detection. Smart living: Leelen HD video intercoms at 6 entry gates, Maxhub displays in the main living room and home office for unified control, and full automation of lighting, climate, and curtains through the Guarded Living platform.",
      ru: "Guarded Technology развернула полностью интегрированную экосистему в трёх уровнях. Контроль доступа: 14 биометрических умных замков Guarded с 3D-распознаванием лиц заменили все физические ключи и интегрированы с мобильным приложением Guarded Living для удалённого управления. Видеонаблюдение: 32 IP-камеры Guarded Enterprise с периферийным ИИ охватывают все периметральные зоны, зону бассейна, подземный гараж и внутренние коридоры — все данные поступают в централизованный NVR Guarded с AI-детекцией событий. Умный дом: HD-видеодомофоны Leelen на 6 воротах въезда, дисплеи Maxhub в главной гостиной и домашнем офисе для единого управления, полная автоматизация освещения, климата и штор через платформу Guarded Living.",
      kk: "Guarded Technology үш деңгейде толық интеграцияланған экожүйені орналастырды. Қолжетімділікті бақылау: 3D бет-әлпетті тануы бар 14 Guarded биометриялық ақылды құлып барлық физикалық кілттерді алмастырды, қашықтан басқару үшін Guarded Living мобильді қосымшасымен біріктірілді. Бейнебақылау: шеткі AI бар 32 Guarded Enterprise IPC камера барлық периметрлік аймақтарды, бассейн жанын, жерасты гаражын және ішкі дәліздерді қамтиды. Ақылды тұрмыс: 6 кіру қақпасында Leelen HD бейне домофондары, бас қонақ бөлмесі мен үй кеңсесінде Maxhub дисплейлері, Guarded Living арқылы жарықтандыру, климат пен перделердің толық автоматтандырылуы.",
      ar: "نشرت Guarded Technology نظامًا بيئيًا متكاملًا بالكامل عبر ثلاث طبقات. التحكم في الوصول: استبدلت 14 وحدة Guarded Biometric Smart Lock بتقنية التعرف على الوجه ثلاثية الأبعاد جميع المفاتيح المادية، متكاملة مع تطبيق Guarded Living للإدارة عن بعد. المراقبة: 32 كاميرا Guarded Enterprise IPC بذكاء اصطناعي طرفي تغطي جميع مناطق المحيط والمسبح والمرأب تحت الأرض والممرات الداخلية. المنزل الذكي: اتصالات داخلية بالفيديو عالية الدقة من Leelen عند 6 بوابات دخول، وشاشات Maxhub في غرفة المعيشة الرئيسية والمكتب المنزلي.",
    },
    results: {
      en: "The estate now operates as a fully autonomous smart security environment. All 14 entry points are keyless and managed remotely. The AI surveillance system generates automated alerts for perimeter breaches, unknown faces, and vehicle anomalies — with average detection-to-alert time under 4 seconds. The client controls the entire estate — cameras, locks, climate, and intercoms — from a single mobile app. The project was completed within 6 weeks and has been operating with zero security incidents since deployment.",
      ru: "Поместье теперь работает как полностью автономная среда умной безопасности. Все 14 точек входа работают без ключей и управляются удалённо. Система ИИ-наблюдения генерирует автоматические оповещения при нарушении периметра, неизвестных лицах и аномалиях транспортных средств — среднее время от обнаружения до оповещения менее 4 секунд. Клиент управляет всем поместьем — камерами, замками, климатом и домофонами — из единого мобильного приложения. Проект был завершён за 6 недель и работает без инцидентов с момента запуска.",
      kk: "Мүлік енді толық автономды ақылды қауіпсіздік ортасы ретінде жұмыс істейді. 14 кіру нүктесінің барлығы кілтсіз және қашықтан басқарылады. AI бақылау жүйесі периметр бұзылуы, белгісіз беттер және көлік аномалиялары үшін автоматты ескертулер жасайды — анықтаудан ескертуге дейінгі орташа уақыт 4 секундтан аз. Клиент бүкіл мүлікті — камераларды, құлыптарды, климатты және домофондарды — бір мобильді қосымшадан басқарады.",
      ar: "تعمل العقارة الآن كبيئة أمنية ذكية مستقلة بالكامل. جميع نقاط الدخول الـ 14 بدون مفاتيح وتُدار عن بعد. يولد نظام المراقبة بالذكاء الاصطناعي تنبيهات آلية لاختراقات المحيط والوجوه غير المعروفة وشذوذات المركبات — بمتوسط وقت اكتشاف إلى تنبيه أقل من 4 ثوانٍ. يتحكم العميل في العقارة بأكملها — الكاميرات والأقفال والمناخ والاتصالات الداخلية — من تطبيق جوال واحد.",
    },
    products: [
      { en: "Guarded Biometric Smart Lock (GT-SL Series)", ru: "Биометрический умный замок Guarded (серия GT-SL)", kk: "Guarded биометриялық ақылды құлып (GT-SL сериясы)", ar: "قفل Guarded الذكي البيومتري (سلسلة GT-SL)" },
      { en: "Guarded Enterprise IPC Cameras (GT-IPC-B38 / GT-IPC-T26)", ru: "IP-камеры Guarded Enterprise (GT-IPC-B38 / GT-IPC-T26)", kk: "Guarded Enterprise IPC камералар (GT-IPC-B38 / GT-IPC-T26)", ar: "كاميرات Guarded Enterprise IPC (GT-IPC-B38 / GT-IPC-T26)" },
      { en: "Guarded NVR (GT-NVR3216P)", ru: "Сетевой видеорегистратор Guarded (GT-NVR3216P)", kk: "Guarded желілік бейне тіркеуіш (GT-NVR3216P)", ar: "مسجل الفيديو الشبكي Guarded (GT-NVR3216P)" },
      { en: "LEELEN HD Video Intercom System", ru: "HD-видеодомофонная система LEELEN", kk: "LEELEN HD бейне домофон жүйесі", ar: "نظام الاتصال الداخلي بالفيديو عالي الدقة LEELEN" },
      { en: "MAXHUB Smart Display", ru: "Умный дисплей MAXHUB", kk: "MAXHUB ақылды дисплей", ar: "شاشة MAXHUB الذكية" },
    ],
    stats: [
      { value: "32", label: { en: "AI cameras deployed", ru: "ИИ-камер установлено", kk: "AI камера орнатылды", ar: "كاميرا AI منتشرة" } },
      { value: "14", label: { en: "Keyless entry points", ru: "Бесключевых точек входа", kk: "Кілтсіз кіру нүктелері", ar: "نقطة دخول بدون مفاتيح" } },
      { value: "<4s", label: { en: "Alert response time", ru: "Время реакции на оповещение", kk: "Ескерту жауап уақыты", ar: "وقت استجابة التنبيه" } },
      { value: "6w", label: { en: "Project delivery", ru: "Срок реализации", kk: "Жоба мерзімі", ar: "تسليم المشروع" } },
    ],
  },

  {
    id: "safe-city-kazakhstan",
    image: "/assets/projects/kz.jpg",
    filter: "kz",
    tagKey: "tag2",
    titleKey: "title2",
    locKey: "loc2",
    descKey: "desc2",
    challenge: {
      en: "The Ministry of Internal Affairs of Kazakhstan launched a public safety modernization program across government buildings, schools, and public spaces in Almaty and Astana. Existing analog camera networks were outdated, lacked any AI or analytics capabilities, and had no centralized monitoring infrastructure. Response to incidents relied entirely on manual patrol — with average response times exceeding 18 minutes. The program required scalable AI-powered surveillance with full data sovereignty, as all footage had to remain on national servers under strict KNB compliance.",
      ru: "Министерство внутренних дел Казахстана запустило программу модернизации общественной безопасности в государственных учреждениях, школах и общественных пространствах Алматы и Астаны. Существующие аналоговые камерные сети устарели, не обладали никакими возможностями ИИ или аналитики и не имели централизованной инфраструктуры мониторинга. Реагирование на инциденты полностью зависело от ручного патрулирования — среднее время реагирования превышало 18 минут. Программа требовала масштабируемого видеонаблюдения с ИИ и полным суверенитетом данных в соответствии с требованиями КНБ.",
      kk: "Қазақстан Ішкі істер министрлігі Алматы мен Астанадағы мемлекеттік мекемелерде, мектептерде және қоғамдық кеңістіктерде қоғамдық қауіпсіздікті жаңғырту бағдарламасын іске қосты. Бар аналогтық камера желілері ескірген, AI немесе аналитика мүмкіндіктері жоқ болатын. Инциденттерге жауап беру толығымен қолмен патрульдеуге негізделген — орташа жауап беру уақыты 18 минуттан асты. Бағдарлама ҰҚК талаптарына сәйкес деректер егемендігімен AI-күшейтілген бақылауды талап етті.",
      ar: "أطلقت وزارة الداخلية الكازاخستانية برنامجًا لتحديث الأمن العام في المباني الحكومية والمدارس والأماكن العامة في ألماتي وأستانا. كانت شبكات الكاميرات التناظرية القائمة قديمة، وتفتقر إلى أي قدرات للذكاء الاصطناعي أو التحليلات، وليس لديها بنية تحتية مركزية للمراقبة. تطلب البرنامج مراقبة قابلة للتوسع مدعومة بالذكاء الاصطناعي مع سيادة كاملة للبيانات وفقًا للوائح KNB الصارمة.",
    },
    solution: {
      en: "Guarded Technology deployed a phased AI surveillance rollout across 15 schools and 8 government facilities. Hardware: 340 Guarded Enterprise IPC cameras (GT-IPC-B38-IL(E) and GT-IPC-T26-L-X) with edge-AI for real-time facial recognition, crowd density analysis, and perimeter violation detection. Backend: 12 Guarded NVR units feeding into a centralized monitoring center with 24/7 operator oversight. Cybersecurity: QAX SOCaaS platform integrated to protect the surveillance network with full on-premise data localization — all footage stored on dedicated national servers with zero cross-border transfer. The system also includes automated school zone protection with alerts triggered by unauthorized vehicle access during school hours.",
      ru: "Guarded Technology развернула поэтапное внедрение ИИ-наблюдения в 15 школах и 8 государственных учреждениях. Оборудование: 340 IP-камер Guarded Enterprise (GT-IPC-B38-IL(E) и GT-IPC-T26-L-X) с периферийным ИИ для распознавания лиц в реальном времени, анализа плотности толпы и обнаружения нарушений периметра. Backend: 12 NVR Guarded, передающих данные в централизованный центр мониторинга с круглосуточным операторским надзором. Кибербезопасность: платформа QAX SOCaaS для защиты сети наблюдения с полной локализацией данных на национальных серверах без трансграничной передачи.",
      kk: "Guarded Technology 15 мектеп пен 8 мемлекеттік мекемеде кезеңді AI бақылауды орналастырды. Жабдық: нақты уақыттағы бет-әлпетті тану, топтың тығыздығын талдау және периметр бұзылуын анықтау үшін шеткі AI бар 340 Guarded Enterprise IPC камера. Backend: тәулік бойы операторлық бақылауы бар орталықтандырылған бақылау орталығына деректер беретін 12 Guarded NVR. Киберқауіпсіздік: шекарадан тыс тасымалсыз ұлттық серверлерде деректерді толық оқшаулаумен бақылау желісін қорғау үшін QAX SOCaaS платформасы.",
      ar: "نشرت Guarded Technology نشرًا تدريجيًا لمراقبة الذكاء الاصطناعي عبر 15 مدرسة و8 مرافق حكومية. الأجهزة: 340 كاميرا Guarded Enterprise IPC بذكاء اصطناعي طرفي للتعرف على الوجه في الوقت الفعلي وتحليل كثافة الحشود والكشف عن انتهاكات المحيط. الخلفية: 12 وحدة Guarded NVR تُغذي مركز مراقبة مركزيًا مع إشراف المشغلين على مدار الساعة. الأمن السيبراني: منصة QAX SOCaaS لحماية شبكة المراقبة مع توطين كامل للبيانات على الخوادم الوطنية.",
    },
    results: {
      en: "The program achieved a 67% reduction in average incident response time — from 18 minutes to under 6 minutes — within the first three months of operation. AI-driven anomaly detection identified 1,200+ security events in the first year that would have been missed by manual patrol. All 23 sites now operate under a unified monitoring dashboard accessible to designated law enforcement personnel. The project set a national benchmark and prompted expansion discussions for an additional 40 facilities across Kazakhstan in 2026.",
      ru: "Программа достигла сокращения среднего времени реагирования на инциденты на 67% — с 18 минут до менее 6 минут — в течение первых трёх месяцев работы. ИИ-детекция аномалий выявила более 1 200 событий безопасности в первый год, которые были бы пропущены при ручном патрулировании. Все 23 объекта теперь работают под единой панелью мониторинга, доступной назначенным сотрудникам правоохранительных органов. Проект установил национальный эталон и инициировал переговоры о расширении на дополнительные 40 объектов по Казахстану в 2026 году.",
      kk: "Бағдарлама жұмыстың алғашқы үш айында орташа инцидентке жауап беру уақытын 67%-ға қысқартты — 18 минуттан 6 минутқа дейін. AI аномалияны анықтау бірінші жылда қолмен патрульдеу кезінде жіберіп алынатын 1200-ден астам қауіпсіздік оқиғасын анықтады. Барлық 23 нысан енді белгіленген құқық қорғау қызметкерлеріне қолжетімді бірыңғай бақылау бақылау тақтасы арқылы жұмыс істейді.",
      ar: "حقق البرنامج انخفاضًا بنسبة 67٪ في متوسط وقت الاستجابة للحوادث — من 18 دقيقة إلى أقل من 6 دقائق — خلال الأشهر الثلاثة الأولى من التشغيل. حدد اكتشاف الشذوذ المدعوم بالذكاء الاصطناعي أكثر من 1200 حدث أمني في السنة الأولى كان سيتم تفويتها بالدوريات اليدوية. تعمل جميع المواقع الـ 23 الآن تحت لوحة مراقبة موحدة.",
    },
    products: [
      { en: "Guarded Enterprise IPC Cameras (GT-IPC-B38-IL(E), GT-IPC-T26-L-X)", ru: "IP-камеры Guarded Enterprise (GT-IPC-B38-IL(E), GT-IPC-T26-L-X)", kk: "Guarded Enterprise IPC камералар (GT-IPC-B38-IL(E), GT-IPC-T26-L-X)", ar: "كاميرات Guarded Enterprise IPC (GT-IPC-B38-IL(E), GT-IPC-T26-L-X)" },
      { en: "Guarded NVR (GT-NVR2108-8P)", ru: "Сетевой видеорегистратор Guarded (GT-NVR2108-8P)", kk: "Guarded желілік бейне тіркеуіш (GT-NVR2108-8P)", ar: "مسجل الفيديو الشبكي Guarded (GT-NVR2108-8P)" },
      { en: "QAX SOCaaS — Cybersecurity & Data Localization Platform", ru: "QAX SOCaaS — платформа кибербезопасности и локализации данных", kk: "QAX SOCaaS — киберқауіпсіздік және деректерді оқшаулау платформасы", ar: "QAX SOCaaS — منصة الأمن السيبراني وتوطين البيانات" },
    ],
    stats: [
      { value: "340", label: { en: "AI cameras installed", ru: "ИИ-камер установлено", kk: "AI камера орнатылды", ar: "كاميرا AI مثبتة" } },
      { value: "23", label: { en: "Sites secured", ru: "Объектов защищено", kk: "Нысан қорғалды", ar: "موقع محمي" } },
      { value: "−67%", label: { en: "Response time reduction", ru: "Сокращение времени реагирования", kk: "Жауап беру уақытының азаюы", ar: "تخفيض وقت الاستجابة" } },
      { value: "1,200+", label: { en: "Incidents detected (yr 1)", ru: "Инцидентов выявлено (1-й год)", kk: "Анықталған оқиғалар (1-жыл)", ar: "حادثة تم اكتشافها (السنة 1)" } },
    ],
  },

  {
    id: "remote-solar-africa",
    image: "/assets/projects/africa.jpg",
    filter: "africa",
    tagKey: "tag3",
    titleKey: "title3",
    locKey: "loc3",
    descKey: "desc3",
    challenge: {
      en: "A multinational mining operator running extraction sites in Kenya and Nigeria faced severe security challenges across locations with no access to power grids and limited connectivity. Equipment theft, unauthorized access, and perimeter breaches were causing operational losses exceeding $2M annually. Traditional wired CCTV was not viable due to the absence of electrical infrastructure, and guards-only solutions had proven insufficient for the scale and remoteness of the sites.",
      ru: "Многонациональный горнодобывающий оператор, управляющий добывающими объектами в Кении и Нигерии, столкнулся с серьёзными проблемами безопасности в местах без доступа к электросетям и с ограниченной связью. Кражи оборудования, несанкционированный доступ и нарушения периметра приводили к операционным потерям, превышающим $2 млн в год. Традиционное проводное видеонаблюдение не было реализуемо из-за отсутствия электрической инфраструктуры, а решения только с охранниками оказались недостаточными для масштаба и удалённости объектов.",
      kk: "Кения мен Нигериядағы өндіру алаңдарын басқаратын көпұлтты тау-кен операторы электр жүйелері мен шектеулі байланысы жоқ жерлерде ауыр қауіпсіздік мәселелерімен бетпе-бет келді. Жабдықты ұрлау, рұқсатсыз кіру және периметр бұзылуы жылдық $2 млн-нан асатын операциялық шығынға әкелді. Электр инфрақұрылымының болмауынан дәстүрлі кабельді CCTV мүмкін болмады.",
      ar: "واجه مشغل تعدين متعدد الجنسيات يدير مواقع استخراج في كينيا ونيجيريا تحديات أمنية حادة عبر مواقع لا يوجد فيها وصول إلى شبكات الكهرباء واتصالات محدودة. كانت سرقة المعدات والوصول غير المصرح به واختراقات المحيط تسبب خسائر تشغيلية تتجاوز 2 مليون دولار سنويًا. لم يكن CCTV السلكي التقليدي ممكنًا بسبب غياب البنية التحتية الكهربائية.",
    },
    solution: {
      en: "Guarded Energy designed and deployed a fully off-grid solar CCTV network across 6 remote sites. Each station features Guarded Solar AI Surveillance cameras (GT-CS5 4G series) mounted on self-contained solar towers with high-efficiency photovoltaic panels and extended-capacity lithium battery storage for 96-hour autonomy in zero-sun conditions. Video is transmitted in real-time via 4G/LTE directly to a centralized security operations center. AI edge-processing on each unit detects unauthorized personnel, vehicle intrusions, and perimeter breaches within seconds — without requiring cloud connectivity. Voltis Online UPS units protect monitoring hub equipment at the central command center against power fluctuations.",
      ru: "Guarded Energy спроектировала и развернула полностью автономную солнечную сеть CCTV на 6 удалённых объектах. Каждая станция оснащена камерами Guarded Solar AI Surveillance (серия GT-CS5 4G), установленными на автономных солнечных вышках с высокоэффективными фотоэлектрическими панелями и литиевыми аккумуляторами расширенной ёмкости для 96-часовой автономии в условиях нулевого солнца. Видео передаётся в режиме реального времени по 4G/LTE непосредственно в централизованный центр управления безопасностью. Периферийная AI-обработка на каждом устройстве обнаруживает несанкционированный персонал, вторжения транспортных средств и нарушения периметра за считанные секунды — без облачного подключения.",
      kk: "Guarded Energy 6 қашықтағы нысанда толық автономды күн CCTV желісін жобалап орналастырды. Әр станцияда нөл-күн жағдайында 96 сағаттық автономия үшін жоғары тиімді фотоэлектрлік панельдер мен кеңейтілген сыйымдылықты литий батареялары бар автономды күн мұнараларына орнатылған Guarded Solar AI бақылау камералары (GT-CS5 4G сериясы) бар. Бейне нақты уақытта 4G/LTE арқылы орталықтандырылған қауіпсіздік операциялары орталығына тікелей берілді.",
      ar: "صممت Guarded Energy ونشرت شبكة CCTV شمسية مستقلة بالكامل عبر 6 مواقع نائية. تتميز كل محطة بكاميرات Guarded Solar AI Surveillance (سلسلة GT-CS5 4G) مركبة على أبراج شمسية مكتفية ذاتيًا مع ألواح كهروضوئية عالية الكفاءة وتخزين بطاريات ليثيوم ذات سعة موسعة لاستقلالية 96 ساعة في ظروف الصفر شمسي. يُنقل الفيديو في الوقت الفعلي عبر 4G/LTE مباشرة إلى مركز عمليات أمن مركزي.",
    },
    results: {
      en: "Since deployment, equipment theft across all 6 sites has dropped by 94%. The AI detection system flagged 380+ unauthorized intrusion attempts in the first year, with security teams dispatched in under 7 minutes on average. System uptime across all solar stations has maintained 99.7% — including through two rainy seasons and extended overcast periods. The client recovered the full project cost within 8 months through eliminated theft losses and reduced on-site guard requirements. The solution has since been replicated across 3 additional mining sites in West Africa.",
      ru: "С момента развёртывания кражи оборудования на всех 6 объектах сократились на 94%. Система AI-обнаружения зафиксировала более 380 попыток несанкционированного проникновения в первый год, при этом группы безопасности выехали в среднем менее чем за 7 минут. Бесперебойность работы всех солнечных станций сохранилась на уровне 99,7% — включая два сезона дождей и продолжительные пасмурные периоды. Клиент окупил все затраты проекта в течение 8 месяцев за счёт устранённых потерь от краж и сокращения потребности в охранниках на местах. Решение было тиражировано на 3 дополнительных горнодобывающих объекта в Западной Африке.",
      kk: "Орналастырудан бері барлық 6 нысандағы жабдықты ұрлау 94%-ға азайды. AI анықтау жүйесі бірінші жылда 380-нен астам рұқсатсыз кіру әрекетін белгіледі, қауіпсіздік топтары орта есеппен 7 минуттан аз уақытта жіберілді. Барлық күн станцияларының жұмыс уақыты 99,7% деңгейінде сақталды. Клиент ұрлықтан болған шығындарды жою арқылы жоба шығынын 8 ай ішінде өтеді.",
      ar: "منذ النشر، انخفضت سرقة المعدات عبر جميع المواقع الـ 6 بنسبة 94٪. رصد نظام الكشف بالذكاء الاصطناعي أكثر من 380 محاولة اقتحام غير مصرح بها في السنة الأولى، مع إيفاد فرق الأمن في أقل من 7 دقائق في المتوسط. حافظ وقت تشغيل النظام عبر جميع المحطات الشمسية على مستوى 99.7٪. استرد العميل التكلفة الكاملة للمشروع في غضون 8 أشهر.",
    },
    products: [
      { en: "Guarded Solar AI Surveillance (GT-CS5 · 4G · 4G-SA)", ru: "Солнечное AI-наблюдение Guarded (GT-CS5 · 4G · 4G-SA)", kk: "Guarded күн AI бақылауы (GT-CS5 · 4G · 4G-SA)", ar: "مراقبة Guarded الشمسية بالذكاء الاصطناعي (GT-CS5 · 4G · 4G-SA)" },
      { en: "Guarded Solar AI Surveillance (GT-AOV04-4G)", ru: "Солнечное AI-наблюдение Guarded (GT-AOV04-4G)", kk: "Guarded күн AI бақылауы (GT-AOV04-4G)", ar: "مراقبة Guarded الشمسية بالذكاء الاصطناعي (GT-AOV04-4G)" },
      { en: "Voltis Online UPS — Command Center Power Protection", ru: "Voltis Online UPS — защита питания командного центра", kk: "Voltis Online UPS — командалық орталық қуатын қорғау", ar: "Voltis Online UPS — حماية الطاقة لمركز القيادة" },
    ],
    stats: [
      { value: "6", label: { en: "Remote sites covered", ru: "Удалённых объектов", kk: "Қашықтағы нысандар", ar: "مواقع نائية مغطاة" } },
      { value: "−94%", label: { en: "Theft reduction", ru: "Снижение краж", kk: "Ұрлықтың азаюы", ar: "انخفاض السرقة" } },
      { value: "99.7%", label: { en: "System uptime", ru: "Бесперебойность системы", kk: "Жүйе жұмыс уақыты", ar: "وقت تشغيل النظام" } },
      { value: "8mo", label: { en: "ROI payback period", ru: "Срок окупаемости", kk: "Өтелу мерзімі", ar: "فترة استرداد الاستثمار" } },
    ],
  },
];
