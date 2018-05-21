const photoForm = $('#photrapeeper-form')[0];


$(photoForm).on('submit', (event) => {
  event.preventDefault();
  const title = $('#title-input').val();
  const url = $('#url-input').val();

  console.log(title, url);
  $(photoForm)[0].reset();
})