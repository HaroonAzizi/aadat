// src/pages/Dashboard/components/TaskOverview.tsx

import React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../../../hooks/useTasks";
import Button from "../../../components/common/Button/Button";
import TaskList from "../../../components/tasks/TaskList/TaskList";

const TaskOverview = () => {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();

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
