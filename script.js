document.getElementById('admin-btn').addEventListener('click', () => {
  const password = prompt('Enter Admin Password:');
  
  if (password === 'uhhss123') {
    alert('✅ Admin mode enabled! You can now edit everything.');

    // Enable editing
    document.querySelectorAll('.score, table td').forEach(el => {
      el.contentEditable = "true";
      el.style.background = "#222";
    });

    // Add Save Button dynamically
    if (!document.getElementById('save-btn')) {
      const saveBtn = document.createElement('button');
      saveBtn.id = 'save-btn';
      saveBtn.textContent = '💾 Save Changes';
      saveBtn.style.marginTop = '20px';
      saveBtn.style.padding = '10px 20px';
      saveBtn.style.background = '#d4af37';
      saveBtn.style.border = 'none';
      saveBtn.style.borderRadius = '6px';
      saveBtn.style.cursor = 'pointer';
      saveBtn.style.fontWeight = 'bold';
      document.body.appendChild(saveBtn);

      // Save changes
      saveBtn.addEventListener('click', () => {
        const groups = {};
        ['groupA','groupB','groupC','groupD'].forEach(id => {
          groups[id] = document.getElementById(id).innerHTML;
        });
        const scores = Array.from(document.querySelectorAll('.score')).map(s => s.textContent);
        localStorage.setItem('tournamentData', JSON.stringify({ groups, scores }));
        alert('Changes saved!');
      });
    }
  } else if (password) {
    alert('❌ Incorrect password!');
  }
});

// Load saved data
window.addEventListener('load', () => {
  const data = JSON.parse(localStorage.getItem('tournamentData'));
  if (data) {
    Object.keys(data.groups).forEach(id => {
      document.getElementById(id).innerHTML = data.groups[id];
    });
    const scores = document.querySelectorAll('.score');
    data.scores.forEach((s, i) => {
      if (scores[i]) scores[i].textContent = s;
    });
  }
});