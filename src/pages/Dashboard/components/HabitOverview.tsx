// src/pages/Dashboard/components/HabitOverview.tsx

import React, { useState } from "react";
import { useHabits } from "../../../hooks/useHabits";
import Button from "../../../components/common/Button/Button";
import { supabase } from "../../../services/supabase/supabaseClient";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import HabitGraph from "../../../components/habits/HabitGraph/HabitGraph";
import HabitCheckIn from "../../../components/habits/HabitCheckIn/HabitCheckIn";

interface HabitOverviewProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

const HabitOverview: React.FC<HabitOverviewProps> = ({
  showForm,
  setShowForm,
}) => {
  const [newHabitName, setNewHabitName] = useState("");
  const { habits, loading, error, refreshHabits } = useHabits();
  const { user } = useAuth();

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await supabase
        .from("habits")
        .insert([{ name: newHabitName, user_id: user.id }]);

      refreshHabits();
      setNewHabitName("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  if (loading) return <div>Loading habits...</div>;
  if (error)
    return <div className="text-red-600">Error loading habits: {error}</div>;
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleAddHabit} className="space-y-4">
            <div>
              <label
                htmlFor="habitName"
                className="block text-sm font-medium text-gray-700"
              >
                Habit Name
              </label>
              <input
                type="text"
                id="habitName"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="m-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                className="m-4 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                type="submit"
              >
                Add Habit
              </Button>
            </div>
          </form>
        </div>
      )}
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
