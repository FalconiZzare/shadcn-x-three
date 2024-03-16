import {
  idSearch,
  powerstatsSearch,
  biographySearch,
  appearanceSearch,
  workSearch,
  connectionsSearch,
  imageSearch
} from "@/api/superhero.js";

export const SuperheroTabs = [
  {
    value: "id",
    endpoint: idSearch,
    title: "Search By ID",
    description:
      "This API call will fetch a single object containing all the information of a single hero."
  },
  {
    value: "powerstats",
    endpoint: powerstatsSearch,
    title: "Search By ID/Powerstats",
    description:
      "This API call provides all powerstats for the given character. The powerstats are Intelligence, Strength, Speed, Durability & Power & Combat."
  },
  {
    value: "biography",
    endpoint: biographySearch,
    title: "Search By ID/Biography",
    description:
      "This API call gives the biographical stats of the character. They are Full Name, Alter Egos, Aliases, Place of Birth, First Appearance, Publisher & Alignment."
  },
  {
    value: "appearance",
    endpoint: appearanceSearch,
    title: "Search By ID/Appearance",
    description:
      "This API call provides the appearance of the character. The various statistics are Gender, Race, Height, Weight, Eye Color & Hair Color."
  },
  {
    value: "work",
    endpoint: workSearch,
    title: "Search By ID/Work",
    description:
      "This API lists the work/occupation of the character. They are Occupation & Base of Operation."
  },
  {
    value: "connections",
    endpoint: connectionsSearch,
    title: "Search By ID/Connections",
    description:
      "This call lists out the connections of the character. They are Group Affiliation & Relatives"
  },
  {
    value: "image",
    endpoint: imageSearch,
    title: "Search By ID/Image",
    description: "This provides the image for the character, if exists."
  }
];
