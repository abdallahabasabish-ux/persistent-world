// ============================================================
// MAIN.JS — تحميل المكونات وتشغيل النظام
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    'use strict';

    // ============================================================
    // 1. تحميل المكونات (Components) من ملفات منفصلة
    // ============================================================
    const components = [
        { id: 'component-header', path: 'components/header.html' },
        { id: 'component-hero', path: 'components/hero.html' },
        { id: 'component-features', path: 'components/features.html' },
        { id: 'component-stats', path: 'components/stats.html' },
        { id: 'component-timeline', path: 'components/timeline.html' },
        { id: 'component-testimonials', path: 'components/testimonials.html' },
        { id: 'component-faq', path: 'components/faq.html' },
        { id: 'component-partners', path: 'components/partners.html' },
        { id: 'component-footer', path: 'components/footer.html' },
    ];

    for (const comp of components) {
        const container = document.getElementById(comp.id);
        if (!container) continue;
        try {
            const response = await fetch(comp.path);
            const html = await response.text();
            container.innerHTML = html;
        } catch (error) {
            console.warn(`⚠️ تعذر تحميل المكون ${comp.id}:`, error);
        }
    }

    // ============================================================
    // 2. تشغيل الوحدات (Modules)
    // ============================================================
    try {
        const { initNavigation } = await import('../modules/navigation.js');
        initNavigation();
    } catch (e) { console.warn('⚠️ navigation.js:', e); }

    try {
        const { initAnimations } = await import('../modules/animations.js');
        initAnimations();
    } catch (e) { console.warn('⚠️ animations.js:', e); }

    try {
        const { initTheme } = await import('../modules/theme.js');
        initTheme();
    } catch (e) { console.warn('⚠️ theme.js:', e); }

    try {
        const { initUtils } = await import('../modules/utils.js');
        initUtils();
    } catch (e) { console.warn('⚠️ utils.js:', e); }

    console.log('🚀 Elysium: Landing Page loaded successfully.');
});
