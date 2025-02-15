$(document).ready(function() {
  // Login funkcionalnost
  $("#loginButton").click(function() {
    $("#loginBox, #overlay").show();
  });

  $("#cancelLogin").click(function() {
    $("#loginBox, #overlay").hide();
  });

  $("#submitLogin").click(function() {
    const username = $("#username").val();
    const password = $("#password").val();

    if (username && password) {
      $("#loginButton").text(username);
      $("#loginBox, #overlay").hide();
    } else {
      alert("Please fill in both fields!");
    }
  });

  const imageData = new Map();

  const $modal = $("#imageModal");
  const $modalImg = $("#modalImage");
  const $likeButton = $("#likeButton");
  const $likeCount = $("#likeCount");
  const $commentInput = $("#commentInput");
  const $commentsSection = $("#commentsSection");

  $(".car-card, .row").each(function(index) {
    const imageId = `image-${index}`;

    if (!imageData.has(imageId)) {
      imageData.set(imageId, {
        likes: 0,
        isLiked: false,
        comments: []
      });
    }

    $(this).click(function() {
      const imgSrc = $(this).find("img").attr("src");
      openModal(imgSrc, imageId);
    });
  });

  $(".car-card, .row").hover(
    function() {
      $(this).css("opacity", "0.8");
    },
    function() {
      $(this).css("opacity", "1");
    }
  );

  function openModal(imgSrc, imageId) {
    $modal.show();
    $modal.fadeIn();
    $modalImg.attr({
      'src': imgSrc,
      'data-image-id': imageId
    });

    updateLikesAndComments(imageId);
  }

  function updateLikesAndComments(imageId) {
    const data = imageData.get(imageId);

    $likeCount.text(data.likes);
    $likeButton.toggleClass("active", data.isLiked);

    $commentsSection.empty();
    data.comments.forEach(comment => {
      $("<div>")
        .addClass("comment")
        .html(`
          <span class="comment-username">User</span>
          <span>${comment}</span>
        `)
        .appendTo($commentsSection);
    });
  }

  $(".close").click(function() {
    $modal.hide();
  });


  $likeButton.click(function() {
    const imageId = $modalImg.data("image-id");
    const data = imageData.get(imageId);

    data.isLiked = !data.isLiked;
    data.likes += data.isLiked ? 1 : -1;

    updateLikesAndComments(imageId);
  });

  $commentInput.keypress(function(e) {
    if (e.key === "Enter" && $(this).val().trim()) {
      const imageId = $modalImg.data("image-id");
      const data = imageData.get(imageId);

      data.comments.push($(this).val().trim());
      $(this).val("");

      updateLikesAndComments(imageId);
    }
  });

  $(window).click(function(e) {
    if (e.target === $modal[0]) {
      $modal.hide();
    }
  });

  $(window).scroll(function() {
    $("header").toggleClass("sticky", $(window).scrollTop() > 300);
  });
});