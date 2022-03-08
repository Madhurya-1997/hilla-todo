import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';
import Todo from 'Frontend/generated/com/example/application/entity/Todo';
import { state } from 'lit/decorators.js';
import { Binder } from '@hilla/form';
import TodoModel from 'Frontend/generated/com/example/application/entity/TodoModel'
import { field } from '@hilla/form';
import { TodoEndpoint } from 'Frontend/generated/endpoints';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/checkbox'
/**
 * this component is available as <todo-view>
 */
@customElement('todo-view')
export class TodoView extends View {

  @state()
  private todos: Todo[] = [];
  private binder = new Binder(this, TodoModel)
  //   <vaadin-text-field
  //   label="New Task"
  //   ${field(this.binder.model.task)}
  //   >
  // </vaadin-text-field>
  render() {
    return html`
      <div class='form'>
        <vaadin-text-field
          label="New Task"
          ${field(this.binder.model.task)}'>
        </vaadin-text-field>
        <vaadin-button
          theme='primary'
          @click=${this.createTodo}
          ?disabled=${this.binder.invalid}
          >Add
        </vaadin-button>
      </div>
      
      <div class='todos'>
        ${this.todos.map(todo => html`
          <div class='todo'>
            <vaadin-checkbox
              ?checked=${todo.isCompleted}
              @checked-changed=${(e: CustomEvent) => this.updateTodoState(todo, e.detail.value)}
            >
              
            </vaadin-checkbox>
            <span>${todo.task}</span>
            
          </div>
        `)}
      </div>

      `;
  }



  async connectedCallback() {
    super.connectedCallback();
    this.todos = await TodoEndpoint.findAll();
  }

  async createTodo() {
    const newTodo = await this.binder.submitTo(TodoEndpoint.save);
    if (newTodo) {
      this.todos = [...this.todos, newTodo];
      this.binder.clear();
    }
  }

  async updateTodoState(todo: Todo, isCompleted: boolean) {
    const updatedTodo = { ...todo, isCompleted };
    this.todos = this.todos.map(t => t.id === todo.id ? updatedTodo : t)
    await TodoEndpoint.save(updatedTodo);
  }

  // async deleteTodo(todo: Todo) {
  //   await TodoEndpoint.delete(todo);

  //   this.todos = this.todos.filter(t => {
  //     t.id !== todo.id
  //   })
  // }

}
