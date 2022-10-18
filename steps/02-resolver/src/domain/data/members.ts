export type MemberData = {
  id: string;
  version: number;
  created_at: string;
  user_id: string;
  profile_image: string;
  location: string | null;
  bio: string | null;
  skills: string | null;
  currently_learning: string | null;
  works: string | null;
};

export default function createMembers(): MemberData[] {
  return [
    {
      id: "1",
      version: 1,
      created_at: "2019-05-01T21:39:24.849Z",
      user_id: "U1",
      profile_image: "/avatars/nils.jpg",
      location: "Hamburg",
      bio: "Software-Developer from Hamburg",
      skills: "Beer and GraphQL",
      currently_learning: "How to teach GraphQL",
      works: "Freelancer",
    },
    {
      id: "2",
      version: 1,
      created_at: "2021-10-08T20:32:15.761Z",
      user_id: "U2",
      profile_image: "/avatars/avatar_U2.png",

      location: "Longmont, VN",
      bio: "quaerat-nihil-eveniet",
      skills: "WordPress, Visual Basic, Linux, C#",
      currently_learning: null,
      works: null,
    },
    {
      id: "3",
      version: 1,
      created_at: "2020-05-06T03:46:48.899Z",
      user_id: "U3",
      profile_image: "/avatars/avatar_U3.png",

      location: "Coral Springs, BR",
      bio: null,
      skills: "Drupal, WordPress, DevOps",
      currently_learning: null,
      works: "Weissnat Group",
    },
    {
      id: "4",
      version: 1,
      created_at: "2021-04-27T01:00:24.481Z",
      user_id: "U4",
      profile_image: "/avatars/avatar_U4.png",

      location: "Seattle, CI",
      bio: null,
      skills: "Spring",
      currently_learning:
        "Omnis eos mollitia aperiam eos voluptas at consequatur.",
      works: null,
    },
    {
      id: "5",
      version: 1,
      created_at: "2020-08-28T14:58:47.401Z",
      user_id: "U5",
      profile_image: "/avatars/avatar_U5.png",

      location: "Carrollton, UM",
      bio: "provident-sunt-minima",
      skills: "GraphQL",
      currently_learning:
        "Quisquam dolore exercitationem laboriosam aut maiores aut sint.",
      works: "Bode Group",
    },
  ];
}
