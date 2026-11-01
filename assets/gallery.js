// Without JavaScript the navigation is a list of links to six visible figures.
const navigation = document.querySelector('.gallery-nav');
const tabs = Array.from(navigation.querySelectorAll('a'));
const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));

function selectScreen(index) {
  tabs.forEach((tab, position) => {
    const selected = position === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[position].hidden = !selected;
  });
}

navigation.setAttribute('role', 'tablist');
tabs.forEach((tab, index) => {
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panels[index].id);
  panels[index].setAttribute('role', 'tabpanel');
  panels[index].setAttribute('aria-labelledby', tab.id);
  tab.addEventListener('click', event => {
    event.preventDefault();
    selectScreen(index);
    history.replaceState(null, '', tab.hash);
  });
  tab.addEventListener('keydown', event => {
    let next;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % tabs.length; break;
      case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      case ' ': next = index; break;
      default: return;
    }
    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  });
});

function followFragment() {
  const index = tabs.findIndex(tab => tab.hash === location.hash);
  if (index >= 0) selectScreen(index);
}
selectScreen(0);
followFragment();
window.addEventListener('hashchange', followFragment);
