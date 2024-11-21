import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const Chart = ({ type }) => {
  const chartData = [
    { name: "Returnable", value: type?.returnable || 0 },
    { name: "Non-Returnable", value: type?.nonReturnable || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12px"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white">
        <div className="px-10 pt-8">
            <h2 className="text-4xl font-bold titleFont dark1">Employee Request Overview</h2>
            <p className="font-medium dark2">Pie chart displaying the percentage of returnable vs. non-returnable items requested by employees.</p>
        </div>
      <div
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
