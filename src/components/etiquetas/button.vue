<template>
    <button :class="'p-1 lg:py-2 lg:px-3 border-2 font-bold rounded-md transition-colors ' + (disabled ? 'text-white-dark dark:text-black-light border-white-dark dark:border-black-light' :'border-accent hover:bg-accent hover:text-white active:bg-accent-dark active:border-accent-dark active:text-white-dark')" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    const { disabled = false } = defineProps<{
        disabled?: boolean
    }>()
</script>