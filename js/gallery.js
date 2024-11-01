// In js/gallery.js
const videos = [
    {
        id: "YOUTUBE_VIDEO_ID_1",
        title: "First Project Video",
        description: "Description of first project"
    },
    {
        id: "YOUTUBE_VIDEO_ID_2",
        title: "Second Project Video",
        description: "Description of second project"
    },
    // Add more video objects as needed
];

document.addEventListener('DOMContentLoaded', function() {
    loadVideos();
    setupModal();
});

function loadVideos() {
    const videoGrid = document.getElementById('video-grid');
    
    videos.forEach(video => {
        const videoElement = createVideoElement(video);
        videoGrid.appendChild(videoElement);
    });
}

function createVideoElement(video) {
    const div = document.createElement('div');
    div.className = 'video-container relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg';
    div.innerHTML = `
        <div class="video-thumbnail cursor-pointer h-full" data-video-id="${video.id}">
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" 
                 alt="${video.title}" 
                 class="w-full h-full object-cover">
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <i class="fas fa-play-circle text-4xl text-white hover:text-red-600 transition-colors"></i>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 class="text-white font-bold">${video.title}</h3>
                <p class="text-gray-200 text-sm">${video.description}</p>
            </div>
        </div>
    `;
    
    div.querySelector('.video-thumbnail').addEventListener('click', () => {
        openVideoModal(video.id);
    });
    
    return div;
}

function setupModal() {
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('close-modal');
    const videoIframe = document.getElementById('video-iframe');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        videoIframe.src = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            videoIframe.src = '';
        }
    });
}

function openVideoModal(videoId) {
    const modal = document.getElementById('video-modal');
    const videoIframe = document.getElementById('video-iframe');
    
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}