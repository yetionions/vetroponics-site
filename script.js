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
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme !== 'dark') {
    document.body.classList.add('light-theme');
    themeToggleBtn.textContent = '🌙 Dark';
} else {
    themeToggleBtn.textContent = '☀ Light';
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
        stripeUrl: 'https://buy.stripe.com/7sY7sD8gI8oL8yI6ZdcIE0f',
        mainImage: 'singleset_trellis_product_image.png',
        galleryImages: ['image11.jpg', 'image22.jpg', 'image33.jpg', 'image44.jpg', 'image55.jpg', 'image66.jpg', 'image77.jpg'],
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
        stripeUrl: 'https://buy.stripe.com/fZu00b54w5cz9CM1ETcIE0e',
        mainImage: 'setof_two_trellis_product_image.png',
        galleryImages: ['image11.jpg', 'image22.jpg', 'image33.jpg', 'image44.jpg', 'image55.jpg', 'image66.jpg', 'image77.jpg'],
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

// Cap color image mapping
const capColorImages = {
    copper:  'images/cap_color_image_copper.png',
    azure:   'images/cap_color_image_azure_blue.png',
    scarlet: 'images/cap_color_image_scarlet_red.png',
    leaf:    'images/cap_color_image_light_green.png',
    silver:  'images/cap_color_image_silver_ash.png',
};

// Cap color purchase links
const capLinks = {
    copper:  'https://buy.stripe.com/7sY8wH40sdJ52ak97lcIE0d',
    azure:   'https://buy.stripe.com/5kQ14f54w8oL16g2IXcIE0b',
    scarlet: 'https://buy.stripe.com/9B628jcwY6gDaGQ1ETcIE08',
    leaf:    'https://buy.stripe.com/bJe4gr2WofRd3eo97lcIE0c',
    silver:  'https://buy.stripe.com/3cI3cn68A20n6qAgzNcIE09',
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
        if (product.hasColorSelector) {
            const sel = document.getElementById('cap-color-selector');
            const placeholder = sel.querySelector('option[value=""]');
            if (placeholder) placeholder.disabled = false;
            sel.value = '';
        }
        document.getElementById('before-after-section').style.display = 'none';
        document.getElementById('hero-main-image').style.display = '';
        document.querySelector('#hero-main-image img').src = 'images/' + product.mainImage;
        updateBuyButtonState();
    } else {
        priceEl.style.visibility = 'hidden';
        loadGallery(defaultGalleryImages, 'Product');
        document.getElementById('color-selector').style.display = 'none';
        document.getElementById('before-after-section').style.display = '';
        document.getElementById('hero-main-image').style.display = 'none';
        updateBuyButtonState();
    }
});

function updateBuyButtonState() {
    const productVal  = document.getElementById('product-selector').value;
    const colorVal    = document.getElementById('cap-color-selector').value;
    const buyBtn      = document.querySelector('.buy-now-btn:not(.cta-shop-btn)');
    const ready       = productVal !== 'caps' || colorVal !== '';
    buyBtn.disabled        = !ready;
    buyBtn.style.opacity   = ready ? '' : '0';
    buyBtn.style.cursor    = ready ? '' : 'not-allowed';
    buyBtn.style.pointerEvents = ready ? '' : 'none';
}



// Before/After toggle
(function () {
    var btnBefore = document.getElementById('ba-btn-before');
    var btnAfter  = document.getElementById('ba-btn-after');
    var dispImg   = document.getElementById('ba-display-img');
    if (!btnBefore) return;

    btnBefore.addEventListener('click', function () {
        dispImg.src = 'images/trellis_system_image_before.png';
        dispImg.alt = 'Before trellis installation';
        btnBefore.classList.add('ba-toggle-btn--active');
        btnAfter.classList.remove('ba-toggle-btn--active');
    });

    btnAfter.addEventListener('click', function () {
        dispImg.src = 'images/trellis_system_image_after.png';
        dispImg.alt = 'After trellis installation';
        btnAfter.classList.add('ba-toggle-btn--active');
        btnBefore.classList.remove('ba-toggle-btn--active');
    });
}());

// Human-readable label for each cap color key
const colorLabels = {
    copper:  'Copper',
    azure:   'Azure Blue',
    scarlet: 'Scarlet Red',
    leaf:    'Leaf Green',
    silver:  'Silver Ash'
};

// Render 5 identical preview cards into #cap-preview-grid
function renderPreviewCaps(color) {
    const grid  = document.getElementById('cap-preview-grid');
    const img   = capColorImages[color];
    const label = colorLabels[color] || color;
    grid.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        div.className = 'color-option';
        div.innerHTML = `<img class="color-circle" src="${img}" alt="${label}" draggable="false"><span class="color-label">${label}</span>`;
        grid.appendChild(div);
    }
}

// Cap color dropdown — updates hero image, shows preview
const capColorSelector = document.getElementById('cap-color-selector');
capColorSelector.addEventListener('change', function () {
    const color       = this.value;
    const heroImg     = document.querySelector('#hero-main-image img');
    const sixGrid     = document.getElementById('color-options-preview');
    const previewGrid = document.getElementById('cap-preview-grid');

    // Once a real color is chosen, lock out the placeholder
    if (color !== '') {
        const placeholder = this.querySelector('option[value=""]');
        if (placeholder) placeholder.disabled = true;
    }

    // Update hero product image
    if (color && capColorImages[color]) {
        heroImg.src = capColorImages[color];
    } else {
        heroImg.src = 'images/' + products.caps.mainImage;
    }

    if (color === '') {
        // Select Color: show normal 6-color grid
        sixGrid.style.display     = '';
        previewGrid.style.display = 'none';
    } else {
        // Specific color: show 5 identical preview caps
        sixGrid.style.display     = 'none';
        previewGrid.style.display = 'grid';
        renderPreviewCaps(color);
    }

    updateBuyButtonState();
});

// Thumbnail carousel arrows
(function () {
    var row   = document.getElementById('thumbnailRow');
    var left  = document.getElementById('thumbArrowLeft');
    var right = document.getElementById('thumbArrowRight');
    if (!row || !left || !right) return;
    left.addEventListener('click',  function () { row.scrollBy({ left: -200, behavior: 'smooth' }); });
    right.addEventListener('click', function () { row.scrollBy({ left:  200, behavior: 'smooth' }); });
}());

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

// Buy Now — hero button
document.querySelector('.buy-now-btn:not(.cta-shop-btn)').addEventListener('click', () => {
    const selected = document.getElementById('product-selector').value;
    if (!selected) {
        alert('Please select a product first.');
        return;
    }
    let stripeUrl;
    if (selected === 'caps') {
        const color = document.getElementById('cap-color-selector').value;
        if (!color) {
            alert('Please select a color first.');
            return;
        }
        stripeUrl = capLinks[color];
    } else {
        stripeUrl = products[selected].stripeUrl;
    }
    if (!stripeUrl) {
        alert('Unable to process purchase. Please try again.');
        return;
    }
    window.location.href = stripeUrl;
});

// Final CTA button — scrolls back to top of page
document.querySelector('.cta-shop-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
