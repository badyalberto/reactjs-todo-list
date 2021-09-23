import { Draggable } from "react-beautiful-dnd";

interface IProps {
  task: any;
  index: number;
  toggleEditTask: any;
  saveEditTask: any;
  onKeyDownEdit: any;
  toggleDoneTask: any;
  removeTask: any;
}

function Task({
  task,
  index,
  toggleEditTask,
  saveEditTask,
  onKeyDownEdit,
  toggleDoneTask,
  removeTask,
}: IProps): JSX.Element {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(draggableProvided) => (
        <li
          key={index}
          className="card card-body mt-2 d-flex flex-row"
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          {...draggableProvided.dragHandleProps}
        >
          <button
            className="btn btn-secondary"
            style={{ backgroundColor: task.done ? 'black' : 'white' }}
            onClick={(e) => toggleDoneTask(e, task.id)}
          />
          <button
            className="w-100 text-left pl-3"
            style={{
              textDecoration: task.done ? 'line-through' : '',
              display: task.isEditing ? 'none' : 'block'
            }}
            onClick={(e) => toggleEditTask(e, task.id)}>
            {task.text}
          </button>
          <input
            className="w-100 text-left pl-3"
            type="text"
            style={{ display: task.isEditing ? 'block' : 'none' }}
            value={task.text}
            onChange={e => saveEditTask(e, task.id)}
            onKeyDown={(e) => onKeyDownEdit(e, task.id)}
            autoFocus
          />
          <button
            className="btn btn-secondary"
            onClick={(e) => removeTask(e, task.id)}
          >
            Delete
          </button>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
