export interface classe {
  name: string;
  apiPath: string;
  aTagLink: string;
  children: string | null;
}
// Course -> Unit -> Lesson -> Theme -> Activity
const classeOrder: classe[] = [
  {
    name: "Main",
    aTagLink: "/select/",
    apiPath: "/",
    children: "",
  },
  {
    name: "Course",
    aTagLink: "/select/unit/",
    apiPath: "/courses",

    children: "Unit",
  },
  {
    name: "Unit",
    aTagLink: "/select/lesson/",
    apiPath: "/courses/units/",
    children: "Lesson",
  },
  {
    name: "Lesson",
    aTagLink: "/select/theme/",
    apiPath: "/courses/lessons/",
    children: "Theme",
  },
  {
    name: "Theme",
    aTagLink: "/activity/", // The activity will use the theme ID
    apiPath: "/courses/themes/",
    children: "Activity",
  },
];

export default classeOrder;
