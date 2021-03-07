import { validateUrl, validateHHMMSS } from "./validator";

describe("validateUrl", () => {
  describe("http://youtube.com/watch?v=3e1GHCA3GP0", () => {
    it("should valid", () => {
      const url = "http://youtube.com/watch?v=3e1GHCA3GP0";
      expect(validateUrl(url)).toBeTruthy();
    });
  });

  describe("https://www.youtube.com/watch?v=3e1GHCA3GP0?t=480", () => {
    it("should valid", () => {
      const url = "https://www.youtube.com/watch?v=3e1GHCA3GP0?t=480";
      expect(validateUrl(url)).toBeTruthy();
    });
  });

  describe("https://www.youtube.com/watch?v=3e1GHCA3GP0&t=480", () => {
    it("should valid", () => {
      const url = "https://www.youtube.com/watch?v=3e1GHCA3GP0&t=480";
      expect(validateUrl(url)).toBeTruthy();
    });
  });

  describe("https://www.youtube.com/", () => {
    it("should invalid", () => {
      const url = "https://www.youtube.com/";
      expect(validateUrl(url)).toBeFalsy();
    });
  });

  describe("https://www.google.com/?hl=en", () => {
    it("should invalid", () => {
      const url = "https://www.google.com/?hl=en";
      expect(validateUrl(url)).toBeFalsy();
    });
  });
});

describe("validateHHMMSS", () => {
  describe("9:59:59", () => {
    it("should valid", () => {
      const hhmmss = "9:59:59";
      expect(validateHHMMSS(hhmmss)).toBeTruthy();
    });
  });

  describe("00:59", () => {
    it("should valid", () => {
      const hhmmss = "00:59";
      expect(validateHHMMSS(hhmmss)).toBeTruthy();
    });
  });

  describe("00:00", () => {
    it("should valid", () => {
      const hhmmss = "00:00";
      expect(validateHHMMSS(hhmmss)).toBeTruthy();
    });
  });

  describe("0:59", () => {
    it("should valid", () => {
      const hhmmss = "0:59";
      expect(validateHHMMSS(hhmmss)).toBeTruthy();
    });
  });

  describe("00:59:59", () => {
    it("should invalid", () => {
      const hhmmss = "00:59:59";
      expect(validateHHMMSS(hhmmss)).toBeFalsy();
    });
  });

  describe("9:60:59", () => {
    it("should invalid", () => {
      const hhmmss = "9:60:59";
      expect(validateHHMMSS(hhmmss)).toBeFalsy();
    });
  });

  describe("00:60", () => {
    it("should invalid", () => {
      const hhmmss = "00:60";
      expect(validateHHMMSS(hhmmss)).toBeFalsy();
    });
  });

  describe("xx:xx", () => {
    it("should invalid", () => {
      const hhmmss = "xx:xx";
      expect(validateHHMMSS(hhmmss)).toBeFalsy();
    });
  });
});
