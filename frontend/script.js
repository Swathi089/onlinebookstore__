// Sample book data with descriptions
let books = [
    {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 599,
        category: "fiction",
        bestseller: true,
        image: "assets/harry potter.jpeg",
        description: "Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard.",
        pages: 309,
        publisher: "Scholastic"
    },
    {
        id: 2,
        title: "The Book of Names",
        author: "Jill Gregory & Karen Tintori",
        price: 799,
        category: "fiction",
        bestseller: false,
        image: "assets/the book of names.jpeg",
        description: "An ancient manuscript holds the key to humanity's survival. When a young woman discovers she is the keeper of the 36 righteous souls who sustain the world, she must protect the sacred Book of Names from those who would destroy it.",
        pages: 384,
        publisher: "Forge Books"
    },
    {
        id: 3,
        title: "The Book of Ile-Rien",
        author: "Martha Wells",
        price: 899,
        category: "fiction",
        bestseller: true,
        image: "assets/the book of ile-rien.jpeg",
        description: "In a world where magic and technology coexist, the kingdom of Ile-Rien faces its greatest threat. When mysterious spheres begin appearing and stealing the souls of sorcerers, a resourceful young woman must journey through parallel worlds to save her homeland.",
        pages: 1200,
        publisher: "HarperCollins"
    },
    {
        id: 4,
        title: "The Will of the Many",
        author: "James Islington",
        price: 1299,
        category: "fiction",
        bestseller: false,
        image: "assets/the will of the many.jpeg",
        description: "In a world where hierarchy is determined by the ability to lend one's willpower to those above, a young orphan hides a dangerous secret. As he infiltrates the most prestigious academy to uncover the truth about his past, he discovers a conspiracy that threatens the very foundation of society.",
        pages: 624,
        publisher: "Saga Press"
    },
    {
        id: 5,
        title: "The Awesome Book of Words",
        author: "Various Authors",
        price: 449,
        category: "children",
        bestseller: true,
        image: "assets/the awesome book of words.jpeg",
        description: "A delightful journey through the world of words for young readers! This colorful and engaging book introduces children to the magic of language through fun activities, interesting facts, and beautiful illustrations.",
        pages: 128,
        publisher: "DK Children"
    },
    {
        id: 6,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 699,
        category: "non-fiction",
        bestseller: false,
        image: "assets/the psychology of money.jpeg",
        description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people. This book explores the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.",
        pages: 256,
        publisher: "Harriman House"
    },
    {
        id: 7,
        title: "Breadcrumbs",
        author: "Anne Ursu",
        price: 549,
        category: "children",
        bestseller: true,
        image: "assets/breadcrumbs.jpeg",
        description: "Once upon a time, Hazel and Jack were best friends. But that was before he stopped talking to her and disappeared into the woods with a mysterious woman. Now it's up to Hazel to go in after him.",
        pages: 312,
        publisher: "Walden Pond Press"
    },
    {
        id: 8,
        title: "You Become What You Think",
        author: "Shubham Kumar Singh",
        price: 399,
        category: "non-fiction",
        bestseller: false,
        image: "assets/you become what you think.jpeg",
        description: "A transformative guide to harnessing the power of your thoughts to shape your destiny. This book reveals how your mindset determines your success, happiness, and overall life experience.",
        pages: 224,
        publisher: "Self-Published"
    },
    {
        id: 9,
        title: "Atomic Habits",
        author: "James Clear",
        price: 629,
        category: "non-fiction",
        bestseller: true,
        image: "assets/atomic habits.jpeg",
        description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        pages: 320,
        publisher: "Avery"
    },
    {
        id: 10,
        title: "The Ultimate True Crime Puzzle Book",
        author: "Jack Rosewood",
        price: 799,
        category: "academic",
        bestseller: false,
        image: "assets/the ultimate true crime.jpeg",
        description: "Test your detective skills with this collection of real-life crime mysteries! Each case presents you with clues, evidence, and witness statements. Can you solve the crime before revealing the answer?",
        pages: 288,
        publisher: "True Crime Press"
    }
];
// Add this function at the top of your script.js, after the books array

// Load books from backend API
async function loadBooksFromAPI() {
    try {
        // Check if config is available
        if (typeof config === 'undefined' || !config.apiBaseUrl) {
            console.log('Config not found, using local data');
            displayBooks(books);
            displayBestsellers();
            return;
        }

        const response = await fetch(`${config.apiBaseUrl}/api/books`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            books = data;
            console.log('✅ Books loaded from API:', books.length);
            displayBooks(books);
            displayBestsellers();
        } else {
            console.log('No books in API, using local data');
            displayBooks(books);
            displayBestsellers();
        }
    } catch (error) {
        console.error('❌ Error loading books from API:', error);
        console.log('Using local book data');
        displayBooks(books);
        displayBestsellers();
    }
}

// Update the DOMContentLoaded event listener to call loadBooksFromAPI
// Replace the existing displayBooks(books) call with:
// loadBooksFromAPI();

// User Authentication State
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Shopping cart
let cart = [];
let currentSlideIndex = 0;

// DOM elements - will be initialized after DOM loads
let booksGrid, bestsellerTrack, cartCount, searchInput, searchBtn, prevBtn, nextBtn, newsletterForm, categoryCards;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    booksGrid = document.getElementById('booksGrid');
    bestsellerTrack = document.getElementById('bestsellerTrack');
    cartCount = document.getElementById('cartCount');
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    newsletterForm = document.getElementById('newsletterForm');
    categoryCards = document.querySelectorAll('.category-card');
    
    // Check if user is logged in
    checkLoginStatus();
    
    // Load books immediately without API call
    loadBooksFromAPI();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Update cart count
    updateCartCount();
    
    // Add scroll effects
    setupScrollEffects();
});

// Check if user is already logged in
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
        currentUser = JSON.parse(loggedInUser);
        showUserProfile();
    }
}

// Load books from backend API or use local data
function loadBooks() {
    // Try to load from API if available
    if (typeof config !== 'undefined' && config.apiBaseUrl) {
        fetch(`${config.apiBaseUrl}/api/books`)
            .then(res => res.json())
            .then(data => {
                books = data;
                displayBooks(books);
                displayBestsellers();
            })
            .catch(err => {
                console.log("Using local book data");
                displayBooks(books);
                displayBestsellers();
            });
    } else {
        // Use local data
        displayBooks(books);
        displayBestsellers();
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Auth buttons
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    if (loginBtn) loginBtn.addEventListener('click', () => openModal('loginModal'));
    if (signupBtn) signupBtn.addEventListener('click', () => openModal('signupModal'));
    
    // Close modals
    const closeLogin = document.getElementById('closeLogin');
    const closeSignup = document.getElementById('closeSignup');
    const closeEditProfile = document.getElementById('closeEditProfile');
    const closeMyOrders = document.getElementById('closeMyOrders');
    
    if (closeLogin) closeLogin.addEventListener('click', () => closeModal('loginModal'));
    if (closeSignup) closeSignup.addEventListener('click', () => closeModal('signupModal'));
    if (closeEditProfile) closeEditProfile.addEventListener('click', () => closeModal('editProfileModal'));
    if (closeMyOrders) closeMyOrders.addEventListener('click', () => closeModal('myOrdersModal'));
    
    // Switch between login and signup
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('loginModal');
            openModal('signupModal');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('signupModal');
            openModal('loginModal');
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const editProfileForm = document.getElementById('editProfileForm');
    
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (editProfileForm) editProfileForm.addEventListener('submit', handleEditProfile);
    
    // Profile dropdown
    const profileIcon = document.getElementById('profileIcon');
    if (profileIcon) profileIcon.addEventListener('click', toggleProfileDropdown);
    
    // Profile menu items
    const editProfileBtn = document.getElementById('editProfileBtn');
    const myOrdersBtn = document.getElementById('myOrdersBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openEditProfileModal();
        });
    }
    
    if (myOrdersBtn) {
        myOrdersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showMyOrders();
        });
    }
    
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    
    // Search functionality
    if (searchBtn) searchBtn.addEventListener('click', searchBooks);
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchBooks();
        });
    }
    
    // Category filters
    if (categoryCards) {
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                filterByCategory(category);
            });
        });
    }
    
    // Bestseller slider
    if (prevBtn) prevBtn.addEventListener('click', () => slideBestsellers('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => slideBestsellers('next'));
    
    // Newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
    
    // Cart click
    const cartElement = document.querySelector('.cart');
    if (cartElement) {
        cartElement.addEventListener('click', showCartModal);
    }
    
    // CTA button
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            const booksSection = document.getElementById('books');
            if (booksSection) {
                booksSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const profileDropdown = document.getElementById('profileDropdown');
        const profileIcon = document.getElementById('profileIcon');
        if (profileDropdown && profileIcon) {
            if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showUserProfile();
        closeModal('loginModal');
        showNotification('Login successful!', 'success');
        document.getElementById('loginForm').reset();
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Handle Signup
function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        phone: '',
        address: ''
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showUserProfile();
    closeModal('signupModal');
    showNotification('Account created successfully!', 'success');
    document.getElementById('signupForm').reset();
}

// Handle Edit Profile
function handleEditProfile(e) {
    e.preventDefault();
    
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const address = document.getElementById('editAddress').value;
    
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.address = address;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserDisplay();
    closeModal('editProfileModal');
    showNotification('Profile updated successfully!', 'success');
}

// Open Edit Profile Modal
function openEditProfileModal() {
    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editEmail').value = currentUser.email;
    document.getElementById('editPhone').value = currentUser.phone || '';
    document.getElementById('editAddress').value = currentUser.address || '';
    openModal('editProfileModal');
}

// Handle Logout
function handleLogout(e) {
    e.preventDefault();
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuthButtons();
    showNotification('Logged out successfully!', 'success');
}

// Show User Profile
function showUserProfile() {
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    if (authButtons) authButtons.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    updateUserDisplay();
}

// Show Auth Buttons
function showAuthButtons() {
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    if (authButtons) authButtons.style.display = 'flex';
    if (userProfile) userProfile.style.display = 'none';
}

// Update User Display
function updateUserDisplay() {
    const initial = currentUser.name.charAt(0).toUpperCase();
    const userInitial = document.getElementById('userInitial');
    const dropdownInitial = document.getElementById('dropdownInitial');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    if (userInitial) userInitial.textContent = initial;
    if (dropdownInitial) dropdownInitial.textContent = initial;
    if (userName) userName.textContent = currentUser.name;
    if (userEmail) userEmail.textContent = currentUser.email;
}

// Toggle Profile Dropdown
function toggleProfileDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

// Display books in the grid
function displayBooks(booksToShow) {
    if (!booksGrid) return;
    booksGrid.innerHTML = '';
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    booksToShow.forEach(book => {
        const bookCard = createBookCard(book);
        fragment.appendChild(bookCard);
    });
    
    booksGrid.appendChild(fragment);
}

// Create a book card element
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.innerHTML = `
        <div class="book-cover" style="width: 80px; height: 120px; margin: 0 auto 1rem; cursor: pointer;" onclick="showBookDetails(${book.id})">
            <img src="${book.image}" alt="${book.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />
        </div>
        <h3 style="cursor: pointer;" onclick="showBookDetails(${book.id})">${book.title}</h3>
        <p class="author">by ${book.author}</p>
        <p class="price">₹${book.price}</p>
        <button class="add-to-cart" onclick="addToCart(${book.id})">Add to Cart</button>
    `;
    return bookCard;
}

// Show book details popup
function showBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = document.createElement('div');
    modal.className = 'book-details-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        max-width: 700px;
        width: 90%;
        max-height: 85vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        animation: slideUp 0.4s ease;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div style="position: sticky; top: 0; background: linear-gradient(135deg, #ffd700, #ffed4e); padding: 1.5rem; border-radius: 20px 20px 0 0; z-index: 1;">
            <button onclick="closeBookDetails()" style="position: absolute; top: 1rem; right: 1rem; background: white; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; font-size: 1.3rem; color: #333; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: all 0.3s;">✕</button>
            <h2 style="color: #333; margin: 0; padding-right: 40px; font-size: 1.8rem;">${book.title}</h2>
            <p style="color: #666; margin: 0.5rem 0 0 0; font-size: 1.1rem;">by ${book.author}</p>
        </div>
        
        <div style="padding: 2rem;">
            <div style="display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <div style="flex-shrink: 0;">
                    <img src="${book.image}" alt="${book.title}" style="width: 180px; height: 270px; object-fit: cover; border-radius: 10px; box-shadow: 0 8px 20px rgba(0,0,0,0.2);" />
                </div>
                
                <div style="flex: 1; min-width: 250px;">
                    <div style="background: linear-gradient(135deg, #fff9c4, #ffed4e); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;">
                        <div style="font-size: 2rem; color: #b8860b; font-weight: bold; margin-bottom: 0.5rem;">₹${book.price}</div>
                        <button onclick="addToCart(${book.id}); closeBookDetails();" style="width: 100%; background: linear-gradient(45deg, #b8860b, #daa520); color: white; border: none; padding: 1rem; border-radius: 25px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                            🛒 Add to Cart
                        </button>
                    </div>
                    
                    <div style="background: #f8f8f8; padding: 1rem; border-radius: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; font-size: 0.9rem;">
                        <div><strong>📚 Pages:</strong> ${book.pages}</div>
                        <div><strong>🏢 Publisher:</strong> ${book.publisher}</div>
                        <div style="grid-column: 1 / -1;"><strong>📂 Category:</strong> <span style="background: #ffd700; padding: 0.2rem 0.6rem; border-radius: 12px; text-transform: capitalize;">${book.category}</span></div>
                    </div>
                </div>
            </div>
            
            <div style="border-top: 2px solid #ffd700; padding-top: 1.5rem;">
                <h3 style="color: #333; margin-bottom: 1rem; font-size: 1.4rem;">📖 About This Book</h3>
                <p style="color: #555; line-height: 1.8; text-align: justify; font-size: 1rem;">${book.description}</p>
            </div>
            
            ${book.bestseller ? '<div style="margin-top: 1.5rem; background: linear-gradient(45deg, #ffd700, #ffed4e); padding: 1rem; border-radius: 10px; text-align: center; font-weight: 600; color: #333;">⭐ BESTSELLER ⭐</div>' : ''}
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBookDetails();
        }
    });
    
    window.currentBookModal = modal;
}

// Close book details popup
function closeBookDetails() {
    if (window.currentBookModal && window.currentBookModal.parentNode) {
        window.currentBookModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (window.currentBookModal && window.currentBookModal.parentNode) {
                window.currentBookModal.parentNode.removeChild(window.currentBookModal);
            }
            window.currentBookModal = null;
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Display bestseller books in slider
function displayBestsellers() {
    if (!bestsellerTrack) return;
    const bestsellers = books.filter(book => book.bestseller);
    bestsellerTrack.innerHTML = '';
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    bestsellers.forEach(book => {
        const bestsellerItem = document.createElement('div');
        bestsellerItem.className = 'bestseller-item';
        bestsellerItem.innerHTML = `
            <div class="book-cover" style="width: 80px; height: 120px; margin: 0 auto 1rem; cursor: pointer;" onclick="showBookDetails(${book.id})">
                <img src="${book.image}" alt="${book.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />
            </div>
            <h4 style="cursor: pointer;" onclick="showBookDetails(${book.id})">${book.title}</h4>
            <p class="author">by ${book.author}</p>
            <p class="price">₹${book.price}</p>
            <button class="add-to-cart" onclick="addToCart(${book.id})" style="margin-top: 1rem;">Add to Cart</button>
        `;
        fragment.appendChild(bestsellerItem);
    });
    
    bestsellerTrack.appendChild(fragment);
}

// Add book to cart
function addToCart(bookId) {
    if (!currentUser) {
        showNotification('Please login to add items to cart', 'error');
        openModal('loginModal');
        return;
    }
    
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    
    updateCartCount();
    showNotification(`${book.title} added to cart!`, 'success');
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
}

// Search functionality
function searchBooks() {
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        displayBooks(books);
        return;
    }
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
    
    displayBooks(filteredBooks);
    
    if (filteredBooks.length === 0 && booksGrid) {
        booksGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">No books found matching your search.</p>';
    }
}

// Filter books by category
function filterByCategory(category) {
    const filteredBooks = books.filter(book => book.category === category);
    displayBooks(filteredBooks);
    
    const booksSection = document.getElementById('books');
    if (booksSection) {
        booksSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Bestseller slider functionality
function slideBestsellers(direction) {
    if (!bestsellerTrack) return;
    const items = bestsellerTrack.querySelectorAll('.bestseller-item');
    if (items.length === 0) return;
    
    const itemWidth = 250 + 16;
    const maxSlide = Math.max(0, items.length - 3);
    
    if (direction === 'next' && currentSlideIndex < maxSlide) {
        currentSlideIndex++;
    } else if (direction === 'prev' && currentSlideIndex > 0) {
        currentSlideIndex--;
    }
    
    const translateX = -currentSlideIndex * itemWidth;
    bestsellerTrack.style.transform = `translateX(${translateX}px)`;
}

// Newsletter
function handleNewsletter(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    if (emailInput) {
        const email = emailInput.value;
        showNotification(`Thank you for subscribing with ${email}!`, 'success');
        e.target.reset();
    }
}

// Show cart modal
function showCartModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1rem; color: #333;">Shopping Cart</h2>
        ${cart.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                <div>
                    <strong>${item.title}</strong><br>
                    <small>by ${item.author}</small><br>
                    <span style="color: #b8860b;">₹${item.price} x ${item.quantity}</span>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: #ff4444; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 5px; cursor: pointer;">Remove</button>
            </div>
        `).join('')}
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #ffd700;">
            <strong style="font-size: 1.2rem;">Total: ₹${total}</strong>
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 1rem;">
            <button onclick="checkout()" style="flex: 1; background: linear-gradient(45deg, #ffd700, #ffed4e); color: #333; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; font-weight: 500;">Checkout</button>
            <button onclick="closeCartModal()" style="flex: 1; background: #666; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer;">Close</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCartModal();
        }
    });
    
    window.currentCartModal = modal;
}

// Remove item from cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCartCount();
    closeCartModal();
    showNotification('Item removed from cart', 'success');
}

// Close cart modal
function closeCartModal() {
    if (window.currentCartModal && window.currentCartModal.parentNode) {
        window.currentCartModal.parentNode.removeChild(window.currentCartModal);
        window.currentCartModal = null;
    }
}

// Checkout functionality
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order object
    const order = {
        id: Date.now(),
        userId: currentUser.id,
        items: [...cart],
        total: total,
        date: new Date().toISOString(),
        status: 'Completed'
    };
    
    // Save order
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    showNotification(`Order placed successfully! Total: ₹${total}. Thank you for shopping with us!`, 'success');
    
    cart = [];
    updateCartCount();
    closeCartModal();
}

// Show My Orders
function showMyOrders() {
    const userOrders = orders.filter(order => order.userId === currentUser.id);
    const ordersContainer = document.getElementById('ordersContainer');
    
    if (!ordersContainer) return;
    
    if (userOrders.length === 0) {
        ordersContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
                <h3 style="margin-bottom: 0.5rem;">No Orders Yet</h3>
                <p>Start shopping to see your orders here!</p>
            </div>
        `;
    } else {
        // Sort orders by date (newest first)
        userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        ordersContainer.innerHTML = userOrders.map(order => {
            const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <div style="border: 2px solid #ffd700; border-radius: 10px; padding: 1.5rem; margin-bottom: 1rem; background: #fffef7;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <h3 style="margin: 0 0 0.5rem 0; color: #333;">Order #${order.id}</h3>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">📅 ${orderDate}</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="background: linear-gradient(45deg, #27ae60, #2ecc71); color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">✓ ${order.status}</span>
                            <p style="margin: 0.5rem 0 0 0; font-size: 1.2rem; font-weight: bold; color: #b8860b;">₹${order.total}</p>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid #ffd700; padding-top: 1rem;">
                        <h4 style="margin: 0 0 0.8rem 0; color: #666; font-size: 0.95rem;">Order Items:</h4>
                        ${order.items.map(item => `
                            <div style="display: flex; gap: 1rem; padding: 0.5rem; background: white; border-radius: 8px; margin-bottom: 0.5rem; align-items: center;">
                                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 75px; object-fit: cover; border-radius: 4px;">
                                <div style="flex: 1;">
                                    <strong style="color: #333; font-size: 0.95rem;">${item.title}</strong><br>
                                    <small style="color: #666;">by ${item.author}</small><br>
                                    <span style="color: #b8860b; font-weight: 500;">₹${item.price} × ${item.quantity}</span>
                                </div>
                                <div style="text-align: right; font-weight: bold; color: #b8860b;">
                                    ₹${item.price * item.quantity}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    openModal('myOrdersModal');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #27ae60, #2ecc71)' : 'linear-gradient(45deg, #e74c3c, #c0392b)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    // Add animations styles if not already added
    if (!document.getElementById('notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Auto-slide bestsellers (optimized)
let autoSlideInterval = setInterval(() => {
    if (!bestsellerTrack) return;
    const items = bestsellerTrack.querySelectorAll('.bestseller-item');
    if (items.length > 3) {
        slideBestsellers('next');
        if (currentSlideIndex >= items.length - 3) {
            setTimeout(() => {
                currentSlideIndex = 0;
                if (bestsellerTrack) {
                    bestsellerTrack.style.transition = 'none';
                    bestsellerTrack.style.transform = 'translateX(0px)';
                    setTimeout(() => {
                        if (bestsellerTrack) {
                            bestsellerTrack.style.transition = 'transform 0.5s ease';
                        }
                    }, 50);
                }
            }, 500);
        }
    }
}, 5000);

// Remove unused functions
// Removed: addLoadingAnimation, addHeroTypingEffect, typeText, loadBooksFromAPI, loadBooks

// Setup scroll effects
function setupScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const header = document.querySelector('.header');
                if (header) {
                    if (window.scrollY > 100) {
                        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                    } else {
                        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}
// Add these functions to your existing script.js
// Replace the existing authentication and API functions

// ============================================
// API HELPER FUNCTIONS
// ============================================

const API = {
    baseURL: typeof config !== 'undefined' ? config.apiBaseUrl : '',
    
    // Get auth token from localStorage
    getToken() {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return user.token || null;
    },
    
    // Make authenticated request
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};

// ============================================
// LOAD BOOKS FROM API
// ============================================

async function loadBooksFromAPI() {
    try {
        if (!API.baseURL) {
            console.log('Config not found, using local data');
            displayBooks(books);
            displayBestsellers();
            return;
        }

        const data = await API.request('/api/books');
        
        if (data && data.length > 0) {
            books = data;
            console.log('✅ Books loaded from API:', books.length);
        } else {
            console.log('No books in API, using local data');
        }
        
        displayBooks(books);
        displayBestsellers();
    } catch (error) {
        console.error('❌ Error loading books:', error);
        console.log('Using local book data');
        displayBooks(books);
        displayBestsellers();
    }
}

// ============================================
// AUTHENTICATION WITH BACKEND
// ============================================

// Handle Login with Backend API
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // Try API login first
        if (API.baseURL) {
            const data = await API.request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            
            if (data.token) {
                currentUser = {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    token: data.token
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showUserProfile();
                closeModal('loginModal');
                showNotification('Login successful!', 'success');
                document.getElementById('loginForm').reset();
                return;
            }
        }
    } catch (error) {
        console.error('API login failed:', error);
    }
    
    // Fallback to local authentication
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showUserProfile();
        closeModal('loginModal');
        showNotification('Login successful!', 'success');
        document.getElementById('loginForm').reset();
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Handle Signup with Backend API
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    try {
        // Try API registration first
        if (API.baseURL) {
            const data = await API.request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });
            
            if (data.token) {
                currentUser = {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    token: data.token
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showUserProfile();
                closeModal('signupModal');
                showNotification('Account created successfully!', 'success');
                document.getElementById('signupForm').reset();
                return;
            }
        }
    } catch (error) {
        console.error('API signup failed:', error);
        if (error.message.includes('already exists')) {
            showNotification('Email already registered', 'error');
            return;
        }
    }
    
    // Fallback to local registration
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        phone: '',
        address: ''
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showUserProfile();
    closeModal('signupModal');
    showNotification('Account created successfully!', 'success');
    document.getElementById('signupForm').reset();
}

// ============================================
// CART WITH BACKEND
// ============================================

// Add book to cart with API
async function addToCart(bookId) {
    if (!currentUser) {
        showNotification('Please login to add items to cart', 'error');
        openModal('loginModal');
        return;
    }
    
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    try {
        // Try API add to cart
        if (API.baseURL && currentUser.token) {
            await API.request('/api/cart/add', {
                method: 'POST',
                body: JSON.stringify({ bookId, quantity: 1 })
            });
        }
    } catch (error) {
        console.error('API cart failed:', error);
    }
    
    // Also update local cart
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    
    updateCartCount();
    showNotification(`${book.title} added to cart!`, 'success');
}

// Load cart from API
async function loadCartFromAPI() {
    if (!API.baseURL || !currentUser || !currentUser.token) {
        return;
    }
    
    try {
        const data = await API.request('/api/cart');
        if (data && data.items) {
            cart = data.items;
            updateCartCount();
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// ============================================
// CHECKOUT WITH BACKEND
// ============================================

async function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    try {
        // Try API checkout
        if (API.baseURL && currentUser.token) {
            const orderData = await API.request('/api/orders/create', {
                method: 'POST',
                body: JSON.stringify({
                    items: cart,
                    total: total
                })
            });
            
            showNotification(`Order placed successfully! Order ID: ${orderData._id}`, 'success');
            cart = [];
            updateCartCount();
            closeCartModal();
            return;
        }
    } catch (error) {
        console.error('API checkout failed:', error);
    }
    
    // Fallback to local order
    const order = {
        id: Date.now(),
        userId: currentUser.id,
        items: [...cart],
        total: total,
        date: new Date().toISOString(),
        status: 'Completed'
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    showNotification(`Order placed successfully! Total: ₹${total}`, 'success');
    cart = [];
    updateCartCount();
    closeCartModal();
}

// ============================================
// ORDERS WITH BACKEND
// ============================================

async function showMyOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    if (!ordersContainer) return;
    
    let userOrders = [];
    
    try {
        // Try to load from API
        if (API.baseURL && currentUser.token) {
            const data = await API.request('/api/orders/my-orders');
            userOrders = data;
        } else {
            // Fallback to local orders
            userOrders = orders.filter(order => order.userId === currentUser.id);
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        userOrders = orders.filter(order => order.userId === currentUser.id);
    }
    
    if (userOrders.length === 0) {
        ordersContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
                <h3 style="margin-bottom: 0.5rem;">No Orders Yet</h3>
                <p>Start shopping to see your orders here!</p>
            </div>
        `;
    } else {
        userOrders.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        
        ordersContainer.innerHTML = userOrders.map(order => {
            const orderDate = new Date(order.date || order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <div style="border: 2px solid #ffd700; border-radius: 10px; padding: 1.5rem; margin-bottom: 1rem; background: #fffef7;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <h3 style="margin: 0 0 0.5rem 0; color: #333;">Order #${order._id || order.id}</h3>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">📅 ${orderDate}</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="background: linear-gradient(45deg, #27ae60, #2ecc71); color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">✓ ${order.status}</span>
                            <p style="margin: 0.5rem 0 0 0; font-size: 1.2rem; font-weight: bold; color: #b8860b;">₹${order.total || order.totalAmount}</p>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid #ffd700; padding-top: 1rem;">
                        <h4 style="margin: 0 0 0.8rem 0; color: #666; font-size: 0.95rem;">Order Items:</h4>
                        ${order.items.map(item => `
                            <div style="display: flex; gap: 1rem; padding: 0.5rem; background: white; border-radius: 8px; margin-bottom: 0.5rem; align-items: center;">
                                <img src="${item.image || item.book?.image}" alt="${item.title || item.book?.title}" style="width: 50px; height: 75px; object-fit: cover; border-radius: 4px;">
                                <div style="flex: 1;">
                                    <strong style="color: #333; font-size: 0.95rem;">${item.title || item.book?.title}</strong><br>
                                    <small style="color: #666;">by ${item.author || item.book?.author}</small><br>
                                    <span style="color: #b8860b; font-weight: 500;">₹${item.price || item.book?.price} × ${item.quantity}</span>
                                </div>
                                <div style="text-align: right; font-weight: bold; color: #b8860b;">
                                    ₹${(item.price || item.book?.price) * item.quantity}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    openModal('myOrdersModal');
}

// ============================================
// NEWSLETTER WITH BACKEND
// ============================================

async function handleNewsletter(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    if (!emailInput) return;
    
    const email = emailInput.value;
    
    try {
        // Try API newsletter subscription
        if (API.baseURL) {
            await API.request('/api/newsletter/subscribe', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
            showNotification(`Thank you for subscribing with ${email}!`, 'success');
            e.target.reset();
            return;
        }
    } catch (error) {
        console.error('Newsletter API failed:', error);
    }
    
    // Fallback to local notification
    showNotification(`Thank you for subscribing with ${email}!`, 'success');
    e.target.reset();
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    booksGrid = document.getElementById('booksGrid');
    bestsellerTrack = document.getElementById('bestsellerTrack');
    cartCount = document.getElementById('cartCount');
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    newsletterForm = document.getElementById('newsletterForm');
    categoryCards = document.querySelectorAll('.category-card');
    
    // Check if user is logged in
    checkLoginStatus();
    
    // Load books from API (with fallback to local data)
    loadBooksFromAPI();
    
    // Load cart from API if user is logged in
    if (currentUser && currentUser.token) {
        loadCartFromAPI();
    }
    
    // Setup all event listeners
    setupEventListeners();
    
    // Update cart count
    updateCartCount();
    
    // Add scroll effects
    setupScrollEffects();
});