
$(document).ready(function () {
  var albumsStr = '';
  albums.forEach(function (item, idx, arr) {
    albumsStr += `<div class="album" data-id="${item.id}">
                  <h3>${item.title}</h3>
                  <img src="${item.cover}" alt="">
                </div>`;
  })



  $('.albums').html(albumsStr); // add albums

  $('.albums').on('click', '.album', function (event) {
      console.log($(this).data('id'));
      var albumId = $(this).data('id');
      var selectedAlbum = albums.filter(function (item, idx, arr) {
        return item.id === albumId;
      })

      $(`header h1`).text(albumId);
     albums.forEach(function(item,idx,arr){
       $('.albumDetail .navbar nav ul').append(`<li class = "albumLink" data-id="${item.id}">${item.title}</li>`);
     });

      var photosStr= '';

      selectedAlbum[0].pictures.forEach(function (item, idx, arr) {
        photosStr += `<div class="photo">
                        <h3>${item.caption}</h3>
                        <img src="${item.photo}" alt="">
                      </div>`
      });
      $('.albumDetail').addClass('active');
      $('.albumDetail').siblings().removeClass('active');
      $('.albumDetail').append(photosStr);
      });

      $('.albumDetail .navbar ul li').on('click', function(event){
            // event.preventDefault();
            console.log($(this).data('id'));
        var  anotherAlbumId = $(this).data('id');
        $(`h1`).replaceWith('<h1>'+ anotherAlbumId +'</h1>');
          var anotherAlbum = albums.filter(function (item, idx, arr) {
            return item.id === anotherAlbumId;
          });
          anotherAlbum[0].pictures.forEach(function (item, idx, arr) {
              console.log(item.caption);
            $('.albumDetail div .photo h3').html(`${item.caption}`)
          });

        })
})
