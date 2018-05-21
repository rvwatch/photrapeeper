$( document ).ready( async function () {
  const photoList = await getPhotos();
  renderPhotoCards(photoList);
});

const getPhotos = async () => {
  try {
    const response = await fetch('/api/v1/albums')
    const photos = await response.json();
    return photos;
    
  } catch (err) {
    console.log('theres nothing here...');
  }
}

const renderPhotoCards = (photoList) => {
  photoList.forEach(photo => {
    const {title, url} = photo
    
    const cardHtml = `
      <article class="photo-card">
        <div class="photo-frame">
          <img src=${url} alt=${title} />
        </div>
        <h2 class="photo-title">${title}</h2>
        <button class="delete-photo">x</button>
      </article>`;

      $(".album-wrap").after(cardHtml)
  })
}

const photoForm = $('#photrapeeper-form')[0];

$(photoForm).on('submit', (event) => {
  event.preventDefault();
  const title = $('#title-input').val();
  const url = $('#url-input').val();

  console.log(title, url);

  $(photoForm)[0].reset();
})



