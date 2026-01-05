function showAccordion(targetAccordionIds, activeButtonId) {
  // Hide all accordions
  const accordions = ['accordion2025', 'accordion2026', 'accordionRegular'];
  accordions.forEach((id) => {
    document.getElementById(id).classList.add('d-none');
  });

  // Show the target accordion(s)
  // targetAccordionIds can be a string or an array of strings
  const idsToShow = Array.isArray(targetAccordionIds) ? targetAccordionIds : [targetAccordionIds];
  idsToShow.forEach((id) => {
    document.getElementById(id).classList.remove('d-none');
  });

  // Update button styles
  const primaryButtons = ['showRegular', 'showLonger', 'showArchived'];
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

  // Collapse all accordion items in the displayed accordion(s)
  idsToShow.forEach((id) => {
    collapseAllAccordionItems(id);
  });
}

// This function is no longer needed as we removed the dropdown structure
// Keeping it as a no-op function in case it's referenced elsewhere
function updateLongerDropdownActive(selectedYear) {
  // No-op: dropdown structure has been removed
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
document.getElementById('showRegular').addEventListener('click', function () {
  showAccordion('accordionRegular', 'showRegular');
});

document.getElementById('showLonger').addEventListener('click', function () {
  showAccordion('accordion2026', 'showLonger');
});

document.getElementById('showArchived').addEventListener('click', function () {
  showAccordion('accordion2025', 'showArchived');
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
handleAccordionToggle('accordionRegular');

// Initial state: Show the Regular Rides accordion
showAccordion('accordionRegular', 'showRegular');
