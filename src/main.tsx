import React from 'react';
import ReactDOM from 'react-dom/client';
import { MobileMenu } from './components/MobileMenu';
import { FAQAccordion } from './components/FAQAccordion';
import { GlobalLogic } from './components/GlobalLogic';
import './index.css';

// 1. Global Logic (Scroll, Animations, etc.)
const globalRoot = document.createElement('div');
globalRoot.id = 'react-global-root';
document.body.appendChild(globalRoot);
ReactDOM.createRoot(globalRoot).render(<GlobalLogic />);

// 2. Mount Mobile Menu
const mobileMenuRoot = document.getElementById('mobile-menu-root');
if (mobileMenuRoot) {
  ReactDOM.createRoot(mobileMenuRoot).render(
    <React.StrictMode>
      <MobileMenu />
    </React.StrictMode>
  );
}

// 3. Mount FAQ Accordions (if they exist on the page)
const faqRoots = document.querySelectorAll('.faq-react-root');
faqRoots.forEach(root => {
  const itemsData = root.getAttribute('data-items');
  if (itemsData) {
    try {
      const items = JSON.parse(itemsData);
      ReactDOM.createRoot(root as HTMLElement).render(
        <React.StrictMode>
          <FAQAccordion items={items} />
        </React.StrictMode>
      );
    } catch (e) {
      console.error('Failed to parse FAQ items data', e);
    }
  }
});
