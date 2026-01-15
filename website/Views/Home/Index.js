// Home Index page specific JavaScript
console.log('Home page loaded');

document.addEventListener('DOMContentLoaded', function() {
    // Add animation to features list
    const features = document.querySelectorAll('.home-features li');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            feature.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
    });
});
