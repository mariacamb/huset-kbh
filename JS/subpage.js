// url

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log("get article " + id)

fetch("http://cambalova.com/wordpress/wp-json/wp/v2/events/" + id + "?_embed")

    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(aPost) {
    console.log(aPost);


    //title
    document.querySelector("#singleEvent h1").textContent = aPost.title.rendered;


    //date
    var year = aPost.acf.date.substring(2, 4);
    var month = aPost.acf.date.substring(4, 6);
    var day = aPost.acf.date.substring(6, 8);

    document.querySelector(".date").textContent = day + "/" + month + "/" + year;


    //price
    document.querySelector(".price span").textContent = aPost.acf.price_;

    document.querySelector(".description").innerHTML = aPost.content.rendered


    //IMAGE 
    if (aPost._embedded["wp:featuredmedia"]) { //img is there
        document.querySelector(".picture").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        document.querySelector(".picture").remove()
    }

//FBlink
    
     document.querySelector(".fblink").textContent= aPost.acf.facebook_link_;
    
    
    
    
    let eventlist = document.querySelector("#eventlist");
    eventlist.appendChild(clone);

}






document.querySelector("#singleEvent").classList.add("slideInEvent");
