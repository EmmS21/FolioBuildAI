import React from "react";
import styles from "../../css/ProjectStyles.module.css";
import { categories as jsonData } from "../../data/cards.json" 
import { useRouter } from "next/router";

const categoryKeys = Object.keys(jsonData);

const ProjectCard = ({ onCategorySelect }) => {
  const router = useRouter();
  const handleCardClick = (category) => {
    if (category === "FinTech") {
      onCategorySelect(category);
    }
    router.push(`/projects?category=${encodeURIComponent(category)}`, undefined, { shallow: true });
  };

  return (
    <div className={`${styles.gridContainer} ${styles.marginTop}`}>
      {categoryKeys.map((category) => (
        <div key={category} className={styles.card} onClick={() => handleCardClick(category)}>
          <div className={styles.text}>
            <p className={styles.textCenter}>{category}</p>
            <p className={styles.textCenter}>{jsonData[category]}</p>
          </div>
          <div className={`${styles.arrowBtn} ${styles.withBeforeAfter}`}></div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
