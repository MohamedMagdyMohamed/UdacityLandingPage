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

const NAV_BAR_ITEM_PREFIX = 'navBar_';

const sectionsElements = document.querySelectorAll('section');
const navbarElement = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * getBoundingClientRect method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
 * get the height of the navBar section and check if the section is in the viewport minus the navbar.
 * elementBoundingClientRect.top -> top of the viewport to top of the section element.
 * elementBoundingClientRect.bottom -> top of the viewport to bottom of the sections element.
 */
function isElementVisibleInVisibleInViewPort(element) {
  const elementBoundingClientRect = element.getBoundingClientRect();
  const padding = parseInt(navbarElement.offsetHeight);
  return elementBoundingClientRect.top <= padding && elementBoundingClientRect.bottom >= padding;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavbar() {
  sectionsElements.forEach((section) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    // Create html element
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    // Sets Attribute to an element
    newA.setAttribute("class", "menu__link");
    newA.setAttribute("href", `#${section.id}`);
    newA.setAttribute("id", `${NAV_BAR_ITEM_PREFIX}${section.id}`);
    newA.text = section.dataset.nav;

    newA.onclick = scrollToAnchorIdWhenClick;

    // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
    // Add a node to the end of the parent element
    newLi.appendChild(newA);

    navbarElement.appendChild(newLi);
  });
}

// Add class 'active' to section when near top of viewport
function setSectionsAndNavItemAsActive() {
  sectionsElements.forEach((section) => {
    const sectionItem = document.getElementById(section.id);
    const navItem = document.getElementById(`${NAV_BAR_ITEM_PREFIX}${section.id}`);
    if (isElementVisibleInVisibleInViewPort(section)) {
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
  // preventDefault to prevet the a element default behaviour to be able to add smoth scroll
  event.preventDefault();
  // Remove the prefix 'navBar_'
  // The a element have an id = navBar_{sectionId}
  const sectionId = `${event.target.id}`.slice(NAV_BAR_ITEM_PREFIX.length);
  const item = document.getElementById(sectionId);
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  // Scroll to the element's parent container with a smooth transition animation
  item.scrollIntoView({ behavior: "smooth" });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

/**
 * Build menu
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
 * The onLoad fire when the whole page is fully loaded
 */
window.onload = buildNavbar();

// Set sections as active
document.addEventListener('scroll', setSectionsAndNavItemAsActive);
