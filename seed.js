const pool = require('./config/db');

async function seed() {
  const products = [

    // Action
    ['Apex Legends', 499, '/images/action/apex_legends.png', 'action'],
    ['Assasins Creed', 599, '/images/action/assasins_creed.png', 'action'],
    ['Cs2', 699, '/images/action/cs2.png', 'action'],
    ['Red Dead Redemption', 549, '/images/action/red_dead_redemption.png', 'action'],
    ['Sekiro', 649, '/images/action/sekiro.png', 'action'],

    // Adventure
    ['Borderlands4', 449, '/images/adventure/borderlands4.png', 'adventure'],
    ['Forza Horizon', 529, '/images/adventure/forza_horizon.png', 'adventure'],
    ['Outer Wilds', 579, '/images/adventure/outer_wilds.png', 'adventure'],
    ['Peak', 499, '/images/adventure/peak.png', 'adventure'],
    ['Terraria', 619, '/images/adventure/terraria.png', 'adventure'],

    // Building & Automation
    ['Fabledom', 799, '/images/building_automation/fabledom.png', 'building-automation'],
    ['Once Human', 899, '/images/building_automation/once_human.png', 'building-automation'],
    ['Rimworld', 849, '/images/building_automation/rimworld.png', 'building-automation'],
    ['Rust', 769, '/images/building_automation/rust.png', 'building-automation'],
    ['Stardew Valley', 929, '/images/building_automation/stardew_valley.png', 'building-automation'],

    // Sports
    ['Bmx Streets', 499, '/images/sports/bmx_streets.png', 'sports'],
    ['Fc25', 559, '/images/sports/fc25.png', 'sports'],
    ['Fishing Planet', 649, '/images/sports/fishing_planet.png', 'sports'],
    ['Rugby League', 729, '/images/sports/rugby_league.png', 'sports'],
    ['Undisputed', 699, '/images/sports/undisputed.png', 'sports'],

    // Strategy
    ['9kings', 599, '/images/strategy/9kings.png', 'strategy'],
    ['Blood Bar Tycoon', 689, '/images/strategy/blood_bar_tycoon.png', 'strategy'],
    ['Limbus Company', 739, '/images/strategy/limbus_company.png', 'strategy'],
    ['Persona 3 Reload', 819, '/images/strategy/persona_3_reload.png', 'strategy'],
    ['The King Is Watching', 559, '/images/strategy/the_king_is_watching.png', 'strategy']
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
