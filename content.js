function markAllVideos() {
    const videoSpans = document.querySelectorAll('span[data-purpose="item-title"]');
  
    let currentIndex = 0;
  
    function markVideo() {
      if (currentIndex >= videoSpans.length) {
        alert('All videos marked as completed!');
        return;
      }
  
      const videoSpan = videoSpans[currentIndex];
  
     
      videoSpan.click();
  
      
      setTimeout(() => {
        const video = document.querySelector('video');
  
        if (video) {
         
          video.currentTime = video.duration - 1;
  
          
          const event = new Event('timeupdate');
          video.dispatchEvent(event);
  
          video.addEventListener('ended', () => {
            console.log(`Video ${video.src} marked as completed`);
          });
  
          video.currentTime = video.duration;
        }

        currentIndex++;
        setTimeout(markVideo, 1000);
      }, 2000); 
    }
  
    markVideo();
  }
 
  markAllVideos();
  