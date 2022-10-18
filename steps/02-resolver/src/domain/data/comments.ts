export type CommentData = {
  id: string;
  version: number;
  created_at: string;
  story_id: string;
  written_by_id: string;
  content: string;
};

export default function createComments(): CommentData[] {
  return [
    {
      id: "1",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "1",
      written_by_id: "2",
      content: "Maiores autem adipisci.",
    },
    {
      id: "2",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "2",
      written_by_id: "3",
      content: "Maiores autem adipisci.",
    },
    {
      id: "3",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "4",
      written_by_id: "4",
      content: "Maiores autem adipisci.",
    },
    {
      id: "4",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "4",
      written_by_id: "5",
      content: "Maiores autem adipisci.",
    },
    {
      id: "5",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "5",
      written_by_id: "1",
      content: "Maiores autem adipisci.",
    },
    {
      id: "6",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "6",
      written_by_id: "2",
      content: "Maiores autem adipisci.",
    },
    {
      id: "7",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "7",
      written_by_id: "3",
      content: "Maiores autem adipisci.",
    },
    {
      id: "8",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "8",
      written_by_id: "4",
      content: "Maiores autem adipisci.",
    },
    {
      id: "9",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "9",
      written_by_id: "5",
      content: "Maiores autem adipisci.",
    },
    {
      id: "10",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "10",
      written_by_id: "3",
      content: "Maiores autem adipisci.",
    },
    {
      id: "11",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "1",
      written_by_id: "4",
      content: "Maiores autem adipisci.",
    },
    {
      id: "12",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "2",
      written_by_id: "2",
      content: "Maiores autem adipisci.",
    },
    {
      id: "13",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "2",
      written_by_id: "3",
      content: "Maiores autem adipisci.",
    },
    {
      id: "14",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "4",
      written_by_id: "4",
      content: "Maiores autem adipisci.",
    },
  ];
}
