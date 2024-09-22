"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";

function Page() { // Renamed to start with uppercase
  const { incompleteTasks } = useGlobalState();
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}

export default Page; // Export the updated component name
