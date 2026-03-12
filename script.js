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
        stripeUrl: 'https://buy.stripe.com/eVq3cngNe5cz4isbftcIE06',
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
        stripeUrl: 'https://buy.stripe.com/cNi7sD2WofRdg1a97lcIE07',
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
    custom:  'images/cap_color_image_custom.png'
};

// Cap color purchase links
const capLinks = {
    copper:  'https://buy.stripe.com/8x228j8gIeN95mwcjxcIE03',
    azure:   'https://buy.stripe.com/6oU5kvaoQ5cz16ggzNcIE04',
    scarlet: 'https://buy.stripe.com/bJe3cn9kM9sPeX6cjxcIE00',
    leaf:    'https://buy.stripe.com/6oUaEPcwY48v5mw0APcIE02',
    silver:  'https://buy.stripe.com/aFa28jcwY34r16g3N1cIE05',
    custom:  'https://buy.stripe.com/cNi5kv7cE0Wj16gdnBcIE01'
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
        if (product.hasColorSelector) {
            document.getElementById('cap-color-selector').value = '';
        }
        // Always reset custom picker when switching products
        resetCustomPicker();
        document.getElementById('custom-color-picker').style.display = 'none';
        updateBuyButtonState();
    } else {
        priceEl.style.visibility = 'hidden';
        loadGallery(defaultGalleryImages, 'Product');
        document.getElementById('color-selector').style.display = 'none';
        resetCustomPicker();
        document.getElementById('custom-color-picker').style.display = 'none';
        updateBuyButtonState();
    }
});

// -- Custom color picker state (quantity per color) --
const customQty = { copper: 0, azure: 0, scarlet: 0, leaf: 0, silver: 0 };
const CAP_TOTAL = 5;

function getTotalSelected() {
    return Object.values(customQty).reduce((sum, n) => sum + n, 0);
}

function refreshQtyUI() {
    const total = getTotalSelected();
    Object.keys(customQty).forEach(color => {
        const numEl = document.getElementById('qty-' + color);
        if (!numEl) return;
        const card  = document.querySelector(`.custom-qty-card[data-color="${color}"]`);
        const minus = document.querySelector(`.qty-minus[data-color="${color}"]`);
        const plus  = document.querySelector(`.qty-plus[data-color="${color}"]`);

        numEl.textContent = customQty[color];
        if (card)  card.classList.toggle('has-qty', customQty[color] > 0);
        if (minus) minus.disabled = (customQty[color] === 0);
        if (plus)  plus.disabled  = (total >= CAP_TOTAL);
    });
    const counter = document.getElementById('custom-color-counter');
    if (counter) counter.textContent = `${total} / ${CAP_TOTAL} selected`;
}

function resetCustomPicker() {
    Object.keys(customQty).forEach(k => { customQty[k] = 0; });
    refreshQtyUI();
}

function updateBuyButtonState() {
    const productVal  = document.getElementById('product-selector').value;
    const colorVal    = document.getElementById('cap-color-selector').value;
    const buyBtn      = document.querySelector('.add-to-cart:not(.cta-shop-btn)');
    const needsCustom = productVal === 'caps' && colorVal === 'custom';
    const ready       = !needsCustom || getTotalSelected() === CAP_TOTAL;
    buyBtn.disabled        = !ready;
    buyBtn.style.opacity   = ready ? '' : '0.45';
    buyBtn.style.cursor    = ready ? '' : 'not-allowed';
}

// ==================== PRICE IDS ====================
const PRICE_IDS = {
    single:  'price_1T9yT90Bp5FXtpozeljRJdWN',
    '2pack': 'price_1T9yVq0Bp5FXtpozjdg7vdR6',
    copper:  'price_1T9xM20Bp5FXtpoznMsIF2sQ',
    azure:   'price_1T9xM10Bp5FXtpozg01vPEe9',
    scarlet: 'price_1T9xLy0Bp5FXtpozYZE8cznT',
    leaf:    'price_1T9xM20Bp5FXtpoz2M5yqtkH',
    silver:  'price_1T9xLy0Bp5FXtpozvI7Teh0L',
    custom:  'price_1T9xLy0Bp5FXtpozZAHxtJa2',
};

const PRODUCT_NAMES = {
    'price_1T9yT90Bp5FXtpozeljRJdWN': 'Trellis – Single',
    'price_1T9yVq0Bp5FXtpozjdg7vdR6': 'Trellis – 2 Pack',
    'price_1T9xM20Bp5FXtpoznMsIF2sQ': 'Caps 5-Pack – Copper',
    'price_1T9xM10Bp5FXtpozg01vPEe9': 'Caps 5-Pack – Azure Blue',
    'price_1T9xLy0Bp5FXtpozYZE8cznT': 'Caps 5-Pack – Scarlet Red',
    'price_1T9xM20Bp5FXtpoz2M5yqtkH': 'Caps 5-Pack – Leaf Green',
    'price_1T9xLy0Bp5FXtpozvI7Teh0L': 'Caps 5-Pack – Silver Ash',
    'price_1T9xLy0Bp5FXtpozZAHxtJa2': 'Caps 5-Pack – Custom Mix',
};

// ==================== CART SYSTEM ====================
function getCart() {
    try { return JSON.parse(localStorage.getItem('vetro_cart') || '[]'); }
    catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem('vetro_cart', JSON.stringify(cart));
}

function addToCart(priceId) {
    const cart = getCart();
    const existing = cart.find(item => item.price === priceId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ price: priceId, quantity: 1, name: PRODUCT_NAMES[priceId] || priceId });
    }
    saveCart(cart);
    renderCart();
    openCart();
}

function removeFromCart(priceId) {
    saveCart(getCart().filter(item => item.price !== priceId));
    renderCart();
}

function updateQuantity(priceId, quantity) {
    if (quantity <= 0) { removeFromCart(priceId); return; }
    const cart = getCart();
    const item = cart.find(i => i.price === priceId);
    if (item) item.quantity = quantity;
    saveCart(cart);
    renderCart();
}

function clearCart() {
    localStorage.removeItem('vetro_cart');
    renderCart();
}

function renderCart() {
    const cart        = getCart();
    const itemsEl     = document.getElementById('cart-items');
    const badge       = document.getElementById('cart-badge');
    const checkoutBtn = document.getElementById('checkout-btn');
    const totalQty    = cart.reduce((sum, i) => sum + i.quantity, 0);

    badge.textContent  = totalQty;
    badge.style.display = totalQty > 0 ? 'flex' : 'none';

    if (cart.length === 0) {
        itemsEl.innerHTML  = '<p class="cart-empty">Your cart is empty.</p>';
        checkoutBtn.disabled = true;
        return;
    }
    checkoutBtn.disabled = false;
    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item" data-price="${item.price}">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn cart-qty-minus" aria-label="Decrease quantity">&#8722;</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="cart-qty-btn cart-qty-plus" aria-label="Increase quantity">&#43;</button>
                </div>
            </div>
            <button class="cart-remove-btn" aria-label="Remove item">&#10005;</button>
        </div>
    `).join('');
}

function openCart() {
    document.getElementById('cart-panel').classList.add('cart-panel--open');
    document.getElementById('cart-panel').setAttribute('aria-hidden', 'false');
    document.getElementById('cart-overlay').classList.add('cart-overlay--visible');
}

function closeCart() {
    document.getElementById('cart-panel').classList.remove('cart-panel--open');
    document.getElementById('cart-panel').setAttribute('aria-hidden', 'true');
    document.getElementById('cart-overlay').classList.remove('cart-overlay--visible');
}

async function checkout() {
    const cart = getCart();
    if (!cart.length) return;
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled    = true;
    checkoutBtn.textContent = 'Redirecting…';
    try {
        const response = await fetch('/api/create-checkout-session', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ items: cart.map(({ price, quantity }) => ({ price, quantity })) })
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Server error ${response.status}`);
        }
        const { url } = await response.json();
        clearCart();
        window.location.href = url;
    } catch (err) {
        console.error('Checkout error:', err);
        alert('Could not start checkout. Please try again.');
        checkoutBtn.disabled    = false;
        checkoutBtn.textContent = 'Secure Checkout';
    }
}

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

// Cap color dropdown — updates hero image, shows/hides custom picker
const capColorSelector = document.getElementById('cap-color-selector');
capColorSelector.addEventListener('change', function () {
    const color      = this.value;
    const heroImg    = document.querySelector('.hero-image img');
    const picker     = document.getElementById('custom-color-picker');
    const sixGrid    = document.getElementById('color-options-preview');
    const previewGrid = document.getElementById('cap-preview-grid');

    // Update hero product image
    if (color && capColorImages[color]) {
        heroImg.src = capColorImages[color];
    } else {
        heroImg.src = 'images/' + products.caps.mainImage;
    }

    resetCustomPicker();

    if (color === 'custom') {
        // Custom: show picker only
        picker.style.display      = 'block';
        sixGrid.style.display     = 'none';
        previewGrid.style.display = 'none';
    } else if (color === '') {
        // Select Color: show normal 6-color grid
        picker.style.display      = 'none';
        sixGrid.style.display     = '';
        previewGrid.style.display = 'none';
    } else {
        // Specific color: show 5 identical preview caps
        picker.style.display      = 'none';
        sixGrid.style.display     = 'none';
        previewGrid.style.display = 'grid';
        renderPreviewCaps(color);
    }

    updateBuyButtonState();
});

// Quantity +/- button logic for custom color cards
document.querySelectorAll('.qty-minus, .qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
        const color  = btn.dataset.color;
        const isPlus = btn.classList.contains('qty-plus');
        if (isPlus) {
            if (getTotalSelected() < CAP_TOTAL) customQty[color]++;
        } else {
            if (customQty[color] > 0) customQty[color]--;
        }
        refreshQtyUI();
        updateBuyButtonState();
    });
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

// Add to Cart — hero button
document.querySelectorAll('.add-to-cart:not(.cta-shop-btn)').forEach(button => {
    button.addEventListener('click', () => {
        const selected = document.getElementById('product-selector').value;
        if (!selected) {
            alert('Please select a product first.');
            return;
        }
        let priceId;
        if (selected === 'caps') {
            const color = document.getElementById('cap-color-selector').value;
            if (!color) {
                alert('Please select a color first.');
                return;
            }
            if (color === 'custom' && getTotalSelected() !== CAP_TOTAL) {
                alert('Please select exactly 5 colors for your Custom pack.');
                return;
            }
            priceId = PRICE_IDS[color];
        } else {
            priceId = PRICE_IDS[selected];
        }
        if (!priceId) {
            alert('Unable to add item to cart. Please try again.');
            return;
        }
        addToCart(priceId);
    });
});

// Final CTA button — scrolls back to top of page
document.querySelector('.cta-shop-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cart icon button
document.getElementById('cart-icon-btn').addEventListener('click', openCart);

// Cart close
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

// Cart item interactions (event delegation)
document.getElementById('cart-items').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const cartItem = btn.closest('.cart-item');
    if (!cartItem) return;
    const priceId = cartItem.dataset.price;
    const item    = getCart().find(i => i.price === priceId);
    if (!item) return;
    if (btn.classList.contains('cart-qty-minus'))  updateQuantity(priceId, item.quantity - 1);
    else if (btn.classList.contains('cart-qty-plus')) updateQuantity(priceId, item.quantity + 1);
    else if (btn.classList.contains('cart-remove-btn'))  removeFromCart(priceId);
});

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Initialise cart badge + items on page load
renderCart();

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
