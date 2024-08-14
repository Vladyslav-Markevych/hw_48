import { renderHook, act } from "@testing-library/react-hooks";
import { useData } from "../../hooks/useData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ meals: [{ strCategory: "Vegetarian" }] }),
  })
);

describe("useData", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should return initial empty data", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useData("test-url"));

    expect(result.current).toEqual([]);

    await waitForNextUpdate();

    expect(result.current).toEqual([]);
  });

  it("should update data after fetching", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ meals: [{ strCategory: "Vegetarian" }] }),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useData("test-url"));

    expect(result.current).toEqual([]);

    await waitForNextUpdate();

    expect(result.current).toEqual({ meals: [{ strCategory: "Vegetarian" }] });
  });
});
