const path = [
  { type: "Course", id: "665d222a4eabaa700f0b593b", name: "Course 1" },
  { type: "Unit", id: "665d24204eabaa700f0b5b39", name: "In the Classroom" },
  {
    type: "Lesson",
    id: "665d222d4eabaa700f0b5943",
    name: "Introduction & Vocabulary",
  },
];

const unitIndex = path.findIndex((u) => u.type === "Unit");

if (unitIndex !== -1) {
  // Replace the existing "Unit" type
  path[unitIndex] = {
    type: "Unit",
    id: "d",
    name: "ThisUnit.name",
  };
} else {
  // Create a new "Unit" type
  path.push({
    type: "Unit",
    id: "d",
    name: "d",
  });
}

console.log(path);
