exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('albums').del()
    .then(() => {
      return Promise.all([
        
        // Insert a single project, return the project ID, insert 2 meals
        knex('albums').insert({
          title: 'funny dogs',
          url: 'https://i.imgur.com/Nvd9VsM.jpg'
        }, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};