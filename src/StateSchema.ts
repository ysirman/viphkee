export const StateSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  additionalProperties: false,
  properties: {
    flashMessage: {
      additionalProperties: false,
      properties: {
        isOpen: {
          type: "boolean",
        },
        message: {
          type: "string",
        },
      },
      type: "object",
    },
    playList: {
      items: {
        additionalProperties: false,
        properties: {
          defaultTitle: {
            type: "string",
          },
          id: {
            type: "number",
          },
          isSelected: {
            type: "boolean",
          },
          loopEnd: {
            type: "string",
          },
          loopStart: {
            type: "string",
          },
          videoId: {
            type: "string",
          },
          videoTitle: {
            type: "string",
          },
        },
        type: "object",
      },
      type: "array",
    },
    playerConfig: {
      additionalProperties: false,
      properties: {
        duration: {
          type: "number",
        },
        loopState: {
          additionalProperties: false,
          properties: {
            end: {
              type: "string",
            },
            isLoop: {
              type: "boolean",
            },
            start: {
              type: "string",
            },
          },
          type: "object",
        },
        playbackRate: {
          type: "number",
        },
        played: {
          type: "number",
        },
        playing: {
          type: "boolean",
        },
        url: {
          type: "string",
        },
        zoomState: {
          additionalProperties: false,
          properties: {
            isZoom: {
              type: "boolean",
            },
            max: {
              type: "number",
            },
            min: {
              type: "number",
            },
          },
          type: "object",
        },
      },
      type: "object",
    },
  },
  type: "object",
};
