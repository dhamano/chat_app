exports.seed = function(knex) {
  return knex('users').insert([
      {
          username: 'adam',
          password: '$2b$14$E3qgmoniDR4f4aELAnPMb.zIbOuwyD6ZfKtKSheWx5Txj./z5QtmO',
      },
      {
          username: 'eve',
          password: '$2b$14$E3qgmoniDR4f4aELAnPMb.zIbOuwyD6ZfKtKSheWx5Txj./z5QtmO'
      }
  ])
};
