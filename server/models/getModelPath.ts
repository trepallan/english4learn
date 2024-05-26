import CourseModel from "./course";
import LessonModel from "./lesson";
import UnitModel from "./unit";

interface PathSegment {
  type: string;
  id: string;
  name: string;
}

export const getUnitPath = async (id: string) => {
  const course = (await CourseModel.findOne({ _id: id })) as any;
  const path = [{ type: "Course", id: course._id, name: course.name }];

  return path;
};

export const getLessonPath = async (id: string) => {
  const unit = (await UnitModel.findOne({ _id: id })) as any;
  const course = (await CourseModel.findOne({ _id: unit.course })) as any;
  const path = [
    { type: "Course", id: course._id, name: course.name },
    { type: "Unit", id: unit._id, name: unit.name },
  ];

  return path;
};

export const getThemePath = async (id: string) => {
  const lesson = (await LessonModel.findOne({ _id: id })) as any;
  const unit = (await UnitModel.findOne({ _id: lesson.unit })) as any;
  const course = (await CourseModel.findOne({ _id: unit.course })) as any;
  const path = [
    { type: "Course", id: course._id, name: course.name },
    { type: "Unit", id: unit._id, name: unit.name },
    { type: "Lesson", id: lesson._id, name: lesson.name },
  ];

  return path;
};
