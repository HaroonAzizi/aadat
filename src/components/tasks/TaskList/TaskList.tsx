// src/components/tasks/TaskList/TaskList.tsx

import React, { useState } from "react";
import { Task } from "../../../hooks/useTasks";
import Button from "../../common/Button/Button";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string, completed: boolean) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded-lg shadow ${
            task.completed ? "opacity-75" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <h3
                  className={`text-lg font-medium ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-gray-600 mt-1">{task.description}</p>
                )}
                <div className="flex space-x-4 mt-2 text-sm">
                  {task.due_date && (
                    <span className="text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                  <span className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}{" "}
                    Priority
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => onEditTask(task)}>
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  setDeletingId(task.id);
                  await onDeleteTask(task.id);
                  setDeletingId(null);
                }}
                isLoading={deletingId === task.id}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
