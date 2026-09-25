import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from './models/todo';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  todos: Todo[] = [];

  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
      },
      error: (error) => {
        console.error('Error loading todos:', error);
      }
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) {
      return;
    }

    const todo: Todo = {
      title: this.newTodoTitle,
      completed: false
    };

    this.todoService.createTodo(todo).subscribe({
      next: (createdTodo) => {
        this.todos.push(createdTodo);
        this.newTodoTitle = '';
      },
      error: (error) => {
        console.error('Error creating todo:', error);
      }
    });
  }

  toggleTodo(todo: Todo): void {
    if (todo.id === undefined) {
      return;
    }

    this.todoService.updateTodo(todo.id, todo).subscribe({
      next: (updatedTodo) => {
        todo.completed = updatedTodo.completed;
      },
      error: (error) => {
        console.error('Error updating todo:', error);
      }
    });
  }

  deleteTodo(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      }
    });
  }
}

