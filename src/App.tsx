import { Component, ReactElement, MouseEvent } from "react";
import { ThemeProvider } from "styled-components";

import { Home } from "pages";

// import { LightTheme, DarkTheme } from "themes";

const themes = require("themes")
const LightTheme = themes.LightTheme;
const DarkTheme = themes.DarkTheme;

import * as api from "./api";

import './App.scss';

const LOCAL_STORAGE_KEY = "reactjs-todo-list";

interface IProps { }

interface IState {
  theme: string;
  status: string;
  tasks: ITasks[];
  filteredTasks: ITasks[];
  isLoading?: boolean;
}

interface ITasks {
  tasks: ITask[];
}

interface IPrevItems {
  tasks: ITasks[];
}

interface ITask {
  id: string;
  text: string;
  done: string;
  isEditing: boolean;
  updatedAt: string;
  createdAt: string;
}

type FormElement = React.FormEvent<HTMLFormElement>;

type KeyboardElement = React.KeyboardEvent<HTMLDivElement>;

interface HTMLInputEvent extends KeyboardElement {
  target: HTMLInputElement & EventTarget;
}

function loadLocalStorageData() {
  const prevItems: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!prevItems) return null;

  try {
    return JSON.parse(prevItems);
  } catch (error) {
    return null;
  }
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      theme: 'light',
      status: 'active',
      tasks: [],
      filteredTasks: [],
    };
  }

  componentDidMount(): void {
    const prevItems: IPrevItems = loadLocalStorageData();

    if (!prevItems) {
      this.setState({
        isLoading: true,
      });

      api.getTasks().then((data) => {
        this.setState({
          status: "all",
          tasks: data,
          filteredTasks: data,
          isLoading: false,
        });
      });

      return;
    }

    const { tasks }: { tasks: ITasks[] } = prevItems;

    this.setState({
      status: "all",
      tasks: tasks,
      filteredTasks: tasks,
    });
  }

  changeTheme = (): void => {
    const { theme }: { theme: string; } = this.state;

    // @joan ==> prevState li he posat IState. S'ha de posar a cada setState?
    if (theme === "light") {
      this.setState((prevState: IState) => ({
        ...prevState,
        theme: 'dark',
      }));
    }
    if (theme === "dark") {
      this.setState((prevState: IState) => ({
        ...prevState,
        theme: 'light',
      }));
    }
  }

  componentDidUpdate = (): void => {
    const { tasks }: { tasks: ITasks[]; } = this.state;

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ tasks })
    )
  }

  // @joan ==> No sé què és el handleSubmit. No em deixa fer FormElement
  onKeyDownSubmit = (e: HTMLInputEvent, handleSubmit: any): void => {
    if (e.key === "Enter") {
      e.preventDefault();

      e.target.blur();

      handleSubmit();
    }
  };

  onKeyDownEdit = (e: HTMLInputEvent, taskId: string): void => {
    if (e.key === "Enter") {
      e.preventDefault();

      this.toggleEditTask(e, taskId);
      this.saveEditTask(e, taskId);
    }
  };

  saveOrderTasks = (tasks: ITasks[]): void => {
    this.setState((prevState: IState) => ({
      ...prevState,
      tasks: tasks,
    }));
  }

  saveNewTask = (newTask: ITasks): void => {
    this.setState((prevState: IState) => ({
      ...prevState,
      tasks: [newTask, ...prevState.tasks],
      filteredTasks: [newTask, ...prevState.filteredTasks],
    }));
  };

  saveEditTask = (e: HTMLInputEvent, taskId: string): void => {
    e.preventDefault();

    const { tasks }: { tasks: ITasks[] } = this.state;

    // @joan ==> No sé què assignar a task
    tasks.map<void>((task: any) => {
      if (task.id === taskId) {
        task.text = e.target.value;
        task.updatedAt = new Date().toISOString();
      }
    });

    this.setState((prevState: IState) => ({
      ...prevState,
      tasks: tasks,
    }));
  };

  toggleDoneTask = (e: MouseEvent, taskId: string): void => {
    e.preventDefault();

    const { tasks }: { tasks: ITasks[] } = this.state;

    tasks.map<void>((task: any) => {
      task.id === taskId ? (task.done = !task.done) : null;
    });

    this.setState((prevState: IState) => ({
      ...prevState,
      tasks: tasks,
    }));
  };

  toggleEditTask = (e: KeyboardElement, taskId: string): void => {
    e.preventDefault();

    const { tasks }: { tasks: ITasks[] } = this.state;

    tasks.map<void>((task: any) => {
      task.id === taskId ? (task.isEditing = !task.isEditing) : null;
    });

    this.setState((prevState: IState) => ({
      ...prevState,
      tasks: tasks,
    }));
  };

  removeTask = (e: MouseEvent, taskId: string): void => {
    e.preventDefault();

    const { tasks }: { tasks: ITasks[] } = this.state;

    const newTasks = tasks.filter((task: any) => task.id !== taskId);

    this.setState((prevState: IState) => ({
      ...prevState,
      tasks: newTasks,
      filteredTasks: newTasks,
    }));
  };

  removeAllCompletedTasks = (e: MouseEvent): void => {
    e.preventDefault();

    const { tasks }: { tasks: ITasks[] } = this.state;

    const newTasks = tasks.filter((task: any) => task.done !== true);

    this.setState((prevState: IState) => ({
      ...prevState,
      tasks: newTasks,
      filteredTasks: newTasks,
    }));
  };

  filterTasks = (status: string): void => {
    const { tasks }: { tasks: ITasks[] } = this.state;

    let filteredTasks: ITasks[];

    status === "all" ? (filteredTasks = tasks) : null;
    status === "active"
      ? (filteredTasks = tasks.filter((task: any) => task.done === false))
      : null;
    status === "complete"
      ? (filteredTasks = tasks.filter((task: any) => task.done === true))
      : null;

    this.setState((prevState: IState) => ({
      ...prevState,
      filteredTasks: filteredTasks,
      status: status,
    }));
  };

  render() {
    const { tasks, filteredTasks, theme } = this.state;

    // console.log(<LightTheme />)

    // const LightTheme = themes.LightTheme;
    // const DarkTheme = themes.LightTheme;

    console.log(theme)

    const selectedTheme: ReactElement = theme === "light" ? <LightTheme /> : <DarkTheme />;

    return (
      <ThemeProvider theme={selectedTheme}>
        <Home
          theme={theme}
          tasks={tasks}
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
      </ThemeProvider>
    );
  }
}

export default App;
