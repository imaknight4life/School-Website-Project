// Cart functionality using localStorage for persistence
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
        this.initializeEventListeners();
    }

    // Load cart items from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('glassblowing-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart items to localStorage
    saveCart() {
        localStorage.setItem('glassblowing-cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showAddedToCartNotification(product.name);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    // Get total item count
    getTotalCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get total price
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Update cart count display
    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const count = this.getTotalCount();
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'inline' : 'none';
        }
    }

    // Show notification when item is added
    showAddedToCartNotification(productName) {
        // Remove existing notification if present
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <span>✓ "${productName}" added to cart!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                e.preventDefault();
                
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const product = this.extractProductInfo(productCard);
                    this.addItem(product);
                }
            }
        });
    }

    // Extract product information from product card
    extractProductInfo(productCard) {
        const name = productCard.querySelector('h3').textContent.trim();
        const priceText = productCard.querySelector('.product-price').textContent.trim();
        const price = parseFloat(priceText.replace('£', ''));
        const image = productCard.querySelector('img').src;
        
        // Generate a simple ID based on the product name
        const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        
        return { id, name, price, image };
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});