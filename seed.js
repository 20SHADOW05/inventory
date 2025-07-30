const pool = require('./config/db');

async function seed() {
  const products = [

    // Action
    ['Apex Legends', 499, '/images/action/apex_legends.jpg', 'action'],
    ['Assasins Creed', 599, '/images/action/assasins_creed.jpg', 'action'],
    ['Cs2', 699, '/images/action/cs2.jpg', 'action'],
    ['Red Dead Redemption', 549, '/images/action/red_dead_redemption.jpg', 'action'],
    ['Sekiro', 649, '/images/action/sekiro.jpg', 'action'],

    // Adventure
    ['Borderlands4', 449, '/images/adventure/borderlands4.jpg', 'adventure'],
    ['Forza Horizon', 529, '/images/adventure/forza_horizon.jpg', 'adventure'],
    ['Outer Wilds', 579, '/images/adventure/outer_wilds.jpg', 'adventure'],
    ['Peak', 499, '/images/adventure/peak.jpg', 'adventure'],
    ['Terraria', 619, '/images/adventure/terraria.jpg', 'adventure'],

    // Building & Automation
    ['Fabledom', 799, '/images/building_automation/fabledom.jpg', 'building-automation'],
    ['Once Human', 899, '/images/building_automation/once_human.jpg', 'building-automation'],
    ['Rimworld', 849, '/images/building_automation/rimworld.jpg', 'building-automation'],
    ['Rust', 769, '/images/building_automation/rust.jpg', 'building-automation'],
    ['Stardew Valley', 929, '/images/building_automation/stardew_valley.jpg', 'building-automation'],

    // Sports
    ['Bmx Streets', 499, '/images/sports/bmx_streets.jpg', 'sports'],
    ['Fc25', 559, '/images/sports/fc25.jpg', 'sports'],
    ['Fishing Planet', 649, '/images/sports/fishing_planet.jpg', 'sports'],
    ['Rugby League', 729, '/images/sports/rugby_league.jpg', 'sports'],
    ['Undisputed', 699, '/images/sports/undisputed.jpg', 'sports'],

    // Strategy
    ['9kings', 599, '/images/strategy/9kings.jpg', 'strategy'],
    ['Blood Bar Tycoon', 689, '/images/strategy/blood_bar_tycoon.jpg', 'strategy'],
    ['Limbus Company', 739, '/images/strategy/limbus_company.jpg', 'strategy'],
    ['Persona 3 Reload', 819, '/images/strategy/persona_3_reload.jpg', 'strategy'],
    ['The King Is Watching', 559, '/images/strategy/the_king_is_watching.jpg', 'strategy']
  ];

  for (const [name, price, path, category] of products) {
    await pool.query(
      'INSERT INTO default_products (name, price, image_path, category) VALUES ($1, $2, $3, $4)',
      [name, price, path, category]
    );
  }

  console.log('Seeded 25 products');
  await pool.end();
}

seed();
