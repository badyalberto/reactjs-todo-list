import { ReactElement, MouseEvent } from 'react';

interface IProps {
  filteredTasks: any;
  filterTasks: any;
  removeAllCompletedTasks: any;
}

type EventTarget = MouseEvent<HTMLButtonElement> & { target: HTMLInputElement }

function Footer({
  filteredTasks,
  filterTasks,
  removeAllCompletedTasks
}: IProps): ReactElement {
  return (
    <footer>
      <div className="d-flex justify-content-between pt-3">
        <p>
          {filteredTasks.length} items
        </p>
        <div>
          <button
            className="btn btn-secondary"
            name="all"
            onClick={(e: EventTarget): void => filterTasks(e.target.name)}
          >
            All
          </button>
          <button
            className="btn btn-secondary"
            name="active"
            onClick={(e: EventTarget): void => filterTasks(e.target.name)}
          >
            Active
          </button>
          <button
            className="btn btn-secondary"
            name="complete"
            onClick={(e: EventTarget): void => filterTasks(e.target.name)}
          >
            Complete
          </button>
        </div>
        <button
          className="btn btn-secondary"
          name="clear"
          onClick={(e: EventTarget): void => removeAllCompletedTasks(e)}
        >
          Clear completed
        </button>
      </div>
      <p className="text-center mt-4">Drag and drop to reorder list</p>
    </footer>
  );
}

export default Footer;