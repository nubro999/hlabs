/* ============================================
   CONTACT FORM — Email Handler
   Uses mailto: to send emails to harry@helioslabs.info
   ============================================ */

(function () {
  'use strict';

  const RECIPIENT_EMAIL = 'harry@helioslabs.info';

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!fullName || !email || !subject || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Build email body
    const body = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      '',
      `Message:`,
      message
    ].filter(Boolean).join('\n');

    // Construct mailto link
    const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Disable button during process
    submitBtn.disabled = true;
    const btnSpan = submitBtn.querySelector('span');
    const originalText = btnSpan.textContent;
    btnSpan.textContent = 'Opening Email Client...';

    // Open mailto
    window.location.href = mailtoLink;

    // Show success & reset after delay
    setTimeout(() => {
      showStatus('Your email client has been opened. Please send the email to complete your request.', 'success');
      form.reset();
      btnSpan.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;

    // Auto-hide after 6 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 6000);
  }
})();
