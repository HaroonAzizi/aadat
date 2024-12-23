// src/pages/Dashboard/index.tsx

import React from "react";
import Layout from "../../components/common/Layout/Layout";
import HabitOverview from "./components/HabitOverview";
import TaskOverview from "./components/TaskOverview";

const Dashboard = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Habits</h2>
          <HabitOverview />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Today's Tasks
          </h2>
          <TaskOverview />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
