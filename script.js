// Your code here.
// Get all items (cubes) and the container
const items = document.querySelectorAll('.item');
const container = document.querySelector('.items');

// Variables to store the current selected cube and its offset
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Function to handle mouse down event
function onMouseDown(event) {
  // Check if the clicked target is an item (cube)
  selectedItem = event.target;

  // If a valid item is clicked, start the dragging process
  if (selectedItem) {
    // Get the position of the item relative to the container
    const rect = selectedItem.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    // Add event listeners for mouse move and mouse up
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    // Make the item "active" (for visual feedback)
    selectedItem.style.position = 'absolute';
    selectedItem.style.zIndex = '10'; // Ensure the selected item is on top
    selectedItem.style.transition = 'none'; // Disable transition during dragging
  }
}

// Function to handle mouse move event
function onMouseMove(event) {
  if (selectedItem) {
    // Calculate the new position of the selected item
    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;

    // Get container bounds
    const containerRect = container.getBoundingClientRect();
    
    // Ensure the item stays within the container bounds
    const maxX = containerRect.width - selectedItem.offsetWidth;
    const maxY = containerRect.height - selectedItem.offsetHeight;

    // Constrain the movement to within the container
    x = Math.max(containerRect.left, Math.min(x, containerRect.left + maxX));
    y = Math.max(containerRect.top, Math.min(y, containerRect.top + maxY));

    // Apply the new position of the item
    selectedItem.style.left = `${x}px`;
    selectedItem.style.top = `${y}px`;
  }
}

// Function to handle mouse up event (stop dragging)
function onMouseUp() {
  // Remove event listeners for mouse move and mouse up
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);

  // Reset the item style and position
  if (selectedItem) {
    selectedItem.style.transition = 'all 0.2s ease'; // Re-enable smooth transition
    selectedItem.style.zIndex = '1'; // Reset z-index
    selectedItem = null; // Clear the selected item
  }
}

// Attach the mouse down event to all items
items.forEach(item => {
  item.addEventListener('mousedown', onMouseDown);
});
