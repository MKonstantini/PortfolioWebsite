// Navbar
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const navDropdown = document.querySelector('.nav_dropdown')
toggleBtn.onclick = () => {
    navDropdown.classList.toggle('open')
    const isOpen = navDropdown.classList.contains('open')

    toggleBtnIcon.classList = isOpen 
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars"
}

// Contact Form
if (sessionStorage.getItem('hasSubmitted') == 'yes') {
    document.querySelector('#contactForm').innerHTML = `
    <h6>Thank you for reaching out!</h6>
    <p>Sent Message:</p>
    <p><i>${sessionStorage.getItem('userMessage')}</i></p><br>
    <p>Sent From:</p>
    <p><i>${sessionStorage.getItem('userEmail')}</i></p>
    `
}
function onFormSubmit() {
    contactEmail = document.querySelector('#contactEmail').value
    contactMessage = document.querySelector('#contactMessage').value
    sessionStorage.setItem('hasSubmitted', 'yes')
    sessionStorage.setItem('userEmail', `${document.querySelector('#contactEmail').value.toString()}`)
    sessionStorage.setItem('userMessage', contactMessage.toString())
}

// CSS Animations
const faders = document.querySelectorAll('.fade-in')
const sliders = document.querySelectorAll('.slide-left')
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
}
const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        } else {
            entry.target.classList.add('appear')
            appearOnScroll.unobserve(entry.target)
        }
    })
},
appearOptions)
faders.forEach(fader => {
    appearOnScroll.observe(fader)
})
sliders.forEach(slider => {
    appearOnScroll.observe(slider)
})