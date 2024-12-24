// src/pages/Tasks/index.tsx

import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskList from "../../components/tasks/TaskList/TaskList";
import TaskForm from "../../components/tasks/TaskForm/TaskForm";
import Button from "../../components/common/Button/Button";
import Layout from "../../components/common/Layout/Layout";
import Footer from "../../components/common/Footer/Footer";

const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();

  if (loading) return <div>Loading tasks...</div>;
  if (error)
    return <div className="text-red-600">Error loading tasks: {error}</div>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button
            className="mt-2 text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
            onClick={() => setShowForm(true)}
          >
            Add New Task
          </Button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <TaskForm
              onSubmit={async (task) => {
                await addTask({ ...task, completed: false });
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <TaskList
          tasks={tasks}
          onToggleComplete={(taskId, completed) =>
            updateTask(taskId, { completed })
          }
          onDeleteTask={deleteTask}
          onEditTask={() => {}} // We'll implement edit functionality later
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default TasksPage;
