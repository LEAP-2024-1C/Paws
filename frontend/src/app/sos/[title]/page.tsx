"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/app/styles/SOSpage.module.css";
interface SOSInfo {
  title: string;
  description: string;
  steps: string[];
}

export default function SOSPage() {
  const { title } = useParams();
  const [sosInfo, setSOSInfo] = useState<SOSInfo | null>(null);

  useEffect(() => {
    // Fetch SOS information based on the title
    // This is a placeholder, replace with actual API call
    const fetchSOSInfo = async () => {
      // Simulating API call
      const mockData: SOSInfo = {
        title: title as string,
        description: "This is a description of the SOS situation.",
        steps: [
          "Stay calm",
          "Assess the situation",
          "Call for help",
          "Follow emergency procedures",
        ],
      };
      setSOSInfo(mockData);
    };

    fetchSOSInfo();
  }, [title]);

  if (!sosInfo) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{sosInfo.title}</h1>
      <p className={styles.description}>{sosInfo.description}</p>
      <h2 className={styles.stepsTitle}>Emergency Steps:</h2>
      <ol className={styles.stepsList}>
        {sosInfo.steps.map((step, index) => (
          <li key={index} className={styles.step}>
            {step}
          </li>
        ))}
      </ol>
      <button className={styles.emergencyButton}>
        Call Emergency Services
      </button>
    </div>
  );
}
