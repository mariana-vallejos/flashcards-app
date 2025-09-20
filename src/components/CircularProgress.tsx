type CircularProgressProps = {
  learned: number;
  total: number;
};

const CircularProgress = ({ learned, total }: CircularProgressProps) => {
  const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;

  const size = 180; // tamaño del SVG
  const strokeWidth = 12; // grosor de la barra
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex justify-center gap-3 pt-10">
      <div className="md:absolute flex flex-col items-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Fondo gris */}
          <circle
            stroke="#e5e7eb" // gris claro
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Barra de progreso */}
          <circle
            stroke="#f59e0b" // amber-500
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="transition-all duration-500"
          />
        </svg>

        <div className="absolute flex flex-col items-center top-2/6">
          <span className="text-2xl font-bold">{percentage}%</span>
        </div>
        <p className="text-gray-700 font-medium py-4">
          {learned} / {total} aprendidas
        </p>
      </div>
    </div>
  );
};

export default CircularProgress;
