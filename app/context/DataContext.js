import { createContext, useEffect, useState } from "react";
import { fetchUsersWithLatestPayment } from "../lib";
import { setIn } from "formik";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [dueIn3Days, setDueIn3Days] = useState(0);
  const [overdueUsers, setOverdueUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getUsersData() {
      try {
        const usersList = await fetchUsersWithLatestPayment();
        setUsers(usersList);
      } catch (error) {
        console.error("Error retrieving users' data:", error);
      }
    }

    getUsersData();
  }, []);

  useEffect(() => {
    async function analytics() {
      console.log("reloading");
      setInactiveUsers(0);
      setActiveUsers(0);
      setDueIn3Days(0);
      setOverdueUsers(0);
      users.map((user) => {
        if (user.isActive) {
          setActiveUsers((prev) => prev + 1);
        } else {
          setInactiveUsers((prev) => prev + 1);
        }

        const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

        if (!user.isActive && user.latestPayment == null) {
          if (user.latestPayment.endDate.toDate() <= threeDaysFromNow) {
            setDueIn3Days(dueIn3Days + 1);
          }

          if (user.latestPayment.endDate.toDate() < new Date()) {
            setOverdueUsers(overdueUsers + 1);
          }
        }
      });
    }
  }, [users]);

  const handleActiveFilter = (filter) => {
    setActiveFilter(filter);
  };

  const updateUsers = (userId, toggledIsActive) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.isActive = toggledIsActive;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const updateLatestPayemnt = (userId, latestPayment) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.latestPayment = latestPayment;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const deleteUserByID = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const updateStateWithLatestPayment = async (userId, latestPayment) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.latestPayment = latestPayment;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <DataContext.Provider
      value={{
        updateUsers,
        updateLatestPayemnt,
        activeUsers,
        inactiveUsers,
        dueIn3Days,
        overdueUsers,
        users,
        activeFilter,
        handleActiveFilter,
        setUsers,
        setReload,
        setDueIn3Days,
        setOverdueUsers,
        setInactiveUsers,
        setActiveUsers,
        deleteUserByID,
        updateStateWithLatestPayment
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
