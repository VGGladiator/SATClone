// Initialize Lucide icons
lucide.createIcons();

// Simple resizer logic
const resizer = document.querySelector('.resizer');
const leftPane = document.querySelector('.left-pane');
const rightPane = document.querySelector('.right-pane');
const mainContainer = document.querySelector('.content-area');

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    
    // Calculate new width for left pane
    const containerRect = mainContainer.getBoundingClientRect();
    let newLeftWidth = e.clientX - containerRect.left;
    
    // Set some bounds (e.g., minimum 20% width for each pane)
    const minWidth = containerRect.width * 0.2;
    const maxWidth = containerRect.width * 0.8;
    
    if (newLeftWidth >= minWidth && newLeftWidth <= maxWidth) {
        leftPane.style.flex = `0 0 ${newLeftWidth}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = 'default';
    }
});
