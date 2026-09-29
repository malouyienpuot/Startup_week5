const presentationData = {
  title: 'Startup Week 5',
  lead:
    'A clean and editable presentation for a simple startup project built with modern web technologies.',
  overview:
    'This project is a simple, clear, and professional presentation page that explains the idea, goals, and value of the startup concept in a way that is easy to share and edit.',
  highlights: [
    {
      icon: '🎯',
      title: 'Clear message',
      text: 'The presentation focuses on a simple story that visitors can understand in seconds.',
    },
    {
      icon: '💡',
      title: 'Editable structure',
      text: 'The content is organized in a way that makes updates quick and easy to maintain.',
    },
    {
      icon: '📱',
      title: 'Responsive design',
      text: 'The layout adapts smoothly across desktop, tablet, and mobile screens.',
    },
  ],
  technologies: [
    { name: 'HTML5', detail: 'Structure and content' },
    { name: 'CSS3', detail: 'Styling and layout' },
    { name: 'JavaScript', detail: 'Interactivity' },
    { name: 'GitHub', detail: 'Project hosting' },
  ],
  email: 'puotmalouyien@gmail.com',
  phone: '+25498565702',
};

const titleEl = document.getElementById('project-title');
const leadEl = document.getElementById('project-lead');
const overviewEl = document.getElementById('project-overview');
const featureListEl = document.getElementById('feature-list');
const techListEl = document.getElementById('tech-list');
const emailLinkEl = document.getElementById('email-link');
const phoneLinkEl = document.getElementById('phone-link');
const yearEl = document.getElementById('year');

if (titleEl) titleEl.textContent = presentationData.title;
if (leadEl) leadEl.textContent = presentationData.lead;
if (overviewEl) overviewEl.textContent = presentationData.overview;

if (featureListEl) {
  featureListEl.innerHTML = presentationData.highlights
    .map(
      (item) => `
        <article class="feature-item">
          <div class="icon" aria-hidden="true">${item.icon}</div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join('');
}

if (techListEl) {
  techListEl.innerHTML = presentationData.technologies
    .map(
      (tech) => `
        <div class="tech-item">
          <strong>${tech.name}</strong>
          <p>${tech.detail}</p>
        </div>
      `,
    )
    .join('');
}

if (emailLinkEl) {
  emailLinkEl.href = `mailto:${presentationData.email}`;
  emailLinkEl.textContent = presentationData.email;
}

if (phoneLinkEl) {
  phoneLinkEl.href = `tel:${presentationData.phone.replace(/\s+/g, '')}`;
  phoneLinkEl.textContent = presentationData.phone;
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
