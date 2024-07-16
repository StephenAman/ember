document.getElementById('story-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const story = document.getElementById('story').value;
    
    const response = await fetch('/submit-story', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, story })
    });
    
    if (response.ok) {
        const storyContainer = document.getElementById('stories-container');
        const newStory = document.createElement('div');
        newStory.className = 'story';
        newStory.innerHTML = `<h3>${name}</h3><p>${story}</p>`;
        
        storyContainer.appendChild(newStory);
        
        // Clear the form
        document.getElementById('story-form').reset();
    } else {
        alert('Failed to submit story');
    }
});

async function loadStories() {
    const response = await fetch('/stories');
    const stories = await response.json();
    
    const storyContainer = document.getElementById('stories-container');
    stories.forEach(({ name, story }) => {
        const newStory = document.createElement('div');
        newStory.className = 'story';
        newStory.innerHTML = `<h3>${name}</h3><p>${story}</p>`;
        
        storyContainer.appendChild(newStory);
    });
}

document.addEventListener('DOMContentLoaded', loadStories);
