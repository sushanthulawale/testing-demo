import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { from, empty } from 'rxjs';
import { throwError } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  // Calling fake service to call server.
  it('should set todos property with items returned from the server', () => {
    const todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return from([ todos ]);
    });

    component.ngOnInit();

    expect(component.todos).toBe(todos);
  });

  // Add method of service.
  it('should call the server to save changes when new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(() => {
      return empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  // Response from server. 
  it('should add the new todo returned from server', () => {
    let todo = { id : 1 };
    spyOn(service, 'add').and.returnValue(from([todo]));
    // let spy= spyOn(service, 'add').and.callFake(() => {
    //   return from([todo]);
    // });

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  //If error occured while adding an todo item.
  it('should set message property if server returns an error when adding a new todo', () => {
    let error = 'error from server';
    spyOn(service, 'add').and.returnValue(throwError(error));

    component.add();

    expect(component.message).toBe(error);
  });

  //Delete method called if user confirms.
  it('should call the server if user confirms delete', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  //Delete method can not be called if user cancels. 
  it('should NOT call the server if user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
})