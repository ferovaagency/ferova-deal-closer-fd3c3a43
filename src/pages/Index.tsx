const Index = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#2F2D56" }}
    >
      <div className="text-center space-y-6 px-4">
        <p
          className="font-display text-2xl tracking-wide"
          style={{ color: "#FAF6F0" }}
        >
          Ferova{" "}
          <span
            className="font-body text-base font-light"
            style={{ color: "#C0930E" }}
          >
            / AGENCY
          </span>
        </p>
        <div
          className="w-16 h-0.5 mx-auto"
          style={{ background: "#C0930E", opacity: 0.4 }}
        />
        <p className="font-body text-base" style={{ color: "rgba(250,246,240,0.5)" }}>
          Para ver una propuesta, usa el enlace que te enviamos.
        </p>
      </div>
    </div>
  );
};

export default Index;
