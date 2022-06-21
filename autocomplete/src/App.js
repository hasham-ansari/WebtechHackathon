import React from "react";
import "./App.css";
import CourseSheet from "./components/CourseSheet";
import AutoCompleteText from "./components/AutoCompleteText";
import courses from "./components/listCourses.js";

// import HideableText from'./HideableText';

function App() {
  return (
    <div className="App">
      <AutoCompleteText items={courses} />
      <CourseSheet />
    </div>
  );
}

//<AutoCompleteText items={countries} />
export default App;
