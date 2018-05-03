




   fetch("http://cambalova.com/wordpress/wp-json/wp/v2/categories?categories=9,11")
      .then(e => e.json())
      .then(buildMenu)


  function buildMenu(data) {
      let parentElement = document.querySelector(".nav-container ul");
      data.forEach(item => {
          console.log(item);
          if(item.count > 0 && item.parent===25) {
          let li = document.createElement("li");
          let a = document.createElement("a");
          a.textContent = item.name;
          a.href = "index.html?category=" + item.id;

          li.appendChild(a);
          parentElement.appendChild(li);

          }
      })



  }




        
        



