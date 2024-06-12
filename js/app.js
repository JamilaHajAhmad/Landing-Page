// Declaration and Initialization of variables
const pageSections = document.querySelectorAll('section');
pageSections[0].setAttribute('class','active');
const navBarUl = document.createElement('ul');
navBarUl.className = 'links';
const pageHeader = document.getElementsByTagName('header')[0];

// Creating links dynamically and append them to ul
for(let i = 0; i < pageSections.length; i++) {
    const listItem = document.createElement('li');
    const listItemTag = document.createElement('a');
    listItemTag.textContent = pageSections[i].getAttribute('data-nav');
    listItemTag.setAttribute('href','#');
    listItem.appendChild(listItemTag);
    navBarUl.appendChild(listItem);
}
pageHeader.appendChild(navBarUl);

// Click event functionality
const links = document.querySelectorAll('ul li a');
navBarUl.addEventListener('click',(event) => {
    if(event.target.nodeName === 'A') {
        event.preventDefault();
        for(const link of links) {
            link.classList.remove('active');
        }
        event.target.className = 'active';
        let desiredSection = document.querySelector(`[data-nav='${event.target.textContent}']`);
        for(const section of pageSections) {
            section.classList.remove('active');
        }
        desiredSection.className = 'active';
        desiredSection.scrollIntoView({
            behavior: "smooth"
        });
    }
});

// Scroll event functionality
document.addEventListener('scroll',() => {
    for (const section of pageSections) {
        let rect = section.getBoundingClientRect();
        let dataNav = section.getAttribute('data-nav');
        if(rect.top <= 150 && rect.bottom >= 150) {
            for(let i = 0; i < links.length; i++) {
                if(links[i].textContent === dataNav) {
                    links[i].classList.add('active');
                    pageSections[i].classList.add('active');
                }
                else {
                    links[i].classList.remove('active');
                    pageSections[i].classList.remove('active');
                }
            }
        }

    }
});

// For styling issues
const toggleMenu = document.querySelector('.toggle-menu');
toggleMenu.appendChild(navBarUl);
