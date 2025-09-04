// Custom Scrollbar JavaScript Alternative
// This creates a custom scrollbar using JavaScript for better browser support

class CustomScrollbar {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      thumbColor: 'rgb(251, 146, 60)', // Brand orange
      trackColor: 'rgb(39, 39, 42)',   // Dark zinc
      hoverColor: 'rgb(249, 115, 22)',  // Darker orange
      width: 8,
      ...options
    };

    this.init();
  }

  init() {
    // Create scrollbar container
    this.scrollbarContainer = document.createElement('div');
    this.scrollbarContainer.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: ${this.options.width}px;
      height: 100%;
      background: ${this.options.trackColor};
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10;
    `;

    // Create scrollbar thumb
    this.scrollbarThumb = document.createElement('div');
    this.scrollbarThumb.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      width: 6px;
      height: 40px;
      background: ${this.options.thumbColor};
      border-radius: 3px;
      transform: translateX(-50%);
      cursor: pointer;
      transition: all 0.2s ease;
    `;

    // Add hover effects
    this.scrollbarThumb.addEventListener('mouseenter', () => {
      this.scrollbarThumb.style.background = this.options.hoverColor;
      this.scrollbarThumb.style.boxShadow = '0 0 8px rgba(251, 146, 60, 0.5)';
    });

    this.scrollbarThumb.addEventListener('mouseleave', () => {
      this.scrollbarThumb.style.background = this.options.thumbColor;
      this.scrollbarThumb.style.boxShadow = 'none';
    });

    // Add click and drag functionality
    this.isDragging = false;
    this.startY = 0;
    this.startTop = 0;

    this.scrollbarThumb.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startY = e.clientY;
      this.startTop = parseInt(this.scrollbarThumb.style.top || '0');
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      const deltaY = e.clientY - this.startY;
      const newTop = Math.max(0, Math.min(
        this.element.clientHeight - this.scrollbarThumb.offsetHeight,
        this.startTop + deltaY
      ));

      this.scrollbarThumb.style.top = newTop + 'px';

      // Update scroll position
      const scrollRatio = newTop / (this.element.clientHeight - this.scrollbarThumb.offsetHeight);
      this.element.scrollTop = scrollRatio * (this.element.scrollHeight - this.element.clientHeight);
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      document.body.style.userSelect = '';
    });

    // Show/hide scrollbar on hover
    this.element.addEventListener('mouseenter', () => {
      this.scrollbarContainer.style.opacity = '1';
    });

    this.element.addEventListener('mouseleave', () => {
      if (!this.isDragging) {
        this.scrollbarContainer.style.opacity = '0';
      }
    });

    // Update scrollbar on scroll
    this.element.addEventListener('scroll', () => {
      this.updateScrollbar();
    });

    // Initial setup
    this.element.style.position = 'relative';
    this.scrollbarContainer.appendChild(this.scrollbarThumb);
    this.element.appendChild(this.scrollbarContainer);
    this.updateScrollbar();
  }

  updateScrollbar() {
    const scrollHeight = this.element.scrollHeight;
    const clientHeight = this.element.clientHeight;
    const scrollTop = this.element.scrollTop;

    if (scrollHeight <= clientHeight) {
      this.scrollbarContainer.style.display = 'none';
      return;
    }

    this.scrollbarContainer.style.display = 'block';

    const thumbHeight = Math.max(30, (clientHeight / scrollHeight) * clientHeight);
    const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight);

    this.scrollbarThumb.style.height = thumbHeight + 'px';
    this.scrollbarThumb.style.top = thumbTop + 'px';
  }

  destroy() {
    if (this.scrollbarContainer && this.scrollbarContainer.parentNode) {
      this.scrollbarContainer.parentNode.removeChild(this.scrollbarContainer);
    }
  }
}

// Usage example:
// const scrollbar = new CustomScrollbar(document.querySelector('.custom-scrollbar'));

export default CustomScrollbar;
