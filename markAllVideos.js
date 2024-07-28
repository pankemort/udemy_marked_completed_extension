let currentSectionIndex = 0;
let currentVideoIndex = 0;
const sectionExpandButtonSelector = '.section--flex--B9xUV'; // Selector for section expand buttons
const videoSelector = 'span[data-purpose="item-title"]'; // Selector for video elements

// Function to expand a single section
function expandSection(sectionIndex) {
  const sections = document.querySelectorAll(sectionExpandButtonSelector);
  if (sectionIndex >= sections.length) {
    console.log('All sections processed!');
    return;
  }

  const section = sections[sectionIndex];
  const button = section.querySelector('button');
  if (button) {
    console.log(`Expanding section ${sectionIndex + 1}`);
    button.click();
    // Wait for the section to expand before processing videos
    setTimeout(() => {
      processItemsInSection(section);
    }, 2000); // Adjust this delay to allow the section to expand
  } else {
    // Move to the next section if no button is found
    currentSectionIndex++;
    expandSection(currentSectionIndex);
  }
}

// Function to get all items (videos and non-videos) in a section
function getItemsInSection(section) {
  return document.querySelectorAll(videoSelector);
}

// Function to mark an item as completed
function markItem(itemSpans) {
  if (currentVideoIndex >= itemSpans.length) {
    // Move to the next section after processing all items in the current section
    currentSectionIndex++;
    expandSection(currentSectionIndex);
    return;
  }

  const itemSpan = itemSpans[currentVideoIndex];

  // Simulate a click on the item to navigate to it
  console.log(`Navigating to item ${currentVideoIndex + 1} in section ${currentSectionIndex + 1}`);
  itemSpan.click();

  // Wait for the item to load and then mark it as completed
  setTimeout(() => {
    const video = document.querySelector('video');

    if (video) {
      console.log(`Marking item ${currentVideoIndex + 1} as completed`);
      // Set the video to its end time to mark it as watched
      video.currentTime = video.duration - 1;

      // Listen for the 'timeupdate' event to update the playback state
      const timeUpdateHandler = () => {
        if (video.currentTime >= video.duration - 1) {
          video.removeEventListener('timeupdate', timeUpdateHandler);
          console.log(`Item ${video.src} marked as completed`);

          // Move to the next item after a short delay
          currentVideoIndex++;
          setTimeout(() => markItem(itemSpans), 1000);
        }
      };
      video.addEventListener('timeupdate', timeUpdateHandler);

      // Trigger the 'timeupdate' event to update the playback state
      const event = new Event('timeupdate');
      video.dispatchEvent(event);

      // Simulate the video ending to mark it as completed
      video.currentTime = video.duration;
    } else {
      console.log(`No video element found for item ${currentVideoIndex + 1}`);
      // If no video element found, move to the next item
      currentVideoIndex++;
      setTimeout(() => markItem(itemSpans), 1000);
    }
  }, 7000); // Adjust this delay based on how long it takes for an item to load
}

// Function to process items in a section
function processItemsInSection(section) {
  const itemSpans = getItemsInSection(section);
  if (itemSpans.length === 0) {
    console.log(`No items found in section ${currentSectionIndex + 1}`);
    // Move to the next section if no items are found
    currentSectionIndex++;
    expandSection(currentSectionIndex);
    return;
  }
  console.log(`Processing ${itemSpans.length} items in section ${currentSectionIndex + 1}`);
  currentVideoIndex = 0;
  markItem(itemSpans);
}

// Start the process by expanding the first section
expandSection(currentSectionIndex);
