export default function SectionDivider({
  fill,
  flip = false,
}: {
  fill: string;
  flip?: boolean;
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 w-full sm:h-16"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon
        points={flip ? "0,10 100,10 0,4" : "0,10 100,10 100,4"}
        fill={fill}
      />
    </svg>
  );
}
