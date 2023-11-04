import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_NODE_ENV === "development"
        ? "http://localhost:5000/api/v1"
        : `${process.env.REACT_APP_API_URL}/api/v1`,
  }),
  tagTypes: ["sendMessages"],
  endpoints: (builder) => ({}),
});
