import { HomeTemplate } from "components/templates";

function AllPage({
  tasks,
  theme,
  filteredTasks,
  changeTheme,
  saveNewTask,
  saveOrderTasks,
  onKeyDownSubmit,
  toggleEditTask,
  saveEditTask,
  onKeyDownEdit,
  toggleDoneTask,
  removeTask,
  filterTasks,
  removeAllCompletedTasks,
}) {
  return (
    <HomeTemplate
      tasks={tasks}
      theme={theme}
      filteredTasks={filteredTasks}
      changeTheme={changeTheme}
      saveNewTask={saveNewTask}
      saveOrderTasks={saveOrderTasks}
      onKeyDownSubmit={onKeyDownSubmit}
      toggleEditTask={toggleEditTask}
      saveEditTask={saveEditTask}
      onKeyDownEdit={onKeyDownEdit}
      toggleDoneTask={toggleDoneTask}
      removeTask={removeTask}
      filterTasks={filterTasks}
      removeAllCompletedTasks={removeAllCompletedTasks}
    />
  );
}

export default AllPage;