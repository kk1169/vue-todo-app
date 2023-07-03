<template>
    <div
        class="w-full relative flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded"
    >
        <h3>{{ todo.title }}</h3>
        <div class="flex gap-5">
            <button
                class="text-black hover:text-primary-600"
                size="small"
                link
                @click="onAddSub(todo)"
            >
                <i class="far fa-plus"></i>
            </button>
            <button
                class="text-black hover:text-primary-600"
                size="small"
                link
                @click="onDeleteTodo(todo)"
            >
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TodoCard',
    components: {},
    props: ['todo'],
    methods: {
        onDeleteTodo: function (todo) {
            this.$emit('onDelete', todo)
        },
        onAddSub: function (todo) {
            this.$emit('onAddSub', todo)
        }
    }
}
</script>
<style></style>
