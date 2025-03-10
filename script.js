// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', function () {
    const hamIcon = this.querySelector('.hamburger-icon');
    const crossIcon = this.querySelector('.cross-icon');

    if (hamIcon && crossIcon) { // Check if elements exist
        if (hamIcon.style.display === "none") {
            hamIcon.style.display = "inline-block";
            menu.style.display = "none";
            crossIcon.style.display = "none";
        } else {
            crossIcon.style.display = "inline-block";
            hamIcon.style.display = "none";
            menu.style.display = "flex"; // Use "flex" for better layout
        }
    }
});

// Smooth Scrolling for Menu Links
document.querySelectorAll('.menu-list-items a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close menu on mobile after clicking a link
        if (window.innerWidth <= 768) {
            menu.style.display = 'none';
            const hamIcon = document.querySelector('.hamburger-icon');
            const crossIcon = document.querySelector('.cross-icon');
            if (hamIcon && crossIcon) {
                hamIcon.style.display = 'inline-block'; // Show hamburger
                crossIcon.style.display = 'none';       // Hide cross
            }
        }
    });
});

// Form Submission Handling
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let formData = new FormData(this);

    fetch("process-form.php", { // Ensure this file exists on the server
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("responseMessage").style.display = "block";
        document.getElementById("responseMessage").innerText = data;
        document.getElementById("contactForm").reset(); // Reset form after submission
    })
    .catch(error => {
        document.getElementById("responseMessage").style.display = "block";
        document.getElementById("responseMessage").style.color = "red";
        document.getElementById("responseMessage").innerText = "Error sending message!";
    });
});

// Function to Download Resume
function downloadResume() {
    const resumeUrl = "assets/MyCV.pdf"; // Resume path
    const a = document.createElement("a");

    a.href = resumeUrl;
    a.download = "MyCV.pdf"; // Set file name

    // Append to body (optional, but ensures execution in all browsers)
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Remove after click to clean up
}
function sendEmail() {
    event.preventDefault(); // Prevent default form submission

    let name = document.querySelector("input[name='name']").value;
    let email = document.querySelector("input[name='email']").value;
    let phone = document.querySelector("input[name='phone']").value;
    let message = document.querySelector("textarea[name='message']").value;

    if (name && email && phone && message) {
        // Create mailto link
        let mailtoLink = `mailto:vickykumarsharma555@gmail.com?subject=Contact%20Form%20Submission&body=
        Name: ${encodeURIComponent(name)}%0D%0A
        Email: ${encodeURIComponent(email)}%0D%0A
        Phone: ${encodeURIComponent(phone)}%0D%0A
        Message: ${encodeURIComponent(message)}`;

        // Open email client
        window.location.href = mailtoLink;
    } else {
        let responseMessage = document.getElementById("responseMessage");
        responseMessage.style.display = "block";
        responseMessage.style.color = "red";
        responseMessage.innerText = "Please fill all fields!";
    }
}

// Attach event listener to the form
document.getElementById("contactForm").addEventListener("submit", sendEmail);
