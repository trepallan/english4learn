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
    aTagLink: "/select-course/",
    apiPath: "/",
    children: "",
  },
  {
    name: "Course",
    aTagLink: "/select-course/unit/",
    apiPath: "/courses",

    children: "Unit",
  },
  {
    name: "Unit",
    aTagLink: "/select-course/lesson/",
    apiPath: "/courses/units/",
    children: "Lesson",
  },
  {
    name: "Lesson",
    aTagLink: "/select-course/theme/",
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
