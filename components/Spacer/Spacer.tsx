import React from "react";
import styles from "./Spacer.module.css";

export const Spacer = ({ src }: { src: string }) => {
  return <div className={`${styles.spacer}`} style={{ backgroundImage: `url('${src}')` }}></div>;
};
