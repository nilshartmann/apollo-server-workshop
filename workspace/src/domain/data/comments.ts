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
      id: "2",
      version: 1,
      created_at: "2021-10-10T05:53:21.912Z",
      story_id: "2",
      written_by_id: "4",
      content: "Maiores autem adipisci.",
    },
  ];
}
