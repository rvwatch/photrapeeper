exports.seed = function(knex, Promise) {
  return knex('albums').del()
    .then(() => {
      return Promise.all([
        
        knex('albums').insert({
          title: 'funny dogs',
          url: 'https://i.imgur.com/Nvd9VsM.jpg'
        }, 'id')
          .then(() => console.log('Seeding complete!')) // eslint-disable-line
          .catch(error => console.log(`Error seeding data: ${error}`))// eslint-disable-line
      ]); 
    })
    .catch(error => console.log(`Error seeding data: ${error}`));// eslint-disable-line
};