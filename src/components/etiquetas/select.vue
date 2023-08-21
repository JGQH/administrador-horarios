<template>
    <select :class="'bg-white-dark dark:bg-black-light text-center rounded-md ' + clase">
        <slot></slot>
    </select>
</template>

<script setup lang="ts">
    const { clase } = defineProps<{ clase?: string }>()
</script>