import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
    <div className="flex flex-col gap-8 my-10">
      <span className="mx-auto px-4 py-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 text-[#74aada] font-medium shadow-md transform hover:scale-105 transition-transform duration-300">
        Sync Quest
      </span>
      <h1 className="text-5xl font-bold text-gray-800 drop-shadow-lg">
        Connect, Apply & <br />
        Embark on Your{" "}
        <span style={{ color: 'rgb(116, 170, 218)' }}>Dream Career Journey!</span>
      </h1>
      <div className="flex w-[80%] sm:w-[40%] shadow-xl border border-gray-200 rounded-full items-center gap-4 mx-auto p-2 bg-white transform hover:scale-105 transition-transform duration-300">
        <input
          type="text"
          placeholder="What career are you looking for?"
          className="outline-none border-none w-full bg-transparent px-3 py-2 rounded-full placeholder-gray-400 transition duration-200 focus:ring focus:ring-[#74aada] focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={searchJobHandler} className="rounded-full bg-[#74aada] hover:bg-[#6b9cd2] transition duration-200">
          <Search className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  </div>
  
  );
};
export default HeroSection;
