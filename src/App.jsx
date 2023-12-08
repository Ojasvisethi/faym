import { useEffect, useState } from "react";
import {
  FcPlanner,
  FcPositiveDynamic,
  FcSalesPerformance,
} from "react-icons/fc";
import styles from "./App.module.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};

async function getData() {
  const response = await fetch(`https://jwt-five.vercel.app/hotelData`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// eslint-disable-next-line react/prop-types
function Stat({ title, value, children }) {
  return (
    <div className={styles.stat}>
      {children}
      <p className={styles.title}>{title}</p>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div
      style={{
        backgroundColor: "#00000",
        height: "100vh",
        width: "80vw",
        margin: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stat title={"Total Sale"} value={1000}>
          <FcSalesPerformance
            className={styles.icon}
            style={{ scale: "2" }}
          ></FcSalesPerformance>
        </Stat>
        <Stat title={"Bookings"} value={10}>
          <FcPlanner className={styles.icon} style={{ scale: "2" }}></FcPlanner>
        </Stat>
        <Stat title={"Occupancy Rate"} value={"9%"}>
          <FcPositiveDynamic
            className={styles.icon}
            style={{ scale: "2" }}
          ></FcPositiveDynamic>
        </Stat>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            unit="$"
            name="Total sales"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            unit="$"
            name="Extras sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
