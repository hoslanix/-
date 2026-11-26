/*
 * Special Cards — темы и разделы.
 *
 * Структура: игра → разделы → карточки.
 * Каждая карточка превращается в пару на поле 6 × 6 (нужно 18 пар).
 * Если в разделе больше 18 карточек — на каждую партию берутся случайные 18.
 *
 * Карточка — это строка с названием или объект с картинкой:
 *   'Шелли'
 *   { name: 'Шелли', img: 'img/brawl/shelly.png' }
 */
window.THEMES = [
  {
    id: 'brawl',
    name: 'Brawl Stars',
    sections: [
      {
        id: 'classic',
        name: 'Бойцы: старая гвардия',
        desc: 'Первые и самые узнаваемые бойцы',
        cards: [
          'Шелли', 'Кольт', 'Нита', 'Булл', 'Брок', 'Эль Примо',
          'Барли', 'Поко', 'Джесси', 'Динамайк', 'Рико', 'Пайпер',
          'Фрэнк', 'Мортис', 'Тара', 'Спайк', 'Ворон', 'Леон',
        ],
      },
      {
        id: 'mythic',
        name: 'Бойцы: мифические и легендарные',
        desc: 'Редкие бойцы высших рангов',
        cards: [
          'Сэнди', 'Амбер', 'Мэг', 'Честер', 'Корделиус', 'Вольт',
          'Джин', 'Макс', 'Мистер П.', 'Спраут', 'Байрон', 'Скуик',
          'Лу', 'Гавс', 'Базз', 'Фэнг', 'Ева', 'Джанет',
        ],
      },
      {
        id: 'modes',
        name: 'Режимы игры',
        desc: 'Иконки игровых событий',
        cards: [
          'Захват кристаллов', 'Столкновение', 'Броулбол', 'Ограбление',
          'Награда за поимку', 'Горячая зона', 'Нокаут', 'Осада', 'Дуэли',
          'Роборубка', 'Бой с боссом', 'Большая игра', 'Охотники',
          'Зачистка', 'Баскетброул', 'Волейброул', 'Одинокая звезда', 'Разгром',
        ],
      },
      {
        id: 'items',
        name: 'Ресурсы и предметы',
        desc: 'Валюта, усиления и награды',
        cards: [
          'Кубки', 'Монеты', 'Кристаллы', 'Очки силы', 'Блинги', 'Кредиты',
          'Старр-дроп', 'Гаджет', 'Звёздная сила', 'Гиперзаряд', 'Снаряжение',
          'Куб силы', 'Бравл Пасс', 'Значок', 'Спрей', 'Иконка игрока',
          'Ящик', 'Мегаящик',
        ],
      },
    ],
  },
  {
    id: 'dota',
    name: 'Dota 2',
    sections: [
      {
        id: 'strength',
        name: 'Герои силы',
        desc: 'Танки и инициаторы',
        cards: [
          'Pudge', 'Axe', 'Sven', 'Tiny', 'Earthshaker', 'Kunkka',
          'Dragon Knight', 'Huskar', 'Tidehunter', 'Slardar', 'Mars',
          'Legion Commander', 'Bristleback', 'Centaur Warrunner', 'Doom',
          'Lifestealer', 'Wraith King', 'Undying',
        ],
      },
      {
        id: 'agility',
        name: 'Герои ловкости',
        desc: 'Керри и убийцы',
        cards: [
          'Anti-Mage', 'Juggernaut', 'Phantom Assassin', 'Drow Ranger',
          'Sniper', 'Faceless Void', 'Slark', 'Riki', 'Bloodseeker',
          'Shadow Fiend', 'Morphling', 'Phantom Lancer', 'Luna', 'Medusa',
          'Terrorblade', 'Troll Warlord', 'Ursa', 'Bounty Hunter',
        ],
      },
      {
        id: 'intelligence',
        name: 'Герои интеллекта',
        desc: 'Маги и саппорты',
        cards: [
          'Crystal Maiden', 'Lina', 'Lion', 'Zeus', 'Invoker', 'Rubick',
          'Shadow Shaman', 'Witch Doctor', 'Storm Spirit', 'Puck',
          'Queen of Pain', 'Tinker', 'Necrophos', 'Silencer',
          'Skywrath Mage', 'Lich', 'Warlock', 'Oracle',
        ],
      },
      {
        id: 'items',
        name: 'Предметы',
        desc: 'Легендарные артефакты из лавки',
        cards: [
          'Blink Dagger', 'Black King Bar', "Aghanim's Scepter",
          'Divine Rapier', 'Battle Fury', 'Desolator', 'Daedalus', 'Butterfly',
          'Eye of Skadi', 'Heart of Tarrasque', 'Radiance', 'Manta Style',
          'Force Staff', "Eul's Scepter", 'Scythe of Vyse', 'Refresher Orb',
          'Boots of Travel', 'Aegis of the Immortal',
        ],
      },
    ],
  },
  {
    id: 'cs',
    name: 'CS2',
    sections: [
      {
        id: 'weapons',
        name: 'Оружие',
        desc: 'Пистолеты, винтовки, ПП и дробовики',
        cards: [
          'AK-47', 'M4A4', 'M4A1-S', 'AWP', 'Desert Eagle', 'USP-S',
          'Glock-18', 'P250', 'SSG 08', 'FAMAS', 'Galil AR', 'AUG',
          'SG 553', 'MP9', 'MAC-10', 'P90', 'UMP-45', 'Nova',
        ],
      },
      {
        id: 'skins',
        name: 'Скины',
        desc: 'Самые известные раскраски',
        cards: [
          'AWP | Dragon Lore', 'AK-47 | Fire Serpent', 'M4A4 | Howl',
          'AWP | Asiimov', 'AK-47 | Redline', 'AK-47 | Vulcan',
          'M4A1-S | Hyper Beast', 'AK-47 | Case Hardened', 'AWP | Medusa',
          'Desert Eagle | Blaze', 'USP-S | Kill Confirmed', 'Glock-18 | Fade',
          'AK-47 | Neon Rider', 'M4A4 | Asiimov', 'AWP | Gungnir',
          'AK-47 | Wild Lotus', 'M4A1-S | Printstream', 'AWP | Hyper Beast',
        ],
      },
      {
        id: 'knives',
        name: 'Ножи',
        desc: 'Все популярные модели ножей',
        cards: [
          'Karambit', 'Butterfly Knife', 'M9 Bayonet', 'Bayonet', 'Flip Knife',
          'Gut Knife', 'Huntsman Knife', 'Falchion Knife', 'Bowie Knife',
          'Shadow Daggers', 'Stiletto Knife', 'Ursus Knife', 'Navaja Knife',
          'Talon Knife', 'Skeleton Knife', 'Nomad Knife', 'Classic Knife',
          'Kukri Knife',
        ],
      },
      {
        id: 'maps',
        name: 'Карты',
        desc: 'Соревновательные и классические',
        cards: [
          'Dust II', 'Mirage', 'Inferno', 'Nuke', 'Overpass', 'Vertigo',
          'Ancient', 'Anubis', 'Train', 'Cache', 'Cobblestone', 'Office',
          'Italy', 'Agency', 'Assault', 'Militia', 'Lake', 'Canals',
        ],
      },
    ],
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    sections: [
      {
        id: 'items',
        name: 'Предметы',
        desc: 'Инструменты, оружие и находки',
        cards: [
          'Алмазный меч', 'Железная кирка', 'Лук', 'Щит', 'Ведро воды',
          'Удочка', 'Компас', 'Часы', 'Факел', 'Яблоко', 'Золотое яблоко',
          'Эндер-жемчуг', 'Элитры', 'Тотем бессмертия', 'Трезубец', 'Зелье',
          'Изумруд', 'Алмаз',
        ],
      },
      {
        id: 'animals',
        name: 'Животные',
        desc: 'Мирные и приручаемые мобы',
        cards: [
          'Корова', 'Свинья', 'Овца', 'Курица', 'Лошадь', 'Волк', 'Кошка',
          'Оцелот', 'Лиса', 'Панда', 'Попугай', 'Кролик', 'Пчела', 'Черепаха',
          'Дельфин', 'Аксолотль', 'Лягушка', 'Верблюд',
        ],
      },
      {
        id: 'hostile',
        name: 'Враждебные мобы',
        desc: 'Монстры Верхнего мира',
        cards: [
          'Зомби', 'Скелет', 'Крипер', 'Паук', 'Пещерный паук', 'Ведьма',
          'Слизень', 'Утопленник', 'Кадавр', 'Зимогор', 'Фантом', 'Разбойник',
          'Поборник', 'Заклинатель', 'Разоритель', 'Страж', 'Хранитель',
          'Чешуйница',
        ],
      },
      {
        id: 'dimensions',
        name: 'Измерения: Нижний мир и Край',
        desc: 'Мобы и объекты других измерений',
        cards: [
          'Пиглин', 'Брутальный пиглин', 'Зомбифицированный пиглин', 'Хоглин',
          'Зоглин', 'Гаст', 'Ифрит', 'Лавовый куб', 'Визер-скелет',
          'Иссушитель', 'Лавомерка', 'Эндермен', 'Дракон Края', 'Шалкер',
          'Эндермит', 'Портал в Нижний мир', 'Портал в Край', 'Кристалл Края',
        ],
      },
    ],
  },
  {
    id: 'terraria',
    name: 'Terraria',
    sections: [
      {
        id: 'mobs',
        name: 'Мобы',
        desc: 'Обычные враги из разных биомов',
        cards: [
          'Зелёный слизень', 'Синий слизень', 'Зомби', 'Демонический глаз',
          'Скелет', 'Пожиратель душ', 'Летучая мышь', 'Гарпия', 'Шершень',
          'Пиранья', 'Муравьиный лев', 'Стервятник', 'Гоблин-разведчик',
          'Мимик', 'Виверна', 'Единорог', 'Пикси', 'Оборотень',
        ],
      },
      {
        id: 'bosses',
        name: 'Боссы',
        desc: 'От Короля слизней до Лунного лорда',
        cards: [
          'Король слизней', 'Глаз Ктулху', 'Пожиратель миров', 'Мозг Ктулху',
          'Королева пчёл', 'Скелетрон', 'Циклоп-олень', 'Стена плоти',
          'Королева слизней', 'Близнецы', 'Уничтожитель', 'Скелетрон Прайм',
          'Плантера', 'Голем', 'Герцог Рыброн', 'Императрица света',
          'Культист-лунатик', 'Лунный лорд',
        ],
      },
      {
        id: 'weapons',
        name: 'Оружие',
        desc: 'Мечи, луки, пушки и магия',
        cards: [
          'Медный короткий меч', 'Звёздная ярость', 'Мурамаса',
          'Травяной клинок', 'Грань ночи', 'Экскалибур', 'Терра-клинок',
          'Мяумур', 'Звёздный гнев', 'Зенит', 'Мини-акула', 'Мегаакула',
          'Бластер феникса', 'Штормовой лук Дедала', 'Водяной снаряд',
          'Вампирские ножи', 'Последняя призма', 'Террариан',
        ],
      },
      {
        id: 'npc',
        name: 'Жители (НПС)',
        desc: 'Горожане, которые селятся в домах',
        cards: [
          'Гид', 'Торговец', 'Медсестра', 'Подрывник', 'Дриада',
          'Торговец оружием', 'Гоблин-инженер', 'Механик', 'Волшебник',
          'Портной', 'Трюфель', 'Стимпанкер', 'Киборг', 'Пират', 'Рыбак',
          'Тусовщица', 'Красильщик', 'Стилист',
        ],
      },
    ],
  },
  {
    id: 'tf2',
    name: 'TF2',
    sections: [
      {
        id: 'characters',
        name: 'Персонажи',
        desc: '9 классов и герои вселенной',
        cards: [
          'Разведчик', 'Солдат', 'Поджигатель', 'Подрывник', 'Пулемётчик',
          'Инженер', 'Медик', 'Снайпер', 'Шпион', 'Администратор',
          'Мисс Полинг', 'Сакстон Хейл', 'Мерасмус',
          'Пеший всадник без головы', 'Монокулус', 'Редмонд Манн',
          'Блутарх Манн', 'Грей Манн',
        ],
      },
      {
        id: 'weapons',
        name: 'Оружие',
        desc: 'Стандартный арсенал классов',
        cards: [
          'Ракетомёт', 'Гранатомёт', 'Липучкомёт', 'Миниган', 'Огнемёт',
          'Обрез', 'Снайперская винтовка', 'Лечебная пушка', 'Револьвер',
          'Нож', 'Гаечный ключ', 'Бита', 'Лопата', 'Дробовик', 'Пистолет',
          'Пистолет-пулемёт', 'Кукри', 'Пожарный топор',
        ],
      },
      {
        id: 'items',
        name: 'Предметы',
        desc: 'Постройки, расходники и экономика',
        cards: [
          'Ключ Манн Ко', 'Ящик Манн Ко', 'Металлолом',
          'Восстановленный металл', 'Очищенный металл', 'Бутерброд',
          'Бонк! Атомный залп', 'Банкате', 'Аптечка', 'Ящик с патронами',
          'Чемодан с разведданными', 'Вагонетка с бомбой', 'Турель',
          'Раздатчик', 'Телепорт', 'Билет «Манн против машин»',
          'Именной ярлык', 'Банка краски',
        ],
      },
      {
        id: 'maps',
        name: 'Карты',
        desc: 'Захват флага, точки и вагонетки',
        cards: [
          '2Fort', 'Dustbowl', 'Badwater', 'Upward', 'Goldrush', 'Granary',
          'Well', 'Badlands', 'Gravel Pit', 'Hightower', 'Harvest', 'Viaduct',
          'Turbine', 'Sawmill', 'Thunder Mountain', 'Process', 'Doublecross',
          'Hydro',
        ],
      },
    ],
  },
  {
    id: 'roblox',
    name: 'Roblox',
    sections: [
      {
        id: 'classic',
        name: 'Плейсы: классика',
        desc: 'Иконки плейсов, с которых всё начиналось',
        cards: [
          'Natural Disaster Survival', 'Work at a Pizza Place', 'MeepCity',
          'Jailbreak', 'Murder Mystery 2', 'Tower of Hell', 'Adopt Me!',
          'Royale High', 'Welcome to Bloxburg', 'Build a Boat for Treasure',
          'Bee Swarm Simulator', 'Theme Park Tycoon 2', 'Lumber Tycoon 2',
          'Phantom Forces', 'Arsenal', 'Speed Run 4', 'Flee the Facility',
          'Super Bomb Survival',
        ],
      },
      {
        id: 'hits',
        name: 'Плейсы: хиты последних лет',
        desc: 'Иконки самых популярных новинок',
        cards: [
          'Brookhaven RP', 'Blox Fruits', 'Doors', 'Pet Simulator 99',
          'BedWars', 'Piggy', 'Rainbow Friends', 'The Strongest Battlegrounds',
          'Dress to Impress', 'Grow a Garden', 'Steal a Brainrot',
          '99 Nights in the Forest', 'Dead Rails', 'Fisch', 'Rivals',
          'Blade Ball', 'Evade', 'Pressure',
        ],
      },
      {
        id: 'avatar',
        name: 'Аватары и предметы',
        desc: 'Культовые аксессуары и снаряжение',
        cards: [
          'Робуксы', 'Тикеты', 'Нуб', 'Бекон-причёска', 'Гость', 'Dominus',
          'Valkyrie Helm', 'Domino Crown', 'Sparkle Time Fedora',
          "Clockwork's Shades", 'Korblox Deathspeaker', 'Headless Horseman',
          'Super Super Happy Face', 'Bloxy Cola', 'Gravity Coil', 'Speed Coil',
          'Linked Sword', 'Rocket Launcher',
        ],
      },
    ],
  },
  {
    id: 'tanks',
    name: 'Танки',
    sections: [
      {
        id: 'ussr',
        name: 'Танки: СССР',
        desc: 'От МС-1 до ИС-7',
        cards: [
          'МС-1', 'БТ-7', 'Т-34', 'Т-34-85', 'КВ-1', 'КВ-2', 'ИС', 'ИС-3',
          'ИС-7', 'Т-44', 'Т-54', 'Т-62А', 'Объект 140', 'Объект 268',
          'Объект 279 (р)', 'СУ-152', 'ИСУ-152', 'Т-100 ЛТ',
        ],
      },
      {
        id: 'germany',
        name: 'Танки: Германия',
        desc: 'От Leichttraktor до Maus',
        cards: [
          'Leichttraktor', 'Pz.Kpfw. III', 'Pz.Kpfw. IV', 'Tiger I',
          'Tiger II', 'Panther', 'Maus', 'E 100', 'E 75', 'E 50 M',
          'Leopard 1', 'Löwe', 'Hetzer', 'StuG III', 'Jagdpanther',
          'Ferdinand', 'Jagdtiger', 'Waffenträger auf E 100',
        ],
      },
      {
        id: 'world',
        name: 'Танки: другие нации',
        desc: 'США, Франция, Британия, Япония и другие',
        cards: [
          'M4 Sherman', 'M18 Hellcat', 'T29', 'T95', 'T110E5', 'T57 Heavy',
          'AMX 50 B', 'Bat.-Châtillon 25 t', 'ELC AMX', 'Churchill I',
          'Centurion Mk. I', 'FV215b (183)', 'Type 5 Heavy', 'STB-1',
          'WZ-111', 'Strv 103B', 'TVP T 50/51', 'Progetto 65',
        ],
      },
      {
        id: 'maps',
        name: 'Карты',
        desc: 'Знаменитые поля сражений',
        cards: [
          'Химмельсдорф', 'Прохоровка', 'Малиновка', 'Карелия', 'Рудники',
          'Ласвилль', 'Мурованка', 'Энск', 'Утёс', 'Монастырь',
          'Песчаная река', 'Эль-Халлуф', 'Аэродром', 'Перевал', 'Степи',
          'Вестфилд', 'Редшир', 'Рыбацкая бухта',
        ],
      },
    ],
  },
];
