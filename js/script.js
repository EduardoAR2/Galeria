const ACCESS_KEY = "lKMv5trCxKzAFKv0b6MQEoG5UQ6UJPiz0PYymPZ7ajxfSd1SfeVeGpBj";
const sidebar = document.querySelector(".sidebar");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const categoryDefault = document.querySelector('.sidebar li[data-category="abstract"]');

categoryDefault.classList.add("active");


async function loadImages(category) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>'; 

    try {
        let url;
        if (category === "random") {
            // Usar el endpoint de fotos aleatorias (Curated Photos)
            url = `https://api.pexels.com/v1/curated?per_page=100`;
        } else {
            // Usar el endpoint de búsqueda por categoría
            url = `https://api.pexels.com/v1/search?query=${category}&per_page=100`;
        }

        const response = await fetch(url, {
            headers: { Authorization: ACCESS_KEY }
        });
        const data = await response.json();

        // Limpiar la galería
        gallery.innerHTML = '';

        // Mostrar las imágenes en la galería
        data.photos.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo.src.medium;
            img.alt = photo.alt;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error("Error al cargar imágenes:", error);
        gallery.innerHTML = "<p>Error al cargar imágenes.</p>";
    }
}

const categoryItems = document.querySelectorAll(".sidebar li");

categoryItems.forEach(item => {
    item.addEventListener("click", () => {

        categoryItems.forEach(li => li.classList.remove("active"));
        
        // Agregar la clase 'active' al elemento clickeado
        item.classList.add("active");

        const category = item.dataset.category;
        loadImages(category);


    sidebar.classList.remove("active");


    });
});

// Cargar la primera página de la categoría "asbstracto"
loadImages("abstract");

// mostrar el sidebar al hacer clic en el ícono

menuIcon.addEventListener("click", () => {
    sidebar.classList.add("active");
});
// cerrar el sidebar al hacer clic en el ícono
closeIcon.addEventListener("click", () => {

    sidebar.classList.remove("active");
});


const searchInput = document.getElementById("search");
async function loadImagesSearch(search) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>'; 
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=100`, {
            headers: { Authorization: ACCESS_KEY }
        });
        const data = await response.json();

        gallery.innerHTML = '';
        data.photos.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo.src.medium;
            img.alt = photo.alt;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error("Error al cargar imágenes:", error);
        gallery.innerHTML = "<p>Error al cargar imágenes.</p>";
        gallery.classList.remove("loading");
    }
}

searchInput.addEventListener("input", async () => {
    const search = searchInput.value.trim().toLowerCase();
    loadImagesSearch(search);

    if (search === "") {
        loadImages("abstract");
        categoryItems.forEach(li => li.classList.remove("active"));
        categoryDefault.classList.add("active");
       

    }
});