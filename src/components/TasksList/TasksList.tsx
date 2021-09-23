import { Droppable } from "react-beautiful-dnd";

import { Task } from "components";

interface IProps {
  filteredTasks: any;
  toggleEditTask: any;
  saveEditTask: any;
  onKeyDownEdit: any;
  toggleDoneTask: any;
  removeTask: any;
}

interface ITask {
  id: string;
  text: string;
  done: string;
  isEditing: boolean;
  updatedAt: string;
  createdAt: string;
}

function TasksList({
  filteredTasks,
  toggleEditTask,
  saveEditTask,
  onKeyDownEdit,
  toggleDoneTask,
  removeTask,
}: IProps): JSX.Element {
  return (
    <Droppable droppableId="tasks">
      {(droppableProvided) => (
        <ul {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
          {filteredTasks &&
            filteredTasks.map((task: ITask, index: number) => (
              <Task
                task={task}
                index={index}
                key={index}
                toggleEditTask={toggleEditTask}
                saveEditTask={saveEditTask}
                onKeyDownEdit={onKeyDownEdit}
                toggleDoneTask={toggleDoneTask}
                removeTask={removeTask}
              />
            ))}
          {droppableProvided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default TasksList;
