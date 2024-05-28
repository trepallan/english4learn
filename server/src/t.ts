const mongoose = require("mongoose");
require("dotenv").config();
import activity from "../models/activity";
// Conect to MongoDB
(async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
})();

const { NodeHtmlMarkdown } = require("node-html-markdown");

const html = `<table border="1" align="center" valign="center" cellspacing="0" cellpadding="2">
 <tbody><tr>
 <th colspan="3">Singular</th>
 <th rowspan="5">&nbsp;</th>
 <th colspan="3">Plural</th>
 </tr>
 <tr>
 <td><b>I</b></td>
 <td><b>am</b></td>
 <td rowspan="3">a student.</td>
 <td><b>We</b></td>
 <td><b>are</b></td>
 <td rowspan="3">students.</td>
 </tr>
 <tr>
 <td><b>You</b></td>
 <td><b>are</b></td>
 <td><b>You</b></td>
 <td><b>are</b></td>
 </tr>
 <tr>
 <td><b>He<br>
 She</b></td>
 <td><b>is</b></td>
 <td><b>They</b></td>
 <td><b>are</b></td>
 </tr>
 <tr>
 <td><b>It</b></td>
 <td><b>is</b></td>
 <td>a pencil.</td>
 <td><b>They</b></td>
 <td><b>are</b></td>
 <td>pencils.</td>
 </tr>
 </tbody></table>`;

const translate = (html: string) => {
  return NodeHtmlMarkdown.translate(html);
};
console.log(translate(html));

(async function save() {
  try {
    const data = await activity.create({
      type: "read",
      text: translate(html),
      index: 255,
      theme: "6652e4d4dd8e5026a046abcf",
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
