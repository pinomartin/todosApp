const btnDelete = document.createElement('button');
const btnUpdate = document.createElement('button');

btnDelete.setAttribute('id', 'btn-delete');
btnDelete.setAttribute('type', 'button');
btnDelete.textContent="OK!";
btnDelete.classList.add('btn','btn-sm','btn-success');

btnUpdate.setAttribute('id', 'btn-update');
btnUpdate.setAttribute('type', 'button');
btnUpdate.textContent="Editar";
btnUpdate.classList.add('btn','btn-sm','btn-warning');

export const btnDeleteTodo = btnDelete;
export const btnUpdateTodo = btnUpdate;


{/* <button id="btn-delete" type="button" class="btn btn-sm btn-success">OK !</button>
 */}