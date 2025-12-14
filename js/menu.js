fetch("header.html")
.then(res => res.text())
.then(data => {
	document.getElementById("header").innerHTML = data;
    let currentPage = window.location.pathname.split("/").pop();
    if ( !currentPage || currentPage == "#" ) {
		currentPage = "index.html";
    }
    // menu me anchor tak pahuchne ka tareeka
    let links = document.querySelectorAll(".menu .menubar ul li a");
        
	// hr anchor tag ko process karenge
    links.forEach(link => {
		//pehle  anchor tag ka href ki value save karenge
    	let linkPage = link.getAttribute("href");
		
        if(!linkPage) return;
  
        if (linkPage == currentPage) {
      		link.closest("li").classList.add("underline_current");
    	} 
	});

	if(window.innerwidth <= 768) {
	// Use the existing .mobilebar div to insert a hamburger
    const mobilebar = document.querySelector(".menu .mobilebar");
    const menuWrapper = document.querySelector(".menu");
    const menubarUL = document.querySelector(".menu .menubar ul");

	// create hamburger if not present
    if (mobilebar && !mobilebar.querySelector(".hamburger")) {
		const hb = document.createElement("div");
        hb.className = "hamburger";
        hb.setAttribute("aria-label", "Toggle menu");
        hb.setAttribute("role", "button");
        hb.setAttribute("tabindex", "0");
        hb.innerHTML = '<span></span>';
        mobilebar.appendChild(hb);

        // toggle menu on click / enter key
        hb.addEventListener("click", function(e) {
        	e.stopPropagation();
          	menuWrapper.classList.toggle("mobile-open");
        });
		
        hb.addEventListener("keydown", function(e) {
          	if (e.key === "Enter" || e.key === " ") {
            	e.preventDefault();
            	menuWrapper.classList.toggle("mobile-open");
          	}
        });

        // close menu when clicking outside
    	document.addEventListener("click", function(ev) {
        	if (!menuWrapper.contains(ev.target)) {
        		menuWrapper.classList.remove("mobile-open");
          	}
        });
	}

    // add submenu toggles for items that have submenu
	const itemsWithSub = document.querySelectorAll(".menu .menubar ul li");
    itemsWithSub.forEach(li => {
    	const submenu = li.querySelector(".submenu");
        if (submenu) {
        	// mark li for CSS if needed
          	li.classList.add("has-submenu");

          	// if toggle button not present, create it (only visible on mobile via CSS)
          	if (!li.querySelector(".submenu-toggle")) {
	            const toggle = document.createElement("button");
	            toggle.className = "submenu-toggle";
	            toggle.setAttribute("aria-expanded", "false");
	            toggle.innerHTML = '<span style="display:inline-block; transform:rotate(0deg);">▸</span>';
	            
				// insert at end of li (after link)
	            const firstLink = li.querySelector("a");
	            if (firstLink) firstLink.after(toggle);
	
	            // click toggles the submenu in mobile
	            toggle.addEventListener("click", function(ev) {
	            	ev.stopPropagation();
	              	const isOpen = li.classList.toggle("open-submenu");
	              	toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
	            });
	
	            // also allow parent link to toggle on small screens (prevent navigation)
	            const parentLink = li.querySelector("a");
	            parentLink && parentLink.addEventListener("click", function(ev) {
	            	if (window.innerWidth <= 768) {
	                	ev.preventDefault();
	                	const isOpen = li.classList.toggle("open-submenu");
	                	const t = li.querySelector(".submenu-toggle");
	                	if (t) t.setAttribute("aria-expanded", isOpen ? "true" : "false");
	              	}
	            });
	        }
    	}
    });

	// ensure on resize desktop gets back normal state
	window.addEventListener("resize", function(){
    	menuWrapper.classList.remove("mobile-open");
      	document.querySelectorAll(".menu .menubar ul li.open-submenu").forEach(li => {
        	li.classList.remove("open-submenu");
        	const t = li.querySelector(".submenu-toggle");
        	if (t) t.setAttribute("aria-expanded", "false");
        });
		// reset inline display of submenus (so desktop CSS takes over)
		document.querySelectorAll(".menu .menubar ul li .submenu").forEach(s => {
          	s.style.display = "";
        });
	});
	}
}) // end then
.catch(err => {
    console.error("Header load failed:", err);
});
