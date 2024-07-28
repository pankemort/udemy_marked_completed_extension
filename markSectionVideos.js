function markAllVideos() {
    const videoSpans = document.querySelectorAll('span[data-purpose="item-title"]');
  
    let currentIndex = 0;
  
    function markVideo() {
      if (currentIndex >= videoSpans.length) {
        alert('All videos marked as completed!');
        return;
      }
  
      const videoSpan = videoSpans[currentIndex];
  
      // Simulate a click on the video link to navigate to it
      videoSpan.click();
  
      // Wait for the video to load and then mark it as completed
      setTimeout(() => {
        const video = document.querySelector('video');
  
        if (video) {
          // Set the video to its end time to mark it as watched
          video.currentTime = video.duration - 1;
  
          // Trigger the 'timeupdate' event to update the playback state
          const event = new Event('timeupdate');
          video.dispatchEvent(event);
  
          // Simulate the video ending to mark it as completed
          video.addEventListener('ended', () => {
            console.log(`Video ${video.src} marked as completed`);
          });
  
          // Set the current time to the end of the video
          video.currentTime = video.duration;
        }
  
        // Move to the next video after a short delay
        currentIndex++;
        setTimeout(markVideo, 1000);
      }, 3000); // Adjust this delay based on how long it takes for a video to load
    }
  
    markVideo();
  }
  
  markAllVideos();
  