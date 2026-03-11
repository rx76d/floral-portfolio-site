document.addEventListener('DOMContentLoaded', () => {
    
    const initializeAudioControl = () => {
        const video = document.getElementById('video-bg');
        const audioToggleBtn = document.getElementById('audio-toggle');
        const iconMuted = document.getElementById('icon-muted');
        const iconPlaying = document.getElementById('icon-playing');

        if (!video || !audioToggleBtn) return;

        audioToggleBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                video.volume = 1.0; 
                
                iconMuted.style.display = 'none';
                iconPlaying.style.display = 'block';
                
                video.play().catch(error => {
                    console.warn("Browser prevented autoplay:", error);
                }); 
            } else {
                video.muted = true;
                
                iconMuted.style.display = 'block';
                iconPlaying.style.display = 'none';
            }
        });
    };

    const preventScrollPausing = () => {
        const snapContainer = document.querySelector('.snap-container');
        const video = document.getElementById('video-bg');

        if (!snapContainer || !video) return;

        snapContainer.addEventListener('scroll', () => {
            if (video.paused && !video.muted) {
                video.play().catch(error => {
                    console.warn("Browser prevented play during scroll:", error);
                });
            }
        });
    };

    initializeAudioControl();
    preventScrollPausing();

});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
document.addEventListener('keydown', function (e) {
    if (
        (e.ctrlKey && e.keyCode === 85) ||
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
        (e.ctrlKey && e.shiftKey && e.keyCode === 67)
    ) {
        e.preventDefault();
    }
});