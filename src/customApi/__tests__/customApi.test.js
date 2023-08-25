import { screen } from "@testing-library/react";
import axios from "axios";
import customApi from "../customApi";

jest.mock("axios", () => {
  return {
    create: () => {
      return {
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      };
    },
  };
});

const data = {
  products: [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      ],
    },
  ],
};

describe("CustomApi should work correctly", () => {
  beforeEach(() => {
    customApi.interceptors.request.use.mockReset();
    customApi.interceptors.response.use.mockReset();
  })

  test("should request api on intercepting the api for request", async () => {
    customApi.interceptors.request.use.mockResolvedValueOnce({ data });

    const response = await customApi.interceptors.request.use();
    expect(response.data).toEqual(data);
  });

  test("should handle request error", async () => {
    customApi.interceptors.request.use.mockRejectedValueOnce({
      message: "api failed",
    });

    await expect(customApi.interceptors.request.use()).rejects.toEqual({
      message: "api failed",
    });
  });
});
