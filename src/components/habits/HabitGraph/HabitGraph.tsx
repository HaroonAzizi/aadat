// src/components/habits/HabitGraph/HabitGraph.tsx

import React, { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase/supabaseClient";

interface HabitGraphProps {
  habitId: string;
  userId: string;
}

interface Entry {
  completed_at: string;
  count: number;
}

const HabitGraph: React.FC<HabitGraphProps> = ({ habitId, userId }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 365); // Last 365 days

      const { data, error } = await supabase
        .from("habit_entries")
        .select("completed_at")
        .eq("habit_id", habitId)
        .eq("user_id", userId)
        .gte("completed_at", startDate.toISOString())
        .lte("completed_at", endDate.toISOString());

      if (error) {
        console.error("Error fetching entries:", error);
        return;
      }

      setEntries(data || []);
      setLoading(false);
    };

    fetchEntries();
  }, [habitId, userId]);

  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-green-200";
    if (count === 2) return "bg-green-400";
    return "bg-green-600";
  };

  const getDaysSinceStart = () => {
    const days = [];
    const today = new Date();
    for (let i = 365; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const count = entries.filter((e) => e.completed_at === dateStr).length;
      days.push({ date: dateStr, count });
    }
    return days;
  };

  if (loading) return <div>Loading graph...</div>;

  const days = getDaysSinceStart();

  return (
    <div className="flex flex-wrap gap-1">
      {days.map((day, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-sm ${getIntensityClass(day.count)}`}
          title={`${day.date}: ${day.count} check-ins`}
        />
      ))}
    </div>
  );
};

export default HabitGraph;
