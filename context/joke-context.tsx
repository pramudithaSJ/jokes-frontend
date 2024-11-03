"use client";
import { useState, ReactNode, createContext } from "react";
import axios from "axios";

const BaseUrl = process.env.BASE_URL;
const BASE_URL_MODERATOR = process.env.BASE_URL_MODERATOR;

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
  selectedJoke: string | null;
  selectedJokeId: string | null;
  selectedJokeType: string | null;
  setSelectedJoke: (joke: string) => void;
  setSelectedJokeId: (id: string) => void;
  setSelectedJokeType: (type: string) => void;
  getJokeById: (id: string) => Promise<void>;
  deleteJoke: (id: string) => Promise<void>;
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
  const [selectedJoke, setSelectedJoke] = useState<string | null>(null);
  const [selectedJokeId, setSelectedJokeId] = useState<string | null>(null);
  const [selectedJokeType, setSelectedJokeType] = useState<string | null>(null);

  const getGeneratedJoke = async (type: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/open-api/${type}`);
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
      setLoading(true);
      console.log(localStorage.getItem("token"));
      const response = await axios.get(`${BASE_URL_MODERATOR}/jokes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data) {
        setJokeList(response.data);
      }
      setLoading(false);
      if (response.status === 401) {
        alert("Unauthorised");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Unauthorised");
      }
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

  const getJokeById = async (id: string) => {
    try {
      const result = jokeList.find((joke) => joke._id === id);
      if (result) {
        setSelectedJoke(result.text);
        setSelectedJokeId(result._id);
        setSelectedJokeType(result.type);
      }
    } catch (error) {
      console.error;
    }
  };

  async function deleteJoke(id: string | null) {
    try {
      await axios
        .delete(`${BASE_URL_MODERATOR}/jokes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Joke Deleted");
            setSelectedJoke(null);
            setSelectedJokeId(null);
            setSelectedJokeType(null);
            getJokeList();
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

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
        selectedJoke,
        selectedJokeId,
        selectedJokeType,
        setSelectedJoke,
        setSelectedJokeId,
        setSelectedJokeType,
        getJokeById,
        deleteJoke,
      }}
    >
      {children}
    </JokeContext.Provider>
  );
};
