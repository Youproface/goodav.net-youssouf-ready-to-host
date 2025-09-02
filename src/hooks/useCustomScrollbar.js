import { useEffect, useRef } from 'react';

const useCustomScrollbar = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Create scrollbar elements
    const scrollbarContainer = document.createElement('div');
    scrollbarContainer.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: 8px;
      height: 100%;
      background: rgb(39, 39, 42);
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10;
      pointer-events: auto;
    `;

    const scrollbarThumb = document.createElement('div');
    scrollbarThumb.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      width: 6px;
      height: 40px;
      background: rgb(251, 146, 60);
      border-radius: 3px;
      transform: translateX(-50%);
      cursor: pointer;
      transition: all 0.2s ease;
    `;

    // Add hover effects
    scrollbarThumb.addEventListener('mouseenter', () => {
      scrollbarThumb.style.background = 'rgb(249, 115, 22)';
      scrollbarThumb.style.boxShadow = '0 0 8px rgba(251, 146, 60, 0.5)';
    });

    scrollbarThumb.addEventListener('mouseleave', () => {
      scrollbarThumb.style.background = 'rgb(251, 146, 60)';
      scrollbarThumb.style.boxShadow = 'none';
    });

    // Dragging functionality
    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      startY = e.clientY;
      startTop = parseInt(scrollbarThumb.style.top || '0');
      document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const maxTop = element.clientHeight - scrollbarThumb.offsetHeight;
      const newTop = Math.max(0, Math.min(maxTop, startTop + deltaY));

      scrollbarThumb.style.top = newTop + 'px';

      const scrollRatio = newTop / maxTop;
      element.scrollTop = scrollRatio * (element.scrollHeight - element.clientHeight);
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = '';
    };

    scrollbarThumb.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Show/hide on hover
    element.addEventListener('mouseenter', () => {
      scrollbarContainer.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
      if (!isDragging) {
        scrollbarContainer.style.opacity = '0';
      }
    });

    // Update scrollbar position
    const updateScrollbar = () => {
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      const scrollTop = element.scrollTop;

      if (scrollHeight <= clientHeight) {
        scrollbarContainer.style.display = 'none';
        return;
      }

      scrollbarContainer.style.display = 'block';

      const thumbHeight = Math.max(30, (clientHeight / scrollHeight) * clientHeight);
      const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight);

      scrollbarThumb.style.height = thumbHeight + 'px';
      scrollbarThumb.style.top = thumbTop + 'px';
    };

    element.addEventListener('scroll', updateScrollbar);

    // Setup
    element.style.position = 'relative';
    scrollbarContainer.appendChild(scrollbarThumb);
    element.appendChild(scrollbarContainer);
    updateScrollbar();

    // Cleanup
    return () => {
      scrollbarThumb.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('scroll', updateScrollbar);

      if (scrollbarContainer.parentNode) {
        scrollbarContainer.parentNode.removeChild(scrollbarContainer);
      }
    };
  }, []);

  return elementRef;
};

export default useCustomScrollbar;
