import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';


/**
 * this component is available as <todo-view>
 */
@customElement('todo-view')
export class TodoView extends View {
  render() {
    return html`<div>
      <h2>Todo list 🤗</h2>
    </div>`;
  }
}
