import { withContentlayer } from "next-contentlayer";

export default withContentlayer({
  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
});
