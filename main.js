
$(document).ready(function () {
  photoAlbum.init();
})

var photoAlbum = {
    init: function(){
      photoAlbum.styling();
      photoAlbum.events();
      // photoAlbum.events();
    },

    styling: function(){
      $('.albums').html('');
      albums.forEach(function (elem,idx){
        var albumStr = photoAlbum.htmlGenerate(albumTemplates.albumCoverTemplate,elem);
          $('.albums').append(albumStr); // add albums
      })
    },

    events: function(){
            $('.albums').on('click', '.album', function(event) {
              event.preventDefault();
                console.log($(this).data('id'));
                var albumId = $(this).data('id');

                var selectedAlbum = albums.filter(function (item, idx, arr) {
                  return item.id === albumId;
                });

                albums.forEach(function(item,idx,arr){
                  var navli = photoAlbum.htmlGenerate(albumTemplates.navbarLiTemplate,item)
                  console.log(navli);
                  $('section.albumDetail aside.navbar nav ul').append(navli);
                });

                selectedAlbum[0].pictures.forEach(function (item, idx, arr) {
                  var photosStr = photoAlbum.htmlGenerate(albumTemplates.albumContentTemplate,item);
                  $('.albumDetail').append(photosStr);
                });
              //end of albums.forEach.... this attaches the list items to my unordered list on the page

              $(`header h1`).text(albumId);// changes the title of the header to the selected album
              $('.albumDetail').addClass('active');// this makes my selected album visible
              $('.albumDetail').siblings().removeClass('active');// this hides the other items
          });

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
                 $('.albumDetail').on('click', 'li', function(event){
                       event.preventDefault();
                       var  anotherAlbumId = $(this).data('id');
                       $(`h1`).text(anotherAlbumId);
                       $(`.albumDetail .photo`).remove();
                       var anotherAlbum = albums.filter(function (item, idx, arr) {
                             return item.id === anotherAlbumId;
                           });
                           anotherAlbum[0].pictures.forEach(function (item, idx, arr) {
                              var  anotherPhotosStr = photoAlbum.htmlGenerate(albumTemplates.albumContentTemplate,item);
                             $('.albumDetail').append(anotherPhotosStr);
                                 });
                  });
  },

    getTemplate: function(template) {
      return _.template(template);
    },

    htmlGenerate: function(template,data){
      var tmpl = photoAlbum.getTemplate(template);
      return tmpl(data);
    }

}//end of refactor
