import { ReactElement } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";

import taskSchema from "./task-schema";

interface ITask {
  id: string;
  text: string;
  done: boolean;
  isEditing: boolean;
  updatedAt: string;
  createdAt: string;
}

interface IProps {
  saveNewTask: any;
  onKeyDownSubmit: any;
}

interface MinTask {
  text: string;
  done: boolean;
}

// @joan ==> No sé què assignar a task
function addTaskDetails(task: MinTask): ITask {
  return {
    id: uuid(),
    text: task.text,
    done: task.done,
    isEditing: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function NewTaskForm({
  saveNewTask,
  onKeyDownSubmit
}: IProps): ReactElement {
  return (
    <div className="card">
      <div className="card-body">
        <Formik
          initialValues={{
            text: '',
            done: false
          }}
          validationSchema={taskSchema}
          onSubmit={(values: MinTask, { resetForm }) => {
            const newTask = addTaskDetails(values);
            saveNewTask(newTask);
            resetForm({});
          }}
        >
          {({
            handleSubmit,
            errors,
            values,
            touched,
            isValidating,
            isValid,
          }) => (
            <Form onKeyDown={(e) => onKeyDownSubmit(e, handleSubmit)}>
              <Field
                type="text"
                className="form-control"
                placeholder="New task"
                id="text"
                value={values.text}
              />
              <ErrorMessage className="invalid-feedback" name="text" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default NewTaskForm;