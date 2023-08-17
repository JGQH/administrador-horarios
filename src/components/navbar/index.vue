<template>
    <header class="flex bg-white-dark dark:bg-black-light items-center">
        <!--Título principal-->
        <H1 class="grow font-bold p-3 md:p-5">CREADOR DE HORARIOS</H1>
        <!--Botón del menú-->
        <nav tabindex="0" class="relative navbar shrink max-md:cursor-pointer max-md:w-[2rem] max-md:h-[2rem] max-md:mr-3">
            <ul role="menubar" aria-haspopup="true" class="z-10 hidden md:block bg-white-dark dark:bg-black-light max-md:absolute top-full right-0 flex flex-col md:flex-row text-center">
                <!--Opciones del menú-->
                <li v-for="ruta in rutas" role="menuitem" :aria-label="ruta.nombre" class="block md:inline-block">
                    <a :href="ruta.dirección" :class="'p-8 font-bold md:py-2 md:px-4 md:mr-2 block transition-colors hover:bg-white dark:hover:bg-black md:hover:bg-accent md:hover:text-white md:rounded-md ' + (direcciónActual === ruta.dirección ? 'text-black dark:text-white' : 'text-black-light dark:text-white-dark')">{{ ruta.nombre }}</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
    @media (max-width: 767px) {
    nav::before, nav::after {
        content: '';
        position: absolute;
        display: inline-block;
        height: 20%;
        width: 75%;
        left: 12.5%;
        background-color: white;
        border-radius: 1rem;
        transition: transform 150ms ease-out, top 150ms ease-out;
    }

    nav::before {
        top: 20%;
    }

    :is(nav:focus, nav:focus-within)::before {
        top: 40%;
        transform: rotate(45deg);
    }

    nav::after {
        top: 60%
    }

    :is(nav:focus, nav:focus-within)::after {
        top: 40%;
        transform: rotate(-45deg);
    }


    :is(nav:focus, nav:focus-within) ul {
        display: block;
    }
}
</style>

<script setup lang="ts">
    import { default as H1 } from '../etiquetas/h1.vue'

    type Ruta = {
        nombre: string,
        dirección: string
    }

    const { direcciónActual } = defineProps<{
        direcciónActual: string
    }>()

    const rutas: Ruta[] = [{
        nombre: "Generar",
        dirección: "/administrador-horarios/"
    },{
        nombre: "Registrar",
        dirección: "/administrador-horarios/registrar"
    },{
        nombre: "Visualizar",
        dirección: "/administrador-horarios/visualizar"
    }]
</script>