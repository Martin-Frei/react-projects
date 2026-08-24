import React, { useState, useEffect } from "react";

function JobSearch() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
  const APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;

  useEffect(() => {
    fetchJobs("developer", "");
  }, []);

  const fetchJobs = async (searchKeyword, searchLocation) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${searchKeyword}&where=${searchLocation}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setError("No jobs found. Try a different search.");
        setJobs([]);
      } else {
        setJobs(data.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch jobs. Please try again later.");
      setJobs([]);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!keyword.trim()) {
      setError("Please enter a job title.");
      return;
    }
    fetchJobs(keyword, location);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="bg-linear-to-r from-sky-500 to-indigo-500 py-14 text-center text-white">
        <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
        <p className="text-lg mt-2 opacity-90">
          Search real jobs worldwide powered by Adzuna
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
        <div className="flex gap-4 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Job title (e.g. React Developer)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Location (e.g. London)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer whitespace-nowrap"
          >
            Search Jobs
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto my-8 px-4">
        {loading && (
          <div className="text-center text-xl font-semibold text-gray-600 py-10">
            Loading jobs...
          </div>
        )}

        {error && !loading && (
          <div className="text-center text-lg text-red-500 py-10">{error}</div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 shadow rounded-xl hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {job.company?.display_name || "Company not specified"}
                </p>
                <p className="text-gray-400 text-sm">
                  {job.location?.display_name || "Location not specified"}
                </p>
                <p className="text-green-600 font-semibold text-sm mt-2">
                  {job.salary_min && job.salary_max
                    ? `£${Math.round(
                        job.salary_min
                      ).toLocaleString()} – £${Math.round(
                        job.salary_max
                      ).toLocaleString()}`
                    : "Salary not specified"}
                </p>
              </div>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-blue-600 text-white block rounded-lg text-center hover:bg-blue-700 transition py-3"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default JobSearch;
