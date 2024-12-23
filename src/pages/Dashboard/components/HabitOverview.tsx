// src/pages/Dashboard/components/HabitOverview.tsx

import React from "react";
import { useHabits } from "../../../hooks/useHabits";
import Button from "../../../components/common/Button/Button";
import { Link } from "react-router-dom";
import HabitGraph from "../../../components/habits/HabitGraph/HabitGraph";
import HabitCheckIn from "../../../components/habits/HabitCheckIn/HabitCheckIn";
import { useAuth } from "../../../contexts/AuthContext";

const HabitOverview = () => {
  const { habits, loading, error, refreshHabits } = useHabits();
  const { user } = useAuth();

  if (loading) return <div>Loading habits...</div>;
  if (error)
    return <div className="text-red-600">Error loading habits: {error}</div>;
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {habits && habits.length > 0 ? (
        <div className="space-y-6">
          {habits.map((habit) => (
            <div key={habit.id} className="border-b pb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{habit.name}</h3>
                <div className="text-sm text-gray-500">
                  <span className="mr-4">
                    Current streak: {habit.current_streak} days
                  </span>
                  <span>Best streak: {habit.longest_streak} days</span>
                </div>
              </div>
              <HabitGraph habitId={habit.id} userId={user.id} />
              <HabitCheckIn
                habitId={habit.id}
                userId={user.id}
                onCheckIn={refreshHabits}
              />
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
