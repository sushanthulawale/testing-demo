
import { TodoService } from './todo.service';

export class TodosComponent {
  todos: any[] = [];
  message;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodos().subscribe(t => this.todos = t);
  }

  add() {
    let newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(    //add method called from service and subscribe to observable
      t => this.todos.push(t),              //add item todo in 't' which is returned from server 
      err => this.message = err);           //show error while adding item
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe();
    }
  }
}
