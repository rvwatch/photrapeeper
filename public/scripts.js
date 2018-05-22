$( document ).ready( async function () { 
  const photoList = await getPhotos();
  renderPhotoCards(photoList);
  const photoForm = $('#photrapeeper-form')[0];
  const deleteButtons = $('.delete-photo'); 

  $(photoForm).on('submit', (event) => {
    event.preventDefault();
    const title = $('#title-input').val();
    const url = $('#url-input').val();
    addPhoto(title, url);
    $(photoForm)[0].reset();
  })
  
  $('.delete-photo').on('click', (event) => {
    const id = event.target.value;
    deletePhoto(id);
  });
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
    const {title, url, id} = photo
    const cardHtml = `
      <article class="photo-card" id=${id}>
        <div class="photo-frame">
          <img src=${url} alt=${title} />
        </div>
        <h2 class="photo-title">${title}</h2>
        <button class="delete-photo" value="${id}">x</button>
      </article>`;
      $(".album-wrap").append(cardHtml)
  })
}

const addPhoto = async (title, url) => {
  try {
    const response = await fetch('/api/v1/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, url })
    })
  } catch (err) {
    return 'That Did not work. Try adding another photo later...'
  };
  location.reload();
}

const deletePhoto = async (id) => {
  try {
    const response = await fetch(`/api/v1/albums/${id}`, {
      method: 'DELETE'
    })
  } catch (err) {
    return 'Delete Failed. Try removing something else.'
  };
  location.reload();
}








