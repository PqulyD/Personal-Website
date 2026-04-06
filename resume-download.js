document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('resume-download-btn');
  
  if (!button) {
    console.error('Resume download button not found');
    return;
  }

  button.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Create a link element that triggers download
    const link = document.createElement('a');
    link.href = "Paul's_Resume.png";
    link.download = "Paul's_Resume.png";
    link.style.display = 'none';
    
    // Append, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
