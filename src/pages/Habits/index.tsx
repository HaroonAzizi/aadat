// src/pages/Habits/index.tsx

import React, { useState } from "react";
import { useHabits } from "../../hooks/useHabits";
import Button from "../../components/common/Button/Button";
import { supabase } from "../../services/supabase/supabaseClient";
import { useAuth } from "../../contexts/AuthContext";
import type TasksPage from "../Tasks";
import Layout from "../../components/common/Layout/Layout";

const HabitsPage = () => {
  const [showForm, setShowForm] = useState(false);
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Habits</h1>
          <Button
            className="mt-2 text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
            onClick={() => setShowForm(true)}
          >
            Track New Habit
          </Button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Habit</Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">{habit.name}</h3>
              <div className="text-sm text-gray-500">
                <span className="mr-4">
                  Current streak: {habit.current_streak} days
                </span>
                <span>Best streak: {habit.longest_streak} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HabitsPage;
