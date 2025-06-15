document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('guest-form');
  const guestList = document.getElementById('guest-list');
  const guestNameInput = document.getElementById('guest-name');
  const guestCategorySelect = document.getElementById('guest-category');
  const MAX_GUESTS = 10;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = guestNameInput.value.trim();
    const category = guestCategorySelect.value;

    if (!name || !category) return;

    if (guestList.children.length >= MAX_GUESTS) {
      alert("Guest list limit reached (10 guests max).");
      console.log(" Guest list full: cannot add more than 10 guests");
      return;
    }

    console.log(`Guest added: ${name}, Category: ${category}`);

    const li = document.createElement('li');

    const guestInfo = document.createElement('div');
    guestInfo.className = 'guest-info';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${name} - Not Attending`;
    guestInfo.appendChild(nameSpan);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    const rsvpBtn = document.createElement('button');
    rsvpBtn.textContent = 'Toggle RSVP';
    rsvpBtn.className = 'rsvp-btn';
    rsvpBtn.addEventListener('click', () => {
      if (nameSpan.textContent.includes("Attending")) {
        nameSpan.textContent = `${name} - Not Attending`;
      } else {
        nameSpan.textContent = `${name} - Attending`;
      }
      console.log(`🔁 RSVP toggled for: ${nameSpan.textContent}`);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      guestList.removeChild(li);
      console.log(`Guest removed: ${nameSpan.textContent}`);
      logCurrentGuestList();
    });

    buttonGroup.appendChild(rsvpBtn);
    buttonGroup.appendChild(deleteBtn);

    const tag = document.createElement('span');
    tag.className = `tag ${category}`;
    tag.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    timestamp.textContent = `Added at ${new Date().toLocaleTimeString()}`;

    li.appendChild(guestInfo);
    li.appendChild(buttonGroup);
    li.appendChild(tag);
    li.appendChild(timestamp);

    guestList.appendChild(li);

    logCurrentGuestList();


    guestNameInput.value = '';
    guestCategorySelect.value = '';
  });

  function logCurrentGuestList() {
    console.log("Current Guest List:");
    [...guestList.children].forEach((li, index) => {
      const text = li.querySelector('.guest-info span').textContent;
      console.log(`${index + 1}. ${text}`);
    });
  }
});
