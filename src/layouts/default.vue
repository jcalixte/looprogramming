<template>
  <div
    flex
    flex-col
    items-center
    justify-between
    h-screen
    w-screen
    text-center
    text-gray-700
    dark:text-gray-200
    px-4
    py-2
    text-2xl
  >
    <app-header />
    <main flex-1 w-screen px-xl>
      <router-view />
    </main>
  </div>
</template>
