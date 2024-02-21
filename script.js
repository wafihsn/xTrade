function submitLead() {
    const leadData = {
      email: document.getElementById('email').value,
      fullName: document.getElementById('fullName').value,
      countryCodeISO2: document.getElementById('countryCodeISO2').value,
      phoneCountryCode: document.getElementById('phoneCountryCode').value,
      phoneAreaCode: document.getElementById('phoneAreaCode').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      language: document.getElementById('language').value,
      affTrack: document.getElementById('affTrack').value,
      affToken: document.getElementById('affToken').value,
    };

    console.log(leadData)

    fetch('https://xrade-api.onrender.com/api/lead/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      alert(data.message);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  }