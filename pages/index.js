import Head from "next/head";
import styles from "../styles/Home.module.css";
import dummy from "../public/data/dummy.json";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function Home() {
  const [toName, setToName] = useState(dummy.toName);
  const [data, setstate] = useState(dummy.data);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dummy.data.push(data);
  };
  let sum = data.reduce((total, cur) => {
    let totalTime = total + parseFloat(cur.duration);
    return totalTime;
  }, 0);
  let arr = sum.toString().split(".");
  let hour = parseInt(arr[0]) + " hrs";
  let min = parseInt(arr[1]) + " min";
  if (parseInt(min) > 60) {
    sum = sum + 1;
    sum = sum - 0.6;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Daily Work Report.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="editor_main">
        <label htmlFor="">To Name : </label>
        <input
          type="text"
          placeholder="To Name"
          value={toName}
          onChange={(e) => setToName(e.target.value)}
        />
        <p>Add Projects</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Project Name"
            {...register("projectName", { required: true })}
          />
          <input
            type="text"
            placeholder="Project Task"
            {...register("task", { required: true })}
          />
          <input
            type="text"
            placeholder="Project Duration"
            {...register("duration", { required: true })}
          />
          <input type="submit" value="Add Projects" />
        </form>
      </div>

      <p>Hi {toName},</p>
      <p>Please go through my daily report .</p>
      {data?.map((task, i) => (
        <Projects key={i} task={task} number={i} />
      ))}

      <p className="strong">Total hours worked today: {sum} hrs</p>
    </div>
  );
}

const Projects = ({ task, number }) => {
  return (
    <div className="card_main">
      <p className="strong">
        {number + 1}. Project name: {task.projectName}
      </p>
      <p className="strong">Task</p>
      <p>
        {task.projectName} | WP | {task.task}
      </p>
      <p className="strong">Time</p>
      <p>{task.duration} hours</p>
    </div>
  );
};
