// ============================================================
// UTILS.JS — دوال مساعدة عامة
// ============================================================

export function initUtils() {
    // دوال مساعدة يمكن استخدامها في جميع أنحاء المشروع

    // مثال: منع النقر المزدوج على الأزرار
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-char, .btn-auth, .btn-confirm').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.dataset.clicked) {
                e.preventDefault();
                return;
            }
            this.dataset.clicked = 'true';
            setTimeout(() => {
                delete this.dataset.clicked;
            }, 1000);
        });
    });

    console.log('🛠️ Utils module initialized.');
}
