document.getElementById('downloadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const link = document.getElementById('videoLink').value;
    const fileName = document.getElementById('fileName').value + ".mp4";
    const progressElement = document.getElementById('progress');
    const messageElement = document.getElementById('message');
    messageElement.innerText = "Downloading...";

    const url = "https://tiktok-scraper7.p.rapidapi.com/";
    const headers = {
        "x-rapidapi-key": "2e4d95fa54mshd6782f6267c683cp119d20jsn6e6bdb07019e",
        "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com"
    };

    try {
        const response = await fetch(url + "?url=" + encodeURIComponent(link) + "&hd=1", {
            method: 'GET',
            headers: headers
        });

        if (response.ok) {
            const data = await response.json();
            const playIndex = data.data ? data.data.hdplay : null;

            if (playIndex) {
                // Make a HEAD request to get the content length
                const headResponse = await fetch(playIndex, { method: 'HEAD' });
                const contentLength = headResponse.headers.get('content-length');
                const sizeMB = (contentLength / 1048576).toFixed(2);
                messageElement.innerText = `Downloading video of size: ${sizeMB} MB`;

                // Download video content
                const videoResponse = await fetch(playIndex);
                const reader = videoResponse.body.getReader();
                let receivedLength = 0;
                let chunks = [];

                // Read the data
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        break;
                    }

                    chunks.push(value);
                    receivedLength += value.length;

                    // Update progress bar
                    const progress = (receivedLength / contentLength) * 100;
                    progressElement.style.width = progress + '%';
                    progressElement.setAttribute('aria-valuenow', progress.toFixed(2));
                    progressElement.innerText = `${progress.toFixed(2)}%`;
                }

                // Concatenate chunks into a blob
                let blob = new Blob(chunks);
                let url = URL.createObjectURL(blob);

                // Create a link to download the video
                let a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();

                URL.revokeObjectURL(url);
                messageElement.innerText = `Video saved as ${fileName}`;
            } else {
                messageElement.innerText = "No Video Found";
            }
        } else {
            messageElement.innerText = "Failed to fetch the data.";
        }
    } catch (error) {
        messageElement.innerText = "An error occurred: " + error.message;
    }
});

document.getElementById('videoLink').addEventListener('input', async function () {
    const link = document.getElementById('videoLink').value;
    const messageElement = document.getElementById('message');
    
    if (!link) {
        messageElement.innerText = "Please enter a video link.";
        return;
    }

    const url = "https://tiktok-scraper7.p.rapidapi.com/";
    const headers = {
        "x-rapidapi-key": "2e4d95fa54mshd6782f6267c683cp119d20jsn6e6bdb07019e",
        "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com"
    };

    try {
        const response = await fetch(url + "?url=" + encodeURIComponent(link) + "&hd=1", {
            method: 'GET',
            headers: headers
        });

        if (response.ok) {
            const data = await response.json();
            const title = data.data ? data.data.title : "Unknown title";
            const duration = data.data ? data.data.duration : "Unknown duration";

            messageElement.innerText = `Title: ${title}\nDuration: ${duration} seconds`;

            // Fetch the actual content size for more accuracy
            const playIndex = data.data ? data.data.hdplay : null;
            if (playIndex) {
                const headResponse = await fetch(playIndex, { method: 'HEAD' });
                const contentLength = headResponse.headers.get('content-length');
                const sizeMB = (contentLength / 1048576).toFixed(2);
                messageElement.innerText += `\nSize: ${sizeMB} MB`;
            }
        } else {
            messageElement.innerText = "Failed to fetch video information.";
        }
    } catch (error) {
        messageElement.innerText = "An error occurred: " + error.message;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('facebook').addEventListener('click', function () {
        window.open('https://web.facebook.com/mrr.ouksa.7/', '_blank');
       //window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('telegram').addEventListener('click', function () {
        window.open('https://t.me/senghoutork', '_blank');
       //window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank');
    });
});
