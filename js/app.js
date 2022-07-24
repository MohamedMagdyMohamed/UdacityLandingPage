/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sectionsElements = document.querySelectorAll('section');
const navbarElement = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavbar() {
  let navList = '';
  function navBarItem(section) {
    navList += `<li><a class="menu__link" href="#${section.id}" data-navigation="${section.id}" id="navBar_${section.id}">${section.dataset.nav}</a></li>`;
  }
  sectionsElements.forEach(navBarItem);
  navbarElement.innerHTML = navList;
}

// Add class 'active' to section when near top of viewport
function setSectionsAndNavItemAsActive() {
  sectionsElements.forEach((section) => {
    const sectionItem = document.getElementById(section.id);
    const navItem = document.getElementById(`navBar_${section.id}`);
    const elementOffset = section.getBoundingClientRect();
    if (elementOffset.top <= 100 && elementOffset.bottom >= 100) {
      sectionItem.classList.add('your-active-class');
      navItem.classList.add('your-active-class');
    } else {
      sectionItem.classList.remove('your-active-class');
      navItem.classList.remove('your-active-class');
    }
  });
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchorIdWhenClick(event) {
  event.preventDefault();
  if (event.target.dataset.navigation) {
    const item = document.getElementById(`${event.target.dataset.navigation}`);
    item.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${event.target.dataset.navigation}`;
    }, 100);
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavbar();

// Scroll to section on link click
navbarElement.addEventListener("click", scrollToAnchorIdWhenClick);

// Set sections as active
document.addEventListener('scroll', setSectionsAndNavItemAsActive);
