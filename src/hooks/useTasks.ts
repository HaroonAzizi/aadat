// src/hooks/useTasks.ts

import { useState, useEffect } from "react";
import { supabase } from "../services/supabase/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  completed: boolean;
  priority: "low" | "medium" | "high";
  created_at: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      if (!user) return;

      const { data, error: supabaseError } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("due_date", { ascending: true })
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      setTasks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (task: Omit<Task, "id" | "created_at" | "user_id">) => {
    try {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("tasks")
        .insert([{ ...task, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setTasks((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
};
