let Api = {
  url: "https://api.c19.rslash.app",
  // url: "http://localhost:7001",
};

if (process.env.NODE_ENV === "devolopment") Api.url = "http://localhost:7001";

export default Api;
