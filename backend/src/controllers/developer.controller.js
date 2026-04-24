import { developers, getMetrics } from "../../../data/mockData.js";
import { generateInsights } from "../services/insight.service.js";

export const getDevelopers = async (req, res) => {
  return res.json(developers);
};

export const getDeveloperMetrics = async (req, res) => {
  const { dev_id } = req.params;

  const developer = developers.find(d => d.id === dev_id);

  if (!developer) {
    return res.status(404).json({ message: "Developer not found" });
  }

  const metrics = getMetrics(dev_id);

  const { insights, suggestions } = generateInsights(metrics);

  return res.json({
    developer,
    metrics,
    insights,
    suggestions
  });
};