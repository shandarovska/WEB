document.getElementById("loginButton").addEventListener("click", function () {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

document.getElementById("cancelLogin").addEventListener("click", function () {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

document.getElementById("submitLogin").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    document.getElementById("loginButton").textContent = username;
    //it closes
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  } else {
    alert("Please fill in both fields!");
  }
});

// Store likes and comments for each image
const imageData = new Map();

// Get elements
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementsByClassName("close")[0];
const likeButton = document.getElementById("likeButton");
const likeCount = document.getElementById("likeCount");
const commentInput = document.getElementById("commentInput");
const commentsSection = document.getElementById("commentsSection");

// Click option to .car-card
document.querySelectorAll(".car-card").forEach((item, index) => {
  const imageId = `image-${index}`;

  // Initialize image data if not exists
  if (!imageData.has(imageId)) {
    imageData.set(imageId, {
      likes: 0,
      isLiked: false,
      comments: [],
    });
  }

  item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").src;
    openModal(imgSrc, imageId);
  });
});
// The same, but with row
document.querySelectorAll(".row").forEach((item, index) => {
  const imageId = `image-${index}`;

  if (!imageData.has(imageId)) {
    imageData.set(imageId, {
      likes: 0,
      isLiked: false,
      comments: [],
    });
  }

  item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").src;
    openModal(imgSrc, imageId);
  });
});

// Open modal function
function openModal(imgSrc, imageId) {
  modal.style.display = "block";
  modalImg.src = imgSrc;
  modalImg.dataset.imageId = imageId;

  // Update likes and comments
  updateLikesAndComments(imageId);
}

// Update likes and comments display
function updateLikesAndComments(imageId) {
  const data = imageData.get(imageId);

  // Update like button and count
  likeCount.textContent = data.likes;
  likeButton.classList.toggle("active", data.isLiked);

  // Update comments
  commentsSection.innerHTML = "";
  data.comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = `
          <span class="comment-username">User</span>
          <span>${comment}</span>
        `;
    commentsSection.appendChild(commentElement);
  });
}

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Handle like button
likeButton.addEventListener("click", () => {
  const imageId = modalImg.dataset.imageId;
  const data = imageData.get(imageId);

  data.isLiked = !data.isLiked;
  data.likes += data.isLiked ? 1 : -1;

  updateLikesAndComments(imageId);
});

commentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && commentInput.value.trim()) {
    const imageId = modalImg.dataset.imageId;
    const data = imageData.get(imageId);

    data.comments.push(commentInput.value.trim());
    commentInput.value = "";

    updateLikesAndComments(imageId);
  }
});

// Close modal when clicking outside
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Header with 300 pixels scroll, it becomes sticky
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 300);
});
