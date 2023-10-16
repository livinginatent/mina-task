import { RootState } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnalysisModalProps } from "./interface";
import {
  StyledAnalysisContainer,
  StyledAnalysisContent,
  Title,
} from "./styles";
import { Bar, Pie } from "react-chartjs-2";
import {  ArcElement, Tooltip, Legend } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Button } from "@/components/Button";



const AnalysisModal = ({ analysis, isOpen,onClose }: AnalysisModalProps) => {
  const xlsxData = useSelector((state: RootState) => state.data.xlsxData);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const status0Data = xlsxData.filter((item) => item[3] === 0);
  const status1Data = xlsxData.filter((item) => item[3] === 1);
  const status2Data = xlsxData.filter((item) => item[3] === 2);

  const totalDataLength = xlsxData.length;

  const status1Percentage = (status0Data.length / totalDataLength) * 100;
  const status2Percentage = (status1Data.length / totalDataLength) * 100;
  const status3Percentage = (status2Data.length / totalDataLength) * 100;
  const totalLenStatus0 = status0Data.reduce(
    (total, item) => total + item[1],
    0
  );
  const totalLenStatus1 = status0Data.reduce(
    (total, item) => total + item[1],
    0
  );
  const totalLenStatus2 = status1Data.reduce(
    (total, item) => total + item[1],
    0
  );

  const barChartData = {
    labels: ["Status 0", "Status 1", "Status 2"],
    datasets: [
      {
        label: "Total Length",
        data: [totalLenStatus0, totalLenStatus1, totalLenStatus2],
        backgroundColor: ["#FBECB2", "#F8BDEB", "#5272F2"],
      },
    ],
  };

  const optionsBar = {};

  const pieChartData = {
    labels: [
      `Status 1 (${status1Percentage.toFixed(2)}%)`,
      `Status 2 (${status2Percentage.toFixed(2)}%)`,
      `Status 3 (${status3Percentage.toFixed(2)}%)`,
    ],
    datasets: [
      {
        data: [status0Data.length, status1Data.length, status2Data.length],
        backgroundColor: ["#FBECB2", "#F8BDEB", "#5272F2"],
      },
    ],
  };

  const options = {};

  useEffect(() => {
    if (isOpen && analysis === "analysis 1") {
    }
  }, [isOpen, analysis]);

  return (
    <>
      {xlsxData && (
        <StyledAnalysisContainer>
          {isOpen && analysis === "analysis 1" && (
            <StyledAnalysisContent>
              <Pie options={options} data={pieChartData} />
              <Button
                onClick={onClose}
                className="standard"
                text="Cancel"
                style={{ width: "70px" }}
              />
            </StyledAnalysisContent>
          )}
          {isOpen && analysis === "analysis 2" && (
            <>
              <StyledAnalysisContent>
                <Bar options={optionsBar} data={barChartData} />
                <Button
                
                  onClick={onClose}
                  className="standard"
                  text="Cancel"
                  style={{ width: "70px" }}
                />
              </StyledAnalysisContent>
            </>
          )}
        </StyledAnalysisContainer>
      )}
    </>
  );
};

export default AnalysisModal;
