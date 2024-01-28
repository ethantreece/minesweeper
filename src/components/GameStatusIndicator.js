const GameStatusIndicator = ({ gameOver, onReset }) => {
  const statusText = gameOver ? "😵" : "😊";
  const size = "30px";
  const statusStyle = {
    width: size,
    height: size,
    lineHeight: size, // This makes the text vertically centered
    margin: "0 auto", // This centers the div horizontally
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "calc(20px)", // Adjust font size based on the size of the square
    backgroundColor: gameOver ? "#FFD2D2" : "#D2FFD2",
    border: "1px solid #000",
    userSelect: "none",
    cursor: "pointer",
    marginBottom: "20px", // Add some margin below the indicator
  };

  return (
    <div style={statusStyle} onClick={onReset}>
      {statusText}
    </div>
  );
};

export default GameStatusIndicator;
