// API Configuration
const config = {
    apiBaseUrl: 'http://localhost:5000'
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.config = config;
}