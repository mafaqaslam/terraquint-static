// Share buttons for article pages (LinkedIn, X, Email).
const linkedinBtn = document.getElementById('share-linkedin');
const xBtn = document.getElementById('share-x');
const emailBtn = document.getElementById('share-email');

if (linkedinBtn) {
  linkedinBtn.addEventListener('click', function() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=500');
  });
}

if (xBtn) {
  xBtn.addEventListener('click', function() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://x.com/intent/tweet?text=${title}&url=${url}`, '_blank', 'width=600,height=400');
  });
}

if (emailBtn) {
  emailBtn.addEventListener('click', function() {
    const subject = encodeURIComponent(document.title);
    const body = encodeURIComponent(`Check out this article: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
}
