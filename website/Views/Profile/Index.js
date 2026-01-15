// Profile page specific JavaScript
console.log('Profile page loaded');

document.addEventListener('DOMContentLoaded', function() {
    // Animate avatar on load
    const avatar = document.querySelector('.avatar-circle');
    if (avatar) {
        avatar.style.transform = 'scale(0)';
        avatar.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            avatar.style.transform = 'scale(1)';
        }, 100);
    }

    // Animate skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.5s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // Animate info sections
    const infoSections = document.querySelectorAll('.info-section');
    infoSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        }, 200 + (index * 150));
    });
});
