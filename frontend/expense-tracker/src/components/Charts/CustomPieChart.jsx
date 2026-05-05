import React, { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Legend
} from "recharts";

const DEFAULT_COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

// ✅ Robust Currency Formatter (NO DOUBLE $ BUG)
const formatCurrency = (value) => {
  if (typeof value === "string") {
    // remove any existing $ and commas, then format fresh
    value = value.replace(/[$,]/g, "");
  }
  const num = Number(value) || 0;
  return `$${num.toLocaleString()}`;
};

// ✅ Active slice styling
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius - 4}
      outerRadius={outerRadius + 12}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      cornerRadius={14}
      filter="url(#glow)"
    />
  );
};

const CustomPieChart = ({
  data = [],
  label = "Total Balance",
  totalAmount = 0,
  colors = DEFAULT_COLORS,
  showTextAnchor = true
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const computedTotal = useMemo(() => {
    return totalAmount || data.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  }, [data, totalAmount]);

  const activeItem = activeIndex !== null ? data[activeIndex] : null;

  // ✅ Empty state
  if (!data.length) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
        No Income Data Available
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: 420,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>

      {/* ✅ Center Text */}
      {showTextAnchor && (
        <div style={{
          position: 'absolute',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 10,
          transform: 'translateY(-20px)'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#6B7280',
            letterSpacing: '0.08em'
          }}>
            {activeItem ? activeItem.name : label}
          </div>

          <div style={{
            fontSize: '40px',
            fontWeight: 800,
            color: '#111827',
            transition: 'all 0.25s ease',
            transform: activeItem ? 'scale(1.08)' : 'scale(1)'
          }}>
            {formatCurrency(activeItem ? activeItem.amount : computedTotal)}
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          {/* ✅ Glow defined ONCE */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={110}
            outerRadius={140}
            paddingAngle={6}
            cornerRadius={14}
            stroke="none"
            onMouseEnter={(_, index) => {
              if (index !== activeIndex) setActiveIndex(index);
            }}
            onMouseLeave={() => setActiveIndex(null)}
            animationDuration={700}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.5
                }}
              />
            ))}
          </Pie>

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
              paddingTop: '24px',
              fontSize: '13px',
              fontWeight: 500
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;