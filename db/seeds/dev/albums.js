exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('albums').del()
    .then(() => {
      return Promise.all([
        
        // Insert a single photo, return the photo ID, insert a photo
        knex('albums').insert({
          title: 'funny dogs',
          url: 'https://i.imgur.com/Nvd9VsM.jpg'
        }, 'id')
          .then(() => console.log('Seeding complete!'))// eslint-disable-line
          .catch(error => console.log(`Error seeding data: ${error}`))// eslint-disable-line
      ]); // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));// eslint-disable-line
};