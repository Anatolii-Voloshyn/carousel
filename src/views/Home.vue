<template>
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-2xl font-mono text-gray-200 pb-4">Click on a cat to see images:</h1>
    <router-link :to="{name: 'carousel'}">
      <img class="h-24 rounded-full" src="../cat.jpg" alt="Cat">
    </router-link>
  </div>  
</template>