let template = document.querySelector("#eventstemp").content;
let eventlist = document.querySelector("#eventlist");
let page = 1;
let lookingForData = false;

function fetchEvents() {
    lookingForData = true;
    
    /*
    fetch("http://cambalova.com/wordpress/wp-json/wp/v2/events?_embed&per_page=3&page=" + page)
        .then(e => e.json())
        .then(showEvents)

}

*/
 let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");
    if(catid) {
        fetch("http://cambalova.com/wordpress/wp-json/wp/v2/events?_embed&per_page=5&categories=9,11&order=asc&page=" + page + "&categories=" + catid)
        .then(e => e.json())
        .then(showEvents);

    } else {
         fetch("http://cambalova.com/wordpress/wp-json/wp/v2/events?_embed&per_page=5&categories=9,11&order=asc&page=" + page)
        .then(e => e.json())
        .then(showEvents);
    }

}










function showEvents(data) {
    console.log(data)
    data.forEach(showSingleEvent)
    lookingForData = false;
}

function showSingleEvent(anEvent) {
    console.log(anEvent);
    let template = document.querySelector("#eventstemp").content;
    let clone = template.cloneNode(true);

    
    
    
    
    

    //TITLE
    clone.querySelector("h1").textContent = anEvent.title.rendered;

    //DATE
    var year = anEvent.acf.date.substring(2, 4);
    var month = anEvent.acf.date.substring(4, 6);
    var day = anEvent.acf.date.substring(6, 8);

    clone.querySelector(".date").textContent = day + "/" + month + "/" + year;

    //TIME
    clone.querySelector(".time").textContent = anEvent.acf.time;

    //LOCATION
    clone.querySelector(".location").textContent = anEvent.acf.venue;

    //PRICE
    clone.querySelector(".price span").textContent = anEvent.acf.price_;


    //READ MORE
    clone.querySelector(".readmore").href = "subpage.html?id=" + anEvent.id;

   


    //IMAGE 
    if (anEvent._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        clone.querySelector("img").remove()
    }


    let eventlist = document.querySelector("#eventlist");
    eventlist.appendChild(clone);

}





fetchEvents();

//SCROLLING
setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("We've reached rock bottom, fetching articles")
        page++;
        fetchEvents();
    }
}, 1000)


function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}
