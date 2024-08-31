const slides = document.querySelector('.slides');
        const slideCount = document.querySelectorAll('.slide').length;
        const pagination = document.getElementById('pagination');
        let currentIndex = 0;
        let autoSlide;

        function showSlide(index) {
            if (index >= slideCount) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slideCount - 1;
            } else {
                currentIndex = index;
            }
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            updatePagination();
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            autoSlide = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        function updatePagination() {
            pagination.innerHTML = '';
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot' + (i === currentIndex ? ' active' : '');
                dot.addEventListener('click', () => {
                    stopAutoSlide();
                    showSlide(i);
                    startAutoSlide();
                });
                pagination.appendChild(dot);
            }
        }

        document.getElementById('next').addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        document.getElementById('prev').addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        document.getElementById('slider').addEventListener('mouseenter', stopAutoSlide);
        document.getElementById('slider').addEventListener('mouseleave', startAutoSlide);

        // Swipe functionality
        let startX, endX;
        slides.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        slides.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            if (startX > endX + 50) {
                nextSlide();
            } else if (startX < endX - 50) {
                prevSlide();
            }
        });

        startAutoSlide();
        updatePagination();

// animation
var typed = new Typed('#type', {
  strings: ['Image Slider'],
  typeSpeed: 80,
  backDelay: 2000,
  backSpeed: 50,
  loop: true,
  loopCount: Infinity,
  autoInsertCss:false,
  
});