document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');

  // טען את מצב הדארק מה‑localStorage
  if(localStorage.getItem('dark-theme') === 'true') {
    document.body.classList.add('dark-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  // כפתור המעבר
  themeToggle.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.toggle('dark-theme');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');

    localStorage.setItem('dark-theme', document.body.classList.contains('dark-theme'));
  });
});
