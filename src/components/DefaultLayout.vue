<template>
   <div >
    <navbar />
    <main class="flex justify-center items-center p-12 bg-gray-700" :style="{ height: mainHeight}">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'

const mainHeight = `calc(100vh - ${64}px)`
</script>
