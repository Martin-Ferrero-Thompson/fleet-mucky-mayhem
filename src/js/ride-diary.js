function showAccordion(targetAccordionId, activeButtonId) {
  // Hide all accordions
  const accordions = ['accordion2024', 'accordion2025', 'accordionRegular'];
  accordions.forEach((id) => {
    document.getElementById(id).classList.add('d-none');
  });

  // Show the target accordion
  document.getElementById(targetAccordionId).classList.remove('d-none');

  // Update button styles
  const buttons = ['show2024', 'show2025', 'showRegular'];
  buttons.forEach((id) => {
    const button = document.getElementById(id);
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
document.getElementById('show2025').addEventListener('click', function () {
  showAccordion('accordion2025', 'show2025');
});

document.getElementById('show2024').addEventListener('click', function () {
  showAccordion('accordion2024', 'show2024');
});

document.getElementById('showRegular').addEventListener('click', function () {
  showAccordion('accordionRegular', 'showRegular');
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

// Apply the toggle handler to all three accordions
handleAccordionToggle('accordion2025');
handleAccordionToggle('accordion2024');
handleAccordionToggle('accordionRegular');

// Initial state: Show the 2025 accordion but collapse all items
showAccordion('accordion2025', 'show2025');
