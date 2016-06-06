
$(document).ready(function () {
  var albumsStr = '';

  albums.forEach(function (item, idx, arr) {
    albumsStr += `<div class="album" data-id="${item.id}">
                  <h3>${item.title}</h3>
                  <img src="${item.cover}" alt="">
                </div>`;
    })// end of albums.forEach



  $('.albums').html(albumsStr); // add albums

  $('.albums').on('click', '.album', function (event) {
      console.log($(this).data('id'));
      var albumId = $(this).data('id');

      var selectedAlbum = albums.filter(function (item, idx, arr) {
        return item.id === albumId;
      })//end of selectedAlbum filter function;

      $(`header h1`).text(albumId);// changes the title of the header to the selected album

     albums.forEach(function(item,idx,arr){
       $('.albumDetail .navbar nav ul').append(`<li class = "albumLink" data-id="${item.id}">${item.title}</li>`);
     });//end of albums.forEach.... this attaches the list items to my unordered list on the page

      var photosStr= '';

      selectedAlbum[0].pictures.forEach(function (item, idx, arr) {
        photosStr += `<div class="photo">
                        <h3>${item.caption}</h3>
                        <img src="${item.photo}" alt="">
                      </div>`
          });//end of selectedAlbum..... this loads my photos from the selected items to the html document.

      $('.albumDetail').addClass('active');// this makes my selected album visible
      $('.albumDetail').siblings().removeClass('active');// this hides the other items
      $('.albumDetail').append(photosStr);// this attaches my photos to the active document
    });//End of the album on click event handler

      $('body').on('click', '.photo', function(event){
         event.preventDefault();
         if(!$(this).hasClass('scaleImg')){
         $(this).addClass('scaleImg');
         $('h3').addClass('hidden');
         }else{
           $('h3').removeClass('hidden');
           $(this).removeClass('scaleImg');
         }
       });

      $('body').on('click', '.albumDetail .navbar ul li', function(event){
           event.preventDefault();
           var  anotherAlbumId = $(this).data('id');
           $(`h1`).text(anotherAlbumId);

           $(`.albumDetail .photo`).remove()

           var anotherAlbum = albums.filter(function (item, idx, arr) {
             return item.id === anotherAlbumId;
           });

           var photosStr = '';
           anotherAlbum[0].pictures.forEach(function (item, idx, arr) {
             photosStr += `<div class="photo">
                             <h3>${item.caption}</h3>
                             <img src="${item.photo}" alt="">
                           </div>`
               });
          $('.albumDetail').append(photosStr);
        }) // end of the li on click event handler

})// end of the document ready function
