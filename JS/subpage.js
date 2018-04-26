// url

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log("get article " + id)

fetch("http://cambalova.com/wordpress/wp-json/wp/v2/events/"+id)

    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(aPost) {
    console.log(aPost);

 document.querySelector("#singleEvent h1").textContent = aPost.title.rendered;
    
    
     var year = aPost.acf.date.substring(2, 4);
    var month = aPost.acf.date.substring(4, 6);
    var day = aPost.acf.date.substring(6, 8);

    document.querySelector(".date").textContent = day + "/" + month + "/" + year;    
  
     document.querySelector(".price span").textContent = aPost.acf.price_;
    
     document.querySelector(".description").innerHTML = aPost.content.rendered
    
    document.querySelector(".fblink").textContent= aPost.acf.facebook_link_;
    
     
     
    
    
    
    
    
    
    
    
    
    document.querySelector("#singleEvent").classList.add("slideInEvent");
}
    
    
     