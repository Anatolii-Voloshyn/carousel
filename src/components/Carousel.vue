<template>
  <div v-if="isLoading" class="spinner-container">
    <div class="spinner"></div>
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <div class="wrapper">
      <button @click="prevImage" class="prev-button">
        <span>&#60;</span>
      </button>
      <transition-group name="carousel" tag="div" class="carousel" :style="{ '--num-images': numImages }">
        <img
          v-for="image in visibleImages"
          :src="image.download_url"
          :key="image.id"
          :alt="image.author"
          @click="toggleSelectedImage(image)"
          :class="{ 'selected-image': isSelected(image) }"
        >
      </transition-group>
      <button @click="nextImage" class="next-button">
        <span>&#62;</span>
      </button>
    </div>
    <transition name="fade">
      <div v-if="selectedImages.length > 0" class="selected-image-address">
        <ul>
          <li v-for="image in selectedImages" :key="image.id">{{ image.download_url }}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axiosClient from '../axiosClient.js';

const images = ref([]);
const numImages = ref(5);
const currentIndex = ref(0);
const isLoading = ref(true);
const selectedImages = ref([]);

const visibleImages = computed(() => {
  const start = currentIndex.value;
  const end = start + numImages.value;
  return images.value.slice(start, end);
});

async function fetchData() {
  const response = await axiosClient.get('/list?page=10&limit=30');
  images.value = response.data;
  numImages.value = images.value.length;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function nextImage() {
  let numberOfImages = window.innerWidth < 550 ? 1 : window.innerWidth < 900 ? 2 : 3;
  if (currentIndex.value < images.value.length - numberOfImages) {
    currentIndex.value++;
  }
}

function toggleSelectedImage(image) {
  const index = selectedImages.value.findIndex((selectedImage) => selectedImage.id === image.id);
  if (index === -1) {
    selectedImages.value.push(image);
  } else {
    selectedImages.value.splice(index, 1);
  }
}

function isSelected(image) {
  return selectedImages.value.some((selectedImage) => selectedImage.id === image.id);
}

fetchData();

</script>

<style>

.selected-image {
  border: 2px solid red;
}

.selected-image-address {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  color: rgb(209, 205, 205);
}

.wrapper {
  max-width: 1200px;
  position: relative;
}

.carousel {
  display: flex;
}

.wrapper button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.wrapper button:first-child {
  left: -40px;
}

.wrapper button:last-child {
  right: -40px;
}

.wrapper .carousel {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
}

.carousel img {
  height: 340px;
  object-fit: cover;
  margin-left: 10px;
  width: calc(100% / 3);
  z-index: 1;
}

.carousel img:first-child {
  margin-left: 0px;
};

.prev-button,
.next-button {
  font-size: 18px;
  background-color: transparent;
  border: none;
  position: relative;
}

span {
  padding-bottom: 5px;
  font-weight: 600;
  font-size: 24px;
  opacity: 0.33;
}

span:hover {
  opacity: 1;
  color: blue;
  transition: opacity 0.8s;
}

.prev-button span,
.next-button span {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  top: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ffffff;
}

.prev-button span {
  margin-right: 8px;
  padding-right: 3px;
}

.next-button span {
  margin-left: 8px;
  padding-left: 3px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  height: 100vh;
}

.spinner {
  width: 4em;
  height: 4em;
  border: 0.5em solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.carousel-enter-active, .carousel-leave-active {
  transition: transform 0.7s ease;
}

.carousel-enter, .carousel-leave-to {
  transform: translateX(105%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 900px) {
  .carousel img {
    width: calc(100% / 2);
  }
}

@media screen and (max-width: 550px) {
  .carousel img {
    height: 500px;
    width: 100%;
    margin-left: 0px;
  }

  .wrapper button:first-child {
    z-index: 1;
}

  .wrapper button:last-child {
    z-index: 1;
  }
}
</style>
