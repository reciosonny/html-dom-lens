console.log('This is the foreground.js');

function initializeDomEvents() {
    console.log('library injected...');

    document.addEventListener('click', e => {
      console.log(e);
    });

    // for styling
    document.addEventListener('mouseover', e => e.target.style = 'border: 5px solid green');
    document.addEventListener('mouseout', e => e.target.style = '');
    // end
  }

  initializeDomEvents();