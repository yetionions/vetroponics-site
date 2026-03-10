// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Gallery functionality
function changeImage(src, thumbnail) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = src;
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnails img').forEach(img => img.classList.remove('active'));
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
}

// Product variants data
const products = {
    single: {
        name: 'Trellis – Single',
        price: '$29.99',
        description: 'Single decorative trellis panel designed for the Gardyn Home hydroponic system.',
        mainImage: 'trellis_product_image1.jpg',
        galleryImages: ['image11.jpg', 'image22.jpg', 'image33.jpg', 'image44.jpg', 'image55.jpg', 'image66.jpg', 'image77.jpg'],
        etsyUrl: 'https://www.etsy.com/listing/4397538500/trellis-for-gardyn-home-hydroponic'
    },
    '2pack': {
        name: 'Trellis – 2 Pack',
        price: '$49.99',
        description: 'Two trellis panels for supporting larger plants.',
        mainImage: 'trellis_product_image1.jpg',
        galleryImages: ['image11.jpg', 'image22.jpg', 'image33.jpg', 'image44.jpg', 'image55.jpg', 'image66.jpg', 'image77.jpg'],
        etsyUrl: 'https://www.etsy.com/listing/4397538500/trellis-for-gardyn-home-hydroponic'
    },
    caps: {
        name: 'Gardyn Compatible Caps – 5 Pack',
        price: '$18.49',
        description: 'Decorative 3D printed Gardyn compatible caps with epoxy leaf design.',
        mainImage: 'cap_product_image2.jpg',
        galleryImages: ['cap_product_image2.jpg', 'cap_product_image3.jpg', 'cap_product_image4.jpg', 'cap_product_image5.jpg', 'cap_product_image6.jpg', 'cap_product_image7.jpg'],
        etsyUrl: 'https://www.etsy.com/listing/4419864362/3d-printed-gardyn-compatible-cap-hand?ls=r&ref=items-pagination-3&frs=1&crt=1&sts=1&content_source=58b3d5a1a84a8767ef141753b3173f4f%253ALTedb37031e5b743ca85bd1a09549ae415ed317e3a&logging_key=58b3d5a1a84a8767ef141753b3173f4f%3ALTedb37031e5b743ca85bd1a09549ae415ed317e3a'
    }
};

// Product selector functionality
const productSelector = document.getElementById('product-selector');
productSelector.addEventListener('change', function() {
    const selected = this.value;
    const product = products[selected];
    
    // Update hero content
    document.querySelector('.hero h1').textContent = product.name;
    document.querySelector('.hero .price').textContent = product.price;
    document.querySelector('.hero p').textContent = product.description;
    document.querySelector('.hero-image img').src = 'images/' + product.mainImage;
    
    // Update gallery
    document.getElementById('main-image').src = 'images/' + product.galleryImages[0];
    const thumbnails = document.querySelectorAll('.thumbnails img');
    thumbnails.forEach((img, index) => {
        if (index < product.galleryImages.length) {
            img.src = 'images/' + product.galleryImages[index];
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
    
    // Reset active thumbnail to first
    thumbnails.forEach(img => img.classList.remove('active'));
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }
});

// Modal functionality for image zoom
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const mainImage = document.getElementById('main-image');
const closeBtn = document.getElementsByClassName('close')[0];

mainImage.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const selected = document.getElementById('product-selector').value;
        const product = products[selected];
        // Open Etsy listing in a new tab
        window.open(product.etsyUrl, '_blank');
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add CSS for animations and mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #1a1a1a;
        padding: 1rem 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .nav-links.active li {
        margin: 0.5rem 2rem;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    header.scrolled {
        background: linear-gradient(to bottom, rgba(26, 26, 26, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6), 0 3px 12px rgba(0, 0, 0, 0.4);
    }
`;
document.head.appendChild(style);
