function showAccordion(targetAccordionId, activeButtonId) {
  // Hide all accordions
  const accordions = ['accordion2024', 'accordion2025', 'accordion2026', 'accordionRegular'];
  accordions.forEach((id) => {
    document.getElementById(id).classList.add('d-none');
  });

  // Show the target accordion
  document.getElementById(targetAccordionId).classList.remove('d-none');

  // Update button styles
  const primaryButtons = ['showRegular', 'showLonger'];
  primaryButtons.forEach((id) => {
    const button = document.getElementById(id);
    if (!button) return;
    if (id === activeButtonId) {
      button.classList.add('btn-warning');
      button.classList.remove('btn-secondary');
    } else {
      button.classList.add('btn-secondary');
      button.classList.remove('btn-warning');
    }
  });

  // Collapse all accordion items in the displayed accordion
  collapseAllAccordionItems(targetAccordionId);
}

// Update the Longer Rides dropdown to reflect the currently selected year
// selectedYear: '2024' | '2025' | '2026' | null
function updateLongerDropdownActive(selectedYear) {
  const yearItemIds = ['show2024', 'show2025', 'show2026'];

  yearItemIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Clear any previous active/aria-current states
    el.classList.remove('active');
    el.removeAttribute('aria-current');
  });

  if (selectedYear) {
    const activeId = `show${selectedYear}`;
    const activeEl = document.getElementById(activeId);
    // Only set active if the element exists and is not disabled (avoid highlighting disabled 2026)
    if (activeEl && !activeEl.hasAttribute('disabled')) {
      activeEl.classList.add('active');
      activeEl.setAttribute('aria-current', 'true');
    }
  }
}

function collapseAllAccordionItems(accordionId) {
  const accordion = document.getElementById(accordionId);
  if (!accordion) return;

  const items = accordion.querySelectorAll('.accordion-item');
  items.forEach((item) => {
    const button = item.querySelector('.accordion-button');
    const collapse = item.querySelector('.accordion-collapse');

    button.classList.add('collapsed');
    button.setAttribute('aria-expanded', 'false');
    collapse.classList.remove('show');
  });
}

// Add event listeners for buttons
document.getElementById('show2026').addEventListener('click', function () {
  showAccordion('accordion2026', 'showLonger');
  updateLongerDropdownActive('2026');
});

document.getElementById('show2025').addEventListener('click', function () {
  showAccordion('accordion2025', 'showLonger');
  updateLongerDropdownActive('2025');
});

document.getElementById('show2024').addEventListener('click', function () {
  showAccordion('accordion2024', 'showLonger');
  updateLongerDropdownActive('2024');
});

document.getElementById('showRegular').addEventListener('click', function () {
  showAccordion('accordionRegular', 'showRegular');
  // Clear active year highlight when Regular Rides is selected
  updateLongerDropdownActive(null);
});

// Ensure only one accordion item is expanded at a time
function handleAccordionToggle(accordionId) {
  const accordion = document.getElementById(accordionId);
  if (!accordion) return;

  const items = accordion.querySelectorAll('.accordion-item');

  items.forEach((item) => {
    const button = item.querySelector('.accordion-button');
    const collapse = item.querySelector('.accordion-collapse');

    button.addEventListener('click', () => {
      // Collapse all other items within the same accordion
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherButton = otherItem.querySelector('.accordion-button');
          const otherCollapse = otherItem.querySelector('.accordion-collapse');
          otherButton.classList.add('collapsed');
          otherButton.setAttribute('aria-expanded', 'false');
          otherCollapse.classList.remove('show');
        }
      });
    });
  });
}

// Apply the toggle handler to all accordions
handleAccordionToggle('accordion2026');
handleAccordionToggle('accordion2025');
handleAccordionToggle('accordion2024');
handleAccordionToggle('accordionRegular');

// Initial state: Show the Regular Rides accordion and clear Longer Rides highlight
showAccordion('accordionRegular', 'showRegular');
updateLongerDropdownActive(null);
