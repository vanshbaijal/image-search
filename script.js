const apiKey = "8ZZtuwh5I7ye_jIjWAkpnWBJnBPc1I7Rb7cDE0S0HE4";
let page = 1;

function searchImages() {
  const imgName = document.getElementById("searchInput").value.trim();
  if (!imgName) {
    alert("Please enter a search query.");
    return;
  }
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${imgName}&client_id=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results.length === 0) {
        alert("No images found for the given search query.");
      } else {
        showImgFn(data.results);
      }
    })
    .catch(error => console.error('Error fetching images:', error));
}

function showImgFn(images) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";
  images.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.src = image.urls.regular;
    img.alt = "Image";
    img.onclick = function () {
      preImgFn(image.urls.full);
    };
    card.appendChild(img);
    imageContainer.appendChild(card);
  });
}

function moreImgFn() {
  page++;
  searchImages();
}

function preImgFn(imageUrl) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImage.src = imageUrl;
}

function closePreFn() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

document.getElementById("searchInput").value = "Computer";
searchImages();

document.getElementById("searchBtn").addEventListener("click", searchImages);
document.getElementById("moreBtn").addEventListener("click", moreImgFn);
document.getElementById("closeModalBtn").addEventListener("click", closePreFn);
