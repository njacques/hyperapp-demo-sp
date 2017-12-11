import { h, app } from 'hyperapp';
import { updateObjectInArray } from './helpers';

const ItemList = ({ items, onUpdateItem }) => {
  const updateProp = (propName, index) => 
    event => 
      onUpdateItem({ index, item: { [propName]: event.target.value }});
  
  return items.map((item, index) => (
    <tr>
      <td></td>
      <td><input value={item.contract} onchange={updateProp('contract', index)} /></td>
      <td><input value={item.description} onchange={updateProp('description', index)} /></td>
      <td><input value={item.quantity} onchange={updateProp('quantity', index)} /></td>
      <td><input value={item.each} onchange={updateProp('each', index)} /></td>
      <td><input value={item.each * item.quantity} /></td>
    </tr>
  ))
};

app({
  state: {
    items: [{
      contract: '',
      description: '',
      quantity: 0,
      each: 0
    }]
  },
  view: state => actions => (
    <main>
      <h1>Hello world!</h1>
      <form>
        <button type='button' onclick={actions.add}>Add</button>
        <button type='button' onclick={actions.remove}>Remove</button>
        
        <fieldset>
          <legend>Items:</legend>
          <table id='dataTable'>
            <thead>
              <tr>
                <th id='lineNum'>Line#</th>
                <th id='contractNum'>Contract#</th>
                <th id='descr'>Description</th>
                <th id='qty'>Qty</th>
                <th id='priceEach'>Each</th>
                <th id='priceTotal'>Line item total</th>
              </tr>
            </thead>
            <tbody>
              <ItemList items={state.items} onUpdateItem={actions.updateItem} />
            </tbody>
            <tfoot>
              <tr>
                <td colspan='5'>Grand Total</td>
                <td>
                  <input value={state.items.reduce((acc, item) => {
                    return acc + (item.each * item.quantity);
                  }, 0)} />
                </td>
              </tr>
            </tfoot>
          </table>
        </fieldset>
      </form>
    </main>
  ),
  actions: {
    add: () => state => ({
      items: state.items.concat({
        contract: '',
        description: '',
        quantity: 0,
        each: 0
      })
    }),
    remove: () => state => ({
      items: (state.items.length > 1) ? state.items.slice(0, -1) : state.items
    }),
    updateItem: payload => state => {
      const items = updateObjectInArray(state.items, payload)
      return { ...state, items };
    }
  }
})