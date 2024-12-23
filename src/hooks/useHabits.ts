// src/hooks/useHabits.ts

import { useState, useEffect } from "react";
import { supabase } from "../services/supabase/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export interface Habit {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
}

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        if (!user) return;

        const { data, error: supabaseError } = await supabase
          .from("habits")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;

        setHabits(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [user]);

  return { habits, loading, error };
};
