/**
 * @file This file defins the XML sitemap.
 * @description This file contains the logic for generating the sitemap for the website.
 */

import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllURLS } from "@/services/db/db";

const BASE_URL = "https://medical-portfolios.vercel.app";

/**
 * Recursively get all the routes in the pages directory.
 * @param dir The directory to search.
 * @param basePath The base path for the routes.
 * @returns The list of routes.
 */
const getRoutes = (dir: string, basePath = ""): string[] => {
  let routes: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith("[")) {
      routes = [...routes, ...getRoutes(filePath, `${basePath}/${file}`)];
    } else if (
      (file === "page.tsx" || file === "page.js") &&
      !basePath.includes("[") &&
      !basePath.includes("portfolios/name")
    ) {
      const route = basePath || "/";
      routes.push(route);
    }
  }
  return routes;
};

/**
 * Get the dynamic portfolio routes.
 * @returns The dynamic portfolio routes.
 */
async function getDynamicPortfolioRoutes() {
  const rows = await getAllURLS();

  if (!rows || !Array.isArray(rows)) {
    console.error("Failed to fetch portfolio URLs.");
    return [];
  }
  const urls = rows as { url: string }[];

  return urls.map((row) => ({
    url: `${BASE_URL}/portfolios/${row.url}`,
    lastModified: new Date(),
    changeFrequency: "daily" as "daily",
    priority: 0.9,
  }));
}

/**
 * Generate the sitemap.
 * @returns The sitemap.
 */
export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const pagesDirectory = path.join(process.cwd(), "src", "app");
  const routes = getRoutes(pagesDirectory);

  if (!routes.includes("/")) {
    routes.unshift("/");
  }

  const staticRoutes = routes.map((route) => ({
    url: `${BASE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "/" ? ("yearly" as "yearly") : ("weekly" as "weekly"),
    priority: route === "/" ? 1 : 0.8,
  }));

  const dynamicRoutes = await getDynamicPortfolioRoutes();

  return [...staticRoutes, ...dynamicRoutes];
}
