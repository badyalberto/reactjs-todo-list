import { Component } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { themes } from "./themes";
import * as api from "./api";

import { AllPage, ActivePage, CompletePage } from "./components/pages";

import "./App.scss";

const LOCAL_STORAGE_KEY = "reactjs-todo-list";

function loadLocalStorageData() {
  const prevItems = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!prevItems) return null;

  try {
    return JSON.parse(prevItems);
  } catch (error) {
    return null;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      status: "active",
      tasks: [],
      filteredTasks: [],
    };
  }

  componentDidMount() {
    const prevItems = loadLocalStorageData();

    if (!prevItems) {
      this.setState({
        isLoading: true,
      });

      api.getTasks().then((data) => {
        console.log(data);
        this.setState({
          status: "all",
          tasks: data,
          filteredTasks: data,
          isLoading: false,
        });
      });

      return;
    }

    this.setState({
      status: "all",
      tasks: prevItems.tasks,
      filteredTasks: prevItems.tasks,
    });
  }

  changeTheme = () => {
    const { theme } = this.state;

    if (theme === "light") {
      this.setState((prevState) => ({
        ...prevState,
        theme: "dark",
      }));
    }
    if (theme === "dark") {
      this.setState((prevState) => ({
        ...prevState,
        theme: "light",
      }));
    }
  };

  componentDidUpdate = () => {
    const { tasks } = this.state;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ tasks }));
  };

  onKeyDownSubmit = (e, handleSubmit) => {
    if (e.key === "Enter") {
      e.preventDefault();

      e.target.blur();

      handleSubmit();
    }
  };

  onKeyDownEdit = (e, taskId) => {
    if (e.key === "Enter") {
      e.preventDefault();

      this.toggleEditTask(e, taskId);
      this.saveEditTask(e, taskId);
    }
  };

  saveOrderTasks = (tasks) => {
    this.setState((prevState) => ({
      ...prevState,
      tasks: tasks,
    }));
  };

  saveNewTask = (newTask) => {
    this.setState((prevState) => ({
      ...prevState,
      tasks: [newTask, ...prevState.tasks],
      filteredTasks: [newTask, ...prevState.filteredTasks],
    }));
  };

  saveEditTask = (e, taskId) => {
    e.preventDefault();

    const { tasks } = this.state;

    tasks.map((task) => {
      if (task.id === taskId) {
        task.text = e.target.value;
        task.updatedAt = new Date().toISOString();
      }
    });

    this.setState((prevState) => ({
      ...prevState,
      tasks: tasks,
    }));
  };

  toggleDoneTask = (e, taskId) => {
    e.preventDefault();

    const { tasks } = this.state;
    let result = false;
    tasks.map((task) => {
      if (task.id === taskId) {
        task.done = !task.done;
        result = task.done;
      }
    });


    this.setState((prevState) => ({
      ...prevState,
      tasks: tasks,
    }));
  };

  toggleEditTask = (e, taskId) => {
    e.preventDefault();

    const { tasks } = this.state;

    tasks.map((task) => {
      task.id === taskId ? (task.isEditing = !task.isEditing) : null;
    });

    this.setState((prevState) => ({
      ...prevState,
      tasks: tasks,
    }));
  };

  removeTask = (e, taskId) => {
    e.preventDefault();

    const { tasks } = this.state;

    const newTasks = tasks.filter((task) => task.id !== taskId);
    this.setState((prevState) => ({
      ...prevState,
      tasks: newTasks,
      filteredTasks: newTasks,
    }));
  };

  removeAllCompletedTasks = (e) => {
    e.preventDefault();

    const { tasks } = this.state;

    const newTasks = tasks.filter((task) => task.done !== true);

    this.setState((prevState) => ({
      ...prevState,
      tasks: newTasks,
      filteredTasks: newTasks,
    }));
  };

  filterTasks = (status) => {
    const { tasks } = this.state;

    let filteredTasks;

    status === "all" ? (filteredTasks = tasks) : null;
    status === "active"
      ? (filteredTasks = tasks.filter((task) => task.done === false))
      : null;
    status === "complete"
      ? (filteredTasks = tasks.filter((task) => task.done === true))
      : null;

    this.setState((prevState) => ({
      ...prevState,
      filteredTasks: filteredTasks,
      status: status,
    }));
  };

  render() {
    const { tasks, filteredTasks, theme } = this.state;

    return (
      <ThemeProvider theme={themes[theme]}>
        <Router>
          <Route
            path="/"
            exact
            render={() => (
              <AllPage
                tasks={tasks}
                theme={theme}
                filteredTasks={filteredTasks}
                changeTheme={this.changeTheme}
                saveNewTask={this.saveNewTask}
                saveOrderTasks={this.saveOrderTasks}
                onKeyDownSubmit={this.onKeyDownSubmit}
                toggleEditTask={this.toggleEditTask}
                saveEditTask={this.saveEditTask}
                onKeyDownEdit={this.onKeyDownEdit}
                toggleDoneTask={this.toggleDoneTask}
                removeTask={this.removeTask}
                filterTasks={this.filterTasks}
                removeAllCompletedTasks={this.removeAllCompletedTasks}
              />
            )}
          />
          <Route
            path="/active"
            exact
            render={() => (
              <ActivePage
                tasks={tasks}
                theme={theme}
                filteredTasks={filteredTasks}
                changeTheme={this.changeTheme}
                saveNewTask={this.saveNewTask}
                saveOrderTasks={this.saveOrderTasks}
                onKeyDownSubmit={this.onKeyDownSubmit}
                toggleEditTask={this.toggleEditTask}
                saveEditTask={this.saveEditTask}
                onKeyDownEdit={this.onKeyDownEdit}
                toggleDoneTask={this.toggleDoneTask}
                removeTask={this.removeTask}
                filterTasks={this.filterTasks}
                removeAllCompletedTasks={this.removeAllCompletedTasks}
              />
            )}
          />
          <Route
            path="/complete"
            exact
            render={() => (
              <CompletePage
                tasks={tasks}
                theme={theme}
                filteredTasks={filteredTasks}
                changeTheme={this.changeTheme}
                saveNewTask={this.saveNewTask}
                saveOrderTasks={this.saveOrderTasks}
                onKeyDownSubmit={this.onKeyDownSubmit}
                toggleEditTask={this.toggleEditTask}
                saveEditTask={this.saveEditTask}
                onKeyDownEdit={this.onKeyDownEdit}
                toggleDoneTask={this.toggleDoneTask}
                removeTask={this.removeTask}
                filterTasks={this.filterTasks}
                removeAllCompletedTasks={this.removeAllCompletedTasks}
              />
            )}
          />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
