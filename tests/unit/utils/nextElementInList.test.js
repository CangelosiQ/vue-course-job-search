import nextElementInList from "@/utils/nextElementInList";

describe("nexElementInList", () => {
  it("locates element in list and returns the next element in list", () => {
    const list = ["a", "b", "c", "d"];
    const value = "c";
    const result = nextElementInList(list, value);
    expect(result).toBe("d");
  });

  describe("when element is at the end of the list", () => {
    it("locates next element at start of the list", () => {
      const list = ["a", "b", "c", "d"];
      const value = "d";
      const result = nextElementInList(list, value);
      expect(result).toBe("a");
    });
  });
});
