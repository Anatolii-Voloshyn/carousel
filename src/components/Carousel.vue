<template>
  <div v-if="isLoading">
    <div class="spinner"></div>
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <div class="wrapper">
      <button @click="prevImage" class="prev-button">
        <span>&#60;</span>
      </button>
      <div class="carousel" :style="{ '--num-images': numImages }">
        <img v-for="image in visibleImages" :src="image.download_url" :key="image.id" :alt="image.author">
      </div>
      <button @click="nextImage" class="next-button">
        <span>&#62;</span>
      </button>
    </div>

    <ul class="mt-4 font-mono text-gray-200">
      <li class="scale-110">
        <p>{{ visibleImages[0].download_url }}</p>
      </li>
      <li v-if="getWindowWidth() > 550">
        <p>{{ visibleImages[1].download_url }}</p>
      </li>
      <li v-if="getWindowWidth() > 900">
        <p>{{ visibleImages[2].download_url }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axiosClient from '../axiosClient.js';

const images = ref([]);
const numImages = ref(5);
const currentIndex = ref(0);
const isLoading = ref(true);

onMounted(async () => {
  const response = await axiosClient.get('/list?page=10&limit=30');

  images.value = response.data;

  numImages.value = images.value.length

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});


const visibleImages = computed(() => {
  const start = currentIndex.value;
  const end = start + numImages.value;

  return images.value.slice(start, end);
});

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function nextImage() {
  let numberOfImages = window.innerWidth < 550
    ? 1
    : (window.innerWidth < 900 ? 2 : 3);
  if (currentIndex.value < images.value.length - numberOfImages) {
    currentIndex.value++;
  }
}

function getWindowWidth() {
  return window.innerWidth;
}
</script>

<style>
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
  font-size: 0px;
  overflow: hidden;
  white-space: nowrap;
}

.carousel img {
  height: 340px;
  object-fit: cover;
  margin-left: 14px;
  width: calc(100% / 3);
  transform: scale(0.9);
  transition: transform 1s ease;
}

.carousel img:first-child {
  margin-left: 0px;
  border: 2px solid red;
  transform: scale(1.0);
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

.spinner {
  width: 4em;
  height: 4em;
  border: 0.5em solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
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
    width: 350px;
    margin-left: 14px;
  }

  .wrapper button:first-child {
    position: fixed;
    left: 5px;
    z-index: 1;
}

.wrapper button:last-child {
  position: fixed;
  right: 5px;
  z-index: 1;
}
}
</style>
