import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "../components/Table";

const ApiEndPoint = "http://localhost:8000/";

const corona = () => {
  const [loading, setLoading] = useState(true);
  const [stateWiseData, setStateWiseData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getStateWiseData() {
      try {
        const { data } = await axios.get(ApiEndPoint + "state");
        stateWiseData = data;
        setStateWiseData(stateWiseData);
      } catch (error) {}
    }

    async function getSummaryData() {
      try {
        const { data } = await axios.get(ApiEndPoint + "country");
        summaryData = data;
        setSummaryData(summaryData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getStateWiseData();
    getSummaryData();
  }, []);

  function Summary() {
    return (
      <div className="flex flex-row flex-wrap gap-3 justify-evenly p-4">
        {summaryData.map((data) => {
          return (
            <>
              <div className="bg-white rounded px-5 py-2">
                <h1 className="text-3xl text-center">{data.status}</h1>
                <h4 className="text-3xl font-bold text-gray-400 text-center">
                  {data.patientInNumber[0]}
                </h4>
              </div>
            </>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <h1 className="flex justify-center items-center">loading....</h1>
      ) : (
        <>
          <Summary />
          <Table data={stateWiseData} />
        </>
      )}
    </>
  );
};

export default corona;
