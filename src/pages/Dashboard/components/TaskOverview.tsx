// src/pages/Dashboard/components/TaskOverview.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../../../hooks/useTasks";
import Button from "../../../components/common/Button/Button";
import TaskList from "../../../components/tasks/TaskList/TaskList";
import TaskForm from "../../../components/tasks/TaskForm/TaskForm";

interface TaskOverviewProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({
  showForm,
  setShowForm,
}) => {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();

  if (loading) return <div>Loading tasks...</div>;
  if (error)
    return <div className="text-red-600">Error loading tasks: {error}</div>;

  const todaysTasks = tasks.filter((task) => {
    if (!task.due_date) return false;
    const today = new Date().toISOString().split("T")[0];
    return task.due_date === today;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <TaskForm
            onSubmit={async (task) => {
              await addTask({ ...task, completed: false });
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      {todaysTasks.length > 0 ? (
        <TaskList
          tasks={todaysTasks}
          onToggleComplete={(taskId, completed) =>
            updateTask(taskId, { completed })
          }
          onDeleteTask={deleteTask}
          onEditTask={() => {}} // We'll implement this in the full tasks page
        />
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4">No tasks due today</p>
          <Link to="/tasks">
            <Button>Add a Task</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskOverview;
