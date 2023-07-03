<template>
    <div class="flex flex-col">
        <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-lg">Manage Todo</h3>
            <div>
                <Button
                    label="Add Todo"
                    severity="primary"
                    icon="pi pi-plus"
                    rounded
                    @click="visibleRight = true"
                />
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <TodoCard
                v-for="(item, index) in todos"
                :key="index"
                :todo="item"
                @onAddSub="addSubTodo($event, index)"
                @onDelete="onDeleteTodo($event, index)"
            />
        </div>
    </div>

    <!-- Todo Create -->
    <Sidebar v-model:visible="visibleRight" position="right">
        <h3 class="font-bold text-black text-lg mb-4">Todo Details</h3>
        <form @submit.prevent="submitTodoForm">
            <div class="mb-3">
                <label class="form-label">Title <span>*</span></label>
                <InputText type="text" v-model="todo.title" placeholder="Title" />
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <Textarea
                    v-model="todo.description"
                    placeholder="Description"
                    autoResize
                    rows="5"
                    cols="30"
                />
            </div>
            <div class="flex gap-2">
                <Button type="submit" label="Save" severity="primary" icon="pi pi-save" />
                <Button label="Cancel" severity="secondary" icon="pi pi-times" />
            </div>
        </form>
    </Sidebar>

    <Toast />
    <ConfirmDialog></ConfirmDialog>
</template>
<script>
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import TodoCard from '../../components/TodoCard.vue'

export default {
    name: 'TodoList',
    components: {
        Button,
        Sidebar,
        InputText,
        Textarea,
        ConfirmDialog,
        Toast,
        TodoCard
    },
    data() {
        return {
            visibleRight: false,
            formSubmitted: false,
            todo: {
                parentId: 0,
                title: '',
                description: ''
            },
            todos: [
                {
                    id: 1,
                    title: 'Test Title 1',
                    description: 'Description 1',
                    child: []
                },
                {
                    id: 2,
                    title: 'Test Title 2',
                    description: 'Description 2',
                    child: []
                }
            ]
        }
    },
    methods: {
        addSubTodo: function (event, index) {
            this.visibleRight = true
            this.todo.parentId = event.id
        },
        submitTodoForm: function () {
            this.formSubmitted = true
            console.log(this.todo)
            if (this.todo.parentId !== 0) {
                this.todos.forEach((e) => {
                    if (e.id == this.todo.parentId) {
                        e.child.push(this.todo)
                    }
                })
            } else {
                this.todos.push(this.todo)
            }
            //
            console.log(this.todos)
            this.visibleRight = false
            this.resetTodoForm()
        },
        onDeleteTodo: function (event, index) {
            console.log(event)
            this.$confirm.require({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    this.todos.splice(index, 1)
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Confirmed',
                        detail: 'Record deleted',
                        life: 3000
                    })
                },
                reject: () => {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Rejected',
                        detail: 'You have rejected',
                        life: 3000
                    })
                }
            })
        },
        resetTodoForm: function () {
            this.todo = {
                title: '',
                description: ''
            }
        }
    }
}
</script>
<style></style>
