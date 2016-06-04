
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
      var navbarSet ='';

      navbarSet += `<aside class = "navbar">
                     <nav><ul>`;
     albums.forEach(function(item,idx,arr){
       navbarSet += `<li><a href = '#'>${item.title}</a></li>`;
     });


      var photosStr = navbarSet + `</ul></nav></aside>`;

      selectedAlbum[0].pictures.forEach(function (item, idx, arr) {
        photosStr += `<div class="photo">
                        <h3>${item.caption}</h3>
                        <img src="${item.photo}" alt="">
                      </div>`
      });


      $('.albumDetail').addClass('active');
      $('.albumDetail').siblings().removeClass('active');
      $('.albumDetail').html(navbarSet);
      $('.albumDetail').html(photosStr);
      $('.albumDetail .photo img').on('click', function(event){
        $(this).addClass('scaleImg');
      });

      // $('body').html(navbarSet);
  })
})
