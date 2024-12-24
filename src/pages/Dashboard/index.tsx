// src/pages/Dashboard/index.tsx

import React, { useState } from "react";
import Layout from "../../components/common/Layout/Layout";
import HabitOverview from "./components/HabitOverview";
import TaskOverview from "./components/TaskOverview";
import Button from "../../components/common/Button/Button";
import Footer from "../../components/common/Footer/Footer";

const Dashboard = () => {
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Habits</h2>
            <Button
              className="text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
              onClick={() => setShowHabitForm(true)}
            >
              Add Habit
            </Button>
          </div>
          <HabitOverview
            showForm={showHabitForm}
            setShowForm={setShowHabitForm}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Today's Tasks</h2>
            <Button
              className="text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
              onClick={() => setShowTaskForm(true)}
            >
              Add Task
            </Button>
          </div>
          <TaskOverview showForm={showTaskForm} setShowForm={setShowTaskForm} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Dashboard;
