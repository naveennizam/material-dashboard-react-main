/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable */

// @mui material components
// import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import React, { useEffect, useState } from "react";
// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
function Dashboard() {
  let [state, setState] = useState([]);


  const parseData = async (dateOf30Days, db) => {
    for (let i = 0; i < dateOf30Days.length; i++) {
      for (let j = 0; j < db.length; j += 1) {
        if (dateOf30Days[i].date.indexOf(db[j].created_at.split('T')[0].trim()) != -1) {
          dateOf30Days[i].totalOrders = db[j].TotalOrders;
        }
      }
      if (!dateOf30Days[i].totalOrders)
        dateOf30Days[i].totalOrders = 0;
    }
    let graphJSON = {
      labels: [],
      datasets: { label: "Logos", data: [] }
    }
    //let graphJSON={labels:[],datasets: { label: "Logos", data: []}
    for (let i = 0; i < dateOf30Days.length; i++) {

      graphJSON.datasets.data.push(dateOf30Days[i].totalOrders);
      graphJSON.labels.push(dateOf30Days[i].date);

    }
   setState(graphJSON)
  };


  const getData = async () => {
    fetch(`http://localhost:8000/api/getorder`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: `GET`,
    })
      .then((res) => res.json())
      .then((db) => {
        const today = new Date();
        const dateOf30Days = [];
        const year = today.getFullYear();
        const month = today.getMonth();
        const date = today.getDate();
        for (let i = 1; i < 32; i += 1) {
          const day = new Date(year, month - 1, date + i);
          dateOf30Days.push({ date: day.toJSON().slice(0, 10) });
        }

        parseData(dateOf30Days, db);
      });
  };



  useEffect(() => {
    getData();
  
  }, []);
  return (
    <DashboardLayout>
      {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid> */}
      {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}

      <MDBox mb={5} mt={0}>

        <ReportsBarChart
          color="info"
          title="website views"
          description="Last Campaign Performance"
          date="campaign sent 2 days ago"
          chart={state}
        //reportsBarChartData  state
        />
      </MDBox>
      <MDBox mb={5} mt={8}>
        <ReportsLineChart
          color="secondary"
          title="daily sales"
          description={
            <>
              (<strong>+15%</strong>) increase in today sales.
            </>
          }
          date="updated 4 min ago"
          chart={state}
        />
      </MDBox>
      {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
      {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
  /* eslint-disable */