// src/components/habits/HabitCheckIn/HabitCheckIn.tsx

import React, { useState } from "react";
import { supabase } from "../../../services/supabase/supabaseClient";
import Button from "../../common/Button/Button";

interface HabitCheckInProps {
  habitId: string;
  userId: string;
  onCheckIn: () => void;
}

const HabitCheckIn: React.FC<HabitCheckInProps> = ({
  habitId,
  userId,
  onCheckIn,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];

      // Check if entry already exists
      const { data: existingEntry } = await supabase
        .from("habit_entries")
        .select("id")
        .eq("habit_id", habitId)
        .eq("completed_at", today)
        .single();

      if (!existingEntry) {
        // Create new entry
        const { error } = await supabase.from("habit_entries").insert([
          {
            habit_id: habitId,
            user_id: userId,
            completed_at: today,
          },
        ]);

        if (error) throw error;

        // Update streak
        await updateStreak(habitId);
      }

      onCheckIn();
    } catch (error) {
      console.error("Error checking in:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStreak = async (habitId: string) => {
    try {
      const { data: entries, error } = await supabase
        .from("habit_entries")
        .select("completed_at")
        .eq("habit_id", habitId)
        .order("completed_at", { ascending: false });

      if (error) throw error;

      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < entries.length; i++) {
        const entryDate = new Date(entries[i].completed_at);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);

        if (entryDate.getTime() === expectedDate.getTime()) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Update habit streak
      const { error: updateError } = await supabase
        .from("habits")
        .update({
          current_streak: currentStreak,
          longest_streak: supabase.raw("GREATEST(longest_streak, ?)", [
            currentStreak,
          ]),
        })
        .eq("id", habitId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  return (
    <Button
      onClick={handleCheckIn}
      isLoading={loading}
      variant="primary"
      className="mt-2"
    >
      Check In Today
    </Button>
  );
};

export default HabitCheckIn;
