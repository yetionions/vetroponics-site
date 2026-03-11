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

// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggleBtn.textContent = '🌙 Dark';
}
themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    themeToggleBtn.textContent = isLight ? '🌙 Dark' : '☀ Light';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
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
    document.querySelectorAll('.thumbnail-row img').forEach(img => img.classList.remove('active'));
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
}

// Product variants data
const products = {
    single: {
        name: 'Trellis – Single',
        price: '$29.99',
        description: 'Single decorative trellis panel designed for the Gardyn Home hydroponic system.',
        mainImage: 'singleset_trellis_product_image.png',
        galleryImages: ['image11.jpg', 'image22.jpg', 'image33.jpg', 'image44.jpg', 'image55.jpg', 'image66.jpg', 'image77.jpg'],
        etsyUrl: 'https://www.etsy.com/listing/4397538500/trellis-for-gardyn-home-hydroponic',
        hasColorSelector: false,
        includedItems: [
            { icon: 'fas fa-cubes',       text: '12 trellis panels' },
            { icon: 'fas fa-link',        text: 'Top clips x1' },
            { icon: 'fas fa-paperclip',   text: 'Panel clips x1' },
            { icon: 'fas fa-bracket-curly', text: 'Bottom brackets x1' },
            { icon: 'fas fa-hand-paper',  text: 'Hook and loop mounting sections' }
        ]
    },
    '2pack': {
        name: 'Trellis – 2 Pack',
        price: '$49.99',
        description: 'Two trellis panels for supporting larger plants.',
        mainImage: 'setof_two_trellis_product_image.png',
        galleryImages: ['image11.jpg', 'image22.jpg', 'image33.jpg', 'image44.jpg', 'image55.jpg', 'image66.jpg', 'image77.jpg'],
        etsyUrl: 'https://www.etsy.com/listing/4406810128/trellis-2-pack-for-gardyn-home',
        hasColorSelector: false,
        includedItems: [
            { icon: 'fas fa-cubes',       text: '24 trellis panels' },
            { icon: 'fas fa-link',        text: 'Top clips x2' },
            { icon: 'fas fa-paperclip',   text: 'Panel clips x2' },
            { icon: 'fas fa-bracket-curly', text: 'Bottom brackets x2' },
            { icon: 'fas fa-hand-paper',  text: 'Hook and loop mounting sections' }
        ]
    },
    caps: {
        name: 'Gardyn Compatible Caps – 5 Pack',
        price: '$18.49',
        description: 'Decorative 3D printed Gardyn compatible caps with epoxy leaf design.',
        mainImage: 'cap_product_main_image.png',
        galleryImages: ['cap_product_image2.jpg', 'cap_product_image3.jpg', 'cap_product_image4.jpg', 'cap_product_image5.jpg', 'cap_product_image6.jpg', 'cap_product_image7.jpg'],
        etsyUrl: 'https://www.etsy.com/listing/4419864362/3d-printed-gardyn-compatible-cap-hand?ls=r&ref=items-pagination-3&frs=1&crt=1&sts=1&content_source=58b3d5a1a84a8767ef141753b3173f4f%253ALTedb37031e5b743ca85bd1a09549ae415ed317e3a&logging_key=58b3d5a1a84a8767ef141753b3173f4f%3ALTedb37031e5b743ca85bd1a09549ae415ed317e3a',
        hasColorSelector: true,
        includedItems: [
            { icon: 'fas fa-star',        text: '5 decorative Gardyn compatible caps' },
            { icon: 'fas fa-palette',     text: 'Custom epoxy leaf colors' },
            { icon: 'fas fa-utensils',    text: 'Food-safe durable material' }
        ]
    }
};

// Default mixed gallery shown before any product is selected
const defaultGalleryImages = [
    'image11.jpg', 'image22.jpg', 'image33.jpg', 'image44.jpg',
    'image55.jpg', 'image66.jpg', 'image77.jpg',
    'cap_product_image2.jpg', 'cap_product_image3.jpg', 'cap_product_image4.jpg',
    'cap_product_image5.jpg', 'cap_product_image6.jpg', 'cap_product_image7.jpg'
];

function loadGallery(images, altPrefix) {
    document.getElementById('main-image').src = 'images/' + images[0];
    const thumbnailRow = document.querySelector('.thumbnail-row');
    thumbnailRow.innerHTML = '';
    images.forEach((imgFile, index) => {
        const img = document.createElement('img');
        img.src = 'images/' + imgFile;
        img.alt = altPrefix + ' Image ' + (index + 1);
        if (index === 0) img.classList.add('active');
        img.addEventListener('click', function() { changeImage(this.src, this); });
        thumbnailRow.appendChild(img);
    });
    document.getElementById('gallery').style.display = 'block';
}

// Show default gallery on page load
loadGallery(defaultGalleryImages, 'Product');

// Product selector functionality
const productSelector = document.getElementById('product-selector');
productSelector.addEventListener('change', function() {
    const selected = this.value;
    const product = products[selected];
    
    // Update hero content
    const priceEl = document.querySelector('.hero .price');
    const gallerySection = document.getElementById('gallery');
    if (product) {
        document.querySelector('.hero h1').textContent = product.name;
        document.querySelector('.hero p').textContent = product.description;
        document.querySelector('.hero-image img').src = 'images/' + product.mainImage;
        document.querySelector('.hero .price-text').textContent = product.price;
        priceEl.style.visibility = 'visible';

        // Update gallery
        loadGallery(product.galleryImages, product.name);

        // Update What's Included
        const includedList = document.getElementById('included-list');
        if (includedList) {
            includedList.innerHTML = product.includedItems.map(
                item => `<li><i class="${item.icon}"></i> ${item.text}</li>`
            ).join('');
        }

        // Show/hide color selector
        document.getElementById('color-selector').style.display =
            product.hasColorSelector ? 'block' : 'none';
    } else {
        priceEl.style.visibility = 'hidden';
        loadGallery(defaultGalleryImages, 'Product');
        document.getElementById('color-selector').style.display = 'none';
    }
});

// Color tiles are display-only; no click interaction.

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

// Add to cart functionality (product selector buttons only)
document.querySelectorAll('.add-to-cart:not(.cta-shop-btn)').forEach(button => {
    button.addEventListener('click', () => {
        const selected = document.getElementById('product-selector').value;
        const product = products[selected];
        // Open Etsy listing in a new tab
        window.open(product.etsyUrl, '_blank');
    });
});

// Final CTA button — always opens the Etsy shop page
document.querySelector('.cta-shop-btn').addEventListener('click', () => {
    window.open('https://www.etsy.com/shop/VetROponicsSystems?ref=shop-header-name&listing_id=4397538500&from_page=listing', '_blank');
});

// Header background on scroll
const promoPopup = document.getElementById('promo-popup');
const promoClose = document.getElementById('promo-popup-close');
const PROMO_KEY = 'promo_dismissed';
let promoShown = false;

function showPromo() {
    if (promoShown || sessionStorage.getItem(PROMO_KEY)) return;
    promoShown = true;
    promoPopup.classList.add('promo-popup--visible');
}

promoClose.addEventListener('click', () => {
    promoPopup.classList.remove('promo-popup--visible');
    sessionStorage.setItem(PROMO_KEY, '1');
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show promo after 35% scroll
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrolled >= 0.35) showPromo();
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
        background: var(--bg-nav);
        padding: 1rem 0;
        box-shadow: 0 2px 10px var(--shadow);
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
        background: var(--bg-nav);
        box-shadow: 0 4px 16px var(--shadow);
    }
`;
document.head.appendChild(style);
