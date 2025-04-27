// تغيير اللغة بين العربية والإنجليزية
document.getElementById('change-lang').addEventListener('click', function() {
    var elements = document.querySelectorAll('[data-lang]'); // جلب جميع العناصر التي تحتوي على خصائص data-lang
    elements.forEach(function(element) {
        var lang = element.getAttribute('data-lang');
        if (lang === 'ar') {
            element.textContent = element.getAttribute('data-ar'); // النص العربي
        } else {
            element.textContent = element.getAttribute('data-en'); // النص الإنجليزي
        }
    });
});
