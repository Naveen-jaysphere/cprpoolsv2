import { useEffect } from 'react';

export const GlobalLogic = () => {
  useEffect(() => {
    // Header Scroll Logic
    const header = document.querySelector('header');
    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .trust-item, .section-header').forEach(el => {
      observer.observe(el);
    });

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navLink = target.closest('a[href^="#"]');
      if (navLink) {
        const href = navLink.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          window.scrollTo({
            top: (targetEl as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  return null;
};
