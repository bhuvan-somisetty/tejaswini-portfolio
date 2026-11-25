/** Fixed grainy, slowly flowing gradient behind the whole page. */
export default function Background() {
  return (
    <>
      <div className="aurora" aria-hidden>
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="grain" aria-hidden />
    </>
  );
}
