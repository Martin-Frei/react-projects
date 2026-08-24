import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, setCountry, setSearch } from "../features/newsSlice";
import defineConfig from "./../../vite.config";

function Home() {
  const dispatch = useDispatch();
  const { articles, headlines, search, country, loading } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [country]);

  return (
    <div className="bg-white min-h-screen ">
      <h1 className="bg-amber-300 text-center">Home</h1>

      {/* header */}
      <div className="bg-with border-b-1 border-gray-400 text-3xl font-bold text-center py-4 ">
        BBC News
      </div>

      {/* categories Navbar  */}
      <div className="border-b-1 border-gray-400 text-lg space-x-3 font-medium text-center py-4">
        <span>Home</span>
        <span>World</span>
        <span>Business</span>
        <span>Science</span>
        <span>Technolgy</span>
        <span>Health</span>
      </div>

      {/* search section */}

      <div className="flex gap-3 py-3 border-b-gray-400 px-6">
        <input
          type="text"
          placeholder="Search News..."
          className="border border-gray-400 px-3 py-2 w-full rounded"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        {/* country select */}
        <select
          className="border-1 border-gray-400 px-3 py-2 rounded"
          value={search}
          onChange={(e) => dispatch(setCountry(e.target.value))}
        >
          <option value="us">USA</option>
          <option value="ge">Germany</option>
          <option value="pk">Pakistan</option>
          <option value="in">India</option>
          <option value="cnd">Canada</option>
        </select>
        <button
          className="bg-red-700
          text-white px-4 py-3 rounded"
          onClick={() => dispatch(fetchNews())}
        >
          Search
        </button>
      </div>

      {/* Featured article */}
      <div className="grid grid-col-2 gap-5">
        <div>
          {articles[0] &&
          (<div>
            <img src={articles[0].image} alt="" />
          </div>)
          }
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
