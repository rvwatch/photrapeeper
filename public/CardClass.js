module.exports = class CardClass {
  constructor(title, url, id) {
    this.title = title;
    this.url = url;
    this.id = id;
  }
  
  renderPhotoCards(photoList) {
    photoList.forEach(photo => {
      const {title, url, id} = photo;
      const cardHtml = `
        <article class="photo-card" id=${id}>
          <div class="photo-frame">
            <img src=${url} alt=${title} />
          </div>
          <h2 class="photo-title">${title}</h2>
          <button class="delete-photo" value="${id}">x</button>
        </article>`;
      $(".album-wrap").append(cardHtml);
    });
  }
}
