export function formatADFText(text) {
    return {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: text
            }
          ]
        }
      ]
    };
  }
  