document.querySelectorAll('.naked-video').forEach(div => {
  div.addEventListener('click', () => {
    const iframe = div.querySelector('iframe');
    const src = iframe.getAttribute('src');
    if (!src.includes('&autoplay=1')) {
      iframe.setAttribute('src', src + '&autoplay=1');
    }
  });
});


async function loadLatestVimeoVideo() {
  const token = "89b7b28f72c9a6659417ad64839e5416"; // Replace with your real token
  const userId = "user243821645"; // e.g. user12345678

  try {
    const response = await fetch(`https://api.vimeo.com/users/${userId}/videos?per_page=1&sort=date&direction=desc`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    const latestVideo = data.data[0];
    const videoId = latestVideo.uri.split("/").pop();

    const iframe = document.createElement("iframe");
    iframe.src = `https://player.vimeo.com/video/${videoId}`;
    iframe.width = "100%";
    iframe.height = "360";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");

    document.getElementById("spotlight-video").appendChild(iframe);
  } catch (err) {
    console.error("Failed to load video:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadLatestVimeoVideo);
