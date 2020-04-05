let Api = {
  url: "https://api.c19.rslash.app",
};

if (process.env.NODE_ENV !== "production") Api.url = "http://localhost:7001";

export default Api;
