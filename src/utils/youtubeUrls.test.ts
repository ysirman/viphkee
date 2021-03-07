import { videoIdByUrl } from "./youtubeUrls";

describe("videoIdByUrl", () => {
  describe("https://www.youtube.com/watch?v=3e1GHCA3GP0?t=480", () => {
    it("should get videoId", () => {
      const url = "https://www.youtube.com/watch?v=3e1GHCA3GP0?t=480";
      const videoId = "3e1GHCA3GP0";
      expect(videoIdByUrl(url)).toBe(videoId);
    });
  });

  describe("https://www.youtube.com/watch?v=3e1GHCA3GP0&t=480", () => {
    it("should get videoId", () => {
      const url = "https://www.youtube.com/watch?v=3e1GHCA3GP0&t=480";
      const videoId = "3e1GHCA3GP0";
      expect(videoIdByUrl(url)).toBe(videoId);
    });
  });

  describe("https://youtu.be/3e1GHCA3GP0?t=480", () => {
    it("should get videoId", () => {
      const url = "https://youtu.be/3e1GHCA3GP0?t=480";
      const videoId = "3e1GHCA3GP0";
      expect(videoIdByUrl(url)).toBe(videoId);
    });
  });

  describe("https://youtu.be/3e1GHCA3GP0&t=480", () => {
    it("should get videoId", () => {
      const url = "https://youtu.be/3e1GHCA3GP0&t=480";
      const videoId = "3e1GHCA3GP0";
      expect(videoIdByUrl(url)).toBe(videoId);
    });
  });
});
