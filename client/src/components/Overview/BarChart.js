import { Bar } from "react-chartjs-2";

const BarChart = () => {
  return (
    <div>
      <Bar
        // data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cryptocurrency prices"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
  );
};

export default BarChart