"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { add } from "@/app/utils/Icons";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs

interface Task {
  id: string; // ID is required
  title: string;
  description?: string;
  date?: string;
  isCompleted: boolean;
  important: boolean;
}

interface CreateContentProps {
  addTask: (task: Task) => void;
}

function CreateContent({ addTask }: CreateContentProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [important, setImportant] = useState<boolean>(false);

  const { theme, closeModal } = useGlobalState();

  const handleChange = (name: string) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    switch (name) {
      case "title":
        setTitle(target.value);
        break;
      case "description":
        setDescription(target.value);
        break;
      case "date":
        setDate(target.value);
        break;
      case "important":
        setImportant((target as HTMLInputElement).checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required.");
      return;
    }

    const newTask: Task = {
      id: uuidv4(), // Generate a unique ID
      title,
      description,
      date,
      isCompleted: false, // Default to false when task is created
      important,
    };

    // Add the task to the parent state (locally)
    addTask(newTask);

    toast.success("Task created successfully.");

    // Reset form fields
    setTitle("");
    setDescription("");
    setDate("");
    setImportant(false);

    // Close the modal after task creation
    closeModal();
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g., Watch a video from Fireship."
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g., Watch a video about Next.js Auth."
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important"> Important</label>
        <input
          checked={important}
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </CreateContentStyled>
  );
}
const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
