export type StoryData = {
  id: string;
  version: number;
  created_at: string;
  written_by_id: string;
  title: string;
  tags: string[];
  body_markdown: string;
};
export default function createStories(): StoryData[] {
  return [
    {
      id: "1",
      version: 1,
      created_at: "2021-10-09T04:40:50.027Z",
      written_by_id: "1",

      title: "Authentication and Access Control with Relay",
      tags: ["java", "string"],

      body_markdown:
        "At vero eos et accusam et justo duo dolores et ea rebum. ",
    },
    {
      id: "2",
      version: 1,
      created_at: "2021-10-10T04:40:50.027Z",
      written_by_id: "1",

      title: "How do I call one constructor from another in Java?",
      tags: ["java", "string"],

      body_markdown: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      id: "3",
      version: 1,
      created_at: "2021-10-11T04:40:50.027Z",
      written_by_id: "2",

      title: "What is JSONP, and why was it created?",
      tags: ["java", "string"],

      body_markdown:
        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui ",
    },
    {
      id: "4",
      version: 1,
      created_at: "2021-10-12T04:40:50.027Z",
      written_by_id: "3",

      title: "Get Original Field Name on GraphQL",
      tags: ["java", "string"],

      body_markdown:
        "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. ",
    },
    {
      id: "5",
      version: 1,
      created_at: "2021-10-13T04:40:50.027Z",
      written_by_id: "2",

      title: "How can I get the data-id attribute?",
      tags: ["java", "string"],

      body_markdown:
        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ",
    },
    {
      id: "6",
      version: 1,
      created_at: "2021-10-14T04:40:50.027Z",
      written_by_id: "1",

      title: "How to send HTTP request in Node",
      tags: ["java", "string"],

      body_markdown:
        "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. L",
    },
    {
      id: "7",
      version: 1,
      created_at: "2021-10-15T04:40:50.027Z",
      written_by_id: "4",

      title:
        "What is the difference between a static and a non-static initialization code block",
      tags: ["java", "string"],

      body_markdown:
        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.",
    },
    {
      id: "8",
      version: 1,
      created_at: "2021-10-16T04:40:50.027Z",
      written_by_id: "3",

      title: "Remove properties from objects (JavaScript)",
      tags: ["java", "string"],

      body_markdown:
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
    },
    {
      id: "9",
      version: 1,
      created_at: "2021-10-17T04:40:50.027Z",
      written_by_id: "3",

      title: "Differences between String.slice and String.substring",
      tags: ["java", "string"],

      body_markdown:
        "Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ",
    },
    {
      id: "10",
      version: 1,
      created_at: "2021-10-18T04:40:50.027Z",
      written_by_id: "2",

      title: "How does GraphQL support AND-OR query conditions?",
      tags: ["java", "string"],

      body_markdown:
        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at ",
    },
  ];
}
