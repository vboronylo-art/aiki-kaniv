export type Language = 'uk' | 'en';

export interface TranslationDictionary {
  brand: {
    main: string;
    sub: string;
    badge: string;
  };
  nav: {
    cinema: string;
    meditation: string;
    biomechanics: string;
    techniques: string;
    enrollment: string;
    soundOn: string;
    soundOff: string;
    cinemaOn: string;
    cinemaOff: string;
    callSensei: string;
  };
  hero: {
    badge: string;
    senseiName: string;
    locationShort: string;
    title: string;
    subJapanese: string;
    description: string;
    btnStart: string;
    btnCall: string;
    btnMokuso: string;
    btnSchedule: string;
    soundPhrase: string;
  };
  player: {
    locationHeader: string;
    tatamiBadge: string;
    callLabel: string;
    callSenseiBtn: string;
    hudSpeed: string;
    speedSlow: string;
    speedNormal: string;
    hudFilter: string;
    hudBiometrics: string;
    hudBiometricsHide: string;
    hudStepBack: string;
    hudStepForward: string;
    hudPlay: string;
    hudPause: string;
    hudSnapshot: string;
    hudReplay: string;
    hudDrawer: string;
    drawerTitle: string;
    drawerClose: string;
    audioControl: string;
    filters: {
      amber: string;
      sumi: string;
      dusk: string;
      tatami: string;
    };
    audioModal: {
      title: string;
      desc: string;
      master: string;
      tatami: string;
      breath: string;
      nature: string;
      music: string;
      muted: string;
    };
  };
  meditation: {
    kicker: string;
    title: string;
    japaneseSub: string;
    description: string;
    durationLabel: string;
    presets: {
      p1: { label: string; desc: string };
      p2: { label: string; desc: string };
      p3: { label: string; desc: string };
      p4: { label: string; desc: string };
    };
    phases: {
      inhale: string;
      hold: string;
      exhale: string;
      ready: string;
      completed: string;
    };
    soundActive: string;
    btnStart: string;
    btnRestart: string;
    btnPause: string;
    btnResetTooltip: string;
    btnMelody: string;
    completeTitle: string;
    completeDesc: string;
    btnGoToPlayer: string;
    doctrine: string;
    fadeNote: string;
  };
  biomechanics: {
    kicker: string;
    title: string;
    japaneseSub: string;
    description: string;
    tabs: {
      kuzushi: {
        title: string;
        sub: string;
        summary: string;
        p1: string;
        p2: string;
        p3: string;
        diagram: string;
      };
      tenkan: {
        title: string;
        sub: string;
        summary: string;
        p1: string;
        p2: string;
        p3: string;
        diagram: string;
      };
      kokyu: {
        title: string;
        sub: string;
        summary: string;
        p1: string;
        p2: string;
        p3: string;
        diagram: string;
      };
      ukemi: {
        title: string;
        sub: string;
        summary: string;
        p1: string;
        p2: string;
        p3: string;
        diagram: string;
      };
    };
    btnJump: string;
    keyMechanicsLabel: string;
  };
  catalog: {
    kicker: string;
    title: string;
    desc: string;
    fpsInfo: string;
    locationInfo: string;
    principleLabel: string;
    btnWatchClimax: string;
    techNumber: string;
  };
  story: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    cardLocationBadge: string;
    cardTitle: string;
    cardDesc: string;
    stats: {
      location: string;
      locationVal: string;
      locationSub: string;
      atmosphere: string;
      atmosphereVal: string;
      atmosphereSub: string;
      architecture: string;
      architectureVal: string;
      architectureSub: string;
      doctrine: string;
      doctrineVal: string;
      doctrineSub: string;
    };
  };
  enrollment: {
    addressPill: string;
    title: string;
    desc: string;
    btnCall: string;
    btnCopy: string;
    copied: string;
    cardsTitle: string;
    branchLabel: string;
    groupLabel: string;
    groups: {
      kids: {
        name: string;
        time: string;
        desc: string;
        level: string;
      };
      adults: {
        name: string;
        time: string;
        desc: string;
        level: string;
      };
      advanced: {
        name: string;
        time: string;
        desc: string;
        level: string;
      };
    };
    highlights: {
      instructor: string;
      instructorName: string;
      instructorRole: string;
      location: string;
      locationVal: string;
      locationSub: string;
      phone: string;
      phoneSub: string;
      firstKeiko: string;
      firstKeikoVal: string;
    };
  };
  map: {
    gpsTag: string;
    title: string;
    fullAddr: string;
    dmsCoords: string;
    btnCopyGps: string;
    gpsCopied: string;
    btnRoute: string;
    btnGoogleMaps: string;
    floatingTitle: string;
    floatingSubtitle: string;
    floatingDojo: string;
    overlook: string;
    landmark: string;
    callSensei: string;
  };
  snapshot: {
    title: string;
    timestamp: string;
    btnCopy: string;
    copied: string;
    phase: string;
    vectorAngle: string;
    vectorPower: string;
    masterNote: string;
    philosophicalPrinciple: string;
    cameraPerspective: string;
    lens: string;
    location: string;
    copiedToast: string;
  };
  footer: {
    brand: string;
    sub: string;
    phoneLabel: string;
    melodyBtn: string;
    rights: string;
    addressNote: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  uk: {
    brand: {
      main: 'Айкідо-Канів',
      sub: 'Додзьо «Сакура» · м. Канів',
      badge: 'Канів, Україна'
    },
    nav: {
      cinema: 'Уповільнене Кіно',
      meditation: 'Таймер Мокусо',
      biomechanics: 'Анатомія Кі',
      techniques: 'Техніки',
      enrollment: 'Запис та Розклад',
      soundOn: 'Звук активний',
      soundOff: 'Звук вимкнено',
      cinemaOn: 'Режим кіно',
      cinemaOff: 'Звичайний екран',
      callSensei: 'Запис'
    },
    hero: {
      badge: 'Кінематографічний документ · 120 к/с надшвидкісна зйомка',
      senseiName: 'Сенсей Валерій Боронило',
      locationShort: 'м. Канів, вулиця Кошового, 2/14',
      title: 'Плинність і Спокій у Каневі',
      subJapanese: 'カニウ合気道 · 暖光と静寂の円運動',
      description: 'Кінематографічне дослідження динамічного тренування з айкідо у традиційному додзьо на кручах над Дніпром у Каневі (комплекс «Сакура», вулиця Кошового, 2/14) під наставництвом Сенсея Валерія Боронило. Відкрийте для себе фізику відцентрових кидків, гармонійне перенаправлення кінетичної енергії та глибоку зосередженість практиків під теплим бурштиновим світлом ліхтарів.',
      btnStart: 'Запустити уповільнене відео (120 к/с)',
      btnCall: 'Запис: +38 067 324 26 28',
      btnMokuso: 'Мокусо перед тренуванням',
      btnSchedule: 'вулиця Кошового, 2/14 (Розклад)',
      soundPhrase: 'Мелодія спокою (Сякухаті & Кото)'
    },
    player: {
      locationHeader: 'м. Канів, вулиця Кошового, 2/14, комплекс «Сакура»',
      tatamiBadge: '72 солом’яні татамі',
      callLabel: 'Запис на тренування:',
      callSenseiBtn: '+38 067 324 26 28',
      hudSpeed: 'Швидкість',
      speedSlow: '0.25x (Ультра slow-mo)',
      speedNormal: '1.0x (Нормально)',
      hudFilter: 'Фільтр кіно',
      hudBiometrics: 'Біомеханіка Кі (Вектори)',
      hudBiometricsHide: 'Сховати вектори',
      hudStepBack: 'Крок назад (кадр)',
      hudStepForward: 'Крок вперед (кадр)',
      hudPlay: 'Відтворити',
      hudPause: 'Пауза',
      hudSnapshot: 'Аналіз кадру',
      hudReplay: 'Спочатку',
      hudDrawer: 'Каталог дублів',
      drawerTitle: 'Кінематографічні Дублі Додзьо',
      drawerClose: 'Закрити',
      audioControl: 'Аудіо Додзьо',
      filters: {
        amber: 'Бурштиновий ліхтар',
        sumi: 'Туш Сумі-е',
        dusk: 'Дніпровські сутінки',
        tatami: 'Природне татамі'
      },
      audioModal: {
        title: 'Фоновий Звук Додзьо',
        desc: 'Аудіо-шар автоматично плавно нарощує гучність при запуску відтворення та вщухає при паузі.',
        master: 'Загальна гучність',
        tatami: 'Кроки татамі & ковзання',
        breath: 'Дихання Кокю & Танден',
        nature: 'Вітер Дніпра & тиша',
        music: 'Сякухаті & дзен-гудіння',
        muted: 'Вимкнено'
      }
    },
    meditation: {
      kicker: 'Налаштування Свідомості · Мокусо',
      title: 'Медитація Перед Тренуванням',
      japaneseSub: '黙想 · 心を静め、丹田に呼吸を落とす',
      description: 'У класичному Айкідо кожне тренування розпочинається в позі Сейдза. Заспокойте розум, спрямуйте дихання в нижній Танден та налаштуйтеся на гармонійний рух. Після завершення таймера звук плавно згасне.',
      durationLabel: 'Тривалість:',
      presets: {
        p1: { label: '1 хв', desc: 'Швидке центрування' },
        p2: { label: '2 хв', desc: 'Традиційне Мокусо' },
        p3: { label: '3 хв', desc: 'Глибока тиша' },
        p4: { label: '5 хв', desc: 'Повне занурення' }
      },
      phases: {
        inhale: 'Вдих у Танден',
        hold: 'Спокій і затримка',
        exhale: 'Плавний видих',
        ready: 'Готовність до Мокусо',
        completed: 'Завершено'
      },
      soundActive: 'Звук додзьо активний',
      btnStart: 'Розпочати Мокусо',
      btnRestart: 'Почати знову',
      btnPause: 'Призупинити',
      btnResetTooltip: 'Скинути таймер',
      btnMelody: 'Японська мелодія спокою та глибокої гармонії',
      completeTitle: 'Мокусо завершено · Розум чистий',
      completeDesc: 'Легка японська мелодія сповістила про завершення часу. Звуки спокою та гармонії плавно розчиняються, готуючи вас до динамічних кидків на татамі.',
      btnGoToPlayer: 'Перейти до відеоплеєра',
      doctrine: '「正勝吾勝」 (Масакацу Аґацу — Перемога над власним его)',
      fadeNote: 'Після завершення: плавне затухання звуку протягом 7 секунд'
    },
    biomechanics: {
      kicker: 'Фізика та Біомеханіка Руху · 01',
      title: 'Анатомія Кі: Фізика Ненасильницької Сили',
      japaneseSub: '合気の理 · 丹田と求心力',
      description: 'Айкідо Сенсея Валерія Боронило оперує законами класичної механіки Ньютона та центробіжними векторами. Замість протистояння силі удару, практик стає центром обертання, де нападник неминуче втрачає баланс.',
      tabs: {
        kuzushi: {
          title: 'Кудзуші: Виведення з рівноваги',
          sub: 'Розчинення осі атакуючого',
          summary: 'Перш ніж відбудеться будь-який кидок, центр маси супротивника має бути виведений за межі площі його опори без зустрічного силового протистояння.',
          p1: 'Спрямовуйте супротивника вперед вздовж вектора його власного імпульсу.',
          p2: 'Ніколи не тягніть прямо проти його плеча чи напружених грудей.',
          p3: 'Коли п’яти відриваються від підлоги хоча б на 5 міліметрів, уся скелетна опора нападника нівелюється.',
          diagram: 'Векторне відхилення осі (дуга 110°)'
        },
        tenkan: {
          title: 'Тенкан: Відцентровий поворот',
          sub: 'Гармонійне переспрямування швидкості',
          summary: 'Замість блокування прямого удару практик обертається на 180 градусів, перетворюючи лобове зіткнення на безпечну колову орбіту центрифуги.',
          p1: 'Провідне стегно описує чисте півколо вздовж шва татамі.',
          p2: 'Ви і нападник тепер дивитеся в одному напрямку.',
          p3: 'Супротивник огинає ваш центр, мов вода огинає гладкий річковий камінь.',
          diagram: 'Вихор кутового моменту 180°'
        },
        kokyu: {
          title: 'Кокю-рьоку: Сила дихання',
          sub: 'Глибока діафрагмальна стабілізація',
          summary: 'Справжня бойова міць народжується не зі скорочення окремих м’язів, а з цілісного дихального розширення тіла, що бере початок у Нижньому Тандені (Хара).',
          p1: 'Пульс тримається на рівні 52 уд/хв навіть під час амплітудних кидків.',
          p2: 'Вдих через ніс спрямовується глибоко в низ живота.',
          p3: 'Видих вивільняє енергію незгинаємої руки крізь кінчики пальців.',
          diagram: 'Діафрагмальний тиск Хара'
        },
        ukemi: {
          title: 'Укемі: Мистецтво захисного падіння',
          sub: 'Розсіювання кінетичного удару',
          summary: 'В айкідо немає поразки від падіння. Укемі перетворює жорстке зіткнення на м’який коловий перекат спиною без шкоди для суглобів та хребта.',
          p1: 'Тіло згортається у бездоганну сферичну дугу без гострих кутів.',
          p2: 'Плече та передпліччя приймають імпульс по черзі, розподіляючи вагу.',
          p3: 'Практик миттєво підіймається на ноги, утримуючи погляд Дзаншін.',
          diagram: 'Сферичний контакт татамі'
        }
      },
      btnJump: 'Дивитися техніку в кіноплеєрі',
      keyMechanicsLabel: 'Ключові біомеханічні орієнтири:'
    },
    catalog: {
      kicker: 'Програма Додзьо · 02',
      title: 'Ключові Техніки в Уповільненому Русі',
      desc: 'Кожен кидок у Канівському додзьо бере початок у традиційному самурайському мечі та школі Дайто-рю. Оберіть будь-яку техніку, щоб перейти безпосередньо до моменту її кульмінації.',
      fpsInfo: 'Частота зйомки: 120–240 к/с',
      locationInfo: 'Локація: Татамі в Каневі',
      principleLabel: 'Головний принцип:',
      btnWatchClimax: 'Дивитися кульмінацію',
      techNumber: 'ТЕХНІКА'
    },
    story: {
      kicker: 'Культурна Спадщина Канева · 03',
      title: 'Додзьо «Сакура» в Каневі',
      p1: 'Сучасний осередок гармонії та безпеки в самому серці Канева під керівництвом Сенсея Валерія Боронило. Розташований у комфортному комплексі "Сакура", цей зал створено для тих, хто прагне опанувати мистецтво самозахисту та знайти внутрішній спокій.',
      p2: 'Зал обладнано надійними татамі, які поглинають кінетичні удари безпечних падінь (Укемі) та дозволяють упевнено практикувати як початківцям, так і досвідченим учням. Тренування спрямовані на розвиток спритності, координації та впевненості у собі.',
      p3: 'У додзьо особлива увага приділяється принципам ненасильницької координації, гармонійного руху та внутрішньої рівноваги. Кожне заняття починається з налаштування свідомості та підготовчих вправ, після чого учні переходять до динамічного відпрацювання кидків та контролів.',
      p4: 'Запрошуємо приєднатися до наших занять у місті Канів по вулиці Кошового, 2/14 (комплекс «Сакура»). Запис та детальна консультація відкриті за номером інструктора: +38 067 324 26 28 (Валерій Боронило).',
      cardLocationBadge: 'Канів, Україна · Комплекс «Сакура»',
      cardTitle: 'Осередок Гармонії та Безпеки',
      cardDesc: 'Керівник залу — Сенсей Валерій Боронило. Сучасні татамі, ефективні кидки та дружня родина айкідо.',
      stats: {
        location: 'ЛОКАЦІЯ',
        locationVal: 'м. Канів, вулиця Кошового, 2/14',
        locationSub: 'Поруч із Тарасовою горою',
        atmosphere: 'АТМОСФЕРА',
        atmosphereVal: '2800K Вольфрам і Сонце',
        atmosphereSub: 'Тепле природне світло',
        architecture: 'АРХІТЕКТУРА',
        architectureVal: 'Ясеневі та дубові замки',
        architectureSub: '72 рисові татамі',
        doctrine: 'ГОЛОВНА ДОКТРИНА',
        doctrineVal: 'Масакацу Аґацу',
        doctrineSub: 'Справжня перемога — це перемога над собою'
      }
    },
    enrollment: {
      addressPill: 'м. Канів, вулиця Кошового, 2/14, комплекс «Сакура», Черкаська обл.',
      title: 'Почати тренування на татамі',
      desc: 'Зателефонуйте інструктору або напишіть для узгодження першого ознайомчого заняття в залі «Сакура». Ми підберемо відповідну за рівнем групу як для дорослих, так і для дітей.',
      btnCall: 'Зателефонувати: +38 067 324 26 28',
      btnCopy: 'Скопіювати',
      copied: 'Номер скопійовано!',
      cardsTitle: 'Розклад Занять у Додзьо (вулиця Кошового, 2/14)',
      branchLabel: 'Ми знаходимося тільки за адресою: вулиця Кошового, 2/14, і у нас немає інших філій',
      groupLabel: 'ГРУПА',
      groups: {
        kids: {
          name: 'Дитяча група (від 5 років)',
          time: 'Понеділок, Середа, П’ятниця — 16:30',
          desc: 'Розвиток координації, техніка безпечного падіння (Укемі), дисципліна та взаємна повага. Заняття проходять у понеділок, середу та п’ятницю о 16:30.',
          level: 'Початковий та середній (від 5 років)'
        },
        adults: {
          name: 'Дорослі та початківці',
          time: 'Понеділок, Середа, П’ятниця 18:30 – 20:00',
          desc: 'Базова стійка (Камае), виведення з рівноваги (Кудзуші), коловий рух (Тенкан), робота з партнером.',
          level: 'Усі рівні підготовки'
        },
        advanced: {
          name: 'Старша група та зброя (Буківадза)',
          time: 'Понеділок, Середа, П’ятниця 20:00 – 21:30',
          desc: 'Поглиблена практика кидків на швидкості, робота з дерев’яним мечем (Боккен) та жердиною (Дзьо).',
          level: 'Коричневі та чорні пояси'
        }
      },
      highlights: {
        instructor: 'Інструктор та наставник:',
        instructorName: 'Сенсей Валерій Боронило',
        instructorRole: 'Керівник Канівського Додзьо Айкі «Сакура»',
        location: 'Локація та комплекс:',
        locationVal: 'м. Канів, вулиця Кошового, 2/14, «Сакура»',
        locationSub: 'Черкаська область, мальовничі схили біля Дніпра',
        phone: 'Контактний номер:',
        phoneSub: 'Валерій Боронило · Щоденно з 09:00 до 21:00',
        firstKeiko: 'Для першого заняття:',
        firstKeikoVal: 'Зручний спортивний одяг (або біле кімоно), змінне взуття для проходу до татамі.'
      }
    },
    map: {
      gpsTag: 'Геоточка Google Maps · 49°44\'40.2"N 31°27\'28.8"E (49.7445, 31.458)',
      title: 'Додзьо «Сакура» на карті (вулиця Кошового, 2/14)',
      fullAddr: 'м. Канів, вулиця Кошового, 2/14, комплекс «Сакура»',
      dmsCoords: '49°44\'40.2" пн. ш., 31°27\'28.8" сх. д.',
      btnCopyGps: 'GPS: 49.7445, 31.458',
      gpsCopied: 'Координати скопійовано',
      btnRoute: 'Маршрут',
      btnGoogleMaps: 'Відкрити Додзьо на картах Google',
      floatingTitle: 'Додзьо «Сакура»',
      floatingSubtitle: 'вулиця Кошового, 2/14, місто Канів',
      floatingDojo: 'Точна геоточка',
      overlook: 'Канівські кручі · Дніпро',
      landmark: 'Орієнтири: комплекс «Сакура» на вулиці Кошового, 2/14, зручний заїзд із центральної вулиці Канева.',
      callSensei: 'Запис:'
    },
    snapshot: {
      title: 'Аналіз стоп-кадру',
      timestamp: 'Часова позначка',
      btnCopy: 'Скопіювати опис кадру',
      copied: 'Опис скопійовано!',
      phase: 'Фаза руху:',
      vectorAngle: 'Кут вектора:',
      vectorPower: 'Сила імпульсу:',
      masterNote: 'Вказівки майстра:',
      philosophicalPrinciple: 'Філософський принцип:',
      cameraPerspective: 'Перспектива камери:',
      lens: 'Оптика:',
      location: 'м. Канів, вулиця Кошового, 2/14 · Запис: +38 067 324 26 28',
      copiedToast: 'Нотатки стоп-кадру скопійовано в буфер обміну'
    },
    footer: {
      brand: 'Айкідо-Канів',
      sub: 'Додзьо «Сакура» · Сенсей Валерій Боронило',
      phoneLabel: 'Запис на тренування:',
      melodyBtn: 'Японська мелодія спокою та глибокої гармонії (Сякухаті & Кото)',
      rights: 'Всі права захищено. Додзьо «Сакура» · Айкідо-Канів.',
      addressNote: 'м. Канів, вулиця Кошового, 2/14, комплекс «Сакура»'
    }
  },
  en: {
    brand: {
      main: 'AURA SOMA - International Somatics',
      sub: 'Kaniv Sakura Dojo · Global Somatics',
      badge: 'Kaniv · Global Somatic Arts'
    },
    nav: {
      cinema: 'Slow-Mo Cinema',
      meditation: 'Somatic Timer',
      biomechanics: 'Ki Anatomy',
      techniques: 'Techniques',
      enrollment: 'Schedule & Academy',
      soundOn: 'Audio Active',
      soundOff: 'Audio Muted',
      cinemaOn: 'Cinema Mode',
      cinemaOff: 'Standard View',
      callSensei: 'Contact'
    },
    hero: {
      badge: 'Cinematic Somatic Archive · 120 FPS High-Speed Research',
      senseiName: 'Sensei Valerii Boronylo',
      locationShort: 'Kaniv Sakura Dojo · 2/14 Koshovoho St',
      title: 'Aura Soma · The Flow of Somatic Motion',
      subJapanese: 'オーラソーマ · AURA SOMA · International Somatics',
      description: 'A cinematic high-speed slow-motion exploration of dynamic martial flow, breath mechanics, and somatic alignment at the traditional Sakura Dojo on the Dnipro River hills in Kaniv. Under the guidance of Sensei Valerii Boronylo, discover the physics of centrifugal projection, effortless balance dissolution, and mindful centering illuminated by warm tungsten lanterns.',
      btnStart: 'Launch Slow-Motion Film (120 FPS)',
      btnCall: 'Contact: +38 067 324 26 28',
      btnMokuso: 'Mokuso Somatic Meditation',
      btnSchedule: 'Dojo Location & Schedule',
      soundPhrase: 'Serene Japanese Melody (Shakuhachi & Koto)'
    },
    player: {
      locationHeader: 'Kaniv Sakura Dojo · 2/14 Koshovoho St · Dnipro Bluffs',
      tatamiBadge: '72 Traditional Tatami Mats',
      callLabel: 'Academy Enrollment:',
      callSenseiBtn: '+38 067 324 26 28',
      hudSpeed: 'Playback Speed',
      speedSlow: '0.25x (Ultra Slow-Mo)',
      speedNormal: '1.0x (Standard)',
      hudFilter: 'Visual Tone',
      hudBiometrics: 'Ki Biomechanics (Vectors)',
      hudBiometricsHide: 'Hide Overlay',
      hudStepBack: 'Previous Frame',
      hudStepForward: 'Next Frame',
      hudPlay: 'Play',
      hudPause: 'Pause',
      hudSnapshot: 'Frame Analysis',
      hudReplay: 'Replay Take',
      hudDrawer: 'Archive Takes',
      drawerTitle: 'Cinematic Somatics Archive',
      drawerClose: 'Close',
      audioControl: 'Dojo Soundscape',
      filters: {
        amber: 'Amber Lantern',
        sumi: 'Sumi-e Ink',
        dusk: 'Dnipro Dusk',
        tatami: 'Natural Tatami'
      },
      audioModal: {
        title: 'Dojo Ambient Soundscape',
        desc: 'Interactive generative soundscape dynamically swells with video playback and gently fades upon pausing.',
        master: 'Master Volume',
        tatami: 'Tatami friction & sliding steps',
        breath: 'Kokyu breath & Tanden pulse',
        nature: 'Dnipro river breeze & silence',
        music: 'Shakuhachi & Zen meditation drone',
        muted: 'Muted'
      }
    },
    meditation: {
      kicker: 'Somatic Centering · Mokuso',
      title: 'Pre-Training Somatic Meditation',
      japaneseSub: '黙想 · Stillness in Mind, Grounding in Tanden',
      description: 'In traditional Aikido and somatic movement, every practice begins in Seiza. Still the conscious mind, lower your breath into the lower Tanden (Hara), and attune your neuromuscular system to harmonious flow. Meditative chimes softly resolve upon timer completion.',
      durationLabel: 'Duration:',
      presets: {
        p1: { label: '1 min', desc: 'Instant Centering' },
        p2: { label: '2 min', desc: 'Classic Mokuso' },
        p3: { label: '3 min', desc: 'Deep Stillness' },
        p4: { label: '5 min', desc: 'Full Somatic Immersion' }
      },
      phases: {
        inhale: 'Inhale into Tanden',
        hold: 'Retain & Settle',
        exhale: 'Smooth Diaphragm Exhale',
        ready: 'Ready for Mokuso',
        completed: 'Complete'
      },
      soundActive: 'Tranquil Audio Active',
      btnStart: 'Begin Mokuso',
      btnRestart: 'Restart Session',
      btnPause: 'Pause',
      btnResetTooltip: 'Reset Timer',
      btnMelody: 'Play Japanese Harmony Phrase',
      completeTitle: 'Mokuso Complete · Mind is Clear',
      completeDesc: 'Resonant temple bells signify the end of the session. Ambient tones gracefully recede over 7 seconds, preparing you for dynamic movement on the tatami.',
      btnGoToPlayer: 'Proceed to Cinema Player',
      doctrine: '「正勝吾勝」 (Masakatsu Agatsu — True Victory is Self-Mastery)',
      fadeNote: 'Automatic 7-second harmonic audio fade-out upon completion'
    },
    biomechanics: {
      kicker: 'Movement Physics & Somatics · 01',
      title: 'Ki Anatomy: The Physics of Non-Resistance',
      japaneseSub: '合気の理 · Centripetal Kinetics & Grounding',
      description: 'The Aikido of Sensei Valerii Boronylo operates through Newtonian physics and centrifugal velocity curves. Rather than opposing an incoming strike, the practitioner becomes the motionless axis of rotation, effortlessly neutralizing the attacker’s balance.',
      tabs: {
        kuzushi: {
          title: 'Kuzushi: Balance Dissolution',
          sub: 'Dissolving the Attacker’s Spinal Axis',
          summary: 'Before any throw occurs, the attacker’s center of gravity is guided beyond their support base without muscular collision or resistance.',
          p1: 'Guide the opponent forward along the tangent of their own momentum.',
          p2: 'Never pull directly against the shoulder or tense chest muscles.',
          p3: 'When the attacker’s heels lift a mere 5 millimeters, all skeletal leverage vanishes.',
          diagram: 'Angular axis deviation (110° spiral arc)'
        },
        tenkan: {
          title: 'Tenkan: Centrifugal Body Pivot',
          sub: 'Harmonious Velocity Redirection',
          summary: 'Instead of blocking a frontal attack, the practitioner pivots 180 degrees, transforming a collision into an effortless centrifugal orbit.',
          p1: 'The leading hip tracks a pure semicircle along the tatami seam.',
          p2: 'Practitioner and attacker now gaze in the exact same direction.',
          p3: 'The opponent curves around your center like water around smooth river stone.',
          diagram: 'Angular momentum vortex (180° pivot)'
        },
        kokyu: {
          title: 'Kokyu-ryoku: Breath Power',
          sub: 'Deep Diaphragmatic Core Grounding',
          summary: 'Authentic martial power stems not from isolated muscular tension, but from holistic expansion rooted in the lower Tanden (Hara).',
          p1: 'Resting pulse remains around 52 BPM even during high-amplitude projections.',
          p2: 'Nasal inhalation travels directly into the deep pelvic bowl.',
          p3: 'Exhalation extends the unbendable arm through fingertips like sunlight.',
          diagram: 'Diaphragmatic Hara pressure chamber'
        },
        ukemi: {
          title: 'Ukemi: The Art of Safe Breakfalls',
          sub: 'Kinetic Shockwave Dissipation',
          summary: 'In Aikido, falling is never defeat. Ukemi converts sharp impact into a spherical, injury-free roll along the diagonal of the spine.',
          p1: 'The body contracts into a seamless curved sphere with zero rigid angles.',
          p2: 'Forearm and latissimus absorb kinetic energy sequentially, spreading the load.',
          p3: 'The practitioner rises instantly to their feet, maintaining panoramic Zanshin.',
          diagram: 'Spherical rolling contact on tatami'
        }
      },
      btnJump: 'Watch Technique in Cinema Player',
      keyMechanicsLabel: 'Key Biomechanical Principles:'
    },
    catalog: {
      kicker: 'Curriculum & Repertoire · 02',
      title: 'Essential Techniques in Slow-Motion',
      desc: 'Every projection practiced at Kaniv Sakura Dojo traces back to classical samurai swordsmanship and Daito-ryu jujutsu. Select any movement to leap straight to its slow-motion climax.',
      fpsInfo: 'High-speed capture: 120–240 FPS',
      locationInfo: 'Location: Kaniv Sakura Tatami',
      principleLabel: 'Core Principle:',
      btnWatchClimax: 'Watch Slow-Mo Climax',
      techNumber: 'TECHNIQUE'
    },
    story: {
      kicker: 'Kaniv Cultural Legacy · 03',
      title: 'Sakura Dojo in Kaniv',
      p1: 'A premier center of harmonious somatics and safety in the heart of Kaniv, led by Sensei Valerii Boronylo. Nestled within the Sakura Complex, this space was conceived for those who seek to master self-defense and inner serenity.',
      p2: 'Equipped with shock-absorbent tatami mats, the hall ensures safe ukemi breakfalls for both absolute beginners and advanced martial artists. Training emphasizes agility, somatic awareness, and self-confidence.',
      p3: 'At the dojo, particular emphasis is placed on non-violent coordination, circular movement, and grounded poise. Each session opens with mindful centering, proceeding into dynamic throws and joint locks.',
      p4: 'We welcome you to join our training sessions in Kaniv at 2/14 Koshovoho Street (Sakura Complex). Inquiries and bookings are open at +38 067 324 26 28 (Sensei Valerii Boronylo).',
      cardLocationBadge: 'Kaniv, Ukraine · Sakura Complex',
      cardTitle: 'Center of Harmony and Safety',
      cardDesc: 'Lead Instructor: Sensei Valerii Boronylo. Premium tatami mats, effective throws, and a supportive community.',
      stats: {
        location: 'LOCATION',
        locationVal: '2/14 Koshovoho St, Kaniv',
        locationSub: 'Near the historic Taras Hill',
        atmosphere: 'LIGHTING',
        atmosphereVal: '2800K Tungsten & Sun',
        atmosphereSub: 'Warm, natural ambient glow',
        architecture: 'CONSTRUCTION',
        architectureVal: 'Ash & Oak Peg Joints',
        architectureSub: '72 Hand-woven Tatami Mats',
        doctrine: 'CORE PHILOSOPHY',
        doctrineVal: 'Masakatsu Agatsu',
        doctrineSub: 'True victory is victory over oneself'
      }
    },
    enrollment: {
      addressPill: 'Kaniv, 2/14 Koshovoho St, Sakura Complex, Cherkasy Region, Ukraine',
      title: 'Begin Your Training on the Tatami',
      desc: 'Call or message the instructor to arrange your first trial lesson at Sakura Dojo. We will place you in the appropriate group for kids or adults.',
      btnCall: 'Call Sensei: +38 067 324 26 28',
      btnCopy: 'Copy Phone',
      copied: 'Number Copied!',
      cardsTitle: 'Training Schedule at Sakura Dojo (2/14 Koshovoho St)',
      branchLabel: 'We are located only at 2/14 Koshovoho St — we have no other branches',
      groupLabel: 'GROUP',
      groups: {
        kids: {
          name: 'Children’s Group (Ages 5+)',
          time: 'Monday, Wednesday, Friday — 16:30',
          desc: 'Motor coordination, safe breakfalls (Ukemi), discipline, mutual respect, and agility for kids aged 5+. Monday, Wednesday, and Friday at 16:30.',
          level: 'Beginner & Intermediate (Ages 5+)'
        },
        adults: {
          name: 'Adults & Beginners',
          time: 'Mon, Wed, Fri 18:30 – 20:00',
          desc: 'Foundational stance (Kamae), unbalancing (Kuzushi), circular pivots (Tenkan), partner synchronization.',
          level: 'All Experience Levels'
        },
        advanced: {
          name: 'Senior Group & Weapons (Bukiwaza)',
          time: 'Mon, Wed, Fri 20:00 – 21:30',
          desc: 'High-speed projections, advanced joint reversals, wooden sword (Bokken) and staff (Jo) katas.',
          level: 'Brown & Black Belts'
        }
      },
      highlights: {
        instructor: 'Head Instructor & Master:',
        instructorName: 'Sensei Valerii Boronylo',
        instructorRole: 'Head of Kaniv Sakura Aiki Dojo',
        location: 'Location & Complex:',
        locationVal: '2/14 Koshovoho St, Sakura Complex, Kaniv',
        locationSub: 'Cherkasy region, picturesque slopes by the Dnipro',
        phone: 'Direct Contact:',
        phoneSub: 'Valerii Boronylo · Daily 09:00 – 21:00',
        firstKeiko: 'For First Class:',
        firstKeikoVal: 'Comfortable sportswear (or white judogi/dogi) and clean slippers for walking to tatami.'
      }
    },
    map: {
      gpsTag: 'Google Maps Geotag · 49°44\'40.2"N 31°27\'28.8"E (49.7445, 31.458)',
      title: 'Sakura Dojo on the Map of Kaniv',
      fullAddr: '2/14 Koshovoho St, Sakura Complex, Kaniv, Ukraine',
      dmsCoords: '49°44\'40.2" N, 31°27\'28.8" E',
      btnCopyGps: 'GPS: 49.7445, 31.458',
      gpsCopied: 'Coordinates Copied',
      btnRoute: 'Directions',
      btnGoogleMaps: 'Open Dojo on Google Maps',
      floatingTitle: 'Sakura Dojo',
      floatingSubtitle: '2/14 Koshovoho St, Kaniv',
      floatingDojo: 'Verified Geotag',
      overlook: 'Kaniv Bluffs · Dnipro River',
      landmark: 'Landmarks: "Sakura" complex on Koshovoho St 2/14, convenient access from central Kaniv.',
      callSensei: 'Enroll:'
    },
    snapshot: {
      title: 'Kinetic Frame Analysis',
      timestamp: 'Timecode',
      btnCopy: 'Copy Keyframe Data',
      copied: 'Analysis Copied!',
      phase: 'Movement Phase:',
      vectorAngle: 'Vector Angle:',
      vectorPower: 'Kinetic Momentum:',
      masterNote: 'Sensei’s Cue:',
      philosophicalPrinciple: 'Philosophical Concept:',
      cameraPerspective: 'Camera Angle:',
      lens: 'Lens Optics:',
      location: 'Kaniv Sakura Dojo · 2/14 Koshovoho St · Tel: +38 067 324 26 28',
      copiedToast: 'Keyframe somatic notes copied to clipboard'
    },
    footer: {
      brand: 'AURA SOMA - INTERNATIONAL SOMATICS',
      sub: 'Kaniv Sakura Dojo · Sensei Valerii Boronylo',
      phoneLabel: 'Direct Enrollment:',
      melodyBtn: 'Tranquil Japanese Shakuhachi & Koto Motif',
      rights: 'All rights reserved. Kaniv Sakura Aiki Dojo & Aura Soma Somatics.',
      addressNote: '2/14 Koshovoho St, Sakura Complex, Kaniv, Ukraine'
    }
  }
};
