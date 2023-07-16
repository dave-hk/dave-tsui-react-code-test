import React from "react";
import { ListItems, useAllUserInfo } from "../api/api";
import LinearProgress from "@mui/material/LinearProgress";
import "./UserList.css";
import UserInfoItem from "./UserInfoItem";
import BasicSelect from "./BasicSelect";
import styled from "@emotion/styled";
import styles from "./UserList.module.css";
import { Grid } from "@mui/material";
import BasicSort from "./BasicSort";
import ReactPaginate from "react-paginate";

const H1 = styled.h1(
  {
    fontSize: 30,
  },
  (props) => ({ color: props.color })
);

const pageSize = 5;

export default function UserList() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const { isLoading, error, data: userDetail } = useAllUserInfo();
  const [filter, setFilter] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [filteredUserDetail, setFilteredUserDetail] = React.useState<
    ListItems[] | undefined
  >([]);

  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(Number(filteredUserDetail?.length) / pageSize);

  const currentUsers = filteredUserDetail?.slice(offset, offset + pageSize);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  React.useEffect(() => {
    if (!userDetail) {
      setFilteredUserDetail(userDetail);
      return;
    }

    let filteredData = userDetail;

    if (filter) {
      filteredData = filteredData.filter((user) => {
        if (filter === "Name") {
          return user.name !== "";
        } else if (filter === "Email") {
          return user.email !== "";
        } else if (filter === "Phone") {
          return user.phone !== "";
        }
        return false;
      });
    }

    if (sort) {
      filteredData.sort((a, b) => {
        if (sort === "Name") {
          return a.name.localeCompare(b.name);
        } else if (sort === "Email") {
          return a.email.localeCompare(b.email);
        } else if (sort === "Phone") {
          return a.phone.length - b.phone.length;
        }
        return 0;
      });
    }

    setFilteredUserDetail(filteredData);
  }, [userDetail, filter, sort, currentPage]);

  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (error) {
    return <div>Failed to load user details: {String(error)}</div>;
  }

  return (
    <>
      <H1 color="#8353B7">User Information</H1>
      <div className={styles.selectContainer}>
        <BasicSelect value={filter} onChange={setFilter} />
        <BasicSort value={sort} onChange={setSort} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
        <Grid item xs={12} sm={11} md={4} lg={6}>
          <div className="table-style">
            {filteredUserDetail
              ? currentUsers?.map((user: ListItems) => {
                  if (filter === "Name") {
                    return <UserInfoItem key={user.id} name={user.name} />;
                  } else if (filter === "Email") {
                    return <UserInfoItem key={user.id} email={user.email} />;
                  } else if (filter === "Phone") {
                    return <UserInfoItem key={user.id} phone={user.phone} />;
                  }
                  return <UserInfoItem key={user.id} {...user} />;
                })
              : userDetail?.map((user: ListItems) => (
                  <UserInfoItem key={user.id} {...user} />
                ))}
          </div>
        </Grid>
      </Grid>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={`${styles.pagination} pagination`}
        activeClassName={"active"}
      />
    </>
  );
}
