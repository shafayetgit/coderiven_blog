document.addEventListener('DOMContentLoaded', function () {
    var clipboard = new ClipboardJS('.js-copy-btn', {
        target: function (trigger) {
            // Get the copy ID from the button's data attribute
            var copyId = trigger.getAttribute('data-copy-id');
            // Find and return the corresponding text element
            return document.querySelector('.copy[data-copy-id="' + copyId + '"]');
        }
    });

    clipboard.on('success', function (e) {
        console.log('Text copied to clipboard:', e.text);

        // Show the notification message within the button that was clicked
        var notification = e.trigger.querySelector('.notification');
        notification.style.display = 'inline';

        // Hide the notification message after 2 seconds
        setTimeout(function () {
            notification.style.display = 'none';
        }, 2000);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
});


