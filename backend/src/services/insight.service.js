import { getMetricStatus } from "./metricsStatus.service.js";

export const generateInsights = (metrics) => {
  const insights = [];
  const suggestions = [];

  const statusMap = {};

  metrics.forEach((m) => {
    statusMap[m.id] = {
      status: getMetricStatus(m),
      value: m.value,
    };
  });

  if (statusMap["lead-time"]?.status === "red") {
    insights.push(
      "Lead time is significantly high, indicating delays in code review or deployment.",
    );
    suggestions.push(
      "Break PRs into smaller chunks and improve review turnaround time.",
    );
  }

  if (statusMap["bug-rate"]?.status === "red") {
    insights.push("High bug rate suggests quality issues in released code.");
    suggestions.push("Add stricter testing and validation before deployment.");
  }

  if (statusMap["pr-throughput"]?.status === "red") {
    insights.push("Low PR throughput indicates reduced development output.");
    suggestions.push("Increase focus on completing and merging smaller PRs.");
  }

  if (statusMap["deploy-freq"]?.status === "red") {
    insights.push(
      "Low deployment frequency suggests bottlenecks in release process.",
    );
    suggestions.push(
      "Automate deployment pipelines and release more frequently.",
    );
  }

  const allGreen = Object.values(statusMap).every((m) => m.status === "green");

  if (allGreen) {
    insights.push(
      "All metrics are within healthy range. Development flow is efficient.",
    );
    suggestions.push("Maintain current practices and monitor for consistency.");
  }

  return { insights, suggestions };
};
