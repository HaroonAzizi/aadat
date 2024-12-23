// src/pages/Dashboard/components/HabitOverview.tsx

import React from "react";
import { useHabits } from "../../../hooks/useHabits";
import Button from "../../../components/common/Button/Button";
import { Link } from "react-router-dom";

const HabitOverview = () => {
  const { habits, loading, error } = useHabits();

  if (loading) return <div>Loading habits...</div>;
  if (error)
    return <div className="text-red-600">Error loading habits: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {habits && habits.length > 0 ? (
        <div className="space-y-4">
          {habits.map((habit) => (
            <div key={habit.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{habit.name}</h3>
                <span className="text-sm text-gray-500">
                  {habit.current_streak} day streak
                </span>
              </div>
              {/* We'll add the commit graph here in the next step */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4">No habits tracked yet</p>
          <Link to="/habits">
            <Button>Start Tracking a Habit</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HabitOverview;
