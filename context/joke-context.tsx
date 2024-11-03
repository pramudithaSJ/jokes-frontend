"use client";
import { useState, ReactNode, createContext } from "react";
import axios from "axios";

const BaseUrl = process.env.BASE_URL;

export interface Joke {
  _id: string;
  type: string;
  text: string;
  date: Date;
}

interface JokeContextType {
  joke: string;
  jokeList: Joke[];
  getGeneratedJoke: (type: string) => Promise<void>;
  getJokeList: () => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  type: string;
  setType: (type: string) => void;
  saveJoke: (joke: Joke) => Promise<void>;
  isSavingLoading: boolean;
  setIsSavingLoading: (loading: boolean) => void;
  isToastOpen: boolean;
  setIsToastOpen: (open: boolean) => void;
  handleToatsClose: () => void;
}

export const JokeContext = createContext<JokeContextType>(
  {} as JokeContextType
);

export const JokeProvider = ({ children }: { children: ReactNode }) => {
  const [joke, setJoke] = useState("");
  const [jokeList, setJokeList] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [isSavingLoading, setIsSavingLoading] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const getGeneratedJoke = async (type: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/jokes/${type}`);
      if (response.data) {
        setJoke(response.data.joke);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getJokeList = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/jokes`);
      setJokeList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveJoke = async (joke: Joke) => {
    try {
      setIsSavingLoading(true);
      await axios.post(`${BaseUrl}/jokes`, joke).then((response) => {
        if (response.data) {
          console.log(response.data);
          setIsSavingLoading(false);
          setType("");
          setJoke("");
          setIsToastOpen(true);
        } else {
          console.log("error");
          setIsSavingLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
      setIsSavingLoading(false);
    }
  };

  const handleToatsClose = () => {
    setIsToastOpen(false);
  };

  return (
    <JokeContext.Provider
      value={{
        joke,
        jokeList,
        getGeneratedJoke,
        getJokeList,
        loading,
        setLoading,
        type,
        setType,
        saveJoke,
        isSavingLoading,
        setIsSavingLoading,
        isToastOpen,
        setIsToastOpen,
        handleToatsClose,
      }}
    >
      {children}
    </JokeContext.Provider>
  );
};
