// src/pages/Dashboard/components/TaskOverview.tsx

import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button/Button";

const TaskOverview = () => {
  // We'll implement this fully in the next step
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-center py-6">
        <p className="text-gray-500 mb-4">No tasks for today</p>
        <Link to="/tasks">
          <Button>Add a Task</Button>
        </Link>
      </div>
    </div>
  );
};

export default TaskOverview;
