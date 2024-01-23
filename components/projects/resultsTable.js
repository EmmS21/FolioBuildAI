import React, { useContext } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from "../../css/TableStyles.module.css";
import { Tag } from 'antd';
import { useRouter } from 'next/router';
import { useDataContext } from "../../context/dataContext";

const ResultsTable = ({ data, fetchData, hasMore }) => {
  const router = useRouter()
  const { setProjectData } = useDataContext();
  console.log('***', setProjectData)

  const handleProjectTitleClick = async (title) => {
    const formattedTitle = `${title.toLowerCase().replace(/\s+/g, '_')}_details`;
    try {
      const response = await fetch('/api/fetchProjectDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName: formattedTitle }),
      });
      const data = await response.json();
      setProjectData(data)
      router.push(`/projectDetails?title=${encodeURIComponent(title)}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <section className={styles.sectionStyle}>
    <h1 className={styles.sectionHeader}>Projects</h1>
    <div className={styles["tbl-header"]}>
      <table className={styles.tableStyle} cellPadding="0" cellSpacing="0" border="0">
        <thead>
          <tr>
            <th className={styles.thStyle}>Project Title</th>
            <th className={styles.thStyle}>Details</th>
            <th className={styles.thStyle}>Total Story Points</th>
          </tr>
        </thead>
      </table>
    </div>
    <div className={styles["tbl-content"]}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        >
      <table className={styles.tableStyle}>
        <tbody>
          {data.map((project, index) => (
            <tr key={index} onClick={() => handleProjectTitleClick(project.project_title)}>
              <td className={styles.tdStyle}>
                <Tag color="success">{project.project_title}</Tag>
              </td>
              <td className={styles.tdStyle}>{project.project_details}</td>
              <td className={styles.tdStyle}>points</td>
            </tr>
          ))
          }
        </tbody>
      </table>
      </InfiniteScroll>
    </div>
  </section>
  );
};

export default ResultsTable;
