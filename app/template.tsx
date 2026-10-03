import MotionRoot from "../components/MotionRoot";

// Re-mounts on every navigation: a short transform/opacity entrance (disabled under reduced motion),
// then the motion module scans the freshly hydrated page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page">{children}</div>
      <MotionRoot />
    </>
  );
}
