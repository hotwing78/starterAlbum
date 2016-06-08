var albumTemplates = {

     albumCoverTemplate:`<div class="album" data-id="<%= id %>">
                          <h3><%= title %></h3>
                          <img src="<%= cover %>" alt="">
                        </div>`,

      albumContentTemplate: `<div class="photo">
                      <h3><%= caption %></h3>
                      <img src="<%= photo %>" alt="">
                    </div>`,

      navbarLiTemplate:`<li class = "albumLink" data-id="<%= id %>"> <%= title %> </li>`


}
